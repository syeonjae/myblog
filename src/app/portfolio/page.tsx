import Link from "next/link";
import { portfolioProjects } from "@/lib/portfolio";

const statusTone: Record<string, string> = {
  운영중: "border-emerald-300/40 bg-emerald-300/10 text-emerald-200",
  개발중: "border-sky-300/40 bg-sky-300/10 text-sky-200",
  실험: "border-violet-300/40 bg-violet-300/10 text-violet-200",
};

export default function PortfolioPage() {
  return (
    <main className="mx-auto w-full max-w-6xl py-2 lg:py-4">
      <section className="mb-6 rounded-xl border border-white/20 bg-transparent p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Portfolio</p>
        <h1 className="mt-3 text-3xl font-bold text-zinc-50 sm:text-4xl">문제를 해결한 프로젝트들</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
          실무/개인 프로젝트를 문제 정의 → 구현 → 회고 관점으로 정리했습니다.
          카드에서 빠르게 훑고, 아래 상세에서 구현 의도와 배운 점까지 확인할 수 있어요.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {['Web', 'Mobile', 'AI', 'Backend', 'Tooling'].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-zinc-300"
            >
              #{chip}
            </span>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {portfolioProjects.map((project) => (
          <article
            key={project.slug}
            className="rounded-xl border border-white/15 bg-[#111111]/70 p-5 backdrop-blur transition hover:-translate-y-0.5 hover:border-white/35"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className={`rounded-full border px-2 py-1 text-[11px] ${statusTone[project.status]}`}>
                {project.status}
              </span>
              <span className="text-xs text-zinc-500">{project.period}</span>
            </div>

            <h2 className="text-lg font-semibold text-zinc-100">{project.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{project.summary}</p>
            <p className="mt-3 text-xs text-zinc-500">역할: {project.role}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/20 px-2 py-1 text-xs text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={`#${project.slug}`}
              className="mt-5 inline-flex items-center rounded-full border border-white/25 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition hover:bg-white/10"
            >
              상세 보기
            </a>
          </article>
        ))}
      </section>

      <section className="mt-8 space-y-4">
        {portfolioProjects.map((project) => (
          <article
            id={project.slug}
            key={`${project.slug}-detail`}
            className="rounded-xl border border-white/15 bg-black/40 p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-zinc-100">{project.title}</h3>
              <div className="flex gap-2">
                {project.links.live ? (
                  <Link
                    href={project.links.live}
                    target="_blank"
                    className="rounded-full border border-white/25 px-3 py-1.5 text-xs text-zinc-200 hover:bg-white/10"
                  >
                    Live
                  </Link>
                ) : null}
                {project.links.github ? (
                  <Link
                    href={project.links.github}
                    target="_blank"
                    className="rounded-full border border-white/25 px-3 py-1.5 text-xs text-zinc-200 hover:bg-white/10"
                  >
                    GitHub
                  </Link>
                ) : null}
              </div>
            </div>

            <p className="mt-2 text-sm text-zinc-400">{project.summary}</p>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">Highlights</p>
                <ul className="mt-2 space-y-1.5 text-sm text-zinc-300">
                  {project.highlights.map((item) => (
                    <li key={item} className="leading-6">• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">Contribution</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-300">{project.contribution}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">Learnings</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-300">{project.learnings}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
