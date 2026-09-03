import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Blocks, Rocket, ScanLine, ListTodo, LayoutTemplate, Code2, Bot } from "lucide-react";
import { usePerformance } from "@/hooks/use-performance";

const StructMockup = () => (
  <div className="w-full h-[159px] bg-[#09090b] flex overflow-hidden border-t-0 rounded-b-md relative select-none font-sans">
    <div className="w-14 border-r border-white/[0.08] flex flex-col items-center py-4 gap-3 bg-white/[0.02]">
      <div className="w-6 h-6 rounded-md bg-[#e2ad2d]/20 border border-[#e2ad2d]/30 flex items-center justify-center shadow-[0_0_10px_rgba(226,173,45,0.1)]">
        <Bot className="w-3.5 h-3.5 text-[#e2ad2d]" />
      </div>
      <div className="w-7 h-5 rounded bg-white/[0.05] flex items-center justify-center text-[6px] font-bold text-white/50 border border-white/[0.05]">CHAT</div>
      <div className="w-7 h-5 rounded bg-white/[0.02] flex items-center justify-center text-[6px] font-bold text-white/30 border border-transparent">DOCS</div>
    </div>
    <div className="flex-1 p-3 flex flex-col gap-2 relative">
       <div className="flex items-center gap-1.5 mb-1 border-b border-white/[0.05] pb-2">
         <ListTodo className="w-2.5 h-2.5 text-[#e2ad2d]" />
         <span className="text-[7px] font-bold text-[#e2ad2d] tracking-wider uppercase">Wizard: Objetivo do Projeto</span>
       </div>
       <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
         <div className="w-[85%] bg-white/[0.03] rounded border border-white/[0.05] p-2 flex flex-col">
           <span className="text-[7px] text-white/70 leading-relaxed font-medium">Qual o principal problema que o seu novo Micro-SaaS vai resolver?</span>
         </div>
         <div className="w-[90%] bg-[#e2ad2d]/[0.08] rounded border border-[#e2ad2d]/30 p-2 flex flex-col ml-auto shadow-[0_0_8px_rgba(226,173,45,0.05)]">
           <span className="text-[7px] text-[#e2ad2d]/90 leading-relaxed font-medium text-right">Vai ajudar clínicas odontológicas a reduzirem as faltas dos pacientes enviando lembretes automatizados.</span>
         </div>
       </div>
       <div className="h-6 bg-[#121214] border border-white/[0.08] rounded flex items-center px-2 justify-between">
         <span className="text-[6.5px] text-white/30">Descreva sua solução...</span>
         <div className="w-4 h-3.5 rounded bg-[#e2ad2d] flex items-center justify-center shadow-sm">
            <div className="w-1.5 h-1.5 bg-black/80 rounded-sm" />
         </div>
       </div>
    </div>
  </div>
);

const BuilderMockup = () => (
  <div className="w-full h-[159px] bg-[#09090b] flex overflow-hidden border-t-0 rounded-b-md relative select-none font-sans">
    <div className="flex-1 flex flex-col">
      <div className="h-7 border-b border-white/[0.08] bg-white/[0.02] flex items-center px-3 justify-between">
        <div className="flex items-center gap-1.5">
          <Code2 className="w-2.5 h-2.5 text-[#e2ad2d]" />
          <span className="text-[7px] font-bold text-[#e2ad2d] tracking-wider uppercase">Gerador de Código / Lovable</span>
        </div>
        <div className="flex gap-1.5">
           <div className="px-2 py-0.5 rounded bg-[#e2ad2d]/10 text-[6px] text-[#e2ad2d] font-bold border border-[#e2ad2d]/20">Sync</div>
        </div>
      </div>
      <div className="flex-1 flex p-2 gap-2">
        <div className="w-[45%] h-full bg-[#121214] rounded border border-white/[0.08] p-2 flex flex-col gap-1.5 shadow-inner">
           <div className="flex items-center gap-1.5 mb-0.5">
             <Bot className="w-2 h-2 text-white/40" />
             <span className="text-[6px] text-white/40 font-bold tracking-widest">PROMPT</span>
           </div>
           <span className="text-[6.5px] text-white/70 leading-relaxed font-mono">
             "Crie uma landing page moderna para SaaS de clínicas, dark mode, com hero section focada em 'Aumente conversões'..."
           </span>
           <div className="mt-auto flex items-center gap-1.5 text-[5px] text-[#e2ad2d] font-mono font-bold tracking-wider">
             <div className="w-1.5 h-1.5 rounded-full bg-[#e2ad2d] animate-pulse" />
             GENERATING...
           </div>
        </div>
        <div className="flex-1 h-full bg-black/50 rounded border border-white/[0.08] p-3 flex flex-col items-center justify-center gap-1 shadow-inner relative overflow-hidden">
           <span className="text-[10px] font-extrabold text-white/90 text-center tracking-tight">Aumente suas conversões</span>
           <span className="text-[6px] text-white/50 text-center max-w-[90%] leading-relaxed">Crie páginas incríveis usando blocos intuitivos de alta conversão sem digitar código.</span>
           <div className="mt-2 px-3 py-1.5 rounded bg-[#e2ad2d] text-black text-[6px] font-bold shadow-md">Começar Teste Grátis</div>
           
           <div className="absolute top-2 left-2 flex items-center gap-1 text-[5px] text-[#27c93f] uppercase font-bold tracking-wider">
             <LayoutTemplate className="w-2 h-2" />
             Preview
           </div>
           
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-t from-[#e2ad2d]/10 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  </div>
);

type Step = {
  number: string;
  title: string;
  icon: typeof ScanLine;
  description: string;
  note: string;
  media: ReactNode | null;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Estruture",
    icon: ScanLine,
    description:
      "Responda ao wizard e transforme sua ideia em escopo, arquitetura, fluxos e direção visual.",
    note: "15 perguntas guiadas",
    media: <StructMockup />,
  },
  {
    number: "02",
    title: "Construa",
    icon: Blocks,
    description:
      "Leve o prompt especializado para Lovable, Codex, Antigravity, Bolt, Cursor ou sua ferramenta preferida.",
    note: "Blueprint + prompt especializado",
    media: <BuilderMockup />,
  },
  {
    number: "03",
    title: "Opere e venda",
    icon: Rocket,
    description:
      "Salve versões, organize clientes, encontre leads e transforme o projeto em uma operação comercial.",
    note: "Projeto → cliente → venda",
    media: null,
  },
];

const OperationFlow = () => (
  <div className="operation-flow" aria-label="Fluxo do projeto até a venda">
    {["PROJETO", "CLIENTE", "VENDA"].map((label, index) => (
      <div key={label}>
        <span>0{index + 1}</span>
        <strong>{label}</strong>
      </div>
    ))}
  </div>
);

const HowItWorks = () => {
  const ref = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = usePerformance();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.55"],
  });
  const lineProgress = useTransform(scrollYProgress, [0.08, 0.9], [0, 1]);

  return (
    <section ref={ref} id="how-it-works" className="section-shell how-section relative">
      <div className="site-container">
        <div className="section-heading section-heading--center">
          <span className="section-eyebrow">COMO FUNCIONA</span>
          <h2>Da ideia ao mercado em três movimentos.</h2>
        </div>

        <div className="how-timeline">
          <div className="how-filament" aria-hidden>
            <span className="how-filament__track" />
            <motion.span
              className="how-filament__current"
              style={{ scaleY: shouldReduceMotion ? 1 : lineProgress }}
            />
          </div>

          {steps.map(({ icon: Icon, ...step }, index) => (
            <motion.article
              key={step.number}
              className={`how-step ${index % 2 ? "how-step--reverse" : ""}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.55 }}
            >
              <div className="how-step__number" aria-hidden>
                {step.number}
              </div>
              <span className="how-step__node">
                <Icon aria-hidden />
              </span>
              <div className="how-step__copy">
                <span className="section-eyebrow">MOVIMENTO {step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <small>{step.note}</small>
              </div>
              <div className="how-step__media">
                {step.media ? (
                  <>
                    <div className="interface-frame__bar">
                      <span />
                      <span />
                      <span />
                      <small>INTERFACE ESTRUTURAL</small>
                    </div>
                    {step.media}
                  </>
                ) : (
                  <OperationFlow />
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
