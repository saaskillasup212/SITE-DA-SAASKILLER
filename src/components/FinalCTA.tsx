import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePerformance } from "@/hooks/use-performance";

const FinalCTA = () => {
  const { shouldReduceMotion } = usePerformance();

  return (
    <section id="cta" className="final-cta">
      <div className="final-cta__portal" aria-hidden>
        <svg viewBox="0 0 1200 260" preserveAspectRatio="none">
          <motion.path
            d="M40 150 C260 30 420 220 600 130 S940 55 1160 145"
            initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-25%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <span>S</span>
      </div>

      <div className="site-container">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-25%" }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-eyebrow">O PRÓXIMO MOVIMENTO</span>
          <h2>
            Sua ideia já existe.
            <br />
            <span className="text-gold">Agora ela precisa de uma operação.</span>
          </h2>
          <p>
            Estratégia, construção e venda conectadas em um fluxo que você consegue
            conduzir.
          </p>
          <button
            type="button"
            className="button-primary"
            onClick={() =>
              document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Começar minha operação
            <ArrowRight aria-hidden />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
