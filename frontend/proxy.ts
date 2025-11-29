import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { cookies } from "next/headers";

export async function proxy(req: NextRequest) {
  const gotCookies = await cookies();
  console.log(gotCookies);
  const sessionCookie = getSessionCookie(req)
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