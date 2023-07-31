"use server";
import { getSession } from "../api/auth/session";
import { deleteBlogById } from "../lib/blog";

export async function deleteBlogByIdAction(id: string) {
  try {
    const session = await getSession();

    if (!session?.user) {
      throw new Error("You must be logged in to delete a blog");
    }

    await deleteBlogById(id);
  } catch (error) {
    console.log(error);
    // throw new Error(
    //   "Error deleting a blog maybe you must be logged in to delete a blog"
    // );
  }
}
