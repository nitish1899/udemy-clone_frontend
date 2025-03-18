// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const token = searchParams.get("token");

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Set token in a secure, HttpOnly cookie
//   const response = NextResponse.redirect(new URL("/dashboard", request.url));
//   response.cookies.set({
//     name: "access_token",
//     value: token,
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production", // Secure in production
//     path: "/",
//     sameSite: "Strict",
//   });

//   return response;
// }

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
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
