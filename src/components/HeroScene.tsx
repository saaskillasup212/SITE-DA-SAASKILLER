import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

/**
 * Cena 3D do Hero — PATCH 1 (Tempestade Elétrica Premium).
 * Campo de ~2500 partículas com repulsão ao mouse + raio central extrudado
 * com pulso de energia a cada 6-8s. Desktop only (fallback CSS no mobile).
 */

/* Identidade dourado+roxo — valores derivados de src/styles/tokens.css */
const GOLD = new THREE.Color("#E6B54A");       /* --gold */
const GOLD_HOT = new THREE.Color("#F5D076");   /* --gold-hot */
const GOLD_DEEP = new THREE.Color("#8a6a1f");  /* --gold-deep */
const ROYAL = new THREE.Color("#8b7cf7");      /* --royal (suporte) */
const ROYAL_DEEP = new THREE.Color("#4c3fd4"); /* --royal-deep */
const VOID = "#0a0806";                        /* --bg-void */

const PARTICLE_COUNT = 2500;
const REPULSION_RADIUS = 1.5;

/* ---------- Partículas ---------- */
const ParticleField = ({ pulse }: { pulse: React.MutableRefObject<number> }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const { camera, pointer } = useThree();

  const { positions, basePositions, colors, phases } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const phases = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 18;
      const y = (Math.random() - 0.5) * 11;
      const z = (Math.random() - 0.5) * 7;
      basePositions.set([x, y, z], i * 3);
      positions.set([x, y, z], i * 3);

      // Mistura ~70% dourado / 30% roxo (dourado protagonista, roxo profundidade)
      const r = Math.random();
      const c = r < 0.4 ? GOLD : r < 0.7 ? GOLD_HOT : ROYAL;
      colors.set([c.r, c.g, c.b], i * 3);
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, basePositions, colors, phases };
  }, []);

  const mouseWorld = useMemo(() => new THREE.Vector3(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    if (!points) return;
    const t = clock.getElapsedTime();

    // Projeta o cursor no plano z=0 (parallax de profundidade real)
    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(plane, mouseWorld);

    const attr = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      // Drift lento
      const ph = phases[i];
      let tx = bx + Math.sin(t * 0.15 + ph) * 0.35;
      let ty = by + Math.cos(t * 0.12 + ph * 1.3) * 0.3;
      const tz = bz + Math.sin(t * 0.1 + ph * 0.7) * 0.25;

      // Repulsão suave ao redor do cursor
      const dx = tx - mouseWorld.x;
      const dy = ty - mouseWorld.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < REPULSION_RADIUS * REPULSION_RADIUS && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / REPULSION_RADIUS) * 0.9;
        tx += (dx / dist) * force;
        ty += (dy / dist) * force;
      }

      // Lerp suave em direção ao alvo
      arr[i3] += (tx - arr[i3]) * 0.06;
      arr[i3 + 1] += (ty - arr[i3 + 1]) * 0.06;
      arr[i3 + 2] += (tz - arr[i3 + 2]) * 0.06;
    }
    attr.needsUpdate = true;

    // Brilho das partículas acompanha o pulso do raio
    if (materialRef.current) {
      materialRef.current.opacity = 0.55 + pulse.current * 0.35;
      materialRef.current.size = 0.035 + pulse.current * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        vertexColors
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

/* ---------- Raio central ---------- */
const buildBoltGeometry = () => {
  const shape = new THREE.Shape();
  shape.moveTo(0.45, 2.2);
  shape.lineTo(-0.6, 0.2);
  shape.lineTo(-0.05, 0.2);
  shape.lineTo(-0.45, -2.2);
  shape.lineTo(0.7, 0.05);
  shape.lineTo(0.12, 0.05);
  shape.closePath();

  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.35,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.05,
    bevelSegments: 3,
  });
};

const Bolt = ({ pulse }: { pulse: React.MutableRefObject<number> }) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const { pointer } = useThree();
  const geometry = useMemo(buildBoltGeometry, []);

  // Estado do pulso de energia
  const pulseState = useRef({ next: 6 + Math.random() * 2, start: -1 });
  const entry = useRef(0); // progresso da entrada (scale 0.85 → 1)

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const t = clock.getElapsedTime();

    // Entrada: scale 0.85 → 1
    entry.current = Math.min(entry.current + delta / 1.1, 1);
    const e = 1 - Math.pow(1 - entry.current, 3);
    const s = 0.85 + 0.15 * e;
    group.scale.setScalar(s);

    // Rotação idle lentíssima + inclinação seguindo o mouse
    group.rotation.y += 0.05 * delta;
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointer.y * -0.15, 0.04);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, pointer.x * 0.1, 0.04);

    // Pulso de energia a cada 6-8s (0.6 → 1.4 → 0.6 em 400ms)
    const ps = pulseState.current;
    if (ps.start < 0 && t >= ps.next) ps.start = t;
    let intensity = 0.6;
    if (ps.start >= 0) {
      const p = (t - ps.start) / 0.4;
      if (p >= 1) {
        ps.start = -1;
        ps.next = t + 6 + Math.random() * 2;
        pulse.current = 0;
      } else {
        const wave = Math.sin(p * Math.PI); // 0 → 1 → 0
        intensity = 0.6 + wave * 0.8;
        pulse.current = wave;
      }
    }
    if (materialRef.current) materialRef.current.emissiveIntensity = intensity;
  });

  return (
    <group ref={groupRef} position={[2.6, 0.2, 0]}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          ref={materialRef}
          color={GOLD}
          metalness={0.9}
          roughness={0.15}
          emissive={GOLD_DEEP}
          emissiveIntensity={0.6}
          envMapIntensity={2}
        />
      </mesh>
    </group>
  );
};

/* ---------- Cena ---------- */
const HeroScene = () => {
  const pulse = useRef(0);

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={[VOID, 8, 16]} />
      <ambientLight intensity={0.4} />
      {/* Luz principal dourada + contra-luz roxa (profundidade) */}
      <pointLight position={[4, 3, 5]} intensity={1.2} color={GOLD_HOT} />
      <pointLight position={[-4, -2, 3]} intensity={0.5} color={ROYAL_DEEP} />
      <ParticleField pulse={pulse} />
      <Bolt pulse={pulse} />
      <Environment preset="city" />
    </Canvas>
  );
};

export default HeroScene;
