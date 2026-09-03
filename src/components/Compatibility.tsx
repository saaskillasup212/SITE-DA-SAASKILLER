import { motion } from "framer-motion";
import { usePerformance } from "@/hooks/use-performance";

const platforms = ["Lovable", "Codex", "Antigravity", "Bolt", "Cursor", "Replit"];

const Compatibility = () => {
  const { shouldReduceMotion } = usePerformance();

  return (
    <section id="compatibility" className="section-shell compatibility-section">
      <div className="site-container compatibility-layout">
        <motion.div
          className="section-heading"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">COMPATIBILIDADE</span>
          <h2>
            Sua operação não fica presa a uma única ferramenta.
          </h2>
          <p>
            Blueprints e prompts preparados para acompanhar a stack que você já
            utiliza — hoje e conforme ela evolui.
          </p>
        </motion.div>

        <div className="compatibility-grid">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform}
              className="compatibility-item"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{platform}</strong>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Compatibility;
