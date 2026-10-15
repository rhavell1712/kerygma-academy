"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, Video } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { Stagger } from "@/components/animations/stagger";
import { Cover } from "@/components/shared/cover";
import type { Mentoria } from "@/lib/mentorias";
import { useMentorias } from "@/lib/store";
import { MentoriaModal } from "./mentoria-modal";

function MentoriaCard({
  mentoria,
  placeholderIndex,
  style,
  onDetails,
}: {
  mentoria: Mentoria;
  placeholderIndex?: number;
  style?: CSSProperties;
  onDetails: (m: Mentoria) => void;
}) {
  return (
    <article
      style={style}
      className="group flex flex-col overflow-hidden rounded-xl bg-card shadow-card ring-1 ring-line transition duration-300 hover:-translate-y-1.5 hover:shadow-pop hover:ring-brand/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {mentoria.imageUrl ? (
          <Image
            src={mentoria.imageUrl}
            alt={mentoria.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.07]"
          />
        ) : (
          <Cover
            item={{
              slug: mentoria.slug,
              type: "mentoria",
              category: mentoria.category,
              title: mentoria.title,
              description: mentoria.description,
              price: 0,
              rating: 5,
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

        <span className="absolute left-4 top-4 inline-flex items-center rounded-sm bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-brand">
          Mentoria
        </span>
        <span className="absolute right-4 top-4 rounded-sm bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/90 ring-1 ring-white/15 backdrop-blur">
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

export function Cursos() {
  const { mentorias } = useMentorias();
  const [selected, setSelected] = useState<Mentoria | null>(null);

  const active = selected
    ? (mentorias.find((m) => m.slug === selected.slug) ?? null)
    : null;

  return (
    <section id="mentorias" className="border-b border-line">
      <div className="mx-auto max-w-310 px-5 py-24 sm:px-8 md:px-10">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <Reveal direction="left">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
              <span className="h-px w-8 bg-brand" />
              Mentorias
            </p>
          </Reveal>
          <TextReveal delay={80}>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl">
              Escolha sua mentoria
            </h2>
          </TextReveal>
          <Reveal direction="up" delay={140}>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              Nada de curso gravado e solitário: encontros ao vivo, com
              direção pessoal do professor. Toque em ver detalhes e chame
              no WhatsApp para garantir sua vaga.
            </p>
          </Reveal>
        </div>

        <Stagger
          direction="up"
          step={90}
          className="grid grid-cols-1 gap-x-5 gap-y-8 min-[480px]:grid-cols-2 lg:grid-cols-3"
        >
          {mentorias.map((mentoria, index) => (
            <MentoriaCard
              key={mentoria.slug}
              mentoria={mentoria}
              placeholderIndex={index + 1}
              onDetails={setSelected}
            />
          ))}
        </Stagger>
      </div>

      <MentoriaModal mentoria={active} onClose={() => setSelected(null)} />
    </section>
  );
}
