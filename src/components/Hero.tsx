import { Component, lazy, type ReactNode, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Layers3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePerformance } from "@/hooks/use-performance";
import { useAffiliate } from "@/contexts/AffiliateContext";
import saasCreator from "@/assets/saas-creator.gif";
import pageBuilder from "@/assets/page-builder.gif";

const HeroScene = lazy(() => import("./HeroScene"));

class SceneBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const StaticCore = () => (
  <div className="hero-static-core" aria-hidden>
    <span className="hero-static-core__ring" />
    <svg viewBox="0 0 120 180" role="presentation">
      <defs>
        <linearGradient id="static-bolt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD874" />
          <stop offset="0.55" stopColor="#F2B93B" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path
        d="M75 4 26 91h31l-17 85 57-104H68L93 4Z"
        fill="url(#static-bolt)"
      />
    </svg>
  </div>
);

const InterfaceFragments = () => (
  <div className="hero-fragments" aria-label="Fragmentos reais da plataforma SaaSKiller">
    <figure className="hero-fragment hero-fragment--planning">
      <figcaption>
        <span>01</span>
        PLANEJAMENTO
      </figcaption>
      <img
        src={saasCreator}
        alt="Wizard real de criação de produto na SaaSKiller"
        width={320}
        height={156}
        fetchpriority="high"
      />
    </figure>
    <figure className="hero-fragment hero-fragment--building">
      <figcaption>
        <span>02</span>
        CONSTRUÇÃO
      </figcaption>
      <img
        src={pageBuilder}
        alt="Wizard real de criação de websites na SaaSKiller"
        width={320}
        height={159}
        fetchpriority="high"
      />
    </figure>
    <div className="hero-fragment hero-fragment--operation" aria-hidden>
      <div className="hero-operation__header">
        <span />
        OPERAÇÃO
      </div>
      <div className="hero-operation__metrics">
        <span>PROJETOS</span>
        <strong>CLIENTES</strong>
        <span>VENDA</span>
      </div>
      <div className="hero-operation__line" />
    </div>
  </div>
);

const Hero = () => {
  const { isMobile, shouldReduceMotion, isSlowConnection } = usePerformance();
  const lightweight = isMobile || shouldReduceMotion || isSlowConnection;
  const reveal = shouldReduceMotion
    ? { initial: false as const, animate: {} }
    : {
        initial: { opacity: 0, y: 24, filter: "blur(8px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      };

  const navigate = useNavigate();
  const { affiliateSlug } = useAffiliate();
  const planosUrl = affiliateSlug ? `/${affiliateSlug}/planos` : "/planos";

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="hero" className="hero-section">
      <div className="hero-grain" aria-hidden />
      <div className="hero-depth-points" aria-hidden />
      <div className="hero-current" aria-hidden>
        <svg viewBox="0 0 1200 300" preserveAspectRatio="none">
          <path d="M0 175 C260 40 420 270 640 135 S950 80 1200 170" />
        </svg>
      </div>

      <div className="hero-visual" aria-hidden="true">
        {lightweight ? (
          <StaticCore />
        ) : (
          <SceneBoundary fallback={<StaticCore />}>
            <Suspense fallback={<StaticCore />}>
              <HeroScene />
            </Suspense>
          </SceneBoundary>
        )}
        <InterfaceFragments />
      </div>

      <div className="site-container hero-layout">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
          }}
        >
          <motion.div
            className="hero-eyebrow"
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
          >
            <Layers3 aria-hidden />
            A OPERAÇÃO DO FOUNDER SOLO
          </motion.div>

          <h1>
            <motion.span
              className="hero-line"
              {...reveal}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              Da ideia ao
            </motion.span>
            <motion.span
              className="hero-line hero-line--gold"
              {...reveal}
              transition={{ duration: 0.58, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              primeiro cliente
            </motion.span>
            <motion.span
              className="hero-line hero-line--quiet"
              {...reveal}
              transition={{ duration: 0.58, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Sem montar uma equipe
            </motion.span>
          </h1>

          <motion.p
            className="hero-description"
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
          >
            Planeje, construa, organize, prospecte e venda Apps, Websites e
            Micro-SaaS usando IA em uma única plataforma.
          </motion.p>

          <motion.div
            className="hero-actions"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
          >
            <button
              type="button"
              className="button-primary"
              onClick={() => {
                navigate(planosUrl);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Começar minha operação
              <ArrowRight aria-hidden />
            </button>
            <button
              type="button"
              className="button-secondary"
              onClick={() => scrollTo("how-it-works")}
            >
              Ver como funciona
              <ArrowDown aria-hidden />
            </button>
          </motion.div>

          <motion.p
            className="hero-microcopy"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.4 } },
            }}
          >
            Escolha entre acesso mensal ou anual.
          </motion.p>
        </motion.div>
      </div>

      <div className="hero-scroll-index" aria-hidden>
        <span>SCROLL</span>
        <i />
      </div>
    </section>
  );
};

export default Hero;
