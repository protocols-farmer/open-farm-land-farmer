// client/src/app/sitemap.ts
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://open-farm-land-farmer.vercel.app";

  // In a real scenario, you'd fetch your dynamic slugs from the DB here:
  // const posts = await prisma.post.findMany({ select: { id: true, updatedAt: true } });

  const routes = [
    "",
    "/projects",
    "/blogs",
    "/resources",
    "/articles",
    "/guides",
    "/showcases",
    "/community",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes];
}
