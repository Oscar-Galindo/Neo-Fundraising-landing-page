require('dotenv').config();
const { createClient } = require('contentful');

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

(async () => {
  try {
    console.log('🔍 Checking Contentful Content Types...\n');
    
    // Get content types
    const contentTypes = await client.getContentTypes();
    
    console.log(`Found ${contentTypes.items.length} content types:\n`);
    
    contentTypes.items.forEach((ct, idx) => {
      console.log(`${idx + 1}. Name: "${ct.name}" | API ID: "${ct.sys.id}"`);
    });
    
    console.log('\n---\n');
    
    // Now try querying each one
    console.log('📝 Querying entries from each content type:\n');
    
    for (const ct of contentTypes.items) {
      try {
        const entries = await client.getEntries({ content_type: ct.sys.id, limit: 1 });
        console.log(`✅ ${ct.sys.id}: ${entries.items.length} entries found`);
      } catch (err) {
        console.log(`❌ ${ct.sys.id}: Error - ${err.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
})();
