// Central de contato do site.
// Troque pelo número real (DDI + DDD + número, só dígitos).
export const WHATSAPP_NUMBER = "5527998782716";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}


