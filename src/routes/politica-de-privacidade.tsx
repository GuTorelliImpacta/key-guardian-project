import { createFileRoute } from "@tanstack/react-router";
import { ALLOW_INDEXING, absoluteUrl } from "@/config/site";

// TODO(jurídico): este texto é uma minuta e precisa de revisão da assessoria
// jurídica da cliente antes da publicação definitiva, incluindo a definição
// do canal oficial do encarregado (DPO) para exercício de direitos LGPD.
export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Key Master" },
      {
        name: "description",
        content: "Consulte como a Key Master trata dados pessoais e solicitações de orçamento.",
      },
      { property: "og:title", content: "Política de Privacidade | Key Master" },
      {
        property: "og:description",
        content: "Informações sobre privacidade e tratamento de dados.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: absoluteUrl("/politica-de-privacidade") },
      { name: "twitter:card", content: "summary" },
      ...(ALLOW_INDEXING ? [] : [{ name: "robots", content: "noindex, nofollow" }]),
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/politica-de-privacidade") }],
  }),
  component: Page,
});

function Page() {
  return (
    <main id="conteudo" className="pt-20 md:pt-28">
      <article className="mx-auto max-w-3xl px-4 py-20">
        <p className="text-sm font-bold uppercase text-accent">LGPD</p>
        <h1 className="mt-3 text-4xl font-bold text-primary">Política de Privacidade</h1>
        <div className="mt-8 space-y-7 leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-xl font-bold text-primary">Dados coletados</h2>
            <p className="mt-2">
              Podemos coletar nome, telefone, e-mail, CEP, tipo de imóvel e interesses informados
              voluntariamente nos formulários do site.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-primary">Finalidade</h2>
            <p className="mt-2">
              Os dados são utilizados para responder solicitações, preparar orçamentos e prestar
              atendimento relacionado aos serviços da Key Master.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-primary">Seus direitos</h2>
            <p className="mt-2">
              Você pode solicitar confirmação, acesso, correção ou exclusão dos seus dados pelos
              canais de contato da empresa.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-primary">Cookies</h2>
            <p className="mt-2">
              Hoje o site não exibe um banner de cookies. Usamos apenas cookies e armazenamento
              local essenciais ao funcionamento do site (como preferências de exibição). Nenhum dado
              de navegação é compartilhado com ferramentas de publicidade ou análise de terceiros.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
