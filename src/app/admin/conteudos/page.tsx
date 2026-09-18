"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, SlidersHorizontal } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { AdminEmptyState } from "@/components/admin/empty-state";
import { adminContents, type AdminContent } from "@/lib/admin-data";
import { typeLabels } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const types = [
  { label: "Todos", value: "all" },
  { label: "Cursos", value: "curso" },
  { label: "PDFs", value: "pdf" },
  { label: "Livros", value: "livro" },
  { label: "Mentorias", value: "mentoria" },
];

const statuses = [
  { label: "Todos", value: "all" },
  { label: "Publicados", value: "publicado" },
  { label: "Rascunhos", value: "rascunho" },
  { label: "Arquivados", value: "arquivado" },
];

export default function AdminContentsPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return adminContents.filter((content) => {
      if (type !== "all" && content.type !== type) return false;
      if (status !== "all" && content.status !== status) return false;
      if (q && !content.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, type, status]);

  const columns: DataTableColumn<AdminContent>[] = [
    {
      key: "title",
      header: "Conteúdo",
      render: (content) => (
        <div className="min-w-0">
          <p className="truncate font-bold text-white">{content.title}</p>
          <p className="mt-0.5 text-xs text-ink-faint">{content.category}</p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Tipo",
      render: (content) => (
        <span className="text-ink-soft">
          {typeLabels[content.type] ?? content.type}
        </span>
      ),
    },
    {
      key: "meta",
      header: "Módulos · Aulas",
      render: (content) =>
        content.type === "curso" ? (
          <span className="text-ink-soft">
            {content.modules} · {content.lessons}
          </span>
        ) : (
          <span className="text-ink-faint">—</span>
        ),
    },
    {
      key: "students",
      header: "Alunos",
      align: "right",
      render: (content) => (
        <span className="font-semibold text-white">
          {content.students.toLocaleString("pt-BR")}
        </span>
      ),
    },
    {
      key: "price",
      header: "Preço",
      align: "right",
      render: (content) => (
        <span className="font-medium text-white">
          {formatPrice(content.price)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (content) => <StatusBadge status={content.status} />,
    },
    {
      key: "updatedAt",
      header: "Atualizado",
      render: (content) => (
        <span className="whitespace-nowrap text-ink-faint">
          {content.updatedAt}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Ações",
      align: "right",
      render: () => (
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-line-strong px-2.5 py-1.5 text-xs font-bold text-ink-soft transition hover:border-white/30 hover:text-white"
        >
          <Pencil size={12} />
          Editar
        </button>
      ),
    },
  ];

  return (
    <>
      <AdminPageHeader
        eyebrow="Acervo"
        title="Conteúdos"
        description="Gerencie cursos, PDFs, livros e mentorias em um só lugar."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-hover"
          >
            <Plus size={16} />
            Novo conteúdo
          </button>
        }
      />

      <AdminPanel>
        <div className="flex flex-col gap-4 border-b border-line p-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por título…"
                className="w-full rounded-md border border-line-strong bg-panel py-2.5 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-ink-faint focus:border-brand-ring"
              />
            </div>
            <span className="inline-flex items-center gap-2 rounded-md border border-line-strong px-3 py-2.5 text-xs font-bold text-ink-soft">
              <SlidersHorizontal size={14} />
              {filtered.length} itens
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {types.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setType(item.value)}
                className={`rounded-full px-3.5 py-1.5 text-[12px] font-bold transition ${
                  type === item.value
                    ? "bg-white text-black"
                    : "bg-panel text-ink-soft hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {statuses.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setStatus(item.value)}
                className={`rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition ${
                  status === item.value
                    ? "border-brand bg-brand text-white"
                    : "border-line-strong text-ink-soft hover:border-brand-ring hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <AdminEmptyState
            icon={Search}
            title="Nenhum conteúdo encontrado"
            description="Ajuste a busca ou os filtros para ver outros resultados."
          />
        ) : (
          <DataTable columns={columns} rows={filtered} getKey={(row) => row.slug} />
        )}
      </AdminPanel>
    </>
  );
}
