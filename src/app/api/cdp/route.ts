/**
 * CDP API Route - Handles CDP operations
 * 
 * Endpoints:
 * GET /api/cdp/stats - Get CDP statistics
 * POST /api/cdp/sync-segments - Evaluate and sync all segments
 * POST /api/cdp/sync-resend - Sync all segments to Resend
 * POST /api/cdp/process-flows - Process pending flow steps
 */

import { NextRequest, NextResponse } from "next/server";
import {
  getCDPStats,
  evaluateAllSegments,
  syncAllSegmentsToResend,
  processPendingFlowSteps,
} from "@/lib/cdp";

// Verify API key for protected operations
function verifyApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key");
  const expectedKey = process.env.CDP_API_KEY;
  
  if (!expectedKey) {
    console.warn("CDP_API_KEY not set - API calls will be rejected");
    return false;
  }
  
  return apiKey === expectedKey;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  try {
    switch (action) {
      case "stats": {
        const stats = await getCDPStats();
        return NextResponse.json({ success: true, data: stats });
      }
      
      default:
        return NextResponse.json(
          { success: false, error: "Unknown action. Use ?action=stats" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("CDP API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Verify API key for write operations
  if (!verifyApiKey(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  try {
    switch (action) {
      case "sync-segments": {
        console.log("Starting segment evaluation...");
        const results = await evaluateAllSegments();
        console.log(`Evaluated ${results.length} segments`);
        
        return NextResponse.json({
          success: true,
          data: {
            segmentsEvaluated: results.length,
            results: results.map((r) => ({
              segment: r.segmentName,
              members: r.members.length,
              added: r.added.length,
              removed: r.removed.length,
            })),
          },
        });
      }

      case "sync-resend": {
        console.log("Starting Resend sync...");
        const results = await syncAllSegmentsToResend();
        console.log(`Synced ${results.synced} segments, ${results.failed} failed`);
        
        return NextResponse.json({
          success: results.failed === 0,
          data: results,
        });
      }

      case "process-flows": {
        console.log("Processing pending flow steps...");
        const results = await processPendingFlowSteps();
        console.log(`Processed ${results.processed} steps`);
        
        return NextResponse.json({
          success: results.errors.length === 0,
          data: results,
        });
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error:
              "Unknown action. Use ?action=sync-segments, sync-resend, or process-flows",
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("CDP API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
