import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export function AdminFloat() {
  return (
    <Link
      href="/admin"
      aria-label="Entrar no Painel Admin"
      className="fixed bottom-5 left-5 z-[60] inline-flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-[13px] font-bold text-bg shadow-pop ring-1 ring-line-strong transition hover:scale-105 hover:bg-brand-hover hover:text-white active:scale-95 sm:bottom-6 sm:left-6"
    >
      <LayoutDashboard size={17} />
      Entrar no Painel Admin
    </Link>
  );
}
