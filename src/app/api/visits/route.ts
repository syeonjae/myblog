import { NextRequest, NextResponse } from "next/server";
import { recordAndGetVisitStats } from "@/lib/visitor";

function getClientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return "unknown";
}

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const ua = req.headers.get("user-agent") ?? "unknown";

  const botLike = /bot|spider|crawler|headless/i.test(ua);
  if (botLike) {
    return NextResponse.json({ totalVisits: null, todayVisitors: null, configured: true });
  }

  const stats = await recordAndGetVisitStats(ip, ua);
  return NextResponse.json(stats, {
    headers: { "Cache-Control": "no-store" },
  });
}
