import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTodos, createTodo } from "@/src/actions/todo";
import { TodoList } from "@/components/todo-list";

export default async function TodosPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const todos = await getTodos();

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Todo リスト</h1>

      <form
        action={async (formData: FormData) => {
          "use server";
          const title = formData.get("title") as string;
          if (!title || title.trim() === "") return;
          await createTodo(title);
        }}
        className="flex gap-2 mb-4"
      >
        <Input
          type="text"
          name="title"
          placeholder="新しいTodo"
          className="flex-grow dark:bg-gray-700 dark:text-white dark:border-gray-600"
          data-testid="new-todo-input"
          required
        />
        <Button type="submit" data-testid="add-todo-button">
          追加
        </Button>
      </form>

      <TodoList initialTodos={todos} />
    </div>
  );
}
