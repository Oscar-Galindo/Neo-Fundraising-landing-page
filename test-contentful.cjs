#!/usr/bin/env node
require('dotenv').config();

const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

async function testConnection() {
  console.log('\n🔍 Testing Contentful Connection...\n');

  try {
    // Test 1: Basic connection
    const space = await client.getSpace();
    console.log('✅ Connected to space:', space.name);

    // Test 2: Check content types
    const contentTypes = await client.getContentTypes();
    console.log('\n📝 Available Content Types:');
    if (contentTypes.items.length === 0) {
      console.log('  ⚠️  No content types found');
      console.log('  ℹ️  Please create the content types in Contentful first');
    } else {
      contentTypes.items.forEach(ct => {
        console.log(`  - ${ct.sys.id}: ${ct.name}`);
      });
    }

    // Test 3: Fetch homepage content (only if content type exists)
    console.log('\n📦 Fetching Homepage Content:');
    const hasHomepageContentType = contentTypes.items.some(ct => ct.sys.id === 'homepageContent');

    let homepageEntries = { items: [] };

    if (!hasHomepageContentType) {
      console.log('  ⚠️  Content type "homepageContent" not found');
      console.log('  ℹ️  Please create the content types first using the instructions provided');
    } else {
      homepageEntries = await client.getEntries({
        content_type: 'homepageContent',
        limit: 20
      });

      if (homepageEntries.items.length === 0) {
        console.log('  ⚠️  No homepage content entries found');
        console.log('  ℹ️  Please create entries in Contentful for each section');
        console.log('\n  Required sections:');
        const sections = ['hero', 'urgencyBanner', 'channels', 'method', 'timeline', 'results', 'industries', 'integration', 'primaryCTA', 'faq'];
        sections.forEach(s => console.log(`    - ${s}`));
      } else {
        console.log(`  ✅ Found ${homepageEntries.items.length} content entries:`);
        homepageEntries.items.forEach(entry => {
          console.log(`    - ${entry.fields.sectionName}: ${entry.fields.headline || '(no headline)'}`);
        });
      }
    }

    // Test 4: Check global settings
    console.log('\n⚙️  Fetching Global Settings:');
    const hasGlobalSettingsType = contentTypes.items.some(ct => ct.sys.id === 'globalSettings');

    if (!hasGlobalSettingsType) {
      console.log('  ⚠️  Content type "globalSettings" not found');
    } else {
      const settings = await client.getEntries({
        content_type: 'globalSettings',
        limit: 1
      });

      if (settings.items.length === 0) {
        console.log('  ⚠️  No global settings entries found');
        console.log('  ℹ️  Optional: Create a global settings entry for site-wide configuration');
      } else {
        console.log(`  ✅ Global settings found: ${settings.items[0].fields.siteName || 'NEXUS'}`);
      }
    }

    console.log('\n✨ Contentful connection test complete!\n');

    if (homepageEntries.items.length === 0) {
      console.log('📋 Next Steps:');
      console.log('1. Go to Contentful and create content entries for each section');
      console.log('2. Use the sample data from contentful-homepage-model.json');
      console.log('3. Run this test again to verify content is loading');
      console.log('4. Start the dev server with: npm run dev\n');
    } else {
      console.log('🚀 Everything is set up! Run: npm run dev\n');
    }

  } catch (error) {
    console.error('❌ Error connecting to Contentful:', error.message);
    console.log('\n🔧 Please check:');
    console.log('1. Your .env file has the correct credentials:');
    console.log('   - CONTENTFUL_SPACE_ID');
    console.log('   - PUBLIC_CONTENTFUL_ACCESS_TOKEN');
    console.log('   - CONTENTFUL_ENVIRONMENT (optional, defaults to "master")');
    console.log('2. The content types have been created in Contentful\n');
  }
}

testConnection();