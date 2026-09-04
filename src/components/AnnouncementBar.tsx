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
      className="bg-primary/20 border-b border-primary/30 w-full z-50 text-center py-2 px-4 flex items-center justify-center gap-2 overflow-hidden"
    >
      <Zap className="w-4 h-4 text-primary animate-pulse" />
      <span className="text-sm font-semibold text-primary tracking-wide uppercase">
        5 cupons ativos não perca
      </span>
      <Zap className="w-4 h-4 text-primary animate-pulse" />
    </motion.div>
  );
};

export default AnnouncementBar;
