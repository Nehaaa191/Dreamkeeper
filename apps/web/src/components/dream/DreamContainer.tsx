"use client";

import React, { useState } from "react";
import { Dream } from "../../stores/dreamStore";

interface DreamContainerProps {
  dream: Dream;
  onClick: () => void;
}

export default function DreamContainer({ dream, onClick }: DreamContainerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const color = dream.containerColor || "var(--color-neutral)";
  const type = dream.containerType || "crystal_jar";

  // Map mood to custom visual glow class
  const getGlowClass = () => {
    switch (dream.mood) {
      case "peaceful": return "jar-glow-peaceful";
      case "joyful": return "jar-glow-joyful";
      case "fearful": return "jar-glow-nightmare";
      case "surprised": return "jar-glow-mysterious";
      case "sad": return "jar-glow-peaceful";
      default: return "jar-glow-neutral";
    }
  };

  const formattedDate = new Date(dream.loggedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric"
  });

  const renderContainerSVG = () => {
    switch (type) {
      case "potion_bottle":
        return (
          <svg width="70" height="90" viewBox="0 0 70 90" fill="none" className={getGlowClass()}>
            {/* Cap/Cork */}
            <path d="M30 10 L40 10 L40 16 L30 16 Z" fill="#8e7dbe" opacity="0.8" />
            <path d="M32 16 L38 16 L38 22 L32 22 Z" fill="#f4a261" />
            {/* Neck */}
            <path d="M28 22 L42 22 L42 35 L28 35 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            {/* Fluid Neck Core */}
            <path d="M30 28 L40 28 L40 35 L30 35 Z" fill={color} opacity="0.3" />
            {/* Bulb Body */}
            <path 
              d="M35 35 C15 35 10 50 10 70 C10 85 20 90 35 90 C50 90 60 85 60 70 C60 50 55 35 35 35 Z" 
              fill="rgba(255,255,255,0.08)" 
              stroke="rgba(255,255,255,0.25)" 
              strokeWidth="2" 
            />
            {/* Bulb Fluid Fill */}
            <path 
              d="M35 48 C20 48 13 56 12 70 C11 82 20 87 35 87 C50 87 59 82 58 70 C57 56 50 48 35 48 Z" 
              fill={color} 
              opacity="0.65" 
            />
            {/* Soft specular highlight */}
            <path d="M50 55 C54 62 54 74 50 80" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
            {/* Internal Bubble Particles */}
            <circle cx="28" cy="72" r="2" fill="#fff" opacity="0.6" className="animate-pulse" />
            <circle cx="42" cy="65" r="1.5" fill="#fff" opacity="0.7" className="animate-bounce" style={{ animationDuration: "3s" }} />
            <circle cx="34" cy="56" r="2.5" fill="#fff" opacity="0.4" className="animate-pulse" />
            <circle cx="48" cy="78" r="1" fill="#fff" opacity="0.8" />
          </svg>
        );
        
      case "celestial_orb":
        return (
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className={getGlowClass()}>
            {/* Outer golden support arcs */}
            <circle cx="40" cy="40" r="38" stroke="var(--color-gold)" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" className="animate-spin" style={{ animationDuration: "25s" }} />
            <circle cx="40" cy="40" r="34" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            
            {/* Main Orb */}
            <circle cx="40" cy="40" r="28" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            
            {/* Fluid/Gas Core */}
            <circle cx="40" cy="40" r="24" fill={color} opacity="0.6" />
            
            {/* Inner nebula gas texture */}
            <circle cx="36" cy="36" r="16" fill="#fff" opacity="0.2" filter="blur(2px)" className="animate-pulse-slow" />
            
            {/* Orbiting star rings */}
            <ellipse cx="40" cy="40" rx="30" ry="10" stroke="var(--color-gold)" strokeWidth="1.5" opacity="0.8" transform="rotate(-15 40 40)" />
            <ellipse cx="40" cy="40" rx="30" ry="10" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 3" transform="rotate(-15 40 40)" />
            
            {/* Particle stars */}
            <circle cx="48" cy="32" r="1.5" fill="#fff" className="animate-pulse" />
            <circle cx="32" cy="48" r="1" fill="#fff" />
            <polygon points="40,22 41,25 44,26 41,27 40,30 39,27 36,26 39,25" fill="#fff" opacity="0.9" />
          </svg>
        );

      case "crystal_jar":
      default:
        return (
          <svg width="70" height="85" viewBox="0 0 70 85" fill="none" className={getGlowClass()}>
            {/* Metal Lid */}
            <path d="M20 12 C20 9, 50 9, 50 12 L50 18 L20 18 Z" fill="#8e7dbe" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <path d="M18 18 L52 18 L52 22 L18 22 Z" fill="#ffd166" />
            {/* Jar Body */}
            <path 
              d="M15 22 L55 22 C58 22, 60 25, 60 30 L60 75 C60 81, 55 85, 48 85 L22 85 C15 85, 10 81, 10 75 L10 30 C10 25, 12 22, 15 22 Z" 
              fill="rgba(255,255,255,0.06)" 
              stroke="rgba(255,255,255,0.25)" 
              strokeWidth="2" 
            />
            {/* Liquid Fill */}
            <path 
              d="M12 40 L58 40 C58 40, 58 75, 58 75 C58 80, 53 82, 47 82 L23 82 C17 82, 12 80, 12 75 Z" 
              fill={color} 
              opacity="0.65" 
            />
            {/* Soft highlight */}
            <path d="M52 30 L52 75" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Inside sparkles/bubbles */}
            <circle cx="20" cy="55" r="2" fill="#fff" opacity="0.7" className="animate-pulse" />
            <circle cx="48" cy="62" r="1.5" fill="#fff" opacity="0.6" className="animate-bounce" style={{ animationDuration: "4.5s" }} />
            <circle cx="32" cy="70" r="2.5" fill="#fff" opacity="0.4" className="animate-pulse" />
            <circle cx="36" cy="48" r="1" fill="#fff" opacity="0.8" />
          </svg>
        );
    }
  };

  return (
    <div 
      className="relative flex flex-col items-center select-none cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Container rendering with light float animation if hovered */}
      <div 
        className="transition-all duration-300 transform"
        style={{
          transform: isHovered ? "translateY(-6px) scale(1.05)" : "none"
        }}
      >
        {renderContainerSVG()}
      </div>

      {/* Floating tooltip */}
      <div 
        className={`absolute bottom-[90px] w-48 text-center px-3 py-2 rounded-xl glass-panel text-xs border border-opacity-35 pointer-events-none transition-all duration-300 z-50 ${
          isHovered 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-2 scale-95"
        }`}
        style={{ 
          color: "var(--color-moonlight)",
          borderColor: "var(--color-lavender)",
          background: "rgba(20, 15, 38, 0.95)"
        }}
      >
        <div className="font-display font-medium text-sm truncate mb-0.5" style={{ color: "var(--color-gold)" }}>{dream.title}</div>
        <div className="text-[10px] text-moon-dust opacity-75 mb-1.5">{formattedDate} • {dream.mood.toUpperCase()}</div>
        <div className="flex justify-center gap-1">
          {dream.symbols.slice(0, 3).map((sym, i) => (
            <span key={i} className="px-1.5 py-0.5 rounded bg-white bg-opacity-5 text-[9px] text-moonlight">
              {sym.split(" ")[0]} {/* only show emoji for tooltip spacing */}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
