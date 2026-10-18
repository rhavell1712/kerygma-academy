import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const THEME_KEY = "kerygma-theme";
const EVENT = "kerygma:appearance";

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  return () => window.removeEventListener(EVENT, callback);
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
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

export function useAppearance(): { theme: Theme } {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { theme };
}
