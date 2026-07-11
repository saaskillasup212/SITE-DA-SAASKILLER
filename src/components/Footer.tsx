import { Link } from "react-router-dom";
import footerLogoGold from "@/assets/footer-logo-gold.png";
import { Mail } from "lucide-react";

/**
 * FOOTER — PATCH 7 (Tempestade Elétrica Premium).
 * Grid: logo+tagline | Produto | Suporte | Legal.
 * Aviso Legal (proteção jurídica) e dados da empresa mantidos.
 */

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const FooterAnchor = ({ id, children }: { id: string; children: string }) => (
  <button onClick={() => scrollTo(id)} className="footer-link text-sm text-left">
    {children}
  </button>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 pt-14 pb-10 overflow-hidden">
      {/* Divider superior gradient */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(var(--electric-rgb), 0.3), transparent)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid principal */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Logo + tagline */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={footerLogoGold}
                alt="SaaSKiller Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="font-display font-semibold text-lg text-[var(--text-primary)]">
                SaaS Killer
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] max-w-[280px] leading-relaxed">
              Crie, lance e venda Micro-SaaS com IA — do PRD ao primeiro cliente.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Mail className="w-4 h-4 text-[var(--electric)]" />
              <a href="mailto:suporte@saaskiller.com.br" className="footer-link text-sm">
                suporte@saaskiller.com.br
              </a>
            </div>
          </div>

          {/* Produto */}
          <div>
            <h4 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-4">
              Produto
            </h4>
            <div className="flex flex-col gap-2.5">
              <FooterAnchor id="benefits">Recursos</FooterAnchor>
              <FooterAnchor id="pricing">Planos</FooterAnchor>
              <FooterAnchor id="extensao">Extensão</FooterAnchor>
            </div>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-4">
              Suporte
            </h4>
            <div className="flex flex-col gap-2.5">
              <FooterAnchor id="faq">FAQ</FooterAnchor>
              <a href="mailto:suporte@saaskiller.com.br" className="footer-link text-sm">
                Contato
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-4">
              Legal
            </h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/termos-de-uso" className="footer-link text-sm">
                Termos de Uso
              </Link>
              <Link to="/politica-de-privacidade" className="footer-link text-sm">
                Privacidade
              </Link>
              <Link to="/politica-de-reembolso" className="footer-link text-sm">
                Reembolso
              </Link>
            </div>
          </div>
        </div>

        {/* Aviso Legal — proteção jurídica, não remover */}
        <div
          className="max-w-3xl mx-auto mb-10 p-4 rounded-xl"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid rgba(var(--royal-rgb), 0.08)",
          }}
        >
          <p className="text-xs text-[var(--text-muted)] opacity-80 text-center leading-relaxed">
            <strong className="text-[var(--text-muted)]">Aviso Legal:</strong> Os
            resultados apresentados neste site são exemplos e podem variar de acordo com
            diversos fatores, incluindo, mas não se limitando a: dedicação, conhecimento
            prévio, mercado de atuação e execução das estratégias. Não garantimos
            resultados específicos. Este produto não garante a obtenção de resultados.
            Qualquer referência ao desempenho de uma estratégia não deve ser interpretada
            como uma garantia de resultados.
          </p>
        </div>

        {/* Dados da empresa */}
        <div className="text-center mb-8 space-y-1">
          <p className="text-xs text-[var(--text-muted)] opacity-60">
            Razão Social: Infinity · CNPJ: 58.689.326/0001-58
          </p>
        </div>

        {/* Base */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(var(--royal-rgb), 0.08)" }}
        >
          <p className="text-xs text-[var(--text-muted)]">
            © {currentYear} SaaS Killer. Todos os direitos reservados.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Feito com ⚡ por founders, para founders
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
