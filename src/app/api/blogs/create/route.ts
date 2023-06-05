import { prisma } from "@/db";
import { NextResponse } from "next/server";
import { getSession } from "../../auth/session";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      throw new Error("You must be logged in to create a blog");
    }
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      throw new Error("Title and content are required");
    }

    const blog = await prisma.blog.create({
      data: {
        userId: session?.user?.id,
        title,
        content,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ status: "error", message: error.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  let json_response = {
    status: "success",
    message: "Blog created successfully",
  };

  return new NextResponse(JSON.stringify(json_response), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
