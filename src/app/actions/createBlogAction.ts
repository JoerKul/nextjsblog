"use server";
import { getSession } from "../api/auth/session";
import { createBlog } from "../lib/blog";

interface InitialStateProps {
  userId: string;
  title: string;
  content: string;
}

export async function createBlogAction({
  userId,
  title,
  content,
}: InitialStateProps) {
  try {
    const session = await getSession();

    if (!session?.user) {
      throw new Error("You must be logged in to create a blog");
    }

    await createBlog(userId, title, content);
  } catch (error: any) {
    console.log(error);
    // throw new Error(
    //   "Error creating blog maybe you must be logged in to create a blog"
    // );
  }
}
