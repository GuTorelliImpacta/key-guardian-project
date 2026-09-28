import { createFileRoute, Link } from "@tanstack/react-router";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowRight, Check, ChevronDown, MessageCircle, ShieldCheck } from "lucide-react";
import { QuoteCta, CTASection, SectionTitle, WhatsAppFloat } from "@/components/keymaster/Shared";
import { LeadForm } from "@/components/keymaster/LeadForm";
import { company, trackEvent, whatsappUrl } from "@/config/company";
import { ALLOW_INDEXING, absoluteUrl } from "@/config/site";
import { faq, perfis, services } from "@/data/content";

const cardImages: Record<string, string> = {
  "para-casa": "/images/protecao-residencial.svg",
  "para-empresa": "/images/protecao-comercial.svg",
  "para-condominios": "/images/equipe-viatura.svg",
  "para-industrias": "/images/central-monitoramento.svg",
};

const steps = [
  "Projeto sob medida",
  "Instalação profissional",
  "Monitoramento 24h",
  "Verificação e ação",
  "Relatórios",
];
const stepsCopy = [
  "Avaliamos seu imóvel e criamos o projeto ideal.",
  "Equipe própria instala e configura os equipamentos.",
  "A central recebe sinais por GPRS, IP ou linha.",
  "Verificamos por imagem e acionamos apoio quando necessário.",
  "Você acompanha eventos e solicita relatórios.",
];

function buildSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "SecurityService"],
        "@id": absoluteUrl("/#organization"),
        url: absoluteUrl("/"),
        name: company.brand,
        legalName: company.legalEntities[0].name,
        alternateName: "KM Monitoramento 24hrs",
        image: absoluteUrl("/og-image.png"),
        logo: absoluteUrl("/images/key-master-logo.png"),
        foundingDate: company.foundedDate,
        telephone: company.phones.central.tel,
        email: company.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address.street,
          addressLocality: company.address.city,
          addressRegion: company.address.state,
          postalCode: company.address.zip,
          addressCountry: "BR",
        },
        geo: { "@type": "GeoCoordinates", latitude: company.geo.lat, longitude: company.geo.lng },
        hasMap: `https://www.google.com/maps?q=${encodeURIComponent(`${company.address.street}, ${company.address.district}, ${company.address.city}`)}`,
        areaServed: "São Paulo, SP, Brasil",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "central de monitoramento 24h",
            telephone: company.phones.central.tel,
            availableLanguage: "pt-BR",
          },
          {
            "@type": "ContactPoint",
            contactType: "comercial",
            telephone: company.phones.commercial.tel,
            hoursAvailable: "Mo-Fr 09:00-18:00",
            availableLanguage: "pt-BR",
          },
          {
            "@type": "ContactPoint",
            contactType: "WhatsApp",
            telephone: `+${company.phones.whatsapp.wa}`,
            availableLanguage: "pt-BR",
          },
        ],
        ...(Object.keys(company.social).length ? { sameAs: Object.values(company.social) } : {}),
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Key Master | Monitoramento 24h em São Paulo" },
      {
        name: "description",
        content:
          "Monitoramento 24h, alarmes e câmeras em São Paulo, com central e viaturas próprias desde 1991. Peça um orçamento.",
      },
      { property: "og:title", content: "Key Master | Monitoramento 24h em São Paulo" },
      {
        property: "og:description",
        content: "Segurança eletrônica com central própria em São Paulo desde 1991.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/") },
      { property: "og:image", content: absoluteUrl("/og-image.png") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absoluteUrl("/og-image.png") },
      ...(ALLOW_INDEXING ? [] : [{ name: "robots", content: "noindex, nofollow" }]),
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(buildSchema()) }],
  }),
  component: Home,
});

function Home() {
  return (
    <main id="conteudo">
      <section className="dot-grid relative min-h-[760px] overflow-hidden bg-primary-dark pb-20 pt-40 text-hero-foreground md:pt-52">
        <div className="absolute inset-0 opacity-15">
          <img
            src="/images/camera-seguranca-real.webp"
            alt="Câmera de segurança Key Master protegendo um perímetro"
            width={565}
            height={380}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-primary-dark/75" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-[1.15fr_.85fr] lg:px-6">
          <div className="reveal">
            <span className="inline-flex rounded-full border border-hero-foreground/25 px-4 py-2 text-sm font-semibold">
              Desde {company.foundedYear} • Central própria 24h
            </span>
            <h1 className="mt-6 max-w-4xl text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1]">
              Segurança 24 horas com quem protege São Paulo desde {company.foundedYear}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-silver">
              Alarmes monitorados, câmeras inteligentes e viaturas de apoio próprias. Tecnologia e
              atendimento humano para sua casa, empresa ou condomínio.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteCta size="lg">
                {company.cta.quote}
                <ArrowRight />
              </QuoteCta>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-button border border-hero-foreground/70 px-7 text-base font-semibold text-hero-foreground transition-all hover:bg-hero-foreground/10"
                onClick={() => trackEvent("click_whatsapp", { placement: "hero" })}
              >
                <MessageCircle />
                Falar no WhatsApp
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm">
              {["Central própria 24h", "Viaturas de apoio", "+2.000 clientes"].map((x) => (
                <span key={x} className="flex items-center gap-2">
                  <Check className="size-4 text-accent" />
                  {x}
                </span>
              ))}
            </div>
          </div>
          <div className="reveal rounded-2xl border border-hero-foreground/20 bg-hero-foreground/10 p-6 shadow-soft backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold">Key Master Central</span>
              <span className="flex items-center gap-2 text-sm">
                <i className="pulse-status size-2 rounded-full bg-success" />
                Online
              </span>
            </div>
            <div className="mt-6 rounded-xl bg-primary-dark/75 p-5">
              <p className="text-sm text-silver">Status do imóvel</p>
              <p className="mt-2 flex items-center gap-2 text-xl font-bold">
                <ShieldCheck className="text-success" />
                Sistema armado
              </p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-hero-foreground/10 p-4">
                <p className="text-xs text-silver">Última verificação</p>
                <strong className="mt-1 block">Agora</strong>
              </div>
              <div className="rounded-xl border border-hero-foreground/10 p-4">
                <p className="text-xs text-silver">Conexão</p>
                <strong className="mt-1 block">Protegida</strong>
              </div>
            </div>
            <p className="mt-3 text-xs text-silver">Exemplo ilustrativo — não é um dado ao vivo.</p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 text-center md:grid-cols-4 lg:px-6">
          {[
            [String(company.foundedYear), "ano de fundação"],
            ["+2.000", "clientes monitorados"],
            ["24h", "central própria, todos os dias"],
            ["940m²", "sede própria no Tucuruvi"],
          ].map(([n, t]) => (
            <div key={n}>
              <strong className="font-display text-3xl text-accent md:text-4xl">{n}</strong>
              <p className="mt-2 text-sm text-muted-foreground">{t}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-soft py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionTitle eyebrow="Soluções" title="Qual espaço você quer proteger?" />
          <div className="flex snap-x gap-5 overflow-x-auto pb-5 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
            {perfis.map((p) => (
              <article
                key={p.id}
                className="group min-w-[82vw] snap-center overflow-hidden rounded-2xl border border-border bg-background shadow-soft transition hover:-translate-y-1 hover:border-accent sm:min-w-[360px] md:min-w-0"
              >
                <img
                  src={cardImages[p.id]}
                  alt={`${p.label}: solução de segurança eletrônica Key Master`}
                  loading="lazy"
                  decoding="async"
                  width="520"
                  height="340"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-5">
                  <p.icon className="text-accent" />
                  <h3 className="mt-4 text-xl font-bold text-primary">{p.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.scenario}</p>
                  <Link
                    to="/servicos"
                    hash={p.id}
                    className="mt-5 inline-flex min-h-12 items-center gap-2 font-semibold text-primary"
                  >
                    Ver solução <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionTitle
            eyebrow="Proteção completa"
            title="Tecnologia e resposta em um só lugar"
            copy="Projetamos, instalamos, monitoramos e mantemos sua segurança com equipe própria."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.slug}
                className="rounded-2xl border border-border p-6 transition hover:-translate-y-1 hover:border-accent hover:shadow-soft"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-primary-soft">
                  <s.icon className="text-primary" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-primary">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <Link
                  to="/servicos"
                  hash={s.slug}
                  className="mt-4 inline-flex min-h-12 items-center gap-2 font-semibold text-primary"
                >
                  Conhecer serviço
                  <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/contato"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-button bg-accent px-7 text-base font-semibold text-accent-foreground shadow-soft hover:bg-accent-hover"
            >
              {company.cta.visit}
            </Link>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-24 bg-primary-soft py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionTitle
            eyebrow="Como funciona"
            title="Do disparo à solução: veja como protegemos você"
          />
          <ol className="grid gap-8 lg:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s} className="relative">
                <span className="font-display text-5xl font-bold text-accent">0{i + 1}</span>
                <h3 className="mt-3 font-bold text-primary">{s}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{stepsCopy[i]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="dot-grid bg-primary-dark py-20 text-hero-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:px-6">
          <img
            src="/images/sistemas-duplicados.svg"
            alt="Sistemas duplicados da central própria Key Master"
            loading="lazy"
            decoding="async"
            width="1200"
            height="900"
            className="w-full rounded-2xl object-cover shadow-soft"
          />
          <div>
            <p className="text-xs font-bold uppercase text-accent">Central própria 24h</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Nossa central não dorme. E ela é nossa.
            </h2>
            <p className="mt-5 leading-relaxed text-silver">
              A Key Master opera sua própria central na sede em São Paulo, com software desenvolvido
              internamente, sistemas duplicados e operadores treinados em três turnos.
            </p>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                "Central própria 365 dias",
                "Software próprio",
                "Sistemas duplicados",
                "Equipes móveis de agentes",
                "Sinais de todo o Brasil",
                "Compatível com diferentes marcas",
              ].map((x) => (
                <li key={x} className="flex gap-2 text-sm">
                  <Check className="size-5 text-accent" />
                  {x}
                </li>
              ))}
            </ul>
            <Link
              to="/sobre"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-button bg-accent px-6 font-semibold text-accent-foreground shadow-soft hover:bg-accent-hover"
            >
              Conheça a Key Master
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary-soft py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionTitle
            eyebrow="Diferenciais"
            title="Presença real em cada etapa da sua proteção"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                img: "/images/equipe-especializada.webp",
                w: 376,
                h: 374,
                title: "Equipe especializada",
                copy: "Profissionais preparados para agir com rapidez e eficiência.",
                alt: "Agente da Key Master em campo, ao lado de uma viatura de apoio",
              },
              {
                img: "/images/protecao-residencial-real.webp",
                w: 385,
                h: 380,
                title: "Mais segurança para o que importa",
                copy: "Protegendo residências, condomínios e empresas.",
                alt: "Imóvel residencial com portão monitorado pela Key Master",
              },
              {
                img: "/images/acesso-celular-real.webp",
                w: 390,
                h: 384,
                title: "Acesso remoto ao projeto",
                copy: "Quando incluído no projeto, acompanhe imagens de onde estiver.",
                alt: "Aplicativo de monitoramento de câmeras aberto em um celular",
              },
            ].map((c) => (
              <article
                key={c.title}
                className="overflow-hidden rounded-2xl border border-border bg-background shadow-soft transition hover:-translate-y-1 hover:border-accent"
              >
                <img
                  src={c.img}
                  alt={c.alt}
                  loading="lazy"
                  decoding="async"
                  width={c.w}
                  height={c.h}
                  className="aspect-square w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-primary">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionTitle title="Segurança de empresa grande, atendimento de quem conhece você" />
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ["Estrutura própria", "Central, sede, tecnologia e viaturas sob nossa gestão."],
              ["Atendimento próximo", "Gente de verdade, disponível quando você precisa."],
              [
                "Projeto personalizado",
                "Proteção desenhada para o risco e a rotina do seu imóvel.",
              ],
            ].map(([a, b]) => (
              <div key={a} className="border-t-2 border-accent pt-5">
                <h3 className="text-xl font-bold text-primary">{a}</h3>
                <p className="mt-3 text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="orcamento" className="scroll-mt-24 bg-primary-soft py-20">
        <div className="mx-auto max-w-5xl px-4">
          <SectionTitle
            eyebrow="Orçamento"
            title="Receba seu orçamento em menos de 1 minuto"
            copy="Conte o que você precisa. Nossa equipe entra em contato para orientar o próximo passo."
          />
          <LeadForm />
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-4xl px-4">
          <SectionTitle eyebrow="Dúvidas frequentes" title="Informação clara para você decidir" />
          <Accordion.Root
            type="single"
            collapsible
            className="divide-y divide-border border-y border-border"
          >
            {faq.map(([q, a], i) => (
              <Accordion.Item value={`f${i}`} key={q}>
                <Accordion.Header>
                  <Accordion.Trigger className="group flex min-h-16 w-full items-center justify-between py-4 text-left font-semibold text-primary">
                    {q}
                    <ChevronDown className="shrink-0 transition-transform group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden pb-5 text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  {a}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>
      <CTASection />
      <WhatsAppFloat />
    </main>
  );
}
