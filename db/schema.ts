import {
  pgTable,
  text,
  timestamp,
  uuid,
  bigint,
} from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),

  userId: uuid("user_id").notNull(),

  title: text("title").notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});