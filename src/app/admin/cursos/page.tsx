import { BookOpen, GraduationCap, Layers, Pencil, Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminStatCard } from "@/components/admin/stat-card";
import { AdminPanel } from "@/components/admin/admin-panel";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { adminContents, type AdminContent } from "@/lib/admin-data";
import { formatPrice } from "@/lib/utils";

export default function AdminCoursesPage() {
  const courses = adminContents.filter((content) => content.type === "curso");
  const totalLessons = courses.reduce((sum, course) => sum + course.lessons, 0);
  const published = courses.filter(
    (course) => course.status === "publicado",
  ).length;
  const drafts = courses.filter((course) => course.status === "rascunho").length;

  const columns: DataTableColumn<AdminContent>[] = [
    {
      key: "title",
      header: "Curso",
      render: (course) => (
        <div className="min-w-0">
          <p className="truncate font-bold text-white">{course.title}</p>
          <p className="mt-0.5 text-xs text-ink-faint">{course.category}</p>
        </div>
      ),
    },
    {
      key: "modules",
      header: "Módulos",
      align: "right",
      render: (course) => (
        <span className="font-semibold text-white">{course.modules}</span>
      ),
    },
    {
      key: "lessons",
      header: "Aulas",
      align: "right",
      render: (course) => (
        <span className="font-semibold text-white">{course.lessons}</span>
      ),
    },
    {
      key: "students",
      header: "Alunos",
      align: "right",
      render: (course) => (
        <span className="text-ink-soft">
          {course.students.toLocaleString("pt-BR")}
        </span>
      ),
    },
    {
      key: "price",
      header: "Valor",
      align: "right",
      render: (course) => (
        <span className="font-medium text-white">
          {formatPrice(course.price)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (course) => <StatusBadge status={course.status} />,
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
          Gerenciar
        </button>
      ),
    },
  ];

  return (
    <>
      <AdminPageHeader
        eyebrow="Ensino"
        title="Cursos"
        description="Organize módulos, aulas, alunos e publicação de cada formação."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-hover"
          >
            <Plus size={16} />
            Novo curso
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Cursos cadastrados" value={`${courses.length}`} icon={BookOpen} />
        <AdminStatCard label="Cursos publicados" value={`${published}`} hint="no catálogo" icon={GraduationCap} />
        <AdminStatCard label="Em rascunho" value={`${drafts}`} hint="aguardando revisão" icon={Layers} />
        <AdminStatCard label="Total de aulas" value={`${totalLessons}`} hint="em todos os cursos" icon={Layers} />
      </div>

      <AdminPanel
        title="Todos os cursos"
        description={`${courses.length} formações cadastradas`}
        className="mt-6"
        bodyClassName="mt-0"
      >
        <DataTable columns={columns} rows={courses} getKey={(row) => row.slug} />
      </AdminPanel>
    </>
  );
}
