import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Cover } from "@/components/shared/cover";
import { featuredItems } from "@/lib/data";

const stats = [
  { value: "40+", label: "conteúdos disponíveis" },
  { value: "3 mil+", label: "alunos" },
  { value: "4,9", label: "avaliação média" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-brand/[0.07] blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-310 items-center gap-10 px-5 pb-10 pt-24 sm:px-8 md:px-10 lg:min-h-[90vh] lg:gap-16 lg:pb-16 lg:pt-28 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
            <span className="h-px w-8 bg-brand" />
            Educação teológica em profundidade
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold leading-[1.03] tracking-[-0.02em] text-white">
            Estude teologia
            <br />
            com rigor, ordem
            <br />
            <span className="text-brand-hover">e profundidade.</span>
          </h1>

          <p className="mt-6 max-w-130 text-[15px] leading-relaxed text-ink-soft">
            A Kerygma Academy reúne cursos, materiais e mentorias de
            professores que estudam e ensinam com seriedade. Conhecimento
            profundo, apresentado como uma experiência de estudo honesta.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/plataforma"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-brand transition hover:bg-brand-hover"
            >
              Conhecer a plataforma
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#professor"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/50"
            >
              Conhecer o professor
            </a>
          </div>

          <div className="mt-14 grid max-w-130 grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-7">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 first:pl-0">
                <strong className="font-display text-2xl font-extrabold tracking-tight text-white">
                  {stat.value}
                </strong>
                <p className="mt-1 text-xs leading-tight text-ink-soft">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Capas do acervo */}
        <div className="relative mx-auto h-84 w-full max-w-105 sm:h-96 sm:max-w-115 lg:mx-0 lg:h-140 lg:w-full lg:max-w-120 lg:justify-self-center">
          <div className="absolute right-6 top-6 aspect-3/4 w-56 rotate-[-7deg] lg:right-8 lg:top-8 lg:w-72">
            <Cover
              item={featuredItems[0]}
              className="absolute inset-0 h-full w-full rounded-sm ring-1 ring-white/15 shadow-pop"
            />
          </div>
          <div className="absolute bottom-4 right-0 aspect-3/4 w-44 rotate-[5deg] lg:bottom-6 lg:w-56">
            {featuredItems[1] && (
              <Cover
                item={featuredItems[1]}
                className="absolute inset-0 h-full w-full rounded-sm ring-1 ring-white/15 shadow-pop"
              />
            )}
          </div>
          <div className="absolute left-4 top-14 aspect-3/4 w-32 rotate-[4deg] lg:left-2 lg:top-16 lg:w-40">
            {featuredItems[2] && (
              <Cover
                item={featuredItems[2]}
                className="absolute inset-0 h-full w-full rounded-sm ring-1 ring-white/15 shadow-pop"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}