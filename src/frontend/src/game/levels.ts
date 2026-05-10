export interface LevelConfig {
  id: number;
  name: string;
  gravity: number;
  fuel: number;
  padWidth: number;
  wind: number;
  terrain: "flat" | "gentle" | "rocky" | "extreme";
  startAlt: number;
  padX: number;
  padMovement: { amplitude: number; speed: number };
  timeLimit: number; // seconds, 0 = no limit
}

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    name: "Sea of Tranquility",
    gravity: 1.62,
    fuel: 500,
    padWidth: 6,
    wind: 0,
    terrain: "flat",
    startAlt: 80,
    padX: 5,
    padMovement: { amplitude: 0, speed: 0 },
    timeLimit: 0,
  },
  {
    id: 2,
    name: "Copernicus Crater",
    gravity: 1.62,
    fuel: 280,
    padWidth: 4,
    wind: 0,
    terrain: "gentle",
    startAlt: 100,
    padX: -10,
    padMovement: { amplitude: 3, speed: 0.4 },
    timeLimit: 0,
  },
  {
    id: 3,
    name: "Apennine Mountains",
    gravity: 1.62,
    fuel: 500,
    padWidth: 3,
    wind: 0,
    terrain: "rocky",
    startAlt: 120,
    padX: 15,
    padMovement: { amplitude: 4, speed: 0.5 },
    timeLimit: 75,
  },
  {
    id: 4,
    name: "Tycho Station",
    gravity: 1.62,
    fuel: 300,
    padWidth: 2,
    wind: 0,
    terrain: "extreme",
    startAlt: 150,
    padX: -8,
    padMovement: { amplitude: 6, speed: 0.7 },
    timeLimit: 60,
  },
];
