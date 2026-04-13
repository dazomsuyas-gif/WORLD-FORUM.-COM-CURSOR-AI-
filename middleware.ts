import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const token = await getToken({ req });
  const role = (token as any)?.role as string | undefined;

  if (role === "admin" || role === "super_admin") return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};

