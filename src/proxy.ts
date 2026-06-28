import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/getSession";

// proxy /Middleware for accessing Dashboard
export async function proxy(req: NextRequest) {
  const session = await getSession();
  //   console.log(session);
  if (!session) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
  }
  return NextResponse.next();
}

// tells that for whom this middleware/proxy runs
export const config = {
  matcher: "/dashboard/:path*",
};
