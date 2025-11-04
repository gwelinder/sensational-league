#!/usr/bin/env node
import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js';
import 'isomorphic-fetch';

const tenantId = process.env.AZURE_TENANT_ID;
const clientId = process.env.AZURE_CLIENT_ID;
const clientSecret = process.env.AZURE_CLIENT_SECRET;
const siteId = process.env.SHAREPOINT_SITE_ID;
const listId = process.env.SHAREPOINT_NEWSLETTER_LIST_ID;

if (!tenantId || !clientId || !clientSecret || !siteId || !listId) {
  console.error('❌ Missing required environment variables');
  process.exit(1);
}

async function testWrite() {
  try {
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
      scopes: ['https://graph.microsoft.com/.default'],
    });
    const client = Client.initWithMiddleware({ authProvider });

    console.log('🧪 Testing SharePoint write permissions...\n');

    const testEmail = `test-${Date.now()}@example.com`;
    const timestamp = new Date().toISOString();

    const fields = {
      Title: testEmail,
      Email: testEmail,
      Status: "Active",
      SubscribedAt: timestamp,
      ConsentGiven: true,
      ConsentTimestamp: timestamp,
      Source: "api-test",
    };

    console.log('📝 Creating test item with fields:');
    console.log(JSON.stringify(fields, null, 2));
    console.log('');

    const result = await client
      .api(`/sites/${siteId}/lists/${listId}/items`)
      .post({ fields });

    console.log('✅ SUCCESS! Item created:');
    console.log('─'.repeat(80));
    console.log('Item ID:', result.id);
    console.log('Created:', result.createdDateTime);
    console.log('─'.repeat(80));

    // Clean up - delete test item
    console.log('\n🗑️  Cleaning up test item...');
    await client
      .api(`/sites/${siteId}/lists/${listId}/items/${result.id}`)
      .delete();
    console.log('✅ Test item deleted');

    console.log('\n✨ Write permissions are working correctly!');

  } catch (error) {
    console.error('❌ WRITE TEST FAILED:', error.message);
    if (error.body) {
      const errorBody = JSON.parse(error.body);
      console.error('\nError Details:', errorBody.error.message);
      console.error('\nFull Error:', JSON.stringify(errorBody, null, 2));
    }
    if (error.statusCode) {
      console.error('Status Code:', error.statusCode);
    }
    process.exit(1);
  }
}

testWrite();
