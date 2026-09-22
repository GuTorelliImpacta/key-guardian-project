export const company = {
  name: "Key Master Monitoramento 24 Horas",
  founded: "1991",
  clients: "+2.000",
  headquarters: "940m²",
  centralPhone: "(11) 2196-2200",
  centralPhoneHref: "tel:+551121962200",
  salesPhone: "(11) 2240-2002",
  salesPhoneHref: "tel:+551122402002",
  whatsapp: "(11) 99586-9988",
  whatsappHref: "https://wa.me/5511995869988",
  email: "comercial@keymaster.com.br",
  address: "Rua Calandra, 51 — Tucuruvi, São Paulo/SP — CEP 02275-000",
  cnpj: "[INSERIR CNPJ]",
  hours: "Seg a sex, 9h às 18h",
  whatsappMessage: "Olá! Vim pelo site e gostaria de um orçamento de segurança.",
} as const;

export function whatsappUrl(message: string = company.whatsappMessage) {
  return `${company.whatsappHref}?text=${encodeURIComponent(message)}`;
}

export function trackEvent(name: string, data: Record<string, string> = {}) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("keymaster:track", { detail: { name, ...data } }));
  }
}
