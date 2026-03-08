import HeroBanner from '../components/HeroBanner';
import CollectorFeed from '../components/CollectorFeed';
import {
  LimitedDropWidget,
  BiddingWidget,
  TrendingWidget,
  TopCollectorsWidget,
} from '../components/SidebarWidgets';

export default function HubPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-3 py-3">
      <HeroBanner />

      <div className="flex gap-4">
        {/* Main feed */}
        <div className="flex-1 min-w-0">
          <CollectorFeed />
        </div>

        {/* Right sidebar */}
        <div className="w-64 flex-shrink-0 space-y-3">
          <LimitedDropWidget />
          <BiddingWidget />
          <TrendingWidget />
          <TopCollectorsWidget />
        </div>
      </div>

      {/* Footer label */}
      <div className="text-center text-az-subtle text-[11px] mt-8 py-4 border-t border-az-border">
        Amazon Kidult Hub — The Ultimate Collector Marketplace
      </div>
    </div>
  );
}
