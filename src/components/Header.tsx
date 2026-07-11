import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoNew from "@/assets/saaskiller-logo.png";

const navLinks = [
  { label: "Recursos", id: "benefits" },
  { label: "Como Funciona", id: "how-it-works" },
  { label: "Planos", id: "pricing" },
  { label: "Extensão", id: "extensao" },
  { label: "FAQ", id: "faq" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - 80;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 1200;
      let startTime: number | null = null;

      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easeProgress);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/60 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div
              className="cursor-pointer group flex-shrink-0"
              onClick={() => scrollToSection("hero")}
            >
              <motion.img
                src={logoNew}
                alt="SaaSKiller"
                className="w-[110px] sm:w-[130px] md:w-[150px] h-auto object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="relative px-4 py-2 text-sm text-white/50 hover:text-white transition-colors duration-300 rounded-lg group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-0 rounded-lg bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </nav>

            {/* CTA + Mobile menu */}
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                className="hidden sm:flex h-9 px-5 text-xs font-semibold bg-[var(--electric)] text-[var(--bg-void)] hover:bg-[var(--electric-hot)] hover:shadow-[0_0_20px_rgba(139,124,247,0.45)] transition-all duration-300 rounded-lg"
                onClick={() => scrollToSection("pricing")}
              >
                Começar Agora
              </Button>

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col items-center gap-2 pt-8 px-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollToSection(link.id)}
                  className="w-full py-3 text-center text-white/70 hover:text-white text-lg font-medium transition-colors border-b border-white/[0.04]"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full mt-4"
              >
                <Button
                  className="w-full h-12 font-semibold bg-[var(--electric)] text-[var(--bg-void)] rounded-xl"
                  onClick={() => scrollToSection("pricing")}
                >
                  Começar Agora
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;