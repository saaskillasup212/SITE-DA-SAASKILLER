import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bolt,
  Check,
  ChevronRight,
  CircleDashed,
  Clock3,
  ExternalLink,
  Gauge,
  Infinity as InfinityIcon,
  Link2,
  LockKeyhole,
  PackageOpen,
  Puzzle,
  RefreshCcw,
  ShieldCheck,
  Zap,
  Unplug,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import ExtensionDemo from "@/components/extension/ExtensionDemo";
import ExtensionHeader from "@/components/extension/ExtensionHeader";
import LightningMark from "@/components/LightningMark";
import {
  EXTENSION_PERIODS,
  EXTENSION_SEGMENTS,
  ExtensionSegment,
  formatExtensionPrice,
  getExtensionCheckoutUrl,
} from "@/config/extension";
import { usePerformance } from "@/hooks/use-performance";
import { trackEvent } from "@/lib/analytics";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "@/styles/extension-credits.css";

const ExtensionEnergyScene = lazy(
  () => import("@/components/extension/ExtensionEnergyScene"),
);

const PAGE_URL = "https://saaskiller.com.br/extensao-creditos-lovable";
const PAGE_TITLE = "Extensão de Créditos Infinitos para Lovable | SaaSKiller";
const PAGE_DESCRIPTION =
  "Mantenha seu fluxo de criação de Apps, Websites e Micro-SaaS no Lovable em movimento com a extensão da SaaSKiller.";

const buildMoments = [
  {
    step: "01",
    icon: Workflow,
    title: "Você está construindo",
    description: "A ideia está clara e o projeto está tomando forma.",
    state: "active",
  },
  {
    step: "02",
    icon: Unplug,
    title: "O limite chega",
    description:
      "A execução é interrompida no momento em que você mais precisa continuar.",
    state: "broken",
  },
  {
    step: "03",
    icon: Bolt,
    title: "A extensão mantém o movimento",
    description:
      "Você preserva o ritmo e continua avançando até concluir a próxima etapa.",
    state: "restored",
  },
] as const;

const benefits = [
  "Mais continuidade durante a construção.",
  "Menos interrupções no processo.",
  "Mais velocidade para testar e corrigir.",
  "Fluxo para Apps, Websites e Micro-SaaS.",
  "Ativação associada ao período adquirido.",
  "Integração com o ecossistema SaaSKiller.",
];

const howItWorks = [
  {
    number: "01",
    icon: Clock3,
    title: "Escolha o período",
    description:
      "Selecione a modalidade adequada ao tempo que você pretende construir.",
  },
  {
    number: "02",
    icon: Link2,
    title: "Instale e ative",
    description:
      "Siga o processo de instalação e vincule a extensão à sua ativação.",
  },
  {
    number: "03",
    icon: RefreshCcw,
    title: "Volte a construir",
    description:
      "Abra seu projeto no Lovable e mantenha o fluxo de execução durante o período contratado.",
  },
];

const projectTypes = [
  "Landing pages",
  "Sites institucionais",
  "Apps",
  "Micro-SaaS",
  "Dashboards",
  "Portais",
  "Protótipos",
  "Sistemas internos",
];

const comparison = {
  common: [
    "Construção interrompida.",
    "Contexto perdido.",
    "Mais tempo para retomar.",
    "Projeto atrasado.",
  ],
  extension: [
    "Período concentrado de produção.",
    "Ritmo preservado.",
    "Mais tentativas e correções.",
    "Projeto avançando.",
  ],
};

const faqItems = [
  {
    id: "official",
    question: "A extensão é oficial do Lovable?",
    answer:
      "Não. A extensão é um produto independente da SaaSKiller e não possui vínculo, patrocínio ou endosso oficial do Lovable.",
  },
  {
    id: "delivery",
    question: "Como recebo a extensão?",
    answer:
      "Após a confirmação do pagamento, você recebe as instruções de instalação e ativação correspondentes ao período adquirido.",
  },
  {
    id: "duration",
    question: "Funciona durante quanto tempo?",
    answer:
      "A ativação acompanha o período selecionado no momento da compra.",
  },
  {
    id: "subscriber",
    question: "Preciso ser assinante da SaaSKiller?",
    answer:
      "Não, salvo quando uma oferta estiver identificada como exclusiva para assinantes. Assinantes podem receber condições específicas conforme a oferta vigente.",
  },
  {
    id: "projects",
    question: "Posso usar para Apps e Websites?",
    answer:
      "Sim. A extensão acompanha seu fluxo de construção no Lovable, independentemente do tipo de projeto.",
  },
  {
    id: "guarantee",
    question: "A extensão garante que meu projeto será concluído?",
    answer:
      "Não. Ela oferece continuidade de uso durante o período contratado. A conclusão depende do escopo, das decisões e da execução de cada projeto.",
  },
  {
    id: "support",
    question: "Como funciona o suporte?",
    answer:
      "O suporte cobre instalação, ativação e problemas relacionados ao funcionamento da extensão durante o período válido.",
  },
  {
    id: "remove",
    question: "Posso remover quando quiser?",
    answer:
      "Sim. A extensão pode ser removida pelas configurações do navegador.",
  },
] as const;

const supportsWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
};

const updateMeta = (selector: string, attribute: "content" | "href", value: string) => {
  const element = document.head.querySelector<HTMLElement>(selector);
  element?.setAttribute(attribute, value);
};

const useExtensionSeo = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    updateMeta('meta[name="description"]', "content", PAGE_DESCRIPTION);
    updateMeta('link[rel="canonical"]', "href", `${PAGE_URL}/`);
    updateMeta('meta[property="og:title"]', "content", PAGE_TITLE);
    updateMeta('meta[property="og:description"]', "content", PAGE_DESCRIPTION);
    updateMeta('meta[property="og:url"]', "content", `${PAGE_URL}/`);
    updateMeta('meta[name="twitter:title"]', "content", PAGE_TITLE);
    updateMeta('meta[name="twitter:description"]', "content", PAGE_DESCRIPTION);

    const faqSchema = document.createElement("script");
    faqSchema.id = "extension-faq-schema";
    faqSchema.type = "application/ld+json";
    faqSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });

    const productSchema = document.createElement("script");
    productSchema.id = "extension-product-schema";
    productSchema.type = "application/ld+json";
    productSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Extensão de Créditos Infinitos para Lovable",
      description: PAGE_DESCRIPTION,
      brand: {
        "@type": "Brand",
        name: "SaaSKiller",
      },
      url: `${PAGE_URL}/`,
      offers: EXTENSION_PERIODS.map((period) => ({
        "@type": "Offer",
        name: period.duration,
        priceCurrency: "BRL",
        price: period.prices.none,
        url: period.checkoutUrl,
        availability: "https://schema.org/InStock",
      })),
    });

    document.head.append(faqSchema, productSchema);
    trackEvent("extension_page_view", { page_path: "/extensao-creditos-lovable" });

    return () => {
      document.title = previousTitle;
      updateMeta(
        'meta[name="description"]',
        "content",
        "Planeje, construa, organize, prospecte e venda Apps, Websites e Micro-SaaS usando IA em uma única plataforma.",
      );
      updateMeta('link[rel="canonical"]', "href", "https://saaskiller.com.br/");
      updateMeta(
        'meta[property="og:title"]',
        "content",
        "SaaSKiller — Da ideia ao primeiro cliente",
      );
      updateMeta(
        'meta[property="og:description"]',
        "content",
        "A operação do founder solo para planejar, construir, organizar, prospectar e vender produtos digitais com IA.",
      );
      updateMeta('meta[property="og:url"]', "content", "https://saaskiller.com.br/");
      updateMeta(
        'meta[name="twitter:title"]',
        "content",
        "SaaSKiller — Da ideia ao primeiro cliente",
      );
      updateMeta(
        'meta[name="twitter:description"]',
        "content",
        "A operação do founder solo para planejar, construir, organizar, prospectar e vender produtos digitais com IA.",
      );
      faqSchema.remove();
      productSchema.remove();
    };
  }, []);
};

const EnergyBoltFallback = () => (
  <div className="extension-bolt-fallback" aria-hidden>
    <span className="extension-bolt-fallback__halo" />
    <LightningMark />
    <span className="extension-bolt-fallback__crack extension-bolt-fallback__crack--one" />
    <span className="extension-bolt-fallback__crack extension-bolt-fallback__crack--two" />
  </div>
);

const ExtensionCredits = () => {
  const [segment, setSegment] = useState<ExtensionSegment>("none");
  const [renderWebGL, setRenderWebGL] = useState(false);
  const { isMobile, shouldReduceMotion } = usePerformance();

  useExtensionSeo();

  useEffect(() => {
    setRenderWebGL(!isMobile && !shouldReduceMotion && supportsWebGL());
  }, [isMobile, shouldReduceMotion]);

  const scrollToPeriods = () => {
    document.getElementById("periodos")?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const scrollToHow = () => {
    document.getElementById("como-funciona")?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="extension-page">
      <ExtensionHeader onCta={scrollToPeriods} />

      <main>
        <section id="extension-top" className="extension-hero">
          <div className="extension-hero__grid" aria-hidden />
          <div className="extension-hero__glow extension-hero__glow--violet" aria-hidden />
          <div className="extension-hero__glow extension-hero__glow--gold" aria-hidden />

          <div className="extension-shell extension-hero__inner">
            <motion.div
              className="extension-hero__copy"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
            >
              <span className="extension-eyebrow">
                <Puzzle aria-hidden />
                EXTENSÃO SAASKILLER PARA LOVABLE
              </span>
              <h1>
                Seus créditos acabam.
                <span>
                  Sua construção <em>não precisa parar.</em>
                </span>
              </h1>
              <p>
                Mantenha seu fluxo de criação no Lovable em movimento e continue
                construindo Apps, Websites e Micro-SaaS sem interromper o projeto a
                cada nova etapa.
              </p>
              <div className="extension-hero__actions">
                <button type="button" className="extension-button" onClick={scrollToPeriods}>
                  Ativar Créditos Infinitos
                  <ArrowRight aria-hidden />
                </button>
                <button
                  type="button"
                  className="extension-button extension-button--secondary"
                  onClick={scrollToHow}
                >
                  Ver como funciona
                  <ChevronRight aria-hidden />
                </button>
              </div>
              <small className="extension-hero__microcopy">
                <ShieldCheck aria-hidden />
                Instalação rápida · Ativação vinculada à sua compra
              </small>
            </motion.div>

            <motion.div
              className="extension-hero__visual"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.44, delay: 0.58, ease: "easeOut" }}
            >
              <div className="extension-build-frame">
                <div className="extension-build-frame__top">
                  <span>CONSTRUÇÃO</span>
                  <span className="extension-build-frame__live">
                    <i />
                    FLUXO ATIVO
                  </span>
                </div>
                <div className="extension-build-frame__body" aria-hidden>
                  <span />
                  <span />
                  <span />
                </div>
                <div className="extension-build-frame__energy">
                  <span>ENERGIA</span>
                  <div>
                    <i />
                  </div>
                  <strong>∞</strong>
                </div>
              </div>

              <div className="extension-hero__current extension-hero__current--in" aria-hidden />
              <div className="extension-hero__current extension-hero__current--out" aria-hidden />

              {renderWebGL ? (
                <Suspense fallback={<EnergyBoltFallback />}>
                  <ExtensionEnergyScene />
                </Suspense>
              ) : (
                <EnergyBoltFallback />
              )}
            </motion.div>
          </div>
        </section>

        <section className="extension-section extension-problem">
          <div className="extension-shell">
            <div className="extension-section-heading">
              <span className="extension-eyebrow">A QUEBRA DE FLUXO</span>
              <h2>Toda pausa custa mais do que créditos.</h2>
              <p>
                Quando a construção para no meio, você perde contexto, velocidade e
                vontade de terminar. O projeto que estava avançando volta para a fila
                das ideias inacabadas.
              </p>
            </div>

            <div className="extension-flow">
              <div className="extension-flow__line" aria-hidden>
                <span />
                <i />
              </div>
              {buildMoments.map((moment, index) => {
                const Icon = moment.icon;
                return (
                  <motion.article
                    key={moment.step}
                    className={`extension-flow-card extension-flow-card--${moment.state}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span className="extension-flow-card__step">{moment.step}</span>
                    <div className="extension-flow-card__icon">
                      <Icon aria-hidden />
                    </div>
                    <h3>{moment.title}</h3>
                    <p>{moment.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="extension-section extension-proposal">
          <div className="extension-shell extension-proposal__grid">
            <div className="extension-proposal__copy">
              <span className="extension-eyebrow">ENERGIA CONTÍNUA</span>
              <h2>
                Opere sem parar.
                <span>Construa sem perder o fluxo.</span>
              </h2>
              <p>
                A extensão da SaaSKiller foi criada para quem utiliza o Lovable como
                ferramenta de produção e precisa manter a execução em movimento.
              </p>
            </div>
            <div className="extension-benefit-grid">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.32, delay: index * 0.05 }}
                >
                  <Check aria-hidden />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="extension-section extension-how">
          <div className="extension-shell">
            <div className="extension-section-heading extension-section-heading--center">
              <span className="extension-eyebrow">COMO FUNCIONA</span>
              <h2>Energia em três movimentos.</h2>
            </div>

            <div className="extension-how__grid">
              <div className="extension-how__current" aria-hidden />
              {howItWorks.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.article
                    key={step.number}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.4, delay: index * 0.12 }}
                  >
                    <div className="extension-how__number">{step.number}</div>
                    <Icon aria-hidden />
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="demonstracao" className="extension-section extension-demo">
          <div className="extension-shell extension-demo__grid">
            <div className="extension-demo__copy">
              <span className="extension-eyebrow">DEMONSTRAÇÃO</span>
              <h2>Veja a extensão em funcionamento.</h2>
              <p>
                Da instalação à ativação, acompanhe o fluxo completo antes de começar.
              </p>
              <div className="extension-demo__facts">
                <span>
                  <ShieldCheck aria-hidden />
                  Ativação vinculada
                </span>
                <span>
                  <PackageOpen aria-hidden />
                  Instalação guiada
                </span>
              </div>
            </div>
            <ExtensionDemo />
          </div>
        </section>

        <section className="extension-section extension-build-types">
          <div className="extension-shell">
            <div className="extension-section-heading extension-section-heading--center">
              <span className="extension-eyebrow">DO BLOCO AO PRODUTO</span>
              <h2>Do primeiro bloco ao produto publicado.</h2>
              <p>
                Use o período de ativação para concentrar sua execução e avançar o
                máximo possível no projeto.
              </p>
            </div>
          </div>
          <div className="extension-build-types__track" aria-label="Tipos de projeto">
            {[...projectTypes, ...projectTypes].map((type, index) => (
              <span key={`${type}-${index}`}>
                <Zap aria-hidden />
                {type}
              </span>
            ))}
          </div>
        </section>

        <section id="periodos" className="extension-section extension-offer">
          <div className="extension-shell">
            <div className="extension-section-heading extension-section-heading--center">
              <span className="extension-eyebrow">ESCOLHA SEU PERÍODO</span>
              <h2>Quanto tempo sua construção precisa?</h2>
              <p>
                Os valores abaixo vêm da configuração comercial atual da extensão.
              </p>
            </div>

            <div className="extension-segment" aria-label="Condição de compra">
              {EXTENSION_SEGMENTS.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={segment === item.id ? "is-active" : ""}
                  aria-pressed={segment === item.id}
                  onClick={() => {
                    setSegment(item.id);
                    trackEvent("extension_period_select", {
                      selection_type: "subscriber_condition",
                      segment: item.id,
                    });
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {segment !== "none" && (
              <div className="extension-subscriber-notice">
                <LockKeyhole aria-hidden />
                <p>
                  <strong>Condição especial para assinantes.</strong>
                  A assinatura é confirmada no app da SaaSKiller antes da liberação
                  do valor correspondente.
                </p>
              </div>
            )}

            <div className="extension-period-grid">
              {EXTENSION_PERIODS.map((period, index) => {
                const price = period.prices[segment];
                const basePrice = period.prices.none;
                const checkoutUrl = getExtensionCheckoutUrl(period, segment);
                return (
                  <motion.article
                    key={period.id}
                    className={`extension-period-card ${period.hero ? "is-featured" : ""}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.38, delay: (index % 3) * 0.07 }}
                  >
                    {period.hero && (
                      <span className="extension-period-card__badge">
                        <InfinityIcon aria-hidden />
                        SEM EXPIRAÇÃO
                      </span>
                    )}
                    <div className="extension-period-card__top">
                      <span>{period.duration}</span>
                      {period.hero ? <InfinityIcon aria-hidden /> : <Clock3 aria-hidden />}
                    </div>
                    <h3>{period.name}</h3>
                    <p>{period.positioning}</p>
                    <div className="extension-period-card__price">
                      {segment !== "none" && price < basePrice && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                          <del>{formatExtensionPrice(basePrice)}</del>
                          <span style={{ 
                            fontSize: "11px", 
                            fontWeight: "bold", 
                            padding: "2px 6px", 
                            borderRadius: "4px", 
                            backgroundColor: "rgba(39, 201, 63, 0.15)", 
                            color: "#27c93f",
                            border: "1px solid rgba(39, 201, 63, 0.3)"
                          }}>
                            -{Math.round((1 - price / basePrice) * 100)}%
                          </span>
                        </div>
                      )}
                      <strong>{formatExtensionPrice(price)}</strong>
                    </div>
                    <ul>
                      {period.benefits.map((benefit) => (
                        <li key={benefit}>
                          <Check aria-hidden />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="extension-button"
                      onClick={() => {
                        trackEvent("extension_period_select", {
                          period: period.id,
                          segment,
                        });
                        trackEvent("extension_checkout_click", {
                          period: period.id,
                          segment,
                          destination:
                            segment === "none" ? "perfectpay" : "saaskiller_app",
                        });
                      }}
                    >
                      Ativar este período
                      <ExternalLink aria-hidden />
                    </a>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="extension-section extension-economy">
          <div className="extension-shell">
            <div className="extension-section-heading extension-section-heading--center">
              <span className="extension-eyebrow">CONTINUIDADE</span>
              <h2>Menos interrupção. Mais execução.</h2>
            </div>
            <div className="extension-comparison">
              <article className="extension-comparison__common">
                <div>
                  <CircleDashed aria-hidden />
                  <h3>Fluxo comum</h3>
                </div>
                <ul>
                  {comparison.common.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <div className="extension-comparison__bolt" aria-hidden>
                <Bolt />
              </div>
              <article className="extension-comparison__active">
                <div>
                  <Gauge aria-hidden />
                  <h3>Com a extensão</h3>
                </div>
                <ul>
                  {comparison.extension.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="extension-section extension-transparency">
          <div className="extension-shell extension-transparency__grid">
            <div className="extension-transparency__copy">
              <span className="extension-eyebrow">SEGURANÇA E TRANSPARÊNCIA</span>
              <h2>Você sabe exatamente o que está instalando.</h2>
              <p>
                O navegador mostra as permissões da versão recebida antes da
                instalação. Revise o aviso e o arquivo <code>manifest.json</code> do
                pacote entregue antes de confirmar.
              </p>
              <div className="extension-transparency__links">
                <Link to="/politica-de-privacidade">
                  Política de Privacidade
                  <ArrowRight aria-hidden />
                </Link>
                <a
                  href="mailto:suporte@saaskiller.com.br?subject=Ajuda%20com%20a%20Extens%C3%A3o%20de%20Cr%C3%A9ditos"
                  onClick={() =>
                    trackEvent("extension_installation_help_click", {
                      channel: "email",
                    })
                  }
                >
                  Suporte de instalação
                  <ArrowRight aria-hidden />
                </a>
              </div>
            </div>

            <div className="extension-transparency__cards">
              <article>
                <ShieldCheck aria-hidden />
                <div>
                  <h3>Permissões e páginas acessadas</h3>
                  <p>
                    Consulte a lista exata exibida pelo navegador e em
                    <strong> Detalhes da extensão → Acesso ao site</strong>. A página
                    não inventa permissões sem o manifest da versão distribuída.
                  </p>
                </div>
              </article>
              <article>
                <LockKeyhole aria-hidden />
                <div>
                  <h3>Dados processados</h3>
                  <p>
                    A descrição que acompanha a versão instalada e a Política de
                    Privacidade informam o tratamento aplicável. Não forneça senha,
                    cookie de sessão ou token por formulário público ou WhatsApp.
                  </p>
                </div>
              </article>
              <article>
                <PackageOpen aria-hidden />
                <div>
                  <h3>Ativação e remoção</h3>
                  <p>
                    A ativação é vinculada à compra e ao período selecionado. Para
                    remover, use a área de extensões nas configurações do navegador.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="faq-extensao" className="extension-section extension-faq">
          <div className="extension-shell extension-faq__grid">
            <div className="extension-faq__heading">
              <span className="extension-eyebrow">DÚVIDAS FREQUENTES</span>
              <h2>Antes de ativar, veja o que importa.</h2>
              <p>
                Informações diretas sobre entrega, duração, suporte e independência
                da extensão.
              </p>
            </div>
            <Accordion
              type="single"
              collapsible
              className="extension-faq__accordion"
              onValueChange={(value) => {
                if (value) trackEvent("extension_faq_open", { question_id: value });
              }}
            >
              {faqItems.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="extension-final">
          <div className="extension-final__current" aria-hidden />
          <div className="extension-shell extension-final__inner">
            <span className="extension-eyebrow">VOLTE PARA A CONSTRUÇÃO</span>
            <h2>Seu projeto não precisa parar no meio.</h2>
            <p>Escolha seu período, ative a extensão e volte para a construção.</p>
            <button type="button" className="extension-button" onClick={scrollToPeriods}>
              Ativar Créditos Infinitos
              <ArrowRight aria-hidden />
            </button>
            <small>Acesso válido conforme o período escolhido.</small>
          </div>
        </section>
      </main>

      <footer className="extension-footer">
        <div className="extension-shell">
          <div className="extension-footer__brand">
            <Link to="/">
              <LightningMark title="SaaSKiller" />
              <span>SaaSKiller</span>
            </Link>
            <p>Energia contínua para quem constrói.</p>
          </div>
          <p className="extension-footer__disclaimer">
            Lovable é uma marca de seus respectivos proprietários. A Extensão de
            Créditos Infinitos é um produto independente da SaaSKiller e não possui
            afiliação, patrocínio ou endosso oficial do Lovable.
          </p>
          <div className="extension-footer__base">
            <span>© {new Date().getFullYear()} SaaSKiller.</span>
            <div>
              <Link to="/politica-de-privacidade">Privacidade</Link>
              <Link to="/termos-de-uso">Termos</Link>
              <a href="mailto:suporte@saaskiller.com.br">Suporte</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExtensionCredits;
