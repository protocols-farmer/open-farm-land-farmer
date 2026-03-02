//src/proxy.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const guestOnlyRoutes = ["/auth/login", "/auth/signup"];

// RENAME THIS FROM "middleware" TO "proxy"
export function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.has("jid");
  const { pathname } = request.nextUrl;

  if (
    isAuthenticated &&
    guestOnlyRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
