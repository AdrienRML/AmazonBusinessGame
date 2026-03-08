import { useNavigate } from 'react-router-dom';

export default function HeroBanner() {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden rounded mb-4" style={{ background: 'linear-gradient(135deg, #1A2744 0%, #0D1B2A 50%, #1A2744 100%)', minHeight: '220px' }}>
      {/* Left collectible images */}
      <div className="absolute left-0 top-0 bottom-0 w-48 overflow-hidden flex flex-wrap gap-1 p-1 opacity-90">
        {[
          { src: `https://loremflickr.com/90/90/ironman,figure?lock=300`, alt: 'Iron Man' },
          { src: `https://loremflickr.com/90/90/spiderman,figure?lock=301`, alt: 'Spider-Man' },
          { src: `https://loremflickr.com/90/90/hulk,figure?lock=302`, alt: 'Hulk' },
          { src: `https://loremflickr.com/90/90/lego,set?lock=303`, alt: 'LEGO' },
          { src: `https://loremflickr.com/90/90/marvel,figures?lock=304`, alt: 'Marvel' },
          { src: `https://loremflickr.com/90/90/avengers,figures?lock=305`, alt: 'Avengers' },
        ].map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            className="w-[88px] h-[88px] object-cover rounded"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ))}
      </div>

      {/* Right collectible images */}
      <div className="absolute right-0 top-0 bottom-0 w-48 overflow-hidden flex flex-wrap gap-1 p-1 opacity-90">
        {[
          { src: `https://loremflickr.com/90/90/pikachu,pokemon?lock=310`, alt: 'Pikachu' },
          { src: `https://loremflickr.com/90/90/gundam,robot?lock=311`, alt: 'Gundam' },
          { src: `https://loremflickr.com/90/90/anime,figure?lock=312`, alt: 'Anime' },
          { src: `https://loremflickr.com/90/90/dragonball,goku?lock=313`, alt: 'DBZ' },
          { src: `https://loremflickr.com/90/90/onepiece,luffy?lock=314`, alt: 'One Piece' },
          { src: `https://loremflickr.com/90/90/pokemon,cards?lock=315`, alt: 'Pokémon' },
        ].map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            className="w-[88px] h-[88px] object-cover rounded"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-10 px-52 text-center">
        <h1 className="text-3xl font-black text-white mb-1 leading-tight">
          Amazon Kidult Hub
        </h1>
        <p className="text-az-muted text-sm mb-4">Collect • Trade • Discover</p>

        <button
          className="az-btn-orange px-8 py-2.5 text-sm font-bold rounded mb-5"
          onClick={() => navigate('/?franchise=marvel')}
        >
          Join Community
        </button>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm">
          {[
            { icon: '🏆', value: '50K+', label: 'members' },
            { icon: '💎', value: '15K', label: 'rare collections' },
            { icon: '💰', value: '$3M+', label: 'trades' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-1.5">
              <span>{stat.icon}</span>
              <span className="text-az-orange font-bold">{stat.value}</span>
              <span className="text-az-muted">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
