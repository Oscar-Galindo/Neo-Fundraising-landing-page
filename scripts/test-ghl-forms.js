#!/usr/bin/env node

/**
 * Test GoHighLevel Forms API
 * Fetches form fields to create custom styled forms
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

console.log('🔧 Testing GoHighLevel Forms API...\n');

async function testForms() {
  try {
    // Test 1: List all forms
    console.log('1️⃣ Fetching all forms for location...');
    try {
      const formsResponse = await axios.get(
        `https://services.leadconnectorhq.com/forms/`,
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Version': '2021-07-28'
          },
          params: {
            locationId: LOCATION_ID
          }
        }
      );

      const forms = formsResponse.data.forms || [];
      console.log(`✅ Found ${forms.length} forms\n`);

      // Display each form
      forms.forEach((form, index) => {
        console.log(`Form ${index + 1}: ${form.name}`);
        console.log(`   ID: ${form.id}`);
        console.log(`   Type: ${form.type || 'standard'}`);

        if (form.fields && form.fields.length > 0) {
          console.log(`   Fields (${form.fields.length}):`);
          form.fields.forEach(field => {
            console.log(`     - ${field.label || field.name} (${field.fieldType || field.type})`);
            if (field.required) console.log(`       Required: Yes`);
            if (field.options) console.log(`       Options: ${field.options.join(', ')}`);
          });
        }
        console.log('');
      });

      // If we found forms, get detailed info on the first one
      if (forms.length > 0) {
        const formId = forms[0].id;
        console.log('2️⃣ Getting detailed form data for:', forms[0].name);

        const formDetailResponse = await axios.get(
          `https://services.leadconnectorhq.com/forms/${formId}`,
          {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Version': '2021-07-28'
            }
          }
        );

        const formDetail = formDetailResponse.data;
        console.log('\n📋 Detailed Form Structure:');
        console.log(JSON.stringify(formDetail, null, 2));

        // Generate example React component
        console.log('\n' + '='.repeat(50));
        console.log('💡 Example React Component for this form:\n');
        generateReactComponent(formDetail);
      }

    } catch (error) {
      if (error.response?.status === 401) {
        console.log('❌ Forms API not accessible - need "View Forms" and "Edit Forms" permissions');
      } else {
        console.log('❌ Error fetching forms:', error.response?.data?.message || error.message);
      }
    }

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

function generateReactComponent(form) {
  const componentCode = `
import { useState } from 'react';
import { submitToGHL } from '@/lib/api/ghl';

export function ${form.name.replace(/\s+/g, '')}Form() {
  const [formData, setFormData] = useState({
${form.fields?.map(field => `    ${field.fieldKey || field.name}: ''`).join(',\n')}
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Submit to GoHighLevel
    const result = await submitToGHL({
      formId: '${form.id}',
      ...formData
    });

    if (result.success) {
      // Handle success
      console.log('Form submitted successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
${form.fields?.map(field => generateFieldJSX(field)).join('\n')}

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors"
      >
        Submit
      </button>
    </form>
  );
}`;

  console.log(componentCode);
}

function generateFieldJSX(field) {
  const fieldName = field.fieldKey || field.name;
  const fieldType = field.fieldType || field.type || 'text';
  const label = field.label || field.name;
  const required = field.required ? 'required' : '';

  switch (fieldType) {
    case 'select':
    case 'dropdown':
      return `      <div>
        <label className="block text-sm font-medium mb-2">${label}</label>
        <select
          name="${fieldName}"
          value={formData.${fieldName}}
          onChange={(e) => setFormData({...formData, ${fieldName}: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg"
          ${required}
        >
          <option value="">Select...</option>
${field.options?.map(opt => `          <option value="${opt}">${opt}</option>`).join('\n')}
        </select>
      </div>`;

    case 'textarea':
      return `      <div>
        <label className="block text-sm font-medium mb-2">${label}</label>
        <textarea
          name="${fieldName}"
          value={formData.${fieldName}}
          onChange={(e) => setFormData({...formData, ${fieldName}: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg"
          rows="4"
          ${required}
        />
      </div>`;

    case 'checkbox':
      return `      <div className="flex items-center">
        <input
          type="checkbox"
          name="${fieldName}"
          checked={formData.${fieldName}}
          onChange={(e) => setFormData({...formData, ${fieldName}: e.target.checked})}
          className="mr-2"
          ${required}
        />
        <label className="text-sm">${label}</label>
      </div>`;

    default:
      return `      <div>
        <label className="block text-sm font-medium mb-2">${label}</label>
        <input
          type="${fieldType}"
          name="${fieldName}"
          value={formData.${fieldName}}
          onChange={(e) => setFormData({...formData, ${fieldName}: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg"
          ${required}
        />
      </div>`;
  }
}

// Run the test
testForms();