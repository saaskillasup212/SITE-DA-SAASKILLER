import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePerformance } from "@/hooks/use-performance";

/**
 * FAQ — PATCH 6 (Tempestade Elétrica Premium).
 * Accordion refinado, perguntas/respostas originais do site mantidas.
 * Prova social pulada: sem conteúdo real disponível (regra do patch).
 */

const faqs = [
  {
    question: "Preciso de conhecimento técnico para usar o SaaSKiller?",
    answer:
      "Não! O SaaSKiller foi projetado para ser usado por qualquer pessoa, independente de conhecimento técnico. Nossa interface é intuitiva e temos tutoriais guiados para cada funcionalidade.",
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer:
      "Nossos clientes costumam ver os primeiros leads qualificados nas primeiras 48 horas. Resultados significativos de crescimento geralmente aparecem dentro de 30 dias de uso consistente.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim! Não trabalhamos com contratos de longo prazo. Você pode cancelar quando quiser, sem multas ou taxas escondidas.",
  },
  {
    question: "Qual é o investimento necessário?",
    answer:
      "Oferecemos planos a partir de R$ 79,90/mês (Essencial), R$ 99,90/mês (Pro) e R$ 119,90/mês (Supreme). A maioria dos nossos clientes recupera o investimento no primeiro mês.",
  },
  {
    question: "O SaaSKiller funciona para qualquer tipo de SaaS?",
    answer:
      "Sim! Nossa plataforma é versátil e funciona para SaaS B2B e B2C, desde ferramentas de produtividade até plataformas de e-commerce.",
  },
  {
    question: "Quais são as diferenças entre os planos?",
    answer:
      "O Essencial inclui os criadores de SaaS, Website e PRD. O Pro adiciona Meus Projetos, Gestão de Clientes, Histórico permanente, Aulas gravadas e Estratégia de criação. O Supreme inclui tudo do Pro mais Prospecção e Material Comercial.",
  },
];

const FAQItem = ({
  faq,
  open,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  open: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      className="relative"
      style={{ borderBottom: "1px solid rgba(var(--royal-rgb), 0.1)" }}
    >
      {/* Marcador vertical do item aberto */}
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full origin-center"
            style={{ background: "var(--electric)" }}
          />
        )}
      </AnimatePresence>

      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 pl-5 pr-2 text-left transition-colors duration-300"
      >
        <span
          className="text-sm sm:text-base font-medium transition-colors duration-300"
          style={{ color: open ? "var(--electric-hot)" : "var(--text-primary)" }}
        >
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pl-5 pr-8 pb-5 text-sm text-[var(--text-muted)] leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const { shouldReduceMotion } = usePerformance();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-28 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[720px]">
        {/* Header padrão */}
        <motion.div
          className="text-center mb-12"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="block text-xs font-medium tracking-[0.2em] text-[var(--electric)] mb-4">
            FAQ
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-[var(--text-muted)] text-lg">
            Tire suas dúvidas sobre o SaaSKiller
          </p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
