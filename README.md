# Key Guardian Project

Crie um site institucional moderno, de alta conversão, para a KEY MASTER Monitoramento 24 Horas, empresa de segurança eletrônica fundada em 1991 em São Paulo (SP). O objetivo é a transformação digital da marca: sair de um site antigo e genérico para uma experiência premium, confiável e focada em gerar pedidos de orçamento e contatos via WhatsApp. Idioma: português do Brasil. Stack: React + Vite + Tailwind + shadcn/ui, com React Router para as páginas internas.

==================================================
1. POSICIONAMENTO E TOM DE VOZ
==================================================
Conceito criativo: "35 anos protegendo o que importa para você — com central própria, viatura própria e gente de verdade atendendo 24h."
Diferencial central: a solidez e a tecnologia de uma grande empresa de segurança, com a proximidade e agilidade de uma empresa paulistana com sede própria.
Tom: seguro, direto, humano e tranquilizador. Nunca usar linguagem de medo exagerado ou sensacionalista. Frases curtas, foco em benefício ("durma tranquilo", "sua empresa protegida mesmo com as portas fechadas"). Tratar o usuário por "você".

Públicos (criar caminhos claros para cada um):
- Residências (casas e apartamentos)
- Comércios e escritórios (lojas, joalherias, bancos, clínicas)
- Condomínios
- Indústrias, galpões e transportadoras

==================================================
2. IDENTIDADE VISUAL (manter a paleta atual da marca)
==================================================
Cores (definir como design tokens / CSS variables no Tailwind):
- --primary (Índigo Key Master): #2A1470 — cor institucional, títulos, header, rodapé
- --primary-dark (Noite): #120A3A — fundos escuros das seções de impacto (hero, central 24h)
- --primary-soft: #EEEBFA — fundos de cards e seções alternadas
- --accent (Laranja Key Master): #E3700F — CTAs, ícones de destaque, números, detalhes
- --accent-hover: #C2570A
- --silver: #A8A8C0 — linhas, bordas, textos secundários sobre fundo escuro
- --neutral-50: #F7F7FA / --neutral-900: #1A1A24 (texto principal)
- --success (WhatsApp): #25D366 apenas no botão de WhatsApp
Regras de uso: fundo claro predominante, com 2 a 3 seções em índigo escuro para dar ritmo e ar "tecnológico/central de monitoramento". O laranja é reservado para ação (botões, números, ícones-chave). Nunca usar laranja em blocos grandes de texto. Garantir contraste WCAG AA: texto branco sobre laranja apenas em botões com fonte bold ≥18px; para textos menores sobre laranja, usar #120A3A.

Tipografia (Google Fonts):
- Títulos: "Sora" (600/700), levemente apertado (tracking -0.02em)
- Corpo: "Inter" (400/500), 16–18px, line-height 1.6
- Números/estatísticas: Sora 700 em laranja

Estilo visual:
- Clean, premium e tecnológico. Cantos arredondados (radius 16px em cards, 12px em botões), sombras suaves e difusas, muito espaço em branco.
- Elementos gráficos sutis: grid de pontos ou linhas finas em fundos escuros (remetendo a um mapa/radar de monitoramento), um "pulso" animado verde/laranja indicando "Central online 24h".
- Ícones: lucide-react, traço fino, em círculos com fundo --primary-soft e ícone em --primary ou --accent.
- Fotografia: pessoas reais, casas e comércios iluminados, operadores em central de monitoramento, técnicos instalando câmeras, viatura. Tratamento levemente frio/azulado. Evitar imagens de criminosos, armas ou violência.
- Logo: usar o arquivo de logo que vou enviar (índigo e laranja). No header sobre fundo escuro, usar versão com texto branco.

Microinterações:
- Fade/slide-up suave ao entrar em viewport (framer-motion, 300–500ms, respeitando prefers-reduced-motion).
- Contadores animados nos números de autoridade.
- Hover nos cards com leve elevação e borda laranja.
- Botões com leve escala (1.02) no hover.

==================================================
3. ESTRUTURA DE NAVEGAÇÃO (SITEMAP)
==================================================
Header fixo (sticky), com fundo transparente sobre o hero e sólido branco com sombra ao rolar:
- Logo à esquerda
- Menu: Início | Soluções (dropdown: Para sua Casa, Para sua Empresa, Para Condomínios, Para Indústrias e Logística) | Serviços (dropdown: Monitoramento de Alarmes, Monitoramento de Imagens, CFTV e Câmeras, Alarmes e Sensores, Storage de Imagens, Manutenção e Projetos) | Como Funciona | Sobre | Contato
- À direita: telefone clicável "Central 24h (11) 2196-2200" com ícone + botão laranja "Orçamento Grátis"
- Mobile: menu hambúrguer em drawer lateral, com CTAs grandes no final (Ligar, WhatsApp, Orçamento)

Barra superior fina (top bar, some ao rolar), fundo #120A3A:
"● Central de Monitoramento online 24h — Já é cliente? Ligue (11) 2196-2200" + ícones de redes sociais.

Páginas:
/ (Home)
/solucoes/residencial
/solucoes/empresarial
/solucoes/condominios
/solucoes/industrias-e-logistica
/servicos/monitoramento-de-alarmes
/servicos/monitoramento-de-imagens
/servicos/cftv
/servicos/alarmes-e-sensores
/servicos/storage-de-imagens
/servicos/manutencao-e-projetos
/como-funciona
/sobre
/contato (com formulário de orçamento completo)
/politica-de-privacidade
Página 404 personalizada com CTA para voltar e para o WhatsApp.

==================================================
4. HOME — SEÇÃO POR SEÇÃO
==================================================

4.1 HERO (fundo #120A3A com foto de fachada residencial/comercial à noite em overlay escuro + grid de pontos sutil)
- Selo pequeno acima do título: "Desde 1991 • Central própria 24h"
- H1: "Segurança 24 horas com quem protege São Paulo há mais de 35 anos"
- Subtítulo: "Alarmes monitorados, câmeras inteligentes e viaturas de apoio próprias. Tecnologia de ponta e atendimento humano para sua casa, empresa ou condomínio."
- CTA primário (laranja): "Quero meu orçamento grátis" → abre o formulário em etapas (seção 4.9 ou modal)
- CTA secundário (outline branco): "Falar no WhatsApp" (ícone WhatsApp) → https://wa.me/5511995869988 com mensagem pré-preenchida: "Olá! Vim pelo site e gostaria de um orçamento de segurança."
- Abaixo dos botões, 3 microprovas com ícones: "Central própria 24h" • "Viaturas de apoio" • "+2.000 clientes"
- No desktop, à direita: card flutuante estilo "app/central" com glassmorphism, mostrando um mock de status: "Sistema armado ✓", "Última verificação: agora", "Central online" com ponto pulsando. Isso comunica tecnologia sem precisar de imagem complexa.

4.2 FAIXA DE AUTORIDADE (números animados, fundo branco, 4 colunas; 2x2 no mobile)
- "1991" — fundada há mais de 35 anos
- "+2.000" — clientes monitorados
- "24h" — central própria, 7 dias por semana, 3 turnos de operadores
- "940m²" — sede própria no Tucuruvi
(Deixar estrutura fácil de editar; números em laranja, legenda em cinza)

4.3 ESCOLHA SUA SOLUÇÃO (segmentação — padrão das grandes do setor)
Título: "Qual espaço você quer proteger?"
4 cards grandes com foto, ícone, título, 1 linha de benefício e link "Ver solução →":
- Para sua Casa — "Proteção para sua família, mesmo quando você está longe."
- Para sua Empresa — "Comércios, escritórios, joalherias e clínicas protegidos 24h."
- Para Condomínios — "Monitoramento de áreas comuns, perímetro e portaria."
- Para Indústrias e Logística — "Galpões, fábricas e transportadoras com projeto sob medida."
No mobile: carrossel horizontal com scroll-snap.

4.4 SERVIÇOS (grid de 6 cards com ícone, título, descrição curta e link)
- Monitoramento de Alarmes 24h — "Nossa central recebe o disparo em tempo real e aciona uma viatura de apoio até o local."
- Monitoramento de Imagens e Ronda Virtual — "Operadores verificam suas câmeras ao vivo e fazem rondas virtuais para identificar anomalias, mesmo sem disparo de alarme."
- CFTV e Câmeras Inteligentes — "Câmeras Full HD e 4K, vídeo analítico e leitura de placas. Tudo o que um projeto completo precisa."
- Alarmes e Sensores — "Centrais monitoradas, sensores de movimento, magnéticos, perimetrais, de impacto e sísmicos, botão de pânico e cerca elétrica."
- Storage de Imagens — "Backup das suas gravações em nossos servidores. Se o DVR for furtado ou o HD falhar, suas imagens continuam seguras."
- Integração Alarme + Câmera — "Quando o alarme dispara, a central já vê a imagem do local e confirma a ocorrência em segundos."
CTA ao final da seção: "Não sabe o que precisa? Nossos técnicos montam um projeto personalizado — Solicitar visita técnica gratuita".

4.5 COMO FUNCIONA (timeline horizontal no desktop, vertical no mobile, com números grandes em laranja)
Título: "Do disparo à solução: veja como protegemos você"
1. Projeto sob medida — "Nossos técnicos avaliam seu imóvel e criam um projeto personalizado."
2. Instalação profissional — "Equipe própria instala e configura todos os equipamentos."
3. Monitoramento 24h — "Sua central de alarme se comunica com a nossa por GPRS, IP ou linha telefônica, com sistemas duplicados."
4. Verificação e ação — "Em caso de disparo, verificamos por imagem e enviamos nossa viatura de apoio. Se houver invasão, acionamos a polícia."
5. Relatórios — "Você recebe relatórios mensais de eventos, e sempre que precisar."

4.6 A CENTRAL KEY MASTER (seção de impacto, fundo #120A3A, foto de central de monitoramento)
Título: "Nossa central não dorme. E ela é nossa."
Texto: "Diferente de empresas que terceirizam o monitoramento, a Key Master opera sua própria Central 24h na sede própria em São Paulo, com software desenvolvido internamente, sistemas duplicados e operadores treinados em três turnos."
Lista de diferenciais com ícones (2 colunas):
- Central própria 24h, 365 dias
- Software de monitoramento próprio
- Sistemas duplicados (redundância total)
- Viaturas de apoio exclusivas
- Recebe sinais de todo o Brasil (GPRS, IP e linha telefônica)
- Opera qualquer marca de central de alarme
CTA: "Conheça a Key Master" → /sobre

4.7 POR QUE A KEY MASTER (comparativo leve, sem citar concorrentes)
Título: "Segurança de empresa grande, atendimento de quem conhece você"
3 colunas: "Estrutura própria" | "Atendimento próximo" | "Projeto personalizado", cada uma com 2–3 linhas.

4.8 DEPOIMENTOS E CONFIANÇA
- Carrossel de depoimentos com nome, tipo de cliente (ex.: "Síndica — Condomínio na Zona Norte") e nota em estrelas. USAR TEXTOS PLACEHOLDER claramente marcados como [DEPOIMENTO EXEMPLO] para eu substituir por depoimentos reais.
- Espaço para selo "Avaliações no Google" (placeholder).
- Faixa de logos de marcas de equipamentos trabalhados (placeholder em cinza).
- Espaço para selo "Empresa autorizada pela Polícia Federal" como placeholder comentado [CONFIRMAR COM A CLIENTE].

4.9 FORMULÁRIO DE ORÇAMENTO EM ETAPAS (principal gerador de leads)
Fundo --primary-soft, card branco central.
Título: "Receba seu orçamento gratuito em menos de 1 minuto"
Etapa 1: "Qual tipo de imóvel?" (botões grandes com ícone: Casa, Apartamento, Comércio/Escritório, Condomínio, Indústria/Galpão)
Etapa 2: "O que você precisa?" (múltipla escolha: Alarme monitorado, Câmeras/CFTV, Monitoramento de imagens, Cerca elétrica, Storage de imagens, Não sei, quero uma visita técnica)
Etapa 3: "Seus dados": Nome, WhatsApp (máscara (11) 99999-9999), E-mail (opcional), CEP (máscara 00000-000), checkbox LGPD obrigatório "Concordo em ser contatado e com a Política de Privacidade".
Barra de progresso no topo, botão "Voltar", validação em tempo real com mensagens amigáveis, botões grandes (min 48px) no mobile.
Ao enviar: tela de sucesso com "Recebemos seu pedido! Nosso time comercial entrará em contato em breve." + botão "Quer agilizar? Fale agora no WhatsApp", que abre o WhatsApp com os dados do formulário já na mensagem.
Por enquanto, salvar os leads em um estado local/console e deixar preparado para integração posterior (Supabase ou webhook).

4.10 FAQ (accordion, com schema FAQPage)
- Como funciona o monitoramento 24 horas?
- O que acontece quando o alarme dispara?
- A Key Master tem viatura própria?
- Posso ver minhas câmeras pelo celular?
- O que é o Storage de Imagens e por que eu preciso dele?
- Vocês atendem qualquer marca de alarme que eu já tenho?
- O sistema funciona se cortarem a linha telefônica ou a energia?
- Quais regiões vocês atendem?
- Como é feito o orçamento? Tem custo?
- Vocês fazem manutenção de sistemas existentes?
Respostas curtas e claras, baseadas nos serviços descritos acima. Quando depender de confirmação da cliente, marcar com [CONFIRMAR].

4.11 CTA FINAL (faixa laranja → índigo em gradiente sutil)
"Proteja hoje o que você levou uma vida para construir."
Botões: "Orçamento grátis" e "Ligar agora (11) 2196-2200".

4.12 RODAPÉ (fundo #120A3A, 4 colunas; empilhadas no mobile)
- Logo branco + frase: "Monitoramento 24 horas desde 1991." + redes sociais [links placeholder]
- Soluções (links)
- Serviços (links)
- Contato:
  Central 24h: (11) 2196-2200
  Comercial: (11) 2240-2002
  WhatsApp: (11) 99586-9988
  E-mail: comercial@keymaster.com.br
  Endereço: Rua Calandra, 51 — Tucuruvi, São Paulo/SP — CEP 02275-000
  Atendimento comercial: seg a sex, 9h às 18h | Central: 24h
- Mapa do Google embutido (lazy load) na página de contato
- Linha final: "© 2026 Key Master Monitoramento 24 Horas — CNPJ [INSERIR CNPJ] — Todos os direitos reservados" | Política de Privacidade

==================================================
5. PÁGINAS INTERNAS
==================================================
Modelo padrão para cada página de SOLUÇÃO e SERVIÇO:
1. Hero menor com breadcrumb, H1 com palavra-chave ("Alarme monitorado para empresas em São Paulo"), subtítulo e CTA de orçamento
2. "Para quem é" (dores e cenários específicos daquele público)
3. Benefícios em cards (4 a 6)
4. Equipamentos/recursos inclusos
5. Mini "Como funciona" (3 passos)
6. Bloco de prova (números + depoimento)
7. FAQ específico (3 a 5 perguntas)
8. Formulário de orçamento curto (versão compacta do formulário em etapas, já com o tipo de imóvel/serviço pré-selecionado conforme a página)

Conteúdo-base por serviço:
- Monitoramento de Alarmes: central própria 24h com operadores em 3 turnos; recebe sinais via linha telefônica, módulo GPRS e IP de todo o Brasil; opera qualquer tipo de central de alarme; cadastro do cliente sempre atualizado; relatórios mensais de eventos ou sob demanda; viaturas de apoio exclusivas (o operador passa via rádio o endereço, a viatura verifica o local e retorna o resultado à central).
- Monitoramento de Imagens: visualização do imóvel em tempo real e de gravações anteriores para confirmar invasões; Ronda Virtual para detectar anomalias sem disparo de alarme.
- CFTV: câmeras Full HD e 4K, DVRs, câmeras com vídeo analítico, leitura de placas, monitores, nobreaks — "tudo o que um projeto completo precisa".
- Alarmes e Sensores: centrais de alarme monitoradas, sensores de movimento, magnéticos, de proteção perimetral, de impacto e sísmicos, botões de pânico e cerca elétrica.
- Storage de Imagens: armazenamento remoto das imagens em servidores da Key Master pelo período definido pelo cliente; protege contra furto do DVR e contra falhas de HD. Ideal para condomínios, fábricas e imóveis que exigem segurança robusta.
- Manutenção e Projetos: projetos técnicos personalizados, instalação, manutenção preventiva e corretiva, integração alarme x câmera.

Página SOBRE:
- História com timeline visual: 1991 fundação → desenvolvimento do software próprio → sede própria de 940m² no Tucuruvi → 30 anos (selo comemorativo) → hoje +2.000 clientes.
- Missão/valores: pronto atendimento, investimento contínuo em tecnologia, equipe treinada com reciclagem contínua.
- Galeria (fotos da sede, central, equipe, viaturas) em grid com lightbox — placeholders.
- CTA para orçamento.

Página CONTATO:
- Formulário completo + cards de contato (Central 24h, Comercial, WhatsApp, E-mail) com botões de ação de 1 clique (tel:, wa.me, mailto:)
- Mapa do Google (Rua Calandra, 51 — Tucuruvi, São Paulo/SP)
- Horários: comercial seg–sex 9h–18h; Central de Monitoramento 24h

==================================================
6. CONVERSÃO (CTAs E USABILIDADE)
==================================================
- Regra: todo scroll de ~1 tela deve ter um caminho de conversão visível.
- Botão flutuante de WhatsApp (canto inferior direito, desktop) com tooltip "Fale com um consultor" e leve animação de pulso a cada 8s.
- MOBILE: barra de ação fixa no rodapé da tela (bottom bar) com 3 botões iguais: "Ligar" (tel:+551121962200) | "WhatsApp" | "Orçamento" (laranja). No mobile, o botão flutuante de WhatsApp é substituído por essa barra.
- CTAs com verbos de benefício: "Quero proteger minha casa", "Proteger minha empresa", "Solicitar visita técnica gratuita".
- Números de telefone sempre clicáveis (tel:) e com formatação legível.
- Diferenciar visualmente "Já sou cliente / Emergência" (telefone da central) de "Quero contratar" (orçamento/WhatsApp comercial).
- Deixar eventos preparados (data-attributes ou função trackEvent) para cliques em WhatsApp, telefone e envio de formulário, para integrar com Google Analytics 4 / Meta Pixel depois.

==================================================
7. RESPONSIVIDADE
==================================================
- Mobile-first. Breakpoints: 360px, 768px, 1024px, 1280px, 1536px.
- Container máximo 1280px.
- Grids colapsam para 1 coluna no mobile e 2 no tablet.
- Tipografia fluida com clamp(): H1 de 32px (mobile) a 56px (desktop).
- Áreas de toque mínimas de 48x48px; espaçamento confortável entre links.
- Carrosséis com swipe no mobile e setas no desktop.
- Testar que nada gera scroll horizontal em 360px.
- Menu mobile acessível, com fechamento ao clicar fora e com ESC.

==================================================
8. PERFORMANCE, SEO E ACESSIBILIDADE
==================================================
Performance (meta: Lighthouse 90+ em mobile):
- Imagens em WebP/AVIF com lazy loading e dimensões definidas (evitar CLS)
- Hero com imagem otimizada e preload
- Fontes com font-display: swap
- Code splitting por rota
- Mapa e vídeos carregados apenas quando entram na tela

SEO local:
- Title e meta description únicos por página. Home: "Key Master | Monitoramento 24h, Alarmes e Câmeras em São Paulo desde 1991"
- Um H1 por página e hierarquia correta de headings
- URLs amigáveis
- Open Graph e Twitter Cards
- Schema.org JSON-LD: LocalBusiness/SecurityService (nome, endereço, telefone, horário 24h, foundingDate 1991, geo São Paulo), FAQPage e BreadcrumbList
- sitemap.xml e robots.txt
- Alt text descritivo em todas as imagens
- Palavras-chave naturais no texto: monitoramento 24 horas, alarme monitorado, câmeras de segurança, CFTV, segurança eletrônica, Zona Norte, Tucuruvi, São Paulo

Acessibilidade (WCAG 2.1 AA):
- Contraste adequado em todos os textos
- Foco visível em todos os elementos interativos
- Labels em todos os campos de formulário
- aria-labels nos botões de ícone
- Navegação completa por teclado
- Respeitar prefers-reduced-motion
- Controle de tamanho de fonte A-/A+ no top bar (o site atual já oferece e deve ser mantido)

LGPD:
- Banner de cookies discreto (aceitar/recusar)
- Página de Política de Privacidade (texto-base placeholder)
- Consentimento explícito nos formulários

==================================================
9. ENTREGA E ORGANIZAÇÃO DO CÓDIGO
==================================================
- Centralizar todos os dados da empresa (telefones, WhatsApp, e-mail, endereço, CNPJ, redes sociais, números de autoridade) em um único arquivo de configuração (ex.: src/config/company.ts), para edição fácil.
- Centralizar textos de serviços e soluções em arquivos de dados (ex.: src/data/services.ts), gerando as páginas internas a partir deles.
- Componentes reutilizáveis: Header, TopBar, Footer, MobileActionBar, WhatsAppButton, SectionTitle, ServiceCard, SolutionCard, StatsCounter, StepsTimeline, FAQAccordion, LeadFormMultiStep, TestimonialCarousel, CTASection.
- Marcar com [PLACEHOLDER] ou [CONFIRMAR COM A CLIENTE] tudo que for exemplo: depoimentos, CNPJ, redes sociais, selos, fotos reais.

Comece pela Home completa, com header, rodapé, barra mobile e formulário em etapas funcionando. Depois crie as páginas internas seguindo o modelo padrão.

A logo está anexada.

Além de 4 imagens que podem ser interessantes para o site

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0010493b-0f47-4f9a-9613-7fdb39fe0311).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
