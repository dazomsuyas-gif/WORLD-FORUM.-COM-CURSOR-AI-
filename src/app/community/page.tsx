import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { CommunityClient } from "./CommunityClient";

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
        description="MVP feed: create posts and see updates live (SSE). Next: profiles, groups, likes, comments, DMs."
      />
      <Container className="py-12">
        <CommunityClient />
      </Container>
    </main>
  );
}

