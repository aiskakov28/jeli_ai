import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: "jeli.ai",
    time: new Date().toISOString()
  });
}
