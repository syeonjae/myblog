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
      .catch(() =>
        setStats({ totalVisits: null, todayVisitors: null, configured: false }),
      );
  }, []);

  if (!stats) {
    return (
      <div className="mb-5 text-xs text-zinc-500">방문 통계 불러오는 중...</div>
    );
  }

  if (!stats.configured) {
    return (
      <div className="mb-5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-zinc-300">
        방문자를 표시할 수 없습니다.
      </div>
    );
  }

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2 text-xs">
      <span className="rounded-full border border-white/20 bg-transparent px-3 py-1 text-zinc-200">
        총 방문 {stats.totalVisits ?? "-"}
      </span>
      <span className="rounded-full border border-white/20 bg-transparent px-3 py-1 text-zinc-200">
        오늘 방문자 {stats.todayVisitors ?? "-"}
      </span>
    </div>
  );
}
