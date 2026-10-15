"use client";

import { MousePointerClick, MessageCircle, Video, Sprout } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { Stagger } from "@/components/animations/stagger";
import { waLink } from "@/lib/site";
import { trackLead } from "@/lib/store";

const steps = [
  {
    icon: MousePointerClick,
    number: "01",
    title: "Escolha sua mentoria",
    text: "Veja a vitrine acima e toque em ver detalhes para conhecer o conteúdo de cada mentoria.",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Chame no WhatsApp",
    text: "Fale direto com a gente, tire suas dúvidas e agende seus encontros no melhor horário.",
  },
  {
    icon: Video,
    number: "03",
    title: "Encontros ao vivo",
    text: "Aulas ao vivo e personalizadas, com leitura guiada, exercícios e espaço para suas perguntas.",
  },
  {
    icon: Sprout,
    number: "04",
    title: "Cresça acompanhado",
    text: "Acompanhamento próximo entre os encontros, com direção clara para o seu próximo passo.",
  },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="border-b border-line bg-panel">
      <div className="mx-auto max-w-310 px-5 py-24 sm:px-8 md:px-10">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <Reveal direction="left">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
              <span className="h-px w-8 bg-brand" />
              Como funciona
            </p>
          </Reveal>
          <TextReveal delay={80}>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl">
              Mentoria de verdade, do início ao fim
            </h2>
          </TextReveal>
          <Reveal direction="up" delay={140}>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              Um caminho simples e acompanhado: você nunca estuda sozinho
              e sempre sabe qual é o próximo passo.
            </p>
          </Reveal>
        </div>

        <Stagger
          direction="up"
          step={100}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map(({ icon: Icon, number, title, text }) => (
            <div
              key={number}
              className="group rounded-xl bg-card p-6 shadow-card ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:ring-brand/40"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-soft text-brand-hover transition group-hover:bg-brand group-hover:text-white">
                  <Icon size={19} />
                </span>
                <span className="font-display text-sm font-bold text-brand-hover">
                  {number}
                </span>
              </div>
              <h3 className="mt-5 font-display text-base font-bold tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                {text}
              </p>
            </div>
          ))}
        </Stagger>

        <Reveal direction="up" delay={120} className="mt-10 text-center">
          <a
            href={waLink("Olá! Quero entender como funciona a mentoria.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackLead("Todas as mentorias", "como-funciona")}
            className="inline-flex items-center gap-2.5 rounded-sm bg-[#25d366] px-8 py-4 text-sm font-bold text-[#062b16] transition hover:brightness-110 hover:scale-[1.02] active:scale-[0.99]"
          >
            <MessageCircle size={17} />
            Falar no WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
