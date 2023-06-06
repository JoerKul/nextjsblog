import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../auth/session";
import { prisma } from "@/db";

export async function GET(request: NextRequest) {
  try {
    // const session = await getSession();

    // if (!session) {
    //   return new NextResponse(null, { status: 401 });
    // }

    const blogs = await prisma.blog.findMany();

    let json_response = {
      status: "success",
      data: {
        blogs,
      },
    };

    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error(error);
    return new NextResponse(null, { status: 500 });
  }
}
