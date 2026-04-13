"use client";

import Link from "next/link";
import { useState } from "react";

export function SellForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"electronics" | "fashion" | "food">(
    "electronics",
  );
  const [baseInternationalUsd, setBaseInternationalUsd] = useState("10");
  const [sellerUsd, setSellerUsd] = useState("");
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <form
      className="grid gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        setMsg(null);

        const res = await fetch("/api/marketplace/products", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            title,
            category,
            baseInternationalUsd: Number(baseInternationalUsd),
            sellerUsd: sellerUsd.trim() ? Number(sellerUsd) : undefined,
          }),
        }).catch(() => null);

        const json = await res?.json().catch(() => null);
        if (!res || !res.ok || !json?.ok) {
          setMsg(json?.error ?? "Failed to post product.");
          setPending(false);
          return;
        }

        setMsg("Product posted. Admin will review it.");
        setTitle("");
        setSellerUsd("");
        setPending(false);
      }}
    >
      <div className="grid gap-2">
        <label className="text-xs uppercase tracking-wider text-white/50">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="glass w-full px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none"
          placeholder="e.g. Phone cover, eggs tray, sneakers"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs uppercase tracking-wider text-white/50">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as any)}
          className="glass w-full px-4 py-3 text-sm text-white/90 outline-none"
        >
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="food">Food</option>
        </select>
      </div>

      <div className="grid gap-2">
        <label className="text-xs uppercase tracking-wider text-white/50">
          International baseline (USD)
        </label>
        <input
          value={baseInternationalUsd}
          onChange={(e) => setBaseInternationalUsd(e.target.value)}
          inputMode="decimal"
          className="glass w-full px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none"
          placeholder="e.g. 3.5"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs uppercase tracking-wider text-white/50">
          Seller price (USD, optional — supports &lt;$2 items)
        </label>
        <input
          value={sellerUsd}
          onChange={(e) => setSellerUsd(e.target.value)}
          inputMode="decimal"
          className="glass w-full px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none"
          placeholder="e.g. 1.50"
        />
      </div>

      {msg ? (
        <div className="text-sm text-white/80">{msg}</div>
      ) : (
        <div className="text-xs text-white/50">
          Needs `MONGODB_URI` to save. When configured, it also triggers an admin
          notification hook (WhatsApp stub).
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full px-5 py-3 text-sm font-semibold text-[var(--midnight)] disabled:opacity-60"
          style={{ background: "var(--grad-gold)" }}
        >
          {pending ? "Posting…" : "Post product"}
        </button>
        <Link
          href="/marketplace/products"
          className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
        >
          Browse products
        </Link>
      </div>
    </form>
  );
}

