import { CommunityPost } from '../types';

const TAG_STYLES: Record<string, string> = {
  'Investment Tips': 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30',
  'Show & Tell': 'bg-purple-400/10 text-purple-400 border-purple-400/30',
  'New Drop': 'bg-kidult-blue/10 text-kidult-blue border-kidult-blue/30',
  Trading: 'bg-orange-400/10 text-orange-400 border-orange-400/30',
  Discussion: 'bg-gray-400/10 text-gray-400 border-gray-400/30',
};

interface Props {
  posts: CommunityPost[];
  franchiseName: string;
}

export default function CommunityLayer({ posts, franchiseName }: Props) {
  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>🌐</span> Community
          </h2>
          <p className="text-kidult-muted text-sm mt-1">
            What {franchiseName} fans are saying
          </p>
        </div>
        <button className="btn-secondary text-sm py-2 px-4">Join Community →</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post, i) => (
          <PostCard key={i} post={post} />
        ))}
      </div>

      <div className="mt-4 glass-card p-4 flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-kidult-border flex items-center justify-center text-lg flex-shrink-0">
          🙋
        </div>
        <input
          type="text"
          placeholder="Share your thoughts with the community..."
          className="flex-1 bg-transparent text-sm text-kidult-text placeholder-kidult-muted outline-none"
          readOnly
          onClick={() => alert('Community posting coming soon!')}
        />
        <button className="btn-primary text-sm py-2 px-4">Post</button>
      </div>
    </section>
  );
}

function PostCard({ post }: { post: CommunityPost }) {
  const tagStyle = TAG_STYLES[post.tag] || TAG_STYLES['Discussion'];

  return (
    <div className="glass-card p-4 hover:border-white/20 transition-all duration-200">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-kidult-border flex items-center justify-center text-lg flex-shrink-0">
          {post.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-white text-sm">{post.author}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full border font-medium ${tagStyle}`}
            >
              {post.tag}
            </span>
          </div>
          <span className="text-xs text-kidult-muted">{post.timeAgo}</span>
        </div>
      </div>

      <p className="text-sm text-kidult-text leading-relaxed mb-3">{post.content}</p>

      <div className="flex items-center gap-4 text-xs text-kidult-muted">
        <button className="flex items-center gap-1 hover:text-kidult-orange transition-colors">
          <span>♥</span>
          <span>{post.likes.toLocaleString()}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-kidult-blue transition-colors">
          <span>💬</span>
          <span>{post.replies}</span>
        </button>
        <button className="ml-auto hover:text-white transition-colors">Share ↗</button>
      </div>
    </div>
  );
}
