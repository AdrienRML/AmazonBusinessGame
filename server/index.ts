import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
const client = new Anthropic();

app.use(cors());
app.use(express.json());

function sseStream(res: express.Response) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  const send = (data: object) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };
  const done = (fullContent: string) => {
    res.write(`data: ${JSON.stringify({ type: 'done', fullContent })}\n\n`);
    res.end();
  };
  const error = (msg: string) => {
    res.write(`data: ${JSON.stringify({ type: 'error', message: msg })}\n\n`);
    res.end();
  };
  return { send, done, error };
}

// POST /api/discover — AI franchise discovery from a free-text query
app.post('/api/discover', async (req, res) => {
  const { query } = req.body as { query: string };
  if (!query) return res.status(400).json({ error: 'query is required' });

  const sse = sseStream(res);
  let buffer = '';

  try {
    const stream = client.messages.stream({
      model: 'claude-opus-4-6',
      max_tokens: 4096,
      thinking: { type: 'adaptive' },
      system: `You are Amazon's GenAI Franchise Discovery Engine for the Kidult market.
Kidults are adults aged 25-45 who are deeply passionate about pop-culture franchises and treat collecting as both a hobby and an investment.
Your role is to identify the most relevant Kidult franchises for a given query and return richly structured JSON.`,
      messages: [
        {
          role: 'user',
          content: `Analyze this Kidult interest and identify 5-6 highly relevant franchises: "${query}"

Return a JSON array. Each item must strictly follow this schema:
{
  "id": "url-safe-slug",
  "name": "Official Franchise Name",
  "category": "anime" | "comics" | "movies" | "games" | "nostalgia" | "sci-fi",
  "description": "2-3 compelling sentences about why Kidults love this franchise.",
  "tagline": "Short powerful tagline (max 8 words)",
  "trendScore": <integer 1-100>,
  "trendDirection": "rising" | "stable" | "declining",
  "universeColor": "<hex color matching franchise identity>",
  "icons": ["<emoji1>", "<emoji2>"]
}

Return ONLY a valid JSON array. No markdown, no commentary, no code blocks.`,
        },
      ],
    });

    stream.on('text', (text) => {
      buffer += text;
      sse.send({ type: 'delta', content: text });
    });

    stream.on('error', (err) => sse.error(err.message));

    await stream.finalMessage();
    sse.done(buffer);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    sse.error(msg);
  }
});

// POST /api/storefront — Generate full franchise storefront content
app.post('/api/storefront', async (req, res) => {
  const { franchise } = req.body as {
    franchise: { name: string; category: string; description: string };
  };
  if (!franchise?.name) return res.status(400).json({ error: 'franchise is required' });

  const sse = sseStream(res);
  let buffer = '';

  try {
    const stream = client.messages.stream({
      model: 'claude-opus-4-6',
      max_tokens: 6000,
      thinking: { type: 'adaptive' },
      system: `You are Amazon's AI Storefront Generator for the Kidult category.
You create premium, curated franchise storefronts structured around three usage worlds:
1. INVESTMENT — rare, limited, appreciating collectibles
2. COLLECTION — complete sets, figurines, art books, display pieces
3. ENTERTAINMENT — games, streaming, casual merchandise, experiences

Generate realistic, specific, commercially plausible products with real-feeling prices.
Also generate trend signals and authentic community posts that feel like real Kidult fans.`,
      messages: [
        {
          role: 'user',
          content: `Generate a complete Amazon Kidult storefront for: ${franchise.name} (${franchise.category})
Context: ${franchise.description}

Return a single JSON object with this exact structure:
{
  "investment": {
    "headline": "Catchy headline for investment section",
    "description": "1-2 sentences on the investment angle",
    "products": [
      {
        "id": "unique-id",
        "title": "Specific product name (brand + details)",
        "price": <number>,
        "originalPrice": <number or null>,
        "badge": "Limited Edition" | "Exclusive" | "Trending" | "Best Seller" | "Rare Find" | null,
        "description": "2-3 sentences describing the product",
        "pitch": "Why this is a great investment (1 sentence)",
        "rating": <float 4.0-5.0>,
        "reviews": <integer 50-2000>,
        "emoji": "<single relevant emoji>"
      }
    ]
  },
  "collection": { ... same structure ... },
  "entertainment": { ... same structure ... },
  "trendSignals": [
    {
      "label": "Signal name (e.g. Market Value Index)",
      "value": <integer 0-100>,
      "change": <integer -15 to +25>,
      "unit": "%" | "pts" | "x",
      "icon": "<emoji>",
      "description": "1 sentence explaining this signal"
    }
  ],
  "communityPosts": [
    {
      "author": "realistic_username",
      "avatar": "<single emoji representing user>",
      "content": "Authentic fan post (2-4 sentences)",
      "likes": <integer>,
      "replies": <integer>,
      "timeAgo": "Xh ago" | "Xd ago",
      "tag": "Investment Tips" | "Show & Tell" | "New Drop" | "Trading" | "Discussion"
    }
  ]
}

Include exactly 3 products per world (9 total), 5 trend signals, and 4 community posts.
Return ONLY valid JSON. No markdown, no code blocks.`,
        },
      ],
    });

    stream.on('text', (text) => {
      buffer += text;
      sse.send({ type: 'delta', content: text });
    });

    stream.on('error', (err) => sse.error(err.message));

    await stream.finalMessage();
    sse.done(buffer);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    sse.error(msg);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 Kidult AI Server running on http://localhost:${PORT}`);
  console.log(`   ANTHROPIC_API_KEY: ${process.env.ANTHROPIC_API_KEY ? '✓ set' : '✗ missing'}\n`);
});
