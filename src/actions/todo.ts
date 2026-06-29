"use server";

import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/src/lib/db";
import { todos } from "@/src/db/schema";
import { createClient } from "@/lib/supabase/server";

// 認証されたユーザーを取得するヘルパー関数
async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized: ログインが必要です。");
  }
  return user;
}

// ログインユーザーのTodoのみ取得
export async function getTodos() {
  const user = await getAuthenticatedUser();
  return await db
    .select()
    .from(todos)
    .where(eq(todos.userId, user.id));
}

// Todoを作成する
export async function createTodo(title: string) {
  const user = await getAuthenticatedUser();
  await db.insert(todos).values({
    title,
    userId: user.id,
  });
  revalidatePath("/todos");
}

// 所有者を確認した上でTodoを削除する
export async function deleteTodo(id: string) {
  const user = await getAuthenticatedUser();
  await db
    .delete(todos)
    .where(and(eq(todos.id, id), eq(todos.userId, user.id)));
  revalidatePath("/todos");
}

// 所有者を確認した上でTodoの完了/未完了状態を切り替える
export async function toggleTodo(id: string, completed: boolean) {
  const user = await getAuthenticatedUser();
  await db
    .update(todos)
    .set({
      completed,
    })
    .where(and(eq(todos.id, id), eq(todos.userId, user.id)));
  revalidatePath("/todos");
}
