#!/usr/bin/env node
import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js';
import 'isomorphic-fetch';

// Load environment variables
const tenantId = process.env.AZURE_TENANT_ID;
const clientId = process.env.AZURE_CLIENT_ID;
const clientSecret = process.env.AZURE_CLIENT_SECRET;
const siteId = process.env.SHAREPOINT_SITE_ID;
const listIdentifier = process.argv[2];
const showHidden = process.argv.includes('--show-hidden');

if (!tenantId || !clientId || !clientSecret || !siteId) {
  console.error('❌ Missing required environment variables');
  console.error('Required: AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, SHAREPOINT_SITE_ID');
  process.exit(1);
}

if (!listIdentifier && !process.env.SHAREPOINT_NEWSLETTER_LIST_ID) {
  console.error('❌ Please provide a list ID or display name as the first argument, or set SHAREPOINT_NEWSLETTER_LIST_ID');
  console.error('Usage: node check-list-columns.mjs <ListDisplayName|ListId> [--show-hidden]');
  process.exit(1);
}

const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

async function resolveListId(client) {
  if (listIdentifier && guidRegex.test(listIdentifier)) {
    return { listId: listIdentifier, listName: null };
  }

  if (!listIdentifier && process.env.SHAREPOINT_NEWSLETTER_LIST_ID) {
    return { listId: process.env.SHAREPOINT_NEWSLETTER_LIST_ID, listName: null };
  }

  const displayName = listIdentifier;
  if (!displayName) {
    throw new Error('List display name is required when list ID is not provided');
  }

  const lists = await client
    .api(`/sites/${siteId}/lists`)
    .get();

  const match = lists.value.find((list) =>
    list.displayName?.toLowerCase() === displayName.toLowerCase(),
  );

  if (!match) {
    throw new Error(`List "${displayName}" not found in site ${siteId}`);
  }

  return { listId: match.id, listName: match.displayName };
}

async function checkListColumns() {
  try {
    // Create credential
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    // Create auth provider
    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
      scopes: ['https://graph.microsoft.com/.default'],
    });

    // Create Graph client
    const client = Client.initWithMiddleware({ authProvider });

    const { listId, listName } = await resolveListId(client);

    const listMeta = await client
      .api(`/sites/${siteId}/lists/${listId}`)
      .get();

    const resolvedName = listName || listMeta.displayName || 'Unknown list';

    console.log(`🔍 Checking "${resolvedName}" list columns...\n`);

    // Get list columns
    const columns = await client
      .api(`/sites/${siteId}/lists/${listId}/columns`)
      .get();

    console.log(`📋 AVAILABLE COLUMNS IN "${resolvedName}" LIST:`);
    console.log('─'.repeat(80));

    columns.value.forEach((col) => {
      if (!showHidden && (col.hidden || col.readOnly)) {
        return;
      }

      const flags = [];
      if (col.hidden) flags.push('hidden');
      if (col.readOnly) flags.push('read-only');

      console.log(`\n✏️  ${col.displayName}`);
      console.log(`   Internal Name: ${col.name}`);
      console.log(`   Type: ${col.columnGroup || col.type || 'unknown'}`);
      console.log(`   Required: ${col.required || false}`);
      if (flags.length > 0) {
        console.log(`   Flags: ${flags.join(', ')}`);
      }
    });

    console.log('\n' + '─'.repeat(80));

    // Try to get first item to see actual data structure
    console.log('\n🔍 Checking existing items...\n');
    const items = await client
      .api(`/sites/${siteId}/lists/${listId}/items`)
      .expand('fields')
      .top(1)
      .get();

    if (items.value && items.value.length > 0) {
      console.log('📌 SAMPLE ITEM FIELDS:');
      console.log('─'.repeat(80));
      console.log(JSON.stringify(items.value[0].fields, null, 2));
      console.log('─'.repeat(80));
    } else {
      console.log('ℹ️  List is empty - no sample data available');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.body) {
      console.error('Details:', JSON.parse(error.body).error.message);
    }
    process.exit(1);
  }
}

checkListColumns();
