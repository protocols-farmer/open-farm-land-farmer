import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // Don't index backend routes
          "/admin/", // Don't index admin panels
          "/settings/", // Don't index user settings
          "/create/", // Don't index the editor page
        ],
      },
    ],
    sitemap: "https://openfarmlands.vercel.app/sitemap.xml",
  };
}
