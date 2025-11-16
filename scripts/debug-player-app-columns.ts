#!/usr/bin/env tsx
import process from "node:process";

import { getGraphClient } from "../src/lib/sharepoint/graphClient";

async function main() {
	const siteId = process.env.SHAREPOINT_SITE_ID;
	const listId = process.env.SHAREPOINT_PLAYER_APPLICATIONS_LIST_ID;
	if (!siteId || !listId) {
		throw new Error("SHAREPOINT_SITE_ID and SHAREPOINT_PLAYER_APPLICATIONS_LIST_ID must be set");
	}

	const client = getGraphClient();
	const { value } = await client.api(`/sites/${siteId}/lists/${listId}/columns`).get();
	const targets = new Set([
		"Title",
		"City",
		"Age group",
		"Highest level",
		"Preferred position",
		"Currently active club?",
		"Active club name",
		"Previously active club?",
		"Past club names",
		"Superpower",
		"Player idol",
		"Fun & success definition",
		"Active SoMe?",
		"Social media platforms",
		"Social media handles",
		"Interest if not selected",
		"STATUS",
	]);

	for (const column of value) {
		if (!targets.has(column.displayName ?? "")) {
			continue;
		}
		console.log("\n===", column.displayName, "===");
		console.log(JSON.stringify(column, null, 2));
	}
}

void main();
