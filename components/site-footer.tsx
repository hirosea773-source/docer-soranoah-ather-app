import React from "react";

const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-surface w-full border-t border-border">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 md:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-border pb-8 mb-8">
          <div className="font-black text-2xl text-primary">
            バズ動画ランキング
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              className="text-xs text-sec-text hover:text-primary transition-colors"
              href="#"
            >
              運営情報
            </a>
            <a
              className="text-xs text-sec-text hover:text-primary transition-colors"
              href="#"
            >
              利用規約
            </a>
            <a
              className="text-xs text-sec-text hover:text-primary transition-colors"
              href="#"
            >
              プライバシーポリシー
            </a>
            <a
              className="text-xs text-sec-text hover:text-primary transition-colors"
              href="#"
            >
              お問い合わせ
            </a>
            <a
              className="text-xs text-sec-text hover:text-primary transition-colors"
              href="#"
            >
              広告掲載
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-sec-text/60">
          <p className="text-sm">© 2026 バズ動画ランキング</p>
          <p>日本最大級のバズ動画トレンドサイト</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
