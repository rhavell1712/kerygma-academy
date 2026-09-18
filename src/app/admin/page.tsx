import {
  BarChart3,
  BookOpen,
  CreditCard,
  FileText,
  Library,
  MessageSquare,
  Users,
  Wallet,
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminStatCard } from "@/components/admin/stat-card";
import { AdminPanel } from "@/components/admin/admin-panel";
import {
  adminActivity,
  adminStats,
  adminTopContents,
  adminContents,
} from "@/lib/admin-data";
import { typeLabels } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const toneDot: Record<string, string> = {
  brand: "bg-brand",
  green: "bg-emerald-400",
  sky: "bg-sky-400",
  amber: "bg-amber-400",
};

const distribution = [
  { label: "Cursos", value: adminContents.filter((c) => c.type === "curso").length, icon: BookOpen },
  { label: "PDFs", value: adminStats.pdfs, icon: FileText },
  { label: "Livros", value: adminStats.books, icon: Library },
  { label: "Mentorias", value: adminStats.mentorships, icon: MessageSquare },
];

const totalDistribution = distribution.reduce((sum, item) => sum + item.value, 0);

export default function AdminDashboardPage() {
  const maxStudents = adminTopContents[0]?.students ?? 1;

  return (
    <>
      <AdminPageHeader
        eyebrow="Visão geral"
        title="Painel administrativo"
        description="Acompanhe o movimento da plataforma: alunos, conteúdos publicados, vendas e atividade recente."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AdminStatCard
          label="Total de alunos"
          value={adminStats.students.toLocaleString("pt-BR")}
          delta={adminStats.studentsDelta}
          hint="no mês"
          icon={Users}
        />
        <AdminStatCard
          label="Conteúdos cadastrados"
          value={`${adminStats.contents}`}
          hint="cursos, PDFs e livros"
          icon={Library}
        />
        <AdminStatCard
          label="Cursos publicados"
          value={`${adminStats.approvedCourses}`}
          hint="disponíveis no catálogo"
          icon={BookOpen}
        />
        <AdminStatCard
          label="Conteúdos vendidos"
          value={`${adminStats.soldThisMonth}`}
          delta={adminStats.soldDelta}
          hint="neste mês"
          icon={CreditCard}
        />
        <AdminStatCard
          label="Receita demonstrativa"
          value={formatPrice(adminStats.revenue)}
          delta={adminStats.revenueDelta}
          hint="neste mês"
          icon={Wallet}
        />
        <AdminStatCard
          label="Taxa de conclusão"
          value={`${adminStats.completion}%`}
          hint="média da plataforma"
          icon={BarChart3}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <AdminPanel
          title="Atividade recente"
          description="Últimos acontecimentos da plataforma"
        >
          <ul className="divide-y divide-line">
            {adminActivity.map((activity) => (
              <li
                key={activity.id}
                className="flex items-start gap-3.5 px-5 py-4"
              >
                <span
                  className={`mt-1.5 size-2 shrink-0 rounded-full ${toneDot[activity.tone]}`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-white">
                    {activity.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-ink-soft">
                    {activity.detail}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] font-semibold text-ink-faint">
                  {activity.when}
                </span>
              </li>
            ))}
          </ul>
        </AdminPanel>

        <AdminPanel
          title="Conteúdos mais acessados"
          description="Por número de alunos"
        >
          <ul className="space-y-4 p-5">
            {adminTopContents.map((content) => (
              <li key={content.slug}>
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-sm font-semibold text-white">
                    {content.title}
                  </span>
                  <span className="shrink-0 text-xs font-bold text-ink-soft">
                    {content.students.toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{
                        width: `${Math.round((content.students / maxStudents) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="w-16 shrink-0 text-right text-[11px] font-semibold text-ink-faint">
                    {typeLabels[content.type] ?? content.type}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </AdminPanel>
      </div>

      <AdminPanel
        title="Composição do acervo"
        description={`${totalDistribution} conteúdos distribuídos por tipo`}
        className="mt-6"
      >
        <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
          {distribution.map((item) => {
            const Icon = item.icon;
            const percent = Math.round((item.value / totalDistribution) * 100);
            return (
              <div
                key={item.label}
                className="rounded-lg border border-line-strong bg-panel p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-brand-soft text-brand-hover">
                    <Icon size={15} />
                  </span>
                  <span className="font-display text-lg font-extrabold text-white">
                    {item.value}
                  </span>
                </div>
                <p className="mt-3 text-xs font-bold text-ink-soft">
                  {item.label}
                </p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-brand"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </AdminPanel>
    </>
  );
}
