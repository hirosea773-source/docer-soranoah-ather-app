"use client";

import { useTransition, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { deleteTodo, toggleTodo } from "@/src/actions/todo";
import { InferSelectModel } from "drizzle-orm";
import { todos as todosSchema } from "@/src/db/schema";

// DrizzleのスキーマからTodoの型を推論して定義
type Todo = InferSelectModel<typeof todosSchema>;

interface TodoListProps {
  initialTodos: Todo[];
}

export function TodoList({ initialTodos }: TodoListProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // トグル処理
  const handleToggle = (id: string, completed: boolean) => {
    setError(null);
    startTransition(async () => {
      try {
        await toggleTodo(id, completed);
      } catch (err) {
        console.error(err);
        setError("Todoの更新に失敗しました。時間をおいて再度お試しください。");
      }
    });
  };

  // 削除処理
  const handleDelete = (id: string) => {
    setError(null);
    startTransition(async () => {
      try {
        await deleteTodo(id);
      } catch (err) {
        console.error(err);
        setError("Todoの削除に失敗しました。時間をおいて再度お試しください。");
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* エラー状態のUI */}
      {error && (
        <div
          className="p-3 mb-4 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-gray-800 dark:text-red-400 border border-red-200 dark:border-red-800 flex justify-between items-center"
          role="alert"
        >
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-800 dark:text-red-400 hover:underline font-bold text-xs ml-2"
          >
            閉じる
          </button>
        </div>
      )}

      {/* Empty状態のUI */}
      {initialTodos.length === 0 ? (
        <div className="text-center py-12 px-4 border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Todoがありません。
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            上のフォームから新しいTodoを追加してみましょう！
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {initialTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between bg-gray-100 p-3 rounded dark:bg-gray-700 border border-transparent transition-all ${
                isPending ? "opacity-70 pointer-events-none" : ""
              }`}
              data-testid={`todo-item-${todo.id}`}
            >
              <div className="flex items-center flex-1 min-w-0 mr-4">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  disabled={isPending}
                  onCheckedChange={(checked) => {
                    console.log("checkbox changed:", {
                      id: todo.id,
                      checked,
                      nextCompleted: checked === true,
                    });
                    handleToggle(todo.id, checked === true);
                  }}
                  onClick={() => console.log("Checkbox clicked!")}
                  onKeyDown={(e) => console.log("Checkbox keydown:", e.key)}
                  onKeyUp={(e) => console.log("Checkbox keyup:", e.key)}
                  className="mr-3 w-5 h-5 dark:bg-gray-600 dark:border-gray-500"
                  data-testid={`todo-checkbox-${todo.id}`}
                />
                <Label
                  htmlFor={`todo-${todo.id}`}
                  className={`text-lg dark:text-white truncate cursor-pointer select-none ${
                    todo.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-gray-900"
                  }`}
                >
                  {todo.title}
                </Label>
              </div>
              <Button
                variant="destructive"
                size="sm"
                disabled={isPending}
                onClick={() => handleDelete(todo.id)}
                data-testid={`delete-todo-button-${todo.id}`}
              >
                削除
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
