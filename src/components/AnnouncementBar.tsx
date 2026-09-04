import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useAffiliate } from "@/contexts/AffiliateContext";

const AnnouncementBar = () => {
  const { autoDiscount } = useAffiliate();

  if (!autoDiscount) return null;

  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 w-full z-50 text-center py-2.5 px-4 flex items-center justify-center gap-2 overflow-hidden shadow-[0_4px_15px_rgba(249,115,22,0.2)] border-b border-orange-400"
    >
      <Zap className="w-5 h-5 text-white animate-pulse" fill="currentColor" />
      <span className="text-sm sm:text-base font-extrabold text-white tracking-wide uppercase drop-shadow-md">
        Apenas 5 cupons ativos! Não perca essa chance.
      </span>
      <Zap className="w-5 h-5 text-white animate-pulse" fill="currentColor" />
    </motion.div>
  );
};

export default AnnouncementBar;
