import { useFrame } from "@react-three/fiber";
import { type RefObject, useRef } from "react";
import { useGameStore } from "./gameStore";
import type { LevelConfig } from "./levels";
import { touchInputRef } from "./touchInputRef";

const THRUST_POWER = 6;
const LATERAL_POWER = 3;
const ROTATION_SPEED = 90;

interface Props {
  levelConfig: LevelConfig;
  terrainHeightAt: (x: number) => number;
  padCenter: number;
  padWidth: number;
  onSuccess: (score: number, landingVy: number) => void;
  onCrash: () => void;
  keysRef: RefObject<Set<string>>;
}

export function useGamePhysics({
  levelConfig,
  terrainHeightAt,
  padWidth,
  onSuccess,
  onCrash,
  keysRef,
}: Props) {
  const endedRef = useRef(false);
  const timeRef = useRef(0);
  const { setLander } = useGameStore();
  const landerRef = useGameStore((s) => s.lander);
  const stateRef = useRef(landerRef);
  stateRef.current = landerRef;

  useFrame((_, delta) => {
    if (endedRef.current) return;
    const isPaused = useGameStore.getState().isPaused;
    if (isPaused) return;

    const dt = Math.min(delta, 0.05);
    const s = { ...stateRef.current };
    if (s.crashed || s.landed) return;

    // Update elapsed time
    timeRef.current += dt;
    useGameStore.getState().setTimeElapsed(timeRef.current);

    // Check time limit
    if (levelConfig.timeLimit > 0 && timeRef.current >= levelConfig.timeLimit) {
      endedRef.current = true;
      setLander({ ...s, thrustMain: false, crashed: true });
      onCrash();
      return;
    }

    const keys = keysRef.current ?? new Set();
    const touch = touchInputRef.current;
    const thrustMain =
      keys.has("ArrowUp") || keys.has("KeyW") || touch.has("thrustMain");
    const rotLeft =
      keys.has("ArrowLeft") || keys.has("KeyA") || touch.has("thrustLeft");
    const rotRight =
      keys.has("ArrowRight") || keys.has("KeyD") || touch.has("thrustRight");
    const latLeft =
      (keys.has("ShiftLeft") && keys.has("ArrowLeft")) ||
      keys.has("KeyQ") ||
      touch.has("thrustLateralLeft");
    const latRight =
      (keys.has("ShiftLeft") && keys.has("ArrowRight")) ||
      keys.has("KeyE") ||
      touch.has("thrustLateralRight");

    let { vx, vy, fuel, angle } = s;

    vy -= levelConfig.gravity * dt;
    vx += levelConfig.wind * dt;

    if (rotLeft && !latLeft) angle -= ROTATION_SPEED * dt;
    if (rotRight && !latRight) angle += ROTATION_SPEED * dt;

    if (thrustMain && fuel > 0) {
      const rad = (angle * Math.PI) / 180;
      vy += Math.cos(rad) * THRUST_POWER * dt;
      vx += Math.sin(rad) * THRUST_POWER * dt;
      fuel = Math.max(0, fuel - 60 * dt);
    }
    if (latLeft && fuel > 0) {
      vx -= LATERAL_POWER * dt;
      fuel = Math.max(0, fuel - 30 * dt);
    }
    if (latRight && fuel > 0) {
      vx += LATERAL_POWER * dt;
      fuel = Math.max(0, fuel - 30 * dt);
    }

    let x = s.x + vx * dt * 10;
    let y = s.y + vy * dt * 10;

    // X boundary: terrain spans -50 to +50
    const X_LIMIT = 48;
    if (x > X_LIMIT) {
      x = X_LIMIT;
      vx = 0;
    } else if (x < -X_LIMIT) {
      x = -X_LIMIT;
      vx = 0;
    }

    // Y boundary: prevent flying off the top
    const Y_MAX = levelConfig.startAlt * 1.5;
    if (y > Y_MAX) {
      y = Y_MAX;
      vy = 0;
    }

    const groundY = terrainHeightAt(x);
    const landerHeight = 1.5;

    if (y - landerHeight <= groundY) {
      // Read current pad position directly from store
      const currentPadX = useGameStore.getState().padX;
      const onPad = Math.abs(x - currentPadX) < padWidth / 2;
      const safe =
        Math.abs(vy) < 2.5 && Math.abs(vx) < 1.5 && Math.abs(angle) < 15;

      endedRef.current = true;
      if (onPad && safe) {
        const sc = Math.round(fuel * 10 + levelConfig.startAlt * 5);
        setLander({
          ...s,
          x,
          y: groundY + landerHeight,
          vx: 0,
          vy: 0,
          fuel,
          angle,
          thrustMain: false,
          landed: true,
        });
        onSuccess(sc, Math.abs(vy));
      } else {
        setLander({
          ...s,
          x,
          y: groundY + landerHeight,
          vx: 0,
          vy: 0,
          fuel,
          angle,
          thrustMain: false,
          crashed: true,
        });
        onCrash();
      }
      return;
    }

    setLander({
      ...s,
      x,
      y,
      vx,
      vy,
      fuel,
      angle,
      thrustMain,
    });
  });

  return endedRef;
}
