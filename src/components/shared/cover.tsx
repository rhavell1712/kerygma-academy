import { Image as ImageIcon } from "lucide-react";
import type { ContentItem } from "@/lib/types";

type CoverProps = {
  item: ContentItem;
  className?: string;
  showType?: boolean;
  title?: boolean;
  placeholderIndex?: number;
};

export function Cover({
  item,
  className = "",
  showType = false,
  title = true,
  placeholderIndex,
}: CoverProps) {
  const initial = item.title.charAt(0).toUpperCase();

  return (
    <div
      className={`relative overflow-hidden bg-elevated ${className}`}
      style={{
        background: `linear-gradient(140deg, ${item.cover.from} 0%, ${item.cover.to} 120%)`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.10), transparent 40%),radial-gradient(circle at 85% 100%, rgba(255,255,255,0.06), transparent 45%)",
        }}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-5 -top-10 select-none font-display text-[10rem] font-extrabold leading-none text-white/[0.05]"
      >
        {initial}
      </span>

      {showType && (
        <span
          className="absolute left-3 top-3 rounded-sm px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white"
          style={{ backgroundColor: item.accent }}
        >
          {item.type}
        </span>
      )}

      {placeholderIndex !== undefined && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2.5"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-black/30 text-white/75 ring-1 ring-white/15 backdrop-blur-sm">
            <ImageIcon size={18} strokeWidth={1.75} />
          </span>
          <span className="rounded-full bg-black/35 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
            imagem {placeholderIndex}
          </span>
        </div>
      )}

      {title && (
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-4 right-4 font-display text-sm font-bold tracking-tight text-white/90"
          style={{ WebkitLineClamp: 2 }}
        >
          {item.title}
        </span>
      )}
    </div>
  );
}