import { useState } from "react";
import { LEVELS } from "../game/levels";

interface Props {
  onStart: (level: number) => void;
}

export default function MenuScreen({ onStart }: Props) {
  const [selected, setSelected] = useState(1);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url('/assets/uploads/image-019d210d-e603-7344-b27b-b9a705ae947b-1.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl w-full px-6">
        <div className="text-[#A9B3BD] text-sm uppercase tracking-[0.3em] mb-2 font-orbitron">
          | 3D LUNAR LANDER |
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-[#F2F5F7] mb-2 leading-tight font-orbitron drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          Lunar
          <br />
          Lander 3D
        </h1>
        <p className="text-[#C8D4DE] mb-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          Guide your spacecraft to a safe landing on the Moon.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {LEVELS.map((lv) => (
            <button
              type="button"
              key={lv.id}
              data-ocid={`menu.level.${lv.id}`}
              onClick={() => setSelected(lv.id)}
              className={`p-4 rounded-xl border text-left transition-all backdrop-blur-sm ${
                selected === lv.id
                  ? "border-[#E0A14C] bg-[#E0A14C]/15 shadow-[0_0_20px_#E0A14C40]"
                  : "border-white/20 bg-black/40 hover:border-[#E0A14C]/50 hover:bg-black/50"
              }`}
            >
              <div className="text-[#E0A14C] text-xs uppercase tracking-wide mb-1">
                Level {lv.id}
              </div>
              <div className="text-[#F2F5F7] font-semibold text-sm">
                {lv.name}
              </div>
              <div className="text-[#A9B3BD] text-xs mt-2">Fuel: {lv.fuel}</div>
              <div className="text-[#A9B3BD] text-xs">Pad: {lv.padWidth}m</div>
              {lv.wind > 0 && (
                <div className="text-[#f87171] text-xs">Wind: {lv.wind}</div>
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          data-ocid="menu.play.primary_button"
          onClick={() => onStart(selected)}
          className="px-12 py-4 bg-[#E0A14C] text-[#1A1A1A] font-bold text-lg rounded-full hover:bg-[#C8842E] transition-colors shadow-[0_0_30px_#E0A14C60] font-orbitron"
        >
          PLAY LEVEL {selected}
        </button>

        <div className="mt-8 text-[#C8D4DE] text-xs space-y-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          <div>
            Desktop: Arrow Keys / WASD to control · Q/E for lateral thrust
          </div>
          <div>Mobile: On-screen buttons</div>
        </div>
      </div>

      <footer className="absolute bottom-4 text-[#A9B3BD] text-xs drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E0A14C] hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
