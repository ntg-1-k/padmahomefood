import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";
import { useGameStore } from "./gameStore";
import { useThrusterSound } from "./useThrusterSound";

const FOIL_PANELS = [
  { deg: 0, color: "#D4B060" },
  { deg: 45, color: "#B89040" },
  { deg: 90, color: "#D4B060" },
  { deg: 135, color: "#B89040" },
  { deg: 180, color: "#D4B060" },
  { deg: 225, color: "#B89040" },
  { deg: 270, color: "#D4B060" },
  { deg: 315, color: "#B89040" },
];

const LEG_ANGLES = [0, 90, 180, 270];

export default function Lander() {
  const groupRef = useRef<THREE.Group>(null);
  const thrustRef = useRef<THREE.Mesh>(null);
  const thrustGlowRef = useRef<THREE.Mesh>(null);
  const lander = useGameStore((s) => s.lander);

  useThrusterSound(lander.thrustMain, lander.fuel > 0);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.set(lander.x, lander.y, 0);
    groupRef.current.rotation.z = (-lander.angle * Math.PI) / 180;
    const thrusting = lander.thrustMain && lander.fuel > 0;
    if (thrustRef.current) {
      thrustRef.current.visible = thrusting;
    }
    if (thrustGlowRef.current) {
      thrustGlowRef.current.visible = thrusting;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Descent stage - lower octagonal body */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.85, 0.95, 0.9, 8]} />
        <meshStandardMaterial
          color="#C8A850"
          metalness={0.35}
          roughness={0.65}
        />
      </mesh>

      {/* Descent stage insulation panels - foil appearance */}
      {FOIL_PANELS.map(({ deg, color }) => (
        <mesh
          key={deg}
          position={[
            Math.sin((deg * Math.PI) / 180) * 0.86,
            -0.2,
            Math.cos((deg * Math.PI) / 180) * 0.86,
          ]}
          rotation={[0, (deg * Math.PI) / 180, 0]}
        >
          <boxGeometry args={[0.01, 0.85, 0.35]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
        </mesh>
      ))}

      {/* Ascent stage - upper cylindrical capsule */}
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.52, 0.62, 0.65, 8]} />
        <meshStandardMaterial
          color="#E8E0C8"
          metalness={0.2}
          roughness={0.55}
        />
      </mesh>

      {/* Docking port / top dome */}
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.18, 0.25, 0.22, 8]} />
        <meshStandardMaterial color="#CCCCCC" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Window - front */}
      <mesh position={[0, 0.65, 0.53]}>
        <boxGeometry args={[0.28, 0.22, 0.04]} />
        <meshStandardMaterial
          color="#88AAFF"
          emissive="#4466CC"
          emissiveIntensity={0.5}
          metalness={0.1}
          roughness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Antenna */}
      <mesh position={[0.35, 1.15, 0]} rotation={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 4]} />
        <meshStandardMaterial color="#DDDDDD" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.56, 1.38, 0]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Thruster nozzle */}
      <mesh position={[0, -0.82, 0]}>
        <cylinderGeometry args={[0.12, 0.38, 0.4, 8]} />
        <meshStandardMaterial
          color="#556677"
          metalness={0.75}
          roughness={0.4}
        />
      </mesh>

      {/* 4 Landing legs */}
      {LEG_ANGLES.map((angle) => (
        <group key={angle} rotation={[0, (angle * Math.PI) / 180, 0]}>
          {/* Main leg strut */}
          <mesh position={[0.82, -0.75, 0]} rotation={[0, 0, 0.48]}>
            <boxGeometry args={[0.055, 1.05, 0.055]} />
            <meshStandardMaterial
              color="#999999"
              metalness={0.4}
              roughness={0.6}
            />
          </mesh>
          {/* Secondary brace */}
          <mesh position={[0.55, -0.45, 0]} rotation={[0, 0, 0.85]}>
            <boxGeometry args={[0.04, 0.55, 0.04]} />
            <meshStandardMaterial
              color="#AAAAAA"
              metalness={0.4}
              roughness={0.6}
            />
          </mesh>
          {/* Foot pad */}
          <mesh position={[1.35, -1.3, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.07, 8]} />
            <meshStandardMaterial
              color="#BBBBBB"
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>
        </group>
      ))}

      {/* Thrust flame */}
      <mesh ref={thrustRef} position={[0, -1.5, 0]} visible={false}>
        <coneGeometry args={[0.3, 1.5, 10]} />
        <meshStandardMaterial
          color="#FFAA00"
          emissive="#FF5500"
          emissiveIntensity={2.0}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Thrust outer glow */}
      <mesh ref={thrustGlowRef} position={[0, -1.9, 0]} visible={false}>
        <coneGeometry args={[0.55, 1.2, 8]} />
        <meshStandardMaterial
          color="#FF8800"
          emissive="#FF3300"
          emissiveIntensity={1.2}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
