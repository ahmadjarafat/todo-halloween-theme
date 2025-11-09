import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;
  const pathname = request.nextUrl.pathname;

  // Define protected routes
  const protectedRoutes = ["/dashboard"];
  const authRoutes = ["/auth/signin", "/auth/signup"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.includes(pathname);

  // If user is not logged in and trying to access protected route
  if (isProtectedRoute && !currentUser) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // If user is logged in and trying to access auth routes
  if (isAuthRoute && currentUser) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect root to dashboard if logged in, otherwise to signin
  if (pathname === "/") {
    if (currentUser) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
