export const SITE_NAME = "연재로그";
export const SITE_DESCRIPTION = "일상, 개발, 포트폴리오, 취미를 기록하는 연재형 블로그";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://myblogvercel.vercel.app/";

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
