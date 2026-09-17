"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, FileText } from "lucide-react";
import type { ContentItem } from "@/lib/types";

type MaterialSummaryProps = {
  item: ContentItem;
};

export function MaterialSummary({ item }: MaterialSummaryProps) {
  const [openPart, setOpenPart] = useState<number | null>(0);

  if (item.type !== "livro" && item.type !== "pdf") return null;

  const hasLong = Boolean(item.long);
  const toc = item.toc ?? [];
  const hasToc = toc.length > 0;

  return (
    <section className="overflow-hidden rounded-lg border border-line-strong bg-panel">
      <div className="flex items-center gap-3 border-b border-line px-6 py-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-brand-soft text-brand-hover">
          {item.type === "livro" ? <BookOpen size={17} /> : <FileText size={17} />}
        </span>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
            Sobre este material
          </p>
          <h2 className="mt-0.5 font-display text-lg font-extrabold tracking-tight text-white sm:text-xl">
            Resumo do conteúdo
          </h2>
        </div>
      </div>

      <div className="px-6 py-5">
        {hasLong ? (
          <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">{item.long}</p>
        ) : (
          <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
            {item.description}
          </p>
        )}

        {hasToc ? (
          <div className="mt-6 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">
              Sumário
            </p>
            {toc.map((part, pi) => {
              const isOpen = openPart === pi;
              return (
                <div
                  key={part.title}
                  className={`overflow-hidden rounded-md border transition-colors duration-300 ${
                    isOpen ? "border-brand-ring/40" : "border-line-strong"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenPart(isOpen ? null : pi)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left"
                  >
                    <span
                      className={`font-display text-sm font-extrabold transition-colors ${
                        isOpen ? "text-brand-hover" : "text-ink-soft"
                      }`}
                    >
                      {String(pi + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-bold text-white">
                      {part.title}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-ink-soft transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-brand-hover" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      isOpen ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      {part.description && (
                        <p className="border-t border-line px-4 py-3 text-sm leading-relaxed text-ink-soft">
                          {part.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          !hasLong && (
            <div className="mt-6 flex items-start gap-3 rounded-md border border-dashed border-line-strong p-4">
              <FileText size={16} className="mt-0.5 shrink-0 text-ink-faint" />
              <div>
                <p className="text-sm font-bold text-ink">
                  Resumo ainda não disponível
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                  O resumo e o sumário deste material serão publicados em breve.
                </p>
              </div>
            </div>
          )
        )}

        {(item.pages || item.format || item.type) && (
          <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-4">
            {item.pages ? (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-line-strong bg-card px-2.5 py-1 text-[11px] font-bold text-ink-soft">
                <BookOpen size={12} /> {item.pages} páginas
              </span>
            ) : null}
            {item.type === "pdf" && (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-line-strong bg-card px-2.5 py-1 text-[11px] font-bold text-ink-soft">
                <FileText size={12} /> PDF
              </span>
            )}
            {item.type === "livro" && (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-line-strong bg-card px-2.5 py-1 text-[11px] font-bold text-ink-soft">
                <BookOpen size={12} /> Livro digital
              </span>
            )}
            {item.format && (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-line-strong bg-card px-2.5 py-1 text-[11px] font-bold text-ink-soft">
                {item.format}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}