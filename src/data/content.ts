import { BellRing, Building2, Camera, Factory, HardDrive, Home, RadioTower, ShieldCheck, Siren, Wrench } from "lucide-react";

export const solutions = [
  { slug: "residencial", title: "Para sua Casa", short: "Proteção para sua família, mesmo quando você está longe.", icon: Home, image: "camera" },
  { slug: "empresarial", title: "Para sua Empresa", short: "Comércios, escritórios, joalherias e clínicas protegidos 24h.", icon: Building2, image: "mobile" },
  { slug: "condominios", title: "Para Condomínios", short: "Monitoramento de áreas comuns, perímetro e portaria.", icon: ShieldCheck, image: "central" },
  { slug: "industrias-e-logistica", title: "Para Indústrias e Logística", short: "Galpões, fábricas e transportadoras com projeto sob medida.", icon: Factory, image: "team" },
];

export const services = [
  { slug: "monitoramento-de-alarmes", title: "Monitoramento de Alarmes 24h", description: "Nossa central recebe o disparo em tempo real e aciona uma viatura de apoio até o local.", icon: Siren },
  { slug: "monitoramento-de-imagens", title: "Monitoramento de Imagens", description: "Operadores verificam câmeras ao vivo e fazem rondas virtuais para identificar anomalias.", icon: RadioTower },
  { slug: "cftv", title: "CFTV e Câmeras Inteligentes", description: "Câmeras Full HD e 4K, vídeo analítico e leitura de placas para um projeto completo.", icon: Camera },
  { slug: "alarmes-e-sensores", title: "Alarmes e Sensores", description: "Sensores de movimento, magnéticos, perimetrais, de impacto, pânico e cerca elétrica.", icon: BellRing },
  { slug: "storage-de-imagens", title: "Storage de Imagens", description: "Backup remoto para manter suas imagens seguras mesmo se o DVR falhar ou for furtado.", icon: HardDrive },
  { slug: "manutencao-e-projetos", title: "Manutenção e Projetos", description: "Projetos personalizados, instalação, manutenção e integração entre alarme e câmera.", icon: Wrench },
];

export const faq = [
  ["Como funciona o monitoramento 24 horas?", "Seu sistema envia os eventos para nossa central própria. Operadores treinados verificam cada ocorrência e seguem o protocolo combinado com você."],
  ["O que acontece quando o alarme dispara?", "A central recebe o sinal, confirma a ocorrência por imagem quando disponível, entra em contato e pode enviar uma viatura de apoio ao local."],
  ["A Key Master tem viatura própria?", "Sim. Viaturas de apoio exclusivas recebem o endereço via rádio, verificam o local e informam o resultado à central."],
  ["Posso ver minhas câmeras pelo celular?", "Sim. O projeto pode incluir acesso remoto para acompanhar câmeras e gravações pelo celular."],
  ["O que é Storage de Imagens?", "É o armazenamento remoto das gravações. Ele preserva as imagens mesmo em caso de furto do DVR ou falha do disco."],
  ["Vocês atendem qualquer marca de alarme?", "Nossa central opera diferentes marcas de centrais de alarme. A compatibilidade é confirmada na avaliação técnica."],
  ["O sistema funciona sem linha ou energia?", "Projetamos redundância com comunicação por GPRS, IP ou linha e recursos de alimentação reserva conforme a necessidade."],
  ["Quais regiões vocês atendem?", "Recebemos sinais de todo o Brasil. A disponibilidade de instalação e apoio presencial depende da região. [CONFIRMAR]"],
  ["Como é feito o orçamento?", "A avaliação e o orçamento são gratuitos. Um técnico entende o imóvel e recomenda apenas o necessário."],
  ["Vocês fazem manutenção de sistemas existentes?", "Sim. Fazemos manutenção preventiva e corretiva, após avaliação de compatibilidade e estado dos equipamentos."],
] as const;
