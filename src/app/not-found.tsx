import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center py-12">
      <section className="w-full max-w-2xl rounded-xl border border-white/20 bg-black/20 p-8 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">404</p>
        <h1 className="mt-3 text-3xl font-bold text-zinc-100 sm:text-4xl">페이지를 찾을 수 없어요</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-400 sm:text-base">
          요청한 페이지가 이동되었거나 삭제되었을 수 있어요. 홈으로 돌아가서 원하는 글을 다시 찾아볼까요?
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm text-zinc-100 transition hover:bg-white/15"
          >
            홈으로 가기
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center rounded-full border border-white/25 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/45 hover:text-zinc-100"
          >
            블로그 소개
          </Link>
        </div>
      </section>
    </main>
  );
}
