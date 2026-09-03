type VideoProvider = "youtube" | "vimeo" | "mp4";

export interface TeamMember {
  id: "ruan-pablo" | "mathias";
  name: string;
  initials: string;
  badge: string;
  role: string;
  photoUrl: string;
  videoUrl: string;
  videoProvider: VideoProvider;
  videoTitle: string;
  videoDescription: string;
  published: boolean;
  quote: string;
  story: string[];
  transcriptUrl?: string;
  captionsUrl?: string;
  duration?: string;
  posterUrl?: string;
  publishedAt?: string;
}

export const team: TeamMember[] = [
  {
    id: "ruan-pablo",
    name: "Ruan Pablo",
    initials: "RP",
    badge: "ESTRATÉGIA & AQUISIÇÃO",
    role: "Direct Response · Copy · Funis · Estratégia · SaaS",
    photoUrl: "/team/ruan-pablo.webp",
    videoUrl: "",
    videoProvider: "youtube",
    videoTitle: "Por que um bom produto ainda pode não vender",
    videoDescription:
      "Ruan explica como oferta, mensagem e funil transformam uma ferramenta em um negócio.",
    published: true,
    quote:
      "Construir é metade do jogo. A outra metade é fazer o mercado entender por que aquilo importa.",
    story: [
      "Ruan atua no lado da operação que transforma produto em oferta. Sua visão conecta estratégia, direct response, copy e funil para responder às perguntas que decidem uma venda: o que oferecer, para quem, com qual mensagem e por qual caminho.",
      "Na SaaSKiller, ele aproxima a construção do produto da realidade do mercado — para que uma boa ideia não termine apenas publicada, mas seja compreendida, desejada e vendida.",
    ],
  },
  {
    id: "mathias",
    name: "Mathias",
    initials: "M",
    badge: "PRODUTO & EXECUÇÃO",
    role: "Gestão de IA · Orgânico · SaaS · Apps · Websites · Copy",
    photoUrl: "/team/mathias.webp",
    videoUrl: "",
    videoProvider: "youtube",
    videoTitle: "Como uma pessoa pode operar como um time usando IA",
    videoDescription:
      "Mathias mostra como planejamento, ferramentas e execução se conectam para tirar produtos do papel.",
    published: true,
    quote: "A IA acelera. A direção é o que transforma velocidade em produto.",
    story: [
      "Mathias atua no lado da execução: transformar ideias em SaaS, Apps e Websites usando IA, estrutura e velocidade. Seu trabalho conecta produto, construção, conteúdo orgânico e copy dentro de uma operação que uma única pessoa consegue conduzir.",
      "Na SaaSKiller, ele representa o movimento de sair da intenção, organizar o projeto e colocar algo funcional no ar — sem depender da montagem de um time inteiro.",
    ],
  },
];
