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
      className="fixed top-[78px] left-0 w-full z-40 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5 py-2 px-4 flex items-center justify-center gap-2"
    >
      <span className="text-xs sm:text-sm font-medium text-white/70 tracking-wide">
        ✨ Cupom de desconto ativo
      </span>
    </motion.div>
  );
};

export default AnnouncementBar;
