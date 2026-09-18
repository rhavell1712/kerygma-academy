"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  BookMarked,
  BookOpen,
  LayoutDashboard,
  Library,
  MessageSquare,
  Search,
  Settings,
  Users,
} from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Conteúdos", href: "/admin/conteudos", icon: Library },
  { label: "Cursos", href: "/admin/cursos", icon: BookOpen },
  { label: "Alunos", href: "/admin/alunos", icon: Users },
  { label: "Mentorias", href: "/admin/mentorias", icon: MessageSquare },
  { label: "Biblioteca", href: "/admin/biblioteca", icon: BookMarked },
  { label: "Configurações", href: "/admin/configuracoes", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-bg text-ink antialiased">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-line bg-panel lg:flex">
        <div className="flex items-center gap-2.5 px-5 py-6">
          <span className="grid h-8 w-8 place-items-center rounded-sm bg-brand font-display text-lg font-extrabold text-white">
            k
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-extrabold tracking-tight text-white">
              Kerygma
            </span>
            <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.24em] text-ink-faint">
              Admin
            </span>
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-brand text-white"
                    : "text-ink-soft hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-line p-3">
          <Link
            href="/plataforma"
            className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-semibold text-ink-soft transition hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft size={16} />
            Voltar à plataforma
          </Link>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
            <div className="flex items-center gap-2.5 lg:hidden">
              <span className="grid h-8 w-8 place-items-center rounded-sm bg-brand font-display text-lg font-extrabold text-white">
                k
              </span>
              <span className="font-display text-sm font-extrabold tracking-tight text-white">
                Admin
              </span>
            </div>

            <div className="relative hidden max-w-xs flex-1 sm:block">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
              />
              <input
                type="search"
                placeholder="Buscar no painel…"
                className="w-full rounded-md border border-line-strong bg-card py-2 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-ink-faint focus:border-brand-ring"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Notificações"
                className="relative grid h-9 w-9 place-items-center rounded-md text-ink-soft transition hover:bg-white/5 hover:text-white"
              >
                <Bell size={18} />
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-brand" />
              </button>
              <div className="flex items-center gap-2.5 rounded-md border border-line-strong py-1 pl-1 pr-3">
                <span className="grid h-7 w-7 place-items-center rounded-sm bg-brand-soft font-display text-xs font-extrabold text-brand-hover">
                  RN
                </span>
                <span className="hidden text-xs font-bold text-white sm:block">
                  Ricardo Nunes
                </span>
              </div>
            </div>
          </div>

          <nav className="no-scrollbar flex gap-1.5 overflow-x-auto border-t border-line px-4 py-2.5 lg:hidden">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-bold transition ${
                    active
                      ? "bg-brand text-white"
                      : "bg-card text-ink-soft hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="px-5 py-7 sm:px-8 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
