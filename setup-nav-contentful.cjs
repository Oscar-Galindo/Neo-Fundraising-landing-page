#!/usr/bin/env node

require('dotenv').config();
const contentful = require('contentful-management');

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

async function setupNavigation() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN
  });

  try {
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    // Create Navigation Content Type
    console.log('Creating Navigation content type...');

    try {
      const navContentType = await environment.createContentTypeWithId('navigation', {
        name: 'Navigation',
        displayField: 'title',
        fields: [
          {
            id: 'title',
            name: 'Navigation Title',
            type: 'Symbol',
            required: true,
            validations: [
              {
                in: ['main', 'footer', 'mobile']
              }
            ]
          },
          {
            id: 'logo',
            name: 'Logo',
            type: 'Link',
            linkType: 'Asset',
            required: false,
            validations: [
              {
                linkMimetypeGroup: ['image']
              }
            ]
          },
          {
            id: 'logoUrl',
            name: 'Logo URL (Alternative)',
            type: 'Symbol',
            required: false,
            validations: [
              {
                regexp: {
                  pattern: '^https?://',
                  flags: null
                },
                message: 'Must be a valid URL'
              }
            ]
          },
          {
            id: 'logoText',
            name: 'Logo Text (if no image)',
            type: 'Symbol',
            required: false,
            validations: [
              {
                size: {
                  max: 50
                }
              }
            ]
          },
          {
            id: 'menuItems',
            name: 'Menu Items',
            type: 'Object',
            required: false
          },
          {
            id: 'ctaButton',
            name: 'CTA Button',
            type: 'Object',
            required: false
          }
        ]
      });

      await navContentType.publish();
      console.log('✓ Navigation content type created');
    } catch (error) {
      if (error.message.includes('already taken')) {
        console.log('✓ Navigation content type already exists');
      } else {
        throw error;
      }
    }

    // Create main navigation entry
    console.log('\nCreating main navigation entry...');

    try {
      const navEntry = await environment.createEntry('navigation', {
        fields: {
          title: {
            'en-US': 'main'
          },
          logoText: {
            'en-US': 'NEXUS'
          },
          logoUrl: {
            'en-US': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=50&q=90'
          },
          menuItems: {
            'en-US': [
              {
                label: 'How It Works',
                href: '#method',
                type: 'scroll'
              },
              {
                label: '90-Day Timeline',
                href: '#timeline',
                type: 'scroll'
              },
              {
                label: 'Results',
                href: '#results',
                type: 'scroll'
              },
              {
                label: 'Industries',
                href: '#industries',
                type: 'scroll'
              },
              {
                label: 'FAQ',
                href: '#faq',
                type: 'scroll'
              }
            ]
          },
          ctaButton: {
            'en-US': {
              text: 'Get Started',
              href: '#intent-bar-container',
              style: 'primary'
            }
          }
        }
      });

      await navEntry.publish();
      console.log('✓ Main navigation entry created');
    } catch (error) {
      if (error.message.includes('Conflict')) {
        console.log('✓ Main navigation entry already exists');
      } else {
        console.log('⚠️ Navigation entry error:', error.message);
      }
    }

    // Create footer navigation entry
    console.log('\nCreating footer navigation entry...');

    try {
      const footerEntry = await environment.createEntry('navigation', {
        fields: {
          title: {
            'en-US': 'footer'
          },
          logoText: {
            'en-US': 'NEXUS'
          },
          menuItems: {
            'en-US': [
              {
                label: 'Privacy Policy',
                href: '/privacy',
                type: 'link'
              },
              {
                label: 'Terms of Service',
                href: '/terms',
                type: 'link'
              },
              {
                label: 'Contact',
                href: '/contact',
                type: 'link'
              },
              {
                label: 'About',
                href: '/about',
                type: 'link'
              }
            ]
          }
        }
      });

      await footerEntry.publish();
      console.log('✓ Footer navigation entry created');
    } catch (error) {
      if (error.message.includes('Conflict')) {
        console.log('✓ Footer navigation entry already exists');
      } else {
        console.log('⚠️ Footer entry error:', error.message);
      }
    }

    console.log('\n✅ Navigation setup complete!');
    console.log('\nYou can now:');
    console.log('1. Edit navigation items in Contentful');
    console.log('2. Add/remove menu items');
    console.log('3. Update the logo');
    console.log('4. Customize the CTA button');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.details) {
      console.error('Details:', JSON.stringify(error.details, null, 2));
    }
  }
}

setupNavigation();