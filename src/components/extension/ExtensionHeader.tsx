import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LightningMark from "@/components/LightningMark";

const links = [
  { href: "/", label: "SaaSKiller", isRoute: true },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#demonstracao", label: "Demonstração" },
  { href: "#periodos", label: "Períodos" },
  { href: "#faq-extensao", label: "FAQ" },
];

const ExtensionHeader = ({ onCta }: { onCta: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeAndScroll = () => setMobileOpen(false);

  return (
    <>
      <header className={`extension-header ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="extension-shell extension-header__inner">
          <Link to="/" className="extension-brand" aria-label="Voltar para a página inicial">
            <LightningMark title="SaaSKiller" />
            <span>SaaSKiller</span>
          </Link>

          <nav className="extension-header__nav" aria-label="Navegação da extensão">
            {links.map((link) => 
              link.isRoute ? (
                <Link key={link.href} to={link.href}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              )
            )}
          </nav>

          <div className="extension-header__actions">
            <button type="button" className="extension-button extension-button--compact" onClick={onCta}>
              Ativar agora
              <ArrowRight aria-hidden />
            </button>
            <button
              type="button"
              className="extension-header__menu"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="extension-mobile-nav"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileOpen ? <X aria-hidden /> : <Menu aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="extension-mobile-nav"
            className="extension-mobile-nav"
            aria-label="Navegação mobile da extensão"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((link, index) => 
              link.isRoute ? (
                <Link 
                  key={link.href} 
                  to={link.href} 
                  onClick={closeAndScroll}
                >
                  <span>0{index + 1}</span>
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} onClick={closeAndScroll}>
                  <span>0{index + 1}</span>
                  {link.label}
                </a>
              )
            )}
            <button
              type="button"
              className="extension-button"
              onClick={() => {
                setMobileOpen(false);
                onCta();
              }}
            >
              Ativar agora
              <ArrowRight aria-hidden />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExtensionHeader;

