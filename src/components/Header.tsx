import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-kidult-border bg-kidult-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-kidult-orange flex items-center justify-center text-black font-black text-sm">
              K
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-white leading-none">amazon</div>
              <div className="text-xs font-semibold text-kidult-orange leading-none tracking-wider uppercase">
                Kidult Universe
              </div>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            <NavLink to="/" label="Franchises" active={location.pathname === '/'} />
            <NavLink to="/discover" label="✦ Discover" active={location.pathname === '/discover'} highlight />
          </nav>

          {/* Tagline */}
          <div className="hidden md:flex items-center gap-2 text-xs text-kidult-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-kidult-green animate-pulse" />
            AI-Powered · Live Trends
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  to,
  label,
  active,
  highlight,
}: {
  to: string;
  label: string;
  active: boolean;
  highlight?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${active
          ? 'bg-kidult-orange/10 text-kidult-orange border border-kidult-orange/30'
          : highlight
            ? 'text-kidult-blue hover:bg-kidult-blue/10 border border-transparent hover:border-kidult-blue/30'
            : 'text-kidult-muted hover:text-white hover:bg-kidult-card'
        }`}
    >
      {label}
    </Link>
  );
}
