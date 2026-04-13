import type { MetadataRoute } from "next";
import { getAllKnowledgeArticles, KNOWLEDGE_CATEGORIES } from "@/lib/knowledge";

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

  const urls = [
    ...staticRoutes,
    ...knowledgeCategoryRoutes,
    ...knowledgeArticleRoutes,
  ];

  return urls.map((url) => ({
    url: `${base}${url}`,
    lastModified: new Date(),
  }));
}

