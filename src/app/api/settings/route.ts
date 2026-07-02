import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

//  api to update informations
export async function POST(req: NextRequest) {
  try {
    // fetch from req.json not from body
    const { ownerId, businessName, supportEmail, knowledge } = await req.json();
    if (!ownerId) {
      return NextResponse.json(
        { message: "owner id is required" },
        { status: 400 },
      );
    }

    // if businnes not registered then create one & if it exists then update this
    await connectDb();
    const settings = await Settings.findOneAndUpdate(
      { ownerId },
      { ownerId, businessName, supportEmail, knowledge },
      {
        new: true,
        upsert: true, // with upsert true if this not exists it create one
        writeConcern: { w: 1 },
      },
    );
    // return response
    return NextResponse.json(settings);
  } catch (err) {
    console.error("/api/settings error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { message: `Settings error: ${message}` },
      { status: 500 },
    );
  }
}

// // API to get informations
// export async function GET(req: NextRequest) {
//   try {

//   } catch (err) {}
// }
