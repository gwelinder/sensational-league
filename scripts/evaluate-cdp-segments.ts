#!/usr/bin/env tsx
/**
 * Run segment evaluation for all CDP applicants
 * 
 * Run with: pnpm cdp:evaluate-segments
 */

import { resolve } from "node:path";
import * as dotenv from "dotenv";

// Load .env.local file BEFORE any other imports
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

// Now import modules that depend on env vars
import { evaluateAllSegments } from "../src/lib/cdp/segmentEvaluator";

async function main() {
  console.log("🔄 Evaluating all CDP segments...\n");

  try {
    const results = await evaluateAllSegments();

    console.log("✨ Segment evaluation complete!\n");
    console.log("Results:");
    
    for (const result of results) {
      const changes = result.added.length + result.removed.length;
      console.log(
        `   ${result.segmentName}: ${result.members.length} members` +
        (changes > 0 ? ` (+${result.added.length} / -${result.removed.length})` : "")
      );
    }

    const totalMembers = results.reduce((sum, r) => sum + r.members.length, 0);
    const totalAdded = results.reduce((sum, r) => sum + r.added.length, 0);
    const totalRemoved = results.reduce((sum, r) => sum + r.removed.length, 0);

    console.log(`\n📊 Summary:`);
    console.log(`   Segments evaluated: ${results.length}`);
    console.log(`   Total memberships: ${totalMembers}`);
    console.log(`   Added: ${totalAdded}`);
    console.log(`   Removed: ${totalRemoved}`);

  } catch (error) {
    console.error("❌ Segment evaluation failed:", error);
    process.exit(1);
  }
}

main();
