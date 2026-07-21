import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "session";

function secretKey() {
  return new TextEncoder().encode(process.env.JWT_SECRET);
}

async function readSession(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secretKey());
      return payload as {
        userId: string;
        role: "admin" | "student";
        name: string;
        email: string;
      };
    } catch {
      // fall through to public student
    }
  }
  // ponytail: open LMS — no local login gate.
  return {
    userId: "000000000000000000000000",
    name: "Public Student",
    email: "student@public.lms",
    role: "student" as const,
  };
}

function safeNextPath(pathname: string, searchParams: URLSearchParams): string {
  const params = new URLSearchParams(searchParams);
  params.delete("hub_token");
  const qs = params.toString();
  const base = pathname === "/login" || pathname === "/" ? "/student/courses" : pathname;
  return base + (qs ? `?${qs}` : "");
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hubToken = req.nextUrl.searchParams.get("hub_token");

  // Exchange hub SSO on the Node auth route (needs Mongo), then continue.
  if (hubToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/api/auth/hub";
    url.search = "";
    url.searchParams.set("hub_token", hubToken);
    url.searchParams.set("next", safeNextPath(pathname, req.nextUrl.searchParams));
    return NextResponse.redirect(url);
  }

  const session = await readSession(req);

  const isAdminRoute = pathname.startsWith("/admin");
  const isStudentRoute = pathname.startsWith("/student");

  if (isAdminRoute && session.role !== "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/student/courses";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (isStudentRoute && session.role !== "student") {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (pathname === "/login") {
    const url = req.nextUrl.clone();
    url.pathname = session.role === "admin" ? "/admin" : "/student/courses";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/student/:path*", "/login"],
};
