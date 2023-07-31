"use server";
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

export async function createBlog(
  userId: string,
  title: string,
  content: string
) {
  try {
    await prisma.blog.create({
      data: {
        userId: userId,
        title: title,
        content: content,
      },
    });
  } catch (error: any) {
    console.log(error);
    // throw new Error(
    //   "Error creating blog maybe you must be logged in to create a blog"
    // );
  }
}

export async function deleteBlogById(blogId: string) {
  return await prisma.blog.delete({
    where: {
      id: blogId,
    },
  });
}

export async function getBlogs() {
  return await prisma.blog.findMany();
}
