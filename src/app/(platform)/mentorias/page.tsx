import Link from "next/link";
import {
  MessageCircle,
  CalendarCheck,
  Video,
  UserCheck,
  Sparkles,
  Clock,
  Mail,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { mentorItems } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import type { ContentItem } from "@/lib/types";

const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_DISPLAY = "(11) 99999-9999";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Tenho interesse em agendar uma mentoria na Kerygma Academy.",
)}`;

const values = [
  {
    icon: UserCheck,
    title: "Individual e personalizada",
    text: "Os encontros são só seus. Cada mentoria é construída a partir do seu momento, dos seus objetivos e da sua rotina.",
  },
  {
    icon: GraduationCap,
    title: "Com professor experiente",
    text: "Você conversa com quem atualmente ensina e pesquisa, com mais de uma década dedicada à formação cristã.",
  },
  {
    icon: Sparkles,
    title: "Foco no seu objetivo",
    text: "Quer organizar os estudos, preparar uma pregação ou avançar num tema específico. A mentoria acompanha o seu caminho.",
  },
];

const steps = [
  {
    number: "01",
    title: "Contato inicial",
    text: "Fale com a gente pelo WhatsApp. Você conta um pouco sobre o seu momento e o que gostaria de estudar.",
  },
  {
    number: "02",
    title: "Diagnóstico",
    text: "Na primeira conversa gratuita, entendemos seus objetivos e definimos juntos o melhor formato de mentoria.",
  },
  {
    number: "03",
    title: "Encontros regulares",
    text: "Agendamos os encontros em horários fixos, com frequência e duração combinadas com você.",
  },
  {
    number: "04",
    title: "Acompanhamento",
    text: "Entre os encontros, você segue com materiais e direcionamentos, com suporte pelo WhatsApp.",
  },
];

const meetings = [
  "Encontros individuais por videochamada (Google Meet ou Zoom)",
  "Duração de 1h a 1h30, conforme o formato escolhido",
  "Horários fixos combinados com a sua rotina",
  "Materiais de apoio, esboços e leituras dirigidas entre os encontros",
  "Acompanhamento contínuo pelo WhatsApp entre as sessões",
];

const request = [
  "Abra o WhatsApp e envie sua mensagem para a equipe Kerygma",
  "Conte seu objetivo: o que quer estudar e por quê",
  "Combine o formato, a frequência e os horários dos encontros",
  "Receba o material inicial e comece a caminhar com acompanhamento",
];

export default function MentoriasPage() {
  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-20 pt-28 sm:px-8 md:px-10">
      <header className="max-w-3xl">
        <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
          <span className="h-px w-8 bg-brand" />
          Acompanhamento individual
        </p>
        <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Uma mentoria para o seu estudo
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
          A mentoria não é um curso. É um percurso desenhado para você:
          encontros individuais com um professor, para organizar os estudos,
          trabalhar dúvidas reais e avançar com direção e constância.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-brand transition hover:bg-brand-hover"
          >
            <MessageCircle size={17} />
            Agendar mentoria no WhatsApp
          </a>
          <a
            href="#como-funciona"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/50"
          >
            Como funciona
          </a>
        </div>
      </header>

      <section className="mt-16 grid gap-4 md:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="rounded-lg border border-line-strong bg-panel p-6">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-brand-soft text-brand-hover">
              <v.icon size={20} />
            </div>
            <h2 className="mt-4 font-display text-base font-bold tracking-tight text-white">
              {v.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
          </div>
        ))}
      </section>

      <section id="como-funciona" className="mt-20">
        <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
          <span className="h-px w-8 bg-brand" />
          Como funciona
        </p>
        <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white">
          Do primeiro contato ao acompanhamento
        </h2>

        <div className="mt-8 border-t border-line-strong">
          {steps.map((step) => (
            <div
              key={step.number}
              className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-b border-line-strong py-6 sm:grid-cols-[64px_200px_1fr] sm:items-baseline sm:gap-6"
            >
              <span className="font-display text-sm font-bold text-brand-hover">
                {step.number}
              </span>
              <h3 className="font-display text-base font-bold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="col-span-2 text-sm leading-relaxed text-ink-soft sm:col-span-1 sm:col-start-3">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
            <span className="h-px w-8 bg-brand" />
            Como são os encontros
          </p>
          <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white">
            Perto de você, mesmo à distância
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Tudo acontece por videochamada, no seu horário, sem deslocamento.
            O importante é o acompanhamento: você nunca fica sozinho entre um
            encontro e outro.
          </p>

          <ul className="mt-7 space-y-3">
            {meetings.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-hover" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 rounded-lg border border-line-strong bg-panel p-5 sm:flex-row sm:items-center">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-white/5 text-ink-soft">
              <Video size={20} />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-white">
                Primeira conversa gratuita
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                Antes de qualquer investimento, a gente conversa para entender
                se a mentoria é o caminho certo para você.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
            <span className="h-px w-8 bg-brand" />
            Investimento
          </p>
          <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white">
            Formatos de mentoria
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Valores por formato, com pagamento facilitado e acesso a todos os
            materiais de apoio. Cada encontro é agendado de forma individual.
          </p>

          <div className="mt-7 space-y-4">
            {mentorItems.map((m: ContentItem) => (
              <div
                key={m.slug}
                className="flex flex-col justify-between gap-5 rounded-lg border border-line-strong bg-panel p-6 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="flex items-center gap-2 font-display text-base font-bold tracking-tight text-white">
                    <Clock size={15} className="text-brand-hover" />
                    {m.title}
                  </p>
                  <p className="mt-1.5 text-sm text-ink-soft">{m.duration}</p>
                  {m.teacher && (
                    <p className="mt-1 text-xs text-ink-faint">
                      Professor: {m.teacher}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center justify-between gap-5 sm:flex-col sm:items-end">
                  <p className="font-display text-xl font-extrabold text-white">
                    {formatPrice(m.price)}
                  </p>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-xs font-bold text-black transition hover:bg-brand-hover hover:text-white"
                  >
                    <MessageCircle size={14} />
                    Agendar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20">
        <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
          <span className="h-px w-8 bg-brand" />
          Como solicitar
        </p>
        <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white">
          Em quatro passos
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {request.map((item, i) => (
            <div key={item} className="flex gap-4 rounded-lg border border-line-strong bg-panel p-5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-brand-soft font-display text-sm font-extrabold text-brand-hover">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-ink-soft">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 overflow-hidden rounded-xl border border-line-strong bg-panel">
        <div className="grid lg:grid-cols-[1.4fr_1fr]">
          <div className="relative p-8 sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 10% 0%, rgba(185,28,43,0.12), transparent 50%)",
              }}
            />
            <h2 className="relative font-display text-2xl font-extrabold tracking-tight text-white">
              Vamos marcar uma conversa?
            </h2>
            <p className="relative mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
              Conte o que você quer estudar. A gente desenha, juntos, um
              caminho com acompanhamento real — no seu ritmo, com o seu
              objetivo.
            </p>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-7 inline-flex items-center gap-2 rounded-md bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-brand transition hover:bg-brand-hover"
            >
              <MessageCircle size={17} />
              Agendar mentoria no WhatsApp
            </a>
          </div>

          <div className="border-t border-line-strong bg-card p-8 sm:p-10 lg:border-l lg:border-t-0">
            <h3 className="font-display text-sm font-bold text-white">Contato</h3>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-3 text-sm text-ink-soft transition hover:text-white"
            >
              <MessageCircle size={16} className="text-brand-hover" />
              WhatsApp: {WHATSAPP_DISPLAY}
            </a>
            <a
              href="mailto:mentorias@kerygma.academy"
              className="mt-2 flex items-center gap-3 text-sm text-ink-soft transition hover:text-white"
            >
              <Mail size={16} className="text-brand-hover" />
              mentorias@kerygma.academy
            </a>
            <div className="mt-5 flex items-center gap-3 text-sm text-ink-soft">
              <CalendarCheck size={16} className="text-brand-hover" />
              Atendimento de segunda a sexta
            </div>

            <Link
              href="/cursos"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft transition hover:text-white"
            >
              Ver catálogo de cursos
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}