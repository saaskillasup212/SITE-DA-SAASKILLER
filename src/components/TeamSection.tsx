import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { team, type TeamMember } from "@/content/team";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePerformance } from "@/hooks/use-performance";
import { trackEvent } from "@/lib/analytics";

const TeamPortrait = ({
  member,
  priority = false,
}: {
  member: TeamMember;
  priority?: boolean;
}) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`team-portrait team-portrait--${member.id}`}
      aria-label={`Retrato de ${member.name}`}
    >
      {!loaded && (
        <div className="team-portrait__fallback" aria-hidden>
          <span>{member.initials}</span>
          <small>FOTO EM PREPARAÇÃO</small>
        </div>
      )}
      {!failed && (
        <img
          src={member.photoUrl}
          alt={member.name}
          width={1440}
          height={1920}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={loaded ? "is-loaded" : ""}
        />
      )}
      <span className="team-portrait__light" aria-hidden />
    </div>
  );
};

const TeamStory = ({ member }: { member: TeamMember }) => (
  <div className="team-story">
    <span className="team-story__badge">{member.badge}</span>
    <h3>{member.name}</h3>
    <p className="team-story__role">{member.role}</p>
    <div className="team-story__copy">
      {member.story.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
    <blockquote>{member.quote}</blockquote>
  </div>
);

const TeamChapter = ({
  member,
  reverse = false,
  mobile = false,
}: {
  member: TeamMember;
  reverse?: boolean;
  mobile?: boolean;
}) => (
  <article
    className={`team-chapter ${reverse ? "team-chapter--reverse" : ""} ${
      mobile ? "team-chapter--mobile" : ""
    }`}
  >
    <div className="team-chapter__heading">
      <span className="section-eyebrow">
        PLAYERS DA OPERAÇÃO · {member.id === "ruan-pablo" ? "01" : "02"}
      </span>
      <h2>
        Conheça quem transforma ideias em{" "}
        <span className="text-gold">produtos que vendem.</span>
      </h2>
    </div>
    <TeamPortrait member={member} />
    <TeamStory member={member} />
  </article>
);

const TeamConvergence = () => (
  <div className="team-convergence">
    <div className="team-convergence__mark" aria-hidden>
      <span className="team-convergence__gold" />
      <span className="team-convergence__violet" />
      <span className="team-convergence__core">S</span>
    </div>
    <div className="team-convergence__words" aria-label="Áreas conectadas">
      {["Produto", "Design", "Desenvolvimento", "Marketing", "Vendas"].map(
        (word) => (
          <span key={word}>{word}</span>
        ),
      )}
    </div>
    <h3>
      Duas forças.
      <br />
      <span className="text-gold">Uma operação inteira.</span>
    </h3>
    <p>
      A SaaSKiller conecta a estratégia que leva ao mercado com a execução que
      coloca o produto no ar.
    </p>
    <button
      type="button"
      className="button-primary"
      onClick={() => {
        trackEvent("team_cta_click", { origin: "team_convergence" });
        document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      Colocar minha ideia em operação
      <ArrowRight aria-hidden />
    </button>
  </div>
);

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { shouldReduceMotion } = usePerformance();
  const [activeScene, setActiveScene] = useState<
    "intro" | "ruan" | "mathias" | "convergence"
  >("intro");
  const viewedRef = useRef(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const currentHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const introOpacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.08, 0.12],
    [1, 1, 0, 0],
  );
  const introY = useTransform(scrollYProgress, [0, 0.12], [0, -18]);
  const ruanOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.42, 0.5],
    [0, 1, 1, 0],
  );
  const ruanX = useTransform(
    scrollYProgress,
    [0, 0.08, 0.42, 0.5],
    [-24, 0, 0, -12],
  );
  const mathiasOpacity = useTransform(
    scrollYProgress,
    [0.42, 0.5, 0.84, 0.92],
    [0, 1, 1, 0],
  );
  const mathiasX = useTransform(
    scrollYProgress,
    [0.42, 0.5, 0.84, 0.92],
    [24, 0, 0, -12],
  );
  const convergenceOpacity = useTransform(
    scrollYProgress,
    [0.84, 0.92, 1],
    [0, 1, 1],
  );
  const convergenceScale = useTransform(
    scrollYProgress,
    [0.84, 0.92],
    [0.97, 1],
  );

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!viewedRef.current && value > 0.02) {
      viewedRef.current = true;
      trackEvent("team_section_view", { origin: "homepage" });
    }

    if (value < 0.04) setActiveScene("intro");
    else if (value < 0.46) setActiveScene("ruan");
    else if (value < 0.88) setActiveScene("mathias");
    else setActiveScene("convergence");
  });

  const useCinematic = desktop && !shouldReduceMotion;

  return (
    <section
      ref={sectionRef}
      id="quem-somos"
      className={`relative ${useCinematic ? "team-section team-section--cinematic" : "team-section"}`}
    >
      {useCinematic ? (
        <div className="team-sticky">
          <div className="team-sticky__progress" aria-hidden>
            <motion.span style={{ height: currentHeight }} />
          </div>
          <div className="team-sticky__currents" aria-hidden>
            <span className="team-current team-current--gold" />
            <span className="team-current team-current--violet" />
          </div>
          <motion.div
            className="team-intro team-scene"
            style={{
              opacity: introOpacity,
              y: introY,
              pointerEvents: activeScene === "intro" ? "auto" : "none",
            }}
            aria-hidden={activeScene !== "intro"}
          >
            <span className="section-eyebrow">POR TRÁS DA OPERAÇÃO</span>
            <div className="team-intro__core" aria-hidden>
              <span />
            </div>
            <h2>
              Estratégia para vender.
              <br />
              <span className="text-violet">Execução para colocar no ar.</span>
            </h2>
            <p>
              A SaaSKiller une duas forças que normalmente ficam separadas:
              transformar um produto em uma oferta desejada e transformar uma ideia
              em algo real, funcional e pronto para o mercado.
            </p>
          </motion.div>

          <motion.div
            className="team-stage team-scene"
            style={{
              opacity: ruanOpacity,
              x: ruanX,
              pointerEvents: activeScene === "ruan" ? "auto" : "none",
            }}
            aria-hidden={activeScene !== "ruan"}
          >
            <TeamChapter member={team[0]} />
          </motion.div>

          <motion.div
            className="team-stage team-scene"
            style={{
              opacity: mathiasOpacity,
              x: mathiasX,
              pointerEvents: activeScene === "mathias" ? "auto" : "none",
            }}
            aria-hidden={activeScene !== "mathias"}
          >
            <TeamChapter member={team[1]} reverse />
          </motion.div>

          <motion.div
            className="team-stage team-scene"
            style={{
              opacity: convergenceOpacity,
              scale: convergenceScale,
              pointerEvents: activeScene === "convergence" ? "auto" : "none",
            }}
            aria-hidden={activeScene !== "convergence"}
          >
            <TeamConvergence />
          </motion.div>
        </div>
      ) : (
        <div className="site-container team-mobile-layout">
          <div className="section-heading section-heading--center">
            <span className="section-eyebrow">POR TRÁS DA OPERAÇÃO</span>
            <h2>
              Estratégia para vender.
              <br />
              <span className="text-violet">Execução para colocar no ar.</span>
            </h2>
            <p>
              A SaaSKiller une direção de mercado e execução de produto em uma
              operação que uma pessoa consegue conduzir.
            </p>
          </div>
          <TeamChapter member={team[0]} mobile />
          <div className="team-mobile-transition">
            <span>Toda operação precisa de duas forças.</span>
            <strong>Direção para vender. Execução para acontecer.</strong>
          </div>
          <TeamChapter member={team[1]} reverse mobile />
          <TeamConvergence />
        </div>
      )}
    </section>
  );
};

export default TeamSection;
