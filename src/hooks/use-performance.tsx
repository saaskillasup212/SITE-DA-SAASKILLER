import { useState, useEffect } from "react";

/**
 * Os valores são resolvidos JÁ NO PRIMEIRO RENDER (inicializador do useState).
 * Se começarem em `false` e só virarem `true` num useEffect, componentes que
 * escolhem variantes de animação por `shouldReduceMotion` trocam o objeto de
 * variantes no meio da animação — o framer-motion para de controlar as
 * propriedades que sumiram (filter/transform) e os estilos inline congelam no
 * estado inicial. Era o que deixava o H1 do Hero borrado para sempre no mobile.
 */

const MOBILE_BREAKPOINT = 768;

const readIsMobile = () =>
  typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;

const readReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface NavigatorWithConnection extends Navigator {
  connection?: { effectiveType?: string };
  mozConnection?: { effectiveType?: string };
  webkitConnection?: { effectiveType?: string };
}

const readSlowConnection = () => {
  if (typeof navigator === "undefined") return false;
  const connectedNavigator = navigator as NavigatorWithConnection;
  const connection =
    connectedNavigator.connection ||
    connectedNavigator.mozConnection ||
    connectedNavigator.webkitConnection;
  if (!connection) return false;
  return ["slow-2g", "2g", "3g"].includes(connection.effectiveType);
};

export const usePerformance = () => {
  const [isMobile, setIsMobile] = useState(readIsMobile);
  const [isSlowConnection, setIsSlowConnection] = useState(readSlowConnection);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(readReducedMotion);

  useEffect(() => {
    const checkMobile = () => setIsMobile(readIsMobile());
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkReducedMotion = () => setPrefersReducedMotion(motionQuery.matches);

    checkMobile();
    setIsSlowConnection(readSlowConnection());
    checkReducedMotion();

    window.addEventListener("resize", checkMobile);
    motionQuery.addEventListener("change", checkReducedMotion);

    return () => {
      window.removeEventListener("resize", checkMobile);
      motionQuery.removeEventListener("change", checkReducedMotion);
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
