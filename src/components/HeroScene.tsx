import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const GOLD = new THREE.Color("#F2B93B");
const GOLD_LIGHT = new THREE.Color("#FFD874");
const VIOLET = new THREE.Color("#8B5CF6");

const buildBoltGeometry = () => {
  const shape = new THREE.Shape();
  shape.moveTo(0.42, 2.35);
  shape.lineTo(-0.84, 0.28);
  shape.lineTo(-0.12, 0.28);
  shape.lineTo(-0.54, -2.3);
  shape.lineTo(0.94, -0.02);
  shape.lineTo(0.19, -0.02);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.32,
    bevelEnabled: true,
    bevelThickness: 0.075,
    bevelSize: 0.06,
    bevelSegments: 5,
  });
  geometry.center();
  return geometry;
};

const ParticleDust = () => {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 240;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const i = index * 3;
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 7;
      positions[i + 2] = (Math.random() - 0.5) * 5;
      const color = Math.random() > 0.78 ? VIOLET : GOLD_LIGHT;
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    buffer.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return buffer;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current || document.hidden) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.04;
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.14) * 0.08;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        vertexColors
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
};

const EnergyThread = ({
  points,
  color,
  delay = 0,
}: {
  points: THREE.Vector3[];
  color: THREE.Color;
  delay?: number;
}) => {
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 80, 0.012, 8, false);
  }, [points]);

  useFrame(({ clock }) => {
    if (!material.current || document.hidden) return;
    const wave = (Math.sin(clock.elapsedTime * 1.2 + delay) + 1) / 2;
    material.current.opacity = 0.38 + wave * 0.38;
  });

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        ref={material}
        color={color}
        transparent
        opacity={0.55}
        toneMapped={false}
      />
    </mesh>
  );
};

const OperationCore = () => {
  const group = useRef<THREE.Group>(null);
  const boltGeometry = useMemo(buildBoltGeometry, []);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    if (!group.current || document.hidden) return;
    const targetX = pointer.y * -0.08;
    const targetY = pointer.x * 0.11;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.035,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetY,
      0.035,
    );
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.28) * 0.018;
    const breath = 1 + Math.sin(clock.elapsedTime * 0.75) * 0.012;
    group.current.scale.setScalar(breath);
    group.current.position.y = Math.sin(clock.elapsedTime * 0.42) * 0.06;
  });

  const incoming = useMemo(
    () => [
      new THREE.Vector3(-5.6, 0.7, -0.4),
      new THREE.Vector3(-3.2, 0.2, 0),
      new THREE.Vector3(-1.1, 0.05, 0.15),
    ],
    [],
  );
  const outgoingTop = useMemo(
    () => [
      new THREE.Vector3(1.1, 0.22, 0.1),
      new THREE.Vector3(2.6, 1.15, -0.2),
      new THREE.Vector3(5.6, 1.3, -0.7),
    ],
    [],
  );
  const outgoingMiddle = useMemo(
    () => [
      new THREE.Vector3(1.1, 0.05, 0),
      new THREE.Vector3(3.05, 0.15, 0.45),
      new THREE.Vector3(5.8, 0, 0.1),
    ],
    [],
  );
  const outgoingBottom = useMemo(
    () => [
      new THREE.Vector3(1.05, -0.18, 0.12),
      new THREE.Vector3(2.9, -1.15, -0.2),
      new THREE.Vector3(5.5, -1.4, -0.5),
    ],
    [],
  );

  return (
    <>
      <EnergyThread points={incoming} color={GOLD_LIGHT} />
      <EnergyThread points={outgoingTop} color={GOLD} delay={0.9} />
      <EnergyThread points={outgoingMiddle} color={VIOLET} delay={1.8} />
      <EnergyThread points={outgoingBottom} color={GOLD_LIGHT} delay={2.7} />
      <group ref={group} position={[1.6, 0, 0]}>
        <mesh geometry={boltGeometry}>
          <meshPhysicalMaterial
            color={GOLD}
            metalness={0.86}
            roughness={0.28}
            clearcoat={0.35}
            clearcoatRoughness={0.4}
            emissive={new THREE.Color("#8A5E12")}
            emissiveIntensity={0.22}
          />
        </mesh>
        <mesh geometry={boltGeometry} scale={1.045}>
          <meshBasicMaterial
            color={VIOLET}
            transparent
            opacity={0.055}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </>
  );
};

const HeroScene = () => (
  <Canvas
    className="!absolute inset-0"
    camera={{ position: [0, 0, 7.8], fov: 46 }}
    dpr={[1, 1.5]}
    gl={{
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    }}
  >
    <ambientLight intensity={0.55} />
    <directionalLight position={[4, 5, 5]} intensity={2.2} color={GOLD_LIGHT} />
    <pointLight position={[-2, -2, 3]} intensity={8} color={VIOLET} distance={9} />
    <ParticleDust />
    <OperationCore />
  </Canvas>
);

export default HeroScene;
