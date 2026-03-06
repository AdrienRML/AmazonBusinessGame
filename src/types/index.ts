export type FranchiseCategory = 'anime' | 'comics' | 'movies' | 'games' | 'nostalgia' | 'sci-fi';
export type TrendDirection = 'rising' | 'stable' | 'declining';
export type UsageWorld = 'investment' | 'collection' | 'entertainment';
export type ProductBadge = 'Limited Edition' | 'Exclusive' | 'Trending' | 'Best Seller' | 'Rare Find' | null;
export type CommunityTag = 'Investment Tips' | 'Show & Tell' | 'New Drop' | 'Trading' | 'Discussion';

export interface Franchise {
  id: string;
  name: string;
  category: FranchiseCategory;
  description: string;
  tagline: string;
  trendScore: number;
  trendDirection: TrendDirection;
  universeColor: string;
  icons: [string, string];
}

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number | null;
  badge: ProductBadge;
  description: string;
  pitch: string;
  rating: number;
  reviews: number;
  emoji: string;
}

export interface WorldContent {
  headline: string;
  description: string;
  products: Product[];
}

export interface TrendSignal {
  label: string;
  value: number;
  change: number;
  unit: string;
  icon: string;
  description: string;
}

export interface CommunityPost {
  author: string;
  avatar: string;
  content: string;
  likes: number;
  replies: number;
  timeAgo: string;
  tag: CommunityTag;
}

export interface StorefrontContent {
  investment: WorldContent;
  collection: WorldContent;
  entertainment: WorldContent;
  trendSignals: TrendSignal[];
  communityPosts: CommunityPost[];
}
