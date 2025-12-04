#!/usr/bin/env node

require('dotenv').config();
const contentful = require('contentful-management');

// You'll need to add CONTENTFUL_MANAGEMENT_TOKEN to your .env file
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('❌ Error: Missing required environment variables');
  console.error('Please add to your .env file:');
  console.error('  CONTENTFUL_SPACE_ID=your_space_id');
  console.error('  CONTENTFUL_MANAGEMENT_TOKEN=your_management_token');
  console.error('\nGet your Management Token from:');
  console.error('  Contentful → Settings → API Keys → Create Personal Access Token');
  process.exit(1);
}

async function setupFundraiserContentTypes() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN
  });

  try {
    console.log('🚀 Setting up Fundraiser content models...\n');
    
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    // ========================================
    // 1. Fundraiser Settings Content Type
    // ========================================
    console.log('📝 Creating Fundraiser Settings content type...');
    try {
      const settingsType = await environment.createContentTypeWithId('fundraiserSettings', {
        name: 'Fundraiser Settings',
        displayField: 'fundraiserName',
        description: 'Core fundraiser configuration and stats',
        fields: [
          {
            id: 'fundraiserName',
            name: 'Fundraiser Name',
            type: 'Symbol',
            required: true,
            validations: [{ size: { max: 200 } }]
          },
          {
            id: 'organizerName',
            name: 'Organizer Name',
            type: 'Symbol',
            required: false,
            validations: [{ size: { max: 100 } }]
          },
          {
            id: 'goalAmount',
            name: 'Goal Amount',
            type: 'Integer',
            required: true,
            validations: [{ range: { min: 1 } }]
          },
          {
            id: 'currentAmount',
            name: 'Current Amount Raised',
            type: 'Integer',
            required: true,
            validations: [{ range: { min: 0 } }]
          },
          {
            id: 'donorCount',
            name: 'Number of Donors',
            type: 'Integer',
            required: false,
            validations: [{ range: { min: 0 } }]
          },
          {
            id: 'endDate',
            name: 'End Date',
            type: 'Date',
            required: false
          },
          {
            id: 'primaryDonationUrl',
            name: 'Primary Donation URL',
            type: 'Symbol',
            required: true,
            validations: [
              {
                regexp: {
                  pattern: '^https?://',
                  flags: null
                }
              }
            ]
          },
          {
            id: 'secondaryDonationUrl',
            name: 'Secondary Donation URL',
            type: 'Symbol',
            required: false,
            validations: [
              {
                regexp: {
                  pattern: '^https?://',
                  flags: null
                }
              }
            ]
          },
          {
            id: 'contactEmail',
            name: 'Contact Email',
            type: 'Symbol',
            required: false,
            validations: [
              {
                regexp: {
                  pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
                  flags: null
                }
              }
            ]
          },
          {
            id: 'socialLinks',
            name: 'Social Media Links (JSON)',
            type: 'Object',
            required: false
          },
          {
            id: 'brandColors',
            name: 'Brand Colors (JSON)',
            type: 'Object',
            required: false
          }
        ]
      });

      await settingsType.publish();
      console.log('✅ Fundraiser Settings created\n');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️  Fundraiser Settings already exists\n');
      } else {
        throw error;
      }
    }

    // ========================================
    // 2. Fundraiser Content Content Type
    // ========================================
    console.log('📝 Creating Fundraiser Content content type...');
    try {
      const contentType = await environment.createContentTypeWithId('fundraiserContent', {
        name: 'Fundraiser Content',
        displayField: 'sectionName',
        description: 'All fundraiser page content sections',
        fields: [
          {
            id: 'sectionName',
            name: 'Section Name',
            type: 'Symbol',
            required: true,
            validations: [
              {
                in: [
                  'hero',
                  'story',
                  'goal',
                  'milestones',
                  'impact',
                  'updates',
                  'supporters',
                  'faq',
                  'contact'
                ]
              }
            ]
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
            required: false,
            validations: [{ size: { max: 500 } }]
          },
          {
            id: 'description',
            name: 'Description/Body Text',
            type: 'Text',
            required: false
          },
          {
            id: 'items',
            name: 'Section Items (JSON)',
            type: 'Object',
            required: false
          },
          {
            id: 'image',
            name: 'Section Image',
            type: 'Link',
            linkType: 'Asset',
            required: false,
            validations: [{ linkMimetypeGroup: ['image'] }]
          },
          {
            id: 'ctaText',
            name: 'CTA Button Text',
            type: 'Symbol',
            required: false,
            validations: [{ size: { max: 50 } }]
          },
          {
            id: 'ctaUrl',
            name: 'CTA Button URL',
            type: 'Symbol',
            required: false
          }
        ]
      });

      await contentType.publish();
      console.log('✅ Fundraiser Content created\n');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️  Fundraiser Content already exists\n');
      } else {
        throw error;
      }
    }

    // ========================================
    // 3. Fundraiser Update Content Type
    // ========================================
    console.log('📝 Creating Fundraiser Update content type...');
    try {
      const updateType = await environment.createContentTypeWithId('fundraiserUpdate', {
        name: 'Fundraiser Update',
        displayField: 'title',
        description: 'News and updates about fundraiser progress',
        fields: [
          {
            id: 'title',
            name: 'Update Title',
            type: 'Symbol',
            required: true,
            validations: [{ size: { max: 150 } }]
          },
          {
            id: 'date',
            name: 'Date',
            type: 'Date',
            required: true
          },
          {
            id: 'content',
            name: 'Update Content',
            type: 'Text',
            required: true
          },
          {
            id: 'image',
            name: 'Update Image',
            type: 'Link',
            linkType: 'Asset',
            required: false,
            validations: [{ linkMimetypeGroup: ['image'] }]
          },
          {
            id: 'isImportant',
            name: 'Pin to Top',
            type: 'Boolean',
            required: false
          }
        ]
      });

      await updateType.publish();
      console.log('✅ Fundraiser Update created\n');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️  Fundraiser Update already exists\n');
      } else {
        throw error;
      }
    }

    console.log('🎉 All content types created successfully!\n');
    console.log('📝 Next steps:');
    console.log('1. Go to Contentful → Content');
    console.log('2. Create a "Fundraiser Settings" entry with your fundraiser details');
    console.log('3. Create "Fundraiser Content" entries for each section (hero, story, etc.)');
    console.log('4. Optionally create "Fundraiser Update" entries for news\n');
    console.log('📖 See FUNDRAISER-SETUP.md for detailed instructions and examples!');

  } catch (error) {
    console.error('❌ Error setting up content types:', error.message);
    if (error.details) {
      console.error('Details:', JSON.stringify(error.details, null, 2));
    }
    process.exit(1);
  }
}

// Run the setup
setupFundraiserContentTypes();

