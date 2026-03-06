import { useNavigate } from 'react-router-dom';
import { Franchise } from '../types';
import { CATEGORY_LABELS } from '../data/franchises';

interface Props {
  franchise: Franchise;
  index?: number;
}

export default function FranchiseCard({ franchise, index = 0 }: Props) {
  const navigate = useNavigate();

  const trendIcon =
    franchise.trendDirection === 'rising'
      ? '↑'
      : franchise.trendDirection === 'declining'
        ? '↓'
        : '→';

  const trendColor =
    franchise.trendDirection === 'rising'
      ? 'text-kidult-green'
      : franchise.trendDirection === 'declining'
        ? 'text-red-400'
        : 'text-kidult-muted';

  return (
    <div
      className="glass-card p-5 cursor-pointer group hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={() => navigate(`/franchise/${franchise.id}`, { state: { franchise } })}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${franchise.universeColor}20`, border: `1px solid ${franchise.universeColor}40` }}
        >
          {franchise.icons[0]}
        </div>

        <div className="flex flex-col items-end gap-1">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${franchise.universeColor}15`, color: franchise.universeColor }}
          >
            {CATEGORY_LABELS[franchise.category]}
          </span>
          <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
            <span>{trendIcon}</span>
            <span>{franchise.trendScore}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-kidult-orange transition-colors">
          {franchise.name}
        </h3>
        <p className="text-xs font-medium text-kidult-muted mb-2 italic">{franchise.tagline}</p>
        <p className="text-sm text-kidult-muted leading-relaxed line-clamp-3">{franchise.description}</p>
      </div>

      {/* Trend bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-kidult-muted mb-1.5">
          <span>Trend Score</span>
          <span className={trendColor}>{franchise.trendScore}/100</span>
        </div>
        <div className="h-1.5 bg-kidult-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${franchise.trendScore}%`,
              backgroundColor: franchise.universeColor,
            }}
          />
        </div>
      </div>

      {/* CTA */}
      <button
        className="w-full py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200
                   group-hover:text-white group-hover:border-white/30"
        style={{
          color: franchise.universeColor,
          borderColor: `${franchise.universeColor}40`,
          backgroundColor: `${franchise.universeColor}10`,
        }}
      >
        {franchise.icons[1]} Explore Universe →
      </button>
    </div>
  );
}
