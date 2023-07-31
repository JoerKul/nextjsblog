"use server";
import { getBlogs } from "../lib/blog";

export async function getBlogsAction() {
  return await getBlogs();
}
