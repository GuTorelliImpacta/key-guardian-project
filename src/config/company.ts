export const company = {
  brand: "Key Master",
  brandFull: "Key Master Monitoramento 24 Horas",
  foundedDate: "1991-10-25",
  foundedYear: 1991,
  legalEntities: [
    { name: "Key Master Sistemas Operacionais de Segurança Ltda", cnpj: "66.968.140/0001-66" },
    { name: "KM Monitoramento 24hrs Ltda", cnpj: "33.105.122/0001-00" },
  ],
  phones: {
    central: { label: "Central 24h", display: "(11) 2196-2200", tel: "+551121962200" },
    commercial: { label: "Comercial", display: "(11) 2240-2002", tel: "+551122402002" },
    whatsapp: { display: "(11) 99586-9988", wa: "5511995869988" },
  },
  email: "comercial@keymaster.com.br",
  address: {
    street: "Rua Calandra, 51",
    district: "Tucuruvi",
    city: "São Paulo",
    state: "SP",
    zip: "02275-000",
  },
  geo: { lat: -23.4676, lng: -46.5954 },
  hours: { commercial: "Seg a sex, 9h às 18h", central: "24 horas" },
  social: {} as Record<string, string>, // vazio: nenhum perfil oficial confirmado
  pfAuthorization: null as string | null, // NÃO preencher: a PF ainda não autorizou empresas de monitoramento
  testimonials: [] as { quote: string; author: string }[],
  googleReviews: null as { rating: number; count: number } | null,
  equipmentBrands: [] as string[],
  cta: { quote: "Orçamento grátis", visit: "Solicitar visita técnica gratuita" },
} as const;

export const whatsappMessage = "Olá! Vim pelo site e gostaria de um orçamento de segurança.";

export function whatsappUrl(message: string = whatsappMessage) {
  return `https://wa.me/${company.phones.whatsapp.wa}?text=${encodeURIComponent(message)}`;
}

export function telHref(tel: string) {
  return `tel:${tel}`;
}

export function addressLine() {
  const { street, district, city, state, zip } = company.address;
  return `${street} — ${district}, ${city}/${state} — CEP ${zip}`;
}

export function trackEvent(name: string, data: Record<string, string> = {}) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("keymaster:track", { detail: { name, ...data } }));
  }
}
