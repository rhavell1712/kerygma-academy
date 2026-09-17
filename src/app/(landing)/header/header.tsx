"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

const links = [
  { label: "A plataforma", href: "#plataforma" },
  { label: "O professor", href: "#professor" },
  { label: "Conteúdos", href: "#conteudos" },
  { label: "Depoimentos", href: "#depoimentos" },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-white/10 bg-bg/80 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.6)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-310 items-center justify-between gap-4 px-5 transition-[height] duration-300 sm:px-8 md:px-10 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-sm bg-brand font-display text-lg font-extrabold leading-none text-white transition group-hover:bg-brand-hover">
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
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-[13px] font-semibold text-ink-soft transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Link
          href="/plataforma"
          className="group hidden items-center gap-2 rounded-sm bg-white px-4 py-2 text-[13px] font-bold text-black transition hover:bg-brand-hover hover:text-white hover:scale-[1.03] active:scale-[0.98] sm:inline-flex"
        >
          Conhecer a plataforma
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>

        <button
          type="button"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-sm text-white lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-bg lg:hidden">
          <div className="mx-auto max-w-310 space-y-1 px-5 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-sm px-3 py-2.5 text-sm font-semibold text-ink-soft hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/plataforma"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-sm bg-brand px-4 py-3 text-sm font-bold text-white"
            >
              Conhecer a plataforma
              <ArrowRight size={15} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}