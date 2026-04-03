import Image from "next/image";
import Link from "next/link";
import VisitStats from "@/components/common/VisitStats";
import { getAllCategories } from "@/lib/posts";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/your-id",
    icon: "/icons/instagram.svg", // TODO: 아이콘 파일 넣어주면 됨
  },
  {
    name: "X",
    href: "https://x.com/your-id",
    icon: "/icons/x.svg", // TODO: 아이콘 파일 넣어주면 됨
  },
  {
    name: "GitHub",
    href: "https://github.com/your-id",
    icon: "/icons/github.svg", // TODO: 아이콘 파일 넣어주면 됨
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@your-id",
    icon: "/icons/youtube.svg", // TODO: 아이콘 파일 넣어주면 됨
  },
];

export default function SiteSidebar() {
  const categories = getAllCategories();

  return (
    <aside className="mb-6 h-full rounded-xl border border-white/15 bg-transparent p-5 lg:sticky lg:top-4 lg:mb-0 lg:flex lg:h-[calc(100vh-2rem)] lg:flex-col lg:justify-between lg:overflow-y-auto">
      <div>
        <Link href="/" className="block">
          <p className="text-xs uppercase text-zinc-400 hover:text-zinc-200">연재로그</p>
        </Link>

        <div className="mt-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border border-white/20 bg-white/5">
            {/* TODO: 썸네일 이미지 넣어주면 됨 */}
            <Image
              src="/images/profile-thumbnail.jpg"
              alt="연재로그 썸네일"
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="mb-3 text-xs font-semibold uppercase text-zinc-500">Social</p>
          <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-3 py-1 text-xs text-zinc-200 hover:bg-white/10"
              >
                <Image
                  src={social.icon}
                  alt={`${social.name} icon`}
                  width={14}
                  height={14}
                  className="h-3.5 w-3.5 object-contain opacity-80 invert"
                />
                {social.name}
              </a>
            ))}
          </div>
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
