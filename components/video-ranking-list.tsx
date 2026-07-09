
import React from 'react';

// 動画データの型定義
interface Video {
  id: string;
  rank: number;
  title: string;
  channelName: string;
  category: string;
  views: number;
  publishedAt: string; // ISO 8601形式の文字列を想定
  youtubeUrl: string;
}

// ダミーデータ
const dummyVideos: Video[] = [
  {
    id: '1',
    rank: 1,
    title: '【感動】猫が助けた意外なものとは？',
    channelName: '癒やしのにゃんこチャンネル',
    category: 'ペット',
    views: 1234567,
    publishedAt: '2023-10-26T10:00:00Z',
    youtubeUrl: 'https://www.youtube.com/',
  },
  {
    id: '2',
    rank: 2,
    title: '誰でも簡単！5分で作れる絶品パスタ',
    channelName: 'お料理マスター',
    category: '料理',
    views: 987654,
    publishedAt: '2023-10-25T15:30:00Z',
    youtubeUrl: 'https://www.youtube.com/',
  },
  {
    id: '3',
    rank: 3,
    title: '【解説】AIの最新トレンドと未来予測',
    channelName: 'テクノロジーの世界',
    category: 'テクノロジー',
    views: 876543,
    publishedAt: '2023-10-24T09:00:00Z',
    youtubeUrl: 'https://www.youtube.com/',
  },
  {
    id: '4',
    rank: 4,
    title: '絶景！世界の秘境を巡る旅',
    channelName: 'トラベルVlog',
    category: '旅行',
    views: 765432,
    publishedAt: '2023-10-23T18:45:00Z',
    youtubeUrl: 'https://www.youtube.com/',
  },
  {
    id: '5',
    rank: 5,
    title: '【筋トレ】自宅でできる全身ワークアウト',
    channelName: 'フィットネスJAPAN',
    category: '健康',
    views: 654321,
    publishedAt: '2023-10-22T12:00:00Z',
    youtubeUrl: 'https://www.youtube.com/',
  },
];

const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

const VideoRankingList: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyVideos.map((video) => (
          <div key={video.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5">
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mr-3">#{video.rank}</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{video.title}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-medium">チャンネル:</span> {video.channelName}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-medium">カテゴリ:</span> {video.category}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-medium">再生回数:</span> {formatViews(video.views)}回
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <span className="font-medium">投稿日:</span> {new Date(video.publishedAt).toLocaleDateString()}
              </p>
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                YouTubeで見る
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoRankingList;
