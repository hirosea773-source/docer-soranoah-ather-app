

import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {

  return (
    <header className="fixed top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950">
      <nav className="mx-auto flex h-20 w-full max-w-[1200px] items-center gap-3 px-4 sm:px-5 md:px-6">
        <Link
  href="/"
  className="flex min-w-0 shrink-0 items-center"
  aria-label="バズ動画ランキング ホーム"
>
  <Image
    src="/assets/logo-title.png"
    alt="バズ動画ランキング"
    width={480}
    height={120}
    priority
    className="h-8 w-auto max-w-[180px] object-contain sm:h-10 sm:max-w-[260px] md:h-14 md:max-w-[360px] lg:h-16 lg:max-w-[440px]"
  />
</Link>
        <div className="min-w-0 flex-1 items-center justify-end md:flex">
          <div className="hidden md:flex items-center space-x-6">
            <a
              className="text-primary font-bold border-b-2 border-primary pb-1 text-sm"
              href="#"
            >
              人気動画
            </a>
            <a
              className="text-sec-text hover:text-primary transition-colors duration-200 text-sm"
              href="#"
            >
              音楽
            </a>
            <a
              className="text-sec-text hover:text-primary transition-colors duration-200 text-sm"
              href="#"
            >
              ゲーム
            </a>
            <a
              className="text-sec-text hover:text-primary transition-colors duration-200 text-sm"
              href="#"
            >
              テック
            </a>
            <a
              className="text-sec-text hover:text-primary transition-colors duration-200 text-sm"
              href="#"
            >
              ニュース
            </a>
          </div>
          <div className="hidden md:flex items-center w-full max-w-xs relative ml-6">
            <input
              className="w-full bg-card border border-border rounded-full py-1.5 pl-4 pr-10 text-sm focus:outline-none focus:border-primary transition-colors placeholder-sec-text"
              placeholder="動画やチャンネルを検索"
              type="text"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sec-text hover:text-primary transition-colors"
            >
              <span className="text-lg">検索</span>
            </button>
          </div>
          <div className="md:hidden ml-auto">
            <button className="text-sec-text hover:text-primary transition-colors p-2">
              <span className="text-lg">検索</span>
            </button>
          </div>
        </div>

        {/* 右側のアイコン */}
        <Image
          src="/assets/logo-icon.png"
          alt="バズ動画ランキング アイコン"
          width={48}
          height={48}
          priority
          className="h-8 w-8 shrink-0 rounded-full object-contain sm:h-9 sm:w-9 md:h-10 md:w-10 ml-3"
        />
      </nav>
    </header>
  );
};


