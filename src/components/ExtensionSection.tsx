import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Gift, Infinity as InfinityIcon, Zap } from "lucide-react";
import { usePerformance } from "@/hooks/use-performance";
import { cn } from "@/lib/utils";

/**
 * EXTENSÃO DE PUBLICAÇÃO — PATCH 5 (Tempestade Elétrica Premium).
 * Vitrine com toggle de segmento. TABELA COMERCIAL REAL — não alterar:
 * 1 Dia 19/16/14/12 · 7 Dias 39/33/29/25 · 15 Dias 69/59/51/39,90
 * 30 Dias 97/82/71/69 · Vitalícia 197/167/137/107
 */

const APP_SIGNUP_URL = "https://brsaaskiller.lovable.app/";

type Segment = "none" | "essencial" | "pro" | "supreme";

const segments: { id: Segment; label: string }[] = [
  { id: "none", label: "Sem plano" },
  { id: "essencial", label: "Com Essencial" },
  { id: "pro", label: "Com Pro" },
  { id: "supreme", label: "Com Supreme 👑" },
];

const segmentNames: Record<Exclude<Segment, "none">, string> = {
  essencial: "Essencial",
  pro: "Pro",
  supreme: "Supreme",
};

interface Duration {
  label: string;
  prices: Record<Segment, number>;
  hero?: boolean;
}

const durations: Duration[] = [
  { label: "1 Dia", prices: { none: 19, essencial: 16, pro: 14, supreme: 12 } },
  { label: "7 Dias", prices: { none: 39, essencial: 33, pro: 29, supreme: 25 } },
  { label: "15 Dias", prices: { none: 69, essencial: 59, pro: 51, supreme: 39.9 } },
  { label: "30 Dias", prices: { none: 97, essencial: 82, pro: 71, supreme: 69 } },
  { label: "Vitalícia", prices: { none: 197, essencial: 167, pro: 137, supreme: 107 }, hero: true },
];

const formatBRL = (v: number) =>
  v % 1 === 0
    ? v.toString()
    : v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const ExtensionCard = ({
  duration,
  segment,
}: {
  duration: Duration;
  segment: Segment;
}) => {
  const price = duration.prices[segment];
  const basePrice = duration.prices.none;
  const savings = basePrice - price;
  const hero = !!duration.hero;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl p-5 sm:p-6 snap-center shrink-0 w-[240px] md:w-auto md:shrink md:flex-1 transition-transform duration-300 hover:-translate-y-1.5"
      )}
      style={{
        background: hero ? "var(--bg-elevated)" : "var(--bg-surface)",
        border: hero
          ? "1.5px solid var(--electric)"
          : "1px solid rgba(var(--royal-rgb), 0.12)",
        boxShadow: hero ? "0 0 40px rgba(var(--electric-rgb), 0.3)" : "none",
      }}
    >
      {/* Badge flutuante da Vitalícia */}
      {hero && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap"
          style={{ background: "var(--electric)", color: "var(--bg-void)" }}
        >
          ∞ Vitalícia · Preço de lançamento
        </span>
      )}

      <div className="flex items-center gap-2 mb-4 mt-1">
        {hero ? (
          <InfinityIcon className="w-4 h-4 text-[var(--electric-hot)]" />
        ) : (
          <Clock className="w-4 h-4 text-[var(--text-muted)]" />
        )}
        <span className="font-display font-semibold text-[var(--text-primary)]">
          {duration.label}
        </span>
      </div>

      {/* Preço com morph animado */}
      <div className="mb-1 min-h-[46px]">
        <div className="flex items-baseline gap-1 overflow-hidden">
          <span className="text-[var(--text-muted)] text-sm">R$</span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={`${duration.label}-${segment}`}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="font-display font-bold text-3xl text-[var(--text-primary)] inline-block"
            >
              {formatBRL(price)}
            </motion.span>
          </AnimatePresence>
        </div>
        {/* Preço base riscado + economia */}
        <div className="h-5 mt-1">
          {segment !== "none" && savings > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-xs"
            >
              <span className="line-through text-[var(--text-muted)] opacity-60">
                R$ {formatBRL(basePrice)}
              </span>
              <span
                className="px-1.5 py-0.5 rounded font-semibold"
                style={{ background: "rgba(52,211,153,0.15)", color: "var(--success)" }}
              >
                -R$ {formatBRL(savings)}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Selo */}
      <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] mb-5">
        <Zap className="w-3 h-3 text-[var(--electric)]" /> Ativação em segundos
      </span>

      <a
        href={APP_SIGNUP_URL}
        className="mt-auto flex items-center justify-center py-2.5 rounded-lg text-sm font-bold transition-all duration-300"
        style={
          hero
            ? {
                background: "var(--electric)",
                color: "var(--bg-void)",
                boxShadow: "0 0 20px rgba(var(--electric-rgb), 0.35)",
              }
            : {
                border: "1px solid rgba(var(--electric-rgb), 0.3)",
                color: "var(--text-primary)",
              }
        }
      >
        Ativar
      </a>
    </div>
  );
};

const ExtensionSection = () => {
  const { shouldReduceMotion } = usePerformance();
  const [segment, setSegment] = useState<Segment>("none");

  const vitaliciaSavings =
    segment === "none" ? 0 : 197 - durations[4].prices[segment];

  const scrollToPricing = () =>
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="extensao" className="py-20 sm:py-28 relative z-10 overflow-hidden">
      {/* Atmosfera própria da vitrine */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(var(--royal-deep-rgb), 0.06), transparent 75%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header padrão */}
        <motion.div
          className="text-center mb-10"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="block text-xs font-medium tracking-[0.2em] text-[var(--electric)] mb-4">
            EXTENSÃO DE PUBLICAÇÃO
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] mb-4">
            Do prompt ao site publicado. Em 1 clique.
          </h2>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
            Assinantes economizam até 46% — quanto maior o plano, maior o desconto.
          </p>
        </motion.div>

        {/* Banner teste grátis */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-10 rounded-2xl px-5 sm:px-7 py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid rgba(var(--royal-rgb), 0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-[var(--electric-hot)] shrink-0" />
            <p className="text-sm text-[var(--text-primary)]">
              <strong>Teste Grátis · 15 minutos</strong>{" "}
              <span className="text-[var(--text-muted)]">— sem cartão</span>
            </p>
          </div>
          <a
            href={APP_SIGNUP_URL}
            className="badge-shimmer px-5 py-2 rounded-lg text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap"
          >
            Testar agora
          </a>
        </motion.div>

        {/* Toggle de segmento */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {segments.map((s) => (
            <button
              key={s.id}
              onClick={() => setSegment(s.id)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={
                segment === s.id
                  ? { background: "var(--electric)", color: "var(--bg-void)" }
                  : {
                      border: "1px solid rgba(var(--electric-rgb), 0.2)",
                      color: "var(--text-muted)",
                      background: "transparent",
                    }
              }
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Faixa dinâmica de economia */}
        <div className="h-10 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            {segment !== "none" && (
              <motion.p
                key={segment}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-sm text-[var(--text-muted)] text-center"
              >
                💡 Assinando {segmentNames[segment]} você economiza até{" "}
                <strong className="text-[var(--success)]">
                  R$ {formatBRL(vitaliciaSavings)}
                </strong>{" "}
                na vitalícia ·{" "}
                <button
                  onClick={scrollToPricing}
                  className="underline underline-offset-2 text-[var(--electric-hot)] hover:text-[var(--electric)]"
                >
                  Ver planos
                </button>
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Cards — linha horizontal; mobile scroll-snap */}
        <div className="flex md:grid md:grid-cols-5 gap-4 max-w-6xl mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 px-1 pt-4">
          {durations.map((duration) => (
            <ExtensionCard key={duration.label} duration={duration} segment={segment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtensionSection;
