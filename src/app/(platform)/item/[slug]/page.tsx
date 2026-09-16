import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Play, Clock, FileText, Star } from "lucide-react";
import { findBySlug, items } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { TypeBadge } from "@/components/platform/content/type-badge";
import { Cover } from "@/components/shared/cover";
import { ContentCard } from "@/components/platform/content/content-card";

type ItemPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ItemPage({ params }: ItemPageProps) {
  const { slug } = await params;
  const item = findBySlug(slug);
  if (!item) notFound();

  const related = items
    .filter((i) => i.slug !== item.slug && i.category === item.category)
    .slice(0, 5);

  const metaRows: { label: string; value: string }[] = [
    item.modules ? { label: "Módulos", value: `${item.modules}` } : null,
    item.lessons ? { label: "Aulas", value: `${item.lessons}` } : null,
    item.pages ? { label: "Páginas", value: `${item.pages}` } : null,
    item.duration ? { label: "Duração", value: item.duration } : null,
    item.level ? { label: "Nível", value: item.level } : null,
    item.teacher ? { label: "Professor", value: item.teacher } : null,
  ].filter((row): row is { label: string; value: string } => row !== null);

  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-16 pt-28 sm:px-8 md:px-10">
      <Link
        href="/plataforma"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition hover:text-white"
      >
        <ArrowLeft size={16} />
        Voltar
      </Link>

      <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-pop ring-1 ring-white/10">
            <Cover item={item} className="absolute inset-0 h-full w-full" showType />
          </div>
        </div>

        <div>
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

          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            {metaRows.map((row) => (
              <div key={row.label}>
                <p className="text-xs text-ink-faint">{row.label}</p>
                <p className="mt-0.5 font-bold text-white">{row.value}</p>
              </div>
            ))}
          </div>

          {item.type !== "livro" && (
            <div className="mt-8 rounded-lg border border-line-strong bg-panel p-5">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  {item.oldPrice && (
                    <p className="text-sm text-ink-faint line-through">{formatPrice(item.oldPrice)}</p>
                  )}
                  <p className="font-display text-2xl font-extrabold text-white">
                    {formatPrice(item.price)}
                  </p>
                </div>

                {item.owned ? (
                  <Link
                    href={item.type === "curso" ? `/aulas/${item.slug}` : "/biblioteca"}
                    className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-brand-hover hover:text-white"
                  >
                    <Play size={16} fill="currentColor" />
                    {item.type === "curso" ? "Continuar estudando" : "Acessar material"}
                  </Link>
                ) : (
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-white/50"
                    >
                      Minha lista
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-md bg-brand px-7 py-3 text-sm font-bold text-white shadow-brand transition hover:bg-brand-hover"
                    >
                      Comprar agora
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-faint">
                <Clock size={12} /> O acesso é liberado automaticamente após a confirmação do pagamento.
              </p>
            </div>
          )}

          {item.type === "livro" && (
            <div className="mt-8 rounded-lg border border-line-strong bg-panel p-5">
              <p className="text-sm leading-relaxed text-ink-soft">
                Este livro é vendido por parceiros externos. Veja a recomendação
                e descubra onde adquirir a obra física ou digital.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-brand-hover hover:text-white"
              >
                <FileText size={15} /> Ver recomendação
              </button>
            </div>
          )}

          {item.long && (
            <section className="mt-10">
              <h2 className="font-display text-lg font-bold text-white">Sobre este conteúdo</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{item.long}</p>
            </section>
          )}

          {item.type === "curso" && item.curriculum && (
            <section className="mt-10">
              <h2 className="font-display text-lg font-bold text-white">Conteúdo do curso</h2>
              <div className="mt-4 space-y-3">
                {item.curriculum.map((module, mi) => (
                  <div key={module.title} className="rounded-lg border border-line-strong bg-panel">
                    <p className="border-b border-line px-4 py-3 text-sm font-bold text-white">
                      {module.title}
                    </p>
                    <ul>
                      {module.lessons.map((lesson) => (
                        <li
                          key={lesson.title}
                          className="flex items-center justify-between px-4 py-2.5 text-sm text-ink-soft"
                        >
                          <span>
                            {mi}.{module.lessons.indexOf(lesson) + 1} · {lesson.title}
                          </span>
                          <span className="ml-4 flex shrink-0 items-center gap-2 text-xs text-ink-faint">
                            <Clock size={12} /> {lesson.duration}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 font-display text-lg font-bold text-white">
            Mais em {item.category}
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {related.map((rel) => (
              <ContentCard key={rel.slug} item={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}