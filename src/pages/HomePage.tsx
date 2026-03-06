import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FranchiseCard from '../components/FranchiseCard';
import { FEATURED_FRANCHISES } from '../data/franchises';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/discover?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-kidult-border">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-kidult-orange/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-kidult-blue/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-kidult-blue/30 bg-kidult-blue/5 text-kidult-blue text-xs font-semibold mb-6 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-kidult-blue animate-pulse" />
            GenAI-Powered · Amazon Kidult Initiative
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-white mb-4 leading-none tracking-tight">
            Your Universe.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kidult-orange to-amber-400">
              Instantly Found.
            </span>
          </h1>

          <p className="text-xl text-kidult-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Amazon's AI discovers, groups, and curates every Kidult franchise into premium destinations —
            built around how <em className="text-white">you</em> collect, invest, and play.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-3 p-2 glass-card rounded-2xl border-kidult-border">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Dragon Ball, Pokémon cards, Gundam models..."
                className="flex-1 bg-transparent px-4 py-3 text-white placeholder-kidult-muted outline-none text-sm"
              />
              <button type="submit" className="btn-primary rounded-xl px-6 whitespace-nowrap">
                ✦ Discover
              </button>
            </div>
          </form>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-10 text-sm">
            {[
              { value: '320+', label: 'Franchises' },
              { value: '47K+', label: 'Kidult Products' },
              { value: '2.3M', label: 'Passionate Fans' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-black text-kidult-orange">{stat.value}</div>
                <div className="text-kidult-muted text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-kidult-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: '🔍',
                step: '01',
                title: 'AI Franchise Detection',
                desc: 'GenAI continuously scans Amazon\'s catalog to identify and group Kidult products by franchise — no manual curation needed.',
              },
              {
                icon: '🏪',
                step: '02',
                title: 'Auto-Generated Storefronts',
                desc: 'Each franchise gets a premium destination structured around three Kidult worlds: Investment, Collection, and Entertainment.',
              },
              {
                icon: '📡',
                step: '03',
                title: 'Living Trend Engine',
                desc: 'Content and merchandising refresh dynamically based on real-time trend signals, community activity, and market data.',
              },
            ].map((item) => (
              <div key={item.step} className="glass-card p-5 flex gap-4">
                <div className="text-3xl flex-shrink-0">{item.icon}</div>
                <div>
                  <div className="text-xs text-kidult-muted font-mono mb-1">{item.step}</div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-kidult-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Franchises */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-white">
                Featured Universes
              </h2>
              <p className="text-kidult-muted mt-1">
                Top-trending franchise destinations this season
              </p>
            </div>
            <button
              onClick={() => navigate('/discover')}
              className="btn-secondary text-sm hidden sm:block"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_FRANCHISES.map((franchise, i) => (
              <FranchiseCard key={franchise.id} franchise={franchise} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Pitch Banner */}
      <section className="py-10 border-t border-kidult-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 glow-orange relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-kidult-orange/5 to-transparent" />
            <div className="relative max-w-2xl">
              <div className="text-sm text-kidult-orange font-semibold mb-2 uppercase tracking-widest">
                Amazon Kidult Vision 2025
              </div>
              <h3 className="text-2xl font-black text-white mb-3">
                From fragmented search to franchise destinations.
              </h3>
              <p className="text-kidult-muted leading-relaxed mb-5">
                Today, Kidult customers know what they want culturally — but Amazon forces them to search product by product.
                We use GenAI to build the universe they already live in.
              </p>
              <button
                className="btn-primary"
                onClick={() => navigate('/discover')}
              >
                ✦ Try AI Discovery
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
