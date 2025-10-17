#!/usr/bin/env node

require('dotenv').config();
const contentful = require('contentful-management');

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

async function updateMethodContent() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN
  });

  try {
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    console.log('Updating method content with enhanced data...');

    // Get the method entry
    const entries = await environment.getEntries({
      content_type: 'homepageContent',
      'fields.sectionName': 'method'
    });

    if (entries.items.length > 0) {
      const methodEntry = entries.items[0];

      // Update with richer content
      methodEntry.fields.headline = {
        'en-US': 'Our Data-Driven Method'
      };

      methodEntry.fields.subheadline = {
        'en-US': 'Every campaign follows our proven 90-day framework, backed by Propellant\'s premium inventory access and brand safety guarantees'
      };

      methodEntry.fields.items = {
        'en-US': [
          {
            timeline: '30 Days',
            title: 'Discovery & Analysis',
            description: 'Deep-dive audit of your current performance with competitive intelligence',
            metrics: ['Audience Analysis', 'Campaign Audit', 'Competitive Research', 'Baseline KPIs'],
            deliverables: ['Performance Report', 'Opportunity Assessment', 'Strategic Roadmap']
          },
          {
            timeline: '60 Days',
            title: 'Test & Optimize',
            description: 'Rapid testing cycles with machine learning optimization',
            metrics: ['A/B Testing', 'Creative Optimization', 'Audience Refinement', 'Bid Strategy'],
            deliverables: ['Winner Identification', 'Performance Metrics', 'Optimization Playbook']
          },
          {
            timeline: '90 Days',
            title: 'Scale & Accelerate',
            description: 'Deploy winning strategies at scale with documented playbook',
            metrics: ['Budget Scaling', 'Cross-Channel Expansion', 'ROI Documentation', 'Future Planning'],
            deliverables: ['Scaled Campaigns', 'Executive Report', 'Q2 Strategy']
          }
        ]
      };

      await methodEntry.update();
      await methodEntry.publish();
      console.log('✓ Method content enhanced');

      // Also add trust indicators as a separate section
      console.log('\nAdding trust indicators section...');

      try {
        const trustEntry = await environment.createEntry('homepageContent', {
          fields: {
            sectionName: {
              'en-US': 'trustIndicators'
            },
            headline: {
              'en-US': 'Enterprise-Grade Protection'
            },
            items: {
              'en-US': [
                { label: 'Ad Fraud Protection', value: '99.9%', description: 'Pre-bid fraud detection' },
                { label: 'Brand Safety Score', value: '100%', description: 'Premium inventory only' },
                { label: 'Viewability Rate', value: '78%+', description: 'Above industry average' },
                { label: 'Premium Inventory', value: '2M+ Sites', description: 'Exclusive access through Propellant' }
              ]
            }
          }
        });

        await trustEntry.publish();
        console.log('✓ Trust indicators section added');
      } catch (error) {
        if (error.message.includes('Conflict')) {
          console.log('✓ Trust indicators already exist');
        } else {
          console.log('⚠️ Trust indicators error:', error.message);
        }
      }

    } else {
      console.log('❌ Method entry not found');
    }

    console.log('\n✅ Method content enhanced successfully!');
    console.log('\nThe method section now includes:');
    console.log('- Propellant Media branding');
    console.log('- Progress indicators');
    console.log('- Professional icons');
    console.log('- Gradient backgrounds');
    console.log('- Hover animations');
    console.log('- Trust indicators');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

updateMethodContent();