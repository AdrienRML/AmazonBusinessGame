import { Product, UsageWorld } from '../types';

const BADGE_STYLES: Record<string, string> = {
  'Limited Edition': 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30',
  Exclusive: 'bg-purple-400/10 text-purple-400 border-purple-400/30',
  Trending: 'bg-kidult-orange/10 text-kidult-orange border-kidult-orange/30',
  'Best Seller': 'bg-kidult-green/10 text-kidult-green border-kidult-green/30',
  'Rare Find': 'bg-red-400/10 text-red-400 border-red-400/30',
};

const WORLD_CTA: Record<UsageWorld, string> = {
  investment: 'Add to Portfolio',
  collection: 'Add to Collection',
  entertainment: 'Buy Now',
};

interface Props {
  product: Product;
  world: UsageWorld;
}

export default function ProductCard({ product, world }: Props) {
  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="glass-card p-4 flex flex-col hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 group">
      {/* Emoji hero */}
      <div className="w-full h-28 rounded-xl bg-kidult-border/50 flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-transform duration-200">
        {product.emoji}
      </div>

      {/* Badge */}
      {product.badge && (
        <span
          className={`self-start text-xs px-2.5 py-0.5 rounded-full border font-semibold mb-2 ${BADGE_STYLES[product.badge] || ''}`}
        >
          {product.badge}
        </span>
      )}

      {/* Title */}
      <h4 className="text-sm font-semibold text-white leading-snug mb-1.5 line-clamp-2 flex-1">
        {product.title}
      </h4>

      {/* Description */}
      <p className="text-xs text-kidult-muted leading-relaxed mb-3 line-clamp-2">
        {product.description}
      </p>

      {/* Pitch */}
      <div className="bg-kidult-border/30 rounded-lg px-3 py-2 mb-3">
        <p className="text-xs text-kidult-blue italic">{product.pitch}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 text-xs mb-3">
        <span className="text-yellow-400">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
        <span className="text-white font-medium">{product.rating.toFixed(1)}</span>
        <span className="text-kidult-muted">({product.reviews.toLocaleString()})</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <>
            <span className="text-sm text-kidult-muted line-through">${product.originalPrice.toFixed(2)}</span>
            {discount && <span className="text-xs text-kidult-green font-semibold">-{discount}%</span>}
          </>
        )}
      </div>

      {/* CTA */}
      <button className="w-full btn-primary text-sm py-2.5">
        {WORLD_CTA[world]}
      </button>
    </div>
  );
}
