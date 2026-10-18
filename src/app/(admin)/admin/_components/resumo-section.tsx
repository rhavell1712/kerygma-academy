import type { MentoriaRow } from "@/services/mentorias";

export function ResumoSection({
  mentorias,
  leadsCount,
}: {
  mentorias: MentoriaRow[];
  leadsCount: number;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-card p-6 shadow-card ring-1 ring-line">
          <p className="font-display text-3xl font-extrabold tracking-tight">
            {mentorias.length}
          </p>
          <p className="mt-1 text-[13px] font-semibold text-ink-soft">
            Total de mentorias
          </p>
        </div>
        <div className="rounded-xl bg-card p-6 shadow-card ring-1 ring-line">
          <p className="font-display text-3xl font-extrabold tracking-tight">
            {mentorias.filter((m) => m.published).length}
          </p>
          <p className="mt-1 text-[13px] font-semibold text-ink-soft">
            Publicadas
          </p>
        </div>
        <div className="rounded-xl bg-card p-6 shadow-card ring-1 ring-line">
          <p className="font-display text-3xl font-extrabold tracking-tight">
            {leadsCount}
          </p>
          <p className="mt-1 text-[13px] font-semibold text-ink-soft">
            Interessados
          </p>
        </div>
      </div>
    </div>
  );
}
