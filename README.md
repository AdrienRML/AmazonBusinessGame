# Amazon Kidult — AI Franchise Discovery

> **Transforming Amazon's Kidult experience from fragmented product search into AI-powered franchise destinations.**

## Concept

Kidult customers (adults 25–45 passionate about pop-culture franchises) know *what universe they live in* — but today Amazon forces them to search product by product.

This prototype demonstrates how **GenAI + Claude** can:

1. **Continuously identify and group** Kidult products by franchise across Amazon's catalog
2. **Auto-generate premium storefronts** for each franchise — no manual curation required
3. **Structure each storefront** around three Kidult usage worlds:
   - 💎 **Investment** — rare, limited-edition, appreciating collectibles
   - 📦 **Collection** — complete sets, figurines, art books, display pieces
   - 🎮 **Fun & Entertainment** — games, casual merch, experiences
4. **Refresh content dynamically** based on live trend signals and community activity
5. **Enable a community layer** — fan discussions, trading, show & tell

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS (custom dark theme) |
| Backend | Express.js + TypeScript |
| AI Engine | Claude claude-opus-4-6 with Adaptive Thinking |
| Streaming | Server-Sent Events (SSE) |

## Getting Started

### Prerequisites

- Node.js 18+
- An `ANTHROPIC_API_KEY` environment variable

### Install & Run

```bash
# Install dependencies
npm install

# Start both frontend and backend (dev mode)
ANTHROPIC_API_KEY=your_key npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## Architecture

```
┌─────────────────────────────────────────┐
│           React Frontend (Vite)          │
│  HomePage → DiscoveryPage → FranchisePage│
└──────────────┬──────────────────────────┘
               │ SSE streaming via /api/*
┌──────────────▼──────────────────────────┐
│         Express Backend (port 3001)      │
│  POST /api/discover → Claude Opus 4.6   │
│  POST /api/storefront → Claude Opus 4.6 │
└──────────────┬──────────────────────────┘
               │ Anthropic SDK + Adaptive Thinking
┌──────────────▼──────────────────────────┐
│            Claude claude-opus-4-6             │
│  • Franchise identification              │
│  • Storefront generation (3 worlds)      │
│  • Trend signals synthesis               │
│  • Community content generation          │
└─────────────────────────────────────────┘
```

## API Endpoints

### `POST /api/discover`
Takes a free-text query and streams back 5–6 identified Kidult franchises as JSON.

```json
{ "query": "anime collectibles and manga" }
```

### `POST /api/storefront`
Takes a franchise object and streams back full storefront content (products for 3 worlds + trend signals + community posts).

```json
{ "franchise": { "name": "One Piece", "category": "anime", "description": "..." } }
```

## Key Design Decisions

- **Adaptive Thinking** on Claude Opus 4.6 ensures nuanced, culturally-aware franchise discovery
- **SSE streaming** provides a live, responsive feel — users see AI thinking in real-time
- **Pre-defined franchises** as defaults so the demo works even before API discovery
- **Dark premium theme** matches the Kidult aesthetic — sophisticated, not childish
