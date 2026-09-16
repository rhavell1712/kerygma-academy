"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Library,
  Users,
  MessageSquare,
  Tag,
  Plus,
  Search,
} from "lucide-react";
import { items } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const menu = [
  { label: "Resumo", icon: LayoutDashboard },
  { label: "Cursos", icon: BookOpen },
  { label: "PDFs", icon: FileText },
  { label: "Livros", icon: Library },
  { label: "Mentorias", icon: MessageSquare },
  { label: "Alunos", icon: Users },
  { label: "Categorias", icon: Tag },
];

const stats = [
  { label: "Conteúdos ativos", value: "17" },
  { label: "Alunos", value: "1.204" },
  { label: "Vendas no mês", value: "R$ 24.890" },
  { label: "Taxa de conclusão", value: "68%" },
];

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("Cursos");
  const [query, setQuery] = useState("");

  const filtered = items.filter((i) =>
    i.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-bg text-ink antialiased">
      <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-line bg-panel px-4 py-6 md:flex">
        <div className="mb-8 flex items-center gap-2 px-2">
          <span className="grid h-8 w-8 place-items-center rounded-sm bg-brand font-display text-lg font-extrabold text-white">
            k
          </span>
          <span className="font-display text-sm font-extrabold tracking-tight text-white">
            Kerygma <span className="text-ink-faint">/ admin</span>
          </span>
        </div>

        <nav className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveSection(item.label)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition ${
                  activeSection === item.label
                    ? "bg-brand text-white"
                    : "text-ink-soft hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 px-5 py-8 md:px-10">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-white">
              Painel administrativo
            </h1>
            <p className="mt-1 text-sm text-ink-soft">
              Gerencie conteúdos, preços, pedidos e categorias.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-hover"
          >
            <Plus size={16} />
            Novo conteúdo
          </button>
        </header>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-line-strong bg-card p-5">
              <p className="text-xs text-ink-faint">{stat.label}</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-line-strong bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
            <h2 className="font-display text-base font-bold text-white">
              {activeSection} · {filtered.length} itens
            </h2>
            <div className="relative">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar…"
                className="w-52 rounded-md border border-line-strong bg-panel py-2 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-ink-faint focus:border-brand-ring"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-ink-faint">
                  <th className="px-5 py-3 font-bold">Conteúdo</th>
                  <th className="px-5 py-3 font-bold">Tipo</th>
                  <th className="px-5 py-3 font-bold">Categoria</th>
                  <th className="px-5 py-3 font-bold">Preço</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 font-bold">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((item) => (
                  <tr key={item.slug} className="transition hover:bg-white/[0.02]">
                    <td className="px-5 py-3 font-bold text-white">{item.title}</td>
                    <td className="px-5 py-3 text-ink-soft">{item.type}</td>
                    <td className="px-5 py-3 text-ink-soft">{item.category}</td>
                    <td className="px-5 py-3 font-medium text-white">{formatPrice(item.price)}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs font-bold text-ink-soft">
                        <span className="size-1.5 rounded-full bg-green-400" />
                        Publicado
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-md border border-line-strong px-3 py-1 text-xs font-bold text-ink-soft transition hover:border-white/30 hover:text-white"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="rounded-md border border-line-strong px-3 py-1 text-xs font-bold text-ink-soft transition hover:border-brand-ring hover:text-brand-hover"
                        >
                          Despublicar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}