#!/usr/bin/env tsx
/**
 * Sync SharePoint Player Applications to CDP
 * 
 * Fetches all existing player draft submissions from SharePoint
 * and creates/updates corresponding entries in the Sanity CDP.
 * 
 * Run with: pnpm sync:sharepoint-to-cdp
 */

import { resolve } from "node:path";
import * as dotenv from "dotenv";

// Load .env.local file BEFORE any other imports
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

// Now import modules that depend on env vars
import { getGraphClient } from "../src/lib/sharepoint/graphClient";
import { batchSyncFromSharePoint } from "../src/lib/cdp/syncFromTypeform";

interface SharePointListItem {
  id: string;
  fields: {
    Title?: string;
    E_x002d_mail?: string; // Email
    City?: string;
    Agegroup?: string;
    Highestlevel?: string;
    Preferredposition?: string | string[];
    Currentlyactiveclub_x003f_?: boolean;
    Activeclubname?: string;
    Previouslyactiveclub_x003f_?: boolean;
    Pastclubnames?: string;
    Superpower?: string;
    Playeridol?: string;
    Areyouactiveonsocialmediaplatfor?: boolean;
    Socialmediaplatforms?: string;
    Socialmediahandles?: string;
    Interestifnotselected?: string;
    Phonenumber?: string;
    STATUS?: string;
    SubmittedAt?: string;
    [key: string]: unknown;
  };
}

interface GraphListItemsResponse {
  value: SharePointListItem[];
  "@odata.nextLink"?: string;
}

async function fetchAllSharePointItems(): Promise<SharePointListItem[]> {
  const siteId = process.env.SHAREPOINT_SITE_ID;
  const listId = process.env.SHAREPOINT_PLAYER_APPLICATIONS_LIST_ID;

  if (!siteId || !listId) {
    throw new Error(
      "Missing SHAREPOINT_SITE_ID or SHAREPOINT_PLAYER_APPLICATIONS_LIST_ID in .env.local"
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

function parsePositions(positionString?: string): string[] | undefined {
  if (!positionString) return undefined;
  
  // Handle both comma-separated and array formats
  if (positionString.startsWith("[")) {
    try {
      return JSON.parse(positionString);
    } catch {
      // Fall through to comma split
    }
  }
  
  return positionString.split(",").map((p) => p.trim()).filter(Boolean);
}

function parseInterests(interestString?: string): string[] | undefined {
  if (!interestString) return undefined;
  
  // Handle both comma-separated and array formats
  if (interestString.startsWith("[")) {
    try {
      return JSON.parse(interestString);
    } catch {
      // Fall through to comma split
    }
  }
  
  return interestString.split(",").map((i) => i.trim()).filter(Boolean);
}

function mapSharePointStatus(spStatus?: string): string {
  if (!spStatus) return "new";
  
  const statusMap: Record<string, string> = {
    "Submitted": "new",
    "New": "new",
    "Under Review": "under_review",
    "Shortlisted": "shortlisted",
    "Invited to Trial": "invited_trial",
    "Trial Completed": "trial_completed",
    "Selected": "selected",
    "Waitlisted": "waitlisted",
    "Not Selected": "not_selected",
    "Rejected": "not_selected",
    "Withdrawn": "withdrawn",
  };
  
  return statusMap[spStatus] || "new";
}

async function main() {
  console.log("🔄 Syncing SharePoint Player Applications to CDP...\n");

  // Check required env vars
  const requiredVars = [
    "SHAREPOINT_SITE_ID",
    "SHAREPOINT_PLAYER_APPLICATIONS_LIST_ID",
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
    const items = await fetchAllSharePointItems();
    console.log(`\n📋 Found ${items.length} total items in SharePoint\n`);

    if (items.length === 0) {
      console.log("No items to sync.");
      return;
    }

    // Transform SharePoint items to CDP format
    const applicants = items
      .filter((item) => item.fields?.E_x002d_mail) // Only items with email
      .map((item) => {
        const f = item.fields;
        const nameParts = f.Title?.split(" ") || [];
        return {
          sharePointId: item.id,
          email: f.E_x002d_mail!,
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(" ") || undefined,
          city: f.City,
          ageGroup: f.Agegroup,
          highestLevel: f.Highestlevel,
          preferredPositions: parsePositions(
            Array.isArray(f.Preferredposition) 
              ? f.Preferredposition.join(",") 
              : f.Preferredposition
          ),
          currentlyActive: f.Currentlyactiveclub_x003f_,
          activeClubName: f.Activeclubname,
          previouslyActive: f.Previouslyactiveclub_x003f_,
          pastClubNames: f.Pastclubnames,
          superpower: f.Superpower,
          playerIdol: f.Playeridol,
          socialMediaActive: f.Areyouactiveonsocialmediaplatfor,
          socialMediaPlatforms: f.Socialmediaplatforms?.split(",").map((s) => s.trim()),
          socialMediaHandles: f.Socialmediahandles,
          interestIfNotSelected: parseInterests(f.Interestifnotselected),
          status: mapSharePointStatus(f.STATUS),
          submittedAt: f.SubmittedAt,
        };
      });

    console.log(`📤 Syncing ${applicants.length} applicants to CDP...\n`);

    // Batch sync to CDP
    const result = await batchSyncFromSharePoint(applicants);

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
    console.log("   1. View applicants in Sanity Studio → CDP → Applicants");
    console.log("   2. Evaluate segments: POST /api/cdp?action=sync-segments");
    console.log("   3. Process pending flows: POST /api/cdp?action=process-flows");
  } catch (error) {
    console.error("❌ Sync failed:", error);
    process.exit(1);
  }
}

main();
