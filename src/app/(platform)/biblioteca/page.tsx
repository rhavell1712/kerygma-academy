import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ownedItems, continueItems } from "@/lib/data";
import { ContentCard } from "@/components/platform/content/content-card";
import { ContinueCard } from "@/components/platform/content/continue-card";
import { Reveal } from "@/components/animations/reveal";
import { Stagger } from "@/components/animations/stagger";

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

  const totalOwned = ownedItems.length;

  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-20 pt-28 sm:px-8 md:px-10">
      <Reveal>
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
      </Reveal>

      <section className="mb-16">
        <Reveal>
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="font-display text-lg font-bold text-white">Continue estudando</h2>
            <span className="text-xs text-ink-faint">retomar de onde parou</span>
          </div>
        </Reveal>

        {continueItems.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line-strong py-16 text-center">
            <p className="font-display font-bold text-ink">Nenhum curso em andamento</p>
            <p className="mt-1 text-sm text-ink-soft">Explore o catálogo e comece algo novo.</p>
          </div>
        ) : (
          <Stagger
            direction="x"
            step={60}
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 py-2 sm:-mx-8 sm:px-8 md:-mx-10 md:px-10"
          >
            {continueItems.map((item, index) => (
              <ContinueCard
                key={item.slug}
                item={item}
                index={index}
                className="w-[min(100%,360px)]"
              />
            ))}
          </Stagger>
        )}
      </section>

      {ownedItems.length > 0 &&
        sections.map((section) => {
          const list = grouped[section.type];
          if (list.length === 0) return null;

          return (
            <section key={section.type} className="mb-14">
              <Reveal>
                <h2 className="mb-5 font-display text-lg font-bold text-white">
                  {section.label}
                </h2>
              </Reveal>
              <Stagger
                direction="up"
                step={55}
                className="grid grid-cols-2 gap-x-4 gap-y-8 min-[420px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              >
                {list.map((item, index) => (
                  <ContentCard
                    key={item.slug}
                    item={item}
                    className="w-full"
                    placeholderIndex={index + 1}
                  />
                ))}
              </Stagger>
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