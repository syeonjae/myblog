import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import RelativeTime from "@/components/common/RelativeTime";
import { formatAmPmTime } from "@/lib/datetime";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return notFound();

  const posts = getPostsByCategory(slug);

  return (
    <main className="mx-auto w-full max-w-4xl py-8">
      <h1 className="text-3xl font-bold">카테고리: {category.name}</h1>
      <p className="mt-2 text-zinc-400">총 {category.count}개 글</p>

      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="block rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10">
            <p className="text-xs text-zinc-400"><RelativeTime date={post.date} /> · {formatAmPmTime(post.date)}</p>
            <h2 className="mt-1 text-lg font-semibold">{post.title}</h2>
            <p className="mt-1 text-sm text-zinc-300">{post.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
