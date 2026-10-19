"use client";

import { useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, Video } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { Stagger } from "@/components/animations/stagger";
import { Cover } from "@/components/shared/cover";
import type { Mentoria } from "@/lib/mentorias";
import { MentoriaModal } from "./mentoria-modal";

function MentoriaCard({
  mentoria,
  placeholderIndex,
  style,
  className = "",
  onDetails,
}: {
  mentoria: Mentoria;
  placeholderIndex?: number;
  style?: CSSProperties;
  className?: string;
  onDetails: (m: Mentoria) => void;
}) {
  return (
    <article
      style={style}
      className={`group flex flex-col overflow-hidden rounded-xl bg-card shadow-card ring-1 ring-line transition duration-300 hover:-translate-y-1.5 hover:shadow-pop hover:ring-brand/40 ${className}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {mentoria.imageUrl ? (
          <Image
            src={mentoria.imageUrl}
            alt={mentoria.title}
            fill
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.07]"
          />
        ) : (
          <Cover
            item={{
              title: mentoria.title,
              accent: mentoria.accent,
              cover: mentoria.cover,
            }}
            title={false}
            placeholderIndex={placeholderIndex}
            className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-[1.07]"
          />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
        />

        <span className="absolute left-3 top-3 inline-flex items-center whitespace-nowrap rounded-sm bg-brand-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0b2510] sm:left-4 sm:top-4 sm:py-1 sm:text-[10px] sm:tracking-[0.16em]">
          Treinamento
        </span>
        <span className="absolute right-3 top-3 whitespace-nowrap rounded-sm bg-black/55 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white/90 ring-1 ring-white/15 backdrop-blur sm:right-4 sm:top-4 sm:text-[10px] sm:tracking-[0.14em]">
          {mentoria.level}
        </span>

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
            {mentoria.category}
          </p>
          <h3 className="mt-1 font-display text-xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md">
            {mentoria.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="line-clamp-2 flex-1 text-[13.5px] leading-relaxed text-ink-soft">
          {mentoria.description}
        </p>

        <p className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-xs font-semibold text-ink-faint">
          <Video size={14} className="text-brand-hover" />
          {mentoria.encontros} · {mentoria.duracao} · Ao vivo
        </p>

        <button
          type="button"
          onClick={() => onDetails(mentoria)}
          className="group/cta mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-3 text-[13px] font-bold text-white transition hover:bg-brand-hover active:scale-[0.99]"
        >
          Ver detalhes
          <ArrowRight size={15} className="transition-transform group-hover/cta:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}

export function Cursos({ mentorias }: { mentorias: Mentoria[] }) {
  const [selected, setSelected] = useState<Mentoria | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const active = selected
    ? (mentorias.find((m) => m.slug === selected.slug) ?? null)
    : null;

  const isScrollable = () => {
    const container = scrollerRef.current;
    return Boolean(container && container.scrollWidth > container.clientWidth + 1);
  };

  const goTo = (index: number) => {
    if (isScrollable()) {
      const card = scrollerRef.current?.querySelectorAll<HTMLElement>("article")[index];
      card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
    setCarouselIndex(index);
  };

  const handleScroll = () => {
    const container = scrollerRef.current;
    if (!container) return;
    const card = container.querySelectorAll<HTMLElement>("article")[0];
    if (!card) return;
    const cardStep = card.offsetWidth + 16;
    const maxIndex = Math.max(mentorias.length - 1, 0);
    const index = Math.min(Math.max(Math.round(container.scrollLeft / cardStep), 0), maxIndex);
    setCarouselIndex(index);
  };

  return (
    <section id="treinamentos" className="border-b border-line">
      <div className="mx-auto max-w-310 px-5 py-24 sm:px-8 md:px-10">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <Reveal direction="left">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
              <span className="h-px w-8 bg-brand" />
              Treinamentos
            </p>
          </Reveal>
          <TextReveal delay={80}>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl">
              Escolha seu treinamento
            </h2>
          </TextReveal>
          <Reveal direction="up" delay={140}>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              Sem aulas gravadas... Alguns cursos são presenciais com o professor indo até a sua igreja, e algumas modalidades são 100% online (plataforma de transmissão ao vivo). Toque em ver detalhes e chame no WhatsApp para agendar o seu treinamento.
            </p>
          </Reveal>
        </div>

        {mentorias.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line-strong py-20 text-center">
            <p className="font-display text-lg font-bold">Nenhuma mentoria disponível no momento</p>
            <p className="mt-1 text-sm text-ink-soft">Volte em breve para ver novidades.</p>
          </div>
        ) : (
          <>
            <div
              ref={scrollerRef}
              onScroll={handleScroll}
              className="overflow-x-auto scroll-snap-x pb-4 no-scrollbar -mb-4 sm:overflow-x-visible sm:pb-0 sm:mb-0"
              style={{ scrollBehavior: "smooth" }}
            >
              <Stagger
                direction="up"
                step={90}
                className="flex gap-4 sm:grid sm:gap-x-5 sm:gap-y-8 min-[480px]:grid-cols-2 lg:grid-cols-3"
              >
                {mentorias.map((mentoria, index) => (
                  <MentoriaCard
                    key={mentoria.slug}
                    mentoria={mentoria}
                    placeholderIndex={index + 1}
                    className="snap-start shrink-0 w-[300px] max-w-[86vw] sm:w-auto sm:max-w-none"
                    onDetails={setSelected}
                  />
                ))}
              </Stagger>
            </div>

            <div className="mt-6 flex flex-col items-center gap-2 sm:hidden">
              <div className="flex gap-1.5">
                {mentorias.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Treino ${index + 1}`}
                    aria-current={carouselIndex === index ? "true" : undefined}
                    className={`h-2 w-2 rounded-full transition-colors duration-300 ${carouselIndex === index
                        ? "bg-brand"
                        : "bg-ink-soft/40"
                      }`}
                  />
                ))}
              </div>
              <p className="text-[10px] text-ink-faint uppercase tracking-[0.18em]">
                {carouselIndex + 1} de {mentorias.length}
              </p>
            </div>
          </>
        )}
      </div>

      <MentoriaModal mentoria={active} onClose={() => setSelected(null)} />
    </section>
  );
}
