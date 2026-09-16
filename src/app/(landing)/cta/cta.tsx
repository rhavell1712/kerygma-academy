import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section>
      <div className="mx-auto max-w-180 px-5 py-28 text-center sm:px-8">
        <p className="flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
          <span className="h-px w-8 bg-brand" />
          Comece agora
          <span className="h-px w-8 bg-brand" />
        </p>
        <h2 className="mt-6 font-display text-3xl font-extrabold tracking-[-0.02em] text-white sm:text-[2.5rem]">
          Sua próxima etapa de estudo começa aqui.
        </h2>
        <p className="mx-auto mt-5 max-w-120 text-[15px] leading-relaxed text-ink-soft">
          Entre na plataforma, encontre um curso ou material que faça
          sentido para você e estude com seriedade — no seu ritmo.
        </p>

        <Link
          href="/plataforma"
          className="group mt-9 inline-flex items-center gap-2.5 rounded-sm bg-white px-8 py-4 text-sm font-bold text-black transition hover:bg-brand-hover hover:text-white"
        >
          Conhecer a plataforma
          <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}