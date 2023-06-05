import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import { getSession } from "./api/auth/session";
import Link from "next/link";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  const todos = await getTodos();
  const session = await getSession();

  return (
    <div className="flex gap-40 mx-auto">
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
      {session && (
        <div>
          <Link
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            href="/new"
          >
            New
          </Link>
        </div>
      )}
    </div>
  );
}
