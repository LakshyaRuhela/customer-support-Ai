import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ownerId } = await req.json();
    // fetch from req.json not from body
    if (!ownerId) {
      return NextResponse.json(
        { message: "owner id is required" },
        { status: 400 },
      );
    }

    await connectDb();
    const settings = await Settings.findOne({ ownerId });
    // return response
    return NextResponse.json(settings);
  } catch (err) {
    return NextResponse.json(
      { message: `Get Settings error , ${err}` },
      { status: 500 },
    );
  }
}
