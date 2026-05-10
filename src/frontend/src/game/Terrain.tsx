import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useGameStore } from "./gameStore";
import type { LevelConfig } from "./levels";

interface Props {
  levelConfig: LevelConfig;
}

// Flat terrain -- ground is always at y=0
export function generateTerrain(
  _terrain: LevelConfig["terrain"],
  _padCenter: number,
  _padWidth: number,
): { points: number[]; getHeightAt: (x: number) => number } {
  const getHeightAt = (_x: number): number => 0;
  return { points: [], getHeightAt };
}

export default function Terrain({ levelConfig }: Props) {
  const padY = 0;
  const padX = useGameStore((s) => s.padX);
  const setPadX = useGameStore((s) => s.setPadX);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    const { amplitude, speed } = levelConfig.padMovement;
    if (amplitude > 0) {
      timeRef.current += delta;
      const newX =
        levelConfig.padX + Math.sin(timeRef.current * speed) * amplitude;
      setPadX(newX);
    }
  });

  return (
    <>
      {/* Landing pad fixed at ground level */}
      <mesh position={[padX, padY + 0.15, 0.2]}>
        <boxGeometry args={[levelConfig.padWidth, 0.3, 2]} />
        <meshStandardMaterial
          color="#D8DCE0"
          emissive="#88AAFF"
          emissiveIntensity={0.25}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Marker post left */}
      <mesh position={[padX - levelConfig.padWidth / 2, padY + 1.0, 0.2]}>
        <boxGeometry args={[0.25, 1.6, 0.25]} />
        <meshStandardMaterial
          color="#FF4400"
          emissive="#FF2200"
          emissiveIntensity={0.7}
        />
      </mesh>

      {/* Marker post right */}
      <mesh position={[padX + levelConfig.padWidth / 2, padY + 1.0, 0.2]}>
        <boxGeometry args={[0.25, 1.6, 0.25]} />
        <meshStandardMaterial
          color="#FF4400"
          emissive="#FF2200"
          emissiveIntensity={0.7}
        />
      </mesh>
    </>
  );
}
