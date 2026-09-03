import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePerformance } from "@/hooks/use-performance";

const faqs = [
  {
    question: "O que muda entre mensal e anual?",
    answer:
      "As funcionalidades são as mesmas. O que muda é o ciclo de cobrança e a economia oferecida no acesso anual.",
  },
  {
    question: "A SaaSKiller constrói o produto por mim?",
    answer:
      "A SaaSKiller estrutura o projeto, gera o blueprint e prepara prompts especializados para as principais ferramentas de construção com IA. Você mantém o controle da execução e das decisões.",
  },
  {
    question: "Preciso saber programar?",
    answer:
      "Não. A plataforma organiza as decisões técnicas e orienta a construção. Conhecimento técnico ajuda em projetos avançados, mas não é necessário para começar.",
  },
  {
    question: "A plataforma garante vendas?",
    answer:
      "Não. A SaaSKiller entrega estrutura, prospecção, materiais e processo comercial. O resultado depende da oferta, do mercado e da execução de cada usuário.",
  },
  {
    question: "Posso criar Apps, Websites e Micro-SaaS?",
    answer:
      "Sim. O fluxo se adapta ao tipo de produto e à ferramenta de construção escolhida.",
  },
  {
    question: "Posso usar com Lovable, Codex e Antigravity?",
    answer:
      "Sim. Os prompts e blueprints são preparados para funcionar com diferentes ferramentas de construção.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { shouldReduceMotion } = usePerformance();

  return (
    <section id="faq" className="section-shell faq-section">
      <div className="site-container faq-layout">
        <div className="section-heading">
          <span className="section-eyebrow">FAQ</span>
          <h2>Antes de começar, deixe tudo claro.</h2>
          <p>
            Respostas diretas sobre produto, execução, ciclos e expectativas.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <article key={faq.question} className={open ? "is-open" : ""}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>0{index + 1}</span>
                  <strong>{faq.question}</strong>
                  <motion.i
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 280, damping: 22 }
                    }
                  >
                    <ChevronDown aria-hidden />
                  </motion.i>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        shouldReduceMotion ? undefined : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.26 }}
                      className="faq-answer"
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
