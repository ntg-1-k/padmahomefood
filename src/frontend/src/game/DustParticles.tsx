import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useGameStore } from "./gameStore";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
}

const MAX = 60;

export default function DustParticles() {
  const lander = useGameStore((s) => s.lander);
  const triggeredRef = useRef(false);
  const particlesRef = useRef<Particle[]>([]);
  const pointsRef = useRef<THREE.Points>(null);

  const geometryRef = useRef(new THREE.BufferGeometry());
  const positionsRef = useRef(new Float32Array(MAX * 3));

  useEffect(() => {
    geometryRef.current.setAttribute(
      "position",
      new THREE.BufferAttribute(positionsRef.current, 3),
    );
    return () => {
      geometryRef.current.dispose();
    };
  }, []);

  useFrame((_, delta) => {
    const triggered = lander.landed || lander.crashed;

    if (triggered && !triggeredRef.current) {
      triggeredRef.current = true;
      particlesRef.current = Array.from({ length: MAX }, () => ({
        x: lander.x,
        y: lander.y - 1.2,
        z: 0,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 2 + 0.3,
        vz: (Math.random() - 0.5) * 3,
        life: 0,
        maxLife: 0.8 + Math.random() * 1.2,
      }));
    }

    if (particlesRef.current.length === 0) return;

    let alive = 0;
    let maxAlpha = 0;

    particlesRef.current.forEach((p, i) => {
      p.life += delta;
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.vy -= 2.5 * delta;
      p.z += p.vz * delta;

      positionsRef.current[i * 3] = p.x;
      positionsRef.current[i * 3 + 1] = p.y;
      positionsRef.current[i * 3 + 2] = p.z;

      if (p.life < p.maxLife) {
        const t = p.life / p.maxLife;
        const alpha = 1 - t;
        if (alpha > maxAlpha) maxAlpha = alpha;
        alive++;
      }
    });

    geometryRef.current.attributes.position.needsUpdate = true;

    if (pointsRef.current) {
      (pointsRef.current.material as THREE.PointsMaterial).opacity =
        alive > 0 ? maxAlpha : 0;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometryRef.current}>
      <pointsMaterial
        color="#DDCCAA"
        size={0.22}
        transparent
        opacity={0}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
