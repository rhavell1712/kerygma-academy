"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Palette } from "lucide-react";
import {
  setPalette,
  useAppearance,
  type Palette as PaletteId,
} from "@/hooks/use-appearance";

const options: { id: PaletteId; label: string; hint: string; bg: string; brand: string }[] = [
  { id: "kerygma", label: "Vinho Clássico", hint: "Tradição e seriedade", bg: "#101014", brand: "#b91c2b" },
  { id: "marinho", label: "Grafite & Terracota", hint: "Noturno e acolhedor", bg: "#09090b", brand: "#c2571d" },
  { id: "dourado", label: "Grafite & Ouro", hint: "Autoridade e excelência", bg: "#0c0c0e", brand: "#9c7c14" },
  { id: "ardosia", label: "Carvão & Aço", hint: "Sóbrio e institucional", bg: "#0a0c10", brand: "#4070a0" },
];

export function PaletteMenu() {
  const { palette } = useAppearance();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Escolher paleta de cores"
        aria-expanded={open}
        title="Escolher paleta de cores"
        className={`grid h-9 w-9 place-items-center rounded-sm ring-1 transition ${
          open
            ? "text-brand-hover ring-brand-ring"
            : "text-ink-soft ring-line-strong hover:text-ink hover:ring-brand-ring"
        }`}
      >
        <Palette size={17} />
      </button>

      {open && (
        <div className="animate-fade-up absolute right-0 top-11 z-50 w-64 overflow-hidden rounded-lg bg-card shadow-pop ring-1 ring-line-strong">
          <p className="border-b border-line px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint">
            Cor do site
          </p>
          <ul className="p-1.5">
            {options.map((opt) => {
              const active = palette === opt.id;
              return (
                <li key={opt.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setPalette(opt.id);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition ${
                      active ? "bg-elevated" : "hover:bg-elevated"
                    }`}
                  >
                    <span className="flex -space-x-1.5">
                      <span
                        aria-hidden="true"
                        className="h-6 w-6 rounded-full ring-2 ring-card"
                        style={{ backgroundColor: opt.bg }}
                      />
                      <span
                        aria-hidden="true"
                        className="h-6 w-6 rounded-full ring-2 ring-card"
                        style={{ backgroundColor: opt.brand }}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-bold text-ink">
                        {opt.label}
                      </span>
                      <span className="block truncate text-[11px] text-ink-faint">
                        {opt.hint}
                      </span>
                    </span>
                    {active && (
                      <Check size={15} strokeWidth={3} className="text-brand-hover" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
