import { createClient } from "@/lib/supabase/server";

export type MentoriaRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  level: string;
  description: string;
  long: string;
  topics: string[];
  encontros: string;
  duracao: string;
  formato: string;
  para_quem: string;
  image_url: string | null;
  image_alt: string | null;
  accent: string;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type MentoriaInput = {
  slug: string;
  title: string;
  category: string;
  level: string;
  description: string;
  long: string;
  topics: string[];
  encontros: string;
  duracao: string;
  formato: string;
  para_quem: string;
  image_url: string | null;
  image_alt: string | null;
  accent: string;
  published: boolean;
  sort_order: number;
};

export async function listMentoriasPublicas(): Promise<MentoriaRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mentorias")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error("Falha ao carregar mentorias");
  return data ?? [];
}

function mentoriaError(
  error: { code?: string | null; message: string },
  action: "criar" | "atualizar",
): Error {
  if (error.code === "23505") {
    return new Error(
      "Já existe uma mentoria com este endereço (slug). Escolha um endereço único — ele é usado no link do treinamento.",
    );
  }
  if (error.code === "23514") {
    return new Error(
      "Formato inválido. Slug: apenas letras minúsculas, números e hífens (ex.: pentateuco-avancado). Cor de destaque: no formato #RRGGBB.",
    );
  }
  if (error.code === "23502") {
    return new Error("Preencha os campos obrigatórios.");
  }
  if (error.code === "42501") {
    return new Error("Sua sessão expirou. Entre novamente no painel.");
  }
  return new Error(`Falha ao ${action} mentoria: ${error.message}`);
}

export async function createMentoria(input: MentoriaInput): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("mentorias").insert(input);
  if (error) throw mentoriaError(error, "criar");
}

export async function updateMentoria(id: string, input: Partial<MentoriaInput>): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("mentorias").update(input).eq("id", id);
  if (error) throw mentoriaError(error, "atualizar");
}

export async function deleteMentoria(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("mentorias").delete().eq("id", id);
  if (error) throw new Error("Falha ao excluir mentoria");
}

export async function toggleMentoriaPublished(id: string, published: boolean): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("mentorias").update({ published }).eq("id", id);
  if (error) throw new Error("Falha ao atualizar publicação");
}
