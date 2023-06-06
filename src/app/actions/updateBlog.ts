import { prisma } from "@/db";
import { getSession } from "../api/auth/session";

interface BlogProps {
  blogId: string;
  title: string;
  content: string;
}

export async function updateBlog({ blogId, title, content }: BlogProps) {
  try {
    const session = await getSession();

    console.log(session);
    console.log(blogId);

    // if (!session?.user) {
    //   throw new Error("You must be logged in to update a blog");
    // }

    await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        title: title,
        content: content,
      },
    });
  } catch (error: any) {
    throw new Error(
      "Error creating blog maybe you must be logged in to update a blog"
    );
  }
}
