import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Check, Minus } from "lucide-react";
import { usePerformance } from "@/hooks/use-performance";

const disconnected = [
  "Ideia perdida em conversas",
  "Prompt genérico",
  "Projeto sem histórico",
  "Produto sem cliente",
  "Várias ferramentas desconectadas",
];

const connected = [
  "Ideia transformada em blueprint",
  "Prompt especializado",
  "Projeto salvo e versionado",
  "Prospecção conectada ao CRM",
  "Caminho da construção até a venda",
];

const flowWords = ["Ideia", "Prompt", "Projeto", "Cliente", "Venda"];

const ProblemSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = usePerformance();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.45"],
  });
  const pathLength = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);
  const panelsY = useTransform(scrollYProgress, [0, 0.75], [18, 0]);

  return (
    <section ref={ref} id="problema" className="section-shell problem-section relative">
      <div className="site-container">
        <div className="section-heading max-w-3xl">
          <span className="section-eyebrow">O PROBLEMA REAL</span>
          <h2>
            Você não precisa de mais uma IA.
            <br />
            <span className="text-gold">Precisa de uma operação.</span>
          </h2>
          <p>
            Uma ferramenta gera uma tela. Um negócio exige clareza, produto,
            organização, clientes e venda funcionando no mesmo fluxo.
          </p>
        </div>

        <motion.div
          className="flow-fragmentation"
          style={shouldReduceMotion ? undefined : { y: panelsY }}
          aria-label="Da fragmentação à operação conectada"
        >
          <svg
            className="flow-fragmentation__line"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M30 50 H970" className="flow-line__track" />
            <motion.path
              d="M30 50 H970"
              className="flow-line__active"
              style={{ pathLength: shouldReduceMotion ? 1 : pathLength }}
            />
          </svg>
          {flowWords.map((word, index) => (
            <motion.div
              key={word}
              className="flow-fragmentation__node"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: index % 2 ? 15 : -15, rotate: index % 2 ? 2 : -2 }
              }
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {word}
            </motion.div>
          ))}
        </motion.div>

        <div className="problem-compare">
          <div className="problem-column problem-column--muted">
            <p className="problem-column__label">SEM UMA OPERAÇÃO</p>
            <ul>
              {disconnected.map((item) => (
                <li key={item}>
                  <Minus aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="problem-column">
            <p className="problem-column__label text-gold">COM A SAASKILLER</p>
            <ul>
              {connected.map((item) => (
                <li key={item}>
                  <Check aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="button"
          className="text-link"
          onClick={() =>
            document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Conheça a operação completa
          <ArrowDown className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </section>
  );
};

export default ProblemSection;

