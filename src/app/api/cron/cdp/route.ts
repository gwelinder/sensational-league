/**
 * CDP Cron Job Endpoint
 * 
 * This endpoint is designed to be called by Vercel Cron or other schedulers
 * to process pending email flows.
 * 
 * Recommended schedule: Every 5 minutes
 * 
 * Vercel cron configuration (in vercel.json):
 * ```json
 * {
 *   "crons": [{
 *     "path": "/api/cron/cdp",
 *     "schedule": "* /5 * * * *"
 *   }]
 * }
 * ```
 * 
 * Security: Uses CRON_SECRET environment variable for authentication
 */

import { NextRequest, NextResponse } from "next/server";
import {
  processPendingFlowSteps,
  evaluateAllSegments,
} from "@/lib/cdp";

// Verify cron secret
function verifyCronAuth(request: NextRequest): boolean {
  // Vercel automatically adds this header for cron jobs
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  
  // If no CRON_SECRET set, reject all requests
  if (!cronSecret) {
    console.warn("CRON_SECRET not set - cron job rejected");
    return false;
  }
  
  // Check Bearer token
  if (authHeader === `Bearer ${cronSecret}`) {
    return true;
  }
  
  // Also check x-cron-secret header for flexibility
  const cronHeader = request.headers.get("x-cron-secret");
  if (cronHeader === cronSecret) {
    return true;
  }
  
  return false;
}

export async function GET(request: NextRequest) {
  // Verify authentication
  if (!verifyCronAuth(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const startTime = Date.now();
  const results: Record<string, unknown> = {};

  try {
    // Process pending email flow steps
    console.log("[CRON] Processing pending flow steps...");
    const flowResults = await processPendingFlowSteps();
    results.flows = {
      processed: flowResults.processed,
      emailsSent: flowResults.emailsSent,
      errors: flowResults.errors.length,
    };
    console.log(`[CRON] Processed ${flowResults.processed} flow steps, sent ${flowResults.emailsSent} emails`);

    // Optionally re-evaluate segments (every hour)
    const now = new Date();
    if (now.getMinutes() === 0) {
      console.log("[CRON] Running hourly segment evaluation...");
      const segmentResults = await evaluateAllSegments();
      results.segments = {
        evaluated: segmentResults.length,
        totalAdded: segmentResults.reduce((sum, r) => sum + r.added.length, 0),
        totalRemoved: segmentResults.reduce((sum, r) => sum + r.removed.length, 0),
      };
      console.log(`[CRON] Evaluated ${segmentResults.length} segments`);
    }

    const duration = Date.now() - startTime;
    console.log(`[CRON] Completed in ${duration}ms`);

    return NextResponse.json({
      success: true,
      data: {
        ...results,
        durationMs: duration,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("[CRON] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        durationMs: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

// Also support POST for flexibility
export const POST = GET;
