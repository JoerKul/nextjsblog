import { verify } from "jsonwebtoken";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = await getToken({
    req: request,
    raw: true,
  });

  try {
    verify(token, process.env.NEXTAUTH_SECRET!);
  } catch (error: any) {
    console.error(error + process.env.NEXTAUTH_SECRET!);
    let json_response = {
      status: "error",
      message: "Invalid token",
    };
    return new NextResponse(JSON.stringify(json_response), { status: 500 });
  }
  let json_response = {
    status: "success",
    data: {
      user: {
        id: 1,
        name: "J Smith",
        email: "hello@example.com",
      },
      token,
    },
  };

  return new NextResponse(JSON.stringify(json_response), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
