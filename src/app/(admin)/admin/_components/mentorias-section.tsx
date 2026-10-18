import { Pencil, Plus, Trash2 } from "lucide-react";
import type { MentoriaRow } from "@/services/mentorias";

export function MentoriasSection({
  mentorias,
  onNew,
  onEdit,
  onDelete,
  onTogglePublished,
}: {
  mentorias: MentoriaRow[];
  onNew: () => void;
  onEdit: (mentoria: MentoriaRow) => void;
  onDelete: (mentoria: MentoriaRow) => void;
  onTogglePublished: (id: string, published: boolean) => void;
}) {
  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">
          Tudo que você mudar aqui aparece na hora na vitrine do site.
        </p>
        <button
          type="button"
          onClick={onNew}
          className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-brand-hover"
        >
          <Plus size={15} /> Nova mentoria
        </button>
      </div>

      {mentorias.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line-strong py-20 text-center">
          <p className="font-display text-lg font-bold">Nenhuma mentoria cadastrada</p>
          <p className="mt-1 text-sm text-ink-soft">Crie a primeira.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {mentorias.map((m) => (
            <li
              key={m.id}
              className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card ring-1 ring-line sm:p-5"
            >
              <span
                className="hidden h-12 w-12 shrink-0 place-items-center rounded-lg font-display text-lg font-extrabold text-white sm:grid"
                style={{ backgroundColor: m.accent }}
              >
                {m.title.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-display text-[15px] font-bold tracking-tight">
                    {m.title}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${m.published
                      ? "bg-green-900/30 text-green-400"
                      : "bg-gray-800 text-gray-400"
                      }`}
                  >
                    {m.published ? "Publicada" : "Rascunho"}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[13px] text-ink-soft">
                  {m.category} · {m.encontros} · {m.topics.length} tópicos
                </p>
              </div>
              <label className="flex shrink-0 items-center gap-2 text-xs font-semibold text-ink-soft">
                <input
                  type="checkbox"
                  checked={m.published}
                  onChange={(e) => onTogglePublished(m.id, e.target.checked)}
                  className="h-4 w-4 accent-brand"
                />
                Publicada
              </label>
              <button
                type="button"
                aria-label={`Editar ${m.title}`}
                onClick={() => onEdit(m)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line-strong text-ink-soft transition hover:border-brand hover:text-brand-hover"
              >
                <Pencil size={15} />
              </button>
              <button
                type="button"
                aria-label={`Excluir ${m.title}`}
                onClick={() => onDelete(m)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line-strong text-ink-soft transition hover:border-brand hover:text-brand-hover"
              >
                <Trash2 size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
