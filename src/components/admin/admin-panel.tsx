import type { ReactNode } from "react";

type AdminPanelProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function AdminPanel({
  title,
  description,
  action,
  children,
  className = "",
  bodyClassName = "",
}: AdminPanelProps) {
  return (
    <section
      className={`overflow-hidden rounded-lg border border-line-strong bg-card ${className}`}
    >
      {(title || description || action) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div className="min-w-0">
            {title && (
              <h2 className="font-display text-sm font-bold text-white">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-0.5 text-xs text-ink-faint">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
