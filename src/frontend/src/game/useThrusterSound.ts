import { useEffect, useRef } from "react";

// Singleton AudioContext – created once on first user gesture
let sharedCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!sharedCtx) {
    sharedCtx = new AudioContext();
  }
  if (sharedCtx.state === "suspended") {
    sharedCtx.resume();
  }
  return sharedCtx;
}

// Pre-warm the AudioContext on first user interaction so it's ready
if (typeof window !== "undefined") {
  const warm = () => {
    getAudioContext();
    window.removeEventListener("pointerdown", warm);
    window.removeEventListener("keydown", warm);
  };
  window.addEventListener("pointerdown", warm, { once: true });
  window.addEventListener("keydown", warm, { once: true });
}

export function useThrusterSound(isThrusting: boolean, hasFuel: boolean) {
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const startSound = () => {
      if (activeRef.current) return;
      activeRef.current = true;

      const ctx = getAudioContext();

      // ---- Balloon gas-nozzle sound ----
      // White noise -> highpass (removes bass rumble) -> bandpass (hiss peak)
      // -> slight tremolo (turbulence) -> master gain (fade in)

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 0.06);
      masterGain.connect(ctx.destination);
      gainRef.current = masterGain;

      // White noise buffer (2 s looping)
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Highpass – cuts everything below ~700 Hz (no low rumble)
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 700;
      hp.Q.value = 0.5;

      // Bandpass – emphasises the hissing peak around 3 kHz
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 3000;
      bp.Q.value = 1.8;

      // Second bandpass layer for a slightly different peak (air turbulence)
      const bp2 = ctx.createBiquadFilter();
      bp2.type = "bandpass";
      bp2.frequency.value = 5500;
      bp2.Q.value = 2.5;

      // Tremolo LFO – subtle pressure fluctuation (2 Hz)
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 2.2;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.06;
      lfo.connect(lfoGain);
      lfoGain.connect(masterGain.gain);
      lfo.start();

      // Routing: noise -> hp -> bp (main path)
      noise.connect(hp);
      hp.connect(bp);
      bp.connect(masterGain);

      // Routing: noise -> hp -> bp2 (upper hiss layer)
      hp.connect(bp2);
      bp2.connect(masterGain);

      noise.start();
      noiseSourceRef.current = noise;
    };

    const stopSound = () => {
      if (!activeRef.current) return;
      activeRef.current = false;
      const ctx = sharedCtx;
      if (!ctx) return;

      if (gainRef.current) {
        gainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        gainRef.current.gain.setValueAtTime(
          gainRef.current.gain.value,
          ctx.currentTime,
        );
        gainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.08);
      }
      const src = noiseSourceRef.current;
      setTimeout(() => {
        try {
          src?.stop();
        } catch {}
        noiseSourceRef.current = null;
        gainRef.current = null;
      }, 120);
    };

    if (isThrusting && hasFuel) {
      startSound();
    } else {
      stopSound();
    }
  }, [isThrusting, hasFuel]);

  // Cleanup on unmount

  useEffect(() => {
    return () => {
      try {
        noiseSourceRef.current?.stop();
      } catch {}
      if (gainRef.current && sharedCtx) {
        gainRef.current.gain.setValueAtTime(0, sharedCtx.currentTime);
      }
    };
  }, []);
}
