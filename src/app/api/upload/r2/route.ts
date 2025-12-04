import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET = process.env.R2_CAPTAIN_BUCKET || "sensational-hero-videos";
const R2_PUBLIC_BASE = process.env.R2_CAPTAIN_PUBLIC_BASE || "https://sensational-hero-video.generaite.workers.dev";

// Simple API key check for Studio uploads
const UPLOAD_API_KEY = process.env.UPLOAD_API_KEY || process.env.CDP_API_KEY;

function getR2Client() {
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    throw new Error("R2 credentials not configured");
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

// Generate a presigned URL for direct browser upload
export async function POST(request: NextRequest) {
  try {
    // Check API key from header
    const apiKey = request.headers.get("x-api-key");
    if (!UPLOAD_API_KEY || apiKey !== UPLOAD_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { filename, contentType, folder = "captains" } = body;

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: "Missing filename or contentType" },
        { status: 400 }
      );
    }

    // Sanitize filename and create path
    const sanitizedFilename = filename
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-")
      .replace(/-+/g, "-");

    const timestamp = Date.now();
    const key = `${folder}/${timestamp}-${sanitizedFilename}`;

    const client = getR2Client();

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      ContentType: contentType,
    });

    // Generate presigned URL valid for 10 minutes
    const presignedUrl = await getSignedUrl(client, command, { expiresIn: 600 });

    // The public URL after upload completes
    const publicUrl = `${R2_PUBLIC_BASE}/${key}`;

    return NextResponse.json({
      presignedUrl,
      publicUrl,
      key,
    });
  } catch (error) {
    console.error("R2 presign error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}

// Health check / config check
export async function GET() {
  const configured = !!(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY);

  return NextResponse.json({
    configured,
    bucket: R2_BUCKET,
    publicBase: R2_PUBLIC_BASE,
  });
}
