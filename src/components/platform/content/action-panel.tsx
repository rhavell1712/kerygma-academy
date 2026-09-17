import Link from "next/link";
import { Check, Clock, FileText, Plus } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type ActionPanelProps = {
  item: ContentItem;
};

function accessHref(item: ContentItem): string {
  if (item.type === "curso") {
    return item.curriculum ? `/aulas/${item.slug}` : "/biblioteca";
  }
  return "/biblioteca";
}

function ctaLabel(item: ContentItem): string {
  if (item.owned) {
    if (item.type === "curso") {
      return (item.progress ?? 0) > 0 ? "Continuar curso" : "Começar curso";
    }
    if (item.type === "pdf") return "Ler material";
    if (item.type === "livro") return "Ver recomendação";
    return "Agendar encontro";
  }

  if (item.type === "curso") return "Comprar curso";
  if (item.type === "pdf") return "Comprar material";
  if (item.type === "livro") return "Ver recomendação";
  return "Agendar";
}

function CtaIcon({ item, size = 15 }: { item: ContentItem; size?: number }) {
  if (item.type === "curso") {
    return (
      <svg width={size - 3} height={size - 3} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
    );
  }
  if (item.type === "pdf") return <FileText size={size} />;
  return <FileText size={size} />;
}

export function ActionPanel({ item }: ActionPanelProps) {
  const owned = Boolean(item.owned);
  const progress = item.progress ?? 0;

  return (
    <section className="mt-8 rounded-lg border border-line-strong bg-panel p-5">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
              owned
                ? "bg-white text-black"
                : "border border-white/20 text-ink-soft"
            }`}
          >
            {owned ? (
              <>
                <Check size={11} /> Adquirido
              </>
            ) : (
              "Disponível para compra"
            )}
          </span>

          <div className="mt-3">
            {item.oldPrice && (
              <p className="text-sm text-ink-faint line-through">
                {formatPrice(item.oldPrice)}
              </p>
            )}
            <p className="font-display text-2xl font-extrabold text-white">
              {formatPrice(item.price)}
            </p>
          </div>
        </div>

        {item.type === "livro" ? (
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-brand-hover hover:text-white"
          >
            <CtaIcon item={item} />
            {ctaLabel(item)}
          </button>
        ) : owned ? (
          <Link
            href={accessHref(item)}
            className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-brand-hover hover:text-white"
          >
            <CtaIcon item={item} />
            {ctaLabel(item)}
          </Link>
        ) : (
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-white/50"
            >
              <Plus size={15} /> Minha lista
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md bg-brand px-7 py-3 text-sm font-bold text-white shadow-brand transition hover:bg-brand-hover"
            >
              <CtaIcon item={item} />
              {ctaLabel(item)}
            </button>
          </div>
        )}
      </div>

      {item.type === "livro" ? (
        <p className="mt-4 flex items-start gap-1.5 text-xs leading-relaxed text-ink-faint">
          <Clock size={12} className="mt-0.5 shrink-0" />
          Este livro é vendido por parceiros externos. Veja a recomendação e
          descubra onde adquirir a obra física ou digital.
        </p>
      ) : (
        <>
          {owned && progress > 0 && (
            <div className="mt-4">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-brand transition-[width] duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-ink-faint">
                {progress}% · Em andamento
              </p>
            </div>
          )}

          <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-faint">
            <Clock size={12} /> O acesso é liberado automaticamente após a
            confirmação do pagamento.
          </p>
        </>
      )}
    </section>
  );
}