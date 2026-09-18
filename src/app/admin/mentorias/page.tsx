import { CalendarCheck, MessageSquare, Plus, Users } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminStatCard } from "@/components/admin/stat-card";
import { AdminPanel } from "@/components/admin/admin-panel";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { adminMentorships, type AdminMentorship } from "@/lib/admin-data";

export default function AdminMentorshipsPage() {
  const scheduled = adminMentorships.filter(
    (mentorship) => mentorship.status === "agendada",
  ).length;
  const ongoing = adminMentorships.filter(
    (mentorship) => mentorship.status === "em andamento",
  ).length;

  const columns: DataTableColumn<AdminMentorship>[] = [
    {
      key: "plan",
      header: "Mentoria",
      render: (mentorship) => (
        <div className="min-w-0">
          <p className="truncate font-bold text-white">{mentorship.plan}</p>
          <p className="mt-0.5 text-xs text-ink-faint">{mentorship.id}</p>
        </div>
      ),
    },
    {
      key: "student",
      header: "Aluno",
      render: (mentorship) => (
        <span className="text-ink-soft">{mentorship.student}</span>
      ),
    },
    {
      key: "teacher",
      header: "Professor",
      render: (mentorship) => (
        <span className="text-ink-soft">{mentorship.teacher}</span>
      ),
    },
    {
      key: "nextSession",
      header: "Próxima sessão",
      render: (mentorship) => (
        <span className="whitespace-nowrap font-semibold text-white">
          {mentorship.nextSession}
        </span>
      ),
    },
    {
      key: "schedule",
      header: "Horário",
      render: (mentorship) => (
        <span className="whitespace-nowrap text-ink-faint">
          {mentorship.schedule}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (mentorship) => <StatusBadge status={mentorship.status} />,
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
          Reagendar
        </button>
      ),
    },
  ];

  return (
    <>
      <AdminPageHeader
        eyebrow="Acompanhamento"
        title="Mentorias"
        description="Visualize mentorias ativas, alunos, professores e os próximos encontros."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-hover"
          >
            <Plus size={16} />
            Nova mentoria
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Mentorias ativas" value={`${adminMentorships.length}`} icon={MessageSquare} />
        <AdminStatCard label="Agendadas" value={`${scheduled}`} hint="próximos encontros" icon={CalendarCheck} />
        <AdminStatCard label="Em andamento" value={`${ongoing}`} hint="acompanhamentos" icon={Users} />
        <AdminStatCard label="Professores" value="3" hint="mentores ativos" icon={Users} />
      </div>

      <AdminPanel
        title="Agenda de mentorias"
        description="Encontros individuais e horários combinados"
        className="mt-6"
      >
        <DataTable
          columns={columns}
          rows={adminMentorships}
          getKey={(row) => row.id}
          minWidth="min-w-[980px]"
        />
      </AdminPanel>
    </>
  );
}
