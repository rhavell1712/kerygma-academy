"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  KeyRound,
  Loader2,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import {
  addAdminAction,
  changePasswordAction,
  getSettingsDataAction,
  removeAdminAction,
  updateProfileAction,
  type AdminListItem,
} from "@/app/actions/settings";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { logoutAction } from "@/app/actions/mentorias";

const input =
  "w-full rounded-md border border-line-strong bg-bg px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-brand";
const label =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft";

function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl bg-card p-6 shadow-card ring-1 ring-line">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-hover">
          <Icon size={18} />
        </span>
        <div>
          <h2 className="font-display text-base font-bold tracking-tight text-ink">
            {title}
          </h2>
          <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Feedback({
  success,
  error,
}: {
  success?: string | null;
  error?: string | null;
}) {
  if (error) {
    return (
      <p className="mt-4 text-[13px] font-semibold text-brand-hover">{error}</p>
    );
  }
  if (success) {
    return (
      <p className="mt-4 flex items-start gap-1.5 text-[13px] font-semibold text-green-400">
        <Check size={14} className="mt-0.5 shrink-0" />
        {success}
      </p>
    );
  }
  return null;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [admins, setAdmins] = useState<AdminListItem[]>([]);

  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileBusy, setProfileBusy] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{
    success?: string;
    error?: string;
  } | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{
    success?: string;
    error?: string;
  } | null>(null);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteBusy, setInviteBusy] = useState(false);
  const [inviteMsg, setInviteMsg] = useState<{
    success?: string;
    error?: string;
  } | null>(null);

  const [removing, setRemoving] = useState<AdminListItem | null>(null);
  const [removeBusy, setRemoveBusy] = useState(false);

  function applyResult(
    res: Awaited<ReturnType<typeof getSettingsDataAction>>,
  ) {
    if (res.error || !res.data) {
      setLoadError(res.error ?? "Falha ao carregar configurações.");
    } else {
      setProfileName(res.data.fullName);
      setProfileEmail(res.data.email);
      setAdmins(res.data.admins);
    }
    setLoading(false);
  }

  function load() {
    return getSettingsDataAction().then(applyResult);
  }

  useEffect(() => {
    getSettingsDataAction().then(applyResult);
  }, []);

  async function handleProfile(e: FormEvent) {
    e.preventDefault();
    setProfileBusy(true);
    setProfileMsg(null);
    const res = await updateProfileAction(profileName, profileEmail);
    setProfileBusy(false);
    setProfileMsg(res);
    // Recarrega quando não há confirmação de e-mail pendente.
    if (res.success && !res.success.includes("Confirme")) void load();
  }

  async function handlePassword(e: FormEvent) {
    e.preventDefault();
    setPasswordBusy(true);
    setPasswordMsg(null);
    const res = await changePasswordAction(newPassword, confirmPassword);
    setPasswordBusy(false);
    setPasswordMsg(res);
    if (res.success) {
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  async function handleInvite(e: FormEvent) {
    e.preventDefault();
    setInviteBusy(true);
    setInviteMsg(null);
    const res = await addAdminAction(inviteEmail);
    setInviteBusy(false);
    setInviteMsg(res);
    if (res.success) {
      setInviteEmail("");
      const list = await listAdmins();
      if (list) setAdmins(list);
    }
  }

  async function listAdmins() {
    const res = await getSettingsDataAction();
    return res.data?.admins ?? null;
  }

  async function handleRemove() {
    if (!removing) return;
    setRemoveBusy(true);
    const res = await removeAdminAction(removing.user_id);
    setRemoveBusy(false);
    setRemoving(null);
    if (res.error) {
      setInviteMsg({ error: res.error });
    } else {
      setAdmins((prev) => prev.filter((a) => a.user_id !== removing.user_id));
      setInviteMsg({ success: res.success });
    }
  }

  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <header className="border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <img
              src="/img/logo_vetorizado.svg"
              alt="Mispá Treinamentos"
              className="h-9 w-auto block"
            />
            <div className="leading-none">
              <p className="font-display text-[15px] font-extrabold tracking-tight">
                Configurações
              </p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                Mispá Treinamentos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-md border border-line-strong px-3.5 py-2 text-[13px] font-bold text-ink-soft transition hover:text-ink"
            >
              <ArrowLeft size={14} /> Painel
            </Link>
            <button
              type="button"
              onClick={() => void logoutAction()}
              className="rounded-md px-3.5 py-2 text-[13px] font-bold text-ink-faint transition hover:text-brand-hover"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-sm text-ink-soft">
            <Loader2 size={16} className="animate-spin" />
            Carregando configurações...
          </div>
        ) : loadError ? (
          <div className="rounded-lg border border-brand/30 bg-brand-soft/30 px-4 py-3 text-sm font-semibold text-brand-hover">
            {loadError}
          </div>
        ) : (
          <div className="space-y-6">
            <Section
              icon={UserRound}
              title="Perfil"
              description="Seus dados de acesso. O e-mail é o mesmo usado no Supabase Auth."
            >
              <form onSubmit={handleProfile} className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="profile-name">
                    Nome
                  </label>
                  <input
                    id="profile-name"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Seu nome"
                    className={input}
                    required
                    minLength={2}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="profile-email">
                    E-mail
                  </label>
                  <input
                    id="profile-email"
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className={input}
                    required
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={profileBusy}
                    className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {profileBusy ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      "Salvar perfil"
                    )}
                  </button>
                </div>
              </form>
              <Feedback success={profileMsg?.success} error={profileMsg?.error} />
            </Section>

            <Section
              icon={ShieldCheck}
              title="Administradores e permissões"
              description="Só administradores autorizados podem gerenciar acessos. Para adicionar alguém, a pessoa precisa ter uma conta confirmada no Supabase Auth."
            >
              <ul className="space-y-2.5">
                {admins.map((admin) => (
                  <li
                    key={admin.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-line bg-elevated/50 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {admin.email}
                      </p>
                      <p className="mt-0.5 text-[11px] text-ink-faint">
                        Desde{" "}
                        {new Date(admin.created_at).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Revogar acesso de ${admin.email}`}
                      onClick={() => setRemoving(admin)}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line-strong text-ink-soft transition hover:border-brand hover:text-brand-hover"
                    >
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))}
              </ul>

              <form
                onSubmit={handleInvite}
                className="mt-5 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="e-mail do novo administrador"
                  className={input}
                  required
                  aria-label="E-mail do novo administrador"
                />
                <button
                  type="submit"
                  disabled={inviteBusy}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {inviteBusy ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Adicionar"
                  )}
                </button>
              </form>
              <Feedback
                success={inviteMsg?.success}
                error={inviteMsg?.error}
              />
            </Section>

            <Section
              icon={KeyRound}
              title="Alterar senha"
              description="Use uma senha com pelo menos 8 caracteres, diferente da atual."
            >
              <form onSubmit={handlePassword} className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="new-password">
                    Nova senha
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo de 8 caracteres"
                    className={input}
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>
                <div>
                  <label className={label} htmlFor="confirm-password">
                    Confirmar nova senha
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repita a nova senha"
                    className={input}
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={passwordBusy}
                    className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {passwordBusy ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      "Alterar senha"
                    )}
                  </button>
                </div>
              </form>
              <Feedback
                success={passwordMsg?.success}
                error={passwordMsg?.error}
              />
            </Section>
          </div>
        )}
      </main>

      <ConfirmDialog
        open={removing !== null}
        title="Revogar acesso?"
        message={`"${removing?.email}" deixará de ter acesso ao painel e aos dados administrativos. A conta no Supabase Auth continua existindo.`}
        confirmLabel="Revogar"
        loading={removeBusy}
        onConfirm={() => void handleRemove()}
        onCancel={() => setRemoving(null)}
      />
    </div>
  );
}
