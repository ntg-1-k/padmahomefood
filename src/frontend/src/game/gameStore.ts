import { create } from "zustand";
import type { LevelConfig } from "./levels";

export interface LanderState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  fuel: number;
  thrustMain: boolean;
  thrustLeft: boolean;
  thrustRight: boolean;
  thrustLateralLeft: boolean;
  thrustLateralRight: boolean;
  crashed: boolean;
  landed: boolean;
}

interface GameStore {
  lander: LanderState;
  levelConfig: LevelConfig | null;
  padX: number;
  timeElapsed: number;
  isPaused: boolean;
  setLevelConfig: (cfg: LevelConfig) => void;
  setLander: (s: Partial<LanderState>) => void;
  resetLander: (startAlt: number, fuel: number) => void;
  setPadX: (x: number) => void;
  setTimeElapsed: (t: number) => void;
  setIsPaused: (v: boolean) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  lander: {
    x: 0,
    y: 80,
    vx: 0,
    vy: 0,
    angle: 0,
    fuel: 500,
    thrustMain: false,
    thrustLeft: false,
    thrustRight: false,
    thrustLateralLeft: false,
    thrustLateralRight: false,
    crashed: false,
    landed: false,
  },
  levelConfig: null,
  padX: 5,
  timeElapsed: 0,
  isPaused: true,
  setLevelConfig: (cfg) => set({ levelConfig: cfg }),
  setLander: (s) => set((state) => ({ lander: { ...state.lander, ...s } })),
  resetLander: (startAlt, fuel) =>
    set({
      timeElapsed: 0,
      isPaused: true,
      lander: {
        x: 0,
        y: startAlt,
        vx: 0,
        vy: 0,
        angle: 0,
        fuel,
        thrustMain: false,
        thrustLeft: false,
        thrustRight: false,
        thrustLateralLeft: false,
        thrustLateralRight: false,
        crashed: false,
        landed: false,
      },
    }),
  setPadX: (x) => set({ padX: x }),
  setTimeElapsed: (t) => set({ timeElapsed: t }),
  setIsPaused: (v) => set({ isPaused: v }),
}));
