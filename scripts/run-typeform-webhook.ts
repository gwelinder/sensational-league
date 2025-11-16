#!/usr/bin/env tsx
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import {
	handleTypeformWebhook,
	type HandleTypeformWebhookDeps,
} from "../src/lib/typeform/handleTypeformWebhook";

interface CLIOptions {
	payloadPath?: string;
	signature?: string;
	secret?: string;
	listId?: string;
	formId?: string;
	skipSignature?: boolean;
	dryRun?: boolean;
	pretty?: boolean;
}

function parseArgs(argv: string[]): CLIOptions {
	const options: CLIOptions = {};
	for (let i = 0; i < argv.length; i += 1) {
		const arg = argv[i];
		switch (arg) {
			case "-p":
			case "--payload":
				options.payloadPath = argv[++i];
				break;
			case "-s":
			case "--signature":
				options.signature = argv[++i];
				break;
			case "--secret":
				options.secret = argv[++i];
				break;
			case "--list-id":
				options.listId = argv[++i];
				break;
			case "--form-id":
				options.formId = argv[++i];
				break;
			case "--skip-signature":
				options.skipSignature = true;
				break;
			case "--dry-run":
				options.dryRun = true;
				break;
			case "--pretty":
				options.pretty = true;
				break;
			case "-h":
			case "--help":
				printHelp();
				process.exit(0);
				break;
			default:
				if (arg.startsWith("-")) {
					throw new Error(`Unknown flag: ${arg}`);
				}
		}
	}
	return options;
}

function printHelp() {
	console.log(`Usage: pnpm typeform:webhook --payload ./payload.json [options]

Options:
  -p, --payload <path>    JSON payload file (defaults to stdin if omitted)
  -s, --signature <sig>   Provide a Typeform-Signature header value
      --secret <value>    Override TYPEFORM_PLAYERDRAFT_SECRET env when computing signature
      --list-id <id>      Override SharePoint list ID
      --form-id <id>      Override expected Typeform form ID
      --skip-signature    Skip signature verification (useful for local mocks)
      --dry-run           Stub SharePoint + email integrations
      --pretty            Pretty-print JSON output
  -h, --help              Show this message
`);
}

async function readPayloadBuffer(payloadPath?: string): Promise<Buffer> {
	if (payloadPath) {
		const resolved = path.resolve(payloadPath);
		return fs.promises.readFile(resolved);
	}
	const chunks: Buffer[] = [];
	for await (const chunk of process.stdin) {
		chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
	}
	if (!chunks.length) {
		throw new Error("No payload provided. Pass --payload or pipe JSON via stdin.");
	}
	return Buffer.concat(chunks);
}

function computeSignature(body: Buffer, secret: string): string {
	return `sha256=${crypto.createHmac("sha256", secret).update(body).digest("base64")}`;
}

function createDryRunDeps(): HandleTypeformWebhookDeps {
	return {
		async createSharePointListItem({ listId, fields }) {
			console.log("[dry-run] createSharePointListItem", { listId, fieldCount: Object.keys(fields).length });
			console.dir(fields, { depth: 4 });
			return { id: "dry-run-item" };
		},
		async sendPlayerDraftThankYou({ email, fullName, positionPreference }) {
			console.log("[dry-run] sendPlayerDraftThankYou", {
				email,
				fullName,
				positionPreference,
			});
			return true;
		},
	};
}

async function main() {
	try {
		const options = parseArgs(process.argv.slice(2));
		const rawBody = await readPayloadBuffer(options.payloadPath);
		const deps = options.dryRun ? createDryRunDeps() : undefined;
		let secret: string | null = options.skipSignature
			? null
			: options.secret ?? process.env.TYPEFORM_PLAYERDRAFT_SECRET ?? null;
		let signatureHeader: string | null = null;

		if (!options.skipSignature && secret) {
			signatureHeader = options.signature ?? computeSignature(rawBody, secret);
		} else if (!options.skipSignature && !secret) {
			console.warn("⚠️ No Typeform secret available. Falling back to skip signature mode.");
			secret = null;
		}

		const result = await handleTypeformWebhook(rawBody, signatureHeader, {
			deps,
			env: {
				typeformSecret: secret,
				expectedFormId: options.formId,
				sharePointListId: options.listId,
			},
		});

		const formattedBody = options.pretty
			? JSON.stringify(result.body, null, 2)
			: JSON.stringify(result.body);
		console.log(`Status: ${result.status}`);
		console.log(formattedBody);
		if (result.status >= 400) {
			process.exitCode = 1;
		}
	} catch (error) {
		console.error("❌ typeform:webhook script failed:", error);
		process.exitCode = 1;
	}
}

void main();
