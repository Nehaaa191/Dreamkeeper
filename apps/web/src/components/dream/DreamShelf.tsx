"use client";

import React from "react";
import { Dream } from "../../stores/dreamStore";
import DreamContainer from "./DreamContainer";
import { Plus, HelpCircle } from "lucide-react";

interface DreamShelfProps {
  dreams: Dream[];
  onOpenLogModal: () => void;
  onSelectDream: (dream: Dream) => void;
}

export default function DreamShelf({ dreams, onOpenLogModal, onSelectDream }: DreamShelfProps) {
  // We want to lay out the last 7 days: starting 6 days ago, ending today.
  const getPast7Days = () => {
    const days = [];
    const dateNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push({
        dateString: d.toDateString(),
        dayName: dateNames[d.getDay()],
        label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        isToday: i === 0
      });
    }
    return days;
  };

  const daysList = getPast7Days();

  // Find if there's a dream logged on each specific date
  const getDreamForDate = (dateStr: string) => {
    return dreams.find(dream => new Date(dream.loggedAt).toDateString() === dateStr);
  };

  return (
    <div className="w-full space-y-4">
      {/* Dynamic Shelf Container */}
      <div className="relative pb-6 px-4 md:px-8">
        
        {/* The Shelf Rows Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6 justify-items-center relative z-10 pt-10">
          {daysList.map((day, index) => {
            const loggedDream = getDreamForDate(day.dateString);
            
            return (
              <div key={index} className="flex flex-col items-center space-y-3 w-full max-w-[100px]">
                {/* Visual Content Slot */}
                <div className="h-28 flex items-end justify-center w-full relative">
                  {loggedDream ? (
                    <DreamContainer 
                      dream={loggedDream} 
                      onClick={() => onSelectDream(loggedDream)} 
                    />
                  ) : (
                    /* Empty Slot Placeholder */
                    <button
                      onClick={onOpenLogModal}
                      className={`w-14 h-20 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300 group ${
                        day.isToday
                          ? "border-lavender border-opacity-70 hover:border-opacity-100 bg-lavender bg-opacity-5 hover:bg-opacity-10"
                          : "border-white border-opacity-15 hover:border-opacity-30 hover:bg-white hover:bg-opacity-5"
                      }`}
                      style={{
                        boxShadow: day.isToday ? "0 0 10px rgba(165, 148, 249, 0.15)" : "none"
                      }}
                    >
                      <Plus className={`w-5 h-5 mb-1 transition-transform group-hover:scale-110 ${
                        day.isToday ? "text-lavender" : "text-moon-dust text-opacity-50"
                      }`} />
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-moon-dust opacity-70">
                        {day.isToday ? "Log" : "Empty"}
                      </span>
                    </button>
                  )}

                  {/* Today indicator pulse */}
                  {day.isToday && !loggedDream && (
                    <div className="absolute top-2 w-2.5 h-2.5 rounded-full bg-lavender animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Day label */}
                <div className="text-center w-full pt-1.5 border-t border-white border-opacity-10">
                  <div className={`text-xs font-semibold uppercase tracking-wide ${day.isToday ? "text-lavender font-bold" : "text-moonlight text-opacity-80"}`}>
                    {day.dayName}
                  </div>
                  <div className="text-[9px] text-moon-dust opacity-60">
                    {day.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Shelf Wooden/Glowing Plate */}
        <div 
          className="absolute bottom-12 left-0 right-0 h-4 rounded-xl border-t border-b border-opacity-30 shadow-lg pointer-events-none"
          style={{
            background: "linear-gradient(180deg, #2e245a 0%, #170f38 100%)",
            borderColor: "var(--color-gold)",
            boxShadow: "0 6px 15px rgba(243, 194, 99, 0.15), 0 0 15px rgba(165, 148, 249, 0.05)"
          }}
        />
        
        {/* Support brackets under shelf */}
        <div className="absolute bottom-6 left-12 w-6 h-6 border-l border-t border-opacity-35 pointer-events-none" style={{ borderColor: "var(--color-gold)", transform: "rotate(-45deg)" }} />
        <div className="absolute bottom-6 right-12 w-6 h-6 border-r border-t border-opacity-35 pointer-events-none" style={{ borderColor: "var(--color-gold)", transform: "rotate(45deg)" }} />
      </div>
      
      {/* Help info card */}
      <div className="text-center text-xs text-moon-dust opacity-55 flex items-center justify-center gap-1">
        <HelpCircle className="w-3.5 h-3.5" />
        Jars are color-coded by mood: Blue (Peaceful/Sad), Gold (Joyful), Red (Fearful), Purple (Surprised), Teal (Neutral)
      </div>
    </div>
  );
}
