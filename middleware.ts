import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  const protectedRoutes = ["/notes", "/profile", "/settings", "/chat"];

  const isProtected = protectedRoutes.find((item) =>
    url.pathname.startsWith(item)
  );

  // Protect notes, profile, chat and settings routes
  if (!sessionCookie && isProtected) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Redirect signed-in users away from sign-in page
  if (
    sessionCookie &&
    (url.pathname === "/sign-in" || url.pathname === "/sign-in")
  ) {
    return NextResponse.redirect(new URL("/notes", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
