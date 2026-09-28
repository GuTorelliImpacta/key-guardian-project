import {
  BellRing,
  Building2,
  Camera,
  Factory,
  HardDrive,
  Home,
  RadioTower,
  ShieldCheck,
  Siren,
  Wrench,
} from "lucide-react";

export type Perfil = {
  id: "para-casa" | "para-empresa" | "para-condominios" | "para-industrias";
  label: string;
  icon: typeof Home;
  scenario: string;
  combos: string[];
};

// Cada perfil descreve cenários típicos e combinações mais comuns de serviços,
// com base apenas nos serviços reais listados em `services` abaixo.
export const perfis: Perfil[] = [
  {
    id: "para-casa",
    label: "Casa",
    icon: Home,
    scenario:
      "Você quer proteger a família e o patrimônio mesmo quando está fora, com um sistema fácil de usar no dia a dia.",
    combos: [
      "Alarme monitorado",
      "Sensores de movimento e magnéticos",
      "Botão de pânico",
      "Câmeras",
    ],
  },
  {
    id: "para-empresa",
    label: "Empresa",
    icon: Building2,
    scenario:
      "Comércios, escritórios, joalherias e clínicas que precisam de verificação e resposta rápida a qualquer ocorrência.",
    combos: ["Alarme monitorado", "CFTV", "Sensores de impacto e sísmicos"],
  },
  {
    id: "para-condominios",
    label: "Condomínio",
    icon: ShieldCheck,
    scenario:
      "Áreas comuns, portaria e perímetro sob acompanhamento constante, com apoio quando necessário.",
    combos: ["Monitoramento de imagens", "CFTV", "Storage de imagens", "Botão de pânico"],
  },
  {
    id: "para-industrias",
    label: "Indústria e Logística",
    icon: Factory,
    scenario:
      "Galpões, fábricas e transportadoras com grandes perímetros, cargas e acessos para proteger.",
    combos: [
      "Proteção perimetral",
      "Cerca elétrica",
      "CFTV com vídeo analítico e leitura de placas",
      "Storage de imagens",
    ],
  },
];

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: typeof Siren;
  includes: string[];
};

export const services: Service[] = [
  {
    slug: "monitoramento-de-alarmes",
    title: "Monitoramento de Alarmes",
    description:
      "Nossa central recebe sinais de todo o território nacional por linha telefônica, módulo GPRS e IP, e aciona uma viatura de apoio quando necessário.",
    icon: Siren,
    includes: [
      "Recebimento de sinais por linha telefônica, GPRS e IP",
      "Central compatível com diferentes tipos de painel de alarme",
      "Cadastro do cliente sempre atualizado",
      "Relatórios mensais de eventos ou sob demanda",
      "Viaturas de apoio exclusivas acionadas por rádio",
    ],
  },
  {
    slug: "monitoramento-de-imagens",
    title: "Monitoramento de Imagens",
    description:
      "Operadores acompanham o imóvel em tempo real ou por eventos e gravações anteriores para confirmar uma invasão.",
    icon: RadioTower,
    includes: [
      "Visualização do imóvel em tempo real",
      "Consulta a eventos e gravações anteriores",
      "Confirmação de invasão por imagem",
      "Rondas virtuais que identificam anomalias mesmo sem disparo de alarme",
    ],
  },
  {
    slug: "cftv",
    title: "CFTV",
    description:
      "Câmeras Full HD e 4K, DVRs, vídeo analítico e leitura de placas para um projeto completo.",
    icon: Camera,
    includes: [
      "Câmeras Full HD e 4K",
      "DVRs para gravação contínua",
      "Câmeras com vídeo analítico",
      "Leitura de placas",
      "Monitores e nobreaks",
    ],
  },
  {
    slug: "alarmes-e-sensores",
    title: "Alarmes e Sensores",
    description:
      "Centrais de alarme monitoradas e sensores para cada tipo de ponto de acesso e área do imóvel.",
    icon: BellRing,
    includes: [
      "Centrais de alarme monitoradas",
      "Sensores de movimento e magnéticos",
      "Sensores de proteção perimetral",
      "Sensores de impacto e sísmicos",
      "Botões de pânico",
      "Cerca elétrica",
    ],
  },
  {
    slug: "storage-de-imagens",
    title: "Storage de Imagens",
    description:
      "Armazenamos as imagens de condomínios, fábricas e qualquer imóvel em nossos servidores pelo período definido pelo cliente.",
    icon: HardDrive,
    includes: [
      "Armazenamento das imagens em servidores da Key Master",
      "Período de retenção definido pelo cliente",
      "Proteção contra furto do DVR",
      "Proteção contra falha dos discos",
    ],
  },
  {
    slug: "manutencao-e-projetos",
    title: "Manutenção e Projetos",
    description:
      "Projeto técnico personalizado, instalação, manutenção e integração entre alarme e câmera.",
    icon: Wrench,
    includes: [
      "Projeto técnico personalizado",
      "Instalação conforme projeto",
      "Manutenção preventiva e corretiva",
      "Integração entre alarme e câmera",
    ],
  },
];

export const faq: [string, string][] = [
  [
    "Como funciona o monitoramento 24 horas?",
    "Seu sistema envia os eventos para nossa central própria. Operadores treinados em três turnos verificam cada ocorrência e seguem o protocolo combinado com você.",
  ],
  [
    "O que acontece quando o alarme dispara?",
    "A central recebe o sinal, confirma a ocorrência por imagem quando disponível e pode acionar uma viatura de apoio exclusiva: o operador passa o endereço por rádio, a viatura verifica o local e informa o resultado à central.",
  ],
  [
    "A Key Master tem viatura própria?",
    "Temos equipes móveis de agentes com viaturas de apoio exclusivas para verificar ocorrências e apoiar o cliente.",
  ],
  [
    "Posso ver minhas câmeras pelo celular?",
    "Depende do projeto. Na avaliação técnica confirmamos com você as formas de acesso remoto disponíveis para o seu caso.",
  ],
  [
    "O que é Storage de Imagens?",
    "É o armazenamento das gravações em nossos servidores pelo período definido pelo cliente. Preserva as imagens mesmo em caso de furto do DVR ou falha dos discos.",
  ],
  [
    "Vocês atendem qualquer marca de alarme?",
    "Nossa central opera diferentes tipos de central de alarme e orienta o cliente. A compatibilidade com o equipamento instalado é confirmada na avaliação técnica.",
  ],
  [
    "O sistema funciona sem linha telefônica ou falha de energia?",
    "A central recebe sinais por linha telefônica, módulo GPRS e IP, o que dá redundância na comunicação. Recursos adicionais para esses cenários são definidos projeto a projeto na avaliação técnica.",
  ],
  [
    "Quais regiões vocês atendem?",
    "Recebemos sinais de todo o território nacional. As condições de instalação e apoio presencial são confirmadas na avaliação técnica.",
  ],
  [
    "Como é feito o orçamento?",
    "Um técnico entende a rotina e os pontos de acesso do seu imóvel e recomenda apenas o necessário. Fale com a gente para receber sua proposta.",
  ],
  [
    "Vocês fazem manutenção de sistemas existentes?",
    "Sim. Fazemos manutenção preventiva e corretiva após avaliação da compatibilidade e do estado dos equipamentos instalados.",
  ],
];
