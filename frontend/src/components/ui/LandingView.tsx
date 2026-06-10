"use client";

import React, { useState } from "react";
import { useDreamStore } from "../../stores/dreamStore";
import { Sparkles, ArrowRight } from "lucide-react";

export default function LandingView() {
  const username = useDreamStore((state) => state.username);
  const avatarConfig = useDreamStore((state) => state.avatarConfig);
  const setUsername = useDreamStore((state) => state.setUsername);
  const updateAvatar = useDreamStore((state) => state.updateAvatar);
  const setView = useDreamStore((state) => state.setView);
  
  const [step, setStep] = useState(0); // Onboarding sub-steps

  // Avatar mini renderer
  const renderMiniAvatar = () => {
    let hairColor = "#e5989b"; // default braids
    if (avatarConfig.hair === "silver-shimmer") hairColor = "#bbb2d0";
    if (avatarConfig.hair === "indigo-waves") hairColor = "#7b6eb8";
    if (avatarConfig.hair === "golden-curls") hairColor = "#f3c263";

    let eyeColor = "#9d4edd";
    if (avatarConfig.eyes === "blue") eyeColor = "#58b0e5";
    if (avatarConfig.eyes === "gold") eyeColor = "#ffd166";
    if (avatarConfig.eyes === "emerald") eyeColor = "#94d2bd";

    let robeColor = "#1d1645";
    let robeBorder = "#a594f9";
    if (avatarConfig.outfit === "druid-cloak") { robeColor = "#2d3a3a"; robeBorder = "#94d2bd"; }
    if (avatarConfig.outfit === "ranger-tunic") { robeColor = "#3a2d2d"; robeBorder = "#f4a261"; }
    if (avatarConfig.outfit === "alchemist-gown") { robeColor = "#120e2e"; robeBorder = "#e5989b"; }

    return (
      <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" fill="rgba(165, 148, 249, 0.08)" stroke="rgba(165, 148, 249, 0.15)" strokeWidth="1" />
        <circle cx="50" cy="50" r="38" fill="rgba(9, 6, 21, 0.8)" />
        <path d="M28 82 C30 68, 35 62, 50 62 C65 62, 70 68, 72 82 L68 95 L32 95 Z" fill={robeColor} stroke={robeBorder} strokeWidth="1.2" />
        <path d="M44 48 L56 48 L56 61 L44 61 Z" fill="#f5d6ba" />
        <circle cx="50" cy="38" r="14" fill="#f5d6ba" />
        <ellipse cx="44" cy="38" rx="1.5" ry="2.5" fill="#120e2e" />
        <ellipse cx="56" cy="38" rx="1.5" ry="2.5" fill="#120e2e" />
        <circle cx="44" cy="38" r="0.8" fill={eyeColor} />
        <circle cx="56" cy="38" r="0.8" fill={eyeColor} />
        <path d="M47 44 Q50 46 53 44" stroke="#c9829a" strokeWidth="0.8" fill="none" />
        
        {/* Hair front overlay */}
        <path d="M34 34 C34 22, 66 22, 66 34 C62 36, 50 32, 34 34 Z" fill={hairColor} />
      </svg>
    );
  };

  const handleAwaken = () => {
    setView("room");
  };

  return (
    <div className="min-height-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden z-10">
      
      {/* Decorative background lantern glows */}
      <div className="absolute top-20 left-10 w-48 h-48 rounded-full bg-indigo-900 bg-opacity-20 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-purple-900 bg-opacity-20 blur-[100px] pointer-events-none" />

      {/* Main Wizard Panels */}
      <div className="w-full max-w-lg glass-panel p-8 md:p-10 border border-opacity-20 text-center relative overflow-hidden">
        
        {/* Sparkle icons top decorative */}
        <Sparkles className="w-8 h-8 text-gold mx-auto mb-4 animate-spin" style={{ animationDuration: "30s" }} />

        {/* Step 0: Initial splash splash page */}
        {step === 0 && (
          <div className="space-y-6 animate-pulse-slow">
            <div className="space-y-2">
              <h1 className="font-display text-5xl md:text-6xl text-moonlight tracking-widest uppercase font-light">
                Dreamkeeper
              </h1>
              <p className="text-sm font-display italic text-lavender tracking-wider">
                &ldquo;Every dream leaves a trace.&rdquo;
              </p>
            </div>
            
            <p className="text-xs text-moon-dust leading-relaxed max-w-sm mx-auto">
              Welcome to the archives of your subconscious. Prepare to transcribe your dreams, analyze their symbols, and foster your companion fairy.
            </p>

            <div className="pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 mx-auto transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(138,43,226,0.4)]"
                style={{ background: "var(--gradient-magic-button)" }}
              >
                Enter the Dreamworld
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Onboarding Username */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-lavender opacity-60">Step 1 of 3</span>
              <h2 className="font-display text-3xl text-moonlight tracking-wide">Name Your Spirit</h2>
            </div>

            <p className="text-xs text-moon-dust max-w-xs mx-auto leading-relaxed">
              Every dreamer has a signature. How shall the chronicles of the dream shelf identify you?
            </p>

            <div className="flex flex-col gap-2 max-w-xs mx-auto">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter dreamer name..."
                className="glass-input text-center font-display text-xl focus:border-lavender"
              />
            </div>

            <div className="pt-4 flex justify-between gap-4">
              <button
                onClick={() => setStep(0)}
                className="text-xs text-moon-dust hover:text-white uppercase tracking-wider font-semibold transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!username.trim()}
                className="px-5 py-2.5 rounded-lg text-white font-medium text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:pointer-events-none hover:scale-105"
                style={{ background: "var(--gradient-magic-button)" }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Onboarding Avatar customizations */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-lavender opacity-60">Step 2 of 3</span>
              <h2 className="font-display text-3xl text-moonlight tracking-wide">Shape Your Avatar</h2>
            </div>

            <p className="text-xs text-moon-dust max-w-xs mx-auto leading-relaxed">
              Before crossing the cosmic threshold, align your physical projection. Choose your starting aura.
            </p>

            {/* Preview and selectors */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="p-2 rounded-full border border-white border-opacity-10 bg-black bg-opacity-20 shrink-0">
                {renderMiniAvatar()}
              </div>

              <div className="space-y-3 text-left w-full max-w-xs">
                {/* Hair styles */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold tracking-wider text-moon-dust">Hair Style</label>
                  <div className="flex gap-1.5">
                    {[
                      { id: "pink-braids", color: "#e5989b" },
                      { id: "silver-shimmer", color: "#bbb2d0" },
                      { id: "indigo-waves", color: "#7b6eb8" },
                      { id: "golden-curls", color: "#f3c263" }
                    ].map((h) => (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => updateAvatar({ hair: h.id })}
                        className={`w-6 h-6 rounded-full border transition-all ${
                          avatarConfig.hair === h.id ? "border-lavender scale-110" : "border-white border-opacity-20 hover:border-opacity-50"
                        }`}
                        style={{ background: h.color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Eyes style */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold tracking-wider text-moon-dust">Eye Glow</label>
                  <div className="flex gap-1.5">
                    {[
                      { id: "violet", color: "#9d4edd" },
                      { id: "blue", color: "#58b0e5" },
                      { id: "gold", color: "#ffd166" },
                      { id: "emerald", color: "#94d2bd" }
                    ].map((e) => (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => updateAvatar({ eyes: e.id })}
                        className={`w-6 h-6 rounded-full border transition-all ${
                          avatarConfig.eyes === e.id ? "border-lavender scale-110" : "border-white border-opacity-20 hover:border-opacity-50"
                        }`}
                        style={{ background: e.color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between gap-4">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-moon-dust hover:text-white uppercase tracking-wider font-semibold transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-lg text-white font-medium text-xs uppercase tracking-wider transition-all hover:scale-105"
                style={{ background: "var(--gradient-magic-button)" }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Onboarding Fairy selection */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-lavender opacity-60">Step 3 of 3</span>
              <h2 className="font-display text-3xl text-moonlight tracking-wide">Fairy Companion</h2>
            </div>

            <p className="text-xs text-moon-dust max-w-xs mx-auto leading-relaxed">
              Your subconscious guide is waiting. By default, **Lumina** will float alongside you to whisper ancient wisdom.
            </p>

            {/* Fairy Showcase Illustration */}
            <div className="p-4 rounded-xl border border-white border-opacity-5 bg-void bg-opacity-40 max-w-xs mx-auto flex flex-col items-center">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="animate-float">
                <circle cx="50" cy="50" r="28" fill="rgba(165, 148, 249, 0.15)" filter="blur(4px)" />
                <path d="M46 50 C25 40, 15 20, 28 15 C40 10, 42 38, 46 48 Z" fill="#c9829a" opacity="0.75" />
                <path d="M54 50 C75 40, 85 20, 72 15 C60 10, 58 38, 54 48 Z" fill="#c9829a" opacity="0.75" />
                <circle cx="50" cy="40" r="8" fill="#f1ecf9" />
                <path d="M50 48 L46 68 L54 68 Z" fill="#e8dff5" />
                <circle cx="48" cy="39" r="0.8" fill="#7b6eb8" />
                <circle cx="52" cy="39" r="0.8" fill="#7b6eb8" />
              </svg>
              <h4 className="font-display font-medium text-moonlight text-sm mt-2">Lumina</h4>
              <p className="text-[10px] text-moon-dust text-center leading-normal mt-1 max-w-[200px]">
                A gentle companion of warm starlight and violet wings. Speaks in nature metaphors.
              </p>
            </div>

            <div className="pt-4 flex justify-between gap-4">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-moon-dust hover:text-white uppercase tracking-wider font-semibold transition-all"
              >
                Back
              </button>
              <button
                onClick={handleAwaken}
                className="px-6 py-3 rounded-xl text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(243,194,99,0.35)]"
                style={{
                  background: "linear-gradient(135deg, var(--color-lavender) 0%, var(--color-gold) 100%)",
                  color: "var(--color-void)"
                }}
              >
                <Sparkles className="w-4 h-4" />
                Awaken into the room
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
