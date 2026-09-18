"use client";

import { useState } from "react";
import { Check, Save, ShieldCheck, UserCog } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminPanel } from "@/components/admin/admin-panel";

type ToggleProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 py-4">
      <div className="min-w-0">
        <p className="text-sm font-bold text-white">{label}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full border transition ${
          checked
            ? "border-brand bg-brand"
            : "border-line-strong bg-white/10"
        }`}
      >
        <span
          className={`absolute top-0.5 grid h-4.5 w-4.5 place-items-center rounded-full bg-white transition-all ${
            checked ? "left-[1.4rem]" : "left-0.5"
          }`}
        >
          {checked && <Check size={11} className="text-brand" />}
        </span>
      </button>
    </div>
  );
}

const team = [
  { name: "Ricardo Nunes", role: "Administrador", initials: "RN" },
  { name: "Marina Costa", role: "Editora de conteúdo", initials: "MC" },
  { name: "Davi Salles", role: "Revisor", initials: "DS" },
];

export default function AdminSettingsPage() {
  const [certificates, setCertificates] = useState(true);
  const [trackProgress, setTrackProgress] = useState(true);
  const [comments, setComments] = useState(false);
  const [salesEmails, setSalesEmails] = useState(true);
  const [studentEmails, setStudentEmails] = useState(false);

  return (
    <>
      <AdminPageHeader
        eyebrow="Plataforma"
        title="Configurações"
        description="Preferências gerais, notificações e equipe. Demonstração visual das futuras configurações."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-hover"
          >
            <Save size={16} />
            Salvar alterações
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <AdminPanel
            title="Identidade da plataforma"
            description="Informações exibidas aos alunos"
          >
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-bold text-ink-soft">
                  Nome da plataforma
                </span>
                <input
                  defaultValue="Kerygma Academy"
                  className="mt-1.5 w-full rounded-md border border-line-strong bg-panel px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-brand-ring"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-ink-soft">
                  E-mail de suporte
                </span>
                <input
                  defaultValue="suporte@kerygma.academy"
                  className="mt-1.5 w-full rounded-md border border-line-strong bg-panel px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-brand-ring"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-bold text-ink-soft">
                  Descrição
                </span>
                <textarea
                  rows={3}
                  defaultValue="Educação teológica em profundidade, para quem leva a sério o próprio estudo."
                  className="mt-1.5 w-full resize-none rounded-md border border-line-strong bg-panel px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-brand-ring"
                />
              </label>
            </div>
          </AdminPanel>

          <AdminPanel
            title="Preferências de ensino"
            description="Comportamento da experiência do aluno"
            bodyClassName="divide-y divide-line"
          >
            <Toggle
              label="Certificados de conclusão"
              description="Emitir certificado automaticamente ao concluir um curso."
              checked={certificates}
              onChange={setCertificates}
            />
            <Toggle
              label="Acompanhamento de progresso"
              description="Registrar e exibir o percentual concluído de cada conteúdo."
              checked={trackProgress}
              onChange={setTrackProgress}
            />
            <Toggle
              label="Comentários nas aulas"
              description="Permitir que alunos comentem e perguntem em cada aula."
              checked={comments}
              onChange={setComments}
            />
          </AdminPanel>

          <AdminPanel
            title="Notificações"
            description="Alertas enviados para a equipe administrativa"
            bodyClassName="divide-y divide-line"
          >
            <Toggle
              label="E-mails de venda"
              description="Receber um resumo sempre que um conteúdo for adquirido."
              checked={salesEmails}
              onChange={setSalesEmails}
            />
            <Toggle
              label="Novos alunos"
              description="Notificar quando um novo aluno criar conta na plataforma."
              checked={studentEmails}
              onChange={setStudentEmails}
            />
          </AdminPanel>
        </div>

        <div className="space-y-6">
          <AdminPanel
            title="Equipe administrativa"
            description="Pessoas com acesso ao painel"
          >
            <ul className="divide-y divide-line">
              {team.map((member) => (
                <li key={member.name} className="flex items-center gap-3 px-5 py-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-soft font-display text-xs font-extrabold text-brand-hover">
                    {member.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">
                      {member.name}
                    </p>
                    <p className="text-xs text-ink-faint">{member.role}</p>
                  </div>
                  <ShieldCheck size={16} className="shrink-0 text-emerald-400" />
                </li>
              ))}
            </ul>
            <div className="border-t border-line p-4">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-line-strong py-2.5 text-xs font-bold text-ink-soft transition hover:border-white/30 hover:text-white"
              >
                <UserCog size={14} />
                Convidar membro
              </button>
            </div>
          </AdminPanel>

          <AdminPanel title="Pagamentos" description="Moeda e provedores">
            <div className="space-y-4 p-5">
              <label className="block">
                <span className="text-xs font-bold text-ink-soft">Moeda</span>
                <select className="mt-1.5 w-full rounded-md border border-line-strong bg-panel px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-brand-ring">
                  <option>Real brasileiro (BRL)</option>
                  <option>Dólar americano (USD)</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-bold text-ink-soft">
                  Provedor de pagamento
                </span>
                <select className="mt-1.5 w-full rounded-md border border-line-strong bg-panel px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-brand-ring">
                  <option>Stripe</option>
                  <option>Mercado Pago</option>
                  <option>PagSeguro</option>
                </select>
              </label>
              <div className="rounded-md border border-dashed border-line-strong p-4 text-xs leading-relaxed text-ink-faint">
                Integração de pagamentos será conectada em uma versão futura.
              </div>
            </div>
          </AdminPanel>
        </div>
      </div>
    </>
  );
}
