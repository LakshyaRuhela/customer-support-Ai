import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Acess code from the redirect URl from  scalekit login
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  //   if code not found return error
  if (!code) {
    return NextResponse.json({ message: "code is not found" }, { status: 400 });
  }
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`; // change it to skilkit
  // get session and then store it in cookies
  const session = await scalekit.authenticateWithCode(code, redirectUri);

  //   console.log(session);
  // redirect to home after session creating
  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
  
  response.cookies.set("access_token", session.accessToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
    path: "/",
  });
  return response;
}
