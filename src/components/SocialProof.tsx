import { motion } from "framer-motion";
import { usePerformance } from "@/hooks/use-performance";

/**
 * Os relatos abaixo são exemplos ilustrativos de perfis e usos possíveis.
 * Eles não representam clientes reais nem garantem resultados.
 */
interface Quote {
  text: string;
  name: string;
  role: string;
  initials: string;
  accent: "gold" | "royal";
}

const row1: Quote[] = [
  {
    text: "Sempre quis lançar meu SaaS, mas travava no início. Com o processo guiado, saí da ideia para um plano de produto pronto para construir.",
    name: "Rafael Nogueira",
    role: "SaaS de agendamento para petshops",
    initials: "RN",
    accent: "gold",
  },
  {
    text: "O que mais me ajudou foi ter direção para transformar a ideia em um prompt bem estruturado. Economizei muito tempo de tentativa e erro.",
    name: "Camila Duarte",
    role: "Micro-SaaS de gestão de assinaturas",
    initials: "CD",
    accent: "royal",
  },
  {
    text: "Comecei pensando só no produto e percebi que também precisava vender. A prospecção me deu um caminho claro para buscar os primeiros clientes.",
    name: "Thiago Almeida",
    role: "Ferramenta de orçamento para autônomos",
    initials: "TA",
    accent: "gold",
  },
];

const row2: Quote[] = [
  {
    text: "Sou dev, não designer. Ter uma base visual pronta resolveu o que sempre atrasava meus projetos solo e deixou a entrega mais profissional.",
    name: "Bruna Ferraz",
    role: "Landing page e app de treinos",
    initials: "BF",
    accent: "royal",
  },
  {
    text: "Eu precisava de um processo que conectasse produto e execução. Com o projeto organizado, ficou muito mais simples construir e apresentar a oferta.",
    name: "Lucas Petronilho",
    role: "SaaS de controle financeiro para MEs",
    initials: "LP",
    accent: "gold",
  },
  {
    text: "O passo a passo me ajudou a parar de recomeçar. Consegui manter o foco, avançar nas etapas e colocar uma primeira versão no ar.",
    name: "Marina Kishimoto",
    role: "Plataforma de reservas para estúdios",
    initials: "MK",
    accent: "royal",
  },
];

const QuoteCard = ({
  quote,
  duplicate = false,
}: {
  quote: Quote;
  duplicate?: boolean;
}) => {
  const accentRgb =
    quote.accent === "gold" ? "var(--gold-rgb)" : "var(--royal-rgb)";
  const accentColor =
    quote.accent === "gold" ? "var(--gold)" : "var(--royal)";

  return (
    <figure
      aria-hidden={duplicate || undefined}
      className="relative mx-3 w-[80vw] max-w-[320px] shrink-0 rounded-2xl p-6 sm:w-[380px] sm:max-w-none"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid rgba(var(--royal-rgb), 0.12)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-4 top-2 select-none font-display text-[64px] leading-none"
        style={{ color: "rgba(var(--gold-rgb), 0.15)" }}
      >
        “
      </span>

      <blockquote className="relative mb-4 pt-8 text-sm leading-relaxed text-[var(--text-primary)]">
        {quote.text}
      </blockquote>

      <figcaption className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          style={{
            background: `rgba(${accentRgb}, 0.15)`,
            color: accentColor,
            border: `1px solid rgba(${accentRgb}, 0.3)`,
          }}
        >
          {quote.initials}
        </span>
        <span>
          <span className="block text-sm font-semibold text-[var(--text-primary)]">
            {quote.name}
          </span>
          <span className="block text-xs text-[var(--text-muted)]">
            {quote.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
};

const MarqueeRow = ({
  quotes,
  reverse = false,
}: {
  quotes: Quote[];
  reverse?: boolean;
}) => {
  const loopGroup = Array.from({ length: 4 }, () => quotes).flat();

  return (
    <div className="social-marquee-mask overflow-hidden">
      <div
        className={
          reverse
            ? "social-marquee-track social-marquee-reverse"
            : "social-marquee-track"
        }
      >
        {[false, true].map((duplicateGroup, groupIndex) => (
          <div
            key={groupIndex}
            className="social-marquee-group"
            aria-hidden={duplicateGroup || undefined}
          >
            {loopGroup.map((quote, index) => (
              <QuoteCard
                key={`${groupIndex}-${quote.initials}-${index}`}
                quote={quote}
                duplicate={duplicateGroup || index >= quotes.length}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const SocialProof = () => {
  const { shouldReduceMotion } = usePerformance();

  return (
    <section
      id="prova-social"
      className="relative z-10 overflow-hidden py-20 sm:py-28"
    >
      <div className="site-container relative z-10 mb-12">
        <motion.div
          className="section-heading section-heading--center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">EXEMPLOS DE USO</span>
          <h2>
            Quem usa, constrói.
            <br />
            <span className="text-gold">Quem constrói, cria oportunidades.</span>
          </h2>
          <p>
            Alguns exemplos de perfis que usam a SaaSKiller para ganhar clareza,
            velocidade e estrutura — do primeiro produto à busca pelos primeiros
            clientes.
          </p>
        </motion.div>
      </div>

      <div className="space-y-6">
        <MarqueeRow quotes={row1} />
        <MarqueeRow quotes={row2} reverse />
      </div>
    </section>
  );
};

export default SocialProof;
