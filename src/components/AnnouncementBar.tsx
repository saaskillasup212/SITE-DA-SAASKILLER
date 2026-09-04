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
      className="fixed top-[78px] left-0 w-full z-40 bg-primary/10 backdrop-blur-md border-b border-primary/20 py-1.5 px-4 flex items-center justify-center gap-2"
    >
      <Zap className="w-3.5 h-3.5 text-primary" fill="currentColor" />
      <span className="text-xs sm:text-sm font-medium text-primary tracking-wide">
        Cupom COPA26 (Até 50% OFF) ativo. Apenas 5 disponíveis!
      </span>
    </motion.div>
  );
};

export default AnnouncementBar;
