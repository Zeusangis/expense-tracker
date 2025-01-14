import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected, /api/user)
  const path = request.nextUrl.pathname;

  // Define which routes are public (accessible without authentication)
  const isPublicPath = path === "/login" || path === "/register";

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value || "";

  // If the path is not public and there's no token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is logged in and tries to access login or register page, redirect to home
  if (token && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Continue with the request if none of the above conditions are met
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
