import { motion } from "framer-motion";
import { usePerformance } from "@/hooks/use-performance";

const OperationTransition = () => {
  const { shouldReduceMotion } = usePerformance();

  return (
    <section className="operation-transition" aria-label="Transição para a equipe">
      <div className="operation-transition__currents" aria-hidden>
        <motion.span
          className="operation-transition__gold"
          initial={shouldReduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-30%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.span
          className="operation-transition__violet"
          initial={shouldReduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-30%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-25%" }}
        transition={{ duration: 0.55 }}
      >
        <span>Toda operação precisa de duas forças.</span>
        <h2>
          Direção para vender.
          <br />
          Execução para acontecer.
        </h2>
      </motion.div>
    </section>
  );
};

export default OperationTransition;
