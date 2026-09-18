"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  FileText,
  Home,
  LayoutGrid,
  Library,
  MessageSquare,
  X,
} from "lucide-react";

const primary = [
  { label: "Início", href: "/plataforma", icon: Home },
  { label: "Cursos", href: "/cursos", icon: BookOpen },
  { label: "PDFs", href: "/pdfs", icon: FileText },
  { label: "Livros", href: "/livros", icon: Library },
];

const more = [
  { label: "Mentorias", href: "/mentorias", icon: MessageSquare },
  { label: "Minha biblioteca", href: "/biblioteca", icon: Library },
];

function isActive(pathname: string, href: string) {
  if (href === "/plataforma") return pathname === "/plataforma";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const moreActive = more.some((item) => isActive(pathname, item.href));

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <nav
            aria-label="Mais opções"
            className="absolute inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] rounded-xl border border-line-strong bg-panel p-2 shadow-pop"
          >
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                Mais
              </span>
              <button
                type="button"
                aria-label="Fechar"
                onClick={() => setOpen(false)}
                className="grid h-7 w-7 place-items-center rounded-md text-ink-soft transition hover:bg-white/5 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
            {more.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-brand-soft text-white"
                      : "text-ink-soft hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} className={active ? "text-brand-hover" : ""} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      <nav
        aria-label="Navegação principal"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-panel/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <ul className="mx-auto grid h-16 max-w-md grid-cols-5">
          {primary.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="relative flex h-full flex-col items-center justify-center gap-1 transition"
                >
                  {active && (
                    <span className="absolute top-0 h-0.5 w-8 rounded-full bg-brand" />
                  )}
                  <Icon
                    size={20}
                    className={active ? "text-brand-hover" : "text-ink-faint"}
                  />
                  <span
                    className={`text-[10px] font-bold tracking-tight ${
                      active ? "text-white" : "text-ink-faint"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}

          <li>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="relative flex h-full w-full flex-col items-center justify-center gap-1 transition"
            >
              {(open || moreActive) && (
                <span className="absolute top-0 h-0.5 w-8 rounded-full bg-brand" />
              )}
              <LayoutGrid
                size={20}
                className={open || moreActive ? "text-brand-hover" : "text-ink-faint"}
              />
              <span
                className={`text-[10px] font-bold tracking-tight ${
                  open || moreActive ? "text-white" : "text-ink-faint"
                }`}
              >
                Mais
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
