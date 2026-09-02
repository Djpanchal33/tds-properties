import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  const isProtected = pathname.startsWith("/admin") || (pathname.startsWith("/api/admin/") && !["GET", "HEAD", "OPTIONS"].includes(request.method));
  if (!isProtected) return NextResponse.next();
  if (await verifySession(request.cookies.get("tds_session")?.value)) return NextResponse.next();
  if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
