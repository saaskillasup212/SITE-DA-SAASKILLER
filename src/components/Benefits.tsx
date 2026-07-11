import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Wand2,
  Globe,
  MapPin,
  Users,
  PlayCircle,
  FileText,
  LucideIcon,
} from "lucide-react";
import { usePerformance } from "@/hooks/use-performance";
import { cn } from "@/lib/utils";

/**
 * RECURSOS — PATCH 2 (Tempestade Elétrica Premium).
 * Grid quebrado 12 colunas: 2 cards grandes (produto principal) + 4 compactos.
 * Tilt 3D + spotlight seguindo o mouse.
 */

interface Recurso {
  icon: LucideIcon;
  title: string;
  description: string;
  large?: boolean;
}

const recursos: Recurso[] = [
  {
    icon: Wand2,
    title: "Criador de SaaS",
    description: "Wizard que transforma sua ideia em PRD completo + prompt pronto pra colar.",
    large: true,
  },
  {
    icon: Globe,
    title: "Criador de Websites",
    description: "Landing pages com CRO, SEO e design system gerados em minutos.",
    large: true,
  },
  {
    icon: MapPin,
    title: "Prospecção Inteligente",
    description: "Encontre clientes reais no mapa e exporte leads prontos.",
  },
  {
    icon: Users,
    title: "Gestão de Clientes",
    description: "Pipeline, histórico e evolução de cada projeto num lugar.",
  },
  {
    icon: PlayCircle,
    title: "Aulas Gravadas",
    description: "Do zero ao primeiro cliente, passo a passo.",
  },
  {
    icon: FileText,
    title: "Material Comercial",
    description: "Contratos, propostas e abordagens prontos pra fechar.",
  },
];

/* Micro-preview abstrata (skeleton do wizard/blueprint) nos cards grandes */
const MicroPreview = () => (
  <div className="mt-6 rounded-xl border border-[rgba(var(--royal-rgb),0.1)] bg-[var(--bg-elevated)] p-4 space-y-2.5 overflow-hidden">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-md bg-[rgba(var(--royal-rgb),0.25)] preview-shape" />
      <div className="h-2.5 w-2/5 rounded-full bg-[rgba(var(--royal-rgb),0.18)] preview-shape" />
    </div>
    <div className="h-2 w-4/5 rounded-full bg-white/[0.07] preview-shape" />
    <div className="h-2 w-3/5 rounded-full bg-white/[0.05] preview-shape" />
    <div className="flex gap-2 pt-1">
      <div className="h-6 w-20 rounded-md bg-[rgba(var(--royal-rgb),0.2)] preview-shape" />
      <div className="h-6 w-14 rounded-md bg-white/[0.05] preview-shape" />
    </div>
  </div>
);

const RecursoCard = ({ recurso, index }: { recurso: Recurso; index: number }) => {
  const { isMobile, shouldReduceMotion } = usePerformance();
  const disable = isMobile || shouldReduceMotion;
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = recurso.icon;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 22 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disable || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 12); // até 6deg pra cada lado
    rotateX.set((0.5 - py) * 12);
    cardRef.current.style.setProperty("--mouse-x", `${px * 100}%`);
    cardRef.current.style.setProperty("--mouse-y", `${py * 100}%`);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className={cn(
        "col-span-12",
        recurso.large ? "md:col-span-6" : "sm:col-span-6 md:col-span-3"
      )}
      initial={disable ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="recurso-card group relative h-full rounded-[20px] p-6 sm:p-7 transition-shadow duration-300"
        style={{
          rotateX: disable ? 0 : springX,
          rotateY: disable ? 0 : springY,
          background: "var(--bg-surface)",
          border: "1px solid rgba(var(--royal-rgb), 0.12)",
          transformStyle: "preserve-3d",
        }}
        whileHover={disable ? {} : { y: -4 }}
      >
        {/* Spotlight seguindo o mouse */}
        <div
          className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "radial-gradient(320px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--royal-rgb), 0.1), transparent 70%)",
          }}
        />
        {/* Borda superior — gradient line que acende no hover */}
        <div
          className="absolute top-0 left-5 right-5 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, var(--electric), transparent)",
          }}
        />

        <div className="relative">
          {/* Ícone */}
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
            style={{ background: "var(--bg-elevated)" }}
            whileHover={disable ? {} : { scale: 1.1, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
          >
            <Icon className="w-[22px] h-[22px] text-[var(--text-muted)] group-hover:text-[var(--electric-hot)] transition-colors duration-300" />
          </motion.div>

          <h3 className="font-display font-semibold text-lg sm:text-xl text-[var(--text-primary)] mb-2">
            {recurso.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            {recurso.description}
          </p>

          {recurso.large && <MicroPreview />}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Benefits = () => {
  const { shouldReduceMotion } = usePerformance();

  return (
    <section id="benefits" className="py-20 sm:py-28 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header padrão da seção */}
        <motion.div
          className="text-center mb-14 sm:mb-16"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="block text-xs font-medium tracking-[0.2em] text-[var(--electric)] mb-4">
            RECURSOS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)]">
            Tudo que você precisa. Num lugar só.
          </h2>
        </motion.div>

        {/* Grid quebrado: 2 grandes + 4 compactos */}
        <div className="grid grid-cols-12 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {recursos.map((recurso, index) => (
            <RecursoCard key={recurso.title} recurso={recurso} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
