import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { addressLine, company, trackEvent, whatsappUrl } from "@/config/company";
import { services } from "@/data/content";

const perfilLinks = [
  { id: "para-casa", label: "Para sua Casa" },
  { id: "para-empresa", label: "Para sua Empresa" },
  { id: "para-condominios", label: "Para Condomínios" },
  { id: "para-industrias", label: "Para Indústrias e Logística" },
] as const;

export function Footer() {
  return (
    <footer className="bg-primary-dark pb-24 pt-16 text-hero-foreground md:pb-8">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <img
            src="/images/key-master-logo.svg"
            alt="Key Master"
            width={230}
            height={66}
            className="h-20 w-auto brightness-0 invert"
          />
          <p className="mt-4 text-sm text-silver">
            Monitoramento 24 horas desde {company.foundedYear}.
          </p>
        </div>
        <div>
          <h2 className="font-display font-bold">Soluções</h2>
          <ul className="mt-4 space-y-3 text-sm text-silver">
            {perfilLinks.map((x) => (
              <li key={x.id}>
                <Link to="/servicos" hash={x.id} className="hover:text-hero-foreground">
                  {x.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display font-bold">Serviços</h2>
          <ul className="mt-4 space-y-3 text-sm text-silver">
            {services.map((x) => (
              <li key={x.slug}>
                <Link to="/servicos" hash={x.slug} className="hover:text-hero-foreground">
                  {x.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display font-bold">Contato</h2>
          <ul className="mt-4 space-y-4 text-sm text-silver">
            <li>
              <a
                href={`tel:${company.phones.central.tel}`}
                className="flex gap-2"
                onClick={() => trackEvent("click_phone", { placement: "footer" })}
              >
                <Phone className="size-4 text-accent" />
                {company.phones.central.label}: {company.phones.central.display}
              </a>
            </li>
            <li>
              <a
                href={`tel:${company.phones.commercial.tel}`}
                onClick={() => trackEvent("click_phone", { placement: "footer" })}
              >
                {company.phones.commercial.label}: {company.phones.commercial.display}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl()}
                className="flex gap-2"
                onClick={() => trackEvent("click_whatsapp", { placement: "footer" })}
              >
                <MessageCircle className="size-4 text-success" />
                WhatsApp: {company.phones.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="flex gap-2">
                <Mail className="size-4 text-accent" />
                {company.email}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="size-4 shrink-0 text-accent" />
              {addressLine()}
            </li>
            <li>
              {company.hours.commercial} | Central: {company.hours.central}
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col gap-2 border-t border-hero-foreground/15 pt-6 text-xs text-silver">
          {company.legalEntities.map((entity) => (
            <span key={entity.cnpj}>
              {entity.name} — CNPJ {entity.cnpj}
            </span>
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-3 text-xs text-silver md:flex-row md:justify-between">
          <span>
            © {new Date().getFullYear()} {company.brandFull} — Todos os direitos reservados
          </span>
          <Link to="/politica-de-privacidade">Política de Privacidade</Link>
        </div>
      </div>
    </footer>
  );
}
