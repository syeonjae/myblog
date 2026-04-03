import Image from "next/image";
import Link from "next/link";
import VisitStats from "@/components/common/VisitStats";
import { getAllCategories } from "@/lib/posts";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/_syeonjae98",
    icon: "/icons/instagram.svg",
    pos: "-top-3 left-1/2 -translate-x-1/2",
  },
  {
    name: "X",
    href: "https://x.com/mike98231231",
    icon: "/icons/x.svg",
    pos: "top-1/2 -right-3 -translate-y-1/2",
  },
  {
    name: "GitHub",
    href: "https://github.com/syeonjae",
    icon: "/icons/github.svg",
    pos: "-bottom-3 left-1/2 -translate-x-1/2",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@yjs2010",
    icon: "/icons/youtube.svg",
    pos: "top-1/2 -left-3 -translate-y-1/2",
  },
];

export default function SiteSidebar() {
  const categories = getAllCategories();

  return (
    <aside className="mb-6 h-full rounded-xl border border-white/15 bg-transparent p-5 lg:sticky lg:top-4 lg:mb-0 lg:flex lg:h-[calc(100vh-1rem)] lg:flex-col lg:justify-between lg:overflow-y-auto">
      <div>
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="block">
            <p className="text-xs uppercase text-zinc-400 hover:text-zinc-200">연재로그</p>
          </Link>

          <div className="mt-4">
            <div className="group relative inline-flex h-24 w-24 items-center justify-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border border-white/20 bg-white/5">
                <Image
                  src="/images/profile-thumbnail.jpg"
                  alt="연재로그 썸네일"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className={`absolute ${social.pos} z-10 flex h-8 w-8 scale-90 items-center justify-center rounded-full border border-white/25 bg-black/60 opacity-0 backdrop-blur-sm transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100`}
                >
                  <Image
                    src={social.icon}
                    alt={`${social.name} icon`}
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 object-contain opacity-80 invert"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <Link
            href="/about"
            className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition hover:bg-white/10"
          >
            About
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition hover:bg-white/10"
          >
            Portfolio
          </Link>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="mb-3 text-xs font-semibold uppercase text-zinc-500">Categories</p>
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
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Visit</p>
        <VisitStats />
      </div>
    </aside>
  );
}
