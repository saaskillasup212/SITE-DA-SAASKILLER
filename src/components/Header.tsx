import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const baseNavLinks = [
  { label: "Recursos", id: "benefits" },
  { label: "Como funciona", id: "how-it-works" },
  { label: "Quem somos", id: "quem-somos" },
  { label: "Planos", id: "pricing" },
  { label: "FAQ", id: "faq" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isExtensionPage = location.pathname === "/extensao-creditos-lovable" || location.pathname === "/creditos-infinitos";

  const navLinks = baseNavLinks.map((link) => {
    if (link.to === "/extensao-creditos-lovable" && isExtensionPage) {
      return {
        label: "SaaSKiller",
        mobileLabel: "Início",
        to: "/",
      };
    }
    return link;
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (isExtensionPage) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBrandClick = () => {
    if (isExtensionPage) {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      scrollToSection("hero");
    }
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="site-container site-header__inner">
          <button
            type="button"
            className="site-brand"
            onClick={handleBrandClick}
            aria-label="Voltar ao início"
          >
            <img
              className="site-brand__logo"
              src="/header-logo.png"
              alt="SaaSKiller"
            />
          </button>

          <nav className="site-nav" aria-label="Navegação principal">
            {navLinks.map((link) =>
              link.to ? (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ) : (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => scrollToSection(link.id!)}
                >
                  {link.label}
                </button>
              ),
            )}
          </nav>

          <div className="site-header__actions">
            <button
              type="button"
              className="button-primary button-primary--header"
              onClick={() => scrollToSection("pricing")}
            >
              Começar agora
              <ArrowRight aria-hidden />
            </button>
            <button
              type="button"
              className="menu-trigger"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22 }}
          >
            <nav aria-label="Navegação mobile">
              {navLinks.map((link, index) =>
                link.to ? (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      to={link.to}
                      className="mobile-menu__link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>0{index + 1}</span>
                      {link.mobileLabel ?? link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.button
                    type="button"
                    key={link.id}
                    onClick={() => scrollToSection(link.id!)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <span>0{index + 1}</span>
                    {link.label}
                  </motion.button>
                ),
              )}
              <button
                type="button"
                className="button-primary"
                onClick={() => scrollToSection("pricing")}
              >
                Começar agora
                <ArrowRight aria-hidden />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
