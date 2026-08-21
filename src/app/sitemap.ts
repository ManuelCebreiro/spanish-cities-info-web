import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://cities.manuelcebreiro.com",
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
