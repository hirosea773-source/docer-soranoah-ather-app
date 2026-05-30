import { relations } from "drizzle-orm/relations";
import { usersInAuth, profiles, todos } from "./schema";

export const profilesRelations = relations(profiles, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [profiles.id],
		references: [usersInAuth.id]
	}),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	profiles: many(profiles),
	todos: many(todos),
}));

export const todosRelations = relations(todos, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [todos.userId],
		references: [usersInAuth.id]
	}),
}));