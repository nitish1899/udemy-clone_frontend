import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token =
    req.cookies.get("next-auth.session-token")?.value || // Development
    req.cookies.get("__Secure-next-auth.session-token")?.value; // Production
  console.log("Toke", token);

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

// Protects all dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
