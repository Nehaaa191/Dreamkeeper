"use client";

import React, { useState } from "react";
import { Dream, useDreamStore } from "../../stores/dreamStore";
import { X, Globe, Sparkles, Compass } from "lucide-react";

interface DreamCardProps {
  dream: Dream;
  onClose: () => void;
}

export default function DreamCard({ dream, onClose }: DreamCardProps) {
  const shareToGalaxy = useDreamStore((state) => state.shareToGalaxy);
  const [justShared, setJustShared] = useState(false);

  const formattedDate = new Date(dream.loggedAt).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const handleShare = () => {
    shareToGalaxy(dream.id);
    setJustShared(true);
    setTimeout(() => setJustShared(false), 3000);
  };

  // Convert emotion key-value map to arrays
  const emotionEntries = Object.entries(dream.emotions || {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-md overflow-y-auto">
      {/* Container */}
      <div 
        className="w-full max-w-3xl glass-panel relative border flex flex-col md:flex-row overflow-hidden my-8 animate-float"
        style={{ borderColor: "rgba(165, 148, 249, 0.3)" }}
      >
        {/* Left Side: Dream Content (Woodlands look) */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white border-opacity-10">
          <div>
            {/* Header info */}
            <div className="text-[10px] uppercase font-bold tracking-wider text-lavender mb-2 block">
              {formattedDate}
            </div>
            
            <h2 className="font-display text-3xl text-moonlight mb-4 tracking-wide leading-tight">
              {dream.title}
            </h2>

            {/* Dream Text */}
            <p className="text-sm text-moon-dust leading-relaxed italic border-l-2 border-lavender border-opacity-35 pl-4 py-1 mb-6 max-h-64 overflow-y-auto whitespace-pre-line">
              &ldquo;{dream.content}&rdquo;
            </p>
          </div>

          {/* Galaxy Share Action */}
          <div className="pt-4 border-t border-white border-opacity-5">
            {dream.isSharedGalaxy || justShared ? (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-500 bg-opacity-10 border border-green-500 border-opacity-35 text-xs text-green-300">
                <Globe className="w-4 h-4 text-green-400" />
                Shared in the Galaxy (+5 💎 awarded)
              </div>
            ) : (
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white bg-opacity-5 border border-white border-opacity-15 hover:border-lavender text-xs text-moonlight font-medium transition-all hover:bg-lavender hover:bg-opacity-10 group"
              >
                <Globe className="w-4 h-4 text-moon-dust group-hover:text-lavender transition-all" />
                Share to Galaxy Anonymously (+5 💎)
              </button>
            )}
          </div>
        </div>

        {/* Right Side: AI Analytics & Companion (Ethereal Violet look) */}
        <div 
          className="w-full md:w-[320px] p-6 md:p-8 flex flex-col justify-between space-y-6"
          style={{ background: "rgba(18, 14, 46, 0.4)" }}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 hover:bg-white hover:bg-opacity-10 rounded-full transition-all text-moonlight text-opacity-70 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* AI Analysis Section */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold tracking-widest text-moon-dust uppercase flex items-center gap-1.5 border-b border-white border-opacity-5 pb-2">
              <Compass className="w-3.5 h-3.5 text-lavender" />
              Subconscious Metrics
            </h3>

            {/* Emotions */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold text-moon-dust tracking-wide block">Emotional Signature:</span>
              <div className="space-y-1.5">
                {emotionEntries.map(([emotion, val]) => (
                  <div key={emotion} className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase tracking-wider font-semibold text-moonlight">
                      <span>{emotion}</span>
                      <span>{Math.round(val * 100)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black bg-opacity-40 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${val * 100}%`,
                          background: emotion === "joy" ? "var(--color-gold)" : 
                                      emotion === "fear" ? "var(--color-nightmare)" : 
                                      emotion === "sadness" ? "var(--color-peaceful)" : "var(--color-neutral)"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Symbols */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-moon-dust tracking-wide block">Symbols Detected:</span>
              <div className="flex flex-wrap gap-1.5">
                {dream.symbols.map((sym, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 rounded-lg text-xs border border-opacity-20 text-moonlight font-medium"
                    style={{ 
                      background: "rgba(165, 148, 249, 0.08)", 
                      borderColor: "var(--color-lavender)" 
                    }}
                  >
                    {sym}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Companion Interpretation */}
          <div 
            className="p-4 rounded-xl border border-opacity-15 relative overflow-hidden"
            style={{ 
              borderColor: "var(--color-lavender)",
              background: "rgba(9, 6, 21, 0.45)"
            }}
          >
            {/* Sparkle decorator */}
            <Sparkles className="absolute right-3 top-3 w-4 h-4 text-gold opacity-35" />

            <h4 className="text-[10px] font-bold uppercase tracking-wider text-lavender mb-2 block">
              Lumina&apos;s Whisper
            </h4>
            <p className="text-xs text-moon-dust leading-relaxed font-display text-justify">
              {dream.luminaResponse}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
