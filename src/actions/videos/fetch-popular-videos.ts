"use server";

import { sql } from "drizzle-orm";
import { db } from "@/src/lib/db/index";
import { videos } from "@/src/db/schema";
import { getMostPopularVideos } from "@/src/lib/youtube/client";
import type { YouTubeVideoItem } from "@/src/lib/youtube/client";
import { createClient } from "@/lib/supabase/server";

// Server Actionの戻り値型
type FetchAndSavePopularVideosResult =
  | {
      success: true;
      processedCount: number;
      skippedCount: number;
    }
  | {
      success: false;
      processedCount: 0;
      skippedCount: number;
      error: string;
    };

type VideoInsert = typeof videos.$inferInsert;

/**
 * YouTubeのサムネイルURLを優先順位に基づいて選択するヘルパー関数
 * @param thumbnails YouTube APIのサムネイルオブジェクト
 * @returns 選択されたサムネイルURL、または空文字列
 */
function selectThumbnailUrl(thumbnails: YouTubeVideoItem["snippet"]["thumbnails"]): string {
  const thumbnailPriorities: (keyof typeof thumbnails)[] = [
    "maxres",
    "standard",
    "high",
    "medium",
    "default",
  ];

  for (const key of thumbnailPriorities) {
    const thumbnail = thumbnails[key];
    if (thumbnail?.url && thumbnail.url.trim() !== "") {
      return thumbnail.url.trim();
    }
  }
  return "";
}

/**
 * YouTube Data APIから日本の人気動画を取得し、動画の基本情報だけをvideosテーブルへupsertするServer Action
 * @returns 処理結果 (成功/失敗、処理件数、スキップ件数、エラーメッセージ)
 */
export async function fetchAndSavePopularVideos(): Promise<FetchAndSavePopularVideosResult> {
  let skippedCount = 0;
  let youtubeResponseItems: YouTubeVideoItem[] = [];

  try {
    // 認証チェック
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        processedCount: 0,
        skippedCount: 0,
        error: "この操作を実行するにはログインが必要です。",
      };
    }
  } catch {
    return {
      success: false,
      processedCount: 0,
      skippedCount: 0,
      error: "認証状態を確認できませんでした。",
    };
  }

  try {
    // YouTube APIから人気動画を取得
    const youtubeResponse = await getMostPopularVideos({
      regionCode: "JP",
      maxResults: 25,
    });
    youtubeResponseItems = youtubeResponse.items;
  } catch {
    return {
      success: false,
      processedCount: 0,
      skippedCount: 0,
      error: "人気動画の取得に失敗しました。",
    };
  }

  const videosToUpsert = youtubeResponseItems
    .map<VideoInsert | null>((item) => {
      // 必須フィールドのバリデーションとトリミング
      const youtubeVideoId = item.id?.trim();
      const title = item.snippet.title?.trim();
      const channelTitle = item.snippet.channelTitle?.trim();
      const duration = item.contentDetails.duration?.trim();

      // publishedAtの変換とバリデーション
      const publishedAtDate = new Date(item.snippet.publishedAt);
      if (Number.isNaN(publishedAtDate.getTime())) {
        skippedCount++;
        return null; // 不正な日付はスキップ
      }

      // サムネイルURLの選択とバリデーション
      const thumbnailUrl = selectThumbnailUrl(item.snippet.thumbnails);
      if (!thumbnailUrl) {
        skippedCount++;
        return null; // 有効なサムネイルURLがない場合はスキップ
      }

      // その他の必須フィールドの確認
      if (
        !youtubeVideoId ||
        !title ||
        !channelTitle ||
        !duration
      ) {
        skippedCount++;
        return null; // 必須フィールドのいずれかが無効な場合はスキップ
      }

      return {
        youtubeVideoId: youtubeVideoId,
        title: title,
        channelTitle: channelTitle,
        thumbnailUrl: thumbnailUrl,
        publishedAt: publishedAtDate,
        duration: duration,
      };
    })
    .filter((video): video is VideoInsert => video !== null); // null を型安全に除外

  const processedCount = videosToUpsert.length;

  if (processedCount === 0) {
    return {
      success: false,
      processedCount: 0,
      skippedCount: skippedCount,
      error: "保存可能な動画情報がありませんでした。",
    };
  }

  try {
    // 動画データを一括upsert
    await db
      .insert(videos)
      .values(videosToUpsert)
      .onConflictDoUpdate({
        target: videos.youtubeVideoId,
        set: {
          title: sql`excluded.title`,
          channelTitle: sql`excluded.channel_title`,
          thumbnailUrl: sql`excluded.thumbnail_url`,
          publishedAt: sql`excluded.published_at`,
          duration: sql`excluded.duration`,
          updatedAt: sql`now()`, // 更新時のみ現在時刻をセット
        },
      });
  } catch {
    return {
      success: false,
      processedCount: 0,
      skippedCount: skippedCount,
      error: "動画情報の保存に失敗しました。",
    };
  }

  return {
    success: true,
    processedCount: processedCount,
    skippedCount: skippedCount,
  };
}
