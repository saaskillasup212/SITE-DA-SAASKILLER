import { useMemo } from "react";
import { usePerformance } from "@/hooks/use-performance";

interface FloatingBubblesProps {
  count?: number;
  className?: string;
}

export const FloatingBubbles = ({ count = 20, className = "" }: FloatingBubblesProps) => {
  const { isMobile } = usePerformance();
  
  const bubbleCount = isMobile ? Math.floor(count / 2) : count;
  
  const bubbles = useMemo(() => {
    return Array.from({ length: bubbleCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 6 + 2, // 2px to 8px
      delay: Math.random() * 10, // 0 to 10s delay
      duration: Math.random() * 12 + 8, // 8s to 20s
      opacity: Math.random() * 0.4 + 0.2, // 20% to 60% - mais visíveis
    }));
  }, [bubbleCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full animate-float-up"
          style={{
            left: bubble.left,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            opacity: bubble.opacity,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            backgroundColor: 'var(--gold)',
            boxShadow: '0 0 8px rgba(255, 215, 0, 0.6)',
          }}
        />
      ))}
    </div>
  );
};
