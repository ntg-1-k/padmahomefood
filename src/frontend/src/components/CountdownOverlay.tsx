import { useEffect, useState } from "react";

interface Props {
  levelName: string;
  levelId: number;
  onComplete: () => void;
}

export default function CountdownOverlay({
  levelName,
  levelId,
  onComplete,
}: Props) {
  const [phase, setPhase] = useState<"intro" | "3" | "2" | "1" | "go">("intro");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("3"), 1200));
    timers.push(setTimeout(() => setPhase("2"), 2200));
    timers.push(setTimeout(() => setPhase("1"), 3200));
    timers.push(setTimeout(() => setPhase("go"), 4200));
    timers.push(setTimeout(() => onComplete(), 4900));
    return () => {
      for (const t of timers) clearTimeout(t);
    };
  }, [onComplete]);

  const isCountdown = phase === "3" || phase === "2" || phase === "1";
  const isGo = phase === "go";
  const isIntro = phase === "intro";

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300"
        style={{ opacity: isGo ? 0 : 1 }}
      />
      <div className="relative z-10 text-center">
        {isIntro && (
          <div
            className="animate-fade-in flex flex-col items-center gap-4"
            style={{ animation: "fadeIn 0.4s ease" }}
          >
            <div className="text-[#A9B3BD] text-xs uppercase tracking-[0.4em] font-orbitron">
              Level {levelId}
            </div>
            <div className="text-[#F2F5F7] text-3xl md:text-4xl font-bold font-orbitron drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {levelName}
            </div>
            <div className="text-[#C8D4DE] text-sm mt-2">
              Prepare for landing approach
            </div>
          </div>
        )}
        {isCountdown && (
          <div
            key={phase}
            className="text-[#F2F5F7] font-orbitron font-bold drop-shadow-[0_0_40px_rgba(255,255,255,0.5)]"
            style={{
              fontSize: "clamp(6rem, 20vw, 12rem)",
              lineHeight: 1,
              animation: "countPop 0.25s ease",
            }}
          >
            {phase}
          </div>
        )}
        {isGo && (
          <div
            className="text-[#4ade80] font-orbitron font-bold tracking-widest drop-shadow-[0_0_60px_rgba(74,222,128,0.8)]"
            style={{
              fontSize: "clamp(4rem, 15vw, 9rem)",
              lineHeight: 1,
              animation: "goFlash 0.7s ease",
            }}
          >
            GO!
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes countPop {
          from { opacity: 0; transform: scale(1.4); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes goFlash {
          0%   { opacity: 0; transform: scale(0.6); }
          40%  { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
