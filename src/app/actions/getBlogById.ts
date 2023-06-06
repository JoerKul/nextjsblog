import { prisma } from "@/db";

export async function getBlogById(id: string) {
  return await prisma.blog.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
}
