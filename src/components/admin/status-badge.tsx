type StatusBadgeProps = {
  status: string;
  className?: string;
};

const styles: Record<string, string> = {
  publicado: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  ativo: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  "em andamento": "border-sky-500/25 bg-sky-500/10 text-sky-300",
  agendada: "border-sky-500/25 bg-sky-500/10 text-sky-300",
  rascunho: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  trial: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  pendente: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  arquivado: "border-line-strong bg-white/[0.04] text-ink-soft",
  inativo: "border-line-strong bg-white/[0.04] text-ink-soft",
  concluída: "border-brand-ring bg-brand-soft text-brand-hover",
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const style = styles[status] ?? "border-line-strong bg-white/[0.04] text-ink-soft";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold capitalize ${style} ${className}`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}
