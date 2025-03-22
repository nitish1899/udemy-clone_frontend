import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  console.log("api call route toke", token);

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Create the response and set the secure HttpOnly cookie
  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure only in production
    path: "/",
    sameSite: "strict",
  });

  return response;
}
