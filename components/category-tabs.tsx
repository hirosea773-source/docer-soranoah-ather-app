import React from "react";

const CategoryTabs: React.FC = () => {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 md:px-6 mb-stack-lg">
      <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2">
        <button className="px-6 py-2 bg-primary text-white text-sm font-medium rounded-full whitespace-nowrap">
          すべて
        </button>
        <button className="px-6 py-2 bg-card text-text text-sm font-medium rounded-full whitespace-nowrap border border-border hover:border-primary transition-colors">
          音楽
        </button>
        <button className="px-6 py-2 bg-card text-text text-sm font-medium rounded-full whitespace-nowrap border border-border hover:border-primary transition-colors">
          ゲーム
        </button>
        <button className="px-6 py-2 bg-card text-text text-sm font-medium rounded-full whitespace-nowrap border border-border hover:border-primary transition-colors">
          テック
        </button>
        <button className="px-6 py-2 bg-card text-text text-sm font-medium rounded-full whitespace-nowrap border border-border hover:border-primary transition-colors">
          ニュース
        </button>
        <button className="px-6 py-2 bg-card text-text text-sm font-medium rounded-full whitespace-nowrap border border-border hover:border-primary transition-colors">
          エンタメ
        </button>
        <button className="px-6 py-2 bg-card text-text text-sm font-medium rounded-full whitespace-nowrap border border-border hover:border-primary transition-colors">
          スポーツ
        </button>
      </div>
    </section>
  );
};

export default CategoryTabs;
