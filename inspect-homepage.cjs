require('dotenv').config();
const { createClient } = require('contentful');

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

(async () => {
  try {
    const entries = await client.getEntries({ 
      content_type: 'homepageContent',
      include: 3,
    });
    
    console.log('📄 Homepage Content Structure:\n');
    
    if (entries.items.length > 0) {
      console.log(JSON.stringify(entries.items[0].fields, null, 2));
    } else {
      console.log('No homepage content found');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
