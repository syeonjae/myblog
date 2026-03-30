import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <Link href="/" className="inline-block">
          <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-300/80 hover:text-fuchsia-200">
            연재로그
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl hover:text-fuchsia-100">
            일상 · 개발 · 포트폴리오 · 취미
          </h1>
        </Link>
        <p className="mt-3 text-zinc-300">기록과 실험, 그리고 제품을 만드는 이야기.</p>
      </div>

      <div className="flex w-full items-center justify-end sm:w-auto">
        <Link
          href="/about"
          className="rounded-full border border-teal-300/40 bg-white/5 px-4 py-2 text-sm text-teal-200 transition hover:bg-white/10"
        >
          About
        </Link>
      </div>
    </header>
  );
}
