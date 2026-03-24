import type { MetadataRoute } from "next";
import { getAllCategories, getAllPostMeta, getAllTags } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const postPages: MetadataRoute.Sitemap = getAllPostMeta().map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = getAllCategories().map((category) => ({
    url: `${SITE_URL}/category/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const tagPages: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${SITE_URL}/tag/${tag.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...postPages, ...categoryPages, ...tagPages];
}
