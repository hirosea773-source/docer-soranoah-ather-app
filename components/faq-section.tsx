import React from "react";

const FAQSection: React.FC = () => {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 md:px-6 mt-stack-xl border-t border-border pt-stack-lg">
      <h3 className="text-xl font-bold text-text mb-8">よくある質問</h3>
      <div className="space-y-6 max-w-3xl">
        <div>
          <p className="font-bold text-text mb-2 flex items-start">
            <span className="text-primary mr-2">Q.</span>ランキングはどのように決まりますか？
          </p>
          <p className="text-sec-text text-sm ml-6 flex items-start">
            <span className="mr-2">A.</span>再生数、注目度、拡散性などをもとに独自に集計しています。
          </p>
        </div>
        <div>
          <p className="font-bold text-text mb-2 flex items-start">
            <span className="text-primary mr-2">Q.</span>どのくらいの頻度で更新されますか？
          </p>
          <p className="text-sec-text text-sm ml-6 flex items-start">
            <span className="mr-2">A.</span>毎日更新を想定しています。
          </p>
        </div>
        <div>
          <p className="font-bold text-text mb-2 flex items-start">
            <span className="text-primary mr-2">Q.</span>掲載動画はどこから取得していますか？
          </p>
          <p className="text-sec-text text-sm ml-6 flex items-start">
            <span className="mr-2">A.</span>公開されている動画情報をもとに掲載します。
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
