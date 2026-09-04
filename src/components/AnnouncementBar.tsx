import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useAffiliate } from "@/contexts/AffiliateContext";

const AnnouncementBar = () => {
  const { autoDiscount } = useAffiliate();

  if (!autoDiscount) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-[78px] left-0 w-full z-40 bg-primary/10 backdrop-blur-md border-b border-primary/20 py-2 px-2 sm:px-4 flex items-center justify-center gap-1.5 sm:gap-2"
    >
      <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary shrink-0" fill="currentColor" />
      <span className="text-[11px] sm:text-sm font-medium text-primary tracking-tight sm:tracking-wide text-center leading-tight">
        Cupom COPA26 (Até 50% OFF) ativo. Apenas 5 disponíveis!
      </span>
    </motion.div>
  );
};

export default AnnouncementBar;
