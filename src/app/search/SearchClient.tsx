"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type SearchIndexItem = {
  title: string;
  description?: string;
  category: string;
  slug: string;
  tags?: string[];
};

export function SearchClient({ index }: { index: SearchIndexItem[] }) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return index.slice(0, 18);
    return index
      .map((it) => {
        const hay = [
          it.title,
          it.description ?? "",
          it.category,
          ...(it.tags ?? []),
        ]
          .join(" ")
          .toLowerCase();
        const score = hay.includes(query) ? 2 : 0;
        const tokenScore = query
          .split(/\s+/)
          .filter(Boolean)
          .reduce((acc, t) => acc + (hay.includes(t) ? 1 : 0), 0);
        return { it, score: score + tokenScore };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 40)
      .map((x) => x.it);
  }, [q, index]);

  return (
    <div className="mt-8">
      <div className="glass p-4 sm:p-5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search articles, topics, tags…"
          className="w-full bg-transparent text-sm text-white/90 placeholder:text-white/40 outline-none"
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {results.map((r) => (
          <Link
            key={`${r.category}/${r.slug}`}
            href={`/${r.category}/${r.slug}`}
            className="glass block p-5 transition hover:border-white/20"
          >
            <div className="text-xs uppercase tracking-wider text-white/50">
              {r.category}
            </div>
            <div className="mt-2 text-base font-semibold text-white">
              {r.title}
            </div>
            {r.description ? (
              <p className="mt-2 text-sm leading-6 text-white/70">
                {r.description}
              </p>
            ) : null}
            {r.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {r.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}

