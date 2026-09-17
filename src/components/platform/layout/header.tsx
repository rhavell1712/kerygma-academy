"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Início", href: "/plataforma" },
  { label: "Cursos", href: "/cursos" },
  { label: "PDFs", href: "/pdfs" },
  { label: "Livros", href: "/livros" },
  { label: "Mentorias", href: "/mentorias" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isPlataforma = pathname === "/plataforma";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isPlataforma;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-bg/90 shadow-card backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8 md:px-10">
        <div className="flex items-center gap-8">
          <Link href="/plataforma" className="group flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-sm bg-brand font-display text-lg font-extrabold text-white shadow-brand transition group-hover:bg-brand-hover">
              k
            </span>
            <span className="font-display text-[15px] font-extrabold tracking-tight text-white">
              Kerygma
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-[13px] font-semibold transition ${
                    active ? "text-white" : "text-ink-soft hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/descobrir"
            aria-label="Buscar"
            className="grid h-9 w-9 place-items-center rounded-md text-ink-soft transition hover:text-white hover:scale-105 active:scale-95"
          >
            <Search size={18} />
          </Link>

          <Link
            href="/biblioteca"
            className="hidden items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 text-[13px] font-semibold text-ink-soft transition hover:border-white/30 hover:text-white active:scale-95 sm:flex"
          >
            <User size={14} />
            Minha biblioteca
          </Link>

          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-md text-ink-soft hover:text-white lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-bg lg:hidden">
          <div className="mx-auto max-w-[1240px] space-y-1 px-5 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm font-semibold text-ink-soft hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
<Link
              href="/biblioteca"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-semibold text-white"
            >
              Minha biblioteca
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}