import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPostMeta, getPostSource, toSlug } from "@/lib/posts";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import RelativeTime from "@/components/common/RelativeTime";
import { formatAmPmTime } from "@/lib/datetime";

type Params = { slug: string };

export async function generateStaticParams() {
  return getAllPostMeta().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostSource(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const url = absoluteUrl(`/posts/${post.meta.slug}`);

  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: {
      canonical: `/posts/${post.meta.slug}`,
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.meta.date,
      tags: post.meta.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
    },
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostSource(slug);

  if (!post) return notFound();

  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
  });

  return (
    <main className="mx-auto w-full max-w-3xl py-8">
      <p className="text-sm text-zinc-400">
        <RelativeTime date={post.meta.date} /> · {formatAmPmTime(post.meta.date)}
      </p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{post.meta.title}</h1>
      <p className="mt-3 text-zinc-300">{post.meta.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/category/${post.meta.categorySlug}`}
          className="rounded-full border border-fuchsia-300/40 bg-fuchsia-300/10 px-3 py-1 text-xs text-fuchsia-100"
        >
          {post.meta.category}
        </Link>
        {post.meta.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tag/${toSlug(tag)}`}
            className="rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-200"
          >
            #{tag}
          </Link>
        ))}
      </div>

      <article className="prose prose-invert mt-10 max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-200 prose-a:text-fuchsia-300">
        {content}
      </article>
    </main>
  );
}
