import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import FranchiseCard from '../components/FranchiseCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Franchise } from '../types';
import { FEATURED_FRANCHISES } from '../data/franchises';

const SUGGESTED_QUERIES = [
  'anime collectibles and manga',
  'LEGO and brick building sets',
  'vintage video games and retro gaming',
  'sci-fi space exploration',
  'superhero comics and figures',
  'Studio Ghibli and Japanese animation',
];

export default function DiscoveryPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [franchises, setFranchises] = useState<Franchise[]>([]);
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [error, setError] = useState('');
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (initialQuery) {
      runDiscovery(initialQuery);
    }
  }, []);

  async function runDiscovery(q: string) {
    if (!q.trim()) return;

    // Abort previous request if any
    abortRef.current?.abort();
    const abort = new AbortController();
    abortRef.current = abort;

    setLoading(true);
    setFranchises([]);
    setStreamingText('');
    setError('');
    setQuery(q);

    try {
      const res = await fetch('/api/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
        signal: abort.signal,
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;

          try {
            const event = JSON.parse(raw);
            if (event.type === 'delta') {
              fullContent += event.content;
              setStreamingText(fullContent);
            } else if (event.type === 'done') {
              // Parse the accumulated JSON
              const jsonStr = extractJSON(event.fullContent || fullContent);
              if (jsonStr) {
                const parsed = JSON.parse(jsonStr);
                if (Array.isArray(parsed)) {
                  setFranchises(parsed);
                }
              }
            } else if (event.type === 'error') {
              setError(event.message);
            }
          } catch {
            // Skip malformed SSE events
          }
        }
      }
    } catch (err: unknown) {
      if ((err as Error).name !== 'AbortError') {
        setError(err instanceof Error ? err.message : 'Discovery failed');
      }
    } finally {
      setLoading(false);
      setStreamingText('');
    }
  }

  function extractJSON(text: string): string | null {
    const arrayMatch = text.match(/\[[\s\S]*\]/);
    return arrayMatch ? arrayMatch[0] : null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      runDiscovery(inputValue.trim());
    }
  };

  return (
    <div className="min-h-screen">
      {/* Search hero */}
      <section className="border-b border-kidult-border py-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-kidult-purple/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-kidult-blue/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-kidult-orange/30 bg-kidult-orange/5 text-kidult-orange text-xs font-semibold mb-5 uppercase tracking-widest">
            ✦ AI Franchise Discovery Engine
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">
            Describe your passion.
          </h1>
          <p className="text-kidult-muted mb-8 text-lg">
            Our AI identifies and builds franchise universes tailored to your interests.
          </p>

          {/* Search form */}
          <form onSubmit={handleSubmit} className="flex gap-3 p-2 glass-card rounded-2xl mb-6 max-w-2xl mx-auto">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Any franchise, universe, or passion..."
              className="flex-1 bg-transparent px-4 py-3 text-white placeholder-kidult-muted outline-none text-sm"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary rounded-xl px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '...' : '✦ Discover'}
            </button>
          </form>

          {/* Suggestions */}
          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTED_QUERIES.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setInputValue(suggestion);
                  runDiscovery(suggestion);
                }}
                className="text-xs px-3 py-1.5 rounded-full border border-kidult-border text-kidult-muted
                           hover:border-kidult-orange/40 hover:text-kidult-orange hover:bg-kidult-orange/5
                           transition-all duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading && (
          <div className="max-w-2xl mx-auto">
            <LoadingSpinner
              streaming
              streamingText={streamingText}
              text="AI is discovering franchises..."
            />
          </div>
        )}

        {error && (
          <div className="glass-card p-6 border-red-400/30 text-center max-w-md mx-auto">
            <div className="text-2xl mb-2">⚠️</div>
            <div className="text-red-400 font-semibold mb-1">Discovery Error</div>
            <div className="text-sm text-kidult-muted">{error}</div>
            <div className="text-xs text-kidult-muted mt-2">Make sure ANTHROPIC_API_KEY is set on the server.</div>
          </div>
        )}

        {franchises.length > 0 && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Franchises discovered for "{query}"
                </h2>
                <p className="text-kidult-muted text-sm mt-1">
                  {franchises.length} franchise universes identified by AI
                </p>
              </div>
              <span className="text-xs text-kidult-green flex items-center gap-1 border border-kidult-green/30 bg-kidult-green/5 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-kidult-green" />
                Generated by Claude
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {franchises.map((franchise, i) => (
                <FranchiseCard key={franchise.id} franchise={franchise} index={i} />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && franchises.length === 0 && !query && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-white mb-2">Featured Universes</h2>
              <p className="text-kidult-muted text-sm">Or search above to discover new franchises with AI</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FEATURED_FRANCHISES.slice(0, 8).map((franchise, i) => (
                <FranchiseCard key={franchise.id} franchise={franchise} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
