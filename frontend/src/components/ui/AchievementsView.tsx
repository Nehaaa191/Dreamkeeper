"use client";

import React, { useState } from "react";
import { useDreamStore, Achievement } from "../../stores/dreamStore";
import { Award, Lock, Sparkles, Check } from "lucide-react";

export default function AchievementsView() {
  const achievements = useDreamStore((state) => state.achievements);
  const claimReward = useDreamStore((state) => state.claimAchievementReward);
  const [claimToast, setClaimToast] = useState<string | null>(null);

  const totalEarned = achievements.filter(a => a.earned).length;
  const totalCount = achievements.length;
  const progressPercent = Math.round((totalEarned / totalCount) * 100);

  const handleClaim = (key: string, name: string, reward: number) => {
    claimReward(key);
    setClaimToast(`Claimed ${reward} diamonds for "${name}"!`);
    setTimeout(() => setClaimToast(null), 3000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8">
      {/* Header Summary Box */}
      <div className="glass-panel p-6 border border-opacity-15 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="font-display text-4xl text-moonlight tracking-wider flex items-center justify-center md:justify-start gap-2">
            <Award className="w-8 h-8 text-gold animate-pulse" />
            Trophy Shelf of subconscious
          </h2>
          <p className="text-sm text-moon-dust max-w-md mt-1 leading-relaxed">
            Every step in the dreamworld leaves an imprint. Unlock badges and collect diamond rewards as your journal grows.
          </p>
        </div>

        {/* Progress Gauge */}
        <div className="w-full md:w-64 space-y-2">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-moon-dust">
            <span>Completed</span>
            <span className="text-lavender font-bold">{totalEarned} / {totalCount} ({progressPercent}%)</span>
          </div>
          <div className="w-full h-2.5 bg-black bg-opacity-40 rounded-full overflow-hidden border border-white border-opacity-5">
            <div 
              className="h-full rounded-full transition-all duration-1000"
              style={{ 
                width: `${progressPercent}%`,
                background: "linear-gradient(90deg, var(--color-lavender) 0%, var(--color-gold) 100%)",
                boxShadow: "0 0 10px rgba(165, 148, 249, 0.4)"
              }}
            />
          </div>
        </div>
      </div>

      {/* Claim confirmation toast */}
      {claimToast && (
        <div className="p-3 text-sm rounded-xl bg-purple-950 bg-opacity-35 border border-lavender border-opacity-35 text-lavender animate-pulse text-center font-display font-medium">
          {claimToast}
        </div>
      )}

      {/* Grid of achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((ach) => {
          const isLocked = !ach.earned;
          const isUnclaimed = ach.earned && !ach.claimed;
          const isClaimed = ach.earned && ach.claimed;

          return (
            <div 
              key={ach.key}
              className={`glass-panel p-5 border border-opacity-15 flex items-start gap-4 transition-all duration-300 ${
                isUnclaimed 
                  ? "border-gold border-opacity-40 shadow-[0_0_15px_rgba(243,194,99,0.08)] bg-gold bg-opacity-[0.02]" 
                  : isLocked
                  ? "opacity-60"
                  : ""
              }`}
            >
              {/* Badge Icon Slot */}
              <div 
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-opacity-20 ${
                  isClaimed 
                    ? "bg-lavender bg-opacity-10 border-lavender"
                    : isUnclaimed
                    ? "bg-gold bg-opacity-10 border-gold animate-pulse"
                    : "bg-void border-white border-opacity-10"
                }`}
              >
                {isLocked ? (
                  <Lock className="w-5 h-5 text-moon-dust opacity-50" />
                ) : (
                  <Award className={`w-6 h-6 ${isClaimed ? "text-lavender" : "text-gold"}`} />
                )}
              </div>

              {/* Core Info */}
              <div className="flex-1 flex flex-col justify-between h-full min-h-[48px] space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`font-display text-lg ${isLocked ? "text-moon-dust" : "text-moonlight"}`}>
                      {ach.name}
                    </h3>
                    {isUnclaimed && (
                      <span className="px-2 py-0.5 rounded-md bg-gold bg-opacity-20 text-[8px] text-gold border border-gold border-opacity-30 uppercase font-bold tracking-wider animate-pulse">
                        Unclaimed
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-moon-dust leading-normal mt-0.5">{ach.description}</p>
                </div>

                {/* Reward Claim Button */}
                <div className="flex items-center justify-between pt-3 border-t border-white border-opacity-5">
                  <div className="text-[10px] text-moon-dust uppercase tracking-wider font-semibold">
                    Reward: <span className="text-gold font-bold">💎 {ach.reward}</span>
                  </div>

                  {isLocked ? (
                    <span className="text-[10px] text-moon-dust opacity-60 italic uppercase tracking-wider flex items-center gap-1">
                      Locked
                    </span>
                  ) : isUnclaimed ? (
                    <button
                      onClick={() => handleAction(ach)}
                      className="px-3.5 py-1.5 rounded-lg bg-gold text-void font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_10px_rgba(243,194,99,0.3)] flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      Claim
                    </button>
                  ) : (
                    <span className="text-xs text-lavender font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Claimed
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  function handleAction(ach: Achievement) {
    handleClaim(ach.key, ach.name, ach.reward);
  }
}
