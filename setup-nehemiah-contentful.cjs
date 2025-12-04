#!/usr/bin/env node

require('dotenv').config();
const contentful = require('contentful-management');

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

async function setupNehemiahContent() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN
  });

  try {
    console.log('🚀 Setting up Nehemiah\'s Madrid Dream content models...\n');
    
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    // ========================================
    // 1. Campaign Settings
    // ========================================
    console.log('📝 Creating Campaign Settings...');
    try {
      const settingsType = await environment.createContentTypeWithId('campaignSettings', {
        name: 'Campaign Settings',
        displayField: 'campaignTitle',
        description: 'Main campaign configuration',
        fields: [
          {
            id: 'campaignTitle',
            name: 'Campaign Title',
            type: 'Symbol',
            required: true
          },
          {
            id: 'tagline',
            name: 'Tagline',
            type: 'Symbol',
            required: false
          },
          {
            id: 'gofundmeUrl',
            name: 'GoFundMe URL',
            type: 'Symbol',
            required: true
          },
          {
            id: 'instagramHandle',
            name: 'Instagram Handle',
            type: 'Symbol',
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
      console.log('✅ Campaign Settings created\n');
    } catch (e) {
      console.log('ℹ️  Campaign Settings already exists\n');
    }

    // ========================================
    // 2. Hero Section
    // ========================================
    console.log('📝 Creating Hero Section...');
    try {
      const heroType = await environment.createContentTypeWithId('heroSection', {
        name: 'Hero Section',
        displayField: 'headline',
        fields: [
          {
            id: 'statusBadge',
            name: 'Status Badge Text',
            type: 'Symbol',
            required: false
          },
          {
            id: 'statusDescription',
            name: 'Status Description',
            type: 'Symbol',
            required: false
          },
          {
            id: 'headline',
            name: 'Headline',
            type: 'Text',
            required: true
          },
          {
            id: 'gradientText',
            name: 'Gradient Highlight Text',
            type: 'Symbol',
            required: false
          },
          {
            id: 'description',
            name: 'Description',
            type: 'Text',
            required: true
          },
          {
            id: 'supporterCount',
            name: 'Supporter Count',
            type: 'Integer',
            required: false
          },
          {
            id: 'supporterAvatars',
            name: 'Supporter Avatars (Initials)',
            type: 'Object',
            required: false
          }
        ]
      });
      await heroType.publish();
      console.log('✅ Hero Section created\n');
    } catch (e) {
      console.log('ℹ️  Hero Section already exists\n');
    }

    // ========================================
    // 3. Stats
    // ========================================
    console.log('📝 Creating Stats...');
    try {
      const statsType = await environment.createContentTypeWithId('statsGrid', {
        name: 'Stats Grid',
        displayField: 'sectionTitle',
        fields: [
          {
            id: 'sectionTitle',
            name: 'Section Title',
            type: 'Symbol',
            required: false
          },
          {
            id: 'stats',
            name: 'Stats (JSON Array)',
            type: 'Object',
            required: true
          }
        ]
      });
      await statsType.publish();
      console.log('✅ Stats Grid created\n');
    } catch (e) {
      console.log('ℹ️  Stats Grid already exists\n');
    }

    // ========================================
    // 4. Story Section
    // ========================================
    console.log('📝 Creating Story Section...');
    try {
      const storyType = await environment.createContentTypeWithId('storySection', {
        name: 'Story Section',
        displayField: 'title',
        fields: [
          {
            id: 'title',
            name: 'Section Title',
            type: 'Symbol',
            required: true
          },
          {
            id: 'icon',
            name: 'Lucide Icon Name',
            type: 'Symbol',
            required: false
          },
          {
            id: 'content',
            name: 'Story Content (HTML/Markdown)',
            type: 'Text',
            required: true
          }
        ]
      });
      await storyType.publish();
      console.log('✅ Story Section created\n');
    } catch (e) {
      console.log('ℹ️  Story Section already exists\n');
    }

    // ========================================
    // 5. Video Highlights
    // ========================================
    console.log('📝 Creating Video Highlights...');
    try {
      const highlightsType = await environment.createContentTypeWithId('videoHighlights', {
        name: 'Video Highlights',
        displayField: 'sectionTitle',
        fields: [
          {
            id: 'sectionTitle',
            name: 'Section Title',
            type: 'Symbol',
            required: false
          },
          {
            id: 'highlights',
            name: 'Highlights (JSON Array)',
            type: 'Object',
            required: true
          }
        ]
      });
      await highlightsType.publish();
      console.log('✅ Video Highlights created\n');
    } catch (e) {
      console.log('ℹ️  Video Highlights already exists\n');
    }

    // ========================================
    // 6. Cost Breakdown
    // ========================================
    console.log('📝 Creating Cost Breakdown...');
    try {
      const costType = await environment.createContentTypeWithId('costBreakdown', {
        name: 'Cost Breakdown',
        displayField: 'sectionTitle',
        fields: [
          {
            id: 'sectionTitle',
            name: 'Section Title',
            type: 'Symbol',
            required: false
          },
          {
            id: 'items',
            name: 'Cost Items (JSON Array)',
            type: 'Object',
            required: true
          },
          {
            id: 'totalAmount',
            name: 'Total Goal Amount',
            type: 'Integer',
            required: true
          },
          {
            id: 'disclaimer',
            name: 'Disclaimer Text',
            type: 'Symbol',
            required: false
          }
        ]
      });
      await costType.publish();
      console.log('✅ Cost Breakdown created\n');
    } catch (e) {
      console.log('ℹ️  Cost Breakdown already exists\n');
    }

    // ========================================
    // 7. Timeline
    // ========================================
    console.log('📝 Creating Timeline...');
    try {
      const timelineType = await environment.createContentTypeWithId('timeline', {
        name: 'Timeline',
        displayField: 'sectionTitle',
        fields: [
          {
            id: 'sectionTitle',
            name: 'Section Title',
            type: 'Symbol',
            required: false
          },
          {
            id: 'milestones',
            name: 'Milestones (JSON Array)',
            type: 'Object',
            required: true
          }
        ]
      });
      await timelineType.publish();
      console.log('✅ Timeline created\n');
    } catch (e) {
      console.log('ℹ️  Timeline already exists\n');
    }

    console.log('🎉 All content types created successfully!\n');
    console.log('✅ Next: Run npm run populate:nehemiah to add content');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

setupNehemiahContent();

