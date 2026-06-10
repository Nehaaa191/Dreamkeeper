import { create } from "zustand";

export interface Dream {
  id: string;
  title: string;
  content: string;
  mood: string; // 'peaceful', 'fearful', 'joyful', 'sad', 'surprised', 'neutral'
  tags: string[];
  loggedAt: string;
  containerType: string;
  containerColor: string;
  isSharedGalaxy: boolean;
  emotions: { [key: string]: number };
  symbols: string[];
  themes: string[];
  luminaResponse: string;
}

export interface StoreItem {
  id: string;
  category: "jar_skin" | "room_theme" | "fairy_skin";
  name: string;
  description: string;
  cost: number;
  isStarter: boolean;
  previewColor?: string;
}

export interface Achievement {
  key: string;
  name: string;
  description: string;
  reward: number;
  earned: boolean;
  claimed: boolean;
}

export interface GalaxyStar {
  id: string;
  excerpt: string;
  emotionTag: string;
  symbolTags: string[];
  starX: number;
  starY: number;
  starZ: number;
  title?: string;
  content: string;
  luminaResponse: string;
}

interface DreamState {
  // User Stats
  diamonds: number;
  streak: number;
  username: string;
  lastLogDate: string | null;
  
  // Customization Configuration
  roomTheme: string;
  fairySkin: string;
  jarSkin: string;
  avatarConfig: {
    hair: string;
    eyes: string;
    outfit: string;
  };
  
  // Lists
  dreams: Dream[];
  inventory: string[]; // store item IDs
  achievements: Achievement[];
  galaxyStars: GalaxyStar[];
  
  // Navigation / App State
  activeView: "landing" | "room" | "galaxy" | "store" | "achievements" | "profile";
  onboardingStep: number; // 0 = not started, 1 = name, 2 = avatar, 3 = fairy, 4 = done

  // Actions
  setView: (view: "landing" | "room" | "galaxy" | "store" | "achievements" | "profile") => void;
  setOnboardingStep: (step: number) => void;
  setUsername: (name: string) => void;
  updateAvatar: (config: Partial<DreamState["avatarConfig"]>) => void;
  addDream: (title: string, content: string, mood: string, tags: string[]) => void;
  purchaseItem: (item: StoreItem) => boolean;
  equipItem: (itemId: string, category: StoreItem["category"]) => void;
  claimAchievementReward: (key: string) => void;
  shareToGalaxy: (dreamId: string) => void;
  checkAchievementsTrigger: (triggerType: string) => void;
}

// Starter store items database
export const ALL_STORE_ITEMS: StoreItem[] = [
  // Jar Skins
  { id: "crystal_jar", category: "jar_skin", name: "Crystal Jar", description: "A classic glass jar that radiates a soft, clean glow.", cost: 0, isStarter: true },
  { id: "potion_bottle", category: "jar_skin", name: "Alchemist Bottle", description: "A teardrop potion bottle wrapped in silver filigree.", cost: 80, isStarter: false, previewColor: "var(--color-lavender)" },
  { id: "celestial_orb", category: "jar_skin", name: "Lunar Orb", description: "A floating sphere that acts as a lens into another dimension.", cost: 150, isStarter: false, previewColor: "var(--color-gold)" },
  
  // Room Themes
  { id: "fairy_bedroom", category: "room_theme", name: "Fairy Bedroom", description: "A cozy bedroom draped in moss, wild roses, and soft candle lanterns.", cost: 0, isStarter: true },
  { id: "moon_palace", category: "room_theme", name: "Moonlight Terrace", description: "An open balcony overlooking an endless violet nebula and silver crescent moon.", cost: 250, isStarter: false, previewColor: "#70d6ff" },
  { id: "obsidian_space", category: "room_theme", name: "Obsidian Void", description: "A dark observatory surrounded by shooting stars and floating crystals.", cost: 400, isStarter: false, previewColor: "#ff70a6" },
  
  // Fairy Companions
  { id: "lumina", category: "fairy_skin", name: "Lumina (Default)", description: "A tiny fairy of pure, warm starlight and violet wings. Deeply wise.", cost: 0, isStarter: true },
  { id: "moon_fox", category: "fairy_skin", name: "Moon Fox", description: "A silver fox with crescent symbols and floating spirit embers. Quiet and playful.", cost: 180, isStarter: false, previewColor: "var(--color-rose-mist)" },
  { id: "tiny_dragon", category: "fairy_skin", name: "Aether Dragon", description: "A miniature celestial dragon that puffs soft lavender smoke. Dramatic.", cost: 280, isStarter: false, previewColor: "var(--color-gold)" }
];

// Curated dictionary of dream symbols for simulated parsing
const SYMBOL_DICTIONARY: { [key: string]: string[] } = {
  flying: ["wings", "sky", "floating", "clouds", "wind", "soaring", "heights"],
  water: ["ocean", "sea", "river", "lake", "drowning", "swimming", "waves", "rain", "storm"],
  fox: ["fox", "canine", "furry", "red tail", "woods"],
  forest: ["trees", "woods", "leaves", "branches", "jungle", "greenery"],
  moon: ["moon", "stars", "night", "crescent", "moonlight"],
  key: ["key", "lock", "door", "chest", "gate", "secret"],
  clock: ["clock", "time", "watch", "late", "numbers", "hourglass"],
  falling: ["falling", "cliff", "drop", "abyss", "sink"],
  mirror: ["mirror", "reflection", "glass", "double", "replica"]
};

// Map mood to container color variable
const MOOD_COLORS: { [key: string]: string } = {
  peaceful: "var(--color-peaceful)",
  fearful: "var(--color-nightmare)",
  joyful: "var(--color-joyful)",
  sad: "var(--color-peaceful)",
  surprised: "var(--color-mysterious)",
  neutral: "var(--color-neutral)"
};

// initial achievements
const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { key: "first_dream", name: "First Dream", description: "Preserve your first dream on the shelf", reward: 50, earned: false, claimed: false },
  { key: "seven_streak", name: "Week of Dreams", description: "Maintain a 7-day dream logging streak", reward: 100, earned: false, claimed: false },
  { key: "symbol_seeker", name: "Symbol Seeker", description: "Have a total of 5 unique symbols detected", reward: 30, earned: false, claimed: false },
  { key: "night_owl", name: "Night Owl", description: "Log a dream between midnight and 6:00 AM", reward: 25, earned: false, claimed: false },
  { key: "lucid_dreamer", name: "Lucid Dreamer", description: "Log a dream tagged with the word 'lucid'", reward: 75, earned: false, claimed: false },
  { key: "collector", name: "Curator", description: "Own at least 3 cosmetic store items", reward: 50, earned: false, claimed: false }
];

// Initial preloaded dreams for showcase
const PRELOADED_DREAMS: Dream[] = [
  {
    id: "pre-1",
    title: "Flight Over the Sunken Library",
    content: "I had wings made of parchment paper. I soared high over an ocean that was completely filled with floating bookshelves. The water was crystalline blue. I was trying to find a key that was supposed to unlock a massive wooden door floating on the horizon. The wind felt warm, carrying the scent of old paper and salt water.",
    mood: "peaceful",
    tags: ["flying", "water", "books", "key"],
    loggedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    containerType: "crystal_jar",
    containerColor: "var(--color-peaceful)",
    isSharedGalaxy: true,
    emotions: { joy: 0.75, sadness: 0.05, fear: 0.05, neutral: 0.15 },
    symbols: ["🌊 Ocean", "🔑 Key", "📖 Books", "🪶 Wings"],
    themes: ["freedom", "growth", "seeking wisdom"],
    luminaResponse: "Flying with paper wings suggests you seek liberty through expression and knowledge. The floating library beneath you points to a vast archive of memory or wisdom you are skimming over. The key on the horizon is your curiosity; you are ready to open a door that has long been locked."
  },
  {
    id: "pre-2",
    title: "The Silent Forest Guardian",
    content: "I was walking in a dense, dark forest where the trees were taller than skyscrapers. It was dead silent. Suddenly, a glowing silver fox stepped out of the shadow. It didn't speak with words, but I knew it wanted me to follow it. We walked until we reached a clearing bathed in soft silver moonlight. I felt a deep sense of relief.",
    mood: "joyful",
    tags: ["animals", "forest", "moonlight"],
    loggedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    containerType: "crystal_jar",
    containerColor: "var(--color-joyful)",
    isSharedGalaxy: false,
    emotions: { joy: 0.85, sadness: 0.0, fear: 0.1, neutral: 0.05 },
    symbols: ["🦊 Fox", "🌲 Forest", "🌙 Moon"],
    themes: ["guidance", "intuition", "peace"],
    luminaResponse: "The silent forest stands for the deep layers of your subconscious, quiet and towering. Meeting the glowing silver fox is an encounter with your inner guidance—your intuition, which speaks in silences. Walking into the moonlit clearing shows you are emerging into a space of clarity and emotional safety."
  }
];

// Preloaded galaxy stars (public anonymous dreams)
const PRELOADED_GALAXY: GalaxyStar[] = [
  { id: "g-1", excerpt: "I was running down a spiral staircase made of mirrors. Each reflection was wearing a different mask...", emotionTag: "surprised", symbolTags: ["mirror", "mask", "stairs"], starX: -15, starY: 10, starZ: -20, title: "The Mirror Staircase", content: "I was running down a spiral staircase made of mirrors. Each reflection was wearing a different mask. None of them had my real face. When I tried to touch one, the mirror rippled like water.", luminaResponse: "This dream reflects a search for identity. The masks on your reflections represent the roles you play for others. The stairs show transition, and the rippling mirror suggests your sense of self is fluid and changing." },
  { id: "g-2", excerpt: "A clock without hands started ticking backwards. I looked down and saw my shadow stretching across...", emotionTag: "fearful", symbolTags: ["clock", "shadow", "time"], starX: 18, starY: -8, starZ: -15, title: "Backwards Clock", content: "A clock without hands started ticking backwards. I looked down and saw my shadow stretching across the entire room. The shadows started speaking to each other.", luminaResponse: "A clock without hands points to a feeling of being out of sync with time or fearing constraints. The speaking shadows represent unacknowledged thoughts or parts of yourself demanding to be heard." },
  { id: "g-3", excerpt: "I fell from the sky but instead of hitting the ground, I landed on a soft cloud made of cotton candy...", emotionTag: "joyful", symbolTags: ["falling", "sky", "cloud"], starX: 5, starY: 15, starZ: -25, title: "Sweet Fall", content: "I fell from the sky but instead of hitting the ground, I landed on a soft cloud made of cotton candy. It tasted like raspberries and carried me away.", luminaResponse: "Fearing a fall but landing in sweetness reveals a release of anxiety. What looked like a drop or danger resolved into comfort, showing that you can trust your transitions." }
];

export const useDreamStore = create<DreamState>((set, get) => ({
  // User Stats
  diamonds: 240,
  streak: 7,
  username: "Mia",
  lastLogDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toDateString(), // last logged yesterday

  // Customization
  roomTheme: "fairy_bedroom",
  fairySkin: "lumina",
  jarSkin: "crystal_jar",
  avatarConfig: {
    hair: "pink-braids",
    eyes: "violet",
    outfit: "celestial-robe"
  },

  // Lists
  dreams: PRELOADED_DREAMS,
  inventory: ["crystal_jar", "fairy_bedroom", "lumina"], // starter items owned
  achievements: INITIAL_ACHIEVEMENTS,
  galaxyStars: PRELOADED_GALAXY,

  // App State
  activeView: "landing",
  onboardingStep: 0,

  setView: (view) => set({ activeView: view }),
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  setUsername: (name) => set({ username: name }),
  updateAvatar: (config) => set((state) => ({
    avatarConfig: { ...state.avatarConfig, ...config }
  })),

  addDream: (title, content, mood, tags) => {
    // 1. Simulate AI Pipeline processing
    const lowerContent = content.toLowerCase();
    
    // Emotion parsing simulation
    const emotions: { [key: string]: number } = { joy: 0.1, sadness: 0.1, fear: 0.1, neutral: 0.6 };
    if (mood === "joyful") { emotions.joy = 0.8; emotions.neutral = 0.1; }
    else if (mood === "fearful") { emotions.fear = 0.8; emotions.neutral = 0.1; }
    else if (mood === "sad") { emotions.sadness = 0.8; emotions.neutral = 0.1; }
    else if (mood === "peaceful") { emotions.joy = 0.45; emotions.neutral = 0.45; }
    else if (mood === "surprised") { emotions.fear = 0.3; emotions.joy = 0.5; }
    
    // Symbol parsing simulation
    const symbolsDetected: string[] = [];
    Object.keys(SYMBOL_DICTIONARY).forEach((sym) => {
      const keywords = SYMBOL_DICTIONARY[sym];
      const hasMatch = keywords.some(keyword => lowerContent.includes(keyword)) || tags.includes(sym);
      if (hasMatch) {
        let emoji = "✨";
        if (sym === "flying") emoji = "🪶 Wings";
        if (sym === "water") emoji = "🌊 Ocean";
        if (sym === "fox") emoji = "🦊 Fox";
        if (sym === "forest") emoji = "🌲 Forest";
        if (sym === "moon") emoji = "🌙 Moon";
        if (sym === "key") emoji = "🔑 Key";
        if (sym === "clock") emoji = "🕰️ Clock";
        if (sym === "falling") emoji = "🕳️ Abyss";
        if (sym === "mirror") emoji = "🪞 Mirror";
        symbolsDetected.push(emoji);
      }
    });
    
    // Themes simulation
    const themesDetected: string[] = [];
    if (lowerContent.includes("run") || lowerContent.includes("chase") || lowerContent.includes("late")) themesDetected.push("stress");
    if (lowerContent.includes("fly") || lowerContent.includes("wings") || lowerContent.includes("soar")) themesDetected.push("freedom");
    if (lowerContent.includes("key") || lowerContent.includes("door") || lowerContent.includes("search")) themesDetected.push("exploration");
    if (lowerContent.includes("forest") || lowerContent.includes("water") || lowerContent.includes("lake")) themesDetected.push("nature connections");
    if (themesDetected.length === 0) themesDetected.push("subconscious alignment");

    // Lumina persona generator
    let companionName = "Lumina";
    const skin = get().fairySkin;
    if (skin === "moon_fox") companionName = "Moon Fox";
    if (skin === "tiny_dragon") companionName = "Aether Dragon";

    let interpretation = "";
    if (mood === "peaceful") {
      interpretation = `As ${companionName}, I sense a deep pool of calm within you. The elements in this dream represent water settling or finding its course. You are letting go of unnecessary strain and allowing your mind to rest in its natural clarity. Hold on to this stillness as you move through your day.`;
    } else if (mood === "fearful") {
      interpretation = `It is okay to be startled by what rises in the dark. As ${companionName}, I see this tension as a shadow cast by something you care about deeply. The chase or threat is a projection of a waking stressor you are ready to face. You carry the shield of your own awareness; the monsters vanish when you look them in the eyes.`;
    } else if (mood === "joyful") {
      interpretation = `How wonderful it is to capture this spark! As ${companionName}, I feel your spirit climbing. The symbols here show creative flow and joy unlocking. You are stepping fully into your power and claiming your own sky. Let this warmth radiate into your waking hours.`;
    } else {
      interpretation = `Every trace of memory carries meaning. As ${companionName}, I notice the symbols in this dream point to a transition—an opening or an unfinished thought. You are seeking answers to a question you haven't fully formulated yet. Trust the process and let the path reveal itself.`;
    }

    const currentJar = get().jarSkin;

    const newDream: Dream = {
      id: "dream-" + Date.now(),
      title: title || "An Untitled Vision",
      content,
      mood,
      tags,
      loggedAt: new Date().toISOString(),
      containerType: currentJar,
      containerColor: MOOD_COLORS[mood] || "var(--color-neutral)",
      isSharedGalaxy: false,
      emotions,
      symbols: symbolsDetected.length > 0 ? symbolsDetected : ["✨ Mystery"],
      themes: themesDetected,
      luminaResponse: interpretation
    };

    // 2. Handle streak and diamond rewards
    const todayStr = new Date().toDateString();
    const lastLog = get().lastLogDate;
    
    let currentStreak = get().streak;
    let streakBonus = 0;
    
    if (lastLog === todayStr) {
      // already logged today, streak stays the same
    } else {
      const yesterdayStr = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
      if (lastLog === yesterdayStr) {
        // logged yesterday, increment streak
        currentStreak += 1;
        // check streak bonuses
        if (currentStreak === 3) streakBonus = 5;
        if (currentStreak === 7) streakBonus = 20;
        if (currentStreak === 30) streakBonus = 100;
      } else {
        // broke streak
        currentStreak = 1;
      }
    }

    const diamondReward = 10 + streakBonus; // +10 daily log, plus streak bonus

    set((state) => ({
      dreams: [newDream, ...state.dreams],
      diamonds: state.diamonds + diamondReward,
      streak: currentStreak,
      lastLogDate: todayStr
    }));

    // Trigger achievement checks
    get().checkAchievementsTrigger("dream_logged");
  },

  purchaseItem: (item) => {
    const cost = item.cost;
    const currentDiamonds = get().diamonds;
    
    if (currentDiamonds < cost) {
      return false; // not enough diamonds
    }
    
    set((state) => ({
      diamonds: state.diamonds - cost,
      inventory: [...state.inventory, item.id]
    }));

    get().checkAchievementsTrigger("cosmetics");
    return true;
  },

  equipItem: (itemId, category) => {
    if (category === "room_theme") {
      set({ roomTheme: itemId });
    } else if (category === "fairy_skin") {
      set({ fairySkin: itemId });
    } else if (category === "jar_skin") {
      set({ jarSkin: itemId });
    }
  },

  claimAchievementReward: (key) => {
    const achievement = get().achievements.find(a => a.key === key);
    if (achievement && achievement.earned && !achievement.claimed) {
      set((state) => ({
        diamonds: state.diamonds + achievement.reward,
        achievements: state.achievements.map(a => 
          a.key === key ? { ...a, claimed: true } : a
        )
      }));
    }
  },

  shareToGalaxy: (dreamId) => {
    const dream = get().dreams.find(d => d.id === dreamId);
    if (!dream) return;

    // Award sharing reward (+5 diamonds)
    set((state) => ({
      dreams: state.dreams.map(d => d.id === dreamId ? { ...d, isSharedGalaxy: true } : d),
      diamonds: state.diamonds + 5
    }));

    // Add star to galaxy stars
    const excerpt = dream.content.substring(0, 100) + "...";
    const newStar: GalaxyStar = {
      id: "star-" + Date.now(),
      excerpt,
      emotionTag: dream.mood,
      symbolTags: dream.symbols.map(s => s.replace(/[^a-zA-Z]/g, "").trim().toLowerCase()),
      starX: (Math.random() - 0.5) * 40,
      starY: (Math.random() - 0.5) * 30,
      starZ: -(Math.random() * 20 + 10),
      title: dream.title,
      content: dream.content,
      luminaResponse: dream.luminaResponse
    };

    set((state) => ({
      galaxyStars: [newStar, ...state.galaxyStars]
    }));
  },

  checkAchievementsTrigger: (triggerType) => {
    const totalDreams = get().dreams.length;
    const currentStreak = get().streak;
    const ownedItemsCount = get().inventory.length;
    
    // gather unique symbols
    const allSymbols = new Set<string>();
    get().dreams.forEach(d => d.symbols.forEach(s => allSymbols.add(s)));
    const uniqueSymbolsCount = allSymbols.size;
    
    set((state) => {
      const updatedAchievements = state.achievements.map((ach) => {
        if (ach.earned) return ach; // already earned
        
        let earned = false;
        
        if (ach.key === "first_dream" && totalDreams >= 3) {
          // Preloaded has 2 dreams, so the 3rd one logged is the user's first logged dream!
          earned = true;
        } else if (ach.key === "seven_streak" && currentStreak >= 7) {
          earned = true;
        } else if (ach.key === "symbol_seeker" && uniqueSymbolsCount >= 5) {
          earned = true;
        } else if (ach.key === "collector" && ownedItemsCount >= 4) { // 3 starter items + 1 purchased
          earned = true;
        } else if (ach.key === "night_owl" && triggerType === "dream_logged") {
          const hours = new Date().getHours();
          if (hours >= 0 && hours < 6) {
            earned = true;
          }
        } else if (ach.key === "lucid_dreamer") {
          const hasLucid = state.dreams.some(d => d.tags.includes("lucid") || d.content.toLowerCase().includes("lucid"));
          if (hasLucid) earned = true;
        }

        return earned ? { ...ach, earned: true } : ach;
      });

      return { achievements: updatedAchievements };
    });
  }
}));
