"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Check, CalendarRange, Clock, Video, UserRound } from "lucide-react";
import { Cover } from "@/components/shared/cover";
import { WhatsappIcon } from "@/components/shared/whatsapp-icon";
import type { Mentoria } from "@/lib/mentorias";
import { waLink } from "@/lib/site";
import { trackLead } from "@/lib/track-lead";

type Props = {
  mentoria: Mentoria | null;
  onClose: () => void;
};

export function MentoriaModal({ mentoria, onClose }: Props) {
  useEffect(() => {
    if (!mentoria) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mentoria, onClose]);

  if (!mentoria) return null;

  const waMessage = `Olá! Quero saber mais sobre o treinamento "${mentoria.title}".`;

  const info = [
    { icon: CalendarRange, label: "Encontros", value: mentoria.encontros },
    { icon: Clock, label: "Duração", value: mentoria.duracao },
    { icon: Video, label: "Formato", value: mentoria.formato },
    { icon: UserRound, label: "Para quem", value: mentoria.paraQuem },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={mentoria.title}
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />

      <div
        className="animate-fade-up relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-card shadow-pop ring-1 ring-line-strong sm:rounded-2xl sm:mx-4 md:mx-0"
      >
        <div className="relative h-48 sm:h-64 overflow-hidden">
          {mentoria.imageUrl ? (
            <Image
              src={mentoria.imageUrl}
              alt={mentoria.title}
              fill
              sizes="(max-width: 640px) 100vw, 672px"
              className="object-cover transition duration-500"
            />
          ) : (
            <Cover
              item={{
                title: mentoria.title,
                accent: mentoria.accent,
                cover: mentoria.cover,
              }}
              title={false}
              className="absolute inset-0 h-full w-full"
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent/60"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-black/85"
          >
            <X size={17} />
          </button>
          <div className="absolute bottom-4 left-5 right-5">
            <span className="inline-flex items-center rounded-sm bg-brand-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0b2510]">
              Treinamento · {mentoria.level}
            </span>
            <h3 className="mt-2.5 font-display text-2xl font-extrabold tracking-tight text-ink">
              {mentoria.title}
            </h3>
          </div>
        </div>

        <div className="px-5 py-6 sm:px-7 sm:pb-8">
          <p className="text-[15px] leading-relaxed text-ink-soft">
            {mentoria.long}
          </p>

          <h4 className="mt-7 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-soft">
            O que vamos abordar
          </h4>
          <ul className="mt-3.5 space-y-2.5">
            {mentoria.topics.map((topic, index) => (
              <li key={`${index}-${topic}`} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/90">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-accent">
                  <Check size={12} strokeWidth={3} />
                </span>
                {topic}
              </li>
            ))}
          </ul>

          <h4 className="mt-7 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-soft">
            Como funciona
          </h4>
          <dl className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {info.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 rounded-lg border border-line bg-elevated/60 px-4 py-3.5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-brand-accent-soft text-brand-accent">
                  <Icon size={16} />
                </span>
                <span>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-faint">
                    {label}
                  </dt>
                  <dd className="mt-0.5 text-[13px] font-semibold leading-snug text-ink">
                    {value}
                  </dd>
                </span>
              </div>
            ))}
          </dl>

          <a
            href={waLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackLead(mentoria.title, "modal")}
            className="mt-7 flex items-center justify-center gap-2.5 rounded-md bg-[#25d366] px-6 py-4 text-sm font-bold text-[#062b16] transition hover:brightness-110 hover:scale-[1.01] active:scale-[0.99]"
          >
            <WhatsappIcon size={18} />
            Quero participar — falar no WhatsApp
          </a>
          <p className="mt-3 text-center text-xs text-ink-faint">
            Vagas limitadas por turma. Chame para agendar seu horário.
          </p>
        </div>
      </div>
    </div>
  );
}
