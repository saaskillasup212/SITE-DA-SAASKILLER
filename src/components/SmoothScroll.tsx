import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll global com Lenis (lerp 0.1) — DESKTOP apenas.
 * Desativado com prefers-reduced-motion e em touch/mobile: no celular o Lenis
 * sequestra o momentum nativo do dedo e deixa o scroll com rubber-band/atraso,
 * então deixamos o scroll nativo (que já é suave). Desktop inalterado.
 * PATCH 0 — Tempestade Elétrica Premium.
 */
const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Mobile/touch: scroll nativo (não instancia Lenis)
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768
    )
      return;

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
