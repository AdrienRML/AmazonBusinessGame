import { useState } from 'react';
import { COLLECTOR_POSTS } from '../data/mockData';
import type { CollectorPost } from '../types';

export default function CollectorFeed() {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div>
      <h2 className="text-az-text font-bold text-base mb-3">Collector Feed</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {COLLECTOR_POSTS.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            liked={likedPosts.has(post.id)}
            onLike={() => toggleLike(post.id)}
          />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post, liked, onLike }: { post: CollectorPost; liked: boolean; onLike: () => void }) {
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

  return (
    <div className="az-card p-3 flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Avatar seed={post.avatarSeed} bg={post.avatarBg} />
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-az-link font-bold text-xs">{post.username}</span>
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-sm"
                style={{ background: `${post.badgeColor}22`, color: post.badgeColor, border: `1px solid ${post.badgeColor}44` }}
              >
                {post.badge}
              </span>
            </div>
            <span className="text-az-subtle text-[10px]">{post.timeAgo}</span>
          </div>
        </div>
        <button className="text-az-subtle hover:text-az-text text-sm">···</button>
      </div>

      {/* Content */}
      <p className="text-az-muted text-xs leading-relaxed">{post.content}</p>

      {/* Images */}
      {post.images.length > 0 && (
        <div className={`grid gap-1.5 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {post.images.map((src, i) => (
            !imgErrors.has(i) ? (
              <img
                key={i}
                src={src}
                alt={`post image ${i}`}
                className="w-full h-28 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                onError={() => setImgErrors((prev) => new Set([...prev, i]))}
              />
            ) : (
              <div key={i} className="w-full h-28 bg-az-nav2 rounded flex items-center justify-center text-az-subtle text-xs">
                🖼️
              </div>
            )
          ))}
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[10px] text-az-orange border border-az-orange/40 px-2 py-0.5 rounded-sm cursor-pointer hover:bg-az-orange/10">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-1 border-t border-az-border">
        <button
          onClick={onLike}
          className={`flex items-center gap-1.5 text-xs transition-colors ${liked ? 'text-red-400' : 'text-az-subtle hover:text-az-text'}`}
        >
          <span>{liked ? '❤️' : '🤍'}</span>
          <span>{(post.likes + (liked ? 1 : 0)).toLocaleString()} Likes</span>
        </button>
        <button className="flex items-center gap-1.5 text-az-subtle hover:text-az-text text-xs">
          💬 {post.comments} Comment{post.comments !== 1 ? 's' : ''}
        </button>
        <button className="flex items-center gap-1.5 text-az-subtle hover:text-az-orange text-xs ml-auto">
          ↔ Trade
        </button>
      </div>
    </div>
  );
}

function Avatar({ seed, bg }: { seed: string; bg: string }) {
  const [imgErr, setImgErr] = useState(false);
  const initials = seed.replace(/[_0-9]/g, '').slice(0, 2).toUpperCase();
  return imgErr ? (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
      style={{ background: bg }}
    >
      {initials}
    </div>
  ) : (
    <img
      src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=${bg.replace('#', '')}`}
      alt={seed}
      className="w-8 h-8 rounded-full flex-shrink-0 bg-az-nav2"
      onError={() => setImgErr(true)}
    />
  );
}
