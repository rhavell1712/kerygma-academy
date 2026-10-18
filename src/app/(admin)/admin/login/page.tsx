"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { loginAction } from "@/app/actions/mentorias";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-bg px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl bg-card p-8 shadow-pop ring-1 ring-line"
      >
        <img src="/img/logo_vetorizado.svg" alt="Mispá Treinamentos" className="h-12 w-auto block" />
        <h1 className="mt-5 font-display text-xl font-extrabold tracking-tight text-ink">
          Área do professor
        </h1>
        <p className="mt-1.5 text-sm text-ink-soft">
          Acesso restrito. Entre com sua conta autorizada.
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="seu@email.com"
              className="w-full rounded-md border border-line-strong bg-bg px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-brand"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="Sua senha"
              className="w-full rounded-md border border-line-strong bg-bg px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-brand"
            />
          </div>
        </div>
        {error && (
          <p className="mt-3 text-[13px] font-semibold text-brand-hover">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-md bg-brand px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-hover disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <Link
          href="/"
          className="mt-4 flex items-center justify-center gap-1.5 text-[13px] font-semibold text-ink-faint transition hover:text-ink"
        >
          <ArrowLeft size={14} /> Voltar ao site
        </Link>
      </form>
    </div>
  );
}
