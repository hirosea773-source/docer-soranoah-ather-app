import { pgTable, foreignKey, unique, uuid, text, timestamp, pgPolicy, bigint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const profiles = pgTable("profiles", {
	id: uuid().primaryKey().notNull(),
	username: text(),
	displayName: text("display_name"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.id],
			foreignColumns: [users.id],
			name: "profiles_id_fkey"
		}).onDelete("cascade"),
	unique("profiles_username_key").on(table.username),
]);

export const todos = pgTable("todos", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "todos_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	userId: uuid("user_id").notNull(),
	title: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "todos_user_id_fkey"
		}).onDelete("cascade"),
	pgPolicy("Users can delete own todos", { as: "permissive", for: "delete", to: ["authenticated"], using: sql`(auth.uid() = user_id)` }),
	pgPolicy("Users can update own todos", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Users can insert own todos", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Users can read own todos", { as: "permissive", for: "select", to: ["authenticated"] }),
	pgPolicy("users can insert own todos", { as: "permissive", for: "insert", to: ["public"] }),
	pgPolicy("users can view own todos", { as: "permissive", for: "select", to: ["public"] }),
	pgPolicy("Users can view own todos", { as: "permissive", for: "select", to: ["public"] }),
]);
