import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Franchise, StorefrontContent, UsageWorld } from '../types';
import { FEATURED_FRANCHISES, WORLD_CONFIG } from '../data/franchises';
import ProductCard from '../components/ProductCard';
import TrendSignals from '../components/TrendSignals';
import CommunityLayer from '../components/CommunityLayer';
import LoadingSpinner from '../components/LoadingSpinner';

export default function FranchisePage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Franchise can come from router state (dynamic) or pre-defined list
  const routeFranchise = location.state?.franchise as Franchise | undefined;
  const predefined = FEATURED_FRANCHISES.find((f) => f.id === id);
  const franchise: Franchise | undefined = routeFranchise || predefined;

  const [activeWorld, setActiveWorld] = useState<UsageWorld>('investment');
  const [storefront, setStorefront] = useState<StorefrontContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [error, setError] = useState('');
  const loadedFor = useRef<string | null>(null);

  useEffect(() => {
    if (franchise && loadedFor.current !== franchise.id) {
      loadedFor.current = franchise.id;
      loadStorefront(franchise);
    }
  }, [franchise]);

  async function loadStorefront(f: Franchise) {
    setLoading(true);
    setStorefront(null);
    setStreamingText('');
    setError('');

    try {
      const res = await fetch('/api/storefront', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ franchise: { name: f.name, category: f.category, description: f.description } }),
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
              const jsonStr = extractJSON(event.fullContent || fullContent);
              if (jsonStr) {
                const parsed = JSON.parse(jsonStr);
                setStorefront(parsed as StorefrontContent);
              }
            } else if (event.type === 'error') {
              setError(event.message);
            }
          } catch {
            // Skip malformed events
          }
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to generate storefront');
    } finally {
      setLoading(false);
      setStreamingText('');
    }
  }

  function extractJSON(text: string): string | null {
    const objMatch = text.match(/\{[\s\S]*\}/);
    return objMatch ? objMatch[0] : null;
  }

  if (!franchise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass-card p-10">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-white mb-2">Franchise not found</h2>
          <p className="text-kidult-muted mb-6">We couldn't find this franchise universe.</p>
          <button className="btn-primary" onClick={() => navigate('/')}>← Back to Home</button>
        </div>
      </div>
    );
  }

  const worlds: UsageWorld[] = ['investment', 'collection', 'entertainment'];
  const currentWorld = storefront?.[activeWorld];
  const cfg = WORLD_CONFIG[activeWorld];

  return (
    <div className="min-h-screen">
      {/* Franchise Hero */}
      <div
        className="border-b border-kidult-border relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${franchise.universeColor}08 0%, transparent 60%)` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <button
            onClick={() => navigate(-1)}
            className="text-kidult-muted hover:text-white transition-colors text-sm mb-6 flex items-center gap-1"
          >
            ← Back
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Icon */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{
                backgroundColor: `${franchise.universeColor}15`,
                border: `2px solid ${franchise.universeColor}40`,
              }}
            >
              {franchise.icons[0]}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-4xl font-black text-white">{franchise.name}</h1>
                <span
                  className="text-sm font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: `${franchise.universeColor}15`,
                    color: franchise.universeColor,
                    border: `1px solid ${franchise.universeColor}40`,
                  }}
                >
                  {franchise.category}
                </span>
              </div>
              <p className="text-kidult-muted italic mb-3 text-lg">{franchise.tagline}</p>
              <p className="text-kidult-text/80 max-w-2xl leading-relaxed">{franchise.description}</p>
            </div>

            {/* Trend score */}
            <div className="glass-card p-4 text-center flex-shrink-0 min-w-[120px]">
              <div
                className="text-4xl font-black mb-1"
                style={{ color: franchise.universeColor }}
              >
                {franchise.trendScore}
              </div>
              <div className="text-xs text-kidult-muted">Trend Score</div>
              <div
                className={`text-sm font-semibold mt-1 ${
                  franchise.trendDirection === 'rising' ? 'text-kidult-green' : 'text-kidult-muted'
                }`}
              >
                {franchise.trendDirection === 'rising' ? '↑ Rising' : franchise.trendDirection === 'declining' ? '↓ Declining' : '→ Stable'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* World Tabs */}
      <div className="border-b border-kidult-border sticky top-16 z-40 bg-kidult-bg/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {worlds.map((world) => {
              const wCfg = WORLD_CONFIG[world];
              const isActive = activeWorld === world;
              return (
                <button
                  key={world}
                  onClick={() => setActiveWorld(world)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-all duration-200 whitespace-nowrap
                    ${isActive
                      ? `border-kidult-orange text-white`
                      : 'border-transparent text-kidult-muted hover:text-white hover:border-kidult-border'
                    }`}
                >
                  <span>{wCfg.icon}</span>
                  <span>{wCfg.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading && (
          <div className="max-w-2xl mx-auto">
            <LoadingSpinner
              streaming
              streamingText={streamingText}
              text={`Generating ${franchise.name} storefront...`}
            />
          </div>
        )}

        {error && (
          <div className="glass-card p-6 border-red-400/30 text-center max-w-md mx-auto mb-8">
            <div className="text-2xl mb-2">⚠️</div>
            <div className="text-red-400 font-semibold mb-1">Storefront Generation Error</div>
            <div className="text-sm text-kidult-muted">{error}</div>
            <button className="btn-secondary mt-4 text-sm" onClick={() => loadStorefront(franchise)}>
              Retry
            </button>
          </div>
        )}

        {storefront && (
          <div className="animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main - Products */}
              <div className="flex-1">
                {currentWorld && (
                  <>
                    <div className={`${cfg.bgColor} border ${cfg.borderColor} rounded-2xl p-5 mb-6`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{cfg.icon}</span>
                        <h2 className={`text-xl font-bold ${cfg.color}`}>{currentWorld.headline}</h2>
                      </div>
                      <p className="text-sm text-kidult-muted">{currentWorld.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentWorld.products.map((product) => (
                        <ProductCard key={product.id} product={product} world={activeWorld} />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Sidebar - Trend Signals */}
              <div className="w-full lg:w-72 flex-shrink-0">
                <TrendSignals signals={storefront.trendSignals} />

                {/* Quick world switch */}
                <div className="glass-card p-4 mt-4">
                  <h4 className="text-sm font-semibold text-white mb-3">Explore Other Worlds</h4>
                  {worlds.filter((w) => w !== activeWorld).map((world) => {
                    const wCfg = WORLD_CONFIG[world];
                    return (
                      <button
                        key={world}
                        onClick={() => setActiveWorld(world)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-kidult-border/50 transition-colors mb-2 text-left"
                      >
                        <span className="text-xl">{wCfg.icon}</span>
                        <div>
                          <div className="text-sm font-medium text-white">{wCfg.label}</div>
                          <div className="text-xs text-kidult-muted">{wCfg.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Community */}
            <CommunityLayer posts={storefront.communityPosts} franchiseName={franchise.name} />
          </div>
        )}
      </div>
    </div>
  );
}
