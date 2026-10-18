"use server";

import { headers } from "next/headers";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export type AdminListItem = {
  id: string;
  user_id: string;
  email: string;
  created_at: string;
};

type Feedback = { success?: string; error?: string };

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false as const, error: "Não autenticado" };

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow) return { ok: false as const, error: "Sem acesso administrativo" };

  return { ok: true as const, supabase, user };
}

export async function checkAdminAction(): Promise<{ isAdmin: boolean }> {
  const ctx = await requireAdmin();
  return { isAdmin: ctx.ok };
}

/**
 * Cliente com privilégios de admin do Auth (chave secreta, apenas servidor).
 * Retorna null quando a variável não está configurada — nesse caso o convite
 * por e-mail fica indisponível e o cadastro manual é a alternativa.
 */
function createInviteClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !secret) return null;

  return createServiceClient(url, secret, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function getSettingsDataAction() {
  const ctx = await requireAdmin();
  if (!ctx.ok) return { error: ctx.error };

  const { supabase, user } = ctx;

  // Alinha admin_users.email ao e-mail atual (confirmado) do Auth.
  await supabase.rpc("sync_admin_email");

  const { data: admins, error: listError } = await supabase
    .from("admin_users")
    .select("id, user_id, email, created_at")
    .order("created_at", { ascending: true });

  if (listError) return { error: "Falha ao carregar administradores" };

  return {
    data: {
      email: user.email ?? "",
      fullName:
        typeof user.user_metadata?.full_name === "string"
          ? user.user_metadata.full_name
          : "",
      admins: (admins ?? []) as AdminListItem[],
    },
  };
}

export async function addAdminAction(rawEmail: string): Promise<Feedback> {
  const email = rawEmail.trim().toLowerCase();
  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Informe um e-mail válido." };
  }

  const ctx = await requireAdmin();
  if (!ctx.ok) return { error: ctx.error };

  const { supabase } = ctx;

  // A função só promove e-mails com conta confirmada no Auth: informar um
  // endereço qualquer não concede acesso.
  const { data: status, error: rpcError } = await supabase.rpc(
    "add_admin_by_email",
    { p_email: email },
  );

  if (rpcError || status !== "added") {
    if (rpcError) return { error: "Não foi possível adicionar o administrador." };

    switch (status) {
      case "already":
        return { success: "Este e-mail já está na lista de administradores." };
      case "unconfirmed":
        return {
          error:
            "A conta existe, mas o e-mail ainda não foi confirmado. Peça para confirmar o cadastro e tente novamente.",
        };
      case "invalid_email":
        return { error: "Informe um e-mail válido." };
      case "no_account":
        return inviteByEmail(ctx.supabase, email);
      default:
        return { error: "Não foi possível adicionar o administrador." };
    }
  }

  return { success: `Administrador adicionado: ${email}` };
}

async function inviteByEmail(
  supabase: Awaited<ReturnType<typeof createClient>>,
  email: string,
): Promise<Feedback> {
  const service = createInviteClient();
  if (!service) {
    return {
      error:
        "Não existe uma conta com este e-mail. Crie a conta em Authentication → Users no painel do Supabase (marque Auto Confirm User) e clique em Adicionar novamente.",
    };
  }

  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const redirectTo = host ? `${proto}://${host}/admin/login` : undefined;

  const { data, error } = await service.auth.admin.inviteUserByEmail(email, {
    ...(redirectTo ? { redirectTo } : {}),
  });

  if (error || !data.user) {
    const message = error?.message ?? "";
    if (/already registered/i.test(message)) {
      return {
        error:
          "Já existe uma conta com este e-mail. Tente clicar em Adicionar novamente.",
      };
    }
    return {
      error:
        "Não foi possível enviar o convite. Verifique a configuração de e-mail (SMTP) do Supabase.",
    };
  }

  // A linha é inserida pela sessão do admin (RLS exige is_admin()).
  const { error: insertError } = await supabase
    .from("admin_users")
    .insert({ user_id: data.user.id, email });

  if (insertError) {
    return {
      error:
        "O convite foi enviado, mas não foi possível registrar o acesso. Clique em Adicionar novamente.",
    };
  }

  return {
    success: `Convite enviado para ${email}. O acesso é ativado quando a pessoa aceitar o link e definir a senha.`,
  };
}

export async function removeAdminAction(targetUserId: string): Promise<Feedback> {
  const ctx = await requireAdmin();
  if (!ctx.ok) return { error: ctx.error };

  if (targetUserId === ctx.user.id) {
    return { error: "Você não pode remover o próprio acesso." };
  }

  const { error } = await ctx.supabase
    .from("admin_users")
    .delete()
    .eq("user_id", targetUserId);

  if (error) return { error: "Falha ao remover o administrador." };
  return { success: "Acesso revogado." };
}

export async function updateProfileAction(
  fullName: string,
  email: string,
): Promise<Feedback> {
  const name = fullName.trim();
  const newEmail = email.trim().toLowerCase();

  if (name.length < 2) return { error: "Informe seu nome." };
  if (!EMAIL_PATTERN.test(newEmail)) return { error: "Informe um e-mail válido." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const emailChanged = newEmail !== (user.email ?? "").toLowerCase();

  const { error } = await supabase.auth.updateUser({
    data: { full_name: name },
    ...(emailChanged ? { email: newEmail } : {}),
  });

  if (error) {
    if (/invalid/i.test(error.message)) return { error: "E-mail inválido." };
    if (/different/i.test(error.message)) {
      return { error: "O novo e-mail deve ser diferente do atual." };
    }
    return { error: "Não foi possível atualizar o perfil." };
  }

  if (emailChanged) {
    return {
      success:
        "Perfil atualizado. Confirme o link enviado para o novo e-mail (e para o atual, se solicitado) para concluir a troca.",
    };
  }
  return { success: "Perfil atualizado." };
}

export async function changePasswordAction(
  password: string,
  confirm: string,
): Promise<Feedback> {
  if (password.length < 8) {
    return { error: "A nova senha deve ter pelo menos 8 caracteres." };
  }
  if (password !== confirm) {
    return { error: "A confirmação não corresponde à nova senha." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    if (/different from the old password/i.test(error.message)) {
      return { error: "A nova senha deve ser diferente da atual." };
    }
    if (/session|reauthenticate|recently/i.test(error.message)) {
      return {
        error: "Por segurança, faça login novamente e tente alterar a senha.",
      };
    }
    return { error: "Não foi possível alterar a senha." };
  }

  return { success: "Senha alterada com sucesso." };
}
