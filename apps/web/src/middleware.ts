import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

// Initialize NextAuth with Edge-compatible config
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role;

  console.log("MIDDLEWARE LOG:", { pathname, isLoggedIn, role, auth: req.auth });

  // 1. Redirect logged-in users away from auth pages
  if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    if (role) {
      const paths: Record<string, string> = {
        SUPERADMIN: "/member-area/superadmin",
        ADMIN: "/member-area/management/admin",
        TEACHER: "/member-area/employees/teacher",
        STUDENT: "/member-area/students/student",
      };
      return NextResponse.redirect(new URL(paths[role] || "/member-area", req.nextUrl));
    } else {
      return NextResponse.redirect(new URL("/member-area", req.nextUrl));
    }
  }

  // 2. Protect /member-area routes
  if (pathname.startsWith("/member-area")) {
    if (!isLoggedIn) {
      // Not logged in -> send to login
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (!role) {
      // Logged in but missing role (bad session state) -> force to login to re-auth
      // We append a query param to break loops and force signout or show error in UI
      return NextResponse.redirect(new URL("/login?error=InvalidRole", req.nextUrl));
    }

    // Role-based routing from generic /member-area
    if (pathname === "/member-area") {
      switch (role) {
        case "SUPERADMIN":
          return NextResponse.redirect(new URL("/member-area/superadmin", req.nextUrl));
        case "ADMIN":
          return NextResponse.redirect(new URL("/member-area/management/admin", req.nextUrl));
        case "TEACHER":
          return NextResponse.redirect(new URL("/member-area/employees/teacher", req.nextUrl));
        case "STUDENT":
          return NextResponse.redirect(new URL("/member-area/students/student", req.nextUrl));
        default:
          return NextResponse.redirect(new URL("/login?error=InvalidRole", req.nextUrl));
      }
    }

    // Prevent cross-portal access
    if (pathname.startsWith("/member-area/superadmin") && role !== "SUPERADMIN") {
      return NextResponse.redirect(new URL("/member-area", req.nextUrl));
    }
    if (pathname.startsWith("/member-area/management/admin") && role !== "ADMIN" && role !== "SUPERADMIN") {
      return NextResponse.redirect(new URL("/member-area", req.nextUrl));
    }
    if (pathname.startsWith("/member-area/employees/teacher") && role !== "TEACHER" && role !== "SUPERADMIN") {
      return NextResponse.redirect(new URL("/member-area", req.nextUrl));
    }
    if (pathname.startsWith("/member-area/students/student") && role !== "STUDENT" && role !== "SUPERADMIN") {
      return NextResponse.redirect(new URL("/member-area", req.nextUrl));
    }
  }

  return NextResponse.next();
});

// Route matcher configuration
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
