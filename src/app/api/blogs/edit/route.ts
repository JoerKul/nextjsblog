import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("GET request", request);

  let json_response = {
    status: "success",
    data: {
      user: {
        id: 1,
        name: "J Smith",
        email: "hello@example.com",
      },
    },
  };

  return new NextResponse(JSON.stringify(json_response), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
