import { useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Boxes,
  BriefcaseBusiness,
  FileStack,
  Globe2,
  GraduationCap,
  MapPinned,
  Puzzle,
  Zap,
  Bot,
  ListTodo,
  LayoutTemplate,
  ScanLine,
  Code2,
  type LucideIcon,
} from "lucide-react";
import { usePerformance } from "@/hooks/use-performance";

const AppMockup = () => (
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

const WebMockup = () => (
  <div className="w-full h-[159px] bg-[#09090b] flex overflow-hidden border-t-0 rounded-b-md relative select-none font-sans">
    <div className="flex-1 flex flex-col">
      <div className="h-7 border-b border-white/[0.08] bg-white/[0.02] flex items-center px-3 justify-between">
        <div className="flex items-center gap-1.5">
          <LayoutTemplate className="w-2.5 h-2.5 text-[#e2ad2d]" />
          <span className="text-[7px] font-bold text-[#e2ad2d] tracking-wider">PAGE BUILDER</span>
        </div>
        <div className="flex gap-1.5">
           <div className="px-2 py-0.5 rounded bg-white/10 text-[6px] text-white font-medium">Preview</div>
           <div className="px-2 py-0.5 rounded bg-[#e2ad2d] text-[6px] text-black font-bold">Publicar</div>
        </div>
      </div>
      <div className="flex-1 flex p-2 gap-2">
        <div className="w-[28%] h-full bg-white/[0.02] rounded border border-white/[0.05] p-2 flex flex-col gap-1.5">
           <span className="text-[6px] text-white/40 font-bold mb-1 tracking-widest">SEÇÕES</span>
           <div className="w-full bg-white/[0.06] rounded-sm p-1.5 text-[6px] font-medium text-white/90 border border-white/10 border-l-2 border-l-[#e2ad2d]">Hero Section</div>
           <div className="w-full bg-white/[0.02] rounded-sm p-1.5 text-[6px] font-medium text-white/50 border border-transparent hover:bg-white/[0.04]">Lista de Benefícios</div>
           <div className="w-full bg-white/[0.02] rounded-sm p-1.5 text-[6px] font-medium text-white/50 border border-transparent hover:bg-white/[0.04]">Tabela de Preços</div>
        </div>
        <div className="flex-1 h-full bg-[#121214] rounded border border-white/[0.08] p-3 flex flex-col items-center justify-center gap-1 shadow-inner relative overflow-hidden">
           <span className="text-[10px] font-extrabold text-white/90 text-center tracking-tight">Aumente suas conversões</span>
           <span className="text-[6px] text-white/50 text-center max-w-[90%] leading-relaxed">Crie páginas incríveis usando blocos intuitivos de alta conversão sem digitar código.</span>
           <div className="mt-2 px-3 py-1.5 rounded bg-[#e2ad2d] text-black text-[6px] font-bold shadow-md">Começar Teste Grátis</div>
           
           <div className="absolute top-2 left-2 text-[5px] text-white/20 uppercase font-bold">Canvas (1200px)</div>
        </div>
      </div>
    </div>
  </div>
);

const ListMockup = ({ title, icon: Icon, items = [] }: { title: string; icon: LucideIcon; items?: { name: string; tag: string; tagColor: string }[] }) => (
  <div className="w-full h-[159px] bg-[#09090b] flex flex-col overflow-hidden border-t-0 rounded-b-md relative select-none font-sans">
    <div className="h-7 border-b border-white/[0.08] bg-white/[0.02] flex items-center px-3 justify-between">
      <div className="flex items-center gap-1.5">
        <Icon className="w-2.5 h-2.5 text-[#e2ad2d]" />
        <span className="text-[7.5px] font-bold text-[#e2ad2d] tracking-wider uppercase">{title}</span>
      </div>
      <div className="px-2.5 py-0.5 rounded bg-[#e2ad2d]/10 border border-[#e2ad2d]/30 text-[#e2ad2d] text-[6.5px] font-bold hover:bg-[#e2ad2d]/20">+ NOVO</div>
    </div>
    <div className="flex-1 p-2.5 flex flex-col gap-1.5">
       <div className="flex px-2 pb-0.5 text-[6px] font-bold text-white/30 tracking-wider">
         <div className="flex-1">NOME DO ITEM</div>
         <div className="w-16 text-right mr-1">STATUS</div>
       </div>
       {items.map((item, i) => (
         <div key={i} className="w-full h-8 bg-white/[0.02] hover:bg-white/[0.05] rounded border border-white/[0.05] flex items-center px-2 justify-between transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-white/[0.06] flex items-center justify-center border border-white/5">
                 <Icon className="w-2 h-2 text-white/50" />
              </div>
              <span className="text-[7.5px] text-white/80 font-medium">{item.name}</span>
            </div>
            <div className={`px-1.5 py-0.5 rounded text-[5px] font-bold uppercase tracking-wider ${item.tagColor} border border-current/20`}>
              {item.tag}
            </div>
         </div>
       ))}
    </div>
  </div>
);

const ContentMockup = ({ title, icon: Icon, videoTitle = "Vídeo Aula", items = [] }: { title: string; icon: LucideIcon; videoTitle?: string; items?: string[] }) => (
  <div className="w-full h-[159px] bg-[#09090b] flex overflow-hidden border-t-0 rounded-b-md relative select-none font-sans">
    <div className="w-[38%] border-r border-white/[0.08] bg-white/[0.02] p-2.5 flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon className="w-2.5 h-2.5 text-[#e2ad2d]" />
        <span className="text-[7px] font-bold text-[#e2ad2d] tracking-wider uppercase">{title}</span>
      </div>
      {items.map((item, i) => (
        <div key={i} className={`w-full py-1.5 px-2 rounded border ${i === 0 ? 'bg-[#e2ad2d]/10 border-[#e2ad2d]/30 text-[#e2ad2d] shadow-[0_0_8px_rgba(226,173,45,0.05)]' : 'bg-white/[0.02] border-white/5 text-white/50 hover:bg-white/[0.05]'} text-[6.5px] font-medium transition-colors line-clamp-1`}>
          {item}
        </div>
      ))}
    </div>
    <div className="flex-1 bg-[#121214] p-3 flex flex-col gap-2 shadow-inner">
      <div className="w-full flex-1 bg-black/60 rounded border border-white/[0.08] flex flex-col items-center justify-center relative group overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-50" />
         <div className="w-7 h-7 rounded-full bg-[#e2ad2d]/90 hover:bg-[#e2ad2d] transition-colors flex items-center justify-center pl-1 mb-2 cursor-pointer shadow-[0_0_15px_rgba(226,173,45,0.3)] relative z-10">
            <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-black" />
         </div>
         <span className="text-[8px] font-bold text-white/90 relative z-10">{videoTitle}</span>
         <div className="absolute bottom-2 left-3 right-3 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-[45%] h-full bg-[#e2ad2d]" />
         </div>
      </div>
    </div>
  </div>
);

const ExtensionMockup = () => (
  <div className="w-full h-[159px] bg-[#09090b] flex flex-col overflow-hidden border-t-0 rounded-b-md relative select-none font-sans">
    <div className="h-6 border-b border-white/[0.08] bg-[#1a1a1c] flex items-center px-2.5 justify-between">
       <div className="flex gap-1">
         <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
         <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
         <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
       </div>
       <div className="flex gap-1.5 items-center">
         <div className="w-24 h-3 rounded bg-[#0a0a0b] border border-white/10 flex items-center justify-center">
            <span className="text-[5px] text-white/30">lovable.dev</span>
         </div>
         <div className="w-4 h-4 rounded bg-[#e2ad2d]/20 border border-[#e2ad2d]/30 flex items-center justify-center shadow-[0_0_8px_rgba(226,173,45,0.2)]">
           <Puzzle className="w-2 h-2 text-[#e2ad2d]" />
         </div>
       </div>
    </div>
    <div className="flex-1 bg-white/[0.01] p-2 flex justify-end">
       <div className="w-40 h-full bg-[#161618] border border-white/[0.1] rounded-md shadow-2xl flex flex-col p-2.5 gap-2 relative z-10">
          <div className="flex items-center gap-1.5 pb-1.5 border-b border-white/10">
             <div className="w-3.5 h-3.5 bg-[#e2ad2d] rounded-sm flex items-center justify-center shadow-sm">
                <Zap className="w-2.5 h-2.5 text-black" />
             </div>
             <span className="text-[8px] font-bold text-white/90">SaaSKiller Add-on</span>
          </div>
          <span className="text-[6px] font-bold text-white/40 tracking-wider">FERRAMENTAS</span>
          <div className="w-full py-2 px-2 bg-white/[0.04] hover:bg-white/[0.08] rounded border border-white/5 text-[7px] text-white/80 cursor-pointer flex items-center gap-1.5 transition-colors">
             <ScanLine className="w-2.5 h-2.5 text-[#e2ad2d]" /> 
             Capturar Blueprint Atual
          </div>
          <div className="w-full py-2 px-2 bg-white/[0.04] hover:bg-white/[0.08] rounded border border-white/5 text-[7px] text-white/80 cursor-pointer flex items-center gap-1.5 transition-colors">
             <Code2 className="w-2.5 h-2.5 text-[#e2ad2d]" /> 
             Gerar Prompt do View
          </div>
       </div>
    </div>
  </div>
);

type Module = {
  title: string;
  short: string;
  icon: LucideIcon;
  what: string;
  problem: string;
  result: string;
  mockup: ReactNode;
  isNew?: boolean;
};

const modules: Module[] = [
  {
    title: "Apps & Micro-SaaS",
    short: "APPS",
    icon: Boxes,
    what: "Transforma respostas guiadas em blueprint e prompt especializado.",
    problem: "Elimina o começo em branco e decisões técnicas soltas.",
    result: "Você sai com direção clara para construir o produto.",
    mockup: <AppMockup />,
  },
  {
    title: "Criador de Websites",
    short: "WEBSITES",
    icon: Globe2,
    what: "Organiza objetivo, conteúdo e estrutura da página em um fluxo único.",
    problem: "Elimina briefing incompleto e páginas sem direção comercial.",
    result: "Você leva um plano consistente para sua ferramenta de construção.",
    mockup: <WebMockup />,
  },
  {
    title: "Meus Projetos",
    short: "PROJETOS",
    icon: FileStack,
    what: "Guarda projetos, blueprints e versões para você continuar de onde parou.",
    problem: "Elimina entregas espalhadas em conversas e arquivos.",
    result: "Sua operação ganha histórico e continuidade.",
    mockup: <ListMockup title="MEUS PROJETOS" icon={FileStack} />,
  },
  {
    title: "Prospecção & CRM",
    short: "CRM",
    icon: MapPinned,
    what: "Conecta busca de potenciais clientes com organização comercial.",
    problem: "Elimina listas isoladas e contatos sem acompanhamento.",
    result: "A construção encontra um caminho até o primeiro cliente.",
    mockup: <ListMockup title="CRM E VENDAS" icon={MapPinned} />,
    isNew: true,
  },
  {
    title: "Academia",
    short: "ACADEMIA",
    icon: GraduationCap,
    what: "Reúne estratégias e aulas práticas para orientar a execução.",
    problem: "Elimina aprendizado desconectado do projeto em andamento.",
    result: "Você aplica conhecimento no momento em que precisa.",
    mockup: <ContentMockup title="AULAS" icon={GraduationCap} />,
  },
  {
    title: "Material comercial",
    short: "MATERIAIS",
    icon: BriefcaseBusiness,
    what: "Estrutura propostas e materiais para apresentar o produto.",
    problem: "Elimina a improvisação na hora de transformar produto em oferta.",
    result: "Você chega à conversa comercial com mais clareza.",
    mockup: <ContentMockup title="MATERIAIS" icon={BriefcaseBusiness} />,
  },
  {
    title: "Biblioteca de pistas",
    short: "PISTAS",
    icon: BookOpen,
    what: "Organiza 35 direções de produtos para explorar e validar.",
    problem: "Elimina a dependência de inspiração aleatória.",
    result: "Você começa por problemas e mercados mais concretos.",
    mockup: <ListMockup title="BIBLIOTECA" icon={BookOpen} />,
  },
  {
    title: "Extensão",
    short: "EXTENSÃO",
    icon: Puzzle,
    what: "Adiciona recursos complementares ao fluxo de trabalho no navegador.",
    problem: "Reduz trocas manuais durante tarefas recorrentes.",
    result: "Sua operação fica mais fluida sem confundir o add-on com o plano.",
    mockup: <ExtensionMockup />,
  },
];

const Benefits = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { shouldReduceMotion } = usePerformance();
  const active = modules[activeIndex];

  return (
    <section id="benefits" className="section-shell benefits-section">
      <div className="site-container">
        <div className="section-heading section-heading--center">
          <span className="section-eyebrow">DENTRO DA OPERAÇÃO</span>
          <h2>Tudo o que um founder solo precisa para operar.</h2>
          <p>
            Do planejamento à venda, cada módulo resolve uma etapa da mesma jornada.
          </p>
        </div>

        <div className="benefits-desktop">
          <div className="benefits-orbit" aria-label="Módulos da SaaSKiller">
            <div className="benefits-orbit__rings" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <div className="benefits-orbit__core">
              <Zap aria-hidden />
              <strong>SaaSKiller</strong>
              <small>UMA OPERAÇÃO</small>
            </div>
            {modules.map(({ title, short, icon: Icon, isNew }, index) => (
              <button
                type="button"
                key={title}
                className={`benefits-node benefits-node--${index + 1} ${
                  activeIndex === index ? "is-active" : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                aria-pressed={activeIndex === index}
              >
                <Icon aria-hidden />
                <span>{short}</span>
                {isNew && (
                  <span className="ml-2 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20 rounded">
                    Novo
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="benefits-detail">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, x: -10 }}
                transition={{ duration: 0.28 }}
              >
                <span className="benefits-detail__index">
                  MÓDULO {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <h3>{active.title}</h3>
                <div className="benefits-detail__preview">
                  <div className="interface-frame__bar">
                    <span />
                    <span />
                    <span />
                    <small>INTERFACE ESTRUTURAL</small>
                  </div>
                  {active.mockup}
                </div>
                <dl>
                  <div>
                    <dt>O que faz</dt>
                    <dd>{active.what}</dd>
                  </div>
                  <div>
                    <dt>O que elimina</dt>
                    <dd>{active.problem}</dd>
                  </div>
                  <div>
                    <dt>O que entrega</dt>
                    <dd>{active.result}</dd>
                  </div>
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="benefits-mobile">
          {modules.map(({ icon: Icon, ...module }, index) => (
            <motion.article
              key={module.title}
              className="benefits-mobile__item"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4 }}
            >
              <div className="benefits-mobile__heading">
                <span>0{index + 1}</span>
                <Icon aria-hidden />
                <h3>{module.title}</h3>
              </div>
              <p>{module.what}</p>
              <strong>{module.result}</strong>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
