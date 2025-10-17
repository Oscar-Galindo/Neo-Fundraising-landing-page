#!/usr/bin/env node

require('dotenv').config();
const contentful = require('contentful-management');

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

async function updateHeroWithImageUrl() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN
  });

  try {
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    // Get the hero entry
    console.log('Fetching hero entry...');
    const entries = await environment.getEntries({
      content_type: 'homepageContent',
      'fields.sectionName': 'hero'
    });

    if (entries.items.length > 0) {
      const heroEntry = entries.items[0];

      // Add a heroImageUrl field to the content type if it doesn't exist
      console.log('Checking content type for heroImageUrl field...');
      const contentType = await environment.getContentType('homepageContent');

      const hasHeroImageUrl = contentType.fields.some(f => f.id === 'heroImageUrl');

      if (!hasHeroImageUrl) {
        console.log('Adding heroImageUrl field...');
        contentType.fields.push({
          id: 'heroImageUrl',
          name: 'Hero Image URL',
          type: 'Symbol',
          required: false,
          localized: false,
          validations: [
            {
              regexp: {
                pattern: '^https?://',
                flags: null
              },
              message: 'Must be a valid URL starting with http:// or https://'
            }
          ]
        });

        const updatedContentType = await contentType.update();
        await updatedContentType.publish();
        console.log('✓ heroImageUrl field added');
      }

      // Update the hero entry with a professional marketing image
      console.log('Updating hero entry with image URL...');

      // Use a high-quality marketing/tech image from Unsplash
      heroEntry.fields.heroImageUrl = {
        'en-US': 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1920&q=80'
      };

      // Also ensure we have all the hero content
      if (!heroEntry.fields.headline) {
        heroEntry.fields.headline = {
          'en-US': 'Stop Wasting Half Your Ad Budget on the Wrong People'
        };
      }

      if (!heroEntry.fields.subheadline) {
        heroEntry.fields.subheadline = {
          'en-US': 'Get clear visibility into what\'s working and what\'s not. We provide detailed performance reports at 30, 60, and 90 day checkpoints so you know exactly where to invest.'
        };
      }

      if (!heroEntry.fields.disclaimer) {
        heroEntry.fields.disclaimer = {
          'en-US': 'Transparent reporting • Data-driven decisions • Clear ROI tracking'
        };
      }

      await heroEntry.update();
      await heroEntry.publish();

      console.log('✅ Hero entry updated with image URL!');
      console.log('\nImage URL: https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3');
      console.log('\nThis is a professional tech/marketing background image.');
      console.log('You can change it in Contentful to any image URL you prefer.');
      console.log('\nThe image will be automatically optimized through Cloudinary when displayed.');
    } else {
      console.log('❌ No hero entry found. Please run populate-content.cjs first.');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.details) {
      console.error('Details:', JSON.stringify(error.details, null, 2));
    }
  }
}

updateHeroWithImageUrl();