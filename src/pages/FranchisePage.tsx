import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FRANCHISE_TABS, getProducts } from '../data/mockData';
import type { Product } from '../types';

const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Avg. Customer Review', 'Newest'];
const BRANDS = ['Hot Toys', 'Hasbro', 'LEGO', 'Bandai', 'Good Smile', 'Funko', 'McFarlane', 'Sideshow'];
const PRICE_RANGES = ['Under $25', '$25 to $50', '$50 to $100', '$100 to $200', '$200 & Above'];

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

  const franchise = FRANCHISE_TABS.find((t) => t.id === franchiseId) ?? FRANCHISE_TABS[0];
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
    <div className="max-w-[1200px] mx-auto px-3 py-4">
      {/* Breadcrumb */}
      <div className="text-[11px] text-az-subtle mb-2 flex items-center gap-1">
        <span className="az-link cursor-pointer" onClick={() => navigate('/')}>Amazon Kidult</span>
        <span>›</span>
        <span className="az-link cursor-pointer">{franchise.label}</span>
        <span>›</span>
        <span>Collectibles &amp; Figures</span>
      </div>

      {/* Page header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{franchise.icon}</span>
        <div>
          <h1 className="text-xl font-black text-az-text">{franchise.label} Collectibles</h1>
          <p className="text-az-subtle text-xs">{products.length.toLocaleString()} results</p>
        </div>
      </div>

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
                className={`text-xs px-3 py-1 rounded-sm transition-colors border ${
                  sort === opt
                    ? 'bg-az-orange text-black border-amber-600 font-bold'
                    : 'border-az-border text-az-muted hover:border-az-orange/50 hover:text-az-text'
                }`}
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
  );
}
