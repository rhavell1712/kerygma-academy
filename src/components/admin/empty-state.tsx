import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type AdminEmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function AdminEmptyState({
  icon: Icon,
  title,
  description,
  action,
}: AdminEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-lg border border-line-strong bg-white/[0.03] text-ink-faint">
        <Icon size={20} />
      </span>
      <p className="mt-4 font-display text-base font-bold text-white">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-ink-soft">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
