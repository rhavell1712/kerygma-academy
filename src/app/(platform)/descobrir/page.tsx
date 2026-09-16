"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { items, categories, typeLabels } from "@/lib/data";
import { ContentCard } from "@/components/platform/content/content-card";

const types = [
  { label: "Todos", value: "all" },
  { label: "Cursos", value: "curso" },
  { label: "PDFs", value: "pdf" },
  { label: "Livros", value: "livro" },
];

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("Todos");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (type !== "all" && item.type !== type) return false;
      if (category !== "Todos" && item.category !== category) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [query, type, category]);

  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-16 pt-28 sm:px-8 md:px-10">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white">
          Descobrir
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Explore o acervo da Kerygma por tipo, categoria ou busca direta.
        </p>
      </header>

      <div className="relative mb-6 max-w-xl">
        <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título, categoria ou descrição…"
          className="w-full rounded-md border border-line-strong bg-card py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-ink-faint focus:border-brand-ring"
        />
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setType(t.value)}
            className={`rounded-full px-4 py-1.5 text-[13px] font-bold transition ${
              type === t.value
                ? "bg-white text-black"
                : "bg-card text-ink-soft hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
        <Link
          href="/mentorias"
          className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-4 py-1.5 text-[13px] font-bold text-sky-300 transition hover:bg-sky-500/20"
        >
          Mentorias
          <ArrowRight size={13} />
        </Link>
      </div>

      <div className="no-scrollbar mb-10 flex gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition ${
              category === c
                ? "border-brand bg-brand text-white"
                : "border-line-strong text-ink-soft hover:border-brand-ring hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-line-strong py-24 text-center">
          <p className="font-display text-lg font-bold text-ink">Nenhum resultado encontrado</p>
          <p className="mt-1 text-sm text-ink-soft">Tente outro termo ou limpe os filtros.</p>
        </div>
      ) : (
        <>
          <p className="mb-5 text-sm text-ink-faint">
            {filtered.length} {filtered.length === 1 ? "item" : "itens"} · {typeLabels[type] ?? "Todos os tipos"}
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 min-[420px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filtered.map((item) => (
              <ContentCard key={item.slug} item={item} className="w-full" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}