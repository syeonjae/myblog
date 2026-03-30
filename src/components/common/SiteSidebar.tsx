import Link from "next/link";
import VisitStats from "@/components/common/VisitStats";
import { getAllCategories } from "@/lib/posts";

export default function SiteSidebar() {
  const categories = getAllCategories();

  return (
    <aside className="mb-6 h-full rounded-xl border border-white/15 bg-[#111111] p-5 lg:sticky lg:top-4 lg:mb-0 lg:flex lg:h-[calc(100vh-2rem)] lg:flex-col lg:justify-between lg:overflow-y-auto">
      <div>
        <Link href="/" className="block">
          <p className="text-xs uppercase  text-zinc-400 hover:text-zinc-200">
            연재로그
          </p>
        </Link>

        <div className="mt-4">
          <Link
            href="/about"
            className="inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition hover:bg-white/10"
          >
            About
          </Link>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="mb-3 text-xs font-semibold uppercase  text-zinc-500">
            Categories
          </p>
          <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="rounded-full border border-white/20 bg-transparent px-3 py-1 text-xs text-zinc-200 hover:bg-white/10"
              >
                {category.name} ({category.count})
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Visit
        </p>
        <VisitStats />
      </div>
    </aside>
  );
}
