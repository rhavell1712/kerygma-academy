import { Activity, Search, UserPlus, Users } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminStatCard } from "@/components/admin/stat-card";
import { AdminPanel } from "@/components/admin/admin-panel";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { adminStudents, type AdminStudent } from "@/lib/admin-data";

export default function AdminStudentsPage() {
  const active = adminStudents.filter((student) => student.status === "ativo");
  const trials = adminStudents.filter((student) => student.status === "trial");
  const averageProgress =
    adminStudents.reduce((sum, student) => sum + student.progress, 0) /
    adminStudents.length;

  const columns: DataTableColumn<AdminStudent>[] = [
    {
      key: "student",
      header: "Aluno",
      render: (student) => (
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-soft font-display text-xs font-extrabold text-brand-hover">
            {student.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate font-bold text-white">{student.name}</p>
            <p className="truncate text-xs text-ink-faint">{student.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "contents",
      header: "Conteúdos",
      align: "right",
      render: (student) => (
        <span className="font-semibold text-white">{student.contents}</span>
      ),
    },
    {
      key: "progress",
      header: "Progresso",
      render: (student) => (
        <div className="flex min-w-[130px] items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-brand"
              style={{ width: `${student.progress}%` }}
            />
          </div>
          <span className="w-9 shrink-0 text-right text-xs font-semibold text-ink-soft">
            {student.progress}%
          </span>
        </div>
      ),
    },
    {
      key: "joinedAt",
      header: "Cadastro",
      render: (student) => (
        <span className="whitespace-nowrap text-ink-faint">
          {student.joinedAt}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (student) => <StatusBadge status={student.status} />,
    },
    {
      key: "actions",
      header: "Ações",
      align: "right",
      render: () => (
        <button
          type="button"
          className="rounded-md border border-line-strong px-2.5 py-1.5 text-xs font-bold text-ink-soft transition hover:border-white/30 hover:text-white"
        >
          Ver perfil
        </button>
      ),
    },
  ];

  return (
    <>
      <AdminPageHeader
        eyebrow="Comunidade"
        title="Alunos"
        description="Acompanhe cadastros, conteúdos adquiridos e progresso de cada aluno."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-hover"
          >
            <UserPlus size={16} />
            Adicionar aluno
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Alunos na base" value={`${adminStudents.length}`} icon={Users} />
        <AdminStatCard label="Ativos" value={`${active.length}`} hint="com acesso liberado" icon={Activity} />
        <AdminStatCard label="Em teste" value={`${trials.length}`} hint="período de trial" icon={UserPlus} />
        <AdminStatCard
          label="Progresso médio"
          value={`${Math.round(averageProgress)}%`}
          hint="entre os alunos"
          icon={Activity}
        />
      </div>

      <AdminPanel
        title="Base de alunos"
        description={`${adminStudents.length} alunos demonstrativos`}
        className="mt-6"
        action={
          <div className="relative hidden sm:block">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
            />
            <input
              type="search"
              placeholder="Buscar aluno…"
              className="w-52 rounded-md border border-line-strong bg-panel py-2 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-ink-faint focus:border-brand-ring"
            />
          </div>
        }
      >
        <DataTable
          columns={columns}
          rows={adminStudents}
          getKey={(row) => row.id}
          minWidth="min-w-[900px]"
        />
      </AdminPanel>
    </>
  );
}
