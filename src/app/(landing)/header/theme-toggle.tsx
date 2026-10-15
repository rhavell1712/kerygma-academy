"use client";

import { Moon, Sun } from "lucide-react";
import { setTheme, useAppearance } from "@/hooks/use-appearance";

export function ThemeToggle() {
  const { theme } = useAppearance();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      title={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-sm text-ink-soft ring-1 ring-line-strong transition hover:text-ink hover:ring-brand-ring"
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
