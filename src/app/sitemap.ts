/** sitemap.ts  -  List of pages for search engines. Auto-served at /sitemap.xml */
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/process", "/about", "/careers", "/contact", "/privacy-policy", "/terms"];
  return pages.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
