import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

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
