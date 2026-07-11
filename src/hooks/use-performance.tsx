import { useState, useEffect } from "react";

export const usePerformance = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Detect slow connection
    const checkConnection = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (connection) {
        const slowTypes = ['slow-2g', '2g', '3g'];
        setIsSlowConnection(slowTypes.includes(connection.effectiveType));
      }
    };

    // Detect prefers-reduced-motion
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };

    checkMobile();
    checkConnection();
    checkReducedMotion();

    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const shouldDisableAnimations = isMobile || isSlowConnection || prefersReducedMotion;
  const shouldReduceParticles = isMobile || isSlowConnection;
  const shouldReduceMotion = isMobile || isSlowConnection || prefersReducedMotion;

  return {
    isMobile,
    isSlowConnection,
    prefersReducedMotion,
    shouldDisableAnimations,
    shouldReduceParticles,
    shouldReduceMotion,
  };
};
