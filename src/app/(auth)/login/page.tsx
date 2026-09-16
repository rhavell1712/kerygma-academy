"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="mb-8 flex justify-center">
        <span className="grid h-14 w-14 place-items-center rounded-md bg-brand font-display text-3xl font-extrabold text-white shadow-brand">
          k
        </span>
      </div>

      <h1 className="text-center font-display text-2xl font-extrabold tracking-tight text-white">
        Entrar na Kerygma
      </h1>
      <p className="mt-2 text-center text-sm text-ink-soft">
        Acesse sua conta para continuar seus estudos.
      </p>

      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-bold text-ink-soft">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@exemplo.com"
            className="w-full rounded-md border border-line-strong bg-card px-4 py-3 text-sm text-white outline-none transition placeholder:text-ink-faint focus:border-brand-ring"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-bold text-ink-soft">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-md border border-line-strong bg-card px-4 py-3 text-sm text-white outline-none transition placeholder:text-ink-faint focus:border-brand-ring"
          />
        </div>

        <button
          type="submit"
          disabled={!email || !password}
          className="w-full rounded-md bg-brand py-3 text-sm font-bold text-white shadow-brand transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Entrar
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Ainda não tem conta?{" "}
        <Link href="/" className="font-bold text-white transition hover:text-brand-hover">
          Criar conta
        </Link>
      </p>

      <p className="mt-10 text-center text-xs text-ink-faint">
        Demonstração de interface — o fluxo de autenticação será conectado
        em uma versão futura.
      </p>
    </>
  );
}
