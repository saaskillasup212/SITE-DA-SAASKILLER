import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const GOLD = new THREE.Color("#F2B93B");
const GOLD_HOT = new THREE.Color("#FFD874");
const VIOLET = new THREE.Color("#8B5CF6");
const VIOLET_HOT = new THREE.Color("#B79AFF");

const createBoltGeometry = () => {
  const shape = new THREE.Shape();
  shape.moveTo(0.42, 2.35);
  shape.lineTo(-0.84, 0.28);
  shape.lineTo(-0.12, 0.28);
  shape.lineTo(-0.54, -2.3);
  shape.lineTo(0.94, -0.02);
  shape.lineTo(0.19, -0.02);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.34,
    bevelEnabled: true,
    bevelThickness: 0.09,
    bevelSize: 0.065,
    bevelSegments: 5,
  });
  geometry.center();
  return geometry;
};

const EnergyArc = ({
  points,
  color,
  radius = 0.012,
  phase = 0,
  baseOpacity = 0.35,
}: {
  points: THREE.Vector3[];
  color: THREE.Color;
  radius?: number;
  phase?: number;
  baseOpacity?: number;
}) => {
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const geometry = useMemo(
    () =>
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        72,
        radius,
        7,
        false,
      ),
    [points, radius],
  );

  useFrame(({ clock }) => {
    if (!material.current || document.hidden) return;
    material.current.opacity =
      baseOpacity + ((Math.sin(clock.elapsedTime * 2.1 + phase) + 1) / 2) * 0.38;
  });

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        ref={material}
        color={color}
        transparent
        opacity={baseOpacity}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
};

const EnergizedBolt = () => {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(createBoltGeometry, []);
  const { pointer } = useThree();

  const fissureOne = useMemo(
    () => [
      new THREE.Vector3(-0.1, 1.42, 0.25),
      new THREE.Vector3(0.08, 0.82, 0.28),
      new THREE.Vector3(-0.18, 0.24, 0.28),
    ],
    [],
  );
  const fissureTwo = useMemo(
    () => [
      new THREE.Vector3(0.1, 0.06, 0.28),
      new THREE.Vector3(0.28, -0.45, 0.28),
      new THREE.Vector3(0.04, -1.18, 0.26),
    ],
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current || document.hidden) return;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * -0.075,
      0.045,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.12,
      0.045,
    );
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.55) * 0.035;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.62) * 0.09;
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color={GOLD}
          metalness={0.9}
          roughness={0.26}
          clearcoat={0.42}
          clearcoatRoughness={0.28}
          emissive={new THREE.Color("#6F4710")}
          emissiveIntensity={0.28}
        />
      </mesh>
      <mesh geometry={geometry} scale={1.04}>
        <meshBasicMaterial
          color={VIOLET}
          side={THREE.BackSide}
          transparent
          opacity={0.08}
        />
      </mesh>
      <EnergyArc points={fissureOne} color={VIOLET_HOT} radius={0.018} phase={0.4} />
      <EnergyArc points={fissureTwo} color={VIOLET} radius={0.016} phase={1.2} />
    </group>
  );
};

const ExtensionSceneContent = () => {
  const incoming = useMemo(
    () => [
      new THREE.Vector3(-5.4, 0.25, -0.2),
      new THREE.Vector3(-3.4, 0.12, 0.18),
      new THREE.Vector3(-1.45, -0.03, 0.1),
    ],
    [],
  );
  const outgoing = useMemo(
    () => [
      new THREE.Vector3(1.35, 0.02, 0.1),
      new THREE.Vector3(3.3, 0.1, 0.15),
      new THREE.Vector3(5.5, 0.26, -0.24),
    ],
    [],
  );
  const arcTop = useMemo(
    () => [
      new THREE.Vector3(-0.82, 1.15, 0.06),
      new THREE.Vector3(-1.22, 1.58, -0.02),
      new THREE.Vector3(-0.55, 1.82, 0.1),
    ],
    [],
  );
  const arcBottom = useMemo(
    () => [
      new THREE.Vector3(0.5, -1.3, 0.05),
      new THREE.Vector3(1.12, -1.62, 0),
      new THREE.Vector3(0.76, -1.95, 0.08),
    ],
    [],
  );

  return (
    <>
      <ambientLight intensity={0.46} />
      <directionalLight position={[4, 5, 5]} intensity={2.5} color={GOLD_HOT} />
      <pointLight position={[-2, 0, 3]} intensity={12} color={VIOLET} distance={9} />
      <pointLight position={[2, -2, 3]} intensity={9} color={GOLD} distance={8} />
      <EnergyArc
        points={incoming}
        color={VIOLET_HOT}
        radius={0.014}
        phase={0.2}
        baseOpacity={0.28}
      />
      <EnergyArc
        points={outgoing}
        color={GOLD_HOT}
        radius={0.025}
        phase={1.1}
        baseOpacity={0.58}
      />
      <EnergyArc points={arcTop} color={VIOLET_HOT} phase={0.8} />
      <EnergyArc points={arcBottom} color={GOLD_HOT} phase={1.7} />
      <EnergizedBolt />
    </>
  );
};

const ExtensionEnergyScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting && !document.hidden),
      { threshold: 0.08 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="extension-energy-canvas" aria-hidden>
      <Canvas
        frameloop={isActive ? "always" : "never"}
        camera={{ position: [0, 0, 7.4], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ExtensionSceneContent />
      </Canvas>
    </div>
  );
};

export default ExtensionEnergyScene;

