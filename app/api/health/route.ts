import { NextResponse } from "next/server";

/**
 * Health check endpoint for connectivity verification
 * GET /api/health
 */
export async function GET() {
  return NextResponse.json({ status: "ok" }, { status: 200 });
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
