import { useEffect, useState } from "react";
import { useGameStore } from "../game/gameStore";

export default function HUD() {
  const lander = useGameStore((s) => s.lander);
  const level = useGameStore((s) => s.levelConfig);
  const timeElapsed = useGameStore((s) => s.timeElapsed);
  const [, forceRender] = useState(0);

  useEffect(() => {
    const id = setInterval(() => forceRender((n) => n + 1), 50);
    return () => clearInterval(id);
  }, []);

  const fuelPct = level ? (lander.fuel / level.fuel) * 100 : 100;
  const fuelColor =
    fuelPct > 50 ? "#4ade80" : fuelPct > 25 ? "#facc15" : "#f87171";
  const vyColor = Math.abs(lander.vy) > 3 ? "#f87171" : "#F2F5F7";
  const vxColor = Math.abs(lander.vx) > 2 ? "#f87171" : "#F2F5F7";

  const hasTimeLimit = level && level.timeLimit > 0;
  const remaining = hasTimeLimit
    ? Math.max(0, level.timeLimit - timeElapsed)
    : 0;
  const timeColor =
    remaining < 15 ? "#f87171" : remaining < 30 ? "#facc15" : "#F2F5F7";

  return (
    <div className="absolute top-0 left-0 right-0 p-4 pointer-events-none">
      <div className="flex justify-between">
        <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3 border border-[#263241] min-w-[160px]">
          <div className="text-[#A9B3BD] text-xs uppercase tracking-wide mb-2">
            Flight Data
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-[#A9B3BD]">ALT</span>
              <span className="text-[#F2F5F7] font-mono">
                {Math.max(0, lander.y).toFixed(1)}m
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#A9B3BD]">VERT</span>
              <span style={{ color: vyColor }} className="font-mono">
                {lander.vy.toFixed(2)} m/s
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#A9B3BD]">HORIZ</span>
              <span style={{ color: vxColor }} className="font-mono">
                {lander.vx.toFixed(2)} m/s
              </span>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#A9B3BD]">FUEL</span>
                <span style={{ color: fuelColor }}>{fuelPct.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-[#263241] rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{ width: `${fuelPct}%`, backgroundColor: fuelColor }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3 border border-[#263241] text-right">
          {level && (
            <>
              <div className="text-[#E0A14C] text-xs uppercase tracking-wide">
                Level {level.id}
              </div>
              <div className="text-[#F2F5F7] text-sm font-semibold">
                {level.name}
              </div>
            </>
          )}
          {hasTimeLimit && (
            <div
              className="mt-2 font-mono font-bold text-sm"
              style={{ color: timeColor }}
            >
              TIME: {remaining.toFixed(1)}s
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
