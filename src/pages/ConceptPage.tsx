import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Step data ──────────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 1,
    badge: '01',
    title: 'Generic Marketplace',
    subtitle: "Today's Amazon",
    tagline: 'No franchise identity',
    description: 'Users search product by product. Kidult fans know what universe they want, but the platform has no concept of franchises. Every search starts from zero.',
    pain: 'Lost engagement · Low discovery · No community',
    accentColor: '#6B7280',
    bgFrom: '#1F2937',
    bgTo: '#111827',
    borderColor: '#374151',
  },
  {
    id: 2,
    badge: '02',
    title: 'AI Franchise Detection',
    subtitle: 'GenAI Groups Universes',
    tagline: 'Products intelligently clustered',
    description: 'Amazon\'s GenAI continuously scans the catalog and identifies Kidult franchises — grouping 47,000+ products into named universes. No manual curation needed.',
    pain: 'Powered by Claude AI · Real-time · Self-updating',
    accentColor: '#49C8DF',
    bgFrom: '#1E3A5F',
    bgTo: '#111827',
    borderColor: '#1D4ED8',
  },
  {
    id: 3,
    badge: '03',
    title: 'One Click — Enter Marvel World',
    subtitle: 'User Clicks the Marvel Button',
    tagline: 'From search to destination',
    description: 'A persistent franchise bar lets any fan instantly jump into their universe. The user clicks "Marvel" — and a dedicated micro-site opens. One click replaces dozens of search queries.',
    pain: 'Exclusive entry point · Only via franchise button',
    accentColor: '#E23636',
    bgFrom: '#4C0519',
    bgTo: '#1C0A0A',
    borderColor: '#DC2626',
  },
  {
    id: 4,
    badge: '04',
    title: 'Marvel World',
    subtitle: 'Dedicated Micro-Site',
    tagline: 'A universe within Amazon',
    description: 'A fully themed destination only accessible via the Marvel button: curated collectibles, latest drops, community discussions, fan recommendations and curated collections — all Marvel, all the time.',
    pain: 'Collectibles · Latest Releases · Community · Fan Picks · Collections',
    accentColor: '#E23636',
    bgFrom: '#7B0000',
    bgTo: '#1A0A0A',
    borderColor: '#E23636',
  },
];

// ── Mini Mockup: Step 1 ────────────────────────────────────────────────────────
function MockupStep1() {
  return (
    <div className="bg-[#0D1B2A] rounded overflow-hidden text-[7px] border border-gray-700 w-full">
      <div className="bg-[#1B2836] px-2 py-1 flex items-center gap-1">
        <span className="text-white font-black text-[8px]">amazon</span>
        <div className="flex-1 bg-white/90 rounded-sm h-2.5 mx-1 flex items-center px-1">
          <span className="text-gray-400 text-[5px]">Search Amazon...</span>
        </div>
        <div className="w-4 h-2.5 bg-[#FF9900] rounded-sm flex items-center justify-center">
          <span className="text-black text-[5px]">🔍</span>
        </div>
      </div>
      <div className="bg-[#37475A] px-2 py-0.5 flex gap-2">
        {['All', 'Electronics', 'Toys', 'Fashion', 'Books'].map(l => (
          <span key={l} className="text-gray-300 text-[5px]">{l}</span>
        ))}
      </div>
      <div className="p-1.5">
        <div className="text-gray-500 text-[5px] mb-1">Results for "collectibles" (42,318)</div>
        <div className="grid grid-cols-3 gap-1 mb-1.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[#1E2A3A] rounded h-9 flex flex-col p-0.5">
              <div className="flex-1 bg-gray-600/40 rounded mb-0.5" />
              <div className="bg-gray-700 rounded w-full h-0.5 mb-0.5" />
              <div className="bg-gray-700 rounded w-3/4 h-0.5" />
            </div>
          ))}
        </div>
        <div className="border-t border-gray-700/50 pt-1 mb-1">
          <div className="text-gray-500 text-[5px] mb-0.5">⭐ Customer Reviews</div>
          <div className="space-y-0.5">
            <div className="bg-gray-800/60 rounded h-1 w-full" />
            <div className="bg-gray-800/60 rounded h-1 w-4/5" />
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-[5px] mb-0.5">💬 Community</div>
          <div className="space-y-0.5">
            <div className="bg-gray-800/60 rounded h-1 w-full" />
            <div className="bg-gray-800/60 rounded h-1 w-2/3" />
          </div>
        </div>
      </div>
      <div className="bg-red-900/30 border-t border-red-800/40 px-2 py-1 text-center">
        <span className="text-red-400 text-[5px] font-bold">❌  No franchise identity</span>
      </div>
    </div>
  );
}

// ── Mini Mockup: Step 2 ────────────────────────────────────────────────────────
function MockupStep2({ pulse }: { pulse: boolean }) {
  const chips = [
    { label: 'Marvel',  color: '#E23636', icon: '🦸' },
    { label: 'LEGO',    color: '#FF6B35', icon: '🧱' },
    { label: 'Naruto',  color: '#FF9900', icon: '🍥' },
    { label: 'Pokémon', color: '#FFCB05', icon: '⚡' },
  ];
  return (
    <div className="bg-[#0D1B2A] rounded overflow-hidden text-[7px] border border-[#1D4ED8]/50 w-full">
      <div className="bg-[#1B2836] px-2 py-1 flex items-center gap-1">
        <span className="text-white font-black text-[8px]">amazon</span>
        <div className="flex-1 bg-white/90 rounded-sm h-2.5 mx-1" />
        <div className="w-4 h-2.5 bg-[#FF9900] rounded-sm" />
      </div>
      <div className="bg-[#37475A] px-1.5 py-1 flex gap-1 items-center">
        <span className="text-[#49C8DF] text-[5px] font-bold mr-0.5">✦ AI</span>
        {chips.map(f => (
          <div
            key={f.label}
            className="text-white text-[5px] px-1.5 py-0.5 rounded-sm font-bold transition-all"
            style={{
              background: `${f.color}CC`,
              border: `1px solid ${f.color}`,
              boxShadow: pulse ? `0 0 4px ${f.color}` : 'none',
            }}
          >
            {f.icon} {f.label}
          </div>
        ))}
      </div>
      <div className="p-1.5">
        <div className="flex items-center gap-1 mb-1">
          <div className="text-[#49C8DF] text-[5px]">🤖 AI detected 4 universes</div>
          <div className={`w-1 h-1 rounded-full bg-[#49C8DF] ${pulse ? 'animate-ping' : ''}`} />
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[#1E2A3A] rounded h-9 flex flex-col p-0.5 opacity-60">
              <div className="flex-1 bg-gray-600/40 rounded mb-0.5" />
              <div className="bg-gray-700 rounded w-full h-0.5 mb-0.5" />
              <div className="bg-gray-700 rounded w-3/4 h-0.5" />
            </div>
          ))}
        </div>
        <div className="mt-1.5 bg-[#1D4ED8]/20 border border-[#1D4ED8]/30 rounded p-1 text-center">
          <span className="text-[#49C8DF] text-[5px]">47,318 products grouped into franchise worlds</span>
        </div>
      </div>
    </div>
  );
}

// ── Mini Mockup: Step 3 — ONLY Marvel is the entry point ──────────────────────
function MockupStep3({ animating }: { animating: boolean }) {
  const others = [
    { label: 'LEGO',    color: '#FF6B35', icon: '🧱' },
    { label: 'Naruto',  color: '#FF9900', icon: '🍥' },
    { label: 'Pokémon', color: '#FFCB05', icon: '⚡' },
  ];
  return (
    <div className="bg-[#0D1B2A] rounded overflow-hidden text-[7px] border border-[#DC2626]/60 w-full">
      <div className="bg-[#1B2836] px-2 py-1 flex items-center gap-1">
        <span className="text-white font-black text-[8px]">amazon</span>
        <div className="flex-1 bg-white/90 rounded-sm h-2.5 mx-1" />
        <div className="w-4 h-2.5 bg-[#FF9900] rounded-sm" />
      </div>
      {/* Franchise bar — Marvel highlighted, others dimmed */}
      <div className="bg-[#37475A] px-1.5 py-1 flex gap-1 items-center">
        <span className="text-[#49C8DF] text-[5px] font-bold mr-0.5">✦ AI</span>
        {/* Marvel — the one being clicked */}
        <div
          className="text-white text-[5px] px-1.5 py-0.5 rounded-sm font-bold relative transition-all duration-300"
          style={{
            background: '#E23636',
            border: '1px solid #E23636',
            transform: animating ? 'scale(1.2)' : 'scale(1)',
            boxShadow: `0 0 ${animating ? '10px' : '6px'} #E23636, 0 0 ${animating ? '20px' : '10px'} #E2363644`,
          }}
        >
          🦸 Marvel
          {animating && <span className="ml-0.5 text-yellow-200">◀</span>}
        </div>
        {/* Others — greyed/locked */}
        {others.map(f => (
          <div
            key={f.label}
            className="text-[5px] px-1.5 py-0.5 rounded-sm font-bold"
            style={{
              background: '#37475A',
              border: '1px solid #4B5563',
              color: '#6B7280',
              opacity: 0.45,
            }}
          >
            {f.icon} {f.label}
          </div>
        ))}
        <span className={`text-[8px] ml-auto transition-opacity ${animating ? 'opacity-100' : 'opacity-60'}`}>
          👆
        </span>
      </div>
      {/* Transition / click effect */}
      <div className="p-2 flex flex-col items-center justify-center" style={{ minHeight: '90px' }}>
        {animating ? (
          <>
            <div className="text-[#E23636] text-[6px] font-bold mb-1.5 animate-pulse text-center">
              ⚡ Entering Marvel World...
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden mb-1">
              <div className="h-full bg-gradient-to-r from-red-700 to-red-400 rounded-full animate-pulse" style={{ width: '72%' }} />
            </div>
            <div className="text-gray-500 text-[5px]">Loading 12,400 Marvel products…</div>
            <div className="mt-1.5 text-[4.5px] text-red-400/80 border border-red-900/40 bg-red-950/40 px-1.5 py-0.5 rounded text-center">
              🔒 Exclusive — only accessible via Marvel button
            </div>
          </>
        ) : (
          <>
            <div className="text-gray-500 text-[5.5px] mb-1.5 text-center">Click Marvel to enter the exclusive micro-site</div>
            <div className="flex gap-1 opacity-30">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-6 h-8 bg-[#1E2A3A] rounded" />
              ))}
            </div>
            <div className="mt-1.5 text-[4.5px] text-gray-600 border border-gray-700/40 bg-gray-800/30 px-1.5 py-0.5 rounded text-center">
              🔒 Exclusive entry point — each world is franchise-gated
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Mini Mockup: Step 4 — Full Marvel World micro-site ────────────────────────
function MockupStep4({ highlight }: { highlight: boolean }) {
  const products = [
    { name: 'Hot Toys Iron Man MkL', price: '$389', emoji: '🦾' },
    { name: 'Sideshow Spidey 1:6',   price: '$549', emoji: '🕷️' },
    { name: 'LEGO Avengers HQ',      price: '$149', emoji: '🧱' },
    { name: 'Funko Iron Man',         price: '$18',  emoji: '🎭' },
    { name: 'Hot Toys Thor',          price: '$429', emoji: '⚡' },
    { name: 'McFarlane Venom',        price: '$34',  emoji: '🖤' },
  ];
  return (
    <div
      className="rounded overflow-hidden text-[7px] w-full transition-all duration-500"
      style={{
        border: `1px solid ${highlight ? '#E23636' : '#7B0000'}`,
        background: '#0D0505',
        boxShadow: highlight ? '0 0 16px #E2363630' : 'none',
      }}
    >
      {/* Access badge */}
      <div className="bg-[#1A0000] border-b border-red-900/40 px-2 py-0.5 flex items-center gap-1">
        <span className="text-red-400 text-[4.5px]">🔒 Accessible only via Marvel button</span>
        <span className="ml-auto text-green-400 text-[4.5px] flex items-center gap-0.5">
          <span className="w-1 h-1 rounded-full bg-green-400 inline-block animate-pulse" />
          Live
        </span>
      </div>

      {/* Marvel branded header */}
      <div className="bg-gradient-to-r from-red-800 via-red-700 to-red-900 px-2 py-2">
        <div className="flex items-center gap-1 mb-1">
          <span className="text-white font-black text-[9px] tracking-widest">✦ MARVEL</span>
          <span className="text-red-200 text-[6px] font-medium">WORLD</span>
          <div className="ml-auto text-yellow-300 text-[4.5px] bg-black/30 px-1 py-0.5 rounded">
            12,400 items
          </div>
        </div>
        {/* World tabs */}
        <div className="flex gap-1">
          {['All', '💎 Invest', '📦 Collect', '🎮 Play', '🌐 Community'].map((tab, i) => (
            <span
              key={tab}
              className="text-[4.5px] px-1 py-0.5 rounded-sm font-medium"
              style={{
                background: i === 0 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                color: i === 0 ? 'white' : 'rgba(255,200,200,0.8)',
                border: i === 0 ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent',
              }}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      <div className="p-1.5 space-y-2">
        {/* Latest Releases */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-red-400 text-[5px] font-bold">🔥 Latest Releases</span>
            <span className="text-[4px] text-gray-500 ml-auto">See all</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {products.slice(0, 3).map(p => (
              <div key={p.name} className="bg-red-950/60 border border-red-900/30 rounded p-0.5 flex flex-col items-center">
                <span className="text-base leading-none mb-0.5">{p.emoji}</span>
                <div className="text-[4px] text-gray-300 text-center leading-tight line-clamp-2">{p.name}</div>
                <div className="text-yellow-400 text-[4.5px] font-bold">{p.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Marvel Collectibles grid */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-orange-400 text-[5px] font-bold">🏆 Marvel Collectibles</span>
            <span className="text-[4px] text-gray-500 ml-auto">See all</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {products.slice(3).map(p => (
              <div key={p.name} className="bg-red-950/40 border border-red-900/20 rounded p-0.5 flex flex-col items-center">
                <span className="text-base leading-none mb-0.5">{p.emoji}</span>
                <div className="text-[4px] text-gray-400 text-center leading-tight line-clamp-2">{p.name}</div>
                <div className="text-yellow-400 text-[4.5px] font-bold">{p.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Community sections */}
        <div className="space-y-0.5">
          {[
            { icon: '⭐', label: 'Fan Recommendations', sub: 'Top picks by Marvel collectors', color: 'text-yellow-400' },
            { icon: '💬', label: 'Community Discussions', sub: '3,200 active Marvel fans', color: 'text-blue-400' },
            { icon: '🗂️', label: 'Curated Collections', sub: 'AI-assembled themed sets', color: 'text-purple-400' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1 bg-red-950/30 border border-red-900/20 rounded px-1 py-0.5">
              <span className={`${item.color} text-[6px]`}>{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-gray-300 text-[4.5px] font-medium leading-tight">{item.label}</div>
                <div className="text-gray-600 text-[4px] leading-tight">{item.sub}</div>
              </div>
              <span className="text-gray-600 text-[5px]">›</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-red-950/80 to-transparent px-2 py-0.5 flex items-center gap-1 border-t border-red-900/20">
        <span className="text-[#49C8DF] text-[4.5px]">✦ AI-generated · Updates live</span>
        <span className="ml-auto text-red-400 text-[4.5px]">🔒 Marvel World only</span>
      </div>
    </div>
  );
}

// ── Arrow component ─────────────────────────────────────────────────────────────
function Arrow({ active, color = '#FF9900', label }: { active: boolean; color?: string; label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-1.5 flex-shrink-0" style={{ minWidth: '44px' }}>
      <svg width="36" height="22" viewBox="0 0 36 22" fill="none">
        <defs>
          <marker id={`arrow-${color.replace('#','')}`} markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5 Z" fill={active ? color : '#374151'} />
          </marker>
        </defs>
        <path
          d="M2,11 L30,11"
          stroke={active ? color : '#374151'}
          strokeWidth="2"
          markerEnd={`url(#arrow-${color.replace('#','')})`}
          className="transition-all duration-500"
          strokeDasharray={active ? 'none' : '4,3'}
        />
      </svg>
      {active && label && (
        <span className="text-[7px] mt-0.5 font-medium" style={{ color }}>{label}</span>
      )}
    </div>
  );
}

// ── Feature pillars ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: '🤖',
    title: 'AI-Driven Discovery',
    desc: 'Claude continuously scans 47K+ products and groups them by franchise — no human curation.',
    color: '#49C8DF',
  },
  {
    icon: '🔒',
    title: 'Franchise-Gated Worlds',
    desc: 'Each micro-site is exclusively accessible via its franchise button — creating a destination, not a search result.',
    color: '#E23636',
  },
  {
    icon: '📡',
    title: 'Living Trend Engine',
    desc: 'Merchandising refreshes in real-time based on community signals, auctions and market data.',
    color: '#06D6A0',
  },
  {
    icon: '🌐',
    title: 'Community Layer',
    desc: 'Every franchise world has fan posts, trading, show & tell, and a leaderboard of top collectors.',
    color: '#FF9900',
  },
];

// ── Main page ──────────────────────────────────────────────────────────────────
export default function ConceptPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const [step3Animating, setStep3Animating] = useState(false);
  const playRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) {
      if (playRef.current) clearInterval(playRef.current);
      return;
    }
    setActiveStep(1);
    let current = 1;
    playRef.current = setInterval(() => {
      current++;
      if (current === 3) setStep3Animating(true);
      else setStep3Animating(false);
      setActiveStep(current);
      if (current >= 4) {
        clearInterval(playRef.current!);
        setPlaying(false);
      }
    }, 2200);
    return () => { if (playRef.current) clearInterval(playRef.current); };
  }, [playing]);

  const handlePlay = () => {
    setActiveStep(1);
    setStep3Animating(false);
    setPlaying(true);
  };

  const handleStepClick = (id: number) => {
    setActiveStep(activeStep === id ? 0 : id);
    if (id === 3) setStep3Animating(true);
    else setStep3Animating(false);
    setPlaying(false);
  };

  return (
    <div className="min-h-screen bg-az-bg">
      <div className="max-w-[1200px] mx-auto px-4 py-8">

        {/* ── Title ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF9900]/30 bg-[#FF9900]/5 text-[#FF9900] text-xs font-bold mb-4 uppercase tracking-widest">
            ✦ Amazon Kidult · Strategy Concept
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">
            Amazon <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#E23636]">Worlds</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            From a generic marketplace to{' '}
            <span className="text-white font-semibold">franchise-exclusive micro-sites</span>
            {' '}— one click opens a dedicated world.
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={handlePlay}
              disabled={playing}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#FF9900] text-black font-bold text-sm hover:bg-[#F0C040] transition-colors disabled:opacity-60"
            >
              {playing ? '▶ Playing...' : '▶ Play Animation'}
            </button>
            <button
              onClick={() => { setActiveStep(0); setPlaying(false); setStep3Animating(false); }}
              className="flex items-center gap-2 px-5 py-2 rounded-lg border border-az-border text-az-muted font-medium text-sm hover:text-white hover:border-white/30 transition-colors"
            >
              ⬛ Reset
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-5 py-2 rounded-lg border border-az-border text-az-muted font-medium text-sm hover:text-white hover:border-white/30 transition-colors"
            >
              ← Back to Hub
            </button>
          </div>
        </div>

        {/* ── Main Flow Diagram ── */}
        <div className="relative mb-4">
          <div className="text-center text-[11px] text-gray-600 mb-4">
            Click any step to focus · Press Play for guided walkthrough
          </div>

          <div className="flex items-start justify-center gap-0">
            {STEPS.map((step, idx) => {
              const isActive  = activeStep === 0 || activeStep === step.id;
              const isFocused = activeStep === step.id;
              const arrowLabels = ['AI detects', 'user clicks', 'enters world'];
              return (
                <div key={step.id} className="flex items-start">
                  <div
                    onClick={() => handleStepClick(step.id)}
                    className="cursor-pointer transition-all duration-500 rounded-xl overflow-hidden"
                    style={{
                      width: isFocused ? '285px' : '210px',
                      opacity: isActive ? 1 : 0.3,
                      border: `2px solid ${isFocused ? step.accentColor : isActive ? step.borderColor + '80' : '#374151'}`,
                      background: `linear-gradient(160deg, ${step.bgFrom}, ${step.bgTo})`,
                      boxShadow: isFocused ? `0 0 28px ${step.accentColor}40, 0 4px 24px #00000060` : '0 2px 8px #00000040',
                      transform: isFocused ? 'translateY(-10px)' : 'none',
                    }}
                  >
                    <div
                      className="px-4 pt-4 pb-2 border-b"
                      style={{ borderColor: step.borderColor + '40' }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-[10px] font-black px-2.5 py-1 rounded-full"
                          style={{ background: `${step.accentColor}20`, color: step.accentColor, border: `1px solid ${step.accentColor}60` }}
                        >
                          STEP {step.badge}
                        </span>
                        {isFocused && (
                          <span className="text-[9px] font-bold" style={{ color: step.accentColor }}>● Active</span>
                        )}
                      </div>
                      <h3 className="font-black text-white text-sm leading-tight mb-0.5">{step.title}</h3>
                      <p className="text-[11px]" style={{ color: step.accentColor }}>{step.subtitle}</p>
                    </div>

                    <div className="px-3 py-3">
                      {step.id === 1 && <MockupStep1 />}
                      {step.id === 2 && <MockupStep2 pulse={isFocused || (playing && activeStep >= 2)} />}
                      {step.id === 3 && <MockupStep3 animating={step3Animating || (playing && activeStep === 3)} />}
                      {step.id === 4 && <MockupStep4 highlight={isFocused || (playing && activeStep >= 4)} />}
                    </div>

                    <div
                      className="px-4 py-2 border-t"
                      style={{ borderColor: step.borderColor + '40', background: `${step.bgFrom}80` }}
                    >
                      <p className="text-[10px] text-gray-400 leading-relaxed line-clamp-2">{step.description}</p>
                      <p className="text-[9px] mt-1 font-medium" style={{ color: step.accentColor }}>{step.pain}</p>
                    </div>
                  </div>

                  {idx < STEPS.length - 1 && (
                    <Arrow
                      active={activeStep === 0 || activeStep >= step.id}
                      color={STEPS[idx + 1].accentColor}
                      label={activeStep === step.id ? arrowLabels[idx] : undefined}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Tagline strip ── */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className="text-center px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-300 cursor-pointer"
              style={{
                color: (activeStep === 0 || activeStep === step.id) ? step.accentColor : '#4B5563',
                background: (activeStep === 0 || activeStep === step.id) ? `${step.accentColor}15` : 'transparent',
                border: `1px solid ${(activeStep === 0 || activeStep === step.id) ? step.accentColor + '40' : '#374151'}`,
              }}
              onClick={() => handleStepClick(step.id)}
            >
              "{step.tagline}"
            </div>
          ))}
        </div>

        {/* ── Detail panel when a step is focused ── */}
        {activeStep > 0 && (
          <div
            className="az-card p-6 mb-12 animate-fade-in"
            style={{ borderColor: STEPS[activeStep - 1].accentColor + '40' }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: STEPS[activeStep - 1].accentColor + '20', border: `1px solid ${STEPS[activeStep - 1].accentColor}50` }}
              >
                {activeStep === 1 ? '🛒' : activeStep === 2 ? '🤖' : activeStep === 3 ? '🦸' : '🔒'}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-white mb-1">{STEPS[activeStep - 1].title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">{STEPS[activeStep - 1].description}</p>
                <div
                  className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ color: STEPS[activeStep - 1].accentColor, background: `${STEPS[activeStep - 1].accentColor}15`, border: `1px solid ${STEPS[activeStep - 1].accentColor}40` }}
                >
                  {STEPS[activeStep - 1].pain}
                </div>
              </div>
              {activeStep < 4 && (
                <button
                  onClick={() => handleStepClick(activeStep + 1)}
                  className="flex-shrink-0 px-4 py-2 rounded-lg font-bold text-sm text-white transition-colors"
                  style={{ background: STEPS[activeStep].accentColor }}
                >
                  Next: {STEPS[activeStep].title} →
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Divider ── */}
        <div className="border-t border-az-border mb-12" />

        {/* ── Key pillars ── */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-white text-center mb-2">The Four Pillars</h2>
          <p className="text-gray-500 text-sm text-center mb-8">What makes Amazon Worlds different from a generic page</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="az-card p-5 hover:border-white/20 transition-colors">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}40` }}
                >
                  {f.icon}
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{f.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Before / After ── */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-white text-center mb-2">Before vs After</h2>
          <p className="text-gray-500 text-sm text-center mb-8">The Kidult experience — transformed</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="az-card p-5 border-red-900/40">
              <h3 className="font-black text-red-400 text-sm mb-4 flex items-center gap-2">
                <span className="w-5 h-5 bg-red-900/40 rounded flex items-center justify-center text-xs">✕</span>
                Before — Generic Amazon
              </h3>
              <ul className="space-y-2">
                {[
                  'Search "Iron Man figure" → 8,400 unsorted results',
                  'No sense of franchise identity or community',
                  'Investment, collection & fun items all mixed together',
                  'No trend data, no community, no curation',
                  'Every visit starts from zero — no destination',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="text-red-500 mt-0.5 flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="az-card p-5 border-green-900/40">
              <h3 className="font-black text-green-400 text-sm mb-4 flex items-center gap-2">
                <span className="w-5 h-5 bg-green-900/40 rounded flex items-center justify-center text-xs">✓</span>
                After — Amazon Worlds (Marvel example)
              </h3>
              <ul className="space-y-2">
                {[
                  'Click "Marvel" → enter exclusive Marvel World micro-site',
                  'Curated destination: 12,400 items, Marvel-branded UI',
                  'Latest releases · Curated collections · Fan recommendations',
                  'Community discussions · Live trend signals · AI picks',
                  'Only accessible via the Marvel button — a true franchise home',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray-300">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, #2D0505 0%, #1A0A0A 50%, #0F0A0A 100%)', border: '1px solid #7B000040' }}
        >
          <div className="text-[#E23636] text-xs font-bold uppercase tracking-widest mb-3">🦸 Marvel World · Live Demo</div>
          <h3 className="text-2xl font-black text-white mb-3">Enter the Marvel World</h3>
          <p className="text-gray-400 text-sm mb-2 max-w-lg mx-auto">
            Experience the concept live — browse Marvel collectibles exactly as a franchise micro-site would work.
          </p>
          <p className="text-gray-600 text-xs mb-6 max-w-lg mx-auto">
            🔒 Just like in the concept, access is exclusively via the Marvel button in the franchise bar.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => navigate('/?franchise=marvel')}
              className="px-8 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #E23636, #B91C1C)', boxShadow: '0 0 20px #E2363640' }}
            >
              🦸 Open Marvel World →
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-xl border border-white/20 text-white font-medium text-sm hover:border-white/40 transition-colors"
            >
              ← Back to Hub
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
