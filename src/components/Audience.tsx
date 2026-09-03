import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Zap, UserRound } from "lucide-react";
import { usePerformance } from "@/hooks/use-performance";

const profiles = [
  {
    icon: UserRound,
    title: "Founder solo",
    description:
      "Para quem quer lançar o primeiro produto sem contratar produto, design, desenvolvimento e vendas.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Freelancer ou agência",
    description:
      "Para quem precisa entregar Apps e Websites com mais velocidade, organização e margem.",
  },
  {
    icon: Zap,
    title: "Quem já utiliza IA",
    description:
      "Para quem conhece as ferramentas, mas ainda trava em prompts genéricos, projetos soltos e falta de direção comercial.",
  },
];

const Audience = () => {
  const { shouldReduceMotion } = usePerformance();

  return (
    <section id="para-quem" className="section-shell audience-section">
      <div className="site-container">
        <div className="section-heading section-heading--center">
          <span className="section-eyebrow">PARA QUEM É</span>
          <h2>Feita para quem precisa construir e vender.</h2>
        </div>

        <div className="audience-grid">
          {profiles.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              className="audience-profile"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <span className="audience-profile__index">0{index + 1}</span>
              <Icon className="h-5 w-5 text-gold" aria-hidden />
              <h3>{title}</h3>
              <p>{description}</p>
            </motion.article>
          ))}
        </div>

        <button
          type="button"
          className="text-link mx-auto"
          onClick={() =>
            document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Encontre seu caminho dentro da SaaSKiller
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </section>
  );
};

export default Audience;
