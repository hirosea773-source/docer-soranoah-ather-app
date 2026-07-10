import React from "react";

const SEODescription: React.FC = () => {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 md:px-6 mt-stack-xl bg-card p-8 rounded border border-border">
      <h3 className="text-xl font-bold text-text mb-4">
        今日の急上昇動画ランキングとは？
      </h3>
      <p className="text-sec-text text-sm leading-relaxed">
        バズ動画ランキングでは、SNSや動画プラットフォームで注目されている動画を毎日集計し、見やすいランキング形式で紹介しています。独自のアルゴリズムにより、再生回数だけでなく、SNSでの拡散状況や話題性を総合的に判断し、いま本当に見るべき動画を厳選してお届けします。
      </p>
    </section>
  );
};

export default SEODescription;
