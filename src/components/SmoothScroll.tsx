import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll global com Lenis (lerp 0.1).
 * Desativado com prefers-reduced-motion.
 * PATCH 0 — Tempestade Elétrica Premium.
 */
const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1 });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
