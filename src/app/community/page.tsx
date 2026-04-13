import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Community — WORLD FORUM",
  description: "Community hub: profiles, feed, groups, forums, and messaging (coming soon).",
};

export default function CommunityPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Social Community"
        title="Community"
        description="Phase MVP: routes + UI shell. Next: auth, profiles, posts, groups, and DMs."
      />
      <Container className="py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Feed",
              desc: "Posts, likes, comments, and trending topics.",
            },
            {
              title: "Groups",
              desc: "Communities around topics, languages, and regions.",
            },
            {
              title: "Messaging",
              desc: "Realtime DMs with typing indicators and notifications.",
            },
          ].map((c) => (
            <div key={c.title} className="glass p-7">
              <div
                className="text-sm tracking-[0.18em] text-[var(--gold)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {c.title}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">{c.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}

