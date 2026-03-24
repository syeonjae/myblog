import Link from "next/link";
import { getAllCategories, getAllPostMeta } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPostMeta();
  const categories = getAllCategories();

  return (
    <main className="flex-1">
      <header className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-300/80">
            syeonjae&apos;s Lab
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            이런 저런 곳
          </h1>
          <p className="mt-3 text-zinc-300">
            기록과 실험, 그리고 제품을 만드는 이야기.
          </p>
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

      <section className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="rounded-full border border-fuchsia-300/40 bg-fuchsia-300/10 px-3 py-1 text-xs text-fuchsia-100 hover:bg-fuchsia-300/20"
          >
            {category.name} ({category.count})
          </Link>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition hover:-translate-y-0.5 hover:border-fuchsia-300/50 hover:bg-white/[0.07]"
          >
            <div className="mb-3 flex items-center gap-2 text-xs text-zinc-400">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readingMinutes}분</span>
              <span>·</span>
              <span className="text-fuchsia-200">{post.category}</span>
            </div>
            <h2 className="line-clamp-2 text-lg font-semibold text-zinc-100 group-hover:text-fuchsia-200">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-3 text-sm text-zinc-300">
              {post.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 px-2 py-1 text-xs text-zinc-300"
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
