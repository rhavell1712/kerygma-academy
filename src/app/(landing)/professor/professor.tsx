import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";

export function Professor() {
  return (
    <section id="professor" className="border-b border-line bg-panel">
      <div className="mx-auto grid max-w-310 items-start gap-10 px-5 py-24 sm:px-8 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-x-14 lg:gap-y-0">
        <div className="lg:col-start-2 lg:row-start-1">
          <Reveal direction="left">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
              <span className="h-px w-8 bg-brand" />
              Quem ensina
            </p>
          </Reveal>
          <TextReveal delay={80}>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl">
              Aprenda com quem também continua estudando.
            </h2>
          </TextReveal>
        </div>

        <div className="relative aspect-3/4 max-w-95 lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <div
            aria-hidden="true"
            className="absolute -left-6 -top-6 h-full w-full rounded-sm border border-line-strong"
          />
          <Reveal
            direction="scale"
            duration={1100}
            className="group absolute inset-0 overflow-hidden rounded-sm bg-[linear-gradient(145deg,#191019,#3a0d14)] shadow-pop ring-1 ring-line-strong"
          >
            <Image
              src="/img/professor.png"
              alt="Prof. Antonio Lacerda"
              fill
              sizes="(max-width: 1024px) 90vw, 400px"
              quality={90}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"
            />
            <p className="absolute bottom-5 left-5 font-display text-sm font-bold text-white/90 transition-transform duration-700 group-hover:-translate-y-0.5">
              Prof. Antonio Lacerda
            </p>
          </Reveal>
        </div>

        <div className="lg:col-start-2 lg:row-start-2">
          <Reveal direction="up" delay={140}>
            <p className="mt-6 max-w-140 text-[15px] leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">Antonio Lacerda</strong>,
              esposo da Thalita, pai do Levi e da sara, estudante de Teologia e
              História, atualmente{" "}
              <strong className="font-semibold text-ink">
                segundo pastor e vice presidente da Igreja Evangélica Missão Paraju
              </strong>{" "}
              em Domingos Martins ES. Atua junto ao presbitério da Igreja e é
              responsável pela produção de todo material teológico da igreja. Autor
              do livro: &ldquo;
              <strong className="font-semibold text-ink">
                Nas trincheiras do bom Cambate
              </strong>
              &rdquo; e autor de varios textos como &ldquo;
              <strong className="font-semibold text-ink">Na praça</strong>
              &rdquo; publicado pelo centro de estudos Bíblicos, (CEBI). Tem atuado
              como mestre na comunidade e produzido material de treinamentos para
              ajudar  o desenvolvimento de várias igrejas independentes  em
              crescimento. Atuou como{" "}
              <strong className="font-semibold text-ink">
                missionário por mais de duas decadas
              </strong>{" "}
              e ainda mantém vínculos com o campo missionário.
            </p>
          </Reveal>

          <Reveal direction="left" delay={200}>
            <blockquote className="mt-10 border-l-2 border-brand pl-6">
              <p className="max-w-130 font-display text-2xl font-bold leading-snug tracking-[-0.01em] text-ink">
                &ldquo;Ensinar não é entregar respostas. É ajudar alguém a
                fazer perguntas melhores.&rdquo;
              </p>
              <footer className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-ink-faint">
                Prof. Antonio Lacerda
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
