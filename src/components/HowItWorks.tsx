import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { usePerformance } from "@/hooks/use-performance";
import { cn } from "@/lib/utils";

/**
 * COMO FUNCIONA — PATCH 3 (Tempestade Elétrica Premium).
 * 3 passos em zigue-zague conectados por uma linha de energia SVG
 * que se desenha conforme o scroll; nós acendem em sequência.
 */

const steps = [
  {
    number: "01",
    title: "Responda o Wizard",
    description: "15 perguntas certeiras sobre sua ideia. A IA faz o trabalho pesado.",
    chip: "🧙 15 perguntas guiadas",
    side: "left" as const,
  },
  {
    number: "02",
    title: "Receba o Blueprint",
    description: "PRD completo: escopo, arquitetura, design system e prompt especializado.",
    chip: "📋 Blueprint + Prompt multi-plataforma",
    side: "right" as const,
  },
  {
    number: "03",
    title: "Cole e Lance",
    description: "Prompt pronto pra Lovable, Bolt, Cursor ou onde você preferir. Do papel ao ar.",
    chip: "🚀 Lovable, Bolt, Cursor e mais",
    side: "left" as const,
  },
];

const Step = ({ step, index }: { step: (typeof steps)[number]; index: number }) => {
  const { shouldReduceMotion } = usePerformance();
  const ref = useRef<HTMLDivElement>(null);
  // Passo "ativa" quando entra bem no viewport (número acende)
  const active = useInView(ref, { margin: "-35% 0px -35% 0px", once: true });

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center gap-6 sm:gap-10 py-14 sm:py-20",
        step.side === "right" ? "flex-row-reverse text-right" : ""
      )}
    >
      {/* Número gigante vazado → preenchido quando ativa */}
      <motion.span
        className="font-display font-bold leading-none select-none shrink-0"
        style={{
          fontSize: "clamp(72px, 10vw, 120px)",
          WebkitTextStroke: active ? "1px transparent" : "1px var(--electric)",
          color: active ? "var(--electric)" : "var(--bg-elevated)",
          transition: "color 0.6s ease, -webkit-text-stroke 0.6s ease",
        }}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        {step.number}
      </motion.span>

      {/* Nó da linha de energia (desktop) */}
      <motion.span
        aria-hidden
        className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
        style={{ background: "var(--electric)" }}
        animate={
          active
            ? {
                scale: [0.6, 1.25, 1],
                boxShadow: [
                  "0 0 0px rgba(139,124,247,0)",
                  "0 0 24px rgba(139,124,247,0.8)",
                  "0 0 12px rgba(139,124,247,0.5)",
                ],
              }
            : { scale: 0.6, boxShadow: "0 0 0px rgba(139,124,247,0)" }
        }
        transition={{ duration: 0.5 }}
      />

      {/* Conteúdo */}
      <motion.div
        className={cn("max-w-md", step.side === "right" ? "ml-auto" : "")}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: 0.1 }}
      >
        <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[var(--text-primary)] mb-3">
          {step.title}
        </h3>
        <p className="text-[var(--text-muted)] leading-relaxed mb-4">
          {step.description}
        </p>
        <span
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[var(--text-muted)]"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid rgba(var(--electric-rgb), 0.18)",
          }}
        >
          {step.chip}
        </span>
      </motion.div>
    </div>
  );
};

const HowItWorks = () => {
  const { shouldReduceMotion } = usePerformance();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how-it-works" className="py-20 sm:py-28 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header padrão */}
        <motion.div
          className="text-center mb-6 sm:mb-10"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="block text-xs font-medium tracking-[0.2em] text-[var(--electric)] mb-4">
            COMO FUNCIONA
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)]">
            Da ideia ao ar em 3 passos
          </h2>
        </motion.div>

        {/* Passos + linha de energia */}
        <div ref={sectionRef} className="relative max-w-4xl mx-auto">
          {/* Linha serpenteando (desktop) — se desenha no scroll */}
          <svg
            aria-hidden
            className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="energy-line" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--electric)" />
                <stop offset="100%" stopColor="var(--volt)" />
              </linearGradient>
            </defs>
            {/* Trilho apagado */}
            <path
              d="M 50 0 C 50 10, 42 12, 42 17 S 50 26, 50 33 S 58 44, 58 50 S 50 60, 50 66 S 42 78, 42 84 S 50 94, 50 100"
              fill="none"
              stroke="rgba(139,124,247,0.12)"
              strokeWidth="0.4"
              vectorEffect="non-scaling-stroke"
            />
            {/* Corrente elétrica dirigida pelo scroll */}
            <motion.path
              d="M 50 0 C 50 10, 42 12, 42 17 S 50 26, 50 33 S 58 44, 58 50 S 50 60, 50 66 S 42 78, 42 84 S 50 94, 50 100"
              fill="none"
              stroke="url(#energy-line)"
              strokeWidth="0.55"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: shouldReduceMotion ? 1 : pathLength }}
            />
          </svg>

          {steps.map((step, index) => (
            <Step key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
