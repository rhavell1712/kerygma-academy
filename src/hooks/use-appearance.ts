import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
export type Palette = "kerygma" | "marinho" | "dourado" | "ardosia";

export const PALETTES: Palette[] = ["kerygma", "marinho", "dourado", "ardosia"];

export function isPalette(value: string | undefined): value is Palette {
  return (PALETTES as string[]).includes(value ?? "");
}

const THEME_KEY = "kerygma-theme";
const PALETTE_KEY = "kerygma-palette";
const EVENT = "kerygma:appearance";

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  return () => window.removeEventListener(EVENT, callback);
}

function getSnapshot(): `${Theme}|${string}` {
  const theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  const raw = document.documentElement.dataset.palette;
  const palette = isPalette(raw) ? raw : "kerygma";
  return `${theme}|${palette}`;
}

function getServerSnapshot(): `${Theme}|${Palette}` {
  return "dark|kerygma";
}

function notify() {
  window.dispatchEvent(new Event(EVENT));
}

function persist(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* armazenamento indisponível */
  }
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  persist(THEME_KEY, theme);
  notify();
}

export function setPalette(palette: Palette) {
  document.documentElement.dataset.palette = palette;
  persist(PALETTE_KEY, palette);
  notify();
}

export function useAppearance(): { theme: Theme; palette: Palette } {
  const key = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [theme, palette] = key.split("|") as [Theme, Palette];
  return { theme, palette };
}
