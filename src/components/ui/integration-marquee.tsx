import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Integration {
  name: string;
  logo: string;
}

interface IntegrationMarqueeProps {
  integrations: Integration[];
  speed?: number;
  className?: string;
}

export const IntegrationMarquee = ({ 
  integrations, 
  speed = 40,
  className 
}: IntegrationMarqueeProps) => {
  // Duplicar os items 3x para garantir scroll seamless
  const duplicatedIntegrations = [...integrations, ...integrations, ...integrations];

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling container */}
      <div className="flex gap-8 sm:gap-12 md:gap-16 animate-marquee hover:pause-marquee">
        {duplicatedIntegrations.map((integration, index) => (
          <div
            key={`${integration.name}-${index}`}
            className="flex flex-col items-center justify-center gap-3 flex-shrink-0"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/5 rounded-lg p-2 backdrop-blur-sm border border-white/10">
              <img
                src={integration.logo}
                alt={`${integration.name} logo`}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground font-medium whitespace-nowrap">
              {integration.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
