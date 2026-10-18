import Link from "next/link";
import { ArrowLeft, BarChart3, BookOpen, Settings, Users } from "lucide-react";

export type Tab = "resumo" | "mentorias" | "leads";

const tabs: { id: Tab; label: string; icon: typeof Users }[] = [
  { id: "resumo", label: "Visão geral", icon: BarChart3 },
  { id: "mentorias", label: "Mentorias", icon: BookOpen },
  { id: "leads", label: "Interessados", icon: Users },
];

export function AdminHeader({
  tab,
  onSelectTab,
  onLogout,
}: {
  tab: Tab;
  onSelectTab: (id: Tab) => void;
  onLogout: () => void;
}) {
  return (
    <header className="border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <img src="/img/logo_vetorizado.svg" alt="Mispá Treinamentos" className="h-9 w-auto block" />
          <div className="leading-none">
            <p className="font-display text-[15px] font-extrabold tracking-tight">
              Painel do professor
            </p>
            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint">
              Mispá Treinamentos
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1.5 rounded-md border border-line-strong px-3.5 py-2 text-[13px] font-bold text-ink-soft transition hover:text-ink"
          >
            <Settings size={14} /> Configurações
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-md border border-line-strong px-3.5 py-2 text-[13px] font-bold text-ink-soft transition hover:text-ink"
          >
            <ArrowLeft size={14} /> Ver site
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-md px-3.5 py-2 text-[13px] font-bold text-ink-faint transition hover:text-brand-hover"
          >
            Sair
          </button>
        </div>
      </div>
      <nav className="mx-auto flex max-w-6xl gap-1 px-5 pb-3 sm:px-8">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelectTab(id)}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-[13px] font-bold transition ${tab === id
              ? "bg-brand text-white"
              : "text-ink-soft hover:bg-elevated hover:text-ink"
              }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}
