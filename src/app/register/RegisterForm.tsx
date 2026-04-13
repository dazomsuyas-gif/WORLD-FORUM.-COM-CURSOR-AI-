"use client";

import Link from "next/link";
import { useState } from "react";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  return (
    <div className="grid gap-4">
      <form
        className="grid gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setPending(true);
          setError(null);
          setDone(false);

          const res = await fetch("/api/register", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              name: name.trim() ? name.trim() : undefined,
              email,
              password,
            }),
          }).catch(() => null);

          const json = await res?.json().catch(() => null);
          if (!res || !res.ok || !json?.ok) {
            setError(json?.error ?? "Registration failed.");
            setPending(false);
            return;
          }

          setDone(true);
          setPending(false);
        }}
      >
        <div className="grid gap-2">
          <label className="text-xs uppercase tracking-wider text-white/50">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="glass w-full px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none"
            placeholder="Kelvin"
            autoComplete="name"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs uppercase tracking-wider text-white/50">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="glass w-full px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs uppercase tracking-wider text-white/50">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="glass w-full px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none"
            placeholder="Minimum 8 characters"
            autoComplete="new-password"
          />
        </div>

        {error ? (
          <div className="text-sm text-red-300">{error}</div>
        ) : done ? (
          <div className="text-sm text-emerald-200">
            Account created. You can now log in.
          </div>
        ) : (
          <div className="text-xs text-white/50">
            Your password is stored securely (hashed). Set `MONGODB_URI` in your
            environment.
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="rounded-full px-5 py-3 text-sm font-semibold text-[var(--midnight)] disabled:opacity-60"
          style={{ background: "var(--grad-gold)" }}
        >
          {pending ? "Creating…" : "Create account"}
        </button>
      </form>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/login"
          className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
        >
          I already have an account
        </Link>
        <Link
          href="/"
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--midnight)]"
          style={{ background: "var(--grad-gold)" }}
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

