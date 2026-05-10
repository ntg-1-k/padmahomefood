import { useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import CountdownOverlay from "../components/CountdownOverlay";
import HUD from "../components/HUD";
import TouchControls from "../components/TouchControls";
import DustParticles from "./DustParticles";
import Lander from "./Lander";
import { generateTerrain } from "./Terrain";
import Terrain from "./Terrain";
import { useGameStore } from "./gameStore";
import { LEVELS } from "./levels";
import { useGamePhysics } from "./useGamePhysics";
import { useKeyboardInput } from "./useInput";

interface Props {
  level: number;
  onSuccess: (score: number, landingVy: number) => void;
  onCrash: () => void;
}

function CameraController() {
  const { camera } = useThree();
  const lander = useGameStore((s) => s.lander);

  useFrame(() => {
    // Keep lander visible near the top of the screen.
    // With fov=50, z=80, half-height ≈ 37 world units.
    // lookAt_y = lander.y - 22 puts the lander ~60% from bottom.
    // Clamp so we never look below the ground.
    const lookAtY = Math.max(lander.y - 22, -8);
    camera.position.set(5, lookAtY + 12, 80);
    camera.lookAt(5, lookAtY, 0);
  });

  return null;
}

function BackgroundPlane() {
  const bgTex = useTexture(
    "/assets/generated/moon-earth-background.dim_1920x1080.jpg",
  );
  return (
    <mesh position={[0, 20, -180]}>
      <planeGeometry args={[560, 315]} />
      <meshBasicMaterial map={bgTex} />
    </mesh>
  );
}

function GameScene({ level, onSuccess, onCrash }: Props) {
  const levelConfig = LEVELS[level - 1];
  const padX = useGameStore((s) => s.padX);
  const keysRef = useKeyboardInput();
  // biome-ignore lint/correctness/useExhaustiveDependencies: padX changes dynamically
  const { getHeightAt } = useMemo(
    () => generateTerrain(levelConfig.terrain, padX, levelConfig.padWidth),
    [levelConfig],
  );

  useGamePhysics({
    levelConfig,
    terrainHeightAt: getHeightAt,
    padCenter: padX,
    padWidth: levelConfig.padWidth,
    onSuccess,
    onCrash,
    keysRef,
  });

  return (
    <>
      <BackgroundPlane />
      <ambientLight intensity={0.18} />
      <directionalLight position={[80, 60, 20]} intensity={2.0} castShadow />
      <hemisphereLight args={["#0A1A3A", "#1A1A1A", 0.12]} />
      {/* Earthshine fill light - subtle blue */}
      <pointLight position={[-100, 50, 50]} intensity={0.35} color="#4488CC" />
      <Terrain levelConfig={levelConfig} />
      <Lander />
      <DustParticles />
    </>
  );
}

const skyColor = new THREE.Color("#02040A");

export default function LunarGame({ level, onSuccess, onCrash }: Props) {
  const levelConfig = LEVELS[level - 1];
  const { resetLander, setLevelConfig, setPadX, setIsPaused } = useGameStore();
  const [showCountdown, setShowCountdown] = useState(true);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally run only on level change
  useEffect(() => {
    setLevelConfig(levelConfig);
    resetLander(levelConfig.startAlt, levelConfig.fuel);
    setPadX(levelConfig.padX);
    setShowCountdown(true);
  }, [level]);

  const handleCountdownComplete = useCallback(() => {
    setShowCountdown(false);
    setIsPaused(false);
  }, [setIsPaused]);

  const isMobile = window.innerWidth < 768 || "ontouchstart" in window;

  return (
    <div
      className="relative w-full h-full"
      style={{ touchAction: "none", overflow: "hidden" }}
    >
      <Canvas
        camera={{ fov: 50, position: [5, 20, 80] }}
        onCreated={({ gl }) => gl.setClearColor(skyColor)}
      >
        <Suspense fallback={null}>
          <CameraController />
          <GameScene level={level} onSuccess={onSuccess} onCrash={onCrash} />
        </Suspense>
      </Canvas>
      <HUD />
      {isMobile && <TouchControls />}
      {showCountdown && (
        <CountdownOverlay
          levelId={levelConfig.id}
          levelName={levelConfig.name}
          onComplete={handleCountdownComplete}
        />
      )}
    </div>
  );
}
