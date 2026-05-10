import { touchInputRef } from "../game/touchInputRef";

export default function TouchControls() {
  const press = (key: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    touchInputRef.current.add(key);
  };
  const release = (key: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    touchInputRef.current.delete(key);
  };

  const btnClass =
    "select-none touch-none bg-black/40 backdrop-blur-sm border border-[#263241] rounded-xl text-[#F2F5F7] text-lg font-bold flex items-center justify-center active:bg-[#E0A14C]/30 active:border-[#E0A14C]";

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
      <div className="flex justify-between items-end pointer-events-auto">
        <div className="flex gap-3">
          <button
            type="button"
            className={`${btnClass} w-16 h-16`}
            onPointerDown={press("thrustLeft")}
            onPointerUp={release("thrustLeft")}
            onPointerCancel={release("thrustLeft")}
          >
            ◀
          </button>
          <button
            type="button"
            className={`${btnClass} w-16 h-16`}
            onPointerDown={press("thrustRight")}
            onPointerUp={release("thrustRight")}
            onPointerCancel={release("thrustRight")}
          >
            ▶
          </button>
        </div>

        <button
          type="button"
          className={`${btnClass} w-20 h-20 text-2xl`}
          onPointerDown={press("thrustMain")}
          onPointerUp={release("thrustMain")}
          onPointerCancel={release("thrustMain")}
        >
          🔥
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            className={`${btnClass} w-16 h-16`}
            onPointerDown={press("thrustLateralLeft")}
            onPointerUp={release("thrustLateralLeft")}
            onPointerCancel={release("thrustLateralLeft")}
          >
            ⇐
          </button>
          <button
            type="button"
            className={`${btnClass} w-16 h-16`}
            onPointerDown={press("thrustLateralRight")}
            onPointerUp={release("thrustLateralRight")}
            onPointerCancel={release("thrustLateralRight")}
          >
            ⇒
          </button>
        </div>
      </div>
    </div>
  );
}
