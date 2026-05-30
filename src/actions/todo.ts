"use server";

import { eq } from "drizzle-orm";

import { db } from "@/src/lib/db";
import { todos } from "@/src/db/schema";

export async function getTodos() {
  return await db.select().from(todos);
}

export async function createTodo(title: string, userId: string) {
  await db.insert(todos).values({
    title,
    userId,
  });
}

export async function deleteTodo(id: string) {
  await db.delete(todos).where(eq(todos.id, id));
}

export async function toggleTodo(id: string, completed: boolean) {
  await db
    .update(todos)
    .set({
      completed,
    })
    .where(eq(todos.id, id));
}
