import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-310 px-5 py-12 sm:px-8 md:px-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-start">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-sm bg-brand font-display text-lg font-extrabold leading-none text-white">
                k
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[15px] font-extrabold tracking-tight text-white">
                  Kerygma
                </span>
                <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.24em] text-ink-faint">
                  Academy
                </span>
              </span>
            </div>

            <div className="flex flex-col gap-x-8 gap-y-2 text-sm text-ink-soft sm:flex-row sm:flex-wrap">
              <Link href="/plataforma" className="transition hover:text-white">
                Entrar na plataforma
              </Link>
              <a href="#professor" className="transition hover:text-white">
                O professor
              </a>
              <a href="#conteudos" className="transition hover:text-white">
                Conteúdos
              </a>
              <Link href="/login" className="transition hover:text-white">
                Login
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="flex flex-col justify-between gap-2 pt-6 text-xs text-ink-faint sm:flex-row">
            <span>© {new Date().getFullYear()} Kerygma Academy</span>
            <span>Feito para quem ama estudar a fé.</span>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}