"use client";

import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { useInView } from "@/hooks/use-in-view";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

const index = [
  {
    number: "01",
    title: "Cursos em vídeo",
    text: "Formações completas em módulos e aulas, com progresso acompanhado e certificado.",
  },
  {
    number: "02",
    title: "Materiais em PDF",
    text: "Guias, apostilas e cadernos de estudo para aprofundar cada tema no seu ritmo.",
  },
  {
    number: "03",
    title: "Livros e biblioteca",
    text: "Uma biblioteca digital reunindo as melhores referências teológicas.",
  },
  {
    number: "04",
    title: "Mentorias",
    text: "Acompanhamento individual com professores para orientar seus estudos.",
  },
];

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({
    rootMargin: "-42% 0px -42% 0px",
    threshold: 0,
  });

  return (
    <div
      ref={ref}
      data-active={inView}
      className="step-row group grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-b border-white/10 py-6 transition-colors hover:bg-white/2 sm:grid-cols-[64px_200px_1fr] sm:items-baseline sm:gap-6 sm:py-7"
    >
      <span className="number font-display text-sm font-bold text-brand-hover">
        {number}
      </span>
      <h3 className="font-display text-lg font-bold tracking-tight text-white">
        {title}
      </h3>
      <p className="col-span-2 text-sm leading-relaxed text-ink-soft sm:col-span-1 sm:col-start-3">
        {text}
      </p>
      <span
        aria-hidden="true"
        className="step-underline absolute bottom-0 left-0 h-px w-full bg-brand"
      />
    </div>
  );
}

export function Plataforma() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <section id="plataforma" className="border-b border-white/10">
      <div className="mx-auto max-w-310 px-5 py-24 sm:px-8 md:px-10">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <Reveal direction="left">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
              <span className="h-px w-8 bg-brand" />
              A plataforma
            </p>
          </Reveal>
          <TextReveal delay={80}>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-white sm:text-4xl">
              Um lugar para estudar com profundidade
            </h2>
          </TextReveal>
          <Reveal direction="up" delay={140}>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              Não é mais um acúmulo de vídeos soltos. É um percurso
              cuidadosamente organizado, com materiais de apoio e orientação,
              para quem leva a sério o próprio estudo.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative border-t border-white/10">
          {index.map((item) => (
            <Step key={item.number} {...item} />
          ))}

          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-px left-0 right-0 h-[2px]"
          >
            <span
              className="block h-full w-full origin-left bg-brand"
              style={{ transform: `scale3d(${progress}, 1, 1)` }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}