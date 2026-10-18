"use client";

import { useEffect, useState } from "react";
import {
  createMentoriaAction,
  deleteMentoriaAction,
  getMentoriasAdmin,
  togglePublishedAction,
  updateMentoriaAction,
  logoutAction,
} from "@/app/actions/mentorias";
import { listLeadsAction, clearLeadsAction } from "@/app/actions/leads";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import type { MentoriaRow } from "@/services/mentorias";
import { AdminHeader, type Tab } from "./admin-header";
import { MentoriaForm } from "./mentoria-form";
import { MentoriasSection } from "./mentorias-section";
import { LeadsSection, type Lead } from "./leads-section";
import { ResumoSection } from "./resumo-section";

export function AdminPageClient() {
  const [tab, setTab] = useState<Tab>("resumo");
  const [mentorias, setMentorias] = useState<MentoriaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<MentoriaRow | undefined>(undefined);
  const [actionError, setActionError] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<MentoriaRow | null>(null);
  const [confirmClearLeads, setConfirmClearLeads] = useState(false);
  const [confirmBusy, setConfirmBusy] = useState(false);

  async function loadLeads() {
    const res = await listLeadsAction();
    if (res.data) setLeads(res.data);
  }

  useEffect(() => {
    getMentoriasAdmin()
      .then((res) => {
        if (res.data) setMentorias(res.data);
        else if (res.error) setActionError(res.error);
      })
      .finally(() => setLoading(false));
    listLeadsAction().then((res) => {
      if (res.data) setLeads(res.data);
    });
  }, []);

  async function handleLogout() {
    await logoutAction();
  }

  async function handleDelete() {
    if (!confirmDelete) return;
    setConfirmBusy(true);
    const result = await deleteMentoriaAction(confirmDelete.id);
    setConfirmBusy(false);
    if (result?.success) {
      setMentorias((prev) => prev.filter((m) => m.id !== confirmDelete.id));
      setConfirmDelete(null);
    } else {
      setActionError(result?.error ?? "Erro ao excluir.");
      setConfirmDelete(null);
    }
  }

  async function handleClearLeads() {
    setConfirmBusy(true);
    const res = await clearLeadsAction();
    setConfirmBusy(false);
    if (res?.success) setLeads([]);
    else setActionError(res?.error ?? "Erro ao limpar.");
    setConfirmClearLeads(false);
  }

  async function handleTogglePublished(id: string, published: boolean) {
    const result = await togglePublishedAction(id, published);
    if (result?.success) {
      setMentorias((prev) =>
        prev.map((m) => (m.id === id ? { ...m, published } : m)),
      );
    }
  }

  async function handleSave(formData: FormData) {
    const result = editing
      ? await updateMentoriaAction(editing.id, formData)
      : await createMentoriaAction(formData);
    if (result?.success) {
      setFormOpen(false);
      setEditing(undefined);
      const res = await getMentoriasAdmin();
      if (res.data) setMentorias(res.data);
    }
    return result;
  }

  function selectTab(id: Tab) {
    setTab(id);
    if (id === "leads") void loadLeads();
  }

  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <AdminHeader tab={tab} onSelectTab={selectTab} onLogout={handleLogout} />

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        {actionError && (
          <div className="mb-6 rounded-lg border border-brand/30 bg-brand-soft/30 px-4 py-3 text-sm font-semibold text-brand-hover">
            {actionError}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-ink-soft">Carregando mentorias...</p>
          </div>
        ) : tab === "resumo" ? (
          <ResumoSection mentorias={mentorias} leadsCount={leads.length} />
        ) : tab === "mentorias" ? (
          <MentoriasSection
            mentorias={mentorias}
            onNew={() => {
              setEditing(undefined);
              setFormOpen(true);
            }}
            onEdit={(m) => {
              setEditing(m);
              setFormOpen(true);
            }}
            onDelete={(m) => setConfirmDelete(m)}
            onTogglePublished={handleTogglePublished}
          />
        ) : tab === "leads" ? (
          <LeadsSection leads={leads} onClear={() => setConfirmClearLeads(true)} />
        ) : null}
      </main>

      {formOpen && (
        <MentoriaForm
          initial={editing}
          takenSlugs={mentorias
            .filter((m) => m.id !== editing?.id)
            .map((m) => m.slug)}
          onCancel={() => {
            setFormOpen(false);
            setEditing(undefined);
          }}
          onSave={handleSave}
        />
      )}

      <ConfirmDialog
        open={confirmDelete !== null}
        title="Excluir mentoria?"
        message={`"${confirmDelete?.title}" será removida da vitrine e do site. Essa ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        loading={confirmBusy}
        onConfirm={() => void handleDelete()}
        onCancel={() => setConfirmDelete(null)}
      />

      <ConfirmDialog
        open={confirmClearLeads}
        title="Limpar lista de interessados?"
        message="Todos os registros de interessados serão apagados. Essa ação não pode ser desfeita."
        confirmLabel="Apagar tudo"
        loading={confirmBusy}
        onConfirm={() => void handleClearLeads()}
        onCancel={() => setConfirmClearLeads(false)}
      />
    </div>
  );
}
