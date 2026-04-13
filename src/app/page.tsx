import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BackgroundOrbs } from "@/components/effects/BackgroundOrbs";
import { Reveal } from "@/components/motion/Reveal";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative morph-bg">
        <BackgroundOrbs />

        <Container className="relative py-20 sm:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs text-white/75 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[var(--gold)] shadow-[var(--shadow-gold)]" />
                  400+ pages · 6 Languages · Stories · Community · Marketplace
                </div>
              </Reveal>

              <Reveal transition={{ delay: 0.05, duration: 0.6 }}>
                <h1
                  className="mt-6 text-5xl leading-[0.95] tracking-tight text-white sm:text-6xl"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  Knowledge
                  <br />
                  <span className="shimmer">Without Borders</span>
                </h1>
              </Reveal>

              <Reveal transition={{ delay: 0.1, duration: 0.6 }}>
                <p
                  className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  WORLD FORUM is a cinematic, animation-rich platform for global
                  knowledge and lifestyle learning—built for speed, beauty, and
                  scale.
                </p>
              </Reveal>

              <Reveal transition={{ delay: 0.15, duration: 0.6 }}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/why-choose-us"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[var(--midnight)]"
                    style={{
                      background: "var(--grad-gold)",
                      boxShadow: "var(--shadow-gold)",
                    }}
                  >
                    Explore the vision
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
                  >
                    Contact
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal transition={{ delay: 0.1, duration: 0.6 }}>
                <div className="glass relative overflow-hidden p-6 shadow-[var(--shadow-card)]">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/8 to-transparent" />
                  <div className="relative">
                    <div
                      className="text-sm tracking-[0.2em] text-[var(--gold)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      MODULES
                    </div>
                    <ul className="mt-5 grid gap-3 text-sm text-white/80">
                      <li className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                        <span>Knowledge Hub</span>
                        <span className="text-white/50">14 categories</span>
                      </li>
                      <li className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                        <span>Language Academy</span>
                        <span className="text-white/50">A1 → C2</span>
                      </li>
                      <li className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                        <span>Story World</span>
                        <span className="text-white/50">genres</span>
                      </li>
                      <li className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                        <span>Marketplace</span>
                        <span className="text-white/50">price prediction</span>
                      </li>
                      <li className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                        <span>Tourism & Visa</span>
                        <span className="text-white/50">assistance</span>
                      </li>
                    </ul>

                    <div className="mt-6 text-xs text-white/55">
                      Next: cinematic page transitions + richer illustrations.
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--midnight)]">
        <Container className="py-16">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Cinematic UI",
                desc: "Morphing gradients, glass layers, premium typography, micro-interactions.",
              },
              {
                title: "Built to Scale",
                desc: "App Router + TypeScript + strong structure for 400+ routes.",
              },
              {
                title: "Performance-first",
                desc: "Code splitting, asset discipline, and Lighthouse-oriented defaults.",
              },
            ].map((c) => (
              <Reveal key={c.title}>
                <div className="glass p-6">
                  <div
                    className="text-sm tracking-[0.18em] text-[var(--gold)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {c.title}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
