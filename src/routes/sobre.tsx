import { createFileRoute } from "@tanstack/react-router";
import { Building2, Check } from "lucide-react";
import { CTASection, SectionTitle } from "@/components/keymaster/Shared";
import { company } from "@/config/company";
import { ALLOW_INDEXING, absoluteUrl } from "@/config/site";

const timeline: { year?: string; label: string }[] = [
  { year: "1991", label: "Fundação (25/10/1991)" },
  { label: "Software próprio de monitoramento" },
  { label: "Sede própria de 940m² no Tucuruvi" },
  { year: "2021", label: "30 anos de garantia em trabalho bem feito" },
  { year: "Hoje", label: "+2.000 clientes" },
];

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: `Sobre a Key Master | Desde ${company.foundedYear}` },
      {
        name: "description",
        content: "Conheça a história e a central própria da Key Master no Tucuruvi, São Paulo.",
      },
      { property: "og:title", content: "Sobre a Key Master" },
      {
        property: "og:description",
        content: `Desde ${company.foundedYear}, tecnologia própria e atendimento humano.`,
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/sobre") },
      { property: "og:image", content: absoluteUrl("/og-image.png") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absoluteUrl("/og-image.png") },
      ...(ALLOW_INDEXING ? [] : [{ name: "robots", content: "noindex, nofollow" }]),
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/sobre") }],
  }),
  component: Page,
});

function Page() {
  return (
    <main id="conteudo" className="pt-20 md:pt-28">
      <section className="bg-primary-dark py-20 text-hero-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold md:text-5xl">
            Desde {company.foundedYear} protegendo o que importa
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-silver">
            Uma empresa paulistana com sede, central, tecnologia e equipe próprias.
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title="Uma história construída com confiança" />
          <div className="grid gap-5 md:grid-cols-5">
            {timeline.map((t) => (
              <div key={t.label} className="border-t-2 border-accent pt-4">
                {t.year && <strong className="text-2xl text-accent">{t.year}</strong>}
                <p className="mt-2 font-semibold text-primary">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-primary-soft py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title="Pronto atendimento e evolução contínua" />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              "Investimento contínuo em tecnologia",
              "Equipe treinada e em reciclagem contínua",
              "Atendimento humano e próximo",
            ].map((x) => (
              <div className="rounded-2xl bg-background p-6 shadow-soft" key={x}>
                <Check className="text-accent" />
                <h2 className="mt-4 font-bold text-primary">{x}</h2>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-start gap-4 rounded-2xl bg-background p-6 shadow-soft md:p-8">
            <Building2 className="mt-1 shrink-0 text-accent" />
            <div>
              <h2 className="text-xl font-bold text-primary">Sede própria</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Sede própria de 940m² no Tucuruvi, em São Paulo, com central de monitoramento
                própria operando 24 horas em três turnos.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </main>
  );
}
