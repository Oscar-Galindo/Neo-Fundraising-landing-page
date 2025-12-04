#!/usr/bin/env node

require('dotenv').config();
const contentful = require('contentful-management');

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

async function setupMediaModels() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN
  });

  try {
    console.log('🎬 Creating proper media content models...\n');
    
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    // ========================================
    // 1. Media Item (for slider items)
    // ========================================
    console.log('📝 Creating Media Item content type...');
    try {
      const mediaItemType = await environment.createContentTypeWithId('mediaItem', {
        name: 'Media Item',
        displayField: 'title',
        description: 'Individual video/image for sliders and galleries',
        fields: [
          {
            id: 'title',
            name: 'Title',
            type: 'Symbol',
            required: true
          },
          {
            id: 'category',
            name: 'Category',
            type: 'Symbol',
            required: false,
            validations: [{
              in: ['Skill', 'Match', 'Goal', 'Training', 'Highlight']
            }]
          },
          {
            id: 'thumbnail',
            name: 'Thumbnail Image',
            type: 'Link',
            linkType: 'Asset',
            required: true,
            validations: [{
              linkMimetypeGroup: ['image']
            }]
          },
          {
            id: 'video',
            name: 'Video File (optional)',
            type: 'Link',
            linkType: 'Asset',
            required: false,
            validations: [{
              linkMimetypeGroup: ['video']
            }]
          },
          {
            id: 'videoUrl',
            name: 'External Video URL (YouTube/Vimeo)',
            type: 'Symbol',
            required: false
          },
          {
            id: 'description',
            name: 'Description',
            type: 'Text',
            required: false
          },
          {
            id: 'order',
            name: 'Display Order',
            type: 'Integer',
            required: false
          }
        ]
      });
      await mediaItemType.publish();
      console.log('✅ Media Item created\n');
    } catch (e) {
      if (e.message.includes('already exists')) {
        console.log('ℹ️  Media Item already exists\n');
      } else {
        throw e;
      }
    }

    // ========================================
    // 2. Update Video Highlights to use references
    // ========================================
    console.log('📝 Updating Video Highlights to use Media Items...');
    try {
      const highlightsType = await environment.getContentType('videoHighlights');
      
      // Add new field for media item references
      highlightsType.fields.push({
        id: 'mediaItems',
        name: 'Media Items',
        type: 'Array',
        items: {
          type: 'Link',
          linkType: 'Entry',
          validations: [{
            linkContentType: ['mediaItem']
          }]
        },
        required: false
      });
      
      const updated = await highlightsType.update();
      await updated.publish();
      console.log('✅ Video Highlights updated\n');
    } catch (e) {
      if (e.message.includes('taken')) {
        console.log('ℹ️  mediaItems field already exists\n');
      } else {
        console.log('⚠️  Could not update:', e.message, '\n');
      }
    }

    console.log('🎉 Media content models created!');
    console.log('\n📝 Next steps:');
    console.log('1. Upload images/videos to Contentful Assets');
    console.log('2. Create Media Item entries linking to those assets');
    console.log('3. Link Media Items to Video Highlights');
    console.log('4. Cloudinary will auto-optimize all images!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

setupMediaModels();

