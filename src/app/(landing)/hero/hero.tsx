import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Cover } from "@/components/shared/cover";

const heroCovers = [
  {
    title: "Fundamentos da Fé",
    accent: "#b91c2b",
    cover: { from: "#141114", to: "#b91c2b" },
    imageUrl: "/img/639d7879-9d21-413f-b262-c9bd767179cc.png",
  },
  {
    title: "O Cristo das Escrituras",
    accent: "#c8952c",
    cover: { from: "#141114", to: "#c8952c" },
    imageUrl: "/img/Cristologia.jpg",
  },
  {
    title: "Interpretação Bíblica na Prática",
    accent: "#2f6f6c",
    cover: { from: "#141114", to: "#2f6f6c" },
    imageUrl: "/img/hermeneutica.avif",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="pointer-events-none absolute -inset-10">
        <div className="hero-grid absolute inset-0" />
      </div>
      <div
        aria-hidden="true"
        className="animate-drift pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-brand/[0.07] blur-[120px]"
      />

      <div>
        <div className="relative mx-auto grid max-w-310 items-center gap-10 px-5 pb-10 pt-24 sm:px-8 md:px-10 lg:min-h-[90vh] lg:gap-16 lg:pb-16 lg:pt-28 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p
              className="hero-anim-left flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft"
              style={{ "--hero-delay": "60ms" } as CSSProperties}
            >
              <span className="h-px w-8 bg-brand" />
              Educação teológica em profundidade
            </p>

            <h1 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink">
              <span
                className="hero-anim-line"
                style={{ "--hero-delay": "140ms" } as CSSProperties}
              >
                <span className="hero-line-inner">Teologia responsável</span>
              </span>
              <span
                className="hero-anim-line"
                style={{ "--hero-delay": "220ms" } as CSSProperties}
              >
                <span className="hero-line-inner">e equilibrada para</span>
              </span>
              <span
                className="hero-anim-line"
                style={{ "--hero-delay": "300ms" } as CSSProperties}
              >
                <span className="hero-line-inner text-brand-hover">
                  o ministério
                </span>
              </span>
            </h1>

            <p
              className="hero-anim mt-6 max-w-130 text-[14px] leading-relaxed text-ink-soft"
              style={{ "--hero-delay": "420ms" } as CSSProperties}
            >
              Se você busca aperfeicoamento ministerial e crescimento da sua comunidade está no lugar certo.
              A Mispá treinamentos reúne o que há de melhor no universo da teologia reformada, e abraça a efervescência de uma perspectiva continuísta para preparar treinamentos e mentorias que atendam as demandas da sua igreja. Tudo isso com valores acessíveis a todas as realidades.
            </p>

            <div
              className="hero-anim mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ "--hero-delay": "520ms" } as CSSProperties}
            >
              <Link
                href="#treinamentos"
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-brand transition hover:bg-brand-hover hover:scale-[1.03] active:scale-[0.98]"
              >
                Ver treinamentos
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#professor"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-line-strong px-7 py-3.5 text-sm font-bold text-ink transition hover:border-ink/40 hover:scale-[1.03] active:scale-[0.98]"
              >
                Conhecer o professor
              </a>
            </div>

          </div>

          {/* Capas do acervo */}
          <div
            className="relative mx-auto h-84 w-full max-w-105 sm:h-96 sm:max-w-115 lg:mx-0 lg:h-140 lg:w-full lg:max-w-120 lg:justify-self-center"
          >
            <div
              className="hero-cover absolute right-6 top-6 aspect-3/4 w-56 rotate-[-7deg] lg:right-8 lg:top-8 lg:w-72"
              style={{ "--hero-delay": "340ms" } as CSSProperties}
            >
              <Cover
                item={heroCovers[0]}
                placeholderIndex={1}
                className="absolute inset-0 h-full w-full rounded-sm ring-1 ring-line-strong shadow-pop"
              />
            </div>
            <div
              className="hero-cover absolute bottom-4 right-0 aspect-3/4 w-44 rotate-[5deg] lg:bottom-6 lg:w-56"
              style={{ "--hero-delay": "470ms" } as CSSProperties}
            >
              <Cover
                item={heroCovers[1]}
                placeholderIndex={2}
                className="absolute inset-0 h-full w-full rounded-sm ring-1 ring-line-strong shadow-pop"
              />
            </div>
            <div
              className="hero-cover absolute left-4 top-14 aspect-3/4 w-32 rotate-[4deg] lg:left-2 lg:top-16 lg:w-40"
              style={{ "--hero-delay": "590ms" } as CSSProperties}
            >
              <Cover
                item={heroCovers[2]}
                placeholderIndex={3}
                className="absolute inset-0 h-full w-full rounded-sm ring-1 ring-line-strong shadow-pop"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}