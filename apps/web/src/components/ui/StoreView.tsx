"use client";

import React, { useState } from "react";
import { useDreamStore, ALL_STORE_ITEMS, StoreItem } from "../../stores/dreamStore";
import { Sparkles, Check, ShoppingBag } from "lucide-react";

export default function StoreView() {
  const diamonds = useDreamStore((state) => state.diamonds);
  const inventory = useDreamStore((state) => state.inventory);
  
  // Equipped IDs
  const roomTheme = useDreamStore((state) => state.roomTheme);
  const fairySkin = useDreamStore((state) => state.fairySkin);
  const jarSkin = useDreamStore((state) => state.jarSkin);
  
  const purchaseItem = useDreamStore((state) => state.purchaseItem);
  const equipItem = useDreamStore((state) => state.equipItem);

  const [activeTab, setActiveTab] = useState<StoreItem["category"]>("jar_skin");
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  const itemsFiltered = ALL_STORE_ITEMS.filter((item) => item.category === activeTab);

  const isEquipped = (item: StoreItem) => {
    if (item.category === "room_theme") return roomTheme === item.id;
    if (item.category === "fairy_skin") return fairySkin === item.id;
    if (item.category === "jar_skin") return jarSkin === item.id;
    return false;
  };

  const handleAction = (item: StoreItem) => {
    setPurchaseError(null);
    const owned = inventory.includes(item.id);

    if (owned) {
      equipItem(item.id, item.category);
    } else {
      const success = purchaseItem(item);
      if (success) {
        // Automatically equip purchased item
        equipItem(item.id, item.category);
      } else {
        setPurchaseError("Alas, you do not have enough diamonds in your pocket.");
        setTimeout(() => setPurchaseError(null), 3000);
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 border border-opacity-15">
        <div>
          <h2 className="font-display text-4xl text-moonlight tracking-wider flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-lavender" />
            The Bazaar of Whispers
          </h2>
          <p className="text-sm text-moon-dust max-w-md mt-1 leading-relaxed">
            Spend the stardust diamonds earned from documenting your subconscious dreams on cosmetic artifacts.
          </p>
        </div>

        {/* Currency Display */}
        <div 
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border"
          style={{
            borderColor: "var(--color-gold)",
            background: "rgba(243, 194, 99, 0.08)"
          }}
        >
          <span className="text-2xl animate-bounce" style={{ animationDuration: "3s" }}>💎</span>
          <div className="text-right">
            <div className="text-xs text-moon-dust font-semibold tracking-wide uppercase opacity-75">Your Stardust</div>
            <div className="text-xl font-bold font-display text-gold leading-none">{diamonds} Diamonds</div>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex border-b border-white border-opacity-10 gap-6">
        {[
          { id: "jar_skin", label: "Dream Containers" },
          { id: "fairy_skin", label: "Fairy Skins" },
          { id: "room_theme", label: "Room Themes" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as StoreItem["category"])}
            className={`pb-3 text-sm tracking-wider font-semibold uppercase relative transition-all duration-300 ${
              activeTab === tab.id 
                ? "text-lavender font-bold" 
                : "text-moon-dust hover:text-moonlight"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span 
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                style={{ background: "var(--color-lavender)", boxShadow: "0 0 10px rgba(165, 148, 249, 0.7)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Error alert toast */}
      {purchaseError && (
        <div className="p-3 text-sm rounded-xl bg-red-950 bg-opacity-35 border border-red-500 border-opacity-30 text-red-200 animate-pulse text-center">
          {purchaseError}
        </div>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {itemsFiltered.map((item) => {
          const owned = inventory.includes(item.id);
          const equipped = isEquipped(item);
          
          return (
            <div 
              key={item.id} 
              className={`glass-panel p-5 flex flex-col justify-between border border-opacity-15 relative overflow-hidden transition-all duration-300 ${
                equipped ? "ring-1 ring-lavender ring-opacity-50" : ""
              }`}
            >
              {/* Item Graphic Preview (Stylized shapes/visual placeholders) */}
              <div 
                className="h-36 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden"
                style={{ 
                  background: item.id === "fairy_bedroom" 
                    ? "linear-gradient(135deg, #2e245a 0%, #170f38 100%)" 
                    : item.id === "moon_palace"
                    ? "linear-gradient(135deg, #1d1645 0%, #0d0a1a 100%)"
                    : item.id === "obsidian_space"
                    ? "linear-gradient(135deg, #090615 0%, #1f082e 100%)"
                    : "rgba(9, 6, 21, 0.45)"
                }}
              >
                {/* Floating preview sphere */}
                <div 
                  className="w-16 h-16 rounded-full blur-[2px] animate-pulse-slow"
                  style={{
                    background: item.previewColor || "rgba(165, 148, 249, 0.2)",
                    boxShadow: `0 0 30px ${item.previewColor || "rgba(165, 148, 249, 0.25)"}`
                  }}
                />
                
                <span className="absolute text-moonlight text-xs font-display italic font-semibold tracking-wide uppercase opacity-75">
                  {item.name}
                </span>

                {equipped && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-lavender bg-opacity-20 text-[9px] text-lavender border border-lavender border-opacity-40 uppercase font-semibold">
                    Active
                  </span>
                )}
              </div>

              {/* Text Info */}
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl text-moonlight">{item.name}</h3>
                  <p className="text-xs text-moon-dust leading-relaxed mt-1">{item.description}</p>
                </div>

                {/* Purchase Button Action */}
                <div className="pt-4 flex items-center justify-between border-t border-white border-opacity-5 mt-4">
                  {/* Price info or owned indicator */}
                  <div>
                    {owned ? (
                      <span className="text-[10px] text-moon-dust uppercase tracking-wider font-semibold">Owned</span>
                    ) : (
                      <div className="flex items-center gap-1">
                        <span className="text-sm">💎</span>
                        <span className="text-sm font-bold text-gold">{item.cost}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleAction(item)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1 ${
                      equipped 
                        ? "bg-transparent border border-lavender text-lavender cursor-default" 
                        : owned
                        ? "bg-lavender text-void hover:scale-102"
                        : "bg-gold text-void hover:scale-102 hover:shadow-[0_0_10px_rgba(243,194,99,0.3)]"
                    }`}
                  >
                    {equipped ? (
                      <>
                        <Check className="w-3 h-3" />
                        Equipped
                      </>
                    ) : owned ? (
                      "Equip"
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        Unlock
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
