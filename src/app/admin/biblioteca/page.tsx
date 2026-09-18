import { BookMarked, BookOpen, FileText, Upload } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminStatCard } from "@/components/admin/stat-card";
import { AdminPanel } from "@/components/admin/admin-panel";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { adminContents, type AdminContent } from "@/lib/admin-data";
import { typeLabels } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function AdminLibraryPage() {
  const libraryItems = adminContents.filter(
    (content) => content.type === "pdf" || content.type === "livro",
  );
  const pdfs = libraryItems.filter((content) => content.type === "pdf");
  const books = libraryItems.filter((content) => content.type === "livro");

  const columns: DataTableColumn<AdminContent>[] = [
    {
      key: "title",
      header: "Material",
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
      key: "students",
      header: "Leitores",
      align: "right",
      render: (content) => (
        <span className="text-ink-soft">
          {content.students.toLocaleString("pt-BR")}
        </span>
      ),
    },
    {
      key: "price",
      header: "Valor",
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
  ];

  return (
    <>
      <AdminPageHeader
        eyebrow="Acervo digital"
        title="Biblioteca"
        description="Materiais em PDF e livros recomendados disponíveis para os alunos."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-hover"
          >
            <Upload size={16} />
            Enviar material
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Itens na biblioteca" value={`${libraryItems.length}`} icon={BookMarked} />
        <AdminStatCard label="PDFs e materiais" value={`${pdfs.length}`} icon={FileText} />
        <AdminStatCard label="Livros" value={`${books.length}`} hint="recomendados" icon={BookOpen} />
        <AdminStatCard label="Leitores" value="3.9 mil" hint="acessos no mês" icon={BookMarked} />
      </div>

      <AdminPanel
        title="Materiais disponíveis"
        description={`${libraryItems.length} itens entre PDFs e livros`}
        className="mt-6"
      >
        <DataTable
          columns={columns}
          rows={libraryItems}
          getKey={(row) => row.slug}
          minWidth="min-w-[820px]"
        />
      </AdminPanel>
    </>
  );
}
