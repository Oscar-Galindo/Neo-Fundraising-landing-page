#!/usr/bin/env node

require('dotenv').config();
const contentful = require('contentful-management');

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

async function populateNehemiahContent() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN
  });

  try {
    console.log('🚀 Populating Nehemiah\'s Madrid Dream content...\n');
    
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    // 1. Campaign Settings
    console.log('📝 Creating Campaign Settings...');
    try {
      const settings = await environment.createEntry('campaignSettings', {
        fields: {
          campaignTitle: { 'en-US': 'Nehemiah\'s Road to Madrid' },
          tagline: { 'en-US': 'MADRID.DREAM' },
          gofundmeUrl: { 'en-US': 'https://www.gofundme.com/f/nehemiahs-madrid-dream-from-nj-fields-to-real-madrid-city' },
          instagramHandle: { 'en-US': '@nehemiah_madrid' },
          brandColors: {
            'en-US': {
              primary: '#fbbf24',
              secondary: '#d97706',
              background: '#020617'
            }
          }
        }
      });
      await settings.publish();
      console.log('✅ Campaign Settings created\n');
    } catch (e) {
      console.log('⚠️  Campaign Settings:', e.message, '\n');
    }

    // 2. Hero Section
    console.log('📝 Creating Hero Section...');
    try {
      const hero = await environment.createEntry('heroSection', {
        fields: {
          statusBadge: { 'en-US': 'Official' },
          statusDescription: { 'en-US': 'Academy Invitation Received' },
          headline: { 'en-US': 'Help Nehemiah get to' },
          gradientText: { 'en-US': 'Real Madrid Academy' },
          description: { 'en-US': 'From NJ fields to Real Madrid City. A once-in-a-lifetime opportunity to train at Valdebebas. We need your help to cover travel and accommodation.' },
          supporterCount: { 'en-US': 45 },
          supporterAvatars: {
            'en-US': [
              { initials: 'JM' },
              { initials: 'AL' },
              { initials: 'RK' },
              { initials: '+42' }
            ]
          }
        }
      });
      await hero.publish();
      console.log('✅ Hero Section created\n');
    } catch (e) {
      console.log('⚠️  Hero Section:', e.message, '\n');
    }

    // 3. Stats Grid
    console.log('📝 Creating Stats Grid...');
    try {
      const stats = await environment.createEntry('statsGrid', {
        fields: {
          sectionTitle: { 'en-US': 'Season Highlights' },
          stats: {
            'en-US': [
              {
                value: '12',
                label: 'Goals Scored',
                icon: 'target'
              },
              {
                value: 'Top 3',
                label: 'Regional Rank',
                icon: 'trophy'
              },
              {
                value: '100%',
                label: 'Dedication',
                icon: 'heart'
              }
            ]
          }
        }
      });
      await stats.publish();
      console.log('✅ Stats Grid created\n');
    } catch (e) {
      console.log('⚠️  Stats Grid:', e.message, '\n');
    }

    // 4. Story Section
    console.log('📝 Creating Story Section...');
    try {
      const story = await environment.createEntry('storySection', {
        fields: {
          title: { 'en-US': 'The Journey' },
          icon: { 'en-US': 'book-open' },
          content: {
            'en-US': `Since he could walk, Nehemiah has had a ball at his feet. What started as kicking a ball against the garage door has turned into a passion that defines his daily life.

Last month, at the Regional Showcase, he was one of only three players selected by international scouts to attend an elite training camp at the <strong>Real Madrid Academy</strong> facilities in Spain this coming summer.

This isn't just a trip; it's a 10-day intensive program where he will train with UEFA Pro license coaches, compete against local Spanish academies, and experience the culture of professional European football at Valdebebas.`
          }
        }
      });
      await story.publish();
      console.log('✅ Story Section created\n');
    } catch (e) {
      console.log('⚠️  Story Section:', e.message, '\n');
    }

    // 5. Video Highlights
    console.log('📝 Creating Video Highlights...');
    try {
      const highlights = await environment.createEntry('videoHighlights', {
        fields: {
          sectionTitle: { 'en-US': 'In Action' },
          highlights: {
            'en-US': [
              {
                title: 'Agility drills',
                category: 'Skill',
                thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop',
                videoUrl: '#'
              },
              {
                title: 'Regional Finals',
                category: 'Match',
                thumbnail: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=600&auto=format&fit=crop',
                videoUrl: '#'
              },
              {
                title: 'Top Bins',
                category: 'Goal',
                thumbnail: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=600&auto=format&fit=crop',
                videoUrl: '#'
              }
            ]
          }
        }
      });
      await highlights.publish();
      console.log('✅ Video Highlights created\n');
    } catch (e) {
      console.log('⚠️  Video Highlights:', e.message, '\n');
    }

    // 6. Cost Breakdown
    console.log('📝 Creating Cost Breakdown...');
    try {
      const costs = await environment.createEntry('costBreakdown', {
        fields: {
          sectionTitle: { 'en-US': 'Cost Breakdown' },
          items: {
            'en-US': [
              {
                title: 'Flights & Travel',
                amount: 1200,
                icon: 'plane',
                color: 'blue'
              },
              {
                title: 'Academy Housing',
                amount: 2500,
                icon: 'home',
                color: 'amber'
              },
              {
                title: 'Kit & Equipment',
                amount: 800,
                icon: 'shirt',
                color: 'slate'
              }
            ]
          },
          totalAmount: { 'en-US': 5000 },
          disclaimer: { 'en-US': 'All funds managed securely via GoFundMe.' }
        }
      });
      await costs.publish();
      console.log('✅ Cost Breakdown created\n');
    } catch (e) {
      console.log('⚠️  Cost Breakdown:', e.message, '\n');
    }

    // 7. Timeline
    console.log('📝 Creating Timeline...');
    try {
      const timeline = await environment.createEntry('timeline', {
        fields: {
          sectionTitle: { 'en-US': 'The Plan' },
          milestones: {
            'en-US': [
              {
                title: 'Selection Day',
                date: 'OCT 15, 2023',
                description: 'Invited to the showcase among top regional talent.',
                status: 'completed',
                color: 'blue'
              },
              {
                title: 'Fundraising Deadline',
                date: 'MAR 1, 2024',
                description: 'Goal is to secure all travel & housing funds.',
                status: 'current',
                color: 'amber'
              },
              {
                title: 'Departure',
                date: 'JUN 10, 2024',
                description: 'Flying to Madrid for the 10-day intensive.',
                status: 'upcoming',
                color: 'white'
              }
            ]
          }
        }
      });
      await timeline.publish();
      console.log('✅ Timeline created\n');
    } catch (e) {
      console.log('⚠️  Timeline:', e.message, '\n');
    }

    console.log('🎉 Content population complete!\n');
    console.log('✅ Next steps:');
    console.log('1. Go to Contentful to edit content');
    console.log('2. Upload photos/videos');
    console.log('3. Update dates and amounts');
    console.log('4. Run "npm run dev" to see your page\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

populateNehemiahContent();

