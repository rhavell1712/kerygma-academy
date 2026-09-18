import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

type AdminStatCardProps = {
  label: string;
  value: string;
  hint?: string;
  delta?: string;
  trend?: "up" | "down";
  icon?: LucideIcon;
};

export function AdminStatCard({
  label,
  value,
  hint,
  delta,
  trend = "up",
  icon: Icon,
}: AdminStatCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;

  return (
    <div className="rounded-lg border border-line-strong bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold text-ink-faint">{label}</p>
        {Icon && (
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-white/5 text-ink-soft">
            <Icon size={16} />
          </span>
        )}
      </div>

      <p className="mt-3 font-display text-2xl font-extrabold tracking-tight text-white">
        {value}
      </p>

      <div className="mt-2 flex items-center gap-2 text-xs">
        {delta && (
          <span
            className={`inline-flex items-center gap-1 font-bold ${
              trend === "up" ? "text-emerald-400" : "text-brand-hover"
            }`}
          >
            <TrendIcon size={13} />
            {delta}
          </span>
        )}
        {hint && <span className="text-ink-faint">{hint}</span>}
      </div>
    </div>
  );
}
