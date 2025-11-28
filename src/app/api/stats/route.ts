/**
 * Public Stats API - Returns non-sensitive statistics for display
 * 
 * GET /api/stats - Returns public statistics
 * 
 * No authentication required - only returns non-sensitive aggregate data.
 */

import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

// Create a read-only client for public stats
function getPublicClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  
  if (!projectId || !dataset) {
    throw new Error("Missing Sanity configuration");
  }
  
  return createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: true, // Use CDN for public reads
    // No token needed for read-only public data
  });
}

export async function GET() {
  try {
    const client = getPublicClient();
    
    // Fetch only non-sensitive aggregate statistics
    const stats = await client.fetch(`{
      "draftApplicants": count(*[_type == "draftApplicant"]),
      "newsletterSubscribers": count(*[_type == "newsletterSubscriber"]),
      "pressReleases": count(*[_type == "pressRelease"]),
      "captains": count(*[_type == "captain"]),
      "communityChalllenges": count(*[_type == "communityChallenge"])
    }`);
    
    return NextResponse.json({
      success: true,
      data: {
        applicantCount: stats.draftApplicants || 0,
        subscriberCount: stats.newsletterSubscribers || 0,
        pressReleaseCount: stats.pressReleases || 0,
        captainCount: stats.captains || 0,
        challengeCount: stats.communityChalllenges || 0,
        // Add a timestamp for caching purposes
        fetchedAt: new Date().toISOString(),
      },
    }, {
      headers: {
        // Cache for 5 minutes
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
