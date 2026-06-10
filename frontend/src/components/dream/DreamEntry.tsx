"use client";

import React, { useState } from "react";
import { useDreamStore } from "../../stores/dreamStore";
import { X, Sparkles, Plus, Check } from "lucide-react";

interface DreamEntryProps {
  onClose: () => void;
  onDreamLogged: () => void;
}

const MOODS = [
  { id: "peaceful", emoji: "😌", label: "Peaceful" },
  { id: "joyful", emoji: "✨", label: "Joyful" },
  { id: "surprised", emoji: "😲", label: "Surprised" },
  { id: "neutral", emoji: "😴", label: "Neutral" },
  { id: "sad", emoji: "😢", label: "Sad" },
  { id: "fearful", emoji: "😨", label: "Fearful" }
];

const POPULAR_TAGS = ["flying", "water", "forest", "moon", "key", "clock", "mirror", "lucid", "shadow"];

export default function DreamEntry({ onClose, onDreamLogged }: DreamEntryProps) {
  const addDream = useDreamStore((state) => state.addDream);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState("peaceful");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState("");

  const togglePopularTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    const tag = customTagInput.trim().toLowerCase();
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setCustomTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addDream(title, content, selectedMood, selectedTags);
    onDreamLogged(); // Callback to open the Lumina response page
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-md overflow-y-auto">
      {/* Modal Wrapper */}
      <div 
        className="w-full max-w-2xl glass-panel relative border flex flex-col my-8 animate-float"
        style={{ borderColor: "rgba(165, 148, 249, 0.25)" }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white border-opacity-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            <h2 className="font-display text-2xl tracking-wide text-moonlight">Log Tonight&apos;s Dream</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white hover:bg-opacity-10 rounded-full transition-all text-moonlight text-opacity-70"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-1">
          {/* Title input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold tracking-wider text-moon-dust uppercase">Dream Title (Optional)</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Floating Citadel, Shadows in the Mist..."
              className="glass-input"
            />
          </div>

          {/* Dream Content */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold tracking-wider text-moon-dust uppercase">Your Dream (Describe what you saw, felt, or heard...)</label>
            <textarea
              required
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="I was flying above an ancient city..."
              className="glass-input resize-none leading-relaxed"
            />
          </div>

          {/* Mood Selection */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold tracking-wider text-moon-dust uppercase">How did it feel?</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {MOODS.map((m) => {
                const isSelected = selectedMood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMood(m.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 ${
                      isSelected 
                        ? "border-lavender text-white scale-105" 
                        : "border-white border-opacity-5 text-moon-dust hover:border-opacity-20"
                    }`}
                    style={{
                      background: isSelected 
                        ? "rgba(165, 148, 249, 0.15)" 
                        : "rgba(9, 6, 21, 0.4)",
                      boxShadow: isSelected ? "0 0 12px rgba(165, 148, 249, 0.15)" : "none"
                    }}
                  >
                    <span className="text-2xl mb-1">{m.emoji}</span>
                    <span className="text-[10px] tracking-wide font-medium">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags Section */}
          <div className="space-y-3">
            <label className="text-xs font-semibold tracking-wider text-moon-dust uppercase block">Tags (triggers symbol detection)</label>
            
            {/* Quick selection popular tags */}
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => togglePopularTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 flex items-center gap-1 ${
                      isSelected
                        ? "bg-lavender text-void border-lavender"
                        : "bg-void bg-opacity-40 border-white border-opacity-10 text-moon-dust hover:border-opacity-25"
                    }`}
                  >
                    {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    {tag}
                  </button>
                );
              })}
            </div>

            {/* Custom tags input */}
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                placeholder="Add custom tag..."
                className="glass-input py-1 px-3 text-xs w-48"
              />
              <button 
                type="button"
                onClick={handleAddCustomTag}
                className="px-3 py-1.5 rounded-lg border border-opacity-20 hover:bg-white hover:bg-opacity-5 text-xs text-moonlight font-medium transition-all"
                style={{ borderColor: "var(--color-lavender)" }}
              >
                Add
              </button>
            </div>

            {/* Display selected tags if any custom ones are added */}
            {selectedTags.some(t => !POPULAR_TAGS.includes(t)) && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedTags.filter(t => !POPULAR_TAGS.includes(t)).map((t) => (
                  <span
                    key={t}
                    onClick={() => removeTag(t)}
                    className="px-2 py-0.5 rounded bg-indigo-950 text-moon-dust text-[10px] border border-white border-opacity-5 cursor-pointer hover:bg-red-950 hover:text-white transition-all flex items-center gap-1"
                  >
                    {t} <span className="text-[8px] opacity-50">×</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white border-opacity-15 text-moonlight hover:bg-white hover:bg-opacity-5 text-sm font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!content.trim()}
              className="px-6 py-2.5 rounded-xl text-white font-medium hover:scale-102 transition-all flex items-center gap-2 hover:shadow-[0_0_15px_rgba(138,43,226,0.5)] disabled:opacity-50 disabled:pointer-events-none"
              style={{
                background: "var(--gradient-magic-button)",
              }}
            >
              <Sparkles className="w-4 h-4" />
              Preserve this Dream →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
