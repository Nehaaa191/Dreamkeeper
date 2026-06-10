# 🌙 Dreamkeeper

> *Every dream leaves a trace.*

Dreamkeeper is an AI-powered dream journal where your dreams become a living, magical collection. Write a dream, receive a mystical interpretation from your fairy companion Lumina, and watch it transform into a glowing artifact on your shelf.

---

## ✨ Features

- **Dream Journaling** — Write dreams with mood, title, and custom tags.
- **Lumina AI Companion** — A gentle fairy guide who interprets your dreams with warmth, nature metaphors, and ancient wisdom.
- **ML Dream Analysis** — Real-time emotion detection, entity/symbol extraction, and zero-shot theme classification.
- **Dream Room** — A customizable, beautiful portal representing your subconscious workspace.
- **Dream Containers** — Color-coded jars, potion bottles, and orbs that dynamically map to the emotion of the dream.
- **Gamification Economy** — Earn diamonds by logging, build daily streaks, and claim achievement rewards.
- **Cosmetic Store** — Unlock new fairy companion skins (Moon Fox, Tiny Dragon), shelf themes, and premium containers using earned diamonds.
- **Dream Galaxy** — A 3D interactive community field where anonymous dreams float as stars, naturally clustering into constellations.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, React, Framer Motion, Zustand
- **Backend**: Node.js, Express, Prisma ORM, PostgreSQL (with pgvector)
- **AI Engine**: Python, FastAPI, Hugging Face Transformers, OpenAI API
- **Infrastructure**: Redis (BullMQ queue & caching), Docker Compose

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed:
- Node.js (v18+)
- Docker and Docker Compose
- Python 3.10+ (optional, for AI microservice)

### 2. Database & Cache Services
Spin up PostgreSQL and Redis:
```bash
docker-compose up -d
```

### 3. Install & Start Frontend
Navigate to the web app directory, set up dependencies, and run the developer server:
```bash
cd frontend
npm install
npm run dev
```

---

## 🤖 AI Pipeline Architecture

Dreams are processed through a multi-stage pipeline:
1. **Embedding** — `sentence-transformers/all-MiniLM-L6-v2` for semantic positioning.
2. **Emotion** — `j-hartmann/emotion-english-distilroberta-base` for parsing primary emotions (joy, fear, sadness, surprise, etc.).
3. **Symbols** — spaCy NER matched against a custom, curated dream symbol lexicon.
4. **Themes** — `facebook/bart-large-mnli` for zero-shot theme classification.
5. **Lumina Interpreter** — GPT-4o mini with custom system-persona instructions for mystical, poetic output.

---

## 🗺 Roadmap

- [x] **Phase 1 (MVP)**: Monorepo scaffolding, DB models, and the full interactive UI Dashboard prototype.
- [ ] **Phase 2**: Python FastAPI microservice setup, Hugging Face model integrations, and pgvector clustering.
- [ ] **Phase 3**: 3D Three.js Galaxy star field, avatar creator customization, and premium subscriptions.

---

## 📄 License

MIT