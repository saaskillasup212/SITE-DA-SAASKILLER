import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Canvas leve do CTA final — PATCH 7.
 * ~800 partículas convergindo lentamente pro centro (energia se concentrando).
 * Sem raio, sem Environment — o mais barato possível.
 */

const COUNT = 800;
/* Identidade dourado+roxo — valores derivados de src/styles/tokens.css */
const GOLD = new THREE.Color("#E6B54A");     /* --gold */
const GOLD_HOT = new THREE.Color("#F5D076"); /* --gold-hot */
const ROYAL = new THREE.Color("#8b7cf7");    /* --royal (suporte) */

const spawn = (arr: Float32Array, i3: number) => {
  // Nasce nas bordas de um volume amplo
  const angle = Math.random() * Math.PI * 2;
  const radius = 6 + Math.random() * 5;
  arr[i3] = Math.cos(angle) * radius * 1.6;
  arr[i3 + 1] = Math.sin(angle) * radius * 0.7;
  arr[i3 + 2] = (Math.random() - 0.5) * 4;
};

const ConvergingField = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      spawn(positions, i * 3);
      // Espalha o progresso inicial pra não nascerem todas na borda
      const t = Math.random();
      positions[i * 3] *= t;
      positions[i * 3 + 1] *= t;
      // ~70% dourado / 30% roxo
      const r = Math.random();
      const c = r < 0.4 ? GOLD : r < 0.7 ? GOLD_HOT : ROYAL;
      colors.set([c.r, c.g, c.b], i * 3);
      speeds[i] = 0.15 + Math.random() * 0.25;
    }
    return { positions, colors, speeds };
  }, []);

  useFrame((_, delta) => {
    const points = pointsRef.current;
    if (!points) return;
    const attr = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const x = arr[i3];
      const y = arr[i3 + 1];
      const dist = Math.hypot(x, y);
      if (dist < 0.35) {
        spawn(arr, i3);
      } else {
        const f = (speeds[i] * delta) / dist;
        arr[i3] -= x * f * 2.2;
        arr[i3 + 1] -= y * f * 2.2;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const CTAParticles = () => (
  <Canvas
    className="!absolute inset-0"
    camera={{ position: [0, 0, 8], fov: 50 }}
    dpr={[1, 1.5]}
    gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
  >
    <ConvergingField />
  </Canvas>
);

export default CTAParticles;
