import { bigint, boolean, index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

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
