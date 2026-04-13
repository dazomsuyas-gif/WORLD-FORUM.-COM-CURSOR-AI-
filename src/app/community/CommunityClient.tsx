"use client";

import { useEffect, useMemo, useState } from "react";

type Post = { id: string; text: string; createdAt: string };

export function CommunityClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sorted = useMemo(() => posts.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [posts]);

  useEffect(() => {
    fetch("/api/community/posts")
      .then((r) => r.json())
      .then((j) => setPosts(j.posts ?? []))
      .catch(() => {});

    const es = new EventSource("/api/community/stream");
    es.addEventListener("post", (e) => {
      try {
        const p = JSON.parse((e as MessageEvent).data);
        setPosts((prev) => {
          if (prev.some((x) => x.id === p.id)) return prev;
          return [p, ...prev];
        });
      } catch {}
    });
    return () => es.close();
  }, []);

  return (
    <div className="grid gap-6">
      <form
        className="glass p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          setPending(true);
          setError(null);
          const res = await fetch("/api/community/posts", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ text }),
          }).catch(() => null);
          const json = await res?.json().catch(() => null);
          if (!res || !res.ok || !json?.ok) {
            setError(json?.error ?? "Failed to post.");
            setPending(false);
            return;
          }
          setText("");
          setPending(false);
        }}
      >
        <div className="text-xs uppercase tracking-wider text-white/50">
          Create post
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="mt-3 w-full resize-none bg-transparent text-sm text-white/90 placeholder:text-white/40 outline-none"
          placeholder="Share something with the community…"
        />
        {error ? <div className="mt-3 text-sm text-red-200">{error}</div> : null}
        <div className="mt-4">
          <button
            type="submit"
            disabled={pending || !text.trim()}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--midnight)] disabled:opacity-60"
            style={{ background: "var(--grad-gold)" }}
          >
            {pending ? "Posting…" : "Post"}
          </button>
        </div>
      </form>

      <div className="grid gap-4">
        {sorted.map((p) => (
          <div key={p.id} className="glass p-6">
            <div className="text-xs text-white/45">
              {new Date(p.createdAt).toLocaleString()}
            </div>
            <div className="mt-2 text-sm leading-6 text-white/80">{p.text}</div>
          </div>
        ))}
        {sorted.length === 0 ? (
          <div className="glass p-8 text-sm text-white/70">
            No posts yet. Create the first one.
          </div>
        ) : null}
      </div>
    </div>
  );
}

