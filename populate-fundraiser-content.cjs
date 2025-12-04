#!/usr/bin/env node

require('dotenv').config();
const contentful = require('contentful-management');

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('❌ Error: Missing required environment variables');
  console.error('Please add to your .env file:');
  console.error('  CONTENTFUL_SPACE_ID=your_space_id');
  console.error('  CONTENTFUL_MANAGEMENT_TOKEN=your_management_token');
  process.exit(1);
}

async function populateFundraiserContent() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN
  });

  try {
    console.log('🚀 Populating Fundraiser content...\n');
    
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    // ========================================
    // 1. Create Fundraiser Settings
    // ========================================
    console.log('📝 Creating Fundraiser Settings...');
    try {
      const settingsEntry = await environment.createEntry('fundraiserSettings', {
        fields: {
          fundraiserName: { 'en-US': 'Help Jordan Reach Nationals 2025' },
          organizerName: { 'en-US': 'The Galindo Family' },
          goalAmount: { 'en-US': 5000 },
          currentAmount: { 'en-US': 0 },
          donorCount: { 'en-US': 0 },
          endDate: { 'en-US': '2025-06-30' },
          primaryDonationUrl: { 'en-US': 'https://gofundme.com/your-campaign' },
          secondaryDonationUrl: { 'en-US': 'https://paypal.me/yourname' },
          contactEmail: { 'en-US': 'galindo@example.com' },
          socialLinks: {
            'en-US': {
              facebook: 'https://facebook.com/yourpage',
              instagram: 'https://instagram.com/youraccount',
              twitter: 'https://twitter.com/yourhandle'
            }
          },
          brandColors: {
            'en-US': {
              primary: '#FF5733',
              secondary: '#33C3FF'
            }
          }
        }
      });

      await settingsEntry.publish();
      console.log('✅ Fundraiser Settings created and published\n');
    } catch (error) {
      console.log(`⚠️  Fundraiser Settings: ${error.message}\n`);
    }

    // ========================================
    // 2. Create Content Sections
    // ========================================
    const sections = [
      {
        sectionName: 'hero',
        headline: 'Help Jordan Achieve His Dream',
        subheadline: 'Every contribution brings us one step closer to making this once-in-a-lifetime opportunity possible. Your support means the world to our family.',
        ctaText: 'Donate Now',
        ctaUrl: 'https://gofundme.com/your-campaign'
      },
      {
        sectionName: 'story',
        headline: 'Our Story',
        description: `Jordan has worked incredibly hard this past year to earn a spot on the team that will compete at Nationals. This is more than just a competition - it's a chance for him to develop leadership skills, build lasting friendships, and create memories that will shape his future.

The journey to Nationals requires significant resources including travel, accommodation, equipment, and registration fees. As a family, we're committed to supporting Jordan's dreams, but we can't do it alone.

Your generosity will help make this dream a reality. Every dollar counts, and we're grateful for any support you can provide. Together, we can show Jordan that with hard work and community support, anything is possible.`
      },
      {
        sectionName: 'goal',
        headline: 'What We\'re Raising Money For',
        items: [
          {
            title: 'Travel Expenses',
            amount: 2000,
            description: 'Round-trip airfare and local transportation for the team'
          },
          {
            title: 'Accommodation',
            amount: 1500,
            description: 'Hotel stays during the week-long competition'
          },
          {
            title: 'Equipment & Gear',
            amount: 800,
            description: 'Required competition equipment and team uniforms'
          },
          {
            title: 'Program Fees',
            amount: 700,
            description: 'Registration, coaching, and participation costs'
          }
        ]
      },
      {
        sectionName: 'milestones',
        headline: 'Our Progress Milestones',
        items: [
          {
            percentage: 25,
            title: 'First Milestone - $1,250',
            description: 'Cover registration and initial fees'
          },
          {
            percentage: 50,
            title: 'Halfway There! - $2,500',
            description: 'Secure travel arrangements'
          },
          {
            percentage: 75,
            title: 'Almost There - $3,750',
            description: 'Purchase all necessary equipment'
          },
          {
            percentage: 100,
            title: 'Goal Reached! - $5,000',
            description: 'Everything is covered!'
          }
        ]
      },
      {
        sectionName: 'impact',
        headline: 'How Your Donation Helps',
        items: [
          {
            amount: '$25',
            impact: 'Covers meals for one day of the trip'
          },
          {
            amount: '$50',
            impact: 'Helps purchase required equipment'
          },
          {
            amount: '$100',
            impact: 'Contributes to travel expenses'
          },
          {
            amount: '$250+',
            impact: 'Makes a major impact on reaching our goal'
          }
        ]
      },
      {
        sectionName: 'faq',
        headline: 'Frequently Asked Questions',
        items: [
          {
            question: 'How can I donate?',
            answer: 'Click any "Donate Now" button to be taken to our secure donation page. We accept all major payment methods including credit cards, PayPal, and Venmo.'
          },
          {
            question: 'Is my donation tax-deductible?',
            answer: 'Please consult with your tax advisor regarding the deductibility of your contribution. If you need a receipt, please contact us directly.'
          },
          {
            question: 'What if you exceed your goal?',
            answer: 'Any additional funds will go towards future opportunities and expenses for Jordan, including training, equipment, and potential future competitions.'
          },
          {
            question: 'How will I know my donation was received?',
            answer: 'You\'ll receive an immediate confirmation from our donation platform. We also personally thank all donors and will post updates on our progress.'
          },
          {
            question: 'Can I help in other ways besides donating?',
            answer: 'Absolutely! Sharing our fundraiser on social media, with friends and family, or in your community groups helps us reach more potential supporters.'
          }
        ]
      }
    ];

    // Create content entries
    for (const section of sections) {
      try {
        console.log(`📝 Creating ${section.sectionName} section...`);

        const entry = await environment.createEntry('fundraiserContent', {
          fields: {
            sectionName: { 'en-US': section.sectionName },
            headline: section.headline ? { 'en-US': section.headline } : undefined,
            subheadline: section.subheadline ? { 'en-US': section.subheadline } : undefined,
            description: section.description ? { 'en-US': section.description } : undefined,
            items: section.items ? { 'en-US': section.items } : undefined,
            ctaText: section.ctaText ? { 'en-US': section.ctaText } : undefined,
            ctaUrl: section.ctaUrl ? { 'en-US': section.ctaUrl } : undefined,
          }
        });

        await entry.publish();
        console.log(`✅ ${section.sectionName} created and published`);
      } catch (error) {
        console.log(`⚠️  ${section.sectionName}: ${error.message}`);
      }
    }

    // ========================================
    // 3. Create Sample Update
    // ========================================
    console.log('\n📝 Creating sample fundraiser update...');
    try {
      const updateEntry = await environment.createEntry('fundraiserUpdate', {
        fields: {
          title: { 'en-US': 'Fundraiser Launch!' },
          date: { 'en-US': new Date().toISOString() },
          content: {
            'en-US': `We're so excited to launch our fundraiser! Thank you to everyone who has already shown their support. Your encouragement means everything to us.

Stay tuned for regular updates on our progress. We can't wait to share this journey with you!

- The Galindo Family`
          },
          isImportant: { 'en-US': true }
        }
      });

      await updateEntry.publish();
      console.log('✅ Sample update created and published');
    } catch (error) {
      console.log(`⚠️  Update: ${error.message}`);
    }

    console.log('\n🎉 Fundraiser content population complete!\n');
    console.log('✅ Next steps:');
    console.log('1. Go to Contentful and customize the content with your details');
    console.log('2. Upload photos to the hero and story sections');
    console.log('3. Update the donation URLs to your actual GoFundMe/PayPal links');
    console.log('4. Run "npm run dev" to see your fundraiser page');
    console.log('5. Visit: http://localhost:4321/fundraiser\n');
    console.log('💡 Tip: Update "currentAmount" in Fundraiser Settings as donations come in!');

  } catch (error) {
    console.error('\n❌ Error populating content:', error.message);
    if (error.sys && error.sys.id === 'VersionMismatch') {
      console.error('\n💡 This might mean content already exists. Delete existing entries and try again.');
    }
    if (error.sys && error.sys.id === 'NotFound') {
      console.error('\n💡 Make sure you\'ve created the content models first!');
      console.error('   Run: npm run setup:fundraiser');
    }
    process.exit(1);
  }
}

// Run the population script
populateFundraiserContent();

