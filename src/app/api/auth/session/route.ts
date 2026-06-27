import { NextResponse } from "next/server";
import { getSession } from "@/lib/getSession";

export async function GET() {
  const user = await getSession();

  return NextResponse.json({
    email: user?.email ?? null,
  });
}
