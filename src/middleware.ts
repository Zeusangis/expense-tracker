import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession, updateSession } from "./actions/auth/session";

const publicRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const session = await getSession();

  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  if (!session && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  if (session && isPublicRoute) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  const response = await updateSession(request);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
