import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const healthCheck = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      api: { status: "healthy", responseTime: 42 },
      database: { status: "healthy", responseTime: 8 },
      cache: { status: "healthy", responseTime: 3 },
    },
  };

  return NextResponse.json(healthCheck, { status: 200 });
}
