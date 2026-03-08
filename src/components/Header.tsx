import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FRANCHISE_TABS } from '../data/mockData';

export default function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activeTab = params.get('franchise') || '';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?franchise=marvel&q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-az-nav px-4 py-2 flex items-center gap-3">
        {/* Logo */}
        <div
          className="flex-shrink-0 cursor-pointer flex flex-col items-start"
          onClick={() => navigate('/')}
        >
          <span className="text-az-text font-black text-xl leading-none tracking-tight">amazon</span>
          <div className="flex items-center gap-0.5">
            <span className="text-[10px] text-az-muted">kidult</span>
            <span className="text-az-orange text-xs">▸</span>
          </div>
        </div>

        {/* Deliver to */}
        <div className="hidden lg:flex flex-col cursor-pointer hover:outline hover:outline-1 hover:outline-white rounded px-1 py-0.5">
          <span className="text-[10px] text-az-muted">Deliver to</span>
          <div className="flex items-center gap-1">
            <span className="text-sm">📍</span>
            <span className="text-az-text font-bold text-xs">France</span>
          </div>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 flex max-w-3xl">
          <div className="flex w-full rounded overflow-hidden">
            <select className="bg-gray-200 text-black text-xs px-2 border-r border-gray-400 cursor-pointer flex-shrink-0 hidden sm:block">
              <option>All Kidult</option>
              <option>Marvel</option>
              <option>Pokémon</option>
              <option>LEGO</option>
              <option>Anime</option>
            </select>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search collectibles, figures, trading cards..."
              className="flex-1 px-3 py-2 text-black text-sm outline-none min-w-0"
            />
            <button
              type="submit"
              className="bg-az-orange hover:bg-az-hover px-4 flex items-center justify-center flex-shrink-0 transition-colors"
            >
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </form>

        {/* Right icons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden md:flex flex-col cursor-pointer hover:outline hover:outline-1 hover:outline-white rounded px-2 py-0.5">
            <span className="text-[10px] text-az-muted">Hello, Sign in</span>
            <span className="text-xs font-bold text-az-text">Account & Lists ▾</span>
          </div>
          <div className="hidden md:flex flex-col cursor-pointer hover:outline hover:outline-1 hover:outline-white rounded px-2 py-0.5">
            <span className="text-[10px] text-az-muted">Returns</span>
            <span className="text-xs font-bold text-az-text">& Orders</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:outline hover:outline-1 hover:outline-white rounded px-2 py-0.5">
            <div className="relative">
              <span className="text-xl">🛒</span>
              <span className="absolute -top-1 -right-1 bg-az-orange text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </div>
            <span className="text-xs font-bold hidden md:inline">Cart</span>
          </div>
        </div>
      </div>

      {/* Category nav bar */}
      <div className="bg-az-nav2 px-2 flex items-center gap-0 overflow-x-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-az-text text-xs font-medium px-3 py-2.5 whitespace-nowrap hover:outline hover:outline-1 hover:outline-white rounded transition-colors"
        >
          ☰ All
        </button>
        {FRANCHISE_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => navigate(`/?franchise=${tab.id}`)}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2.5 whitespace-nowrap transition-colors rounded
              ${activeTab === tab.id
                ? 'text-az-orange outline outline-1 outline-az-orange'
                : 'text-az-text hover:outline hover:outline-1 hover:outline-white'
              }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
        <button className="flex items-center gap-1 text-az-orange text-xs font-bold px-3 py-2.5 whitespace-nowrap ml-auto">
          🔥 Limited Drops
        </button>
        <button className="flex items-center gap-1 text-az-text text-xs font-medium px-3 py-2.5 whitespace-nowrap hover:outline hover:outline-1 hover:outline-white rounded">
          🃏 Fan Cards
        </button>
      </div>
    </header>
  );
}
