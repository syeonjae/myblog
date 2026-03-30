import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-white/10 pt-6 text-xs text-zinc-400">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} 연재로그. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <Link href="/license" className="hover:text-zinc-200">
            License
          </Link>
          <Link href="/disclaimer" className="hover:text-zinc-200">
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}
