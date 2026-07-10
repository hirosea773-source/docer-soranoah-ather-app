import React from "react";

// 動画データの型定義
interface Video {
  id: string;
  rank: number;
  title: string;
  channelName: string;
  category: string;
  views: number;
  youtubeUrl: string;
}

// ダミーデータ (4位と5位のみ使用)
const dummyVideos: Video[] = [
  {
    id: "4",
    rank: 4,
    title: "いま急上昇中の音楽トレンド",
    channelName: "動画ニュース",
    category: "音楽",
    views: 5400000,
    youtubeUrl: "#",
  },
  {
    id: "5",
    rank: 5,
    title: "国内でバズったニュース動画",
    channelName: "クリエイター速報",
    category: "ニュース",
    views: 3200000,
    youtubeUrl: "#",
  },
];

const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(0)}K`; // 1000以上の場合は小数点以下なし
  }
  return views.toString();
};

const VideoRankingList: React.FC = () => {
  const videoThumbnailPlaceholder = (
    <div className="aspect-video rounded border border-neutral-800 bg-gradient-to-br from-neutral-800 to-neutral-950 flex-shrink-0">
      <div className="flex h-full items-center justify-center text-xs text-neutral-500">
        VIDEO
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {dummyVideos.map((video) => (
        <div
          key={video.id}
          className="group flex items-center gap-4 p-3 bg-card/50 hover:bg-card transition-all cursor-pointer rounded border border-transparent hover:border-border"
        >
          <span className="font-black text-[32px] text-border w-12 text-center transition-colors group-hover:text-primary/40 italic">
            {String(video.rank).padStart(2, "0")}
          </span>
          <div className="w-32 h-20 md:w-40 md:h-24 bg-card flex-shrink-0 overflow-hidden rounded border border-border">
            {videoThumbnailPlaceholder}
          </div>
          <div className="flex-grow">
            <h4 className="text-md font-bold text-text group-hover:text-primary transition-colors mb-1 line-clamp-1">
              {video.title}
            </h4>
            <p className="text-xs text-sec-text uppercase flex items-center">
              <span>{video.channelName}</span> <span className="mx-2">•</span>
              <span>{formatViews(video.views)}回再生</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoRankingList;
