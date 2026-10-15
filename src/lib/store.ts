import { useCallback, useEffect, useState } from "react";
import { mentorias as seedMentorias, type Mentoria } from "./mentorias";

const MENTORIAS_KEY = "kerygma-mentorias";
const LEADS_KEY = "kerygma-leads";

export type LeadOrigem = "modal" | "flutuante" | "como-funciona";

export type Lead = {
  id: string;
  data: string;
  mentoria: string;
  origem: LeadOrigem;
};

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* armazenamento indisponível */
  }
}

export function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `mentoria-${Date.now()}`
  );
}

/* ---------------- Mentorias ---------------- */

export function useMentorias() {
  const [mentorias, setMentorias] = useState<Mentoria[]>(() =>
    readJSON<Mentoria[]>(MENTORIAS_KEY, seedMentorias),
  );

  useEffect(() => {
    writeJSON(MENTORIAS_KEY, mentorias);
  }, [mentorias]);

  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === MENTORIAS_KEY && e.newValue) {
        try {
          setMentorias(JSON.parse(e.newValue) as Mentoria[]);
        } catch {
          /* ignora */
        }
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const add = useCallback((data: Omit<Mentoria, "slug" | "cover"> & { slug?: string }) => {
    const slug = data.slug?.trim() || `${slugify(data.title)}-${Date.now().toString(36)}`;
    setMentorias((prev) => [...prev, { ...data, slug, cover: { from: "#141114", to: data.accent } }]);
  }, []);

  const update = useCallback((slug: string, data: Omit<Mentoria, "slug" | "cover">) => {
    setMentorias((prev) =>
      prev.map((m) =>
        m.slug === slug ? { ...data, slug, cover: { from: "#141114", to: data.accent } } : m,
      ),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setMentorias((prev) => prev.filter((m) => m.slug !== slug));
  }, []);

  const reset = useCallback(() => {
    setMentorias(seedMentorias);
  }, []);

  return { mentorias, add, update, remove, reset };
}

/* ---------------- Interessados (cliques no WhatsApp) ---------------- */

export function trackLead(mentoria: string, origem: LeadOrigem) {
  if (typeof window === "undefined") return;
  const leads = readJSON<Lead[]>(LEADS_KEY, []);
  leads.unshift({
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    data: new Date().toISOString(),
    mentoria,
    origem,
  });
  writeJSON(LEADS_KEY, leads.slice(0, 500));
  window.dispatchEvent(new Event("kerygma:leads"));
}

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(() =>
    readJSON<Lead[]>(LEADS_KEY, []),
  );

  useEffect(() => {
    const reload = () => setLeads(readJSON<Lead[]>(LEADS_KEY, []));
    const onStorage = (e: StorageEvent) => {
      if (e.key === LEADS_KEY) reload();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("kerygma:leads", reload);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("kerygma:leads", reload);
    };
  }, []);

  const clear = useCallback(() => {
    writeJSON(LEADS_KEY, []);
    setLeads([]);
  }, []);

  return { leads, clear };
}
