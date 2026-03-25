"use client";

import { useMemo, useState, useEffect } from "react";

type RelativeTimeProps = {
  date: string;
  className?: string;
};

function formatAbsolute(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

function formatRelative(msDiff: number) {
  const minutes = Math.floor(msDiff / (1000 * 60));
  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;

  return null;
}

export default function RelativeTime({ date, className }: RelativeTimeProps) {
  const parsed = useMemo(() => new Date(date), [date]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (Number.isNaN(parsed.getTime())) {
    return <span className={className}>{date}</span>;
  }

  const diff = now - parsed.getTime();
  const relative = diff >= 0 ? formatRelative(diff) : null;

  return <span className={className}>{relative ?? formatAbsolute(parsed)}</span>;
}
