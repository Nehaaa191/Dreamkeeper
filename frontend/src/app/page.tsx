"use client";

import React, { useState } from "react";
import { useDreamStore, Dream } from "../stores/dreamStore";

// View components
import LandingView from "../components/ui/LandingView";
import DreamShelf from "../components/dream/DreamShelf";
import DreamEntry from "../components/dream/DreamEntry";
import DreamCard from "../components/dream/DreamCard";
import LuminaAvatar from "../components/lumina/LuminaAvatar";
import LuminaChat from "../components/lumina/LuminaChat";
import StoreView from "../components/ui/StoreView";
import AchievementsView from "../components/ui/AchievementsView";
import AvatarCreator from "../components/avatar/AvatarCreator";
import GalaxyView from "../components/galaxy/GalaxyView";


// Icons
import { Compass, ShoppingBag, Award, User, Home } from "lucide-react";

export default function HomeDashboard() {
  const activeView = useDreamStore((state) => state.activeView);
  const setView = useDreamStore((state) => state.setView);
  
  // Stats
  const username = useDreamStore((state) => state.username);
  const diamonds = useDreamStore((state) => state.diamonds);
  const streak = useDreamStore((state) => state.streak);
  const dreams = useDreamStore((state) => state.dreams);
  
  // Customizations
  const roomTheme = useDreamStore((state) => state.roomTheme);
  const avatarConfig = useDreamStore((state) => state.avatarConfig);

  // Modals state
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [selectedDream, setSelectedDream] = useState<Dream | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Return landing page if active
  if (activeView === "landing") {
    return <LandingView />;
  }

  // Get CSS background styling matching room theme
  const getThemeBackgroundStyles = () => {
    switch (roomTheme) {
      case "moon_palace":
        return {
          background: "radial-gradient(circle at top, #1a1040 0%, #0c0822 60%, #03020a 100%)",
        };
      case "obsidian_space":
        return {
          background: "radial-gradient(circle at bottom, #2b0c36 0%, #0a0312 60%, #020005 100%)",
        };
      case "fairy_bedroom":
      default:
        return {
          background: "radial-gradient(circle at center, #150f2e 0%, #0e0a21 50%, #05040d 100%)",
        };
    }
  };

  // Avatar mini SVG for top-bar
  const renderTopBarAvatar = () => {
    let hairColor = "#e5989b";
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
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="rounded-full border border-white border-opacity-10 bg-black bg-opacity-20">
        <path d="M28 82 C30 68, 35 62, 50 62 C65 62, 70 68, 72 82 Z" fill={robeColor} stroke={robeBorder} strokeWidth="1.2" />
        <path d="M44 48 L56 48 L56 61 L44 61 Z" fill="#f5d6ba" />
        <circle cx="50" cy="38" r="14" fill="#f5d6ba" />
        <ellipse cx="43" cy="38" rx="1.5" ry="2.5" fill="#120e2e" />
        <ellipse cx="57" cy="38" rx="1.5" ry="2.5" fill="#120e2e" />
        <circle cx="43" cy="38" r="0.8" fill={eyeColor} />
        <circle cx="57" cy="38" r="0.8" fill={eyeColor} />
        <path d="M47 44 Q50 46 53 44" stroke="#c9829a" strokeWidth="0.8" fill="none" />
        <path d="M34 34 C34 22, 66 22, 66 34 C62 36, 50 32, 34 34 Z" fill={hairColor} />
      </svg>
    );
  };

  const handleDreamLogged = () => {
    setIsLogOpen(false);
    // Automatically open the details card of the latest logged dream so user sees Lumina's response immediately!
    const latest = useDreamStore.getState().dreams[0];
    if (latest) {
      setSelectedDream(latest);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col justify-between transition-all duration-1000 relative"
      style={getThemeBackgroundStyles()}
    >
      
      {/* Decorative Aurora Filter overlay */}
      {roomTheme === "fairy_bedroom" && (
        <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-rose-900 from-opacity-10 to-transparent pointer-events-none" />
      )}
      {roomTheme === "moon_palace" && (
        <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-blue-900 from-opacity-15 to-transparent pointer-events-none" />
      )}
      {roomTheme === "obsidian_space" && (
        <div className="absolute inset-0 bg-radial-gradient from-purple-900 from-opacity-5 via-transparent to-transparent pointer-events-none animate-pulse-slow" />
      )}

      {/* 1. TOP NAVIGATION BAR */}
      <header className="w-full glass-panel border-t-0 border-x-0 rounded-t-none border-b border-white border-opacity-10 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Avatar Details */}
          <div className="flex items-center gap-3">
            {renderTopBarAvatar()}
            <div>
              <h1 className="font-display text-2xl tracking-wider text-moonlight uppercase">
                ✦ Dreamkeeper ✦
              </h1>
              <p className="text-[10px] text-moon-dust uppercase font-bold tracking-widest opacity-75">
                Dreamer: <span className="text-lavender">{username}</span>
              </p>
            </div>
          </div>

          {/* Center Links */}
          <nav className="flex items-center gap-2 md:gap-5">
            {[
              { id: "room", label: "Dream Room", icon: Home },
              { id: "galaxy", label: "Galaxy", icon: Compass },
              { id: "store", label: "Store", icon: ShoppingBag },
              { id: "achievements", label: "Badges", icon: Award },
              { id: "profile", label: "Portrait", icon: User }
            ].map((link) => {
              const Icon = link.icon;
              const isActive = activeView === link.id;
              
              return (
                <button
                  key={link.id}
                  onClick={() => setView(link.id as "landing" | "room" | "galaxy" | "store" | "achievements" | "profile")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                    isActive 
                      ? "bg-lavender bg-opacity-15 text-lavender border border-lavender border-opacity-30 shadow-[0_0_10px_rgba(165,148,249,0.15)]" 
                      : "text-moon-dust border border-transparent hover:text-moonlight hover:bg-white hover:bg-opacity-5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Side Stats */}
          <div className="flex items-center gap-3">
            {/* Streak Badge */}
            <div className="px-3 py-1.5 rounded-xl bg-red-950 bg-opacity-20 border border-red-500 border-opacity-20 flex items-center gap-1.5 text-xs text-red-200">
              <span className="animate-pulse">🔥</span>
              <span className="font-bold">{streak} Day Streak</span>
            </div>

            {/* Diamonds Badge */}
            <div className="px-3 py-1.5 rounded-xl bg-yellow-950 bg-opacity-20 border border-gold border-opacity-20 flex items-center gap-1.5 text-xs text-gold">
              <span>💎</span>
              <span className="font-bold">{diamonds}</span>
            </div>
          </div>

        </div>
      </header>

      {/* 2. MAIN ACTIVE VIEW PANEL */}
      <main className="flex-1 w-full z-10 flex flex-col items-center justify-center py-6">
        
        {/* Dynamic Route views */}
        {activeView === "room" && (
          <div className="w-full max-w-5xl mx-auto px-4 md:px-8 space-y-12 py-6">
            
            {/* Banner/Introduction */}
            <div className="text-center space-y-2 max-w-lg mx-auto">
              <h2 className="font-display text-4xl text-moonlight tracking-wider uppercase font-light">
                Subconscious Shelf
              </h2>
              <p className="text-xs text-moon-dust leading-relaxed">
                Awake from your slumber? Document tonight&apos;s whispers to manifest a glass vessel containing your memory.
              </p>
            </div>

            {/* Dream Shelf */}
            <div className="glass-panel p-6 md:p-10 border border-opacity-15">
              <DreamShelf 
                dreams={dreams}
                onOpenLogModal={() => setIsLogOpen(true)}
                onSelectDream={(dream) => setSelectedDream(dream)}
              />
            </div>
          </div>
        )}

        {activeView === "galaxy" && <GalaxyView />}
        {activeView === "store" && <StoreView />}
        {activeView === "achievements" && <AchievementsView />}
        {activeView === "profile" && <AvatarCreator />}
      </main>

      {/* 3. FOOTER INFO */}
      <footer className="w-full py-4 text-center text-[10px] text-moon-dust text-opacity-40 border-t border-white border-opacity-5 z-20 bg-black bg-opacity-20">
        Dreamkeeper Specifications v1.0 • Built with Next.js, Zustand & Framer CSS Glows
      </footer>

      {/* 4. COMPANION INTERACTIVE SPRITE (Room-only floating guide) */}
      {activeView === "room" && (
        <div className="fixed bottom-10 right-10 z-40">
          <LuminaAvatar onClick={() => setIsChatOpen(true)} />
        </div>
      )}

      {/* 5. OVERLAY MODALS */}
      {/* Log Modal */}
      {isLogOpen && (
        <DreamEntry 
          onClose={() => setIsLogOpen(false)}
          onDreamLogged={handleDreamLogged}
        />
      )}

      {/* Dream Details Card */}
      {selectedDream && (
        <DreamCard 
          dream={selectedDream}
          onClose={() => setSelectedDream(null)}
        />
      )}

      {/* Companion Chat dialog panel */}
      {isChatOpen && (
        <LuminaChat 
          onClose={() => setIsChatOpen(false)}
        />
      )}

    </div>
  );
}
