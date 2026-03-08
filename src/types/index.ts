export interface FranchiseTab {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: 'Limited' | 'Trending' | 'Exclusive' | 'New' | 'Best Seller';
  prime: boolean;
  image: string;           // loremflickr / picsum URL
  category: string;
  franchise: string;
  description: string;
}

export interface CollectorPost {
  id: string;
  username: string;
  badge: string;           // e.g. "1 Star Seller", "Top Collector"
  badgeColor: string;
  avatarSeed: string;      // DiceBear seed
  avatarBg: string;
  timeAgo: string;
  content: string;
  images: string[];        // up to 3 image URLs
  likes: number;
  comments: number;
  tags?: string[];
}

export interface LimitedDrop {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  endTime: Date;          // countdown target
  stock: number;
}

export interface BiddingItem {
  id: string;
  title: string;
  image: string;
  currentBid: number;
  originalPrice: number;
  bidders: number;
  endsIn: string;         // e.g. "12 min 24s"
  reviews: number;
}

export interface TrendingItem {
  rank: number;
  title: string;
  image: string;
  price: number;
  badge: string;
  discount?: number;
}

export interface TopCollector {
  rank: number;
  username: string;
  avatarSeed: string;
  avatarBg: string;
  score: number;
  badge: string;
}
