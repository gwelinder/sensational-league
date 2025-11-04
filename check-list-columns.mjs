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
const listId = process.env.SHAREPOINT_NEWSLETTER_LIST_ID;

if (!tenantId || !clientId || !clientSecret || !siteId || !listId) {
  console.error('❌ Missing required environment variables');
  console.error('Required: AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, SHAREPOINT_SITE_ID, SHAREPOINT_NEWSLETTER_LIST_ID');
  process.exit(1);
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

    console.log('🔍 Checking Newsletter list columns...\n');

    // Get list columns
    const columns = await client
      .api(`/sites/${siteId}/lists/${listId}/columns`)
      .get();

    console.log('📋 AVAILABLE COLUMNS IN "Newsletter signups" LIST:');
    console.log('─'.repeat(80));

    columns.value.forEach((col) => {
      if (!col.hidden && !col.readOnly) {
        console.log(`\n✏️  ${col.displayName}`);
        console.log(`   Internal Name: ${col.name}`);
        console.log(`   Type: ${col.columnGroup || col.type || 'unknown'}`);
        console.log(`   Required: ${col.required || false}`);
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
