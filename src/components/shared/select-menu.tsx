"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type SelectMenuProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  "aria-label"?: string;
};

export function SelectMenu({ value, options, onChange, ...rest }: SelectMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={rest["aria-label"]}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-md border border-line-strong bg-bg px-3.5 py-2.5 text-left text-sm text-ink outline-none transition focus:border-brand"
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-ink-faint transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="animate-fade-up absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-md border border-line-strong bg-card py-1 shadow-pop"
        >
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={option === value}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between gap-2 px-3.5 py-2 text-sm text-ink-soft transition hover:bg-elevated hover:text-ink"
              >
                <span className="truncate">{option}</span>
                {option === value && <Check size={14} className="shrink-0 text-brand-hover" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
