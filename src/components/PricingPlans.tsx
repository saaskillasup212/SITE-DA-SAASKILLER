import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useAffiliate } from "@/contexts/AffiliateContext";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Tag,
  X,
  Zap,
} from "lucide-react";
import {
  buildRegistrationUrl,
  getSaaSKillerPriceCents,
  OFFER,
  SAASKILLER_PRICING,
  type BillingCycle,
} from "@/config/offer";
import { usePerformance } from "@/hooks/use-performance";
import { trackEvent } from "@/lib/analytics";
import "@/styles/pricing.css";

const includedFeatures = [
  "Apps, Websites e Micro-SaaS.",
  "PRDs e blueprints completos.",
  "Projetos salvos e versionados.",
  "CRM, prospecção e clientes.",
  "Venda em 7 mercados.",
  "Academia e materiais comerciais.",
  "Biblioteca de pistas.",
  "Prompts para as principais plataformas.",
];

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatBRLFromCents = (amountCents: number) =>
  currencyFormatter.format(amountCents / 100);

const formatNumberFromCents = (
  amountCents: number,
  fractionDigits: number,
) =>
  new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amountCents / 100);

const RUAN_CHECKOUT_URLS = {
  monthly: {
    regular: "https://checkout.applyfy.com.br/checkout/cmrxrxc6b01h901q44mkb03ph?offer=JE9P1F0",
    discounted: "https://checkout.applyfy.com.br/checkout/cmrxrxc6b01h901q44mkb03ph?offer=M39YWU9",
  },
  annual: {
    regular: "https://checkout.applyfy.com.br/checkout/cmrxrxc6b01h901q44mkb03ph?offer=ZRCMPG7",
    discounted: "https://checkout.applyfy.com.br/checkout/cmrxrxc6b01h901q44mkb03ph?offer=339HDAH",
  },
} as const;

interface AnimatedPriceProps {
  amountCents: number;
  minimumFractionDigits?: number;
  isDiscounted: boolean;
  shouldReduceMotion: boolean;
}

const AnimatedPrice = ({
  amountCents,
  minimumFractionDigits,
  isDiscounted,
  shouldReduceMotion,
}: AnimatedPriceProps) => {
  const fractionDigits =
    minimumFractionDigits ?? (amountCents % 100 === 0 ? 0 : 2);
  const formattedValue = formatNumberFromCents(amountCents, fractionDigits);

  return (
    <span className="plans-price-roll" aria-label={formattedValue}>
      <motion.span
        key={formattedValue}
        className="plans-price-roll__value"
        aria-hidden="true"
        initial={
          shouldReduceMotion
            ? false
            : { y: isDiscounted ? "-105%" : "105%", opacity: 0 }
        }
        animate={{ y: "0%", opacity: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {formattedValue}
      </motion.span>
    </span>
  );
};

interface FeatureListProps {
  annual?: boolean;
}

const FeatureList = ({ annual = false }: FeatureListProps) => (
  <div className="plans-card__features">
    <span className="plans-card__features-title">TUDO INCLUÍDO</span>
    <p className="plans-card__features-copy">
      Nenhuma funcionalidade bloqueada.
    </p>
    <ul className="plans-card__features-list">
      {includedFeatures.map((feature) => (
        <li key={`${annual ? "annual" : "monthly"}-${feature}`}>
          <Check aria-hidden />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

const PricingPlans = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewedRef = useRef(false);
  const { shouldReduceMotion } = usePerformance();
  const { normalizedAffiliate, autoDiscount } = useAffiliate();
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponError, setCouponError] = useState("");

  // O activeCoupon agora é APENAS o cupom digitado pelo usuário
  const activeCoupon = appliedCoupon;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      if (!viewedRef.current) {
        viewedRef.current = true;
        trackEvent("pricing_view", { plan: OFFER.plan, origin: "homepage" });
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewedRef.current) {
          viewedRef.current = true;
          trackEvent("pricing_view", { plan: OFFER.plan, origin: "homepage" });
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const applyCoupon = () => {
    const normalizedCoupon = couponInput.trim().toLowerCase();
    const isValidCoupon = OFFER.validCoupons.includes(
      normalizedCoupon as (typeof OFFER.validCoupons)[number],
    );

    if (!isValidCoupon) {
      setCouponError("Cupom inválido. Confira o código e tente novamente.");
      setAppliedCoupon("");
      return;
    }

    setCouponError("");
    setAppliedCoupon(normalizedCoupon.toUpperCase());
  };

  const removeCoupon = () => {
    setCouponInput("");
    setAppliedCoupon("");
    setCouponError("");
  };

  const handleCTA = (cycle: BillingCycle) => {
    const isRuanAffiliate = activeCoupon === "RUAN";
    const isAffiliateOnlyCoupon = activeCoupon === "MATHIAS" || activeCoupon === "RUAN" || activeCoupon === "GUILHERME";
    const priceType = activeCoupon && !isAffiliateOnlyCoupon ? "discounted" : "regular";
    const target = isRuanAffiliate
      ? RUAN_CHECKOUT_URLS[cycle][priceType]
      : buildRegistrationUrl(cycle, activeCoupon || undefined, normalizedAffiliate, autoDiscount);
    const eventParameters = {
      plan: OFFER.plan,
      cycle,
      origin: "pricing",
      coupon_applied: Boolean(activeCoupon),
    };

    trackEvent("pricing_cta_clicked", eventParameters);
    trackEvent("checkout_click", eventParameters);
    window.location.assign(target);
  };

  const hasAnyCoupon = Boolean(activeCoupon) || autoDiscount;
  const isAffiliateCoupon = activeCoupon === "MATHIAS" || activeCoupon === "RUAN" || activeCoupon === "GUILHERME" || activeCoupon === "AYANNA" || activeCoupon === "LEANDRO";
  const isDiscounted = (Boolean(activeCoupon) && !isAffiliateCoupon) || autoDiscount;
  
  // Flag visual caso haja afiliado na URL, mas não tenha cupom aplicado
  const isSupportingAffiliate = Boolean(normalizedAffiliate) && !hasAnyCoupon && !autoDiscount;

  const monthlyAmountCents = getSaaSKillerPriceCents(
    "monthly",
    isDiscounted,
  );
  const annualAmountCents = getSaaSKillerPriceCents("annual", isDiscounted);
  
  // Standard gateway interest for 12x is ~27.86% total
  const INSTALLMENT_MULTIPLIER = 1.2785894;
  const annualInstallmentCents = Math.round((annualAmountCents * INSTALLMENT_MULTIPLIER) / 12);
  
  const annualSavingsCents = monthlyAmountCents * 12 - annualAmountCents;
  const annualSavingsPercent = Math.round(
    (annualSavingsCents * 100) / (monthlyAmountCents * 12),
  );

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="section-shell pricing-section"
    >
      <div className="site-container">
        <header className="section-heading section-heading--center plans-heading">
          <span className="section-eyebrow">SAASKILLER COMPLETO</span>
          <h2>Um plano para começar. Outro para acelerar.</h2>
          <p>
            Todos os recursos em ambos os planos. Escolha a flexibilidade do
            mensal ou o melhor custo no anual.
          </p>
        </header>

        <motion.aside
          className={`plans-coupon${hasAnyCoupon ? " is-active" : ""}`}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          aria-label="Aplicar cupom"
        >
          <div className="plans-coupon__content">
            <div className="plans-coupon__intro">
              <span className="plans-coupon__icon">
                {hasAnyCoupon ? <Zap aria-hidden /> : <Tag aria-hidden />}
              </span>
              <div className="plans-coupon__intro-text">
                <span className="plans-coupon__eyebrow">
                  {isAffiliateCoupon ? "APOIO A COLABORADOR" : (isSupportingAffiliate ? "VOCÊ FOI INDICADO" : "CONDIÇÃO ESPECIAL")}
                </span>
                <strong className="plans-coupon__title">
                  {isAffiliateCoupon
                    ? "Cupom de colaborador ativado"
                    : isDiscounted
                      ? "Preço de cupom liberado"
                      : "Tem um cupom? Desbloqueie seu preço"}
                </strong>
              </div>
            </div>

            <form
              className="plans-coupon__form"
              onSubmit={(event) => {
                event.preventDefault();
                if (autoDiscount && !activeCoupon) return; // Prevent removing autoDiscount via form
                if (Boolean(activeCoupon)) {
                  removeCoupon();
                } else {
                  applyCoupon();
                }
              }}
            >
              <label className="sr-only" htmlFor="plans-coupon-input">
                Código do cupom
              </label>
              <div className="plans-coupon__controls">
                <input
                  id="plans-coupon-input"
                  className="plans-coupon__input"
                  value={autoDiscount && !activeCoupon ? "DESCONTO VIP" : couponInput}
                  onChange={(event) => {
                    setCouponInput(event.target.value.toUpperCase());
                    setCouponError("");
                  }}
                  placeholder="SEU CUPOM"
                  autoComplete="off"
                  readOnly={hasAnyCoupon}
                  aria-invalid={Boolean(couponError)}
                  aria-describedby="plans-coupon-status"
                />
                <button
                  type="submit"
                  className="plans-coupon__button"
                  disabled={(!hasAnyCoupon && !couponInput.trim()) || (autoDiscount && !activeCoupon)}
                >
                  {hasAnyCoupon ? <X aria-hidden /> : <Check aria-hidden />}
                  {Boolean(activeCoupon) ? "Remover" : autoDiscount ? "Ativo" : "Aplicar"}
                </button>
              </div>
              <span
                id="plans-coupon-status"
                className={`plans-coupon__status${
                  couponError
                    ? " is-error"
                    : hasAnyCoupon
                      ? " is-success"
                      : ""
                }${isAffiliateCoupon || isSupportingAffiliate || autoDiscount ? " is-affiliate" : ""}`}
                role="status"
              >
                {couponError ||
                  (isAffiliateCoupon
                    ? "Cupom efetuado! Esse colaborador receberá 50% do valor da sua venda."
                    : isDiscounted
                      ? autoDiscount && !activeCoupon 
                        ? "Desconto especial de indicação aplicado!" 
                        : `Cupom ${activeCoupon} aplicado com sucesso.`
                      : isSupportingAffiliate
                        ? "Sua compra apoiará o afiliado. Adicione um cupom de desconto se tiver."
                        : "Digite o código para visualizar os preços especiais.")}
              </span>
            </form>
          </div>
        </motion.aside>

        <div className="plans-grid">
          <motion.article
            className={`plans-card plans-card--monthly${
              isDiscounted ? " is-discounted" : ""
            }`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.45,
              delay: shouldReduceMotion ? 0 : 0.08,
            }}
          >
            <div className="plans-card__meta">
              <span className="plans-card__cycle">PAGAMENTO MENSAL</span>
              <span className="plans-card__badge">MAIS FLEXÍVEL</span>
            </div>

            <header className="plans-card__header">
              <h3 className="plans-card__title">Mensal</h3>
              <div className="flex items-center mt-3 mb-1 text-xs font-bold tracking-widest text-blue-400 uppercase">
                VENDA EM
                <div className="flex gap-1.5 ml-2">
                  {["br", "pt", "us", "es", "it", "fr", "de"].map((code) => (
                    <img
                      key={code}
                      src={`https://flagcdn.com/${code}.svg`}
                      alt={`País ${code.toUpperCase()}`}
                      className="w-[18px] h-[13px] rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
                    />
                  ))}
                </div>
              </div>
              <p className="plans-card__description mt-2">
                Prospecte e venda em BRL, USD e EUR.
              </p>
            </header>

            <div className="plans-card__price-box">
              <div className="plans-card__previous">
                {isDiscounted ? (
                  <>
                    <span>
                      De{" "}
                      <del>
                        {formatBRLFromCents(
                          SAASKILLER_PRICING.monthly.amountCents,
                        )}
                      </del>
                    </span>
                    <span className="plans-card__coupon-badge">
                      PREÇO DE CUPOM
                    </span>
                  </>
                ) : (
                  <span className="plans-card__price-label">
                    VALOR DO PLANO
                  </span>
                )}
              </div>
              <div className="plans-card__price-line">
                <span className="plans-card__currency">R$</span>
                <strong className="plans-card__value">
                  <AnimatedPrice
                    amountCents={monthlyAmountCents}
                    minimumFractionDigits={2}
                    isDiscounted={isDiscounted}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </strong>
                <span className="plans-card__period">/mês</span>
              </div>
              <p className="plans-card__price-note">
                Cobrança mensal. <strong>Cancele quando quiser.</strong>
              </p>
            </div>

            <div className="plans-card__facts">
              <span className="plans-card__fact">Sem fidelidade</span>
              <span className="plans-card__fact">Acesso imediato</span>
            </div>

            <button
              type="button"
              className="plans-card__cta"
              onClick={() => handleCTA("monthly")}
            >
              Escolher plano mensal
              <ArrowRight aria-hidden />
            </button>
            <span className="plans-card__secure">
              <ShieldCheck aria-hidden />
              Checkout seguro
            </span>

            <FeatureList />
          </motion.article>

          <motion.article
            className={`plans-card plans-card--annual${
              isDiscounted ? " is-discounted" : ""
            }`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          >
            <div className="plans-card__meta">
              <span className="plans-card__cycle">PAGAMENTO ÚNICO</span>
              <span className="plans-card__badge">
                <Zap aria-hidden />
                MELHOR ESCOLHA
              </span>
            </div>

            <header className="plans-card__header">
              <h3 className="plans-card__title">Vitalício</h3>
              <div className="flex items-center mt-3 mb-1 text-xs font-bold tracking-widest text-blue-400 uppercase">
                VENDA EM
                <div className="flex gap-1.5 ml-2">
                  {["br", "pt", "us", "es", "it", "fr", "de"].map((code) => (
                    <img
                      key={code}
                      src={`https://flagcdn.com/${code}.svg`}
                      alt={`País ${code.toUpperCase()}`}
                      className="w-[18px] h-[13px] rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
                    />
                  ))}
                </div>
              </div>
              <p className="plans-card__description mt-2">
                Prospecte e venda em BRL, USD e EUR.
              </p>
            </header>

            <div className="plans-card__price-box">
              <div className="plans-card__previous">
                {isDiscounted ? (
                  <>
                    <span>
                      De{" "}
                      <del>
                        {formatBRLFromCents(
                          SAASKILLER_PRICING.annual.amountCents,
                        )}
                      </del>
                    </span>
                    <span className="plans-card__coupon-badge">
                      PREÇO DE CUPOM
                    </span>
                  </>
                ) : (
                  <span className="plans-card__price-label">
                    VALOR DO PLANO
                  </span>
                )}
              </div>
              <div className="plans-card__price-line">
                <span className="plans-card__installments">12x</span>
                <span className="plans-card__currency">de R$</span>
                <strong className="plans-card__value">
                  <AnimatedPrice
                    amountCents={annualInstallmentCents}
                    minimumFractionDigits={2}
                    isDiscounted={isDiscounted}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </strong>
                <span className="plans-card__period">/mês</span>
              </div>
              <p className="plans-card__price-note">
                ou{" "}
                <strong>
                  {formatBRLFromCents(annualAmountCents)} à vista
                </strong>{" "}
                pelo acesso vitalício.
              </p>
            </div>

            <div className="plans-card__facts">
              <span className="plans-card__fact plans-card__fact--stacked">
                <strong>{annualSavingsPercent}%</strong>
                de economia
              </span>
              <span className="plans-card__fact plans-card__fact--stacked">
                <strong>{formatBRLFromCents(annualSavingsCents)}</strong>
                poupados no ano
              </span>
            </div>

            <button
              type="button"
              className="plans-card__cta"
              onClick={() => handleCTA("annual")}
            >
              Escolher plano vitalício
              <ArrowRight aria-hidden />
            </button>
            <span className="plans-card__secure">
              <ShieldCheck aria-hidden />
              Checkout seguro
            </span>

            <FeatureList annual />
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
