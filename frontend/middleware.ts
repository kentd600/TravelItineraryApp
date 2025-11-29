import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(req: NextRequest) {
  console.log(req.cookies.get('better-auth.session_token'))
  const sessionCookie = getSessionCookie(req)
  console.log(sessionCookie);
  if(!sessionCookie) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
}

export const config = {
  runtime: 'nodejs',
  matcher: [
    "/wanderer/:path*",
    "/itineraries/:path*"
  ]
}