# GoHighLevel Integration Guide

## How The System Differentiates Churches vs Businesses

### 1. **Environment Configuration**
Set in your `.env` file:
```env
SITE_TYPE=church  # or 'business'
GHL_API_KEY=your_api_key
GHL_LOCATION_ID=your_location_id
```

### 2. **Automatic Detection & Handling**

#### For Churches:
- **Prayer Requests**: Updates existing member records, adds prayer to their profile
- **Event Registration**: Links to existing contact, tracks attendance
- **Volunteer Signup**: Tags existing members with volunteer interests
- **Donations**: Tracks giving history on existing contact

#### For Businesses:
- **Quote Requests**: Creates opportunities in sales pipeline
- **Contact Forms**: Creates/updates leads
- **Appointment Booking**: Schedules in GHL calendar
- **Newsletter Signups**: Adds to email marketing lists

### 3. **How It Handles Existing Contacts**

```javascript
// The system automatically:
1. Searches for existing contact by email
2. If found: Updates and adds new information
3. If not found: Creates new contact
4. Adds activity note for every submission
5. Triggers appropriate workflow
```

## Setting Up in GoHighLevel

### Step 1: Create Different Workflows

#### Church Workflows:
1. **Prayer Request Workflow**
   - Trigger: Tag "prayer-request"
   - Actions:
     - Add to prayer team notification
     - If pastoral care needed → Assign to pastor
     - Send confirmation email
     - Add to prayer list

2. **First-Time Visitor Workflow**
   - Trigger: Tag "first-time-visitor"
   - Actions:
     - Welcome email series
     - Pastor notification
     - Follow-up call task
     - Add to newcomers class

#### Business Workflows:
1. **Lead Capture Workflow**
   - Trigger: Tag "contact"
   - Actions:
     - Instant notification to sales
     - Add to CRM pipeline
     - Send info packet
     - Schedule follow-up

2. **Quote Request Workflow**
   - Trigger: Tag "quote"
   - Actions:
     - Create opportunity
     - Assign to sales rep
     - Send pricing info
     - Schedule consultation

### Step 2: Configure Custom Fields in GHL

#### Church Custom Fields:
```
- prayerRequest (text)
- requestType (dropdown)
- memberSince (date)
- ministryInterests (multi-select)
- attendanceFrequency (dropdown)
- givingProfile (private)
```

#### Business Custom Fields:
```
- leadSource (dropdown)
- serviceInterest (multi-select)
- budget (currency)
- timeline (dropdown)
- companySize (number)
- industry (dropdown)
```

### Step 3: Set Up Pipelines

#### Church Pipeline:
```
Visitor → Regular Attendee → Member → Active Member → Leader
```

#### Business Pipeline:
```
Lead → Qualified → Proposal → Negotiation → Closed
```

## Form Configuration in Contentful

Create a "Form Configuration" content type:

```json
{
  "formId": "contact-form",
  "formType": "contact",
  "title": "Get in Touch",
  "fields": [
    {
      "name": "email",
      "label": "Email",
      "type": "email",
      "required": true
    },
    {
      "name": "firstName",
      "label": "First Name",
      "type": "text",
      "required": true
    }
  ],
  "ghl": {
    "workflowId": "workflow_abc123",
    "updateExisting": true,
    "tags": ["website-form"]
  }
}
```

## Usage Examples

### Church Prayer Request
```tsx
<UniversalGHLForm
  config={prayerFormConfig}
  siteType="church"
/>
```

When submitted:
1. Checks if email exists in GHL
2. Updates existing member OR creates visitor record
3. Adds prayer request to their profile
4. Tags with "prayer-request", "personal" (or type)
5. Triggers prayer team workflow
6. If pastoral care needed, creates task for pastor

### Business Quote Request
```tsx
<UniversalGHLForm
  config={quoteFormConfig}
  siteType="business"
/>
```

When submitted:
1. Checks if contact exists
2. Updates lead information
3. Creates opportunity in pipeline
4. Assigns to sales rep
5. Triggers quote workflow
6. Sends automated pricing info

## Testing Your Integration

1. **Test with existing contact:**
   - Submit form with known email
   - Verify contact updated (not duplicated)
   - Check new tags added
   - Confirm workflow triggered

2. **Test with new contact:**
   - Submit with new email
   - Verify contact created
   - Check all fields populated
   - Confirm in correct pipeline stage

3. **Test church-specific features:**
   - Submit prayer request
   - Check pastoral care flag
   - Verify privacy settings honored

4. **Test business-specific features:**
   - Submit quote request
   - Check opportunity created
   - Verify pipeline placement

## Common Workflows

### Church: Member Check-in
```javascript
// When member submits any form:
1. Find existing contact
2. Update last activity date
3. Add form data to profile
4. Trigger relevant ministry workflow
5. No duplicate contacts created
```

### Business: Lead Nurturing
```javascript
// When lead submits multiple forms:
1. Find existing lead
2. Increase lead score
3. Update interest areas
4. Move through pipeline stages
5. Maintain conversation history
```

## Best Practices

1. **Always use email as primary identifier**
2. **Tag everything for easy segmentation**
3. **Use custom fields for form-specific data**
4. **Create separate workflows per form type**
5. **Test with real scenarios before going live**

## Troubleshooting

**Issue: Duplicate contacts being created**
- Solution: Ensure `updateExisting: true` in form config
- Check email field is mapped correctly

**Issue: Workflow not triggering**
- Solution: Verify workflow ID in configuration
- Check tags are being applied
- Ensure workflow is active in GHL

**Issue: Church members showing as new visitors**
- Solution: Ensure members use same email
- Consider adding member ID field
- Use phone as secondary identifier