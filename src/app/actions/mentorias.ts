"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  createMentoria,
  deleteMentoria,
  toggleMentoriaPublished,
  updateMentoria,
  type MentoriaInput,
} from "@/services/mentorias";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Preencha e-mail e senha." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "E-mail ou senha incorretos." };
  }

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id")
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
    .single();

  if (!adminUser) {
    await supabase.auth.signOut();
    return { error: "Esta conta não tem acesso administrativo." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function createMentoriaAction(formData: FormData) {
  const data: MentoriaInput = {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim() || "Mentoria",
    level: String(formData.get("level") ?? "Iniciante"),
    description: String(formData.get("description") ?? "").trim(),
    long: String(formData.get("long") ?? "").trim(),
    topics: String(formData.get("topics") ?? "").split("\n").map((t) => t.trim()).filter(Boolean),
    encontros: String(formData.get("encontros") ?? "").trim() || "A combinar",
    duracao: String(formData.get("duracao") ?? "").trim() || "A combinar",
    formato: String(formData.get("formato") ?? "").trim() || "Ao vivo",
    para_quem: String(formData.get("para_quem") ?? "").trim() || "Todos",
    image_url: String(formData.get("image_url") ?? "").trim() || null,
    image_alt: String(formData.get("image_alt") ?? "").trim() || null,
    accent: String(formData.get("accent") ?? "#b91c2b"),
    published: formData.get("published") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };

  if (!data.slug || !data.title || !data.description || data.topics.length === 0) {
    return { error: "Preencha os campos obrigatórios." };
  }

  try {
    await createMentoria(data);
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erro ao criar mentoria." };
  }
}

export async function updateMentoriaAction(id: string, formData: FormData) {
  const data: Partial<MentoriaInput> = {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim() || "Mentoria",
    level: String(formData.get("level") ?? "Iniciante"),
    description: String(formData.get("description") ?? "").trim(),
    long: String(formData.get("long") ?? "").trim(),
    topics: String(formData.get("topics") ?? "").split("\n").map((t) => t.trim()).filter(Boolean),
    encontros: String(formData.get("encontros") ?? "").trim() || "A combinar",
    duracao: String(formData.get("duracao") ?? "").trim() || "A combinar",
    formato: String(formData.get("formato") ?? "").trim() || "Ao vivo",
    para_quem: String(formData.get("para_quem") ?? "").trim() || "Todos",
    image_url: String(formData.get("image_url") ?? "").trim() || null,
    image_alt: String(formData.get("image_alt") ?? "").trim() || null,
    accent: String(formData.get("accent") ?? "#b91c2b"),
    published: formData.get("published") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };

  if (!data.slug || !data.title || !data.description || (data.topics ?? []).length === 0) {
    return { error: "Preencha os campos obrigatórios." };
  }

  try {
    await updateMentoria(id, data);
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erro ao atualizar mentoria." };
  }
}

export async function deleteMentoriaAction(id: string) {
  try {
    await deleteMentoria(id);
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erro ao excluir mentoria." };
  }
}

export async function togglePublishedAction(id: string, published: boolean) {
  try {
    await toggleMentoriaPublished(id, published);
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erro ao atualizar publicação." };
  }
}

export async function getMentoriasAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Não autenticado" };

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!adminUser) return { error: "Sem acesso administrativo" };

  const { data, error } = await supabase
    .from("mentorias")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return { error: "Falha ao carregar mentorias" };
  return { data: data ?? [] };
}
