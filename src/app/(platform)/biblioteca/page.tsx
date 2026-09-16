import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  MessagesSquare,
  Play,
} from "lucide-react";
import { ownedItems, continueItems } from "@/lib/data";
import { ContentCard } from "@/components/platform/content/content-card";
import { Cover } from "@/components/shared/cover";
import { TypeBadge } from "@/components/platform/content/type-badge";

const continueHref = (slug: string, type: string) =>
  type === "curso" ? `/aulas/${slug}` : `/item/${slug}`;

export default function BibliotecaPage() {
  const grouped = {
    curso: ownedItems.filter((i) => i.type === "curso"),
    pdf: ownedItems.filter((i) => i.type === "pdf"),
    livro: ownedItems.filter((i) => i.type === "livro"),
    mentoria: ownedItems.filter((i) => i.type === "mentoria"),
  };

  const sections = [
    { type: "curso" as const, label: "Meus cursos" },
    { type: "pdf" as const, label: "Materiais em PDF" },
    { type: "livro" as const, label: "Livros" },
    { type: "mentoria" as const, label: "Mentorias" },
  ];

  const icons = {
    curso: BookOpen,
    pdf: FileText,
    livro: BookOpen,
    mentoria: MessagesSquare,
  };

  const totalOwned = ownedItems.length;

  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-20 pt-28 sm:px-8 md:px-10">
      <header className="mb-12 md:mb-14">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white">
          Minha biblioteca
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          {totalOwned > 0
            ? `${totalOwned} ${totalOwned === 1 ? "conteúdo adquirido" : "conteúdos adquiridos"} · sempre à mão.`
            : "Seus conteúdos adquiridos, sempre à mão."}
        </p>
      </header>

      <section className="mb-16">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="font-display text-lg font-bold text-white">Continue estudando</h2>
          <span className="text-xs text-ink-faint">retomar de onde parou</span>
        </div>

        {continueItems.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line-strong py-16 text-center">
            <p className="font-display font-bold text-ink">Nenhum curso em andamento</p>
            <p className="mt-1 text-sm text-ink-soft">Explore o catálogo e comece algo novo.</p>
          </div>
        ) : (
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-2 sm:-mx-8 sm:px-8 md:-mx-10 md:px-10">
            {continueItems.map((item) => {
              const Icon = icons[item.type];
              const progress = item.progress ?? 0;
              const href = continueHref(item.slug, item.type);

              return (
                <Link
                  key={item.slug}
                  href={href}
                  className="group grid w-72 shrink-0 snap-start grid-cols-[92px_1fr] overflow-hidden rounded-lg border border-line-strong bg-card transition duration-300 hover:-translate-y-0.5 hover:border-brand-ring hover:shadow-card sm:w-80 sm:grid-cols-[130px_1fr]"
                >
                  <div className="relative aspect-3/4 h-full w-full">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.05]"
                      />
                    ) : (
                      <Cover
                        item={item}
                        title={false}
                        className="absolute inset-0 h-full w-full transition duration-300 group-hover:scale-[1.05]"
                      />
                    )}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10"
                    >
                      <div
                        className="h-full bg-brand"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-2">
                      <TypeBadge item={item} />
                      <span className="grid h-7 w-7 place-items-center rounded-md bg-white/5 text-ink-soft">
                        <Icon size={13} />
                      </span>
                    </div>

                    <h3 className="mt-3 line-clamp-2 font-display text-sm font-extrabold leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 truncate text-xs text-ink-soft">
                      {item.category}
                      {item.teacher ? ` · ${item.teacher}` : ""}
                    </p>

                    <div className="mt-auto pt-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-brand-hover">{progress}% concluído</span>
                        {item.type === "curso" && (
                          <span className="text-ink-faint">
                            {item.modules} módulos · {item.lessons} aulas
                          </span>
                        )}
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-brand"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-white transition group-hover:text-brand-hover">
                      <Play size={13} fill="currentColor" />
                      Continuar estudando
                      <ArrowRight
                        size={13}
                        className="text-brand-hover transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {ownedItems.length > 0 &&
        sections.map((section) => {
          const list = grouped[section.type];
          if (list.length === 0) return null;

          return (
            <section key={section.type} className="mb-14">
              <h2 className="mb-5 font-display text-lg font-bold text-white">
                {section.label}
              </h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 min-[420px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {list.map((item) => (
                  <ContentCard key={item.slug} item={item} className="w-full" />
                ))}
              </div>
            </section>
          );
        })}

      {ownedItems.length === 0 && (
        <div className="rounded-lg border border-dashed border-line-strong py-24 text-center">
          <p className="font-display text-lg font-bold text-ink">Sua biblioteca está vazia</p>
          <p className="mt-1 text-sm text-ink-soft">Adquira um curso ou material para começar.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/cursos"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-bold text-white shadow-brand transition hover:bg-brand-hover"
            >
              Conhecer mais cursos
            </Link>
            <Link
              href="/descobrir"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:border-white/50"
            >
              Explorar catálogo
            </Link>
          </div>
        </div>
      )}

      {ownedItems.length > 0 && (
        <section className="mt-20 overflow-hidden rounded-xl border border-line-strong bg-panel">
          <div className="relative p-8 text-center sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 0%, rgba(185,28,43,0.12), transparent 55%)",
              }}
            />

            <h2 className="relative font-display text-2xl font-extrabold tracking-tight text-white">
              Quer continuar estudando?
            </h2>
            <p className="relative mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
              Novos cursos, materiais e livros chegam todo o tempo. Volte ao
              catálogo e encontre o próximo passo da sua formação.
            </p>

            <div className="relative mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/cursos"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-brand transition hover:bg-brand-hover"
              >
                Conhecer mais cursos
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/descobrir"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/50"
              >
                Explorar catálogo
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}