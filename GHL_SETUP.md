# GoHighLevel API Setup Guide

## Current Status
The GoHighLevel API key has been added to your environment configuration, but it appears to be expired (created November 2023).

## How to Get a New API Key

### ⚠️ Important: You need a Personal Access Token, not a Location API Key

1. **Log into GoHighLevel**
   - Go to https://app.gohighlevel.com
   - Navigate to Settings → Business Profile → API Keys

2. **Generate Personal Access Token (PAT)**
   - Click "Add API Key" or "Generate API Key"
   - Select "Private Integration" type
   - Name it something descriptive (e.g., "Nexus Starter Kit")
   - **IMPORTANT: Enable ALL required scopes:**
     - contacts.readonly
     - contacts.write
     - opportunities.readonly
     - opportunities.write
     - calendars.readonly
     - calendars.write
     - forms.readonly
     - forms.write
     - locations.readonly
   - Copy the generated token immediately (you won't see it again)

3. **Alternative: Get SaaS API Key**
   - If you have a SaaS account, go to Settings → Apps & Integrations
   - Create a new app
   - Get the API key from the app settings

4. **Required Scopes/Permissions**:
   - Contacts: Read/Write
   - Opportunities: Read/Write
   - Calendars: Read
   - Forms: Read/Write
   - Custom Fields: Read/Write

3. **Update Your Environment**
   ```bash
   # In your .env file, replace the current key:
   GHL_API_KEY=your_new_api_key_here
   GHL_LOCATION_ID=1YQY23qrVNZxkEzRwbyD
   ```

## Testing the Connection

Once you have a valid API key, run:
```bash
node scripts/test-ghl-connection.js
```

This will verify:
- ✓ Location access
- ✓ Custom fields management
- ✓ Pipeline/opportunity tracking
- ✓ Contact management
- ✓ Calendar integration

## API Integration Features

Your starter kit includes:

1. **Smart Contact Management** (`/src/lib/api/ghl.ts`)
   - Automatic duplicate prevention
   - Contact updates if email exists
   - Custom field mapping

2. **Form Integration**
   - Business inquiries → Opportunity pipeline
   - Church prayer requests → Custom tracking
   - Event registrations → Calendar integration

3. **Admin Dashboard** (`/admin/dashboard`)
   - View all contacts
   - Manage opportunities
   - Track form submissions

## Troubleshooting

If you see "Invalid JWT" error:
- Your API key has expired
- Generate a new one from GoHighLevel settings

If you see "Permission denied":
- Check that your API key has the required permissions
- Verify the location ID matches your account

## Next Steps

1. Generate a fresh API key from GoHighLevel
2. Update the .env file with the new key
3. Run the test script to verify connection
4. Start using the integration features

---

Note: The GoHighLevel API key expires periodically for security. Make sure to rotate your keys regularly.