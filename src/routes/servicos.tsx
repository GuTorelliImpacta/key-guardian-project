import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadForm } from "@/components/keymaster/LeadForm";
import { CTASection, QuoteCta, SectionTitle } from "@/components/keymaster/Shared";
import { company } from "@/config/company";
import { ALLOW_INDEXING, absoluteUrl } from "@/config/site";
import { perfis, services, type Perfil, type Service } from "@/data/content";

const perfilProperty: Record<Perfil["id"], string> = {
  "para-casa": "Casa",
  "para-empresa": "Comércio/Escritório",
  "para-condominios": "Condomínio",
  "para-industrias": "Indústria/Galpão",
};

const serviceNeed: Record<string, string> = {
  "monitoramento-de-alarmes": "Alarme monitorado",
  "monitoramento-de-imagens": "Monitoramento de imagens",
  cftv: "Câmeras/CFTV",
  "alarmes-e-sensores": "Alarme monitorado",
  "storage-de-imagens": "Storage de imagens",
  "manutencao-e-projetos": "Não sei, quero uma visita técnica",
};

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços de segurança eletrônica | Key Master" },
      {
        name: "description",
        content:
          "Monitoramento 24h, CFTV, alarmes e storage de imagens para casas, empresas, condomínios e indústrias em São Paulo.",
      },
      { property: "og:title", content: "Serviços de segurança eletrônica | Key Master" },
      {
        property: "og:description",
        content: "Conheça nossos serviços de monitoramento 24h e peça um orçamento.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/servicos") },
      { property: "og:image", content: absoluteUrl("/og-image.png") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absoluteUrl("/og-image.png") },
      ...(ALLOW_INDEXING ? [] : [{ name: "robots", content: "noindex, nofollow" }]),
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/servicos") }],
  }),
  component: ServicosPage,
});

function ServicosPage() {
  const [tab, setTab] = useState<Perfil["id"]>("para-casa");
  const [prefill, setPrefill] = useState<{ property?: string; needs?: string[] }>({});

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (perfis.some((p) => p.id === hash)) setTab(hash as Perfil["id"]);
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView();
      });
    }
  }, []);

  function goToForm(next: { property?: string; needs?: string[] }) {
    setPrefill(next);
    requestAnimationFrame(() => {
      document.getElementById("orcamento")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  return (
    <main id="conteudo" className="pt-20 md:pt-28">
      <section className="dot-grid bg-primary-dark py-16 text-hero-foreground">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <h1 className="max-w-3xl text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight">
            Segurança eletrônica e monitoramento 24h para cada tipo de imóvel
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-silver">
            Alarmes, câmeras e uma central própria que verifica cada ocorrência e aciona apoio
            quando necessário.
          </p>
          <QuoteCta size="lg" className="mt-7">
            {company.cta.quote}
            <ArrowRight />
          </QuoteCta>
          <div className="mt-8 flex snap-x gap-2 overflow-x-auto pb-2">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="min-w-max snap-start rounded-full border border-hero-foreground/25 px-4 py-2 text-sm font-medium text-hero-foreground hover:bg-hero-foreground/10"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="perfil" className="scroll-mt-24 bg-primary-soft py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionTitle eyebrow="Para quem é" title="Qual espaço você quer proteger?" />
          <Tabs value={tab} onValueChange={(v) => setTab(v as Perfil["id"])} className="w-full">
            <TabsList className="mx-auto flex h-auto w-full max-w-2xl flex-wrap justify-center gap-1 bg-background p-1">
              {perfis.map((p) => (
                <TabsTrigger key={p.id} value={p.id} id={`${p.id}-tab`} className="gap-2 px-4 py-2">
                  <p.icon className="size-4" />
                  {p.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {perfis.map((p) => (
              <TabsContent key={p.id} value={p.id} id={p.id} className="scroll-mt-24 pt-8">
                <div className="mx-auto max-w-3xl rounded-2xl bg-background p-6 shadow-soft md:p-8">
                  <p className="text-lg leading-relaxed text-muted-foreground">{p.scenario}</p>
                  <h3 className="mt-6 text-sm font-bold uppercase text-accent">
                    Combinações mais comuns
                  </h3>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {p.combos.map((c) => (
                      <li key={c} className="flex gap-2 text-sm">
                        <Check className="size-5 shrink-0 text-accent" />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs text-muted-foreground">
                    O projeto final é definido na avaliação técnica.
                  </p>
                  <button
                    type="button"
                    onClick={() => goToForm({ property: perfilProperty[p.id] })}
                    className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-button bg-accent px-5 font-semibold text-accent-foreground hover:bg-accent-hover"
                  >
                    Pedir orçamento para {p.label.toLowerCase()}
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {services.map((s) => (
        <ServiceSection
          key={s.slug}
          service={s}
          onQuote={() => goToForm({ needs: [serviceNeed[s.slug] ?? s.title] })}
        />
      ))}

      <section id="orcamento" className="scroll-mt-24 bg-primary-soft py-20">
        <div className="mx-auto max-w-3xl px-4">
          <SectionTitle
            eyebrow="Orçamento"
            title="Receba seu orçamento"
            copy="Conte o que você precisa. Nossa equipe entra em contato para orientar o próximo passo."
          />
          <div className="rounded-2xl bg-background p-5 shadow-soft md:p-9">
            <LeadForm
              key={`${prefill.property ?? ""}-${(prefill.needs ?? []).join(",")}`}
              compact
              preselectedProperty={prefill.property}
              preselectedNeeds={prefill.needs}
            />
          </div>
        </div>
      </section>
      <CTASection />
    </main>
  );
}

function ServiceSection({ service, onQuote }: { service: Service; onQuote: () => void }) {
  return (
    <section
      id={service.slug}
      className="scroll-mt-24 border-t border-border py-16 odd:bg-background even:bg-primary-soft"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-6">
        <div>
          <span className="flex size-12 items-center justify-center rounded-full bg-primary-soft">
            <service.icon className="text-primary" />
          </span>
          <h2 className="mt-4 text-2xl font-bold text-primary">{service.title}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{service.description}</p>
          <button
            type="button"
            onClick={onQuote}
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-button border border-primary px-5 font-semibold text-primary hover:bg-primary-soft"
          >
            Pedir orçamento para {service.title.toLowerCase()}
            <ArrowRight className="size-4" />
          </button>
        </div>
        <div className="rounded-2xl border border-border bg-background p-6">
          <h3 className="text-sm font-bold uppercase text-accent">O que inclui</h3>
          <ul className="mt-4 space-y-3">
            {service.includes.map((item) => (
              <li key={item} className="flex gap-3 text-sm">
                <Check className="size-5 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
