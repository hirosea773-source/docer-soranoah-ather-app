import SiteHeader from "@/components/site-header";
import CategoryTabs from "@/components/category-tabs";
import AdPlaceholder from "@/components/ad-placeholder";
import SiteFooter from "@/components/site-footer";
import FAQSection from "@/components/faq-section";
import SEODescription from "@/components/seo-description";
import VideoRankingList from "@/components/video-ranking-list";


const videoThumbnailPlaceholder = (
  <div className="aspect-video rounded-lg border border-neutral-800 bg-gradient-to-br from-neutral-800 to-neutral-950">
    <div className="flex h-full items-center justify-center text-sm text-neutral-500">
      VIDEO
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="bg-background text-text selection:bg-primary selection:text-white min-h-screen flex flex-col">
      <SiteHeader />

      <main className="pt-24 pb-stack-xl flex-grow">
        {/* Breadcrumb */}
        <nav className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 md:px-6 mb-6">
          <ol className="flex items-center space-x-2 text-xs text-sec-text">
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                ホーム
              </a>
            </li>
            <li>
              <span>＞</span>
            </li>
            <li className="text-text">急上昇</li>
          </ol>
        </nav>

        {/* Header Ad Placeholder */}
        <AdPlaceholder type="header" />

        {/* Hero Section */}
        <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 md:px-6 mb-stack-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-[32px] md:text-display-lg font-black text-text mb-4 leading-tight">
                今日のバズ動画ランキング
              </h1>
              <p className="text-body-lg text-sec-text max-w-2xl">
                いま話題の動画を、再生数・注目度・拡散性をもとに毎日更新。
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end text-xs text-sec-text space-y-1">
              <p>最終更新：2026年5月25日 12:00</p>
              <p>集計動画：50件</p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <CategoryTabs />

        {/* Top 3 Featured */}
        <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 md:px-6 mb-stack-xl">
          <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6">
            トップ3
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Rank 1 */}
            <div className="group relative flex flex-col cursor-pointer">
              <div className="relative aspect-[16/9] bg-card overflow-hidden rounded border border-border">
                {videoThumbnailPlaceholder}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-0 left-0 bg-primary px-3 py-1.5 flex items-center justify-center">
                  <span className="font-black text-lg text-white italic">01</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-bold text-primary uppercase mb-2 block">
                  音楽
                </span>
                <h2 className="text-lg font-bold text-text group-hover:text-primary transition-colors line-clamp-2">
                  SNSで話題の最新ショート動画まとめ
                </h2>
                <div className="mt-2 flex items-center text-sec-text text-xs">
                  <span>公式チャンネル</span>
                  <span className="mx-2">•</span>
                  <span>4,280万回再生</span>
                </div>
              </div>
            </div>
            {/* Rank 2 */}
            <div className="group relative flex flex-col cursor-pointer">
              <div className="relative aspect-[16/9] bg-card overflow-hidden rounded border border-border">
                {videoThumbnailPlaceholder}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-0 left-0 bg-primary px-3 py-1.5 flex items-center justify-center">
                  <span className="font-black text-lg text-white italic">02</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-bold text-primary uppercase mb-2 block">
                  ゲーム
                </span>
                <h2 className="text-lg font-bold text-text group-hover:text-primary transition-colors line-clamp-2">
                  ゲーム実況で注目された名シーン
                </h2>
                <div className="mt-2 flex items-center text-sec-text text-xs">
                  <span>トレンド編集部</span>
                  <span className="mx-2">•</span>
                  <span>1,920万回再生</span>
                </div>
              </div>
            </div>
            {/* Rank 3 */}
            <div className="group relative flex flex-col cursor-pointer">
              <div className="relative aspect-[16/9] bg-card overflow-hidden rounded border border-border">
                {videoThumbnailPlaceholder}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-0 left-0 bg-primary px-3 py-1.5 flex items-center justify-center">
                  <span className="font-black text-lg text-white italic">03</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-bold text-primary uppercase mb-2 block">
                  テック
                </span>
                <h2 className="text-lg font-bold text-text group-hover:text-primary transition-colors line-clamp-2">
                  AI時代の動画クリエイター戦略
                </h2>
                <div className="mt-2 flex items-center text-sec-text text-xs">
                  <span>バズ研究所</span>
                  <span className="mx-2">•</span>
                  <span>860万回再生</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Feed Grid */}
        <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 md:px-6 flex flex-col lg:flex-row gap-8">
          {/* Ranking List */}
          <div className="flex-grow">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6">
              ランキング一覧
            </h3>
            <VideoRankingList />
            <div className="pt-8 text-center">
              <button className="text-sm font-bold text-primary uppercase border border-primary px-8 py-2 hover:bg-primary hover:text-white transition-all rounded-full">
                もっと見る
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[320px] flex-shrink-0">
            <div className="sticky top-24 space-y-stack-lg">
              {/* Sidebar Ad Placeholder */}
              <AdPlaceholder type="sidebar" />

              {/* Popular Categories */}
              <div>
                <h3 className="text-sm font-bold text-text uppercase tracking-widest mb-6">
                  人気カテゴリ
                </h3>
                <div className="space-y-4">
                  <a className="flex justify-between items-center group" href="#">
                    <span className="text-sm text-sec-text group-hover:text-primary transition-colors">
                      ショート動画
                    </span>
                    <span className="text-[10px] text-sec-text/60">12k</span>
                  </a>
                  <a className="flex justify-between items-center group" href="#">
                    <span className="text-sm text-sec-text group-hover:text-primary transition-colors">
                      音楽トレンド
                    </span>
                    <span className="text-[10px] text-sec-text/60">8k</span>
                  </a>
                  <a className="flex justify-between items-center group" href="#">
                    <span className="text-sm text-sec-text group-hover:text-primary transition-colors">
                      AI研究
                    </span>
                    <span className="text-[10px] text-sec-text/60">24k</span>
                  </a>
                  <a className="flex justify-between items-center group" href="#">
                    <span className="text-sm text-sec-text group-hover:text-primary transition-colors">
                      スポーツ名場面
                    </span>
                    <span className="text-[10px] text-sec-text/60">15k</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* SEO Description Section */}
        <SEODescription />
      </main>

      {/* Footer Ad Placeholder */}
      <AdPlaceholder type="footer" />

      <SiteFooter />
    </div>
  );
}
