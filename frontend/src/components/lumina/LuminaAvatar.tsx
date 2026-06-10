"use client";

import React, { useState } from "react";
import { useDreamStore } from "../../stores/dreamStore";

interface LuminaAvatarProps {
  onClick: () => void;
}

export default function LuminaAvatar({ onClick }: LuminaAvatarProps) {
  const fairySkin = useDreamStore((state) => state.fairySkin);
  const [isHovered, setIsHovered] = useState(false);

  // Render SVG based on skin
  const renderFairySVG = () => {
    switch (fairySkin) {
      case "moon_fox":
        return (
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            {/* Soft backdrop glow */}
            <circle cx="50" cy="50" r="30" fill="rgba(229, 152, 155, 0.2)" className="animate-pulse" filter="blur(6px)" />
            {/* Fox Body */}
            <path d="M50 35 C40 35, 30 45, 30 55 C30 65, 40 70, 50 70 C60 70, 70 65, 70 55 C70 45, 60 35, 50 35 Z" fill="#b0a8cc" />
            <path d="M50 38 C43 38, 35 46, 35 55 C35 63, 43 67, 50 67 C57 67, 65 63, 65 55 C65 46, 57 38, 50 38 Z" fill="#d3cde6" />
            {/* Ears */}
            <polygon points="32,45 22,25 40,38" fill="#a096c0" />
            <polygon points="68,45 78,25 60,38" fill="#a096c0" />
            <polygon points="34,42 26,28 39,37" fill="#e5989b" />
            <polygon points="66,42 74,28 61,37" fill="#e5989b" />
            {/* Eyes */}
            <circle cx="43" cy="53" r="2.5" fill="#120e2e" />
            <circle cx="57" cy="53" r="2.5" fill="#120e2e" />
            {/* Snout */}
            <polygon points="48,60 52,60 50,63" fill="#120e2e" />
            {/* Crescent Mark on forehead */}
            <path d="M47 43 A 4 4 0 0 0 53 43 A 3 3 0 1 1 47 43" fill="#ffd166" />
            {/* Tail */}
            <path d="M68 62 C78 62, 85 52, 85 45 C85 40, 80 42, 75 48 C72 52, 70 58, 68 62 Z" fill="#a096c0" />
            <path d="M80 43 C83 40, 85 38, 85 45 C85 42, 82 41, 80 43 Z" fill="#ffd166" />
          </svg>
        );

      case "tiny_dragon":
        return (
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            {/* Fire glow */}
            <circle cx="50" cy="50" r="30" fill="rgba(243, 194, 99, 0.25)" className="animate-pulse" filter="blur(8px)" />
            {/* Dragon Body */}
            <path d="M48 30 C38 30, 32 40, 35 55 C38 70, 52 75, 60 70 C68 65, 65 55, 65 48 C65 40, 58 30, 48 30 Z" fill="#4d908e" />
            <path d="M48 34 C41 34, 37 42, 39 53 C41 64, 51 68, 57 65 C63 61, 60 53, 60 48 C60 42, 55 34, 48 34 Z" fill="#90e0ef" />
            {/* Horns */}
            <path d="M42 32 C38 25, 34 22, 34 22 C34 22, 38 27, 44 31 Z" fill="#ffd166" />
            <path d="M54 32 C58 25, 62 22, 62 22 C62 22, 58 27, 52 31 Z" fill="#ffd166" />
            {/* Wings */}
            <path d="M36 50 C20 45, 15 32, 22 28 C28 24, 30 38, 36 45 Z" fill="#e5989b" opacity="0.85" />
            <path d="M60 50 C76 45, 81 32, 74 28 C68 24, 66 38, 60 45 Z" fill="#e5989b" opacity="0.85" />
            {/* Eyes */}
            <ellipse cx="44" cy="46" rx="2" ry="3" fill="#120e2e" />
            <ellipse cx="54" cy="46" rx="2" ry="3" fill="#120e2e" />
            {/* Tail */}
            <path d="M60 67 C65 72, 75 75, 78 70 C81 65, 76 60, 70 62" stroke="#4d908e" strokeWidth="4" strokeLinecap="round" />
            <polygon points="78,72 84,72 81,67" fill="#ffd166" />
          </svg>
        );

      case "lumina":
      default:
        return (
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            {/* Sparkling Aura */}
            <circle cx="50" cy="50" r="28" fill="rgba(165, 148, 249, 0.25)" className="animate-pulse" filter="blur(6px)" />
            {/* Fairy Wings */}
            <path d="M46 50 C25 40, 15 20, 28 15 C40 10, 42 38, 46 48 Z" fill="#c9829a" opacity="0.75" />
            <path d="M46 52 C28 58, 20 75, 32 78 C42 80, 43 60, 46 54 Z" fill="#7b6eb8" opacity="0.65" />
            <path d="M54 50 C75 40, 85 20, 72 15 C60 10, 58 38, 54 48 Z" fill="#c9829a" opacity="0.75" />
            <path d="M54 52 C72 58, 80 75, 68 78 C58 80, 57 60, 54 54 Z" fill="#7b6eb8" opacity="0.65" />
            {/* Fairy Head/Body */}
            <circle cx="50" cy="40" r="8" fill="#f1ecf9" />
            <path d="M50 48 L46 68 L54 68 Z" fill="#e8dff5" />
            {/* Soft face features */}
            <circle cx="48" cy="39" r="1" fill="#7b6eb8" />
            <circle cx="52" cy="39" r="1" fill="#7b6eb8" />
            <path d="M49 43 Q50 44 51 43" stroke="#e5989b" strokeWidth="0.8" fill="none" />
            {/* Floating Sparks */}
            <circle cx="28" cy="32" r="1.5" fill="#f3c263" />
            <circle cx="70" cy="64" r="2" fill="#ffd166" />
            <circle cx="68" cy="24" r="1" fill="#ffffff" />
          </svg>
        );
    }
  };

  // Companion title
  const getFairyName = () => {
    if (fairySkin === "moon_fox") return "Moon Fox";
    if (fairySkin === "tiny_dragon") return "Aether Dragon";
    return "Lumina";
  };

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        zIndex: 50,
      }}
    >
      {/* Floating Wrapper */}
      <div className="animate-float">
        {renderFairySVG()}
      </div>

      {/* Bubble Speech Prompt */}
      <div
        className={`absolute -top-14 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-xl glass-panel text-xs text-center font-display border border-opacity-35 transition-all duration-300 pointer-events-none whitespace-nowrap ${
          isHovered
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-90"
        }`}
        style={{
          color: "var(--color-moonlight)",
          borderColor: "var(--color-lavender)"
        }}
      >
        Speak to {getFairyName()}
      </div>
    </div>
  );
}
