#!/usr/bin/env node

require('dotenv').config();
const contentful = require('contentful-management');

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

async function addHeroImageField() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN
  });

  try {
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    console.log('Fetching homepageContent content type...');
    const contentType = await environment.getContentType('homepageContent');

    // Check if backgroundImage field already exists
    const hasBackgroundImage = contentType.fields.some(f => f.id === 'backgroundImage');

    if (!hasBackgroundImage) {
      console.log('Adding backgroundImage field...');

      // Add the new field
      contentType.fields.push({
        id: 'backgroundImage',
        name: 'Background Image',
        type: 'Link',
        linkType: 'Asset',
        required: false,
        localized: false,
        validations: [
          {
            linkMimetypeGroup: ['image']
          }
        ]
      });

      // Update the content type
      const updatedContentType = await contentType.update();
      await updatedContentType.publish();

      console.log('✅ backgroundImage field added successfully!');
    } else {
      console.log('✓ backgroundImage field already exists');
    }

    // Now let's update the hero entry to add a sample image URL
    console.log('\nUpdating hero entry with image...');

    const entries = await environment.getEntries({
      content_type: 'homepageContent',
      'fields.sectionName': 'hero'
    });

    if (entries.items.length > 0) {
      const heroEntry = entries.items[0];

      // First, let's create an asset for the hero background
      console.log('Creating hero background asset...');

      const asset = await environment.createAsset({
        fields: {
          title: {
            'en-US': 'Hero Background - Digital Marketing Visualization'
          },
          description: {
            'en-US': 'Abstract digital marketing and data visualization background'
          },
          file: {
            'en-US': {
              contentType: 'image/jpeg',
              fileName: 'hero-background.jpg',
              upload: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80'
            }
          }
        }
      });

      // Process the asset
      await asset.processForAllLocales();

      // Wait for processing to complete
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Publish the asset
      await asset.publish();
      console.log('✓ Hero background asset created');

      // Update the hero entry with the image
      heroEntry.fields.backgroundImage = {
        'en-US': {
          sys: {
            type: 'Link',
            linkType: 'Asset',
            id: asset.sys.id
          }
        }
      };

      await heroEntry.update();
      await heroEntry.publish();
      console.log('✓ Hero entry updated with background image');
    }

    console.log('\n✅ Hero image setup complete!');
    console.log('\nYou can now:');
    console.log('1. View your hero with the background image');
    console.log('2. Change the image in Contentful by uploading a new asset');
    console.log('3. The image will be automatically optimized via Cloudinary');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.details) {
      console.error('Details:', JSON.stringify(error.details, null, 2));
    }
  }
}

addHeroImageField();