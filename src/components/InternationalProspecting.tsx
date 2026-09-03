import { motion } from "framer-motion";
import { Globe, Languages, Banknote, MessageCircle } from "lucide-react";
import { usePerformance } from "@/hooks/use-performance";

const flags = [
  {
    country: "Brasil",
    currency: "BRL",
    svg: (
      <svg viewBox="0 0 64 64" className="w-4 h-4 overflow-hidden rounded-sm" aria-label="Brasil">
        <path fill="#009b3a" d="M0 0h64v64H0z" />
        <path fill="#fedf00" d="M32 6L6 32l26 26 26-26z" />
        <circle cx="32" cy="32" r="14" fill="#002776" />
      </svg>
    ),
  },
  {
    country: "Portugal",
    currency: "EUR",
    svg: (
      <svg viewBox="0 0 64 64" className="w-4 h-4 overflow-hidden rounded-sm" aria-label="Portugal">
        <path fill="#006600" d="M0 0h24v64H0z" />
        <path fill="#ff0000" d="M24 0h40v64H24z" />
        <circle cx="24" cy="32" r="10" fill="#ffcc00" />
      </svg>
    ),
  },
  {
    country: "Estados Unidos",
    currency: "USD",
    svg: (
      <svg viewBox="0 0 64 64" className="w-4 h-4 overflow-hidden rounded-sm" aria-label="Estados Unidos">
        <path fill="#fff" d="M0 0h64v64H0z" />
        <path fill="#ff0000" d="M0 0h64v10H0zm0 18h64v10H0zm0 18h64v10H0zm0 18h64v10H0z" />
        <path fill="#000066" d="M0 0h32v36H0z" />
        <path fill="#fff" d="M4 4h4v4H4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zM4 12h4v4H4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zM4 20h4v4H4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zM4 28h4v4H4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4z" />
      </svg>
    ),
  },
  {
    country: "Espanha",
    currency: "EUR",
    svg: (
      <svg viewBox="0 0 64 64" className="w-4 h-4 overflow-hidden rounded-sm" aria-label="Espanha">
        <path fill="#c60b1e" d="M0 0h64v16H0zm0 48h64v16H0z" />
        <path fill="#ffc400" d="M0 16h64v32H0z" />
        <circle cx="20" cy="32" r="6" fill="#c60b1e" />
      </svg>
    ),
  },
  {
    country: "Itália",
    currency: "EUR",
    svg: (
      <svg viewBox="0 0 64 64" className="w-4 h-4 overflow-hidden rounded-sm" aria-label="Itália">
        <path fill="#009246" d="M0 0h21v64H0z" />
        <path fill="#fff" d="M21 0h22v64H21z" />
        <path fill="#ce2b37" d="M43 0h21v64H43z" />
      </svg>
    ),
  },
  {
    country: "França",
    currency: "EUR",
    svg: (
      <svg viewBox="0 0 64 64" className="w-4 h-4 overflow-hidden rounded-sm" aria-label="França">
        <path fill="#002654" d="M0 0h21v64H0z" />
        <path fill="#fff" d="M21 0h22v64H21z" />
        <path fill="#ed2939" d="M43 0h21v64H43z" />
      </svg>
    ),
  },
  {
    country: "Alemanha",
    currency: "EUR",
    svg: (
      <svg viewBox="0 0 64 64" className="w-4 h-4 overflow-hidden rounded-sm" aria-label="Alemanha">
        <path fill="#000" d="M0 0h64v21H0z" />
        <path fill="#dd0000" d="M0 21h64v22H0z" />
        <path fill="#ffce00" d="M0 43h64v21H0z" />
      </svg>
    ),
  },
];

const mockMessages = [
  {
    lang: "pt-BR",
    text: "Olá! Vi que sua clínica em São Paulo está com boa avaliação no Google, mas percebi que ainda não tem um sistema de agendamento online. Criei um app para resolver isso, quer dar uma olhada?",
  },
  {
    lang: "en-US",
    text: "Hi there! I noticed your clinic in NY has great Google reviews but seems to lack an online booking system. I built a custom app that solves this, would you be interested in taking a look?",
  },
  {
    lang: "es-ES",
    text: "¡Hola! Vi que su clínica en Madrid tiene buenas reseñas en Google, pero noté que aún no tiene un sistema de reservas en línea. He creado una app para solucionarlo, ¿te gustaría echar un vistazo?",
  },
];

const MessageMockup = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-16 bg-[#09090b] rounded-xl border border-white/[0.08] overflow-hidden shadow-2xl relative">
      <div className="h-10 border-b border-white/[0.08] bg-white/[0.02] flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="mx-auto flex items-center gap-2">
          <MessageCircle className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span className="text-[10px] font-bold text-white/50 tracking-wider">GERADOR DE ABORDAGEM</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
        {mockMessages.map((msg, i) => (
          <div key={i} className="p-6 flex flex-col gap-4 relative group">
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.05] text-[10px] font-bold text-[var(--gold)] tracking-widest">
                {msg.lang}
              </div>
            </div>
            <div className="font-mono text-sm leading-relaxed text-white/70 group-hover:text-white/90 transition-colors">
              {msg.text}
            </div>
            <div className="absolute inset-0 bg-[var(--gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

const InternationalProspecting = () => {
  const { shouldReduceMotion } = usePerformance();

  const animationProps = shouldReduceMotion
    ? { initial: false, whileInView: {} }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.5 },
      };

  return (
    <section id="prospeccao-internacional" className="section-shell relative">
      {/* Decoração de Fundo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[var(--royal-deep)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"
        aria-hidden
      />

      <div className="site-container relative z-10">
        <header className="section-heading section-heading--center">
          <span className="section-eyebrow">PROSPECÇÃO INTERNACIONAL</span>
          <h2>Venda em 7 países, não só no Brasil</h2>
          <p>
            Prospecte empresas reais na Europa e nos EUA e receba a mensagem de
            abordagem pronta no idioma do cliente.
          </p>
        </header>

        {/* Linha de Bandeiras */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-16"
          {...animationProps}
        >
          {flags.map((flag) => (
            <div
              key={flag.country}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors"
            >
              {flag.svg}
              <span className="text-sm font-medium text-white/80">
                {flag.country}{" "}
                <span className="text-white/40 text-xs ml-1">
                  ({flag.currency})
                </span>
              </span>
            </div>
          ))}
        </motion.div>

        {/* Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="p-8 rounded-xl bg-[var(--card)] border border-[var(--border)] relative overflow-hidden group"
            {...animationProps}
            transition={{ delay: shouldReduceMotion ? 0 : 0.1 }}
          >
            <div className="w-12 h-12 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-[var(--gold)]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Busca de empresas por cidade
            </h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              Encontre negócios locais qualificados em mercados internacionais
              através de um fluxo automatizado.
            </p>
          </motion.div>

          <motion.div
            className="p-8 rounded-xl bg-[var(--card)] border border-[var(--border)] relative overflow-hidden group"
            {...animationProps}
            transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
          >
            <div className="w-12 h-12 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center mb-6">
              <Languages className="w-6 h-6 text-[var(--gold)]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Abordagem no idioma nativo
            </h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              Gere scripts de venda no idioma exato do seu lead, quebrando
              barreiras e aumentando a conversão.
            </p>
          </motion.div>

          <motion.div
            className="p-8 rounded-xl bg-[var(--card)] border border-[var(--border)] relative overflow-hidden group"
            {...animationProps}
            transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
          >
            <div className="w-12 h-12 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center mb-6">
              <Banknote className="w-6 h-6 text-[var(--gold)]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Cobre em Euro ou Dólar
            </h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              Multiplique o ticket do seu projeto vendendo para clientes dispostos
              a pagar na moeda local deles.
            </p>
          </motion.div>
        </div>

        {/* Mockup */}
        <motion.div {...animationProps} transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}>
          <MessageMockup />
        </motion.div>
      </div>
    </section>
  );
};

export default InternationalProspecting;
