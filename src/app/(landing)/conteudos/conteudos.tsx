import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { Stagger } from "@/components/animations/stagger";

const catalog = [
  { type: "Cursos", text: "Formações completas, do básico ao avançado.", count: "17" },
  { type: "PDFs", text: "Materiais de estudo para baixar e revisar.", count: "12" },
  { type: "Livros", text: "Obras recomendadas pelos professores.", count: "15" },
  { type: "Mentorias", text: "Encontros individuais com professores.", count: "4" },
];

export function Conteudos() {
  return (
    <section id="conteudos" className="border-b border-white/10">
      <div className="mx-auto max-w-310 px-5 py-24 sm:px-8 md:px-10">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-14 sm:flex-row sm:items-end">
          <div>
            <Reveal direction="right">
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
                <span className="h-px w-8 bg-brand" />
                O acervo
              </p>
            </Reveal>
            <TextReveal delay={80}>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-white sm:text-4xl">
                Cursos, PDFs, livros e mentorias
              </h2>
            </TextReveal>
          </div>
          <Reveal direction="right" delay={200}>
            <Link
              href="/descobrir"
              className="group inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-brand-hover"
            >
              Explorar catálogo
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <Stagger
          direction="x"
          step={80}
          className="border-t border-white/10"
        >
          {catalog.map((content, i) => (
            <div
              key={content.type}
              className="group grid grid-cols-1 gap-y-2 border-b border-white/10 py-6 sm:grid-cols-[64px_160px_1fr_auto] sm:items-baseline sm:gap-x-6 sm:gap-y-0"
            >
              <span className="hidden font-display text-sm font-bold text-ink-faint transition-transform duration-300 group-hover:scale-110 sm:block sm:origin-left">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-base font-bold tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1">
                {content.type}
              </h3>
              <p className="text-sm text-ink-soft">{content.text}</p>
              <p className="text-sm font-bold text-brand-hover transition-transform duration-300 group-hover:-translate-x-0.5 sm:text-right">
                {content.count} {content.type === "Cursos" ? "cursos" : content.type === "Mentorias" ? "modalidades" : "materiais"}
              </p>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}