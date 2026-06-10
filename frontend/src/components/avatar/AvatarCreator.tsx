"use client";

import React from "react";
import { useDreamStore } from "../../stores/dreamStore";
import { Sparkles, User } from "lucide-react";

const HAIR_OPTIONS = [
  { id: "pink-braids", label: "Pink Braids", color: "#e5989b" },
  { id: "silver-shimmer", label: "Silver Shimmer", color: "#bbb2d0" },
  { id: "indigo-waves", label: "Indigo Waves", color: "#7b6eb8" },
  { id: "golden-curls", label: "Golden Curls", color: "#f3c263" }
];

const EYE_OPTIONS = [
  { id: "violet", label: "Violet Glow", color: "#9d4edd" },
  { id: "blue", label: "Blue Pool", color: "#58b0e5" },
  { id: "gold", label: "Gold Spark", color: "#ffd166" },
  { id: "emerald", label: "Emerald Ring", color: "#94d2bd" }
];

const OUTFIT_OPTIONS = [
  { id: "celestial-robe", label: "Celestial Robe", color: "#1d1645", border: "#a594f9" },
  { id: "druid-cloak", label: "Druid Cloak", color: "#2d3a3a", border: "#94d2bd" },
  { id: "ranger-tunic", label: "Ranger Tunic", color: "#3a2d2d", border: "#f4a261" },
  { id: "alchemist-gown", label: "Alchemist Gown", color: "#120e2e", border: "#e5989b" }
];

export default function AvatarCreator() {
  const username = useDreamStore((state) => state.username);
  const avatarConfig = useDreamStore((state) => state.avatarConfig);
  const setUsername = useDreamStore((state) => state.setUsername);
  const updateAvatar = useDreamStore((state) => state.updateAvatar);

  const activeHair = HAIR_OPTIONS.find(h => h.id === avatarConfig.hair) || HAIR_OPTIONS[0];
  const activeEye = EYE_OPTIONS.find(e => e.id === avatarConfig.eyes) || EYE_OPTIONS[0];
  const activeOutfit = OUTFIT_OPTIONS.find(o => o.id === avatarConfig.outfit) || OUTFIT_OPTIONS[0];

  const renderAvatarSVG = () => {
    return (
      <svg width="180" height="180" viewBox="0 0 100 100" fill="none" className="filter drop-shadow-[0_0_12px_rgba(165,148,249,0.25)]">
        {/* Soft magical background aura */}
        <circle cx="50" cy="50" r="45" fill="rgba(165, 148, 249, 0.08)" stroke="rgba(165, 148, 249, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="38" fill="rgba(9, 6, 21, 0.65)" />
        
        {/* Robe/Outfit */}
        <path 
          d="M26 82 C28 65, 34 58, 50 58 C66 58, 72 65, 74 82 L70 95 L30 95 Z" 
          fill={activeOutfit.color} 
          stroke={activeOutfit.border} 
          strokeWidth="1.5" 
        />
        
        {/* Collar details */}
        <path d="M42 58 L50 66 L58 58" stroke={activeOutfit.border} strokeWidth="1.2" fill="none" />
        
        {/* Neck */}
        <path d="M44 48 L56 48 L56 59 L44 59 Z" fill="#f5d6ba" />
        
        {/* Face */}
        <circle cx="50" cy="38" r="14" fill="#f5d6ba" />
        
        {/* Cheeks blush */}
        <circle cx="41" cy="42" r="2" fill="#e5989b" opacity="0.5" />
        <circle cx="59" cy="42" r="2" fill="#e5989b" opacity="0.5" />

        {/* Eyes */}
        <ellipse cx="43" cy="38" rx="2" ry="3" fill="#120e2e" />
        <ellipse cx="57" cy="38" rx="2" ry="3" fill="#120e2e" />
        
        {/* Glowing iris spark */}
        <circle cx="43" cy="38" r="1" fill={activeEye.color} />
        <circle cx="57" cy="38" r="1" fill={activeEye.color} />
        <circle cx="44.2" cy="36.8" r="0.4" fill="#fff" />
        <circle cx="58.2" cy="36.8" r="0.4" fill="#fff" />
        
        {/* Cute smile */}
        <path d="M47 44 Q50 46 53 44" stroke="#c9829a" strokeWidth="1" fill="none" strokeLinecap="round" />

        {/* Hair Back layer (e.g. for braids or long hair) */}
        {activeHair.id === "pink-braids" && (
          <>
            <path d="M33 46 C25 58, 30 75, 33 78" stroke={activeHair.color} strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M67 46 C75 58, 70 75, 67 78" stroke={activeHair.color} strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="33" cy="78" r="2" fill="var(--color-gold)" />
            <circle cx="67" cy="78" r="2" fill="var(--color-gold)" />
          </>
        )}

        {/* Hair Top layer */}
        {activeHair.id === "indigo-waves" && (
          <path d="M34 32 C34 18, 66 18, 66 32 C66 36, 68 38, 62 42 C56 36, 44 36, 38 42 C32 38, 34 36, 34 32 Z" fill={activeHair.color} />
        )}
        {activeHair.id === "pink-braids" && (
          <path d="M34 34 C34 22, 66 22, 66 34 C64 36, 60 32, 50 32 C40 32, 36 36, 34 34 Z" fill={activeHair.color} />
        )}
        {activeHair.id === "silver-shimmer" && (
          <path d="M33 34 C33 20, 67 20, 67 34 C64 30, 58 28, 50 28 C42 28, 36 30, 33 34 Z M33 34 C30 40, 31 46, 31 46 M67 34 C70 40, 69 46, 69 46" fill={activeHair.color} stroke={activeHair.color} strokeWidth="2" strokeLinecap="round" />
        )}
        {activeHair.id === "golden-curls" && (
          <path d="M32 32 C30 20, 70 20, 68 32 C72 38, 62 42, 50 38 C38 42, 28 38, 32 32 Z" fill={activeHair.color} />
        )}
      </svg>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      {/* Title */}
      <div className="glass-panel p-6 border border-opacity-15">
        <h2 className="font-display text-4xl text-moonlight tracking-wider flex items-center gap-2">
          <User className="w-8 h-8 text-lavender" />
          The Mirrors of Identity
        </h2>
        <p className="text-sm text-moon-dust mt-1 leading-relaxed">
          Reshape your physical avatar projection to reflect the true frequency of your dream world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left column: Live SVG Preview */}
        <div className="md:col-span-5 glass-panel p-8 border border-opacity-15 flex flex-col items-center justify-center space-y-4">
          <span className="text-[10px] tracking-widest uppercase font-bold text-lavender opacity-60">Subconscious projection</span>
          
          {/* Avatar frame */}
          <div className="p-4 rounded-full border border-white border-opacity-10 bg-black bg-opacity-20 animate-float">
            {renderAvatarSVG()}
          </div>

          <div className="w-full text-center">
            {/* Input name */}
            <label className="text-[10px] uppercase font-bold tracking-widest text-moon-dust block mb-2">Dreamer&apos;s Name</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="glass-input text-center font-display text-xl w-full max-w-xs focus:border-lavender"
              placeholder="Your name..."
            />
          </div>
        </div>

        {/* Right column: Configurator Panels */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Hair Selector */}
          <div className="glass-panel p-5 border border-opacity-15 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-moonlight">Hair Style & Tone</h3>
            <div className="grid grid-cols-2 gap-3">
              {HAIR_OPTIONS.map((hair) => {
                const selected = avatarConfig.hair === hair.id;
                return (
                  <button
                    key={hair.id}
                    onClick={() => updateAvatar({ hair: hair.id })}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all duration-300 ${
                      selected 
                        ? "border-lavender text-white bg-lavender bg-opacity-10 scale-102"
                        : "border-white border-opacity-5 text-moon-dust hover:border-opacity-15 bg-void bg-opacity-40"
                    }`}
                  >
                    <span className="text-xs font-medium">{hair.label}</span>
                    <span 
                      className="w-4 h-4 rounded-full border border-white border-opacity-25 shadow-sm"
                      style={{ background: hair.color }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Eyes Selector */}
          <div className="glass-panel p-5 border border-opacity-15 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-moonlight">Subconscious Eye Glow</h3>
            <div className="grid grid-cols-2 gap-3">
              {EYE_OPTIONS.map((eye) => {
                const selected = avatarConfig.eyes === eye.id;
                return (
                  <button
                    key={eye.id}
                    onClick={() => updateAvatar({ eyes: eye.id })}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all duration-300 ${
                      selected 
                        ? "border-lavender text-white bg-lavender bg-opacity-10 scale-102"
                        : "border-white border-opacity-5 text-moon-dust hover:border-opacity-15 bg-void bg-opacity-40"
                    }`}
                  >
                    <span className="text-xs font-medium">{eye.label}</span>
                    <span 
                      className="w-4.5 h-1.5 rounded-full border border-white border-opacity-25 blur-[0.5px]"
                      style={{ 
                        background: eye.color,
                        boxShadow: `0 0 8px ${eye.color}`
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Outfit/Robe Selector */}
          <div className="glass-panel p-5 border border-opacity-15 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-moonlight">Mystical Attire</h3>
            <div className="grid grid-cols-2 gap-3">
              {OUTFIT_OPTIONS.map((outfit) => {
                const selected = avatarConfig.outfit === outfit.id;
                return (
                  <button
                    key={outfit.id}
                    onClick={() => updateAvatar({ outfit: outfit.id })}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all duration-300 ${
                      selected 
                        ? "border-lavender text-white bg-lavender bg-opacity-10 scale-102"
                        : "border-white border-opacity-5 text-moon-dust hover:border-opacity-15 bg-void bg-opacity-40"
                    }`}
                  >
                    <span className="text-xs font-medium">{outfit.label}</span>
                    <span 
                      className="w-4 h-4 rounded-lg border shadow-sm"
                      style={{ 
                        background: outfit.color,
                        borderColor: outfit.border
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action indicator */}
          <div className="flex justify-end pt-2">
            <div className="text-xs text-lavender font-bold flex items-center gap-1.5 animate-pulse bg-lavender bg-opacity-10 border border-lavender border-opacity-25 px-4 py-2 rounded-xl">
              <Sparkles className="w-4 h-4" />
              Changes saved to your stardust profile
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
