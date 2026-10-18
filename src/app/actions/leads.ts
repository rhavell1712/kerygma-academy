"use server";

import { createClient } from "@/lib/supabase/server";

const LEADS_MAX = 200;

export async function trackLeadAction(mentoria: string, origem: string) {
  const title = String(mentoria ?? "").trim().slice(0, LEADS_MAX);
  const origemNorm = String(origem ?? "").trim().slice(0, 50);
  if (!title || !origemNorm) return;

  const supabase = await createClient();
  await supabase.from("leads").insert({
    mentoria_title: title,
    origem: origemNorm,
  });
}

export async function listLeadsAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const { data, error } = await supabase
    .from("leads")
    .select("id, mentoria_title, origem, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) return { error: "Falha ao carregar interessados" };
  return { data: data ?? [] };
}

export async function clearLeadsAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const { error } = await supabase
    .from("leads")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (error) return { error: "Falha ao limpar interessados" };
  return { success: true };
}
