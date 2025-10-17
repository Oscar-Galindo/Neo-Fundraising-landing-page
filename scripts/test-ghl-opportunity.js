#!/usr/bin/env node

/**
 * Test GoHighLevel Opportunity Creation
 * Tests if we can create opportunities directly
 */

import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

const API_KEY = process.env.GHL_API_KEY;
const LOCATION_ID = process.env.GHL_LOCATION_ID;

console.log('🔧 Testing GoHighLevel Opportunity Creation...\n');

async function testOpportunities() {
  try {
    // First, try to list opportunities
    console.log('1️⃣ Testing Opportunity List Access...');
    try {
      const listResponse = await axios.get(
        `https://services.leadconnectorhq.com/opportunities/`,
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Version': '2021-07-28'
          },
          params: {
            locationId: LOCATION_ID,
            limit: 1
          }
        }
      );

      console.log('✅ Can list opportunities');
      console.log(`   Found ${listResponse.data.total || 0} total opportunities`);
    } catch (error) {
      console.log('❌ Cannot list opportunities:', error.response?.data?.message || error.message);
    }

    // Test creating an opportunity (we need a contact first)
    console.log('\n2️⃣ Creating Test Contact for Opportunity...');

    const testEmail = `test-${Date.now()}@example.com`;
    const contactResponse = await axios.post(
      `https://services.leadconnectorhq.com/contacts/`,
      {
        locationId: LOCATION_ID,
        email: testEmail,
        firstName: 'Test',
        lastName: 'Opportunity',
        name: 'Test Opportunity',
        phone: '+1234567890'
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json'
        }
      }
    );

    const contactId = contactResponse.data.contact.id;
    console.log('✅ Test contact created:', contactId);

    // Now try to create an opportunity
    console.log('\n3️⃣ Testing Opportunity Creation...');
    try {
      const opportunityResponse = await axios.post(
        `https://services.leadconnectorhq.com/opportunities/`,
        {
          locationId: LOCATION_ID,
          contactId: contactId,
          name: 'Test Opportunity from Nexus Starter',
          monetaryValue: 1000,
          status: 'open',
          source: 'Website Form'
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ Opportunity created successfully!');
      console.log(`   ID: ${opportunityResponse.data.opportunity.id}`);
      console.log(`   Name: ${opportunityResponse.data.opportunity.name}`);
      console.log(`   Value: $${opportunityResponse.data.opportunity.monetaryValue}`);

      // Clean up - delete the opportunity
      await axios.delete(
        `https://services.leadconnectorhq.com/opportunities/${opportunityResponse.data.opportunity.id}`,
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Version': '2021-07-28'
          }
        }
      );
      console.log('   (Test opportunity cleaned up)');

    } catch (error) {
      console.log('❌ Cannot create opportunities:', error.response?.data?.message || error.message);
      if (error.response?.data) {
        console.log('   Error details:', JSON.stringify(error.response.data, null, 2));
      }
    }

    // Clean up - delete test contact
    console.log('\n4️⃣ Cleaning up test data...');
    await axios.delete(
      `https://services.leadconnectorhq.com/contacts/${contactId}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Version': '2021-07-28'
        }
      }
    );
    console.log('✅ Test contact deleted');

    console.log('\n' + '='.repeat(50));
    console.log('📊 Summary:');
    console.log('   - Contacts: ✅ Full access');
    console.log('   - Opportunities: Test the results above');
    console.log('='.repeat(50));

  } catch (error) {
    console.error('\n❌ Test failed:', error.response?.data?.message || error.message);
    if (error.response?.data) {
      console.error('Error details:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

// Run the test
testOpportunities();