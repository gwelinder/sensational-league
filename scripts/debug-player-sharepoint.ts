#!/usr/bin/env tsx
import fs from "node:fs";
import path from "node:path";

import { createSharePointListItem } from "../src/lib/sharepoint/saveListItem";
import { getGraphClient } from "../src/lib/sharepoint/graphClient";
import { mapPlayerDraftResponse } from "../src/lib/typeform/typeformSharePointMapper";

async function main() {
	const siteId = process.env.SHAREPOINT_SITE_ID;
	const listId = process.env.SHAREPOINT_PLAYER_APPLICATIONS_LIST_ID;
	if (!siteId || !listId) {
		throw new Error("SharePoint site/list env vars missing");
	}

	const samplePath = path.resolve("scripts/sample-data/typeform-player-draft.json");
	const payload = JSON.parse(fs.readFileSync(samplePath, "utf8"));
	const formResponse = payload.form_response ?? payload;
	const { fields } = mapPlayerDraftResponse(formResponse);
	const entries = Object.entries(fields);
	const client = getGraphClient();

	for (let i = 1; i <= entries.length; i += 1) {
		const subset = Object.fromEntries(entries.slice(0, i));
		const latestKey = entries[i - 1][0];
		try {
			console.log(`Testing first ${i} fields (latest: ${latestKey})`);
			const { id } = await createSharePointListItem({ listId, fields: subset });
			console.log("\t✅ success, deleting test item", id);
			await client.api(`/sites/${siteId}/lists/${listId}/items/${id}`).delete();
		} catch (error) {
			console.error(`\t❌ Failed when adding field "${latestKey}"`);
			throw error;
		}
	}
}

void main();
