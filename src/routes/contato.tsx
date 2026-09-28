import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { LeadForm } from "@/components/keymaster/LeadForm";
import { addressLine, company, trackEvent, whatsappUrl } from "@/config/company";
import { ALLOW_INDEXING, absoluteUrl } from "@/config/site";

const mapQuery = "Rua Calandra, 51, Vila Germinal, São Paulo";
const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}`;

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato e orçamento | Key Master" },
      {
        name: "description",
        content:
          "Solicite orçamento de monitoramento, alarmes e câmeras. Central 24h e atendimento comercial em São Paulo.",
      },
      { property: "og:title", content: "Contato e orçamento | Key Master" },
      { property: "og:description", content: "Fale com a Key Master e receba uma avaliação." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/contato") },
      { property: "og:image", content: absoluteUrl("/og-image.png") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absoluteUrl("/og-image.png") },
      ...(ALLOW_INDEXING ? [] : [{ name: "robots", content: "noindex, nofollow" }]),
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/contato") }],
  }),
  component: Page,
});

function Page() {
  return (
    <main id="conteudo" className="pt-20 md:pt-28">
      <section className="bg-primary-dark py-16 text-hero-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold md:text-5xl">Vamos proteger o que importa para você</h1>
          <p className="mt-4 text-silver">Peça um orçamento ou fale agora com nossa equipe.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[.72fr_1.28fr]">
          <div className="space-y-4">
            <ContactCard
              icon={<Phone />}
              title={company.phones.central.label}
              value={company.phones.central.display}
              href={`tel:${company.phones.central.tel}`}
              onClick={() => trackEvent("click_phone", { placement: "contato" })}
            />
            <ContactCard
              icon={<Phone />}
              title={company.phones.commercial.label}
              value={company.phones.commercial.display}
              href={`tel:${company.phones.commercial.tel}`}
              onClick={() => trackEvent("click_phone", { placement: "contato" })}
            />
            <ContactCard
              icon={<MessageCircle />}
              title="WhatsApp"
              value={company.phones.whatsapp.display}
              href={whatsappUrl()}
              onClick={() => trackEvent("click_whatsapp", { placement: "contato" })}
            />
            <ContactCard
              icon={<Mail />}
              title="E-mail"
              value={company.email}
              href={`mailto:${company.email}`}
            />
            <div className="flex gap-4 rounded-2xl bg-primary-soft p-5">
              <MapPin className="shrink-0 text-accent" />
              <div>
                <b className="text-primary">Sede no Tucuruvi</b>
                <p className="mt-1 text-sm text-muted-foreground">{addressLine()}</p>
                <p className="mt-2 text-sm">
                  Comercial: {company.hours.commercial}
                  <br />
                  Central: {company.hours.central}
                </p>
              </div>
            </div>
          </div>
          <div id="orcamento" className="scroll-mt-24 rounded-2xl bg-primary-soft p-5 md:p-8">
            <LeadForm compact />
          </div>
        </div>
      </section>
      <section className="bg-primary-soft py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-primary">Como chegar</h2>
          <iframe
            title="Mapa da Key Master no Tucuruvi"
            loading="lazy"
            className="mt-6 h-96 w-full rounded-2xl border-0"
            src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Abrir no Google Maps <ExternalLink className="size-4" />
          </a>
        </div>
      </section>
    </main>
  );
}

function ContactCard({
  icon,
  title,
  value,
  href,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex min-h-20 items-center gap-4 rounded-2xl border border-border p-5 hover:border-accent"
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary">
        {icon}
      </span>
      <span>
        <b className="block text-primary">{title}</b>
        <span className="text-sm text-muted-foreground">{value}</span>
      </span>
    </a>
  );
}
