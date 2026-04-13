import type { MetadataRoute } from "next";
import { getAllKnowledgeArticles, KNOWLEDGE_CATEGORIES } from "@/lib/knowledge";
import {
  GRAMMAR_TOPICS,
  PRONUNCIATION_TOPICS,
  SUPPORTED_LANGUAGES,
  VOCAB_TOPICS,
} from "@/lib/languageAcademy";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "http://localhost:3000";

  const staticRoutes = [
    "/",
    "/about",
    "/why-choose-us",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/login",
    "/register",
    "/search",
    "/membership",
    "/languages",
    "/stories",
    "/community",
    "/marketplace",
  ];

  const knowledgeCategoryRoutes = KNOWLEDGE_CATEGORIES.map((c) => `/${c.slug}`);
  const knowledgeArticleRoutes = getAllKnowledgeArticles().map(
    (a) => `/${a.category}/${a.slug}`,
  );

  const languageRoutes = SUPPORTED_LANGUAGES.flatMap((l) => {
    const langRoot = `/languages/${l.slug}`;
    const levels = ["A1", "A2", "B1", "B2", "C1", "C2"].map(
      (level) => `${langRoot}/${level}`,
    );
    const vocab = [
      `${langRoot}/vocabulary`,
      ...VOCAB_TOPICS.map((t) => `${langRoot}/vocabulary/${t.slug}`),
    ];
    const grammar = [
      `${langRoot}/grammar`,
      ...GRAMMAR_TOPICS.flatMap((t) => [
        `${langRoot}/grammar/${t.slug}`,
        ...["A1", "A2", "B1", "B2", "C1", "C2"].map(
          (level) => `${langRoot}/grammar/${t.slug}/${level}`,
        ),
      ]),
    ];
    const pronunciation = [
      `${langRoot}/pronunciation`,
      ...PRONUNCIATION_TOPICS.map((t) => `${langRoot}/pronunciation/${t.slug}`),
    ];
    return [langRoot, ...levels, ...vocab, ...grammar, ...pronunciation];
  });

  const urls = [
    ...staticRoutes,
    ...knowledgeCategoryRoutes,
    ...knowledgeArticleRoutes,
    ...languageRoutes,
  ];

  return urls.map((url) => ({
    url: `${base}${url}`,
    lastModified: new Date(),
  }));
}

