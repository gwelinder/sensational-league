import type { Client } from "@microsoft/microsoft-graph-client";
import { getGraphClient } from "./graphClient";
import { logger } from "@/lib/logger";

interface CreateSharePointListItemOptions {
  listId: string;
  fields: Record<string, unknown>;
  siteId?: string;
  graphClient?: Client;
}

export async function createSharePointListItem({
  listId,
  fields,
  siteId = process.env.SHAREPOINT_SITE_ID,
  graphClient,
}: CreateSharePointListItemOptions): Promise<{ id: string }> {
  if (!siteId) {
    throw new Error("Missing SHAREPOINT_SITE_ID environment variable");
  }

  if (!listId) {
    throw new Error("List ID is required to create SharePoint item");
  }

  const client = graphClient ?? getGraphClient();

  try {
    const result = await client
      .api(`/sites/${siteId}/lists/${listId}/items`)
      .post({ fields });

    return { id: result?.id };
  } catch (err) {
    logger.sharepoint.error("SharePoint create item error", { action: "createListItem", listId }, err instanceof Error ? err : new Error(String(err)));
    throw err;
  }
}
