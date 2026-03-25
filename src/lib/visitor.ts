import { Redis } from "@upstash/redis";
import crypto from "node:crypto";

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function getTodayKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function hashVisitor(ip: string, ua: string) {
  return crypto
    .createHash("sha256")
    .update(`${ip}|${ua}`)
    .digest("hex")
    .slice(0, 24);
}

export async function recordAndGetVisitStats(ip: string, ua: string) {
  const redis = getRedis();
  if (!redis) {
    return { totalVisits: null, todayVisitors: null, configured: false };
  }

  const today = getTodayKey();
  const totalKey = "stats:visits:total";
  const uniqueSetKey = `stats:visitors:${today}`;

  const visitorId = hashVisitor(ip || "unknown", ua || "unknown");

  await redis.incr(totalKey);
  await redis.sadd(uniqueSetKey, visitorId);
  await redis.expire(uniqueSetKey, 60 * 60 * 24 * 8);

  const [totalVisits, todayVisitors] = await Promise.all([
    redis.get<number>(totalKey),
    redis.scard(uniqueSetKey),
  ]);

  return {
    totalVisits: Number(totalVisits ?? 0),
    todayVisitors: Number(todayVisitors ?? 0),
    configured: true,
  };
}
