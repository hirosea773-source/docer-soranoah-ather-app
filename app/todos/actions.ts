"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function addTodo(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;

  const { error } = await supabase
    .from("todos")
    .insert({
      title,
      user_id: user.id,
    });

  if (error) {
    throw error;
  }

  revalidatePath("/todos");
}