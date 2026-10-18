import { Trash2 } from "lucide-react";

export type Lead = {
  id: string;
  mentoria_title: string;
  origem: string;
  created_at: string;
};

const origemLabels: Record<string, string> = {
  modal: "Detalhe da mentoria",
  flutuante: "Botão flutuante",
  "como-funciona": "Seção como funciona",
};

function formatLeadDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function LeadsSection({
  leads,
  onClear,
}: {
  leads: Lead[];
  onClear: () => void;
}) {
  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">
          Pessoas que clicaram em algum botão de WhatsApp do site.
        </p>
        {leads.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 self-start rounded-md border border-line-strong px-4 py-2.5 text-[13px] font-bold text-ink-soft transition hover:text-brand-hover"
          >
            <Trash2 size={14} /> Limpar lista
          </button>
        )}
      </div>

      {leads.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line-strong py-20 text-center">
          <p className="font-display text-lg font-bold">Nenhum interessado ainda</p>
          <p className="mt-1 text-sm text-ink-soft">
            Os cliques no WhatsApp aparecem aqui automaticamente.
          </p>
        </div>
      ) : (
        <ul className="space-y-2.5">
          {leads.map((lead) => (
            <li
              key={lead.id}
              className="flex flex-col gap-1 rounded-xl bg-card px-5 py-4 shadow-card ring-1 ring-line sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-bold">{lead.mentoria_title}</p>
                <p className="mt-0.5 text-[13px] text-ink-soft">
                  {origemLabels[lead.origem] ?? lead.origem}
                </p>
              </div>
              <p className="text-[13px] font-semibold text-ink-faint">
                {formatLeadDate(lead.created_at)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
