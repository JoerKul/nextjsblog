"use server";
import { getBlogById } from "../lib/blog";

export async function getBlogByIdAction(id: string) {
  return await getBlogById(id);
}
