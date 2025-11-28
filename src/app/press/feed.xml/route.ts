/**
 * RSS Feed for Press Releases
 * 
 * Accessible at /press/feed.xml
 * 
 * This generates a standard RSS 2.0 feed for media monitoring services
 * and news aggregators to subscribe to press releases.
 */

import { createClient } from "@sanity/client";
import type { PortableTextBlock } from "@portabletext/types";

interface PressRelease {
  _id: string;
  title: string;
  slug: { current: string };
  publishDate: string;
  headlineDa: string;
  subheadlineDa?: string;
  headlineEn?: string;
  subheadlineEn?: string;
  contentEn?: PortableTextBlock[];
  contentDa: PortableTextBlock[];
}

// Extract plain text from portable text blocks
function portableTextToPlainText(blocks: PortableTextBlock[] | undefined): string {
  if (!blocks) return "";
  
  return blocks
    .filter((block) => block._type === "block")
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return (block.children as Array<{ text?: string }>)
        .map((child) => child.text || "")
        .join("");
    })
    .join("\n\n")
    .slice(0, 500); // Limit description length
}

// Escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  
  if (!projectId || !dataset) {
    return new Response("Configuration error", { status: 500 });
  }
  
  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: true,
  });

  const pressReleases: PressRelease[] = await client.fetch(`
    *[_type == "pressRelease"] | order(publishDate desc)[0...20] {
      _id,
      title,
      slug,
      publishDate,
      headlineDa,
      subheadlineDa,
      headlineEn,
      subheadlineEn,
      contentEn,
      contentDa
    }
  `);

  const siteUrl = "https://sensationalleague.com";
  const feedUrl = `${siteUrl}/press/feed.xml`;

  const items = pressReleases.map((release) => {
    // Prefer English for international RSS readers
    const title = escapeXml(release.headlineEn || release.headlineDa);
    const description = escapeXml(
      release.subheadlineEn || 
      release.subheadlineDa || 
      portableTextToPlainText(release.contentEn || release.contentDa)
    );
    const pubDate = new Date(release.publishDate).toUTCString();
    const link = `${siteUrl}/press`;
    const guid = `${siteUrl}/press#${release._id}`;

    return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="false">${guid}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      <category>Press Release</category>
    </item>`;
  }).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sensational League - Press Releases</title>
    <link>${siteUrl}/press</link>
    <description>Official press releases from Sensational League - the revolutionary women's 7v7 football league combining athletic excellence with social impact.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/logos/SL-PRIMARY%20LOCKUP.png</url>
      <title>Sensational League</title>
      <link>${siteUrl}</link>
    </image>
    <copyright>Copyright ${new Date().getFullYear()} Saga Sports Group</copyright>
    <managingEditor>info@sensationalleague.com (Sensational League)</managingEditor>
    <webMaster>info@sensationalleague.com (Sensational League)</webMaster>
    <ttl>60</ttl>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
