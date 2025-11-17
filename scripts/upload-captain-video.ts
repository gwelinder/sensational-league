import { S3Client, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

interface CliArgs {
	file?: string;
	slug?: string;
	key?: string;
	force?: boolean;
}

const MIME_TYPES: Record<string, string> = {
	".mp4": "video/mp4",
	".webm": "video/webm",
	".mov": "video/quicktime",
};

const usage = `\nUpload a captain intro video to Cloudflare R2 and get a Worker URL.\n\nUsage:\n  pnpm upload:captain-video --file path/to/video.mp4 --slug captain-name\n\nOptions:\n  --file, -f   Path to the local video file (required)\n  --slug, -s   Captain slug (defaults to the sanitized filename)\n  --key, -k    Optional custom R2 object key\n  --force      Overwrite if the object already exists\n  --help, -h   Show this message\n`;

function parseArgs(argv: string[]): CliArgs {
	const args: CliArgs = {};
	for (let i = 0; i < argv.length; i += 1) {
		const current = argv[i];
		switch (current) {
			case "--file":
			case "-f":
				args.file = argv[i + 1];
				i += 1;
				break;
			case "--slug":
			case "-s":
				args.slug = argv[i + 1];
				i += 1;
				break;
			case "--key":
			case "-k":
				args.key = argv[i + 1];
				i += 1;
				break;
			case "--force":
				args.force = true;
				break;
			case "--help":
			case "-h":
				console.log(usage);
				process.exit(0);
			default:
				if (!current.startsWith("-")) {
					args.file = args.file ?? current;
				}
				break;
		}
	}
	return args;
}

function assertEnv(key: string, fallback?: string): string {
	const value = process.env[key] ?? fallback;
	if (!value) {
		throw new Error(`Missing required env var ${key}. Add it to .env.local.`);
	}
	return value;
}

function slugify(input: string): string {
	return input
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		|| "captain";
}

function formatBytes(size: number): string {
	if (!Number.isFinite(size)) return `${size}`;
	if (size < 1024) return `${size} B`;
	const units = ["KB", "MB", "GB", "TB"];
	let value = size / 1024;
	let unitIndex = 0;
	while (value >= 1024 && unitIndex < units.length - 1) {
		value /= 1024;
		unitIndex += 1;
	}
	return `${value.toFixed(1)} ${units[unitIndex]}`;
}

async function ensureWritable(
	client: S3Client,
	bucket: string,
	key: string,
	force?: boolean,
) {
	try {
		await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
		if (!force) {
			throw new Error(
				`Object ${key} already exists in bucket ${bucket}. Re-run with --force to overwrite.`,
			);
		}
		console.warn(`⚠️  ${key} exists and will be overwritten.`);
	} catch (error) {
		const message = (error as Error).message || "";
		if (
			message.includes("Not Found") ||
			message.includes("404") ||
			(error as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode === 404
		) {
			return;
		}
		if (message.includes("Object") && message.includes("already exists")) {
			throw error;
		}
		throw error;
	}
}

async function main() {
	const args = parseArgs(process.argv.slice(2));
	if (!args.file) {
		console.error("❌ Missing --file path");
		console.log(usage);
		process.exit(1);
	}

	const accountId = assertEnv("R2_ACCOUNT_ID", process.env.CLOUDFLARE_ACCOUNT_ID);
	const accessKeyId = assertEnv("R2_ACCESS_KEY_ID");
	const secretAccessKey = assertEnv("R2_SECRET_ACCESS_KEY");
	const bucket = process.env.R2_CAPTAIN_BUCKET || "sensational-hero-videos";
	const publicBase = (process.env.R2_CAPTAIN_PUBLIC_BASE ||
		"https://sensational-hero-video.generaite.workers.dev").replace(/\/+$/, "");

	const resolvedPath = path.resolve(process.cwd(), args.file);
	const stats = await stat(resolvedPath);
	if (!stats.isFile()) {
		throw new Error(`${resolvedPath} is not a file.`);
	}

	const originalExt = path.extname(resolvedPath) || ".mp4";
	const normalizedExt = originalExt.startsWith(".")
		? originalExt.toLowerCase()
		: `.${originalExt.toLowerCase()}`;
	const contentType = MIME_TYPES[normalizedExt] || "application/octet-stream";
	const derivedSlug = slugify(args.slug || path.basename(resolvedPath, originalExt));
	const key = args.key || `captains/${derivedSlug}${normalizedExt}`;

	const client = new S3Client({
		region: "auto",
		endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
		credentials: {
			accessKeyId,
			secretAccessKey,
		},
	});

	await ensureWritable(client, bucket, key, args.force);

	console.log(`⬆️  Uploading ${path.basename(resolvedPath)} (${formatBytes(stats.size)})...`);
	await client.send(
		new PutObjectCommand({
			Bucket: bucket,
			Key: key,
			Body: createReadStream(resolvedPath),
			ContentType: contentType,
			CacheControl: "public, max-age=31536000, immutable",
		}),
	);

	const workerPath = key.replace(/^\/+/, "");
	const extensionlessPath = workerPath.replace(/\.[^.]+$/, "");
	const extensionlessUrl = `${publicBase}/${extensionlessPath}`;
	const fileUrl = `${publicBase}/${workerPath}`;

	console.log("✅ Upload complete");
	console.log(`🎥 Worker URL (recommended): ${extensionlessUrl}`);
	console.log(`📽️ Direct file URL: ${fileUrl}`);
	console.log(`📦 R2 object key: ${bucket}/${key}`);
}

main().catch((error) => {
	console.error("❌ Upload failed:", error instanceof Error ? error.message : error);
	process.exit(1);
});
