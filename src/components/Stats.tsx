import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import goldLogo from "@/assets/gold-lightning-logo.png";
import { usePerformance } from "@/hooks/use-performance";
import { FloatingBubbles } from "@/components/ui/floating-bubbles";
import { TrendingUp, Users, Zap } from "lucide-react";

const useCountAnimation = (end: number, duration: number = 2500) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(end * easeProgress));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
      else setCount(end);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return { count, ref };
};

const stats = [
  {
    value: 3427,
    suffix: "+",
    label: "SaaS desenvolvidos",
    sublabel: "pela SaaSKiller",
    icon: Zap,
  },
  {
    value: 827,
    suffix: "K+",
    label: "Faturados mensalmente",
    sublabel: "por usuários da SaaSKiller",
    icon: TrendingUp,
  },
];

const Stats = () => {
  const { shouldReduceMotion } = usePerformance();
  const { count: count1, ref: count1Ref } = useCountAnimation(3427, 2500);
  const { count: count2, ref: count2Ref } = useCountAnimation(827, 2500);

  const counts = [count1, count2];
  const refs = [count1Ref, count2Ref];

  return (
    <section className="py-20 sm:py-32 bg-[var(--bg-void)] relative overflow-hidden z-10">
      <FloatingBubbles count={20} />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(139,124,247,0.05)_0%,transparent_60%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/50 text-xs font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            Resultados
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Nossos{" "}
            <span className="bg-gradient-to-r from-[color:var(--gold)] via-[color:var(--gold-hot)] to-[color:var(--gold)] bg-clip-text text-transparent">
              Resultados
            </span>
          </h2>
          <p className="text-lg text-white/40">Confira alguns de nossos números</p>
        </motion.div>

        {/* Stats layout: stat - logo - stat */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Stat 1 */}
          <motion.div
            className="group"
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative p-8 rounded-2xl bg-[var(--bg-surface)] border border-white/[0.06] hover:border-[rgba(var(--gold-rgb),0.2)] transition-all duration-500 text-center min-w-[240px]">
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(var(--gold-rgb),0.02)] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="w-10 h-10 rounded-xl bg-[rgba(var(--gold-rgb),0.1)] border border-[rgba(var(--gold-rgb),0.2)] flex items-center justify-center mx-auto mb-4">
                <Zap className="w-5 h-5 text-[var(--gold)]" />
              </div>

              <div
                ref={count1Ref}
                className="text-4xl sm:text-5xl font-heading font-bold bg-gradient-to-r from-[color:var(--gold)] via-[color:var(--gold-hot)] to-[color:var(--gold)] bg-clip-text text-transparent mb-2"
              >
                +{count1.toLocaleString("pt-BR")}
              </div>
              <p className="text-sm text-white/40">
                SaaS desenvolvidos pela{" "}
                <span className="text-white/60 font-medium">SaaSKiller</span>
              </p>
            </div>
          </motion.div>

          {/* Logo Central */}
          <motion.div
            className="flex-shrink-0"
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(139,124,247,0.15)_0%,transparent_70%)]" />
              <motion.img
                src={goldLogo}
                alt="SaaSKiller"
                className="w-full h-full object-contain relative z-10"
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        filter: [
                          "drop-shadow(0 0 20px rgba(139,124,247,0.3))",
                          "drop-shadow(0 0 40px rgba(139,124,247,0.5))",
                          "drop-shadow(0 0 20px rgba(139,124,247,0.3))",
                        ],
                      }
                }
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            className="group"
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative p-8 rounded-2xl bg-[var(--bg-surface)] border border-white/[0.06] hover:border-[rgba(var(--gold-rgb),0.2)] transition-all duration-500 text-center min-w-[240px]">
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(var(--gold-rgb),0.02)] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="w-10 h-10 rounded-xl bg-[rgba(var(--gold-rgb),0.1)] border border-[rgba(var(--gold-rgb),0.2)] flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-5 h-5 text-[var(--gold)]" />
              </div>

              <div
                ref={count2Ref}
                className="text-4xl sm:text-5xl font-heading font-bold bg-gradient-to-r from-[color:var(--gold)] via-[color:var(--gold-hot)] to-[color:var(--gold)] bg-clip-text text-transparent mb-2"
              >
                +{count2}K
              </div>
              <p className="text-sm text-white/40">
                Faturados mensalmente por usuários da{" "}
                <span className="text-white/60 font-medium">SaaSKiller</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
