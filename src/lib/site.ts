// Central de contato do site.
// Troque pelo número real (DDI + DDD + número, só dígitos).
export const WHATSAPP_NUMBER = "5511999999999";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Senha simples da área do professor (/admin).
// Troque por uma senha sua. Proteção básica contra curiosos —
// não é cofre-forte: quem entende de código consegue ver.
export const ADMIN_PASSWORD = "kerygma123";
