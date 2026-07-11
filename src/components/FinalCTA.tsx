import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePerformance } from "@/hooks/use-performance";

// Lazy: só carrega o canvas quando a seção se aproxima do viewport (PATCH 8)
const CTAParticles = lazy(() => import("./CTAParticles"));

/**
 * CTA FINAL — PATCH 7 (Tempestade Elétrica Premium).
 * Canvas leve de partículas convergindo; monta a 1 viewport de distância
 * e desmonta quando sai de vista (PATCH 8). Mobile: gradient estático.
 */

const FinalCTA = () => {
  const { shouldReduceMotion, isMobile } = usePerformance();
  const sectionRef = useRef<HTMLElement>(null);
  const [canvasVisible, setCanvasVisible] = useState(false);

  useEffect(() => {
    if (isMobile || shouldReduceMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCanvasVisible(entry.isIntersecting),
      { rootMargin: "100% 0px" } // 1 viewport de distância
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile, shouldReduceMotion]);

  const scrollToPricing = () =>
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="py-24 sm:py-36 relative overflow-hidden z-10"
    >
      {/* Fundo: partículas convergindo (desktop) / radial estático (mobile) */}
      {canvasVisible && !isMobile && !shouldReduceMotion ? (
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <CTAParticles />
          </Suspense>
        </div>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(var(--electric-deep-rgb), 0.12), transparent 70%)",
          }}
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] leading-[1.05] mb-5"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            Pronto para criar seu primeiro SaaS?
          </motion.h2>

          <motion.p
            className="text-lg text-[var(--text-muted)] mb-10"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            Do PRD ao primeiro cliente. Comece hoje.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
            <button
              onClick={scrollToPricing}
              className="group cta-final-glow inline-flex items-center justify-center gap-2 h-[60px] px-12 rounded-xl font-bold text-lg transition-transform duration-300 hover:scale-[1.02]"
              style={{ background: "var(--electric)", color: "var(--bg-void)" }}
            >
              Começar Agora
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.p
            className="text-xs text-[var(--text-muted)] opacity-70 mt-6"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Sem cartão de crédito necessário · Cancele quando quiser
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
