"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDreamStore, GalaxyStar } from "../../stores/dreamStore";
import { Compass, Sparkles, Filter, X } from "lucide-react";

export default function GalaxyView() {
  const stars = useDreamStore((state) => state.galaxyStars);
  const [selectedStar, setSelectedStar] = useState<GalaxyStar | null>(null);
  const [filterMood, setFilterMood] = useState<string>("all");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [hoveredStar, setHoveredStar] = useState<GalaxyStar | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Filter stars
  const filteredStars = stars.filter(star => 
    filterMood === "all" || star.emotionTag === filterMood
  );

  // Canvas Drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 500);

    // Resize handler
    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = 500;
    };
    window.addEventListener("resize", handleResize);

    // Star representations mapping from 3D coords to 2D screen
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw background space nebula dust
      const gradient = ctx.createRadialGradient(width/2, height/2, 50, width/2, height/2, width/1.5);
      gradient.addColorStop(0, "rgba(29, 22, 69, 0.4)");
      gradient.addColorStop(0.5, "rgba(18, 14, 46, 0.2)");
      gradient.addColorStop(1, "rgba(9, 6, 21, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw faint grid lines representing space coordinates
      ctx.strokeStyle = "rgba(165, 148, 249, 0.04)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < width; i += 80) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let j = 0; j < height; j += 80) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        ctx.stroke();
      }

      // Track closest star under cursor
      let closestStar: GalaxyStar | null = null;
      const minDistance = 25; // Click/Hover radius

      filteredStars.forEach((star) => {
        // Map relative coordinates starX (-20 to 20) and starY (-15 to 15) to screen coordinates
        const x = width / 2 + (star.starX * (width / 50));
        const y = height / 2 + (star.starY * (height / 35));
        
        // Calculate distance to mouse
        const dx = mousePos.x - x;
        const dy = mousePos.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance) {
          closestStar = star;
        }

        // Star color coding
        let color = "#ffd166"; // joyful default
        if (star.emotionTag === "peaceful") color = "#58b0e5";
        if (star.emotionTag === "fearful") color = "#e63946";
        if (star.emotionTag === "surprised") color = "#9d4edd";
        if (star.emotionTag === "sad") color = "#82c0cc";
        if (star.emotionTag === "neutral") color = "#94d2bd";

        // Draw star core
        ctx.shadowBlur = distance < 30 ? 15 : 5;
        ctx.shadowColor = color;
        
        ctx.beginPath();
        ctx.arc(x, y, distance < 30 ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Draw star pulse ring if active
        ctx.beginPath();
        ctx.arc(x, y, (Date.now() / 60) % 20 + 4, 0, Math.PI * 2);
        ctx.strokeStyle = color + "22"; // very transparent
        ctx.stroke();

        ctx.shadowBlur = 0; // reset
      });

      // Update hover hook
      setHoveredStar(closestStar);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [filteredStars, mousePos]);

  // Handle canvas click to expand star
  const handleCanvasClick = () => {
    if (hoveredStar) {
      setSelectedStar(hoveredStar);
    }
  };

  // Mouse moves tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8 relative">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 border border-opacity-15">
        <div>
          <h2 className="font-display text-4xl text-moonlight tracking-wider flex items-center gap-2">
            <Compass className="w-8 h-8 text-gold animate-spin" style={{ animationDuration: "120s" }} />
            The Dream Galaxy
          </h2>
          <p className="text-sm text-moon-dust max-w-md mt-1 leading-relaxed">
            Wander through the anonymous constellations of the collective subconscious. Each star represents a dreamer&apos;s voice.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-moon-dust mr-1" />
          {[
            { id: "all", label: "All Constellations" },
            { id: "peaceful", label: "😌 Peaceful" },
            { id: "joyful", label: "✨ Joyful" },
            { id: "fearful", label: "😨 Fear" },
            { id: "surprised", label: "😲 Wonder" }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterMood(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
                filterMood === f.id
                  ? "bg-lavender text-void border-lavender"
                  : "bg-void bg-opacity-40 border-white border-opacity-10 text-moon-dust hover:border-opacity-25"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Galaxy Canvas */}
      <div 
        className="w-full glass-panel border border-opacity-15 rounded-2xl overflow-hidden relative"
        style={{ height: "500px", cursor: hoveredStar ? "pointer" : "default" }}
      >
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onClick={handleCanvasClick}
          className="absolute inset-0 w-full h-full"
        />

        {/* Galaxy Centered Title */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
          <span className="text-[10px] tracking-widest text-lavender uppercase font-bold opacity-60">Subconscious Web Map</span>
        </div>

        {/* Canvas Hover Info Card overlay */}
        {hoveredStar && (
          <div
            className="absolute p-4 w-60 rounded-xl glass-panel pointer-events-none transition-all duration-200 z-10 border border-opacity-35"
            style={{
              left: `${mousePos.x + 15}px`,
              top: `${mousePos.y + 15}px`,
              borderColor: "var(--color-lavender)",
              background: "rgba(12, 9, 32, 0.95)"
            }}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-sm">⭐</span>
              <h4 className="font-display font-medium text-sm text-gold truncate flex-1">{hoveredStar.title || "Shared Dream"}</h4>
            </div>
            <p className="text-[11px] text-moon-dust italic leading-relaxed mb-2">
              &ldquo;{hoveredStar.excerpt}&rdquo;
            </p>
            <div className="flex justify-between items-center text-[9px] uppercase tracking-wider font-semibold text-lavender">
              <span>Constellation: {hoveredStar.emotionTag}</span>
              <span>Click to view</span>
            </div>
          </div>
        )}

        {/* Dynamic prompt at bottom of canvas */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-[10px] tracking-wide text-moon-dust text-opacity-50 pointer-events-none">
          Hover over a star to inspect • Click to listen to interpretation
        </div>
      </div>

      {/* Detailed Selected Star Modal */}
      {selectedStar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-panel relative p-6 md:p-8 border border-opacity-25 animate-float" style={{ borderColor: "var(--color-lavender)" }}>
            
            {/* Close */}
            <button 
              onClick={() => setSelectedStar(null)}
              className="absolute top-4 right-4 p-1 hover:bg-white hover:bg-opacity-10 rounded-full transition-all text-moonlight text-opacity-70"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="space-y-5">
              <div className="text-[10px] uppercase font-bold tracking-wider text-lavender flex items-center gap-1">
                <span>Constellation of {selectedStar.emotionTag}</span>
                <span>• Anonymous Voice</span>
              </div>

              <h3 className="font-display text-2xl text-moonlight tracking-wide">
                {selectedStar.title || "An Untitled Vision"}
              </h3>

              <p className="text-sm text-moon-dust italic leading-relaxed border-l-2 border-lavender border-opacity-35 pl-4 py-0.5">
                &ldquo;{selectedStar.content}&rdquo;
              </p>

              {/* Companion original thoughts */}
              <div 
                className="p-4 rounded-xl border border-white border-opacity-5 text-xs text-moon-dust leading-relaxed font-display"
                style={{ background: "rgba(9, 6, 21, 0.4)" }}
              >
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-gold flex items-center gap-1 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Companion Interpretation:
                </h4>
                &ldquo;{selectedStar.luminaResponse}&rdquo;
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
