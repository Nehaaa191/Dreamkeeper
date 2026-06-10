"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDreamStore } from "../../stores/dreamStore";
import { X, Send, Sparkles } from "lucide-react";

interface LuminaChatProps {
  onClose: () => void;
}

interface Message {
  sender: "user" | "companion";
  text: string;
  timestamp: Date;
}

export default function LuminaChat({ onClose }: LuminaChatProps) {
  const fairySkin = useDreamStore((state) => state.fairySkin);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getCompanionName = () => {
    if (fairySkin === "moon_fox") return "Moon Fox";
    if (fairySkin === "tiny_dragon") return "Aether Dragon";
    return "Lumina";
  };

  const companionName = getCompanionName();

  // Initial welcome message
  useEffect(() => {
    let welcomeText = "";
    if (fairySkin === "moon_fox") {
      welcomeText = "Greetings, wanderer. I watch the stars rise and set. Have you seen anything in the dark paths you wish to decode?";
    } else if (fairySkin === "tiny_dragon") {
      welcomeText = "Aha! You want to talk about your visions? Tell me all about them, don't leave out any details! Did anything explode?";
    } else {
      welcomeText = "Welcome back, gentle soul. I am here to sit with you. Tell me, what reflections or questions has the dreamworld left with you today?";
    }

    setMessages([
      {
        sender: "companion",
        text: welcomeText,
        timestamp: new Date()
      }
    ]);
  }, [fairySkin]);

  // Autoscroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reply simulation engine based on keywords
  const generateReply = (input: string): string => {
    const text = input.toLowerCase();
    
    // Core logic matching Lumina style guide
    if (text.includes("water") || text.includes("ocean") || text.includes("sea") || text.includes("river")) {
      return `Water in the dreamscape is the mirror of your emotional body. If the water was calm, it shows you are aligning with your inner current. If turbulent, there is a wave of feeling that demands your attention rather than your resistance. What did it feel like to stand by the water?`;
    }
    if (text.includes("fly") || text.includes("flying") || text.includes("sky") || text.includes("wings")) {
      return `Taking flight is your spirit's way of rising above waking constraints. It suggests you are expanding your horizon or trying to find perspective on a complex issue. Did you feel control while soaring, or were you carried by the wind?`;
    }
    if (text.includes("monster") || text.includes("scared") || text.includes("nightmare") || text.includes("chase") || text.includes("running")) {
      return `Fear in dreams is a landscape of shadows. The pursuer is often a sleeping strength or an unaddressed concern taking a physical shape. When we stop running and look closely, we find these monsters are merely seeking to be integrated. What do you think they want you to notice?`;
    }
    if (text.includes("key") || text.includes("door") || text.includes("lock")) {
      return `Keys and doors mark the boundaries of your awareness. To seek a key is to feel ready for a secret or a new chapter. A locked door indicates a part of your potential you are guarding. You hold the key in your heart—when are you ready to open it?`;
    }
    if (text.includes("fox") || text.includes("animal") || text.includes("wolf") || text.includes("dog")) {
      return `Animals are raw, instinctual guides. Meeting an animal in your dream is an invitation to reconnect with your basic nature. A fox, in particular, points to cleverness, adaptation, and trusting your quiet intuition. How did the guardian react to you?`;
    }
    if (text.includes("meaning") || text.includes("why do we dream") || text.includes("what is this")) {
      return `Dreams are not riddles to solve, but conversations with your inner self. They are tapestry woven from your waking thoughts, hidden wishes, and the ancient currents of the subconscious. By journaling them, you build a bridge between these worlds.`;
    }

    // Default responses based on skin
    if (fairySkin === "moon_fox") {
      return `The moon reflects what the sun hides. Your query carries a quiet weight. Sit with the feeling for a moment. What does your heart whisper when you look past the obvious details?`;
    } else if (fairySkin === "tiny_dragon") {
      return `A fascinating thought! If I were in that dream, I would have roasted those obstacles with violet fire! It sounds like a sign that you have more fire in you than you realize. Try standing taller today!`;
    } else {
      return `That is a beautiful thread to pull. Like a leaf drifting in a stream, thoughts in our sleep point to where the current is flowing. Does any part of this feeling resonate with something you are experiencing in your waking life right now?`;
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: inputValue,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate thinking delay
    setTimeout(() => {
      const replyText = generateReply(userMessage.text);
      setMessages((prev) => [
        ...prev,
        {
          sender: "companion",
          text: replyText,
          timestamp: new Date()
        }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
      {/* Chat Container */}
      <div 
        className="w-full max-w-lg glass-panel flex flex-col overflow-hidden relative border"
        style={{
          height: "500px",
          borderColor: "rgba(165, 148, 249, 0.3)"
        }}
      >
        {/* Header */}
        <div 
          className="px-6 py-4 flex items-center justify-between border-b border-opacity-20"
          style={{
            borderColor: "var(--color-lavender)",
            background: "rgba(30, 21, 64, 0.4)"
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <h3 className="font-display text-lg tracking-wider text-moonlight flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold" />
              Dialogue with {companionName}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-white hover:bg-opacity-10 rounded-full transition-all text-moonlight text-opacity-70 hover:text-opacity-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "text-white rounded-br-none"
                    : "text-moon-dust rounded-bl-none"
                }`}
                style={{
                  background: msg.sender === "user" 
                    ? "linear-gradient(135deg, rgba(138, 43, 226, 0.5) 0%, rgba(74, 0, 226, 0.5) 100%)" 
                    : "rgba(9, 6, 21, 0.6)",
                  border: msg.sender === "user"
                    ? "1px solid rgba(165, 148, 249, 0.4)"
                    : "1px solid rgba(165, 148, 249, 0.15)"
                }}
              >
                <p>{msg.text}</p>
                <span className="text-[10px] text-moon-dust opacity-50 block mt-1.5 text-right">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form 
          onSubmit={handleSend}
          className="p-4 border-t border-opacity-10 bg-black bg-opacity-25 flex gap-2"
          style={{ borderColor: "var(--color-lavender)" }}
        >
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Ask ${companionName} about a symbol, a feeling, or dream rules...`}
            className="flex-1 glass-input py-2 text-sm"
          />
          <button 
            type="submit"
            className="px-4 rounded-lg flex items-center justify-center transition-all text-white font-medium hover:scale-105"
            style={{
              background: "var(--gradient-magic-button)",
              boxShadow: "0 0 10px rgba(138, 43, 226, 0.3)"
            }}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
