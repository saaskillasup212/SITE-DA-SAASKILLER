import { motion } from "framer-motion";
import { PRODUCT_FACTS } from "@/config/constants";
import { usePerformance } from "@/hooks/use-performance";

const Stats = () => {
  const { shouldReduceMotion } = usePerformance();

  return (
    <section className="product-facts" aria-labelledby="product-facts-title">
      <div className="site-container">
        <div className="section-heading section-heading--center">
          <span className="section-eyebrow">DADOS DO PRODUTO</span>
          <h2 id="product-facts-title">Números que descrevem a operação.</h2>
          <p>Sem promessas financeiras. Apenas o que existe dentro do produto.</p>
        </div>
        <div className="product-facts__grid">
          {PRODUCT_FACTS.map((fact, index) => (
            <motion.article
              key={fact.label}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <span>{fact.value}</span>
              <div>
                <h3>{fact.label}</h3>
                <p>{fact.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
