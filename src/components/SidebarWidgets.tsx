import { useState, useEffect } from 'react';
import { LIMITED_DROPS, BIDDING_ITEMS, TRENDING_COLLECTIBLES, TOP_COLLECTORS } from '../data/mockData';

// ── Countdown ─────────────────────────────────────────────────────────────────
function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      const totalSec = Math.floor(diff / 1000);
      setTimeLeft({ m: Math.floor(totalSec / 60), s: totalSec % 60 });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

// ── Limited Edition Drops ─────────────────────────────────────────────────────
export function LimitedDropWidget() {
  const drop = LIMITED_DROPS[0];
  const { m, s } = useCountdown(drop.endTime);
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="az-card p-3">
      <h3 className="font-bold text-az-text text-sm mb-2 flex items-center gap-1.5">
        🔥 <span>Limited Edition Drops</span>
      </h3>

      <div className="flex gap-2">
        {/* Image */}
        <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-az-nav2">
          {!imgErr ? (
            <img
              src={drop.image}
              alt={drop.title}
              className="w-full h-full object-cover"
              onError={() => setImgErr(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">🧱</div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-az-text text-xs font-semibold leading-snug mb-0.5 line-clamp-2">{drop.title}</p>
          <p className="text-az-subtle text-[10px] mb-1">{drop.subtitle}</p>
          <p className="text-az-subtle text-[10px] mb-2">Only {drop.stock.toLocaleString()} units</p>

          {/* Countdown */}
          <div className="flex items-center gap-1 mb-2">
            <div className="bg-az-nav2 rounded px-2 py-0.5 text-center">
              <div className="text-az-text font-black text-sm leading-none">{String(m).padStart(2, '0')}</div>
              <div className="text-az-subtle text-[9px]">min</div>
            </div>
            <span className="text-az-text font-bold">:</span>
            <div className="bg-az-nav2 rounded px-2 py-0.5 text-center">
              <div className="text-az-text font-black text-sm leading-none">{String(s).padStart(2, '0')}</div>
              <div className="text-az-subtle text-[9px]">sec</div>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full az-btn-orange mt-2 text-xs py-2 rounded">
        Early Access
      </button>
    </div>
  );
}

// ── Rare Bidding Marketplace ───────────────────────────────────────────────────
export function BiddingWidget() {
  const item = BIDDING_ITEMS[0];
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="az-card p-3">
      <h3 className="font-bold text-az-text text-sm mb-2 flex items-center gap-1.5">
        🏷️ <span>Rare Bidding Marketplace</span>
      </h3>

      <div className="flex gap-2 mb-2">
        <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-az-nav2">
          {!imgErr ? (
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={() => setImgErr(true)} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl">🃏</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-az-link text-xs font-semibold line-clamp-2 leading-snug mb-0.5">{item.title}</p>
          <div className="flex items-baseline gap-1 mb-0.5">
            <span className="text-az-subtle text-[10px] line-through">${item.originalPrice}</span>
            <span className="text-az-text font-black text-sm">${item.currentBid}</span>
          </div>
          <div className="text-az-subtle text-[10px]">{item.bidders} bidding</div>
        </div>
      </div>

      <div className="grid grid-cols-2 text-[10px] text-az-subtle mb-2 gap-1">
        <div>Time remaining: <span className="text-az-orange font-bold">{item.endsIn}</span></div>
        <div>Bidders: <span className="text-az-text font-bold">{item.bidders}</span></div>
      </div>

      <button className="w-full az-btn-orange text-xs py-2 rounded">
        Place Bid
      </button>
    </div>
  );
}

// ── Trending Collectibles ─────────────────────────────────────────────────────
export function TrendingWidget() {
  return (
    <div className="az-card p-3">
      <h3 className="font-bold text-az-text text-sm mb-2 flex items-center gap-1.5">
        📈 <span>Trending Collectibles</span>
      </h3>
      <div className="space-y-2">
        {TRENDING_COLLECTIBLES.map((item) => (
          <TrendingRow key={item.rank} item={item} />
        ))}
      </div>
    </div>
  );
}

function TrendingRow({ item }: { item: (typeof TRENDING_COLLECTIBLES)[0] }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="flex items-center gap-2 cursor-pointer hover:bg-az-nav2/50 rounded px-1 py-0.5 transition-colors">
      <span className="text-az-subtle text-[10px] w-4 flex-shrink-0 font-bold">{item.rank}</span>
      <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-az-nav2">
        {!imgErr ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={() => setImgErr(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm">📦</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-az-link text-[11px] font-medium line-clamp-1">{item.title}</p>
        <p className="text-az-subtle text-[10px]">{item.badge}</p>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-az-text text-xs font-bold">${item.price}</p>
        {item.discount && <p className="text-az-green text-[10px]">-{item.discount}%</p>}
      </div>
    </div>
  );
}

// ── Top Collectors ────────────────────────────────────────────────────────────
export function TopCollectorsWidget() {
  return (
    <div className="az-card p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-az-text text-sm flex items-center gap-1.5">
          🏆 <span>Top Collectors</span>
        </h3>
        <button className="text-az-link text-[11px] hover:underline">See all</button>
      </div>
      <div className="space-y-2">
        {TOP_COLLECTORS.map((col) => (
          <CollectorRow key={col.rank} col={col} />
        ))}
      </div>
    </div>
  );
}

function CollectorRow({ col }: { col: (typeof TOP_COLLECTORS)[0] }) {
  const [imgErr, setImgErr] = useState(false);
  const initials = col.username.replace(/[_0-9]/g, '').slice(0, 2).toUpperCase();
  return (
    <div className="flex items-center gap-2">
      <span className="text-az-orange font-black text-sm w-4">{col.rank}</span>
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
        {!imgErr ? (
          <img
            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${col.avatarSeed}`}
            alt={col.username}
            className="w-full h-full"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white text-[10px] font-bold"
            style={{ background: col.avatarBg }}
          >
            {initials}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-az-link text-[11px] font-semibold truncate">{col.username}</p>
        <p className="text-az-subtle text-[10px]">{col.badge}</p>
      </div>
      <div className="text-az-text font-black text-sm">{col.score.toLocaleString()}</div>
    </div>
  );
}
