import { prisma } from "@/db";
import { getSession } from "../api/auth/session";

interface InitialStateProps {
  userId: string;
  title: string;
  content: string;
}

export async function createBlog({
  userId,
  title,
  content,
}: InitialStateProps) {
  try {
    const session = await getSession();

    if (!session?.user) {
      throw new Error("You must be logged in to create a blog");
    }

    await prisma.blog.create({
      data: {
        userId: userId,
        title: title,
        content: content,
      },
    });
  } catch (error: any) {
    throw new Error(
      "Error creating blog maybe you must be logged in to create a blog"
    );
  }
}
