import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Cursor custom (desktop only) — dot 6px + ring 28px com lag de spring.
 * Em clicáveis o ring expande pra 44px com glow. Escondido em touch
 * (pointer: coarse) e com prefers-reduced-motion.
 * PATCH 0 — Tempestade Elétrica Premium.
 */
const CLICKABLE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, summary";

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 300, damping: 28, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 300, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest?.(CLICKABLE_SELECTOR));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  const ringSize = hovering ? 44 : 28;

  return (
    <>
      {/* Dot */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          background: "var(--electric)",
          zIndex: 9999,
        }}
      />
      {/* Ring com lag */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9998,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          boxShadow: hovering
            ? "0 0 18px rgba(var(--electric-rgb), 0.45)"
            : "0 0 0px rgba(var(--electric-rgb), 0)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ border: "1.5px solid rgba(var(--electric-rgb), 0.55)" }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
