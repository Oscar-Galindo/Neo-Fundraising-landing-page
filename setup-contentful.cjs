#!/usr/bin/env node

require('dotenv').config();
const contentful = require('contentful-management');

// You'll need to add these to your .env file
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

async function setupContentTypes() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN
  });

  try {
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    // Create Homepage Content Type
    console.log('Creating Homepage Content type...');
    const homepageContentType = await environment.createContentTypeWithId('homepageContent', {
      name: 'Homepage Content',
      displayField: 'sectionName',
      fields: [
        {
          id: 'sectionName',
          name: 'Section Name',
          type: 'Symbol',
          required: true,
          validations: [{
            in: ['hero', 'urgencyBanner', 'channels', 'method', 'timeline', 'results', 'industries', 'integration', 'primaryCTA', 'faq']
          }]
        },
        {
          id: 'headline',
          name: 'Headline',
          type: 'Symbol',
          required: false,
          validations: [{ size: { max: 200 } }]
        },
        {
          id: 'subheadline',
          name: 'Subheadline',
          type: 'Text',
          required: false
        },
        {
          id: 'disclaimer',
          name: 'Disclaimer/Caption',
          type: 'Symbol',
          required: false,
          validations: [{ size: { max: 200 } }]
        },
        {
          id: 'items',
          name: 'Section Items (JSON)',
          type: 'Object',
          required: false
        },
        {
          id: 'ctaText',
          name: 'CTA Button Text',
          type: 'Symbol',
          required: false,
          validations: [{ size: { max: 50 } }]
        },
        {
          id: 'backgroundImage',
          name: 'Background Image',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          validations: [{ linkMimetypeGroup: ['image'] }]
        }
      ]
    });

    await homepageContentType.publish();
    console.log('✓ Homepage Content type created');

    // Create Global Settings Content Type
    console.log('Creating Global Settings type...');
    const globalSettingsType = await environment.createContentTypeWithId('globalSettings', {
      name: 'Global Settings',
      displayField: 'siteName',
      fields: [
        {
          id: 'siteName',
          name: 'Site Name',
          type: 'Symbol',
          required: true
        },
        {
          id: 'brandColors',
          name: 'Brand Colors (JSON)',
          type: 'Object',
          required: false
        },
        {
          id: 'companyInfo',
          name: 'Company Info (JSON)',
          type: 'Object',
          required: false
        },
        {
          id: 'trackingCodes',
          name: 'Tracking Codes',
          type: 'Text',
          required: false
        }
      ]
    });

    await globalSettingsType.publish();
    console.log('✓ Global Settings type created');

    console.log('\n✅ Content types created successfully!');
    console.log('\nNext steps:');
    console.log('1. Go to Contentful and create entries for each section');
    console.log('2. Use the sectionName field to identify each section');
    console.log('3. Store arrays/objects in the items field as JSON');

  } catch (error) {
    console.error('Error setting up content types:', error);
  }
}

// Run the setup
setupContentTypes();