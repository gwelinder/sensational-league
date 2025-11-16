#!/usr/bin/env tsx
import process from "node:process";

import { getGraphClient } from "../src/lib/sharepoint/graphClient";

async function main() {
	const siteId = process.env.SHAREPOINT_SITE_ID;
	const listId = process.env.SHAREPOINT_PLAYER_APPLICATIONS_LIST_ID;
	const itemId = process.argv[2];

	if (!siteId || !listId) {
		throw new Error("Missing SharePoint site/list env vars");
	}

	if (!itemId) {
		throw new Error("Usage: pnpm exec tsx scripts/delete-player-app-item.ts <itemId>");
	}

	const path = `/sites/${siteId}/lists/${listId}/items/${itemId}`;
	await getGraphClient().api(path).delete();
	console.log(`Deleted PlayerApplications item ${itemId}`);
}

void main();
