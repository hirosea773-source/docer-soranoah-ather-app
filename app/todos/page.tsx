import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  getTodos,
  createTodo,
  deleteTodo,
  toggleTodo,
} from "@/src/actions/todo";

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
          await createTodo(title, user.id);
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

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-gray-100 p-3 rounded mb-2 dark:bg-gray-700"
            data-testid={`todo-item-${todo.id}`}
          >
            <div className="flex items-center">
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={async (checked: boolean | "indeterminate") => {
                  "use server";
                  await toggleTodo(todo.id, checked as boolean);
                }}
                className="mr-3 w-5 h-5 dark:bg-gray-600 dark:border-gray-500"
                data-testid={`todo-checkbox-${todo.id}`}
              />
              <Label
                htmlFor={`todo-${todo.id}`}
                className={`text-lg dark:text-white ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.title}
              </Label>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={async () => {
                "use server";
                await deleteTodo(todo.id);
              }}
              data-testid={`delete-todo-button-${todo.id}`}
            >
              削除
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
