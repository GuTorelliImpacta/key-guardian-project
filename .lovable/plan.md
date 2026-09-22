# Plano de implementação — Key Master Monitoramento 24 Horas

## Objetivo
Transformar o site da Key Master em uma experiência institucional premium, confiável e orientada a pedidos de orçamento, preservando a identidade índigo e laranja e usando as imagens enviadas.

## Etapa 1 — Base visual e Home completa
- Criar o sistema visual com as cores, tipografia Sora/Inter, espaçamentos, sombras, cantos e estados acessíveis definidos no briefing.
- Incorporar a logo e as quatro imagens enviadas pelo fluxo de mídia do projeto.
- Criar o cabeçalho fixo com barra superior, menus de Soluções e Serviços, telefone, orçamento e menu lateral acessível no celular.
- Construir todas as seções da Home: abertura, números, soluções, serviços, funcionamento, central própria, diferenciais, depoimentos marcados como exemplo, formulário em etapas, FAQ, chamada final e rodapé.
- Implementar o formulário em três etapas com máscaras, validação, consentimento LGPD, confirmação e mensagem pronta para WhatsApp. Nesta fase, os dados permanecerão apenas no navegador/console, conforme solicitado.
- Adicionar barra fixa de ações no celular, botão flutuante de WhatsApp no computador, banner de cookies e eventos preparados para futura medição.
- Adicionar movimentos discretos, contadores e carrosséis, respeitando redução de movimento.

## Etapa 2 — Páginas internas
- Criar páginas individuais para as quatro soluções, seis serviços, Como Funciona, Sobre, Contato e Política de Privacidade.
- Centralizar dados da empresa, soluções, serviços, perguntas e conteúdo compartilhado para facilitar futuras edições.
- Aplicar o modelo solicitado em cada solução/serviço: abertura, público, benefícios, recursos, processo, prova, FAQ e orçamento compacto pré-selecionado.
- Criar a linha do tempo e galeria placeholder da página Sobre.
- Criar a página Contato com formulário, ações diretas e mapa carregado sob demanda.
- Personalizar a página 404 com atalhos para início e WhatsApp.

## Conteúdo, SEO e acessibilidade
- Marcar claramente depoimentos, selos, redes sociais, CNPJ, fotos reais e dados pendentes com `[PLACEHOLDER]` ou `[CONFIRMAR COM A CLIENTE]`.
- Definir título, descrição, Open Graph, Twitter Card e dados estruturados adequados por página.
- Criar navegação por teclado, foco visível, rótulos de campos, textos alternativos e áreas de toque confortáveis.
- Atualizar robots.txt. O sitemap será preparado somente quando houver um endereço público definitivo para evitar URLs incorretas.

## Verificação
- Conferir a Home e os principais fluxos em desktop e em 360 px, incluindo menus, formulário, acordeão, carrosséis, WhatsApp e ausência de rolagem horizontal.
- Conferir páginas internas, links, metadados, estados de erro e carregamento das imagens.
- Validar os sinais relevantes do projeto e corrigir eventuais falhas antes da entrega.

## Premissas
- A primeira imagem enviada será usada como logo; as outras quatro serão usadas como fotografia institucional.
- O WhatsApp oficial será `(11) 99586-9988`, conforme o link e o contato fornecidos.
- Não haverá armazenamento permanente nem envio real de leads nesta primeira versão.
- React Router será atendido pelo roteador nativo já configurado no projeto, preservando a arquitetura existente.
