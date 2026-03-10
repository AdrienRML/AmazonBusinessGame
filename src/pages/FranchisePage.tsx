import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FRANCHISE_TABS, getProducts } from '../data/mockData';
import type { Product } from '../types';

const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Avg. Customer Review', 'Newest'];
const BRANDS = ['Hot Toys', 'Hasbro', 'LEGO', 'Bandai', 'Good Smile', 'Funko', 'McFarlane', 'Sideshow'];
const PRICE_RANGES = ['Under $25', '$25 to $50', '$50 to $100', '$100 to $200', '$200 & Above'];

// ── Per-franchise visual theme ─────────────────────────────────────────────────
interface FranchiseTheme {
  headerGradient: string;
  accentColor: string;
  accentDim: string;
  bgPattern: string;         // SVG data URI for background texture
  tagline: string;
  worldLabel: string;
  tabs: string[];
}

const FRANCHISE_THEMES: Record<string, FranchiseTheme> = {
  marvel: {
    headerGradient: 'linear-gradient(135deg, #7B0000 0%, #C0151F 50%, #E23636 100%)',
    accentColor:    '#E23636',
    accentDim:      '#E2363625',
    bgPattern:      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='12' cy='12' r='2' fill='%23E23636' opacity='0.08'/%3E%3C/svg%3E\")",
    tagline:        'A universe within Amazon',
    worldLabel:     'MARVEL WORLD',
    tabs:           ['All', '💎 Invest', '📦 Collect', '🎮 Play', '🌐 Community'],
  },
  pokemon: {
    headerGradient: 'linear-gradient(135deg, #1a1a60 0%, #3939a0 50%, #FFCB05 100%)',
    accentColor:    '#FFCB05',
    accentDim:      '#FFCB0520',
    bgPattern:      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Ccircle cx='32' cy='32' r='22' fill='none' stroke='%23FFCB05' stroke-width='0.8' opacity='0.07'/%3E%3Cline x1='10' y1='32' x2='54' y2='32' stroke='%23FFCB05' stroke-width='0.8' opacity='0.07'/%3E%3Ccircle cx='32' cy='32' r='6' fill='none' stroke='%23FFCB05' stroke-width='0.8' opacity='0.1'/%3E%3Ccircle cx='32' cy='32' r='2.5' fill='%23FFCB05' opacity='0.06'/%3E%3C/svg%3E\")",
    tagline:        'Gotta catch \'em all — curated',
    worldLabel:     'POKÉMON WORLD',
    tabs:           ['All', '⚡ Battle', '🃏 Cards', '🧸 Plush', '🌐 Community'],
  },
  lego: {
    headerGradient: 'linear-gradient(135deg, #8B3A00 0%, #D45A00 50%, #FF6B35 100%)',
    accentColor:    '#FF6B35',
    accentDim:      '#FF6B3520',
    bgPattern:      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='22'%3E%3Crect x='0.5' y='0.5' width='43' height='21' fill='none' stroke='%23FF6B35' stroke-width='0.5' opacity='0.07'/%3E%3Ccircle cx='11' cy='11' r='4' fill='none' stroke='%23FF6B35' stroke-width='0.5' opacity='0.08'/%3E%3Ccircle cx='33' cy='11' r='4' fill='none' stroke='%23FF6B35' stroke-width='0.5' opacity='0.08'/%3E%3Cline x1='22' y1='0' x2='22' y2='22' stroke='%23FF6B35' stroke-width='0.3' opacity='0.05'/%3E%3C/svg%3E\")",
    tagline:        'Build your collection, brick by brick',
    worldLabel:     'LEGO WORLD',
    tabs:           ['All', '🏰 Sets', '🔩 Technic', '🌆 City', '🌐 Community'],
  },
  'action-figures': {
    headerGradient: 'linear-gradient(135deg, #003040 0%, #006080 50%, #00B4D8 100%)',
    accentColor:    '#00B4D8',
    accentDim:      '#00B4D820',
    bgPattern:      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Crect x='1' y='1' width='28' height='28' rx='4' fill='none' stroke='%2300B4D8' stroke-width='0.5' opacity='0.07'/%3E%3C/svg%3E\")",
    tagline:        'The finest figures, curated for collectors',
    worldLabel:     'ACTION FIGURES WORLD',
    tabs:           ['All', '🤖 Robots', '🦸 Heroes', '👾 Sci-Fi', '🌐 Community'],
  },
  'retro-gaming': {
    headerGradient: 'linear-gradient(135deg, #2D0050 0%, #5B1A8C 50%, #7B2FBE 100%)',
    accentColor:    '#7B2FBE',
    accentDim:      '#7B2FBE20',
    bgPattern:      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect x='2' y='2' width='16' height='16' rx='2' fill='none' stroke='%237B2FBE' stroke-width='0.5' opacity='0.08'/%3E%3C/svg%3E\")",
    tagline:        'Classic games, legendary collectibles',
    worldLabel:     'RETRO GAMING WORLD',
    tabs:           ['All', '🕹️ Consoles', '💾 Games', '🏆 Rare', '🌐 Community'],
  },
  'limited-drops': {
    headerGradient: 'linear-gradient(135deg, #4D0010 0%, #9B0025 50%, #FF4D4D 100%)',
    accentColor:    '#FF4D4D',
    accentDim:      '#FF4D4D20',
    bgPattern:      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpolygon points='10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8' fill='none' stroke='%23FF4D4D' stroke-width='0.5' opacity='0.08'/%3E%3C/svg%3E\")",
    tagline:        'Rare, exclusive, and only for the few',
    worldLabel:     'LIMITED DROPS WORLD',
    tabs:           ['All', '🔥 New Drop', '⏳ Ending Soon', '🏅 Grails', '🌐 Community'],
  },
  'fan-cards': {
    headerGradient: 'linear-gradient(135deg, #003320 0%, #006040 50%, #06D6A0 100%)',
    accentColor:    '#06D6A0',
    accentDim:      '#06D6A020',
    bgPattern:      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='50'%3E%3Crect x='2' y='2' width='32' height='46' rx='3' fill='none' stroke='%2306D6A0' stroke-width='0.5' opacity='0.08'/%3E%3C/svg%3E\")",
    tagline:        'Every card tells a story',
    worldLabel:     'FAN CARDS WORLD',
    tabs:           ['All', '🃏 Trading', '⭐ Holos', '💎 Graded', '🌐 Community'],
  },
};

const DEFAULT_THEME: FranchiseTheme = {
  headerGradient: 'linear-gradient(135deg, #1B2836, #37475A)',
  accentColor:    '#FF9900',
  accentDim:      '#FF990020',
  bgPattern:      '',
  tagline:        'Curated collectibles for every fan',
  worldLabel:     'FRANCHISE WORLD',
  tabs:           ['All', '💎 Invest', '📦 Collect', '🎮 Play', '🌐 Community'],
};

const BADGE_STYLES: Record<string, string> = {
  'Limited':    'badge-limited',
  'Trending':   'badge-trending',
  'Exclusive':  'badge-exclusive',
  'New':        'badge-new',
  'Best Seller':'badge-trending',
};

function Stars({ rating }: { rating: number }) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="az-stars">
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(empty)}
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [imgErr, setImgErr] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="az-card flex flex-col hover:border-az-orange/40 transition-colors group animate-fade-in">
      {/* Image */}
      <div className="relative overflow-hidden bg-az-nav2 rounded-t" style={{ paddingTop: '100%' }}>
        {!imgErr ? (
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-5xl bg-az-nav2">
            📦
          </div>
        )}
        {product.badge && (
          <div className="absolute top-2 left-2">
            <span className={BADGE_STYLES[product.badge] || 'badge-new'}>{product.badge}</span>
          </div>
        )}
        {product.prime && (
          <div className="absolute top-2 right-2">
            <span className="text-[10px] font-black text-blue-300 bg-blue-900/80 px-1.5 py-0.5 rounded">prime</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-az-link text-xs font-medium leading-snug mb-1 line-clamp-2 hover:underline cursor-pointer">
          {product.title}
        </p>
        <p className="text-az-subtle text-[10px] mb-1">{product.brand}</p>

        <div className="flex items-center gap-1 mb-1">
          <Stars rating={product.rating} />
          <span className="text-az-link text-[10px] hover:underline cursor-pointer">
            {product.reviews.toLocaleString()}
          </span>
        </div>

        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-az-text font-black text-base">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <>
              <span className="text-az-subtle text-[11px] line-through">${product.originalPrice.toFixed(2)}</span>
              {discount && <span className="text-az-green text-[11px] font-bold">-{discount}%</span>}
            </>
          )}
        </div>

        {product.prime && (
          <p className="text-[10px] text-blue-400 mb-2">
            <span className="font-black">prime</span> FREE delivery
          </p>
        )}

        <p className="text-az-subtle text-[10px] line-clamp-2 mb-3 flex-1">{product.description}</p>

        <button
          className={`w-full text-xs py-2 rounded transition-all ${addedToCart ? 'bg-az-green text-white' : 'az-btn-orange'}`}
          onClick={() => {
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
          }}
        >
          {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default function FranchisePage() {
  const [searchParams] = useSearchParams();
  const navigate      = useNavigate();
  const franchiseId   = searchParams.get('franchise') || 'marvel';
  const [sort, setSort] = useState('Featured');
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('All');

  const franchise = FRANCHISE_TABS.find((t) => t.id === franchiseId) ?? FRANCHISE_TABS[0];
  const theme     = FRANCHISE_THEMES[franchiseId] ?? DEFAULT_THEME;
  let products    = getProducts(franchiseId);

  // Apply price filter
  if (priceFilter) {
    products = products.filter((p) => {
      if (priceFilter === 'Under $25')        return p.price < 25;
      if (priceFilter === '$25 to $50')       return p.price >= 25  && p.price < 50;
      if (priceFilter === '$50 to $100')      return p.price >= 50  && p.price < 100;
      if (priceFilter === '$100 to $200')     return p.price >= 100 && p.price < 200;
      if (priceFilter === '$200 & Above')     return p.price >= 200;
      return true;
    });
  }

  // Apply brand filter
  if (brandFilter.size > 0) {
    products = products.filter((p) => brandFilter.has(p.brand));
  }

  // Apply sort
  if (sort === 'Price: Low to High')    products = [...products].sort((a, b) => a.price - b.price);
  if (sort === 'Price: High to Low')    products = [...products].sort((a, b) => b.price - a.price);
  if (sort === 'Avg. Customer Review')  products = [...products].sort((a, b) => b.rating - a.rating);

  const toggleBrand = (brand: string) => {
    setBrandFilter((prev) => {
      const next = new Set(prev);
      next.has(brand) ? next.delete(brand) : next.add(brand);
      return next;
    });
  };

  return (
    <div>
      {/* ── Themed Hero Banner ──────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: theme.headerGradient }}
      >
        {/* Background pattern overlay */}
        {theme.bgPattern && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: theme.bgPattern, backgroundRepeat: 'repeat', opacity: 1 }}
          />
        )}

        {/* Radial glow from top-left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 80% at 5% 50%, ${theme.accentColor}18 0%, transparent 70%)` }}
        />

        <div className="relative max-w-[1200px] mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="text-[11px] text-white/50 mb-3 flex items-center gap-1">
            <span className="hover:text-white/80 cursor-pointer transition-colors" onClick={() => navigate('/')}>Amazon Kidult</span>
            <span>›</span>
            <span className="text-white/80">{franchise.label}</span>
            <span>›</span>
            <span className="text-white/50">Collectibles &amp; Figures</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Franchise icon with glow */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{
                background: 'rgba(0,0,0,0.35)',
                border: `2px solid ${theme.accentColor}60`,
                boxShadow: `0 0 24px ${theme.accentColor}40`,
              }}
            >
              {franchise.icon}
            </div>

            <div className="flex-1 min-w-0">
              {/* World label */}
              <div
                className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded mb-1.5"
                style={{ background: 'rgba(0,0,0,0.4)', color: theme.accentColor, border: `1px solid ${theme.accentColor}50` }}
              >
                ✦ {theme.worldLabel}
              </div>
              <h1 className="text-2xl font-black text-white leading-tight mb-0.5">
                {franchise.label} <span className="font-light opacity-80">Collectibles</span>
              </h1>
              <p className="text-white/60 text-xs">{theme.tagline}</p>
            </div>

            {/* Stats chips */}
            <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
              <div
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: 'rgba(0,0,0,0.45)', color: theme.accentColor, border: `1px solid ${theme.accentColor}40` }}
              >
                {products.length.toLocaleString()} items
              </div>
              <div className="text-[10px] text-white/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                Live · AI-updated
              </div>
            </div>
          </div>

          {/* World tabs */}
          <div className="flex gap-1.5 mt-4 flex-wrap">
            {theme.tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="text-[11px] font-medium px-3 py-1 rounded-full transition-all"
                style={
                  activeTab === tab
                    ? { background: theme.accentColor, color: '#000', fontWeight: 700 }
                    : { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.12)' }
                }
              >
                {tab}
              </button>
            ))}
            <div className="ml-auto hidden sm:flex items-center gap-1 text-[10px] text-white/40">
              <span>🔒 Exclusive entry via franchise button</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Subtle pattern strip separator ──────────────────────────────────── */}
      <div
        className="h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.accentColor}60, transparent)` }}
      />

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div
        className="max-w-[1200px] mx-auto px-3 py-4"
        style={
          theme.bgPattern
            ? { backgroundImage: theme.bgPattern, backgroundRepeat: 'repeat' }
            : {}
        }
      >
        <div className="flex gap-4">
          {/* Filters sidebar */}
          <div className="w-44 flex-shrink-0 space-y-4">
            {/* Prime */}
            <div>
              <h4 className="text-az-text font-bold text-xs mb-2">Amazon Prime</h4>
              <label className="flex items-center gap-2 text-az-muted text-[11px] cursor-pointer hover:text-az-orange">
                <input type="checkbox" className="accent-az-orange" />
                <span className="text-blue-400 font-bold text-[10px]">prime</span> Eligible
              </label>
            </div>

            {/* Price */}
            <div>
              <h4 className="text-az-text font-bold text-xs mb-2">Price</h4>
              {PRICE_RANGES.map((range) => (
                <label key={range} className="flex items-center gap-2 text-[11px] text-az-muted cursor-pointer hover:text-az-orange mb-1">
                  <input
                    type="radio"
                    name="price"
                    checked={priceFilter === range}
                    onChange={() => setPriceFilter(priceFilter === range ? null : range)}
                    className="accent-az-orange"
                  />
                  {range}
                </label>
              ))}
            </div>

            {/* Brand */}
            <div>
              <h4 className="text-az-text font-bold text-xs mb-2">Brand</h4>
              {BRANDS.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-[11px] text-az-muted cursor-pointer hover:text-az-orange mb-1">
                  <input
                    type="checkbox"
                    checked={brandFilter.has(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="accent-az-orange"
                  />
                  {brand}
                </label>
              ))}
            </div>

            {/* Condition */}
            <div>
              <h4 className="text-az-text font-bold text-xs mb-2">Condition</h4>
              {['New', 'Used', 'Renewed', 'Collector Grade'].map((c) => (
                <label key={c} className="flex items-center gap-2 text-[11px] text-az-muted cursor-pointer hover:text-az-orange mb-1">
                  <input type="checkbox" className="accent-az-orange" />
                  {c}
                </label>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-az-muted text-xs">Sort by:</span>
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSort(opt)}
                  className="text-xs px-3 py-1 rounded-sm transition-colors border"
                  style={
                    sort === opt
                      ? { background: theme.accentColor, color: '#000', borderColor: theme.accentColor, fontWeight: 700 }
                      : { borderColor: '#374151', color: '#9CA3AF' }
                  }
                >
                  {opt}
                </button>
              ))}
            </div>

            {products.length === 0 ? (
              <div className="az-card p-10 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-az-muted">No products match your filters.</p>
                <button className="az-btn-outline mt-3" onClick={() => { setPriceFilter(null); setBrandFilter(new Set()); }}>
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
