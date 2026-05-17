import { db } from "@/db";
import { todos } from "@/db/schema";

import { addTodo } from "./actions";

export default async function TodosPage() {
  const data = await db
    .select()
    .from(todos);

  return (
    <main className="p-10 flex flex-col gap-4 max-w-md">
      <h1 className="text-2xl font-bold">
        Todos
      </h1>

      <form
        action={addTodo}
        className="flex flex-col gap-4"
      >
        <input
          name="title"
          className="border p-2"
          placeholder="todo"
        />

        <button
          className="bg-black text-white p-2 rounded"
        >
          Add Todo
        </button>
      </form>

      <div className="flex flex-col gap-2">
        {data?.map((todo) => (
          <div
            key={todo.id}
            className="border p-2 rounded"
          >
            {todo.title}
          </div>
        ))}
      </div>
    </main>
  );
}