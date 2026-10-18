import { useState } from "react";
import { ExternalLink, ImageIcon, Upload, X } from "lucide-react";
import { SelectMenu } from "@/components/shared/select-menu";
import { createClient } from "@/lib/supabase/client";
import type { MentoriaRow } from "@/services/mentorias";

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

export function MentoriaForm({
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
              <span className={label}>Nível</span>
              <SelectMenu
                value={form.level}
                options={["Iniciante", "Intermediário", "Avançado", "Todos os níveis"]}
                onChange={(value) => setForm((f) => ({ ...f, level: value }))}
                aria-label="Nível"
              />
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
              <div className="mt-3 flex items-start gap-3 rounded-xl border border-brand/15 bg-brand/5 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <ImageIcon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">
                    Imagem muito grande?
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-ink-faint">
                    Reduza o tamanho da imagem para facilitar o envio e manter sua página leve.
                  </p>

                  <a
                    href="https://www.fotor.com/pt/features/resize.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-lg border border-brand/20 bg-brand/10 px-3 py-2 text-xs font-semibold text-brand-hover transition-colors hover:bg-brand/15"
                  >
                    <ImageIcon className="h-3.5 w-3.5" />
                    Redimensionar imagem
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
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
