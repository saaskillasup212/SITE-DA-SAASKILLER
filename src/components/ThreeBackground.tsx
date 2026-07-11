import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  scrollProgress?: number;
}

const ThreeBackground = ({ scrollProgress = 0 }: ThreeBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    geometry: THREE.BufferGeometry;
    mainPoints: THREE.Points;
    glowPoints: THREE.Points | null;
    animationId: number;
    count: number;
  } | null>(null);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getAttribute('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('ThreeJS: WebGL not supported, skipping 3D background');
      return;
    }

    try {

      // Detect mobile for performance optimization
      const isMobile = window.innerWidth < 768;
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const isSlowDevice = isMobile || hardwareConcurrency <= 4;

      const SEPARATION = isMobile ? 100 : 80;
      const AMOUNTX = isMobile ? 30 : 70;
      const AMOUNTY = isMobile ? 30 : 70;

      // Scene setup
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.position.set(0, 200, 800);
      
      console.log('ThreeJS: Scene initialized (Mobile:', isMobile, ')');

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: isMobile ? 'low-power' : 'default',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      containerRef.current.appendChild(renderer.domElement);
      console.log('ThreeJS: Renderer attached');

      // Create particles
      const positions: number[] = [];
      const colors: number[] = [];

      const geometry = new THREE.BufferGeometry();

      const goldR = 1.0;
      const goldG = 0.84;
      const goldB = 0.0;

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          const y = 0;
          const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

          positions.push(x, y, z);
          colors.push(goldR, goldG, goldB);
        }
      }

      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geometry.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(colors, 3)
      );

      // Create main particles material
      const mainMaterial = new THREE.PointsMaterial({
        size: isMobile ? 3 : 4,
        vertexColors: true,
        transparent: true,
        opacity: isMobile ? 0.7 : 0.9,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      // Create glow material only if not on mobile
      let glowPoints: THREE.Points | null = null;
      if (!isSlowDevice) {
        const glowMaterial = new THREE.PointsMaterial({
          size: 12,
          vertexColors: true,
          transparent: true,
          opacity: 0.3,
          sizeAttenuation: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        glowPoints = new THREE.Points(geometry, glowMaterial);
        scene.add(glowPoints);
      }

      const mainPoints = new THREE.Points(geometry, mainMaterial);
      scene.add(mainPoints);
      
      console.log(`ThreeJS: Created ${AMOUNTX * AMOUNTY} particles`);

      let count = 0;
      let animationId: number;

      // Animation function
      const animate = () => {
        animationId = requestAnimationFrame(animate);

        const scroll = scrollProgressRef.current;
        
        const convergeFactor = 1 - (scroll * 0.7);
        const yOffset = scroll * 400;

        const positions = geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < positions.length; i += 3) {
          const ix = Math.floor(i / 3) % AMOUNTX;
          const iy = Math.floor(i / 3 / AMOUNTX);

          const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

          positions[i] = x * convergeFactor;
          positions[i + 1] = 
            (Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50) * convergeFactor - yOffset;
          positions[i + 2] = z * convergeFactor;
        }

        geometry.attributes.position.needsUpdate = true;
        count += 0.1;

        renderer.render(scene, camera);
      };

      sceneRef.current = {
        scene,
        camera,
        renderer,
        geometry,
        mainPoints,
        glowPoints,
        animationId,
        count,
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        if (!sceneRef.current) return;
        
        sceneRef.current.camera.aspect = window.innerWidth / window.innerHeight;
        sceneRef.current.camera.updateProjectionMatrix();
        sceneRef.current.renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        
        if (sceneRef.current) {
          cancelAnimationFrame(sceneRef.current.animationId);
          sceneRef.current.geometry.dispose();
          (sceneRef.current.mainPoints.material as THREE.Material).dispose();
          if (sceneRef.current.glowPoints) {
            (sceneRef.current.glowPoints.material as THREE.Material).dispose();
          }
          sceneRef.current.renderer.dispose();
          
          if (containerRef.current && sceneRef.current.renderer.domElement) {
            containerRef.current.removeChild(sceneRef.current.renderer.domElement);
          }
        }
      };
    } catch (error) {
      console.error('ThreeJS: Failed to initialize', error);
      return;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ThreeBackground;
