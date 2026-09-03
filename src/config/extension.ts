import { APP_URL } from "./constants";

export type ExtensionSegment = "none" | "subscriber";

export interface ExtensionPeriod {
  id: string;
  label: string;
  name: string;
  duration: string;
  prices: Record<ExtensionSegment, number>;
  checkoutUrl: string;
  positioning: string;
  benefits: readonly string[];
  hero?: boolean;
}

export const EXTENSION_SEGMENTS: ReadonlyArray<{
  id: ExtensionSegment;
  label: string;
  shortLabel: string;
  legacyLabel: string;
}> = [
  {
    id: "none",
    label: "Sem plano SaaSKiller",
    shortLabel: "Sem plano",
    legacyLabel: "Sem plano",
  },
  {
    id: "subscriber",
    label: "Assinante (Mensal ou Anual)",
    shortLabel: "Assinante",
    legacyLabel: "Com Assinatura",
  },
];

/**
 * Fonte única da tabela comercial da Extensão de Créditos Infinitos.
 * Não altere preços ou URLs sem confirmar a oferta vigente e os checkouts.
 * Segmentos de assinantes são direcionados ao app, que valida a assinatura
 * no backend antes de liberar qualquer condição especial.
 */
export const EXTENSION_PERIODS: readonly ExtensionPeriod[] = [
  {
    id: "seven-days",
    label: "7 Dias",
    name: "Semana de execução",
    duration: "7 Dias",
    prices: { none: 39, subscriber: 25 },
    checkoutUrl: "https://checkout.applyfy.com.br/checkout/cms821sat0jvd01pxsb5pvol4?offer=7QA1553",
    positioning: "Para organizar uma semana concentrada de produção.",
    benefits: ["Ativação por 7 dias", "Instruções de instalação", "Suporte durante o período"],
  },
  {
    id: "fifteen-days",
    label: "15 Dias",
    name: "Sprint de construção",
    duration: "15 Dias",
    prices: { none: 69, subscriber: 39.9 },
    checkoutUrl: "https://checkout.applyfy.com.br/checkout/cms821sat0jvd01pxsb5pvol4?offer=OLI6TNR",
    positioning: "Para avançar uma etapa completa do projeto.",
    benefits: ["Ativação por 15 dias", "Instruções de instalação", "Suporte durante o período"],
  },
  {
    id: "lifetime",
    label: "Vitalícia",
    name: "Fluxo vitalício",
    duration: "Vitalícia",
    prices: { none: 197, subscriber: 107 },
    checkoutUrl: "https://checkout.applyfy.com.br/checkout/cms821sat0jvd01pxsb5pvol4?offer=QJ6VMRD",
    positioning: "Para manter a extensão disponível sem prazo de expiração.",
    benefits: ["Ativação vitalícia", "Instruções de instalação", "Suporte de ativação"],
    hero: true,
  },
];

export const extensionDemo: {
  videoUrl: string;
  provider: "youtube";
  posterUrl: string;
  title: string;
  duration: string;
} = {
  videoUrl: "",
  provider: "youtube",
  posterUrl: "/extension/demo-poster.webp",
  title: "Como ativar a extensão de Créditos Infinitos",
  duration: "",
};

export const formatExtensionPrice = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });

export const getExtensionCheckoutUrl = (
  period: ExtensionPeriod,
  segment: ExtensionSegment,
) => (segment === "none" ? period.checkoutUrl : "/#pricing");
