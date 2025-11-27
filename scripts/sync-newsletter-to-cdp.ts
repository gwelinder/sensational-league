#!/usr/bin/env tsx
/**
 * Sync SharePoint Newsletter Subscribers to CDP
 * 
 * Fetches all existing newsletter subscriptions from SharePoint
 * and creates/updates corresponding entries in the Sanity CDP.
 * 
 * Run with: pnpm sync:newsletter-to-cdp
 */

import { resolve } from "node:path";
import * as dotenv from "dotenv";

// Load .env.local file BEFORE any other imports
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

// Now import modules that depend on env vars
import { getGraphClient } from "../src/lib/sharepoint/graphClient";
import { createClient } from "@sanity/client";

interface SharePointListItem {
  id: string;
  fields: {
    Title?: string;
    Email?: string;
    Status?: string;
    Source?: string;
    SubscribedAt?: string;
    ConsentGiven?: boolean;
    ConsentTimestamp?: string;
    [key: string]: unknown;
  };
}

interface GraphListItemsResponse {
  value: SharePointListItem[];
  "@odata.nextLink"?: string;
}

// Create Sanity client
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function fetchAllNewsletterSubscribers(): Promise<SharePointListItem[]> {
  const siteId = process.env.SHAREPOINT_SITE_ID;
  const listId = process.env.SHAREPOINT_NEWSLETTER_LIST_ID;

  if (!siteId || !listId) {
    throw new Error(
      "Missing SHAREPOINT_SITE_ID or SHAREPOINT_NEWSLETTER_LIST_ID in .env.local"
    );
  }

  const client = getGraphClient();
  const allItems: SharePointListItem[] = [];

  // Fetch all items with pagination
  let url = `/sites/${siteId}/lists/${listId}/items?$expand=fields&$top=100`;

  while (url) {
    console.log(`📥 Fetching items...`);
    const response: GraphListItemsResponse = await client.api(url).get();

    if (response.value) {
      allItems.push(...response.value);
      console.log(`   Found ${response.value.length} items (total: ${allItems.length})`);
    }

    // Check for pagination
    if (response["@odata.nextLink"]) {
      // Extract just the path from the full URL
      const nextUrl = new URL(response["@odata.nextLink"]);
      url = nextUrl.pathname + nextUrl.search;
    } else {
      url = "";
    }
  }

  return allItems;
}

async function syncNewsletterSubscribersToCDP(items: SharePointListItem[]) {
  let created = 0;
  let updated = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const item of items) {
    const email = item.fields?.Email || item.fields?.Title;
    
    if (!email) {
      console.log(`   ⚠️ Skipping item ${item.id}: no email`);
      continue;
    }

    try {
      // Check if subscriber already exists in Sanity
      const existing = await sanityClient.fetch(
        `*[_type == "newsletterSubscriber" && email == $email][0]`,
        { email: email.toLowerCase() }
      );

      // Also check if there's a linked draft applicant
      const linkedApplicant = await sanityClient.fetch(
        `*[_type == "draftApplicant" && email == $email][0]{ _id }`,
        { email: email.toLowerCase() }
      );

      const subscriberData = {
        _type: "newsletterSubscriber",
        email: email.toLowerCase(),
        status: mapStatus(item.fields?.Status),
        source: mapSource(item.fields?.Source),
        subscribedAt: item.fields?.SubscribedAt || new Date().toISOString(),
        consentGiven: item.fields?.ConsentGiven ?? true,
        consentTimestamp: item.fields?.ConsentTimestamp,
        sharePointId: item.id,
        lastSyncedAt: new Date().toISOString(),
        ...(linkedApplicant?._id && {
          linkedApplicant: { _type: "reference", _ref: linkedApplicant._id },
        }),
      };

      if (existing) {
        // Update existing subscriber
        await sanityClient
          .patch(existing._id)
          .set(subscriberData)
          .commit();
        updated++;
        console.log(`   🔄 Updated: ${email}`);
      } else {
        // Create new subscriber
        await sanityClient.create(subscriberData);
        created++;
        console.log(`   ✅ Created: ${email}`);
      }
    } catch (error) {
      failed++;
      const msg = `Failed to sync ${email}: ${error instanceof Error ? error.message : "Unknown error"}`;
      errors.push(msg);
      console.log(`   ❌ ${msg}`);
    }
  }

  return { created, updated, failed, errors };
}

function mapStatus(spStatus?: string): string {
  if (!spStatus) return "active";
  
  const statusMap: Record<string, string> = {
    "Active": "active",
    "Unsubscribed": "unsubscribed",
    "Bounced": "bounced",
    "Complained": "complained",
  };
  
  return statusMap[spStatus] || "active";
}

function mapSource(spSource?: string): string {
  if (!spSource) return "unknown";
  
  const sourceMap: Record<string, string> = {
    "homepage-header": "homepage-header",
    "homepage-footer": "homepage-footer",
    "footer": "footer",
    "player-draft": "player-draft",
    "press": "press",
    "manual": "manual",
  };
  
  return sourceMap[spSource.toLowerCase()] || spSource.toLowerCase() || "unknown";
}

async function main() {
  console.log("🔄 Syncing SharePoint Newsletter Subscribers to CDP...\n");

  // Check required env vars
  const requiredVars = [
    "SHAREPOINT_SITE_ID",
    "SHAREPOINT_NEWSLETTER_LIST_ID",
    "AZURE_TENANT_ID",
    "AZURE_CLIENT_ID",
    "AZURE_CLIENT_SECRET",
    "NEXT_PUBLIC_SANITY_PROJECT_ID",
    "NEXT_PUBLIC_SANITY_DATASET",
    "SANITY_API_TOKEN",
  ];

  const missing = requiredVars.filter((v) => !process.env[v]);
  if (missing.length > 0) {
    console.error("❌ Missing environment variables:", missing.join(", "));
    process.exit(1);
  }

  try {
    // Fetch all items from SharePoint
    const items = await fetchAllNewsletterSubscribers();
    console.log(`\n📋 Found ${items.length} total subscribers in SharePoint\n`);

    if (items.length === 0) {
      console.log("No items to sync.");
      return;
    }

    console.log(`📤 Syncing ${items.length} subscribers to CDP...\n`);

    // Sync to CDP
    const result = await syncNewsletterSubscribersToCDP(items);

    console.log("\n✨ Sync complete!");
    console.log(`   ✅ Created: ${result.created}`);
    console.log(`   🔄 Updated: ${result.updated}`);
    if (result.failed > 0) {
      console.log(`   ❌ Failed: ${result.failed}`);
      console.log("\nErrors:");
      for (const error of result.errors) {
        console.log(`   - ${error}`);
      }
    }

    console.log("\n📊 Next steps:");
    console.log("   1. View subscribers in Sanity Studio → CDP → Newsletter Subscribers");
    console.log("   2. Evaluate segments: POST /api/cdp?action=sync-segments");

  } catch (error) {
    console.error("❌ Sync failed:", error);
    process.exit(1);
  }
}

main();
