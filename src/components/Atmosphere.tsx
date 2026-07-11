/**
 * Atmosfera global — fixa atrás de todo o site (z-index -1).
 * Noise SVG (feTurbulence) + 2 blobs radiais com drift lentíssimo.
 * PATCH 0 — Tempestade Elétrica Premium.
 */
const Atmosphere = () => {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1, background: "var(--bg-void)" }}
    >
      {/* Gradient mesh ambiente — blob topo-esquerda */}
      <div
        className="atmosphere-blob"
        style={{
          position: "absolute",
          top: "-15%",
          left: "-10%",
          width: "55vw",
          height: "55vw",
          background:
            "radial-gradient(circle at center, rgba(var(--royal-deep-rgb), 0.08) 0%, transparent 70%)",
          filter: "blur(120px)",
          animation: "atmosphere-drift-a 60s ease-in-out infinite",
        }}
      />
      {/* Blob meio-direita */}
      <div
        className="atmosphere-blob"
        style={{
          position: "absolute",
          top: "35%",
          right: "-12%",
          width: "48vw",
          height: "48vw",
          background:
            "radial-gradient(circle at center, rgba(var(--royal-deep-rgb), 0.08) 0%, transparent 70%)",
          filter: "blur(120px)",
          animation: "atmosphere-drift-b 60s ease-in-out infinite",
        }}
      />

      {/* Noise overlay — mata o fundo chapado */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.035, mixBlendMode: "overlay" }}
      >
        <filter id="atmosphere-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#atmosphere-noise)" />
      </svg>
    </div>
  );
};

export default Atmosphere;
