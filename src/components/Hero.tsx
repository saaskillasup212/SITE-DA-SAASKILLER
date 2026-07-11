import { Component, lazy, ReactNode, Suspense, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePerformance } from "@/hooks/use-performance";

// Lazy: three.js só entra no bundle/execução quando o Canvas vai montar (PATCH 8)
const HeroScene = lazy(() => import("./HeroScene"));

/* Se a cena 3D falhar (ex.: HDR do Environment bloqueado), degrada em silêncio
   pro fallback CSS em vez de derrubar o app no ErrorBoundary global. */
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

/* ---------- CountUp (uma vez, ao entrar no viewport) ---------- */
const CountUp = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let raf: number;
    let start: number | null = null;
    const duration = 1400;
    const tick = (now: number) => {
      if (start === null) start = now;
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(end * (1 - Math.pow(2, -10 * p))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};

/* ---------- Fallback mobile: raio SVG estático + dots CSS ---------- */
const MobileBackdrop = () => {
  const dots = Array.from({ length: 15 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg
        viewBox="0 0 100 200"
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[55%] opacity-40"
        style={{ filter: "drop-shadow(0 0 24px rgba(var(--gold-rgb), 0.6))" }}
      >
        <path
          d="M62 10 L28 95 L48 95 L34 190 L76 78 L54 78 Z"
          fill="url(#bolt-grad)"
        />
        <defs>
          <linearGradient id="bolt-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gold-hot)" />
            <stop offset="100%" stopColor="var(--gold-deep)" />
          </linearGradient>
        </defs>
      </svg>
      {dots.map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[var(--electric)]"
          style={{
            width: 3 + (i % 3) * 2,
            height: 3 + (i % 3) * 2,
            left: `${(i * 61) % 100}%`,
            top: `${(i * 37) % 100}%`,
            opacity: 0.35,
            animation: `hero-dot-float ${6 + (i % 5)}s ease-in-out ${i * 0.4}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

/* ---------- Hero ---------- */
const Hero = () => {
  const { isMobile, shouldReduceMotion } = usePerformance();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const item = shouldReduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
      };
  const word = shouldReduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.5, ease: "easeOut" as const },
        },
      };

  const line1 = ["Crie,", "Lance", "e", "Venda"];
  const line2 = ["Micro-SaaS", "com", "IA"];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--bg-void)" }}
    >
      {/* Cena 3D (desktop) / fallback leve (mobile e reduced-motion) */}
      {isMobile || shouldReduceMotion ? (
        <MobileBackdrop />
      ) : (
        <SceneBoundary fallback={<MobileBackdrop />}>
          <div className="absolute inset-0 z-0">
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </div>
        </SceneBoundary>
      )}

      {/* Conteúdo — assimétrico, esquerda ~55% */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 pb-20">
        <motion.div
          className="max-w-[55%] max-lg:max-w-full"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div variants={item} className="mb-7">
            <span className="badge-shimmer inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[var(--text-muted)]">
              ⚡ Plataforma All-in-One para Founders Solo
            </span>
          </motion.div>

          {/* H1 */}
          <h1
            className="font-display font-bold text-[var(--text-primary)] mb-6"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", lineHeight: 1.02 }}
          >
            <motion.span
              className="block"
              variants={container}
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.12 }}
            >
              {line1.map((w) =>
                w === "Venda" ? (
                  <motion.span key={w} variants={word} className="inline-block mr-[0.22em] relative">
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, var(--electric), var(--volt))",
                      }}
                    >
                      {w}
                    </span>
                    {/* Sublinhado SVG desenhado */}
                    <svg
                      viewBox="0 0 120 12"
                      className="absolute left-0 -bottom-2 w-full h-[0.18em]"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        d="M4 8 C 30 2, 90 2, 116 7"
                        fill="none"
                        stroke="var(--electric)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                      />
                    </svg>
                  </motion.span>
                ) : (
                  <motion.span key={w} variants={word} className="inline-block mr-[0.22em]">
                    {w}
                  </motion.span>
                )
              )}
            </motion.span>
            <motion.span className="block" variants={container}>
              {line2.map((w) => (
                <motion.span key={w} variants={word} className="inline-block mr-[0.22em]">
                  {w}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          {/* Sub */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg text-[var(--text-muted)] max-w-[480px] mb-9 leading-relaxed"
          >
            Substitua um time inteiro de produto, design, dev e vendas. Um hub com IA
            especializada em cada etapa — do PRD ao primeiro cliente.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => scrollToSection("pricing")}
              className="group h-[52px] px-8 rounded-xl font-bold text-base inline-flex items-center justify-center gap-2 transition-all duration-300"
              style={{
                background: "var(--electric)",
                color: "var(--bg-void)",
                boxShadow: "0 0 32px rgba(var(--electric-rgb), 0.35)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 48px rgba(var(--electric-rgb), 0.55)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 32px rgba(var(--electric-rgb), 0.35)")
              }
            >
              Começar Agora
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="h-[52px] px-8 rounded-xl border text-base font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300"
              style={{ borderColor: "rgba(157,151,196,0.35)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--electric)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(157,151,196,0.35)")
              }
            >
              Ver Planos
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {[
              { value: <CountUp end={500} suffix="+" />, label: "SaaS Criados" },
              { value: <CountUp end={98} suffix="%" />, label: "Satisfação" },
              { value: "24/7", label: "Suporte IA" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-6">
                {i > 0 && (
                  <span className="w-px h-8 bg-[rgba(var(--electric-rgb),0.2)]" />
                )}
                <div>
                  <div className="font-display font-semibold text-xl sm:text-2xl text-[var(--electric-hot)]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      {!scrolled && !shouldReduceMotion && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: 2, repeat: Infinity, delay: 2 }}
          aria-hidden
        >
          <svg width="20" height="26" viewBox="0 0 20 26" fill="none">
            <path d="M3 5 L10 12 L17 5" stroke="var(--electric)" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 14 L10 21 L17 14" stroke="var(--electric)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          </svg>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
