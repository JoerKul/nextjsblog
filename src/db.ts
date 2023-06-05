import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma?: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "info", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export async function getBlogs() {
  return await prisma.blog.findMany();
}

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
