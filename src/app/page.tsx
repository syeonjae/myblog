import Link from "next/link";
import { getAllPostMeta } from "@/lib/posts";
import RelativeTime from "@/components/common/RelativeTime";
import TypingWelcome from "@/components/common/TypingWelcome";
import { formatAmPmTime } from "@/lib/datetime";

export default function HomePage() {
  const posts = getAllPostMeta();

  return (
    <main className="flex-1">
      <section className="relative mb-8 flex min-h-[calc(100vh-8rem)] items-center overflow-hidden rounded-xl border border-white/20 bg-transparent p-6 sm:p-8 lg:min-h-[calc(100vh-6rem)]">
        <div className="absolute inset-0 bg-transparent" />

        <div className="relative z-10 w-full text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Welcome to</p>
          <TypingWelcome />
          <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-300 sm:text-base">
            일상, 개발, 포트폴리오, 취미를 차분하게 기록합니다. 빠르게 훑어볼 수 있는 짧은 글부터,
            깊게 읽을 수 있는 긴 글까지 담아둘게요.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <a
              href="#latest-posts"
              className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm text-zinc-100 transition hover:bg-white/15"
            >
              최신 글 보기
            </a>
            <Link
              href="/about"
              className="inline-flex items-center rounded-full border border-white/30 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/50 hover:text-zinc-100"
            >
              블로그 소개
            </Link>
          </div>
        </div>
      </section>

      <section id="latest-posts" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group rounded-xl border border-white/15 bg-[#111111] p-6 transition hover:-translate-y-0.5 hover:border-white/35"
          >
            <div className="mb-3 flex items-center gap-2 text-xs text-zinc-500">
              <RelativeTime date={post.date} />
              <span>·</span>
              <span>{formatAmPmTime(post.date)}</span>
              <span>·</span>
              <span className="text-zinc-300">{post.category}</span>
            </div>
            <h2 className="line-clamp-2 text-lg font-semibold text-zinc-100 group-hover:text-white">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-3 text-sm text-zinc-400">{post.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 px-2 py-1 text-xs text-zinc-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
