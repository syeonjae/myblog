export const SITE_NAME = "syeonjae's Lab";
export const SITE_DESCRIPTION = "개발, 제품, AI 실험을 기록하는 블로그";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://myblogvercel.vercel.app/";

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
