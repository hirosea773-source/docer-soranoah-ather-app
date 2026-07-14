import { bigint, boolean, check, index, integer, pgTable, text, timestamp, uuid, numeric, unique } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const todos = pgTable("todos", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id").notNull(),

  title: text("title").notNull(),

  completed: boolean("completed").notNull().default(false),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const videos = pgTable("videos", {
  id: uuid("id").defaultRandom().primaryKey(),
  youtubeVideoId: text("youtube_video_id").notNull().unique(),
  title: text("title").notNull(),
  channelTitle: text("channel_title").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  publishedAt: timestamp("published_at", {
    withTimezone: true,
  }).notNull(),
  duration: text("duration").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const videoStats = pgTable(
  "video_stats",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    videoId: uuid("video_id")
      .notNull()
      .references(() => videos.id, { onDelete: "cascade" }),
    viewCount: bigint("view_count", { mode: "bigint" }).notNull(),
    likeCount: bigint("like_count", { mode: "bigint" }),
    commentCount: bigint("comment_count", { mode: "bigint" }),
    collectedAt: timestamp("collected_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("video_stats_video_id_collected_at_idx").on(
      table.videoId,
      table.collectedAt.desc(),
    ),
  ],
);

export const rankingSnapshots = pgTable(
  "ranking_snapshots",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    regionCode: text("region_code").notNull(),
    categoryId: text("category_id"),
    rankingDate: timestamp("ranking_date", {
      withTimezone: true,
    }).notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("ranking_snapshots_region_category_date_idx").on(
      table.regionCode,
      table.categoryId,
      table.rankingDate.desc(),
    ),
  ],
);

export const rankingItems = pgTable(
  "ranking_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    snapshotId: uuid("snapshot_id")
      .notNull()
      .references(() => rankingSnapshots.id, { onDelete: "cascade" }),
    videoId: uuid("video_id")
      .notNull()
      .references(() => videos.id, { onDelete: "cascade" }),
    rank: integer("rank").notNull(),
    score: numeric("score", {
      precision: 20,
      scale: 6,
    }),
  },
  (table) => [
    check(
      "ranking_items_rank_positive_check",
      sql`${table.rank} > 0`,
    ),
    unique("ranking_items_snapshot_video_unique").on(
      table.snapshotId,
      table.videoId,
    ),
    unique("ranking_items_snapshot_rank_unique").on(
      table.snapshotId,
      table.rank,
    ),
  ],
);
