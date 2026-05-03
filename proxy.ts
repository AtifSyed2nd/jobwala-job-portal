import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth"; // ✅ use SAME logic everywhere

export function proxy(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/recruiter") || pathname.startsWith("/candidate");

  const isAdminRoute = pathname.startsWith("/admin");
  const isRecruiterRoute = pathname.startsWith("/recruiter");
  const isCandidateRoute = pathname.startsWith("/candidate");

  // ============================================================
  // 🚫 NO TOKEN
  // ============================================================
  // if (!token) {
  //   if (isAdminRoute || isRecruiterRoute || isCandidateRoute) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  //   return NextResponse.next();
  // }

  // ============================================================
  // 🔐 VERIFY TOKEN
  // ============================================================
  // const decoded = verifyToken(token);

  // if (!decoded) {
  //   const res = NextResponse.redirect(new URL("/login", req.url));
  //   res.cookies.delete("auth_token");
  //   return res;
  // }

  // const { role } = decoded;

  // ============================================================
  // 🚫 BLOCK AUTH PAGES IF LOGGED IN
  // ============================================================
  // if (isAuthPage) {
  //   return NextResponse.redirect(new URL(getHomeByRole(role), req.url));
  // }

  // ============================================================
  // 🔐 ROLE-BASED ACCESS
  // ============================================================
  // if (isAdminRoute && !["ADMIN", "SUPER_ADMIN"].includes(role)) {
  //   return NextResponse.redirect(new URL(getHomeByRole(role), req.url));
  // }

  // if (isRecruiterRoute && role !== "RECRUITER") {
  //   return NextResponse.redirect(new URL(getHomeByRole(role), req.url));
  // }

  // if (isCandidateRoute && role !== "CANDIDATE") {
  //   return NextResponse.redirect(new URL(getHomeByRole(role), req.url));
  // }

  return NextResponse.next();
}

// ============================================================
// 🎯 ROLE-BASED HOME REDIRECT
// ============================================================
function getHomeByRole(role: string) {
  switch (role) {
    case "ADMIN":
    case "SUPER_ADMIN":
      return "/admin";
    case "RECRUITER":
      return "/recruiter/profile";
    case "CANDIDATE":
      return "/candidate/profile";
    default:
      return "/";
  }
}

// ============================================================
// ⚙️ MATCHER
// ============================================================
export const config = {
  matcher: [
    "/admin/:path*",
    "/recruiter/:path*",
    "/candidate/:path*",
    "/login",
    "/register",
  ],
};