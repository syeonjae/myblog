import Link from "next/link";
import { getAllPostMeta } from "@/lib/posts";
import RelativeTime from "@/components/common/RelativeTime";
import { formatAmPmTime } from "@/lib/datetime";

export default function HomePage() {
  const posts = getAllPostMeta();

  return (
    <main className="flex-1">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
