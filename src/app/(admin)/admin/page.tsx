"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Pencil,
  Plus,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";
import {
  createMentoriaAction,
  deleteMentoriaAction,
  getMentoriasAdmin,
  togglePublishedAction,
  updateMentoriaAction,
  logoutAction,
} from "@/app/actions/mentorias";
import { listLeadsAction, clearLeadsAction } from "@/app/actions/leads";
import { createClient } from "@/lib/supabase/client";
import type { MentoriaRow } from "@/services/mentorias";

type Lead = {
  id: string;
  mentoria_title: string;
  origem: string;
  created_at: string;
};

const origemLabels: Record<string, string> = {
  modal: "Detalhe da mentoria",
  flutuante: "Botão flutuante",
  "como-funciona": "Seção como funciona",
};

function formatLeadDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

type Tab = "resumo" | "mentorias" | "leads";

const emptyForm = {
  slug: "",
  title: "",
  category: "",
  level: "Iniciante",
  description: "",
  long: "",
  topics: "",
  encontros: "",
  duracao: "",
  formato: "Ao vivo, individual ou em grupo",
  para_quem: "",
  image_url: "",
  image_alt: "",
  accent: "#b91c2b",
  published: false,
  sort_order: 0,
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function MentoriaForm({
  initial,
  takenSlugs,
  onSave,
  onCancel,
}: {
  initial?: MentoriaRow;
  takenSlugs: string[];
  onSave: (formData: FormData) => Promise<{ error?: string; success?: boolean }>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    ...emptyForm,
    ...(initial
      ? {
          slug: initial.slug,
          title: initial.title,
          category: initial.category,
          level: initial.level,
          description: initial.description,
          long: initial.long,
          topics: initial.topics.join("\n"),
          encontros: initial.encontros,
          duracao: initial.duracao,
          formato: initial.formato,
          para_quem: initial.para_quem,
          image_url: initial.image_url ?? "",
          image_alt: initial.image_alt ?? "",
          accent: initial.accent,
          published: initial.published,
          sort_order: initial.sort_order,
        }
      : {}),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));

  async function handleUpload(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Selecione um arquivo de imagem.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("A imagem deve ter no máximo 2 MB.");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "png";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("mentoria-images")
        .upload(path, file, { contentType: file.type });
      if (upErr) throw new Error("Falha no upload da imagem.");
      const { data } = supabase.storage.from("mentoria-images").getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao enviar imagem.");
    } finally {
      setUploading(false);
    }
  }

  const set =
    (key: keyof typeof emptyForm) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    setForm((f) => ({
      ...f,
      title,
      ...(slugTouched ? {} : { slug: slugify(title) }),
    }));
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlugTouched(true);
    setForm((f) => ({ ...f, slug: e.target.value }));
  }

  const input =
    "w-full rounded-md border border-line-strong bg-bg px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-brand";
  const label =
    "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft";

  const valid =
    form.title.trim() && form.description.trim() && form.topics.trim() && form.slug.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    const slug = form.slug.trim();
    if (!SLUG_PATTERN.test(slug)) {
      setError(
        "Slug inválido: use apenas letras minúsculas, números e hífens (ex.: pregacao-expositiva).",
      );
      return;
    }
    if (takenSlugs.includes(slug)) {
      setError(
        "Já existe uma mentoria com este endereço (slug). Escolha outro — ele é usado no link do treinamento.",
      );
      return;
    }
    setSaving(true);
    setError(null);
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      fd.append(key, String(value));
    });
    const result = await onSave(fd);
    setSaving(false);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onCancel}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />
      <div className="animate-fade-up relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-card p-6 shadow-pop ring-1 ring-line-strong sm:rounded-2xl sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-extrabold tracking-tight text-ink">
              {initial ? "Editar mentoria" : "Nova mentoria"}
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              {initial
                ? "As mudanças aparecem na hora na vitrine do site."
                : "Preencha e publique — ela entra na hora na vitrine do site."}
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Fechar"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-elevated text-ink-soft transition hover:text-ink"
          >
            <X size={17} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Slug (URL) *</label>
              <input
                value={form.slug}
                onChange={handleSlugChange}
                placeholder="ex: preguacao-expositiva"
                className={input}
              />
            </div>
            <div>
              <label className={label}>Nome da mentoria *</label>
              <input value={form.title} onChange={handleTitleChange} placeholder="Ex: Pregação Expositiva" className={input} />
            </div>
            <div>
              <label className={label}>Categoria</label>
              <input value={form.category} onChange={set("category")} placeholder="Ex: Homilética" className={input} />
            </div>
            <div>
              <label className={label}>Nível</label>
              <select value={form.level} onChange={set("level")} className={input}>
                <option>Iniciante</option>
                <option>Intermediário</option>
                <option>Avançado</option>
                <option>Todos os níveis</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={label}>Descrição curta (card) *</label>
              <textarea value={form.description} onChange={set("description")} rows={2} placeholder="Uma frase que resume a mentoria..." className={input} />
            </div>
            <div className="sm:col-span-2">
              <label className={label}>Sobre (dentro do detalhe)</label>
              <textarea value={form.long} onChange={set("long")} rows={3} placeholder="Explique com mais profundidade..." className={input} />
            </div>
            <div className="sm:col-span-2">
              <label className={label}>O que vai abordar — um por linha *</label>
              <textarea
                value={form.topics}
                onChange={set("topics")}
                rows={5}
                placeholder={"Ex:\nQuem é Deus\nA Escritura\nSalvação"}
                className={input}
              />
            </div>
            <div>
              <label className={label}>Encontros</label>
              <input value={form.encontros} onChange={set("encontros")} placeholder="Ex: 6 encontros" className={input} />
            </div>
            <div>
              <label className={label}>Duração</label>
              <input value={form.duracao} onChange={set("duracao")} placeholder="Ex: 1h por encontro" className={input} />
            </div>
            <div>
              <label className={label}>Formato</label>
              <input value={form.formato} onChange={set("formato")} className={input} />
            </div>
            <div>
              <label className={label}>Para quem</label>
              <input value={form.para_quem} onChange={set("para_quem")} placeholder="Ex: Líderes e pregadores" className={input} />
            </div>
            <div>
              <label className={label}>URL da imagem (opcional)</label>
              <input value={form.image_url} onChange={set("image_url")} placeholder="/img/nome.png ou https://..." className={input} />
              <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-md border border-line-strong px-3 py-2 text-xs font-bold text-ink-soft transition hover:border-brand hover:text-brand-hover">
                <Upload size={14} />
                {uploading ? "Enviando..." : "Ou envie uma imagem (2 MB máx.)"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleUpload(file);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
            <div>
              <label className={label}>Texto alternativo da imagem</label>
              <input value={form.image_alt} onChange={set("image_alt")} placeholder="Descrição da imagem" className={input} />
            </div>
            <div>
              <label className={label}>Ordem de exibição</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={set("sort_order")}
                className={input}
              />
            </div>
            <div>
              <label className={label}>Cor de destaque</label>
              <div className="flex items-center gap-3">
                <input type="color" value={form.accent} onChange={set("accent")} className="h-10 w-14 cursor-pointer rounded-md border border-line-strong bg-bg" />
                <span className="text-xs text-ink-faint">{form.accent}</span>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                  className="h-4 w-4 accent-brand"
                />
                Publicada (visível no site)
              </label>
            </div>
          </div>

          {error && <p className="mt-4 text-[13px] font-semibold text-brand-hover">{error}</p>}

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-line-strong px-6 py-3 text-sm font-bold text-ink-soft transition hover:text-ink"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!valid || saving}
              className="rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving ? "Salvando..." : initial ? "Salvar mudanças" : "Publicar mentoria"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("resumo");
  const [mentorias, setMentorias] = useState<MentoriaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<MentoriaRow | undefined>(undefined);
  const [actionError, setActionError] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);

  async function loadLeads() {
    const res = await listLeadsAction();
    if (res.data) setLeads(res.data);
  }

  useEffect(() => {
    getMentoriasAdmin()
      .then((res) => {
        if (res.data) setMentorias(res.data);
        else if (res.error) setActionError(res.error);
      })
      .finally(() => setLoading(false));
    listLeadsAction().then((res) => {
      if (res.data) setLeads(res.data);
    });
  }, []);

  async function handleLogout() {
    await logoutAction();
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Excluir "${title}" da vitrine?`)) return;
    const result = await deleteMentoriaAction(id);
    if (result?.success) {
      setMentorias((prev) => prev.filter((m) => m.id !== id));
    } else {
      setActionError(result?.error ?? "Erro ao excluir.");
    }
  }

  async function handleTogglePublished(id: string, published: boolean) {
    const result = await togglePublishedAction(id, published);
    if (result?.success) {
      setMentorias((prev) =>
        prev.map((m) => (m.id === id ? { ...m, published } : m)),
      );
    }
  }

  async function handleSave(formData: FormData) {
    const result = editing
      ? await updateMentoriaAction(editing.id, formData)
      : await createMentoriaAction(formData);
    if (result?.success) {
      setFormOpen(false);
      setEditing(undefined);
      const res = await getMentoriasAdmin();
      if (res.data) setMentorias(res.data);
    }
    return result;
  }

  const tabs: { id: Tab; label: string; icon: typeof Users }[] = [
    { id: "resumo", label: "Visão geral", icon: BarChart3 },
    { id: "mentorias", label: "Mentorias", icon: BookOpen },
    { id: "leads", label: "Interessados", icon: Users },
  ];

  function selectTab(id: Tab) {
    setTab(id);
    if (id === "leads") void loadLeads();
  }

  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <header className="border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <img src="/img/logo_vetorizado.svg" alt="Mispá Treinamentos" className="h-9 w-auto block" />
            <div className="leading-none">
              <p className="font-display text-[15px] font-extrabold tracking-tight">
                Painel do professor
              </p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                Mispá Treinamentos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-md border border-line-strong px-3.5 py-2 text-[13px] font-bold text-ink-soft transition hover:text-ink"
            >
              <ArrowLeft size={14} /> Ver site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md px-3.5 py-2 text-[13px] font-bold text-ink-faint transition hover:text-brand-hover"
            >
              Sair
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 px-5 pb-3 sm:px-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => selectTab(id)}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-[13px] font-bold transition ${
                tab === id
                  ? "bg-brand text-white"
                  : "text-ink-soft hover:bg-elevated hover:text-ink"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        {actionError && (
          <div className="mb-6 rounded-lg border border-brand/30 bg-brand-soft/30 px-4 py-3 text-sm font-semibold text-brand-hover">
            {actionError}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-ink-soft">Carregando mentorias...</p>
          </div>
        ) : tab === "resumo" ? (
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-card p-6 shadow-card ring-1 ring-line">
                <p className="font-display text-3xl font-extrabold tracking-tight">
                  {mentorias.length}
                </p>
                <p className="mt-1 text-[13px] font-semibold text-ink-soft">
                  Total de mentorias
                </p>
              </div>
              <div className="rounded-xl bg-card p-6 shadow-card ring-1 ring-line">
                <p className="font-display text-3xl font-extrabold tracking-tight">
                  {mentorias.filter((m) => m.published).length}
                </p>
                <p className="mt-1 text-[13px] font-semibold text-ink-soft">
                  Publicadas
                </p>
              </div>
              <div className="rounded-xl bg-card p-6 shadow-card ring-1 ring-line">
                <p className="font-display text-3xl font-extrabold tracking-tight">
                  {leads.length}
                </p>
                <p className="mt-1 text-[13px] font-semibold text-ink-soft">
                  Interessados
                </p>
              </div>
            </div>
          </div>
        ) : tab === "mentorias" ? (
          <div>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink-soft">
                Tudo que você mudar aqui aparece na hora na vitrine do site.
              </p>
              <button
                type="button"
                onClick={() => {
                  setEditing(undefined);
                  setFormOpen(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-brand-hover"
              >
                <Plus size={15} /> Nova mentoria
              </button>
            </div>

            {mentorias.length === 0 ? (
              <div className="rounded-xl border border-dashed border-line-strong py-20 text-center">
                <p className="font-display text-lg font-bold">Nenhuma mentoria cadastrada</p>
                <p className="mt-1 text-sm text-ink-soft">Crie a primeira.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {mentorias.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card ring-1 ring-line sm:p-5"
                  >
                    <span
                      className="hidden h-12 w-12 shrink-0 place-items-center rounded-lg font-display text-lg font-extrabold text-white sm:grid"
                      style={{ backgroundColor: m.accent }}
                    >
                      {m.title.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-display text-[15px] font-bold tracking-tight">
                          {m.title}
                        </p>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            m.published
                              ? "bg-green-900/30 text-green-400"
                              : "bg-gray-800 text-gray-400"
                          }`}
                        >
                          {m.published ? "Publicada" : "Rascunho"}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-[13px] text-ink-soft">
                        {m.category} · {m.encontros} · {m.topics.length} tópicos
                      </p>
                    </div>
                    <label className="flex shrink-0 items-center gap-2 text-xs font-semibold text-ink-soft">
                      <input
                        type="checkbox"
                        checked={m.published}
                        onChange={(e) => handleTogglePublished(m.id, e.target.checked)}
                        className="h-4 w-4 accent-brand"
                      />
                      Publicada
                    </label>
                    <button
                      type="button"
                      aria-label={`Editar ${m.title}`}
                      onClick={() => {
                        setEditing(m);
                        setFormOpen(true);
                      }}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line-strong text-ink-soft transition hover:border-brand hover:text-brand-hover"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Excluir ${m.title}`}
                      onClick={() => handleDelete(m.id, m.title)}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line-strong text-ink-soft transition hover:border-brand hover:text-brand-hover"
                    >
                      <Trash2 size={15} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : tab === "leads" ? (
          <div>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink-soft">
                Pessoas que clicaram em algum botão de WhatsApp do site.
              </p>
              {leads.length > 0 && (
                <button
                  type="button"
                  onClick={async () => {
                    if (!window.confirm("Apagar toda a lista de interessados?")) return;
                    const res = await clearLeadsAction();
                    if (res?.success) setLeads([]);
                    else setActionError(res?.error ?? "Erro ao limpar.");
                  }}
                  className="inline-flex items-center gap-1.5 self-start rounded-md border border-line-strong px-4 py-2.5 text-[13px] font-bold text-ink-soft transition hover:text-brand-hover"
                >
                  <Trash2 size={14} /> Limpar lista
                </button>
              )}
            </div>

            {leads.length === 0 ? (
              <div className="rounded-xl border border-dashed border-line-strong py-20 text-center">
                <p className="font-display text-lg font-bold">Nenhum interessado ainda</p>
                <p className="mt-1 text-sm text-ink-soft">
                  Os cliques no WhatsApp aparecem aqui automaticamente.
                </p>
              </div>
            ) : (
              <ul className="space-y-2.5">
                {leads.map((lead) => (
                  <li
                    key={lead.id}
                    className="flex flex-col gap-1 rounded-xl bg-card px-5 py-4 shadow-card ring-1 ring-line sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-bold">{lead.mentoria_title}</p>
                      <p className="mt-0.5 text-[13px] text-ink-soft">
                        {origemLabels[lead.origem] ?? lead.origem}
                      </p>
                    </div>
                    <p className="text-[13px] font-semibold text-ink-faint">
                      {formatLeadDate(lead.created_at)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </main>

      {formOpen && (
        <MentoriaForm
          initial={editing}
          takenSlugs={mentorias
            .filter((m) => m.id !== editing?.id)
            .map((m) => m.slug)}
          onCancel={() => {
            setFormOpen(false);
            setEditing(undefined);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
