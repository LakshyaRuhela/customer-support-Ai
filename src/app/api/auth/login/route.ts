import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // allowed callback URL you registered in the dashboard
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`; // change it to skilkit
  const url = scalekit.getAuthorizationUrl(redirectUri);
  console.log(url);
  return NextResponse.redirect(url); // redirect to that url means to callback 
}
