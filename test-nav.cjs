#!/usr/bin/env node

require('dotenv').config();
const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

async function testNavigation() {
  try {
    console.log('Fetching main navigation...\n');

    const response = await client.getEntries({
      content_type: 'navigation',
      'fields.title': 'main',
      limit: 1,
      include: 2 // Include linked assets
    });

    if (response.items.length > 0) {
      const nav = response.items[0];
      console.log('Navigation Entry Found:');
      console.log('========================');

      console.log('\nFields:');
      console.log('- Title:', nav.fields.title);
      console.log('- Logo Text:', nav.fields.logoText);
      console.log('- Logo URL:', nav.fields.logoUrl);
      console.log('- Logo Asset:', nav.fields.logo);

      if (nav.fields.logo) {
        console.log('\nLogo Asset Details:');
        console.log('- Asset ID:', nav.fields.logo.sys.id);
        console.log('- Asset Type:', nav.fields.logo.sys.type);

        // Try to get the asset details
        if (response.includes?.Asset) {
          const asset = response.includes.Asset.find(a => a.sys.id === nav.fields.logo.sys.id);
          if (asset) {
            console.log('- File URL:', asset.fields.file?.url);
            console.log('- Title:', asset.fields.title);
            console.log('- Content Type:', asset.fields.file?.contentType);
          }
        }
      }

      console.log('\nMenu Items:', JSON.stringify(nav.fields.menuItems, null, 2));
      console.log('\nCTA Button:', JSON.stringify(nav.fields.ctaButton, null, 2));
    } else {
      console.log('No navigation entry found');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testNavigation();