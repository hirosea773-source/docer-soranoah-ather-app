import "server-only";

const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3/videos";
const YOUTUBE_API_TIMEOUT_MS = 10000; // 10秒

// =========================================================================
// 型ガード用の共通関数
// =========================================================================
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

// =========================================================================
// YouTube API Response Types
// =========================================================================

// YouTube APIの共通的なPageInfo型
export type YouTubePageInfo = {
  totalResults: number;
  resultsPerPage: number;
};

// YouTube APIの共通的なThumbnail型
export type YouTubeThumbnail = {
  url: string;
  width?: number;
  height?: number;
};

// YouTube APIのThumbnail群型
export type YouTubeThumbnails = {
  default?: YouTubeThumbnail;
  medium?: YouTubeThumbnail;
  high?: YouTubeThumbnail;
  standard?: YouTubeThumbnail;
  maxres?: YouTubeThumbnail;
};

// YouTube APIのSnippet型 (必須フィールドを明確に)
export type YouTubeVideoSnippet = {
  publishedAt: string; // ISO 8601フォーマット
  channelId: string;
  title: string;
  description: string;
  thumbnails: YouTubeThumbnails;
  channelTitle: string;
  categoryId: string;
  liveBroadcastContent: string;
  tags?: string[];
  defaultLanguage?: string;
  localized?: {
    title: string;
    description: string;
  };
  defaultAudioLanguage?: string;
};

// YouTube APIのStatistics型 (欠損する可能性を考慮)
export type YouTubeVideoStatistics = {
  viewCount?: string; // stringとして扱う
  likeCount?: string; // stringとして扱う、欠損の可能性あり
  commentCount?: string; // stringとして扱う、欠損の可能性あり
};

// YouTube APIのContentDetails型 (durationのみ)
export type YouTubeVideoContentDetails = {
  duration: string; // ISO 8601フォーマット (PT1H2M3Sなど)
};

// YouTube APIのVideoItem型
export type YouTubeVideoItem = {
  id: string; // YouTube Video ID
  snippet: YouTubeVideoSnippet;
  statistics?: YouTubeVideoStatistics; // statistics自体が欠損する可能性あり
  contentDetails: YouTubeVideoContentDetails;
};

// getMostPopularVideos関数の戻り値型
export type MostPopularVideosResponse = {
  items: YouTubeVideoItem[];
  nextPageToken?: string;
  pageInfo: YouTubePageInfo; // pageInfoを必須に戻す
};

// =========================================================================
// Type Guards for YouTube API Response
// =========================================================================

function isValidYouTubeThumbnail(value: unknown): value is YouTubeThumbnail {
  return (
    isObject(value) &&
    isString(value.url) &&
    (!("width" in value) || isFiniteNumber(value.width)) &&
    (!("height" in value) || isFiniteNumber(value.height))
  );
}

function isValidYouTubeThumbnails(value: unknown): value is YouTubeThumbnails {
  return (
    isObject(value) &&
    (!("default" in value) || isValidYouTubeThumbnail(value.default)) &&
    (!("medium" in value) || isValidYouTubeThumbnail(value.medium)) &&
    (!("high" in value) || isValidYouTubeThumbnail(value.high)) &&
    (!("standard" in value) || isValidYouTubeThumbnail(value.standard)) &&
    (!("maxres" in value) || isValidYouTubeThumbnail(value.maxres))
  );
}

function isValidYouTubeVideoSnippet(value: unknown): value is YouTubeVideoSnippet {
  return (
    isObject(value) &&
    isString(value.publishedAt) &&
    isString(value.channelId) &&
    isString(value.title) &&
    isString(value.description) &&
    isValidYouTubeThumbnails(value.thumbnails) &&
    isString(value.channelTitle) &&
    isString(value.categoryId) &&
    isString(value.liveBroadcastContent)
    // tags, defaultLanguage, localized, defaultAudioLanguageはオプショナルなので検証しない
  );
}

function isValidYouTubeVideoStatistics(value: unknown): value is YouTubeVideoStatistics {
  return (
    isObject(value) &&
    (!("viewCount" in value) || isString(value.viewCount)) &&
    (!("likeCount" in value) || isString(value.likeCount)) &&
    (!("commentCount" in value) || isString(value.commentCount))
  );
}

function isValidYouTubeVideoContentDetails(value: unknown): value is YouTubeVideoContentDetails {
  return isObject(value) && isString(value.duration);
}

function isValidYouTubeVideoItem(value: unknown): value is YouTubeVideoItem {
  return (
    isObject(value) &&
    isString(value.id) &&
    isValidYouTubeVideoSnippet(value.snippet) &&
    (!("statistics" in value) || isValidYouTubeVideoStatistics(value.statistics)) && // statistics自体はオプショナル
    isValidYouTubeVideoContentDetails(value.contentDetails)
  );
}

function isValidYouTubePageInfo(value: unknown): value is YouTubePageInfo {
  return (
    isObject(value) &&
    isFiniteNumber(value.totalResults) &&
    isFiniteNumber(value.resultsPerPage)
  );
}

// =========================================================================
// API Client
// =========================================================================

type GetMostPopularVideosOptions = {
  regionCode?: string; // 既定値: "JP"
  categoryId?: string; // 任意指定
  maxResults?: number; // 既定値: 25, 許容範囲: 1-50
  pageToken?: string; // nextPageTokenとして使用
};

export async function getMostPopularVideos(
  options?: GetMostPopularVideosOptions,
): Promise<MostPopularVideosResponse> {
  const youtubeApiKey = process.env.YOUTUBE_API_KEY?.trim();

  // セキュリティ対策: APIキーの存在チェックと秘密情報の非表示
  if (!youtubeApiKey) {
    throw new Error("YouTube APIキーが設定されていません。");
  }

  // maxResultsの入力検証
  const maxResults = options?.maxResults ?? 25;
  if (!Number.isInteger(maxResults) || maxResults < 1 || maxResults > 50) {
    throw new Error(
      `maxResultsは1から50の間の整数である必要があります。現在の値: ${maxResults}`,
    );
  }

  const searchParams = new URLSearchParams({
    part: "snippet,statistics,contentDetails",
    chart: "mostPopular",
    maxResults: String(maxResults),
    key: youtubeApiKey,
  });

  // regionCodeのtrimとデフォルト値設定
  const regionCode = options?.regionCode?.trim();
  searchParams.append("regionCode", regionCode || "JP");

  if (options?.categoryId?.trim()) {
    searchParams.append("videoCategoryId", options.categoryId.trim());
  }
  if (options?.pageToken?.trim()) {
    searchParams.append("pageToken", options.pageToken.trim());
  }

  const url = `${YOUTUBE_API_BASE_URL}?${searchParams.toString()}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), YOUTUBE_API_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });

    // HTTPエラー処理
    if (!response.ok) {
      const errorBody: unknown = await response.json().catch(() => null); // JSON解析エラーは無視
      let errorMessage = `YouTube APIからHTTPエラーが返されました。ステータス: ${response.status}`;

      if (
        isObject(errorBody) &&
        "error" in errorBody &&
        isObject(errorBody.error) &&
        "message" in errorBody.error &&
        isString(errorBody.error.message)
      ) {
        // YouTube APIのエラーメッセージは詳細すぎるため、一般的なメッセージに変換
        errorMessage += "。詳細はAPIプロバイダーを確認してください。";
      } else {
        errorMessage += "。エラーレスポンスボディを解析できませんでした。";
      }
      throw new Error(errorMessage);
    }

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      // 正常HTTPレスポンスだがJSON解析に失敗した場合
      throw new Error("YouTube APIのレスポンスを解析できませんでした。");
    }

    // レスポンスの基本的な構造検証
    if (!isObject(data)) {
      throw new Error("YouTube APIの不正なレスポンス形式です: レスポンスがオブジェクトではありません。");
    }

    // itemsの検証
    if ("items" in data && !Array.isArray(data.items)) {
      throw new Error("YouTube APIの不正なレスポンス形式です: itemsが配列ではありません。");
    }
    const items: YouTubeVideoItem[] = [];
    if (Array.isArray(data.items)) {
      for (const item of data.items) {
        if (!isValidYouTubeVideoItem(item)) {
          throw new Error("YouTube APIの不正なレスポンス形式です: 不正なビデオアイテムが含まれています。");
        }
        items.push(item);
      }
    }
    // itemsが undefined の場合は、空の items 配列が使用される

    // pageInfoの検証 (必須)
    if (!("pageInfo" in data) || !isValidYouTubePageInfo(data.pageInfo)) {
      throw new Error("YouTube APIの不正なレスポンス形式です: pageInfoが不正または存在しません。");
    }
    const pageInfo: YouTubePageInfo = data.pageInfo;

    // nextPageTokenの検証
    let nextPageToken: string | undefined = undefined;
    if ("nextPageToken" in data) {
      if (isString(data.nextPageToken)) {
        nextPageToken = data.nextPageToken;
      } else {
        throw new Error("YouTube APIの不正なレスポンス形式です: nextPageTokenが文字列ではありません。");
      }
    }

    return {
      items,
      nextPageToken,
      pageInfo,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("YouTube APIへのリクエストがタイムアウトしました。");
      }
      // 自前で生成したアプリケーションエラーはその意味を維持して再スロー
      if (
        error.message.includes("YouTube APIキーが設定されていません。") ||
        error.message.includes("maxResultsは") ||
        error.message.includes("YouTube APIからHTTPエラーが返されました。") ||
        error.message.includes("YouTube APIのレスポンスを解析できませんでした。") ||
        error.message.includes("YouTube APIの不正なレスポンス形式です:")
      ) {
        throw error;
      }
      // fetch由来のTypeErrorはネットワークエラーへ変換
      if (error.name === "TypeError") { // 'Failed to fetch' などのエラーは通常 TypeError
        throw new Error("YouTube APIへの接続中にネットワークエラーが発生しました。");
      }
    }
    // その他の予期せぬエラー
    throw new Error("予期せぬエラーが発生しました。");
  } finally {
    clearTimeout(timeoutId);
  }
}
