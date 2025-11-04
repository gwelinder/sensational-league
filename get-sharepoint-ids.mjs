#!/usr/bin/env node
import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js';
import 'isomorphic-fetch';

// Load environment variables
const tenantId = process.env.AZURE_TENANT_ID;
const clientId = process.env.AZURE_CLIENT_ID;
const clientSecret = process.env.AZURE_CLIENT_SECRET;

if (!tenantId || !clientId || !clientSecret) {
  console.error('❌ Missing Azure credentials in environment variables');
  process.exit(1);
}

const siteName = process.argv[2];
if (!siteName) {
  console.error('❌ Please provide site name as argument');
  console.error('Usage: node get-sharepoint-ids.mjs <site-name>');
  console.error('Example: node get-sharepoint-ids.mjs sensational-league');
  process.exit(1);
}

async function getSharePointIds() {
  try {
    // Create credential
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    // Create auth provider
    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
      scopes: ['https://graph.microsoft.com/.default'],
    });

    // Create Graph client
    const client = Client.initWithMiddleware({ authProvider });

    console.log(`🔍 Looking up SharePoint site: ${siteName}...`);

    // Get site ID
    const site = await client
      .api(`/sites/sagasportsgroup.sharepoint.com:/sites/${siteName}`)
      .get();

    console.log('\n✅ SITE FOUND!');
    console.log('─'.repeat(80));
    console.log('Site ID:', site.id);
    console.log('Site Name:', site.name);
    console.log('Site URL:', site.webUrl);
    console.log('─'.repeat(80));

    // Get lists
    console.log('\n🔍 Looking up lists in site...');
    const lists = await client
      .api(`/sites/${site.id}/lists`)
      .get();

    console.log('\n📋 AVAILABLE LISTS:');
    console.log('─'.repeat(80));
    lists.value.forEach((list) => {
      console.log(`\n📌 ${list.displayName}`);
      console.log(`   List ID: ${list.id}`);
      console.log(`   Template: ${list.list?.template || 'Custom'}`);
    });
    console.log('─'.repeat(80));

    // Try to find Newsletter list
    const newsletterList = lists.value.find(
      (list) =>
        list.displayName.toLowerCase().includes('newsletter') ||
        list.displayName.toLowerCase().includes('subscription')
    );

    if (newsletterList) {
      console.log('\n✅ NEWSLETTER LIST FOUND!');
      console.log('─'.repeat(80));
      console.log('List Name:', newsletterList.displayName);
      console.log('List ID:', newsletterList.id);
      console.log('─'.repeat(80));

      console.log('\n📝 ADD THESE TO YOUR .ENV.LOCAL:');
      console.log('─'.repeat(80));
      console.log(`SHAREPOINT_SITE_ID=${site.id}`);
      console.log(`SHAREPOINT_NEWSLETTER_LIST_ID=${newsletterList.id}`);
      console.log('─'.repeat(80));
    } else {
      console.log('\n⚠️  No newsletter list found automatically.');
      console.log('Please check the list names above and use the appropriate ID.');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.statusCode === 404) {
      console.error(`Site "${siteName}" not found at sagasportsgroup.sharepoint.com`);
    }
    process.exit(1);
  }
}

getSharePointIds();
