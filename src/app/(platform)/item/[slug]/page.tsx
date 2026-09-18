import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Star, BookOpen } from "lucide-react";
import { findBySlug, items } from "@/lib/data";
import { seedCompletedIds } from "@/lib/curriculum";
import { TypeBadge } from "@/components/platform/content/type-badge";
import { Cover } from "@/components/shared/cover";
import { CourseCurriculum } from "@/components/platform/content/course-curriculum";
import { ActionPanel } from "@/components/platform/content/action-panel";
import { MaterialSummary } from "@/components/platform/content/material-summary";
import { Reveal } from "@/components/animations/reveal";

type ItemPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ItemPage({ params }: ItemPageProps) {
  const { slug } = await params;
  const item = findBySlug(slug);
  if (!item) notFound();

  const isCurso = item.type === "curso" || item.type === "mentoria";
  const isLeitura = item.type === "livro" || item.type === "pdf";

  const metaRows: { label: string; value: string }[] = [
    item.modules ? { label: "Módulos", value: `${item.modules}` } : null,
    item.lessons ? { label: "Aulas", value: `${item.lessons}` } : null,
    item.pages ? { label: "Páginas", value: `${item.pages}` } : null,
    item.duration ? { label: "Duração", value: item.duration } : null,
    item.level ? { label: "Nível", value: item.level } : null,
    item.type === "pdf" ? { label: "Formato", value: item.format ?? "PDF" } : null,
    item.teacher
      ? { label: isCurso ? "Professor" : "Autor", value: item.teacher }
      : null,
  ].filter((row): row is { label: string; value: string } => row !== null);

  const completedLessons =
    item.owned && item.curriculum
      ? [...seedCompletedIds(item.curriculum, item.progress ?? 0)]
      : [];

  const placeholderIndex = items.findIndex((i) => i.slug === item.slug) + 1;

  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-16 pt-28 sm:px-8 md:px-10">
      <Reveal>
        <Link
          href="/plataforma"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
        <Reveal direction="left" delay={60} className="min-w-0">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-pop ring-1 ring-white/10">
              <Cover
                item={item}
                className="absolute inset-0 h-full w-full"
                showType
                placeholderIndex={placeholderIndex}
              />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal delay={90}>
            <div className="flex flex-wrap items-center gap-3">
              <TypeBadge item={item} />
              <span className="text-xs font-semibold text-ink-soft">{item.category}</span>
              {item.owned && (
                <span className="inline-flex items-center gap-1 rounded-sm bg-white px-2 py-[3px] text-[10px] font-bold uppercase tracking-wider text-black">
                  <Check size={11} /> Adquirido
                </span>
              )}
            </div>

            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {item.title}
            </h1>

            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              {item.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] font-medium text-ink-soft">
              <span className="inline-flex items-center gap-1.5">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                {item.rating.toFixed(1)}
              </span>
              {item.sold && <span>{item.sold} adquiridos</span>}
              {item.progress !== undefined && item.progress > 0 && (
                <span className="text-brand-hover">Em andamento · {item.progress}%</span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-6 sm:gap-8 text-sm">
              {metaRows.map((row) => (
                <div key={row.label}>
                  <p className="text-xs text-ink-faint">{row.label}</p>
                  <p className="mt-0.5 font-bold text-white">{row.value}</p>
                </div>
              ))}
            </div>

            <ActionPanel item={item} />
          </Reveal>

          {item.long && !isLeitura && (
            <Reveal className="mt-10">
              <section className="overflow-hidden rounded-lg border border-line-strong bg-panel">
                <div className="flex items-center gap-3 border-b border-line px-6 py-4">
                  <span className="h-2 w-8 rounded-full bg-brand" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
                    Sobre este conteúdo
                  </p>
                </div>
                <div className="px-6 py-5">
                  <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">{item.long}</p>
                </div>
              </section>
            </Reveal>
          )}

          {isLeitura && (
            <Reveal className="mt-10">
              <MaterialSummary item={item} />
            </Reveal>
          )}

          {item.type === "curso" && item.curriculum && (
            <Reveal className="mt-12">
              <section>
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
                      <span className="h-px w-8 bg-brand" />
                      Conteúdo do curso
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white">
                      Tudo o que você vai estudar
                    </h2>
                    <p className="mt-1 text-sm text-ink-soft">
                      {item.modules} módulos, {item.lessons} aulas no total.
                    </p>
                  </div>
                  <span className="hidden shrink-0 items-center gap-2 rounded-md border border-line-strong bg-panel px-3 py-1.5 text-xs font-bold text-ink-soft sm:inline-flex">
                    <BookOpen size={14} />
                    {item.modules} módulos · {item.lessons} aulas
                  </span>
                </div>

                <CourseCurriculum
                  modules={item.curriculum}
                  completed={completedLessons}
                />
              </section>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}