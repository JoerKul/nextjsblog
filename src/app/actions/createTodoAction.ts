import { prisma } from "@/db";
import { getSession } from "../api/auth/session";

interface TodoProps {
  title: string;
  complete: boolean;
}

export async function createTodo({ title, complete = false }: TodoProps) {
  try {
    const session = await getSession();

    if (!session?.user) {
      throw new Error("You must be logged in to create a todo");
    }

    await prisma.todo.create({ data: { title, complete } });
  } catch (error: any) {
    throw new Error(
      "Error creating blog maybe you must be logged in to create a todo"
    );
  }
}
