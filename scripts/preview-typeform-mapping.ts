#!/usr/bin/env tsx
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import {
	mapPlayerDraftResponse,
	type TypeformFormResponse,
} from "../src/lib/typeform/typeformSharePointMapper";

interface CLIOptions {
	payloadPath?: string;
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
	console.log(`Usage: pnpm typeform:map --payload ./payload.json [--pretty]

Reads a Typeform webhook payload (either full event or form_response) and prints how it maps into SharePoint fields.
`);
}

async function readPayload(payloadPath?: string): Promise<unknown> {
	const buffer = payloadPath
		? await fs.promises.readFile(path.resolve(payloadPath))
		: await readStdin();
	return JSON.parse(buffer.toString("utf8"));
}

async function readStdin(): Promise<Buffer> {
	const chunks: Buffer[] = [];
	for await (const chunk of process.stdin) {
		chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
	}
	if (!chunks.length) {
		throw new Error("No payload provided. Pass --payload or pipe JSON via stdin.");
	}
	return Buffer.concat(chunks);
}

function toFormResponse(payload: unknown): TypeformFormResponse {
	if (payload && typeof payload === "object" && "form_response" in payload) {
		return (payload as { form_response: TypeformFormResponse }).form_response;
	}
	return payload as TypeformFormResponse;
}

async function main() {
	try {
		const options = parseArgs(process.argv.slice(2));
		const payload = await readPayload(options.payloadPath);
		const formResponse = toFormResponse(payload);
		const result = mapPlayerDraftResponse(formResponse);
		const output = {
			fieldCount: Object.keys(result.fields).length,
			fields: result.fields,
			email: result.email,
			fullName: result.fullName,
			missingRequired: result.missingRequired,
			unmappedRefs: result.unmappedRefs,
		};
		console.log(JSON.stringify(output, null, options.pretty ? 2 : undefined));
	} catch (error) {
		console.error("❌ typeform:map script failed:", error);
		process.exitCode = 1;
	}
}

void main();
