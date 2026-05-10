type GameState = "menu" | "playing" | "success" | "crashed";

interface Props {
  state: GameState;
  score: number;
  level: number;
  landingSpeed: number;
  onNextLevel: () => void;
  onRetry: () => void;
  onMenu: () => void;
}

const getRating = (speed: number) => {
  if (speed < 1.0) return { label: "PERFECT", color: "#4ade80", emoji: "✨" };
  if (speed < 2.0) return { label: "GOOD", color: "#E0A14C", emoji: "👍" };
  return { label: "HARD", color: "#fb923c", emoji: "⚠️" };
};

export default function ResultScreen({
  state,
  score,
  level,
  landingSpeed,
  onNextLevel,
  onRetry,
  onMenu,
}: Props) {
  const success = state === "success";
  const rating = success ? getRating(landingSpeed) : null;

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#05070C]/70 backdrop-blur-sm">
      <div
        data-ocid="result.dialog"
        className="bg-[#0D141E]/90 backdrop-blur-lg border border-[#263241] rounded-2xl p-10 text-center max-w-sm w-full mx-6 shadow-2xl"
      >
        <div className="text-5xl mb-4">{success ? "🌕" : "💥"}</div>
        <h2
          className={`text-3xl font-bold mb-4 font-orbitron ${
            success ? "text-[#E0A14C]" : "text-[#f87171]"
          }`}
        >
          {success ? "LANDED SAFELY!" : "CRASHED!"}
        </h2>

        {success && rating && (
          <div className="mb-4">
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xl font-bold border-2"
              style={{
                color: rating.color,
                borderColor: rating.color,
                backgroundColor: `${rating.color}18`,
              }}
            >
              <span>{rating.emoji}</span>
              <span className="font-orbitron tracking-widest">
                {rating.label}
              </span>
            </div>
            <div className="text-[#A9B3BD] text-sm mt-2">
              Landing Speed:{" "}
              <span className="font-mono" style={{ color: rating.color }}>
                {landingSpeed.toFixed(2)} m/s
              </span>
            </div>
          </div>
        )}

        {success && (
          <div className="text-[#A9B3BD] mb-6">
            Score:{" "}
            <span className="text-[#F2F5F7] font-bold text-xl">{score}</span>
          </div>
        )}
        {!success && (
          <p className="text-[#A9B3BD] mb-6 text-sm">
            Too fast, too tilted, or missed the pad.
          </p>
        )}
        <div className="flex flex-col gap-3">
          {success && level < 4 && (
            <button
              type="button"
              data-ocid="result.next_level.primary_button"
              onClick={onNextLevel}
              className="w-full py-3 bg-[#E0A14C] text-[#1A1A1A] font-bold rounded-full hover:bg-[#C8842E] transition-colors"
            >
              NEXT LEVEL →
            </button>
          )}
          <button
            type="button"
            data-ocid="result.retry.button"
            onClick={onRetry}
            className="w-full py-3 bg-[#263241] text-[#F2F5F7] font-semibold rounded-full hover:bg-[#344455] transition-colors"
          >
            RETRY
          </button>
          <button
            type="button"
            data-ocid="result.menu.button"
            onClick={onMenu}
            className="w-full py-3 text-[#A9B3BD] hover:text-[#F2F5F7] transition-colors text-sm"
          >
            ← Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}
