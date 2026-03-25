"use client";

import { useEffect, useState } from "react";

type Stats = {
  totalVisits: number | null;
  todayVisitors: number | null;
  configured: boolean;
};

export default function VisitStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/visits", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: Stats) => setStats(data))
      .catch(() => setStats({ totalVisits: null, todayVisitors: null, configured: false }));
  }, []);

  if (!stats) {
    return (
      <div className="mb-5 text-xs text-zinc-400">방문 통계 불러오는 중...</div>
    );
  }

  if (!stats.configured) {
    return (
      <div className="mb-5 rounded-lg border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-xs text-amber-100">
        방문 통계를 표시하려면 Vercel 환경변수에 Upstash Redis 키를 설정해줘.
      </div>
    );
  }

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2 text-xs">
      <span className="rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-3 py-1 text-fuchsia-100">
        총 방문 {stats.totalVisits ?? "-"}
      </span>
      <span className="rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1 text-teal-100">
        오늘 방문자 {stats.todayVisitors ?? "-"}
      </span>
    </div>
  );
}
