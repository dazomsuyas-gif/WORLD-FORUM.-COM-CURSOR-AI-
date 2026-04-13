"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";

const navLinks = [
  { href: "/richest", label: "Knowledge" },
  { href: "/languages", label: "Languages" },
  { href: "/stories", label: "Stories" },
  { href: "/community", label: "Community" },
  { href: "/creator", label: "Creator" },
  { href: "/tourism", label: "Tourism" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/membership", label: "Membership" },
] as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b",
        isScrolled
          ? "border-white/10 bg-[rgba(7,11,20,0.72)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      ].join(" ")}
      style={{ height: "var(--nav-height)" }}
    >
      <Container className="flex h-full items-center justify-between gap-4">
        <Link
          href="/"
          className="group inline-flex items-baseline gap-2 select-none"
        >
          <span
            className="text-xl tracking-[0.18em] text-[var(--gold)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            WORLD FORUM
          </span>
          <span className="hidden text-xs text-white/60 sm:inline">
            Knowledge Without Borders
          </span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/search"
            className="text-sm text-white/70 transition hover:text-white"
          >
            Search
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/25 hover:text-white md:inline-flex"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-[var(--midnight)]"
            style={{
              background: "var(--grad-gold)",
              boxShadow: "var(--shadow-gold)",
            }}
          >
            Join
          </Link>
        </div>
      </Container>
    </header>
  );
}

