"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Lock,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { ADMIN_PASSWORD } from "@/lib/site";
import { useLeads, useMentorias } from "@/lib/store";
import type { Mentoria } from "@/lib/mentorias";

type Tab = "resumo" | "mentorias" | "leads";

const origemLabels: Record<string, string> = {
  modal: "Detalhe da mentoria",
  flutuante: "Botão flutuante",
  "como-funciona": "Seção como funciona",
};

function isAuthed() {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem("kerygma-admin") === "1";
  } catch {
    return false;
  }
}

function formatDate(iso: string) {
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

/* ---------------- Formulário de mentoria ---------------- */

const emptyForm = {
  title: "",
  category: "",
  level: "Iniciante",
  description: "",
  long: "",
  topics: "",
  encontros: "",
  duracao: "",
  formato: "Ao vivo, individual ou em grupo",
  paraQuem: "",
  imageUrl: "",
  accent: "#b91c2b",
};

function MentoriaForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Mentoria;
  onSave: (data: Omit<Mentoria, "slug" | "cover">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    ...emptyForm,
    ...(initial
      ? {
          title: initial.title,
          category: initial.category,
          level: initial.level,
          description: initial.description,
          long: initial.long,
          topics: initial.topics.join("\n"),
          encontros: initial.encontros,
          duracao: initial.duracao,
          formato: initial.formato,
          paraQuem: initial.paraQuem,
          imageUrl: initial.imageUrl ?? "",
          accent: initial.accent,
        }
      : {}),
  });

  const set = (key: keyof typeof emptyForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const input =
    "w-full rounded-md border border-line-strong bg-bg px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-brand";
  const label =
    "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft";

  const valid =
    form.title.trim() && form.description.trim() && form.topics.trim();

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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>Nome da mentoria *</label>
            <input value={form.title} onChange={set("title")} placeholder="Ex: Pregação Expositiva" className={input} />
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
            <textarea value={form.topics} onChange={set("topics")} rows={5} placeholder={"Ex:\nQuem é Deus\nA Escritura\nSalvação"} className={input} />
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
            <input value={form.paraQuem} onChange={set("paraQuem")} placeholder="Ex: Líderes e pregadores" className={input} />
          </div>
          <div>
            <label className={label}>Foto (opcional)</label>
            <input value={form.imageUrl} onChange={set("imageUrl")} placeholder="/img/nome.png ou https://..." className={input} />
          </div>
          <div>
            <label className={label}>Cor de destaque</label>
            <div className="flex items-center gap-3">
              <input type="color" value={form.accent} onChange={set("accent")} className="h-10 w-14 cursor-pointer rounded-md border border-line-strong bg-bg" />
              <span className="text-xs text-ink-faint">{form.accent}</span>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} className="rounded-md border border-line-strong px-6 py-3 text-sm font-bold text-ink-soft transition hover:text-ink">
            Cancelar
          </button>
          <button
            type="button"
            disabled={!valid}
            onClick={() =>
              onSave({
                title: form.title.trim(),
                category: form.category.trim() || "Mentoria",
                level: form.level,
                description: form.description.trim(),
                long: form.long.trim() || form.description.trim(),
                topics: form.topics.split("\n").map((t) => t.trim()).filter(Boolean),
                encontros: form.encontros.trim() || "A combinar",
                duracao: form.duracao.trim() || "A combinar",
                formato: form.formato.trim() || "Ao vivo",
                paraQuem: form.paraQuem.trim() || "Todos",
                imageUrl: form.imageUrl.trim() || undefined,
                accent: form.accent,
              })
            }
            className="rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            {initial ? "Salvar mudanças" : "Publicar mentoria"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Página ---------------- */

export default function AdminPage() {
  const [authed, setAuthed] = useState(isAuthed);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [tab, setTab] = useState<Tab>("resumo");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Mentoria | undefined>(undefined);

  const { mentorias, add, update, remove, reset } = useMentorias();
  const { leads, clear } = useLeads();

  const [now] = useState(() => Date.now());

  const stats = useMemo(() => {
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const week = leads.filter((l) => new Date(l.data).getTime() >= weekAgo).length;
    const byMentoria = new Map<string, number>();
    for (const l of leads) byMentoria.set(l.mentoria, (byMentoria.get(l.mentoria) ?? 0) + 1);
    const top = [...byMentoria.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
    return { total: leads.length, week, top };
  }, [leads, now]);

  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-bg px-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (password === ADMIN_PASSWORD) {
              try {
                window.sessionStorage.setItem("kerygma-admin", "1");
              } catch {
                /* ignora */
              }
              setAuthed(true);
            } else {
              setError(true);
            }
          }}
          className="w-full max-w-sm rounded-xl bg-card p-8 shadow-pop ring-1 ring-line"
        >
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-brand-soft text-brand-hover">
            <Lock size={20} />
          </span>
          <h1 className="mt-5 font-display text-xl font-extrabold tracking-tight text-ink">
            Área do professor
          </h1>
          <p className="mt-1.5 text-sm text-ink-soft">
            Acesso restrito. Digite sua senha para gerenciar o site.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Senha"
            autoComplete="current-password"
            className="mt-6 w-full rounded-md border border-line-strong bg-bg px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-brand"
          />
          {error && (
            <p className="mt-2.5 text-[13px] font-semibold text-brand-hover">
              Senha incorreta. Tente de novo.
            </p>
          )}
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-brand px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-hover"
          >
            Entrar
          </button>
          <Link href="/" className="mt-4 flex items-center justify-center gap-1.5 text-[13px] font-semibold text-ink-faint transition hover:text-ink">
            <ArrowLeft size={14} /> Voltar ao site
          </Link>
        </form>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof Users }[] = [
    { id: "resumo", label: "Visão geral", icon: BarChart3 },
    { id: "mentorias", label: "Mentorias", icon: BookOpen },
    { id: "leads", label: "Interessados", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <header className="border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-sm bg-brand font-display text-lg font-extrabold leading-none text-white">
              k
            </span>
            <div className="leading-none">
              <p className="font-display text-[15px] font-extrabold tracking-tight">
                Painel do professor
              </p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                Kerygma Academy
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="inline-flex items-center gap-1.5 rounded-md border border-line-strong px-3.5 py-2 text-[13px] font-bold text-ink-soft transition hover:text-ink">
              <ArrowLeft size={14} /> Ver site
            </Link>
            <button
              type="button"
              onClick={() => {
                try {
                  window.sessionStorage.removeItem("kerygma-admin");
                } catch {
                  /* ignora */
                }
                setAuthed(false);
                setPassword("");
              }}
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
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-[13px] font-bold transition ${
                tab === id ? "bg-brand text-white" : "text-ink-soft hover:bg-elevated hover:text-ink"
              }`}
            >
              <Icon size={15} />
              {label}
              {id === "leads" && leads.length > 0 && (
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold ${tab === id ? "bg-white/20 text-white" : "bg-brand-soft text-brand-hover"}`}>
                  {leads.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        {tab === "resumo" && (
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "Mentorias publicadas", value: String(mentorias.length) },
                { label: "Interessados (total)", value: String(stats.total) },
                { label: "Interessados (7 dias)", value: String(stats.week) },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-card p-6 shadow-card ring-1 ring-line">
                  <p className="font-display text-3xl font-extrabold tracking-tight">{s.value}</p>
                  <p className="mt-1 text-[13px] font-semibold text-ink-soft">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-card p-6 shadow-card ring-1 ring-line">
              <h2 className="font-display text-base font-bold tracking-tight">
                Mentorias mais procuradas
              </h2>
              {stats.top.length === 0 ? (
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  Ninguém clicou no WhatsApp ainda. Quando alguém demonstrar
                  interesse pelo site, aparece aqui.
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {stats.top.map(([name, count]) => (
                    <li key={name}>
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="font-semibold">{name}</span>
                        <span className="font-bold text-brand-hover">{count}x</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-elevated">
                        <div
                          className="h-full rounded-full bg-brand"
                          style={{ width: `${Math.min(100, (count / Math.max(1, stats.total)) * 100)}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {tab === "mentorias" && (
          <div>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink-soft">
                Tudo que você mudar aqui aparece na hora na vitrine do site.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Voltar para as 6 mentorias originais? Suas mudanças serão perdidas.")) reset();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-md border border-line-strong px-4 py-2.5 text-[13px] font-bold text-ink-soft transition hover:text-ink"
                >
                  <RotateCcw size={14} /> Restaurar
                </button>
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
            </div>

            {mentorias.length === 0 ? (
              <div className="rounded-xl border border-dashed border-line-strong py-20 text-center">
                <p className="font-display text-lg font-bold">Nenhuma mentoria publicada</p>
                <p className="mt-1 text-sm text-ink-soft">A vitrine do site está vazia. Crie a primeira.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {mentorias.map((m) => (
                  <li key={m.slug} className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card ring-1 ring-line sm:p-5">
                    <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-lg font-display text-lg font-extrabold text-white sm:grid" style={{ backgroundColor: m.accent }}>
                      {m.title.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-[15px] font-bold tracking-tight">{m.title}</p>
                      <p className="mt-0.5 truncate text-[13px] text-ink-soft">
                        {m.category} · {m.encontros} · {m.topics.length} tópicos
                      </p>
                    </div>
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
                      onClick={() => {
                        if (window.confirm(`Excluir "${m.title}" da vitrine?`)) remove(m.slug);
                      }}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line-strong text-ink-soft transition hover:border-brand hover:text-brand-hover"
                    >
                      <Trash2 size={15} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === "leads" && (
          <div>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink-soft">
                Pessoas que clicaram em algum botão de WhatsApp do site.
              </p>
              {leads.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Apagar toda a lista de interessados?")) clear();
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
                <p className="mt-1 text-sm text-ink-soft">Os cliques no WhatsApp aparecem aqui automaticamente.</p>
              </div>
            ) : (
              <ul className="space-y-2.5">
                {leads.map((lead) => (
                  <li key={lead.id} className="flex flex-col gap-1 rounded-xl bg-card px-5 py-4 shadow-card ring-1 ring-line sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-bold">{lead.mentoria}</p>
                      <p className="mt-0.5 text-[13px] text-ink-soft">
                        {origemLabels[lead.origem] ?? lead.origem}
                      </p>
                    </div>
                    <p className="text-[13px] font-semibold text-ink-faint">{formatDate(lead.data)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>

      {formOpen && (
        <MentoriaForm
          initial={editing}
          onCancel={() => {
            setFormOpen(false);
            setEditing(undefined);
          }}
          onSave={(data) => {
            if (editing) update(editing.slug, data);
            else add(data);
            setFormOpen(false);
            setEditing(undefined);
            setTab("mentorias");
          }}
        />
      )}
    </div>
  );
}
