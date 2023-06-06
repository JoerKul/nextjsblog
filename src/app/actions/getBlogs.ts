import { prisma } from "@/db";

export async function getBlogs() {
  return await prisma.blog.findMany();
}
