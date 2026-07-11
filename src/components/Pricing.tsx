import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { usePerformance } from "@/hooks/use-performance";
import { cn } from "@/lib/utils";

/**
 * PLANOS — PATCH 4 (Tempestade Elétrica Premium).
 * Pro fisicamente elevado (levitação + borda conic rotativa).
 * Valores reais: Essencial 79,90 · Pro 99,90 · Supreme 119,90.
 * CTAs mantêm o fluxo real de signup (links de afiliado).
 */

interface AffiliateLinks {
  essencial: string;
  pro: string;
  supreme: string;
}

interface PricingProps {
  affiliateLinks: AffiliateLinks;
  isLoading?: boolean;
}

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  tagline: string;
  price: number;
  features: PlanFeature[];
  href: string;
  isPopular?: boolean;
  badge?: string;
}

const getPlans = (links: AffiliateLinks): Plan[] => [
  {
    name: "Essencial",
    tagline: "Para começar gerando SaaS, Websites e PRDs com IA.",
    price: 79.9,
    href: links.essencial,
    features: [
      { name: "Criador de SaaS", included: true },
      { name: "Criador de Websites", included: true },
      { name: "Geração de PRDs", included: true },
      { name: "Exportação dos resultados", included: true },
      { name: "Meus Projetos", included: false },
      { name: "Gestão de Clientes", included: false },
      { name: "Histórico permanente", included: false },
      { name: "Aulas gravadas", included: false },
      { name: "Estratégia de criação", included: false },
      { name: "Prospecção", included: false },
      { name: "Material comercial", included: false },
    ],
  },
  {
    name: "Pro",
    tagline: "Criadores + Meus Projetos, Gestão de Clientes, Histórico e Aulas.",
    price: 99.9,
    href: links.pro,
    isPopular: true,
    badge: "⚡ Mais Escolhido",
    features: [
      { name: "Criador de SaaS", included: true },
      { name: "Criador de Websites", included: true },
      { name: "Geração de PRDs", included: true },
      { name: "Exportação dos resultados", included: true },
      { name: "Meus Projetos", included: true },
      { name: "Gestão de Clientes", included: true },
      { name: "Histórico permanente", included: true },
      { name: "Aulas gravadas", included: true },
      { name: "Estratégia de criação", included: true },
      { name: "Prospecção", included: false },
      { name: "Material comercial", included: false },
    ],
  },
  {
    name: "Supreme",
    tagline: "Tudo do Pro + Prospecção e Material Comercial.",
    price: 119.9,
    href: links.supreme,
    badge: "Mais Completo",
    features: [
      { name: "Criador de SaaS", included: true },
      { name: "Criador de Websites", included: true },
      { name: "Geração de PRDs", included: true },
      { name: "Exportação dos resultados", included: true },
      { name: "Meus Projetos", included: true },
      { name: "Gestão de Clientes", included: true },
      { name: "Histórico permanente", included: true },
      { name: "Aulas gravadas", included: true },
      { name: "Estratégia de criação", included: true },
      { name: "Prospecção", included: true },
      { name: "Material comercial", included: true },
    ],
  },
];

/* Preço com CountUp (0 → valor em 800ms, uma vez) */
const AnimatedPrice = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let raf: number;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const p = Math.min((now - start) / 800, 1);
      setDisplay(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
};

const PricingCard = ({ plan, order }: { plan: Plan; order: number }) => {
  const { shouldReduceMotion, isMobile } = usePerformance();
  const disable = shouldReduceMotion || isMobile;
  const pro = !!plan.isPopular;

  return (
    <motion.div
      initial={disable ? false : { opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: pro ? 90 : 110,
        damping: pro ? 12 : 18, // Pro pousa com leve overshoot
        delay: order * 0.12,
      }}
      className={cn(
        "relative",
        pro && "z-10 lg:-translate-y-5 lg:scale-[1.04]"
      )}
    >
      {/* Micro-float idle do Pro (levitação ±3px) */}
      <motion.div
        animate={
          pro && !disable ? { y: [-3, 3, -3] } : {}
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "relative flex flex-col h-full rounded-2xl",
          !pro && "transition-transform duration-300 hover:-translate-y-1.5"
        )}
        style={{
          background: pro ? "var(--bg-elevated)" : "var(--bg-surface)",
          border: pro ? "none" : "1px solid rgba(var(--royal-rgb), 0.12)",
          boxShadow: pro
            ? "0 0 60px rgba(var(--electric-rgb), 0.25), 0 30px 50px -20px rgba(0,0,0,0.6)"
            : "none",
        }}
      >
        {/* Borda conic rotativa (só Pro) */}
        {pro && <div className="pro-conic-border" />}

        {/* Badge flutuante */}
        {plan.badge && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
            <span
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap",
                pro ? "" : "border"
              )}
              style={
                pro
                  ? { background: "var(--electric)", color: "var(--bg-void)" }
                  : {
                      background: "var(--bg-elevated)",
                      color: "var(--text-muted)",
                      borderColor: "rgba(var(--electric-rgb), 0.25)",
                    }
              }
            >
              {plan.badge}
            </span>
          </div>
        )}

        <div className="p-6 sm:p-8 pb-0">
          <h3 className="font-display font-semibold text-2xl text-[var(--text-primary)] mb-2">
            {plan.name}
          </h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed min-h-[40px] mb-6">
            {plan.tagline}
          </p>

          {/* Preço */}
          <div className="flex items-baseline gap-1.5 mb-6">
            <span className="text-[var(--text-muted)] text-base">R$</span>
            <span
              className="font-display font-bold text-[44px] leading-none tracking-tight"
              style={{ color: pro ? "var(--electric-hot)" : "var(--text-primary)" }}
            >
              <AnimatedPrice value={plan.price} />
            </span>
            <span className="text-[var(--text-muted)] text-sm">/mês</span>
          </div>

          <div
            className="h-px"
            style={{
              background: pro
                ? "linear-gradient(90deg, transparent, rgba(var(--electric-rgb),0.4), transparent)"
                : "rgba(var(--royal-rgb), 0.1)",
            }}
          />
        </div>

        {/* Features */}
        <ul className="p-6 sm:p-8 space-y-3 flex-1">
          {plan.features.map((feature) => (
            <li key={feature.name} className="flex items-center gap-3 text-sm">
              {feature.included ? (
                <Check className="w-4 h-4 shrink-0 text-[var(--electric)]" />
              ) : (
                <X className="w-4 h-4 shrink-0 text-[var(--text-muted)] opacity-40" />
              )}
              <span
                className={cn(
                  feature.included
                    ? "text-[var(--text-primary)]/85"
                    : "text-[var(--text-muted)] opacity-45 line-through"
                )}
              >
                {feature.name}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="p-6 sm:p-8 pt-0">
          <a
            href={plan.href}
            className={cn(
              "group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-300"
            )}
            style={
              pro
                ? {
                    background: "var(--electric)",
                    color: "var(--bg-void)",
                    boxShadow: "0 0 28px rgba(var(--electric-rgb), 0.4)",
                  }
                : {
                    border: "1px solid rgba(var(--electric-rgb), 0.3)",
                    color: "var(--text-primary)",
                  }
            }
          >
            Selecionar plano
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <p className="text-xs text-[var(--text-muted)] opacity-70 text-center mt-3">
            Pagamento na próxima etapa
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Pricing = ({ affiliateLinks }: PricingProps) => {
  const { shouldReduceMotion } = usePerformance();
  const plans = getPlans(affiliateLinks);
  // Ordem de entrada: laterais primeiro, Pro por último
  const entryOrder: Record<string, number> = { Essencial: 0, Supreme: 1, Pro: 2 };

  return (
    <section id="pricing" className="py-20 sm:py-32 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header padrão */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="block text-xs font-medium tracking-[0.2em] text-[var(--electric)] mb-4">
            PLANOS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] mb-4">
            Escolha o plano ideal para decolar sua ideia
          </h2>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
            Comece a criar SaaS profissionais com IA agora mesmo. Atualize ou cancele
            quando quiser.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6 max-w-5xl mx-auto items-stretch pt-6">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} order={entryOrder[plan.name]} />
          ))}
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-14">
          {["Cancele quando quiser", "Sem taxas ocultas", "Suporte dedicado"].map(
            (text) => (
              <div
                key={text}
                className="flex items-center gap-2 text-xs text-[var(--text-muted)]"
              >
                <Check className="w-3.5 h-3.5 text-[var(--electric)]" />
                {text}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
