import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company, trackEvent, whatsappUrl } from "@/config/company";
import type { ButtonProps } from "@/components/ui/button";

export function SectionTitle({
  eyebrow,
  title,
  copy,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow && <p className="mb-3 text-xs font-bold uppercase text-accent">{eyebrow}</p>}
      <h2
        className={`text-3xl font-bold md:text-4xl ${light ? "text-hero-foreground" : "text-primary"}`}
      >
        {title}
      </h2>
      {copy && (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${light ? "text-silver" : "text-muted-foreground"}`}
        >
          {copy}
        </p>
      )}
    </div>
  );
}

/**
 * CTA de orçamento único: na Home rola até #orcamento; nas demais páginas
 * navega para /contato#orcamento. Mesmo componente é usado no header, na
 * barra mobile e nos CTAs finais (P1-C).
 */
export function QuoteCta({
  children,
  variant,
  size,
  className,
}: {
  children: React.ReactNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const onClick = () => trackEvent("quote_start", { from: path });
  if (path === "/") {
    return (
      <Button asChild variant={variant} size={size} className={className}>
        <a href="#orcamento" onClick={onClick}>
          {children}
        </a>
      </Button>
    );
  }
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link to="/contato" hash="orcamento" onClick={onClick}>
        {children}
      </Link>
    </Button>
  );
}

export function CTASection() {
  return (
    <section className="bg-primary py-14 text-hero-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:text-left lg:px-6">
        <h2 className="max-w-2xl text-3xl font-bold">
          Proteja hoje o que você levou uma vida para construir.
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <QuoteCta size="lg">
            {company.cta.quote}
            <ArrowRight />
          </QuoteCta>
          <Button asChild variant="light" size="lg">
            <a
              href={`tel:${company.phones.central.tel}`}
              onClick={() => trackEvent("click_phone", { placement: "cta_final" })}
            >
              <Phone />
              Ligar agora {company.phones.central.display}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Fale com um consultor no WhatsApp"
      title="Fale com um consultor"
      onClick={() => trackEvent("click_whatsapp", { placement: "float" })}
      className="fixed bottom-6 right-6 z-30 hidden size-14 items-center justify-center rounded-full bg-success text-success-foreground shadow-soft transition-transform hover:scale-105 md:flex"
    >
      <MessageCircle />
    </a>
  );
}
