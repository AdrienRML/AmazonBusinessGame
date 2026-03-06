import { Franchise } from '../types';

export const FEATURED_FRANCHISES: Franchise[] = [
  {
    id: 'star-wars',
    name: 'Star Wars',
    category: 'sci-fi',
    description:
      'The galaxy\'s most iconic franchise spans six decades of storytelling. From limited UCS LEGO sets to signed concept art, Star Wars collectibles remain among the safest blue-chip investments in the Kidult market.',
    tagline: 'A galaxy of possibilities',
    trendScore: 94,
    trendDirection: 'rising',
    universeColor: '#FFD700',
    icons: ['⚔️', '🚀'],
  },
  {
    id: 'dragon-ball',
    name: 'Dragon Ball Z',
    category: 'anime',
    description:
      'Powering through four decades, Dragon Ball remains the undisputed king of anime collectibles. Ultra-rare first-edition manga volumes and original animation cels are achieving record auction prices.',
    tagline: 'Power beyond limits',
    trendScore: 91,
    trendDirection: 'rising',
    universeColor: '#FF6B35',
    icons: ['🐉', '💥'],
  },
  {
    id: 'one-piece',
    name: 'One Piece',
    category: 'anime',
    description:
      'With the Netflix adaptation reigniting global passion, One Piece has entered a new golden era. Portrait of Pirates statues and signed Eiichiro Oda art books are seeing unprecedented demand.',
    tagline: 'The greatest treasure awaits',
    trendScore: 97,
    trendDirection: 'rising',
    universeColor: '#E63946',
    icons: ['🏴‍☠️', '⚓'],
  },
  {
    id: 'marvel',
    name: 'Marvel Universe',
    category: 'comics',
    description:
      'Marvel Comics first printings and Hot Toys 1:6 scale figures dominate the Kidult premium segment. Key issues like Amazing Fantasy #15 reprints and signed Stan Lee memorabilia remain timeless.',
    tagline: 'Assemble your universe',
    trendScore: 88,
    trendDirection: 'stable',
    universeColor: '#E23636',
    icons: ['🦸', '⚡'],
  },
  {
    id: 'gundam',
    name: 'Mobile Suit Gundam',
    category: 'anime',
    description:
      'The pinnacle of model kit culture, Gundam Perfect Grade builds are engineering marvels that blur the line between hobby and art. Limited collaboration colorways command 3x market premiums.',
    tagline: 'Build your legend',
    trendScore: 85,
    trendDirection: 'rising',
    universeColor: '#3B82F6',
    icons: ['🤖', '🛡️'],
  },
  {
    id: 'harry-potter',
    name: 'Harry Potter',
    category: 'nostalgia',
    description:
      'The Wizarding World sustains multigenerational loyalty unlike any other franchise. Signed first editions of Philosopher\'s Stone (1997) are literary blue chips, while LEGO Hogwarts holds exceptional resale value.',
    tagline: 'Magic never fades',
    trendScore: 82,
    trendDirection: 'stable',
    universeColor: '#7B2FBE',
    icons: ['⚡', '🦉'],
  },
  {
    id: 'studio-ghibli',
    name: 'Studio Ghibli',
    category: 'anime',
    description:
      'Hayao Miyazaki\'s masterpieces transcend entertainment to become cultural artifacts. Ghibli Museum exclusive items, original film cels, and Nausicaä first-edition manga are achieving museum-grade valuations.',
    tagline: 'Where wonder lives',
    trendScore: 89,
    trendDirection: 'rising',
    universeColor: '#06D6A0',
    icons: ['🌿', '✨'],
  },
  {
    id: 'pokemon',
    name: 'Pokémon',
    category: 'games',
    description:
      'PSA 10 Charizard holographic cards have outperformed the S&P 500 over the last decade. Pokémon sits at the intersection of gaming nostalgia, card speculation, and lifestyle brand — the holy trinity of Kidult investment.',
    tagline: 'Catch the opportunity',
    trendScore: 93,
    trendDirection: 'rising',
    universeColor: '#FFCB05',
    icons: ['⚡', '🃏'],
  },
];

export const CATEGORY_LABELS: Record<string, string> = {
  anime: 'Anime',
  comics: 'Comics',
  movies: 'Movies & TV',
  games: 'Gaming',
  nostalgia: 'Nostalgia',
  'sci-fi': 'Sci-Fi',
};

export const WORLD_CONFIG = {
  investment: {
    label: 'Investment',
    icon: '💎',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/30',
    description: 'Rare, limited-edition pieces built to appreciate in value',
  },
  collection: {
    label: 'Collection',
    icon: '📦',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/30',
    description: 'Complete sets, figures, and display pieces for the dedicated fan',
  },
  entertainment: {
    label: 'Fun & Entertainment',
    icon: '🎮',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/30',
    description: 'Games, merch, and experiences to live the franchise every day',
  },
};
