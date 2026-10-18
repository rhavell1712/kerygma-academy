"use client";

import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";
import { trackLead } from "@/lib/track-lead";

export function WhatsappFloat() {
  return (
    <a
      href={waLink("Olá! Vim pelo site e quero saber mais sobre os treinamentos.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      onClick={() => trackLead("Todos os treinamentos", "flutuante")}
      className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-[#062b16] shadow-pop transition hover:scale-110 hover:brightness-110 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <MessageCircle size={26} />
    </a>
  );
}
