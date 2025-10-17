#!/usr/bin/env node

require('dotenv').config();
const contentful = require('contentful-management');

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

async function populateContent() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN
  });

  try {
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    console.log('Creating content entries...\n');

    // Sample content data
    const sections = [
      {
        sectionName: 'hero',
        headline: 'Stop Wasting Half Your Ad Budget on the Wrong People',
        subheadline: 'Get clear visibility into what\'s working and what\'s not. We provide detailed performance reports at 30, 60, and 90 day checkpoints so you know exactly where to invest.',
        disclaimer: 'Transparent reporting • Data-driven decisions • Clear ROI tracking'
      },
      {
        sectionName: 'urgencyBanner',
        headline: 'Limited Q1 Spots: Only 3 partnerships available for January'
      },
      {
        sectionName: 'channels',
        headline: 'The Right Channel for the Job',
        items: [
          {
            title: 'Display & Video',
            description: 'Reach customers on 2M+ premium websites and streaming services',
            icon: 'tv'
          },
          {
            title: 'Social Media',
            description: 'Target your exact audience on Facebook, Instagram, LinkedIn & TikTok',
            icon: 'users'
          },
          {
            title: 'Google & Bing',
            description: 'Capture high-intent customers actively searching for your services',
            icon: 'search'
          }
        ]
      },
      {
        sectionName: 'method',
        headline: 'Our Method',
        items: [
          {
            timeline: '30 Days',
            title: 'Analyze & Optimize',
            description: 'Establish baseline and identify opportunities'
          },
          {
            timeline: '60 Days',
            title: 'Test & Improve',
            description: 'Run tests and optimize winning strategies'
          },
          {
            timeline: '90 Days',
            title: 'Scale Winners',
            description: 'Scale what works and document playbook'
          }
        ]
      },
      {
        sectionName: 'timeline',
        headline: 'Your 90-Day Performance Runway',
        items: [
          {
            phase: 'Day 1-30',
            title: 'Discovery & Analysis',
            tasks: [
              'Audit current campaigns',
              'Identify waste and opportunities',
              'Set up tracking and reporting',
              'Launch initial optimizations'
            ]
          },
          {
            phase: 'Day 31-60',
            title: 'Testing & Optimization',
            tasks: [
              'A/B test winning strategies',
              'Refine audience targeting',
              'Optimize creative performance',
              'Scale successful campaigns'
            ]
          },
          {
            phase: 'Day 61-90',
            title: 'Scale & Document',
            tasks: [
              'Scale proven winners',
              'Document best practices',
              'Create performance playbook',
              'Plan next quarter strategy'
            ]
          }
        ]
      },
      {
        sectionName: 'results',
        headline: 'Proof in Performance',
        items: [
          {
            label: 'Display CPL',
            value: '−24 to −38%',
            subtext: 'by day 60'
          },
          {
            label: 'CTV Conversions',
            value: '2.8× to 3.4×',
            subtext: 'q over q'
          },
          {
            label: 'Retargeting QLR',
            value: '+31 to +54%',
            subtext: 'after testing'
          },
          {
            label: 'Social QLR',
            value: '+22 to +41%',
            subtext: 'after rounds'
          }
        ]
      },
      {
        sectionName: 'industries',
        headline: 'Industries We Serve',
        subheadline: 'Proven success across diverse industries with tailored strategies for each vertical',
        items: ['SaaS', 'Healthcare', 'Finance', 'Real Estate', 'Retail', 'Education']
      },
      {
        sectionName: 'integration',
        headline: 'Seamless Integration With Your Existing Tools',
        subheadline: 'We don\'t replace your systems—we enhance them. Our platform connects with your current CRM and marketing stack to provide unified reporting.',
        items: [
          {
            title: 'CRM Integration',
            description: 'Works with Salesforce, HubSpot, Pipedrive, or any CRM you use'
          },
          {
            title: 'Real-Time Reporting',
            description: 'Live dashboards showing exactly where your budget is going'
          },
          {
            title: 'Lead Tracking',
            description: 'See which ads drive real revenue, not just clicks'
          },
          {
            title: 'Custom Analytics',
            description: 'Reports tailored to your KPIs and business goals'
          }
        ]
      },
      {
        sectionName: 'primaryCTA',
        headline: 'A 90 day runway designed to prove or improve return',
        subheadline: 'Clarity by day 30 traction by day 60 scale by day 90',
        ctaText: 'Get Your Performance Analysis →',
        disclaimer: 'See how your campaigns could perform better'
      },
      {
        sectionName: 'faq',
        headline: 'Frequently Asked Questions',
        items: [
          {
            question: 'Why 90 days?',
            answer: '90 days provides enough time to establish baselines, run statistically significant tests, and scale winners while maintaining budget discipline.'
          },
          {
            question: 'What happens at 30 60 90?',
            answer: 'Day 30: Performance baseline established. Day 60: Winners identified and optimized. Day 90: Scaled campaigns with documented playbook.'
          },
          {
            question: 'Do you manage social ads?',
            answer: 'Yes, through our partnership with North American Advertising, we handle Meta, LinkedIn, and TikTok with rapid creative testing.'
          },
          {
            question: 'Brand safety and fraud prevention?',
            answer: 'We implement pre-bid fraud detection, brand safety filters, and viewability standards from day one across all campaigns.'
          }
        ]
      }
    ];

    // Create entries for each section
    for (const section of sections) {
      try {
        console.log(`Creating ${section.sectionName} entry...`);

        const entry = await environment.createEntry('homepageContent', {
          fields: {
            sectionName: { 'en-US': section.sectionName },
            headline: section.headline ? { 'en-US': section.headline } : undefined,
            subheadline: section.subheadline ? { 'en-US': section.subheadline } : undefined,
            disclaimer: section.disclaimer ? { 'en-US': section.disclaimer } : undefined,
            items: section.items ? { 'en-US': section.items } : undefined,
            ctaText: section.ctaText ? { 'en-US': section.ctaText } : undefined,
          }
        });

        await entry.publish();
        console.log(`  ✓ ${section.sectionName} created and published`);
      } catch (error) {
        console.log(`  ⚠️  ${section.sectionName}: ${error.message}`);
      }
    }

    // Create global settings
    console.log('\nCreating global settings...');
    try {
      const globalEntry = await environment.createEntry('globalSettings', {
        fields: {
          siteName: { 'en-US': 'NEXUS' },
          brandColors: {
            'en-US': {
              primary: '#00B0F1',
              secondary: '#FFB231',
              accent: '#FF5253',
              black: '#0F0F0F',
              white: '#FCFCFC'
            }
          },
          companyInfo: {
            'en-US': {
              name: 'Nexus Marketing',
              tagline: 'Stop wasting ad budget. Start seeing results.',
              email: 'hello@nexusmarketing.com',
              phone: '1-800-NEXUS-AD'
            }
          }
        }
      });

      await globalEntry.publish();
      console.log('  ✓ Global settings created and published');
    } catch (error) {
      console.log(`  ⚠️  Global settings: ${error.message}`);
    }

    console.log('\n✅ Content population complete!');
    console.log('\nYou can now:');
    console.log('1. Run "node test-contentful.cjs" to verify everything');
    console.log('2. Run "npm run dev" to see your site with CMS content');
    console.log('3. Edit content at app.contentful.com');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

populateContent();