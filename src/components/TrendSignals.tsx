import { TrendSignal } from '../types';

interface Props {
  signals: TrendSignal[];
}

export default function TrendSignals({ signals }: Props) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">📡</span>
        <h3 className="font-bold text-white">Trend Signals</h3>
        <span className="ml-auto flex items-center gap-1 text-xs text-kidult-green">
          <span className="w-1.5 h-1.5 rounded-full bg-kidult-green animate-pulse" />
          Live
        </span>
      </div>

      <div className="space-y-4">
        {signals.map((signal, i) => {
          const isPositive = signal.change >= 0;
          const changeColor = isPositive ? 'text-kidult-green' : 'text-red-400';
          const changePrefix = isPositive ? '+' : '';

          return (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span>{signal.icon}</span>
                  <span className="text-kidult-text font-medium">{signal.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${changeColor}`}>
                    {changePrefix}{signal.change}{signal.unit}
                  </span>
                  <span className="font-bold text-white">{signal.value}</span>
                </div>
              </div>

              <div className="h-1.5 bg-kidult-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${signal.value}%`,
                    background: isPositive
                      ? 'linear-gradient(90deg, #06D6A0, #00B4D8)'
                      : 'linear-gradient(90deg, #EF4444, #F97316)',
                  }}
                />
              </div>

              {signal.description && (
                <p className="text-xs text-kidult-muted">{signal.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
