import type { ContentItem } from "@/lib/types";

type TypeBadgeProps = {
  item: ContentItem;
  className?: string;
};

export function TypeBadge({ item, className = "" }: TypeBadgeProps) {
  const styles: Record<string, string> = {
    curso:
      "bg-brand-soft text-brand-hover border-brand-ring",
    pdf: "bg-white/[0.06] text-ink-soft border-line-strong",
    livro: "bg-amber-500/10 text-amber-300 border-amber-500/25",
    mentoria: "bg-sky-500/10 text-sky-300 border-sky-500/25",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm border px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.14em] ${styles[item.type]} ${className}`}
    >
      {item.type === "curso" && (
        <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
      {item.type}
    </span>
  );
}