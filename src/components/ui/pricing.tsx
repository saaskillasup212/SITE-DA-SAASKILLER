"use client";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePerformance } from "@/hooks/use-performance";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star, Gem } from "lucide-react";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support."
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { shouldReduceMotion } = usePerformance();
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight
        },
        colors: ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))", "hsl(var(--muted))"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"]
      });
    }
  };

  return (
    <div className="container py-20">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white">
          {title}
        </h2>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6 max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={shouldReduceMotion ? false : { y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : {
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: index * 0.2,
              opacity: { duration: 0.5 }
            }}
            className={cn(
              `rounded-xl sm:rounded-2xl border p-4 sm:p-8 text-center flex flex-col relative`,
              `transition-all duration-500 ease-out`,
              `hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-1`,
              plan.isPopular
                ? "border-primary border-2 shadow-gold hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.4)] bg-gradient-to-br from-[#D4AF37]/20 via-[#B8860B]/10 to-[#D4AF37]/20"
                : "border-border shadow-soft hover:border-primary/60 hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.2)] bg-card"
            )}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <span className="inline-flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold shadow-gold">
                  <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current" />
                  Mais Popular
                </span>
              </div>
            )}
            <div className={cn("flex-1 flex flex-col", plan.isPopular && "pt-4")}>
              <p className={cn(
                "text-lg sm:text-2xl font-heading font-bold mb-3 sm:mb-4 break-words",
                plan.isPopular ? "text-white" : "text-foreground"
              )}>
                {plan.name}
              </p>
              <div className="mt-3 sm:mt-6 flex items-baseline justify-center gap-x-2">
                <span className={cn(
                  "text-4xl sm:text-5xl md:text-6xl font-heading font-bold",
                  plan.isPopular ? "text-white drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" : "text-primary"
                )}>
                  R$<NumberFlow
                    value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
                    transformTiming={{ duration: 500, easing: "ease-out" }}
                    willChange
                  />
                </span>
              </div>

              <p className={cn(
                "text-base sm:text-xl mt-1 mb-2",
                plan.isPopular ? "text-white/90" : "text-muted-foreground"
              )}>
                {plan.period}
              </p>

              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {plan.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={shouldReduceMotion ? { duration: 0 } : {
                      delay: idx * 0.08,
                      duration: 0.4
                    }}
                    className={cn(
                      "flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all duration-300 border-l-2",
                      plan.isPopular 
                        ? "bg-white/10 hover:bg-white/20 border-white/50 hover:border-white/80" 
                        : "bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 border-primary/40 hover:border-primary/70"
                    )}
                  >
                    {plan.isPopular ? (
                      <Check className="w-4 h-4 sm:w-6 sm:h-6 text-white flex-shrink-0 mt-0.5" />
                    ) : (
                      <Gem className="w-4 h-4 sm:w-6 sm:h-6 text-primary fill-primary/20 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={cn(
                      "text-left font-semibold text-sm sm:text-base",
                      plan.isPopular ? "text-white" : "text-foreground"
                    )}>
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full h-12 sm:h-16 text-base sm:text-xl font-bold",
                  "transform transition-all duration-300 ease-out",
                  "hover:scale-105 hover:ring-4 hover:ring-offset-2",
                  plan.isPopular 
                    ? "bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] text-white border-2 border-[#D4AF37] hover:ring-[#D4AF37]/50 hover:ring-offset-[#D4AF37]/20 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
                    : "bg-primary text-primary-foreground hover:ring-primary hover:ring-offset-4 hover:shadow-2xl hover:shadow-primary/60 shadow-xl shadow-primary/40"
                )}
              >
                {plan.buttonText}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
