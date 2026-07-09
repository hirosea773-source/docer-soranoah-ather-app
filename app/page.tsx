import VideoRankingList from "@/components/video-ranking-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50 text-gray-900">
      <header className="text-center mb-10 mt-5">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
          バズ動画ランキング
        </h1>
        <p className="text-xl text-gray-700">
          今話題の動画をランキング形式でチェック
        </p>
      </header>

      <section className="w-full max-w-6xl">
        <VideoRankingList />
      </section>
    </main>
  );
}
