"use client";

import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { useAdminAccess } from "@/hooks/use-admin-access";

export function AdminFloat() {
  const isAdmin = useAdminAccess();

  if (!isAdmin) return null;

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

export function AdminNavLink() {
  const isAdmin = useAdminAccess();

  if (!isAdmin) return null;

  return (
    <Link
      href="/admin"
      aria-label="Entrar no Painel Admin"
      title="Entrar no Painel Admin"
      className="grid h-9 w-9 shrink-0 place-items-center rounded-sm text-ink-soft ring-1 ring-line-strong transition hover:text-ink hover:ring-brand-ring"
    >
      <LayoutDashboard size={17} />
    </Link>
  );
}
