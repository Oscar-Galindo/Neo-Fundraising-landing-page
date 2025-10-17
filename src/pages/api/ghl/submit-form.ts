import type { APIRoute } from 'astro';
import { ghlClient } from '../../../lib/api/ghl';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { data, config } = body;

    // Determine site type from environment or request
    const siteType = import.meta.env.SITE_TYPE || data.siteType || 'business';

    // Extract email for contact lookup
    const email = data.email;
    if (!email) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Email is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Prepare contact data based on form type and site type
    const contactData = {
      firstName: data.firstName || data.name?.split(' ')[0] || '',
      lastName: data.lastName || data.name?.split(' ').slice(1).join(' ') || '',
      email: email,
      phone: data.phone || '',
      tags: [
        siteType, // 'church' or 'business'
        data.formType, // 'contact', 'prayer', 'quote', etc.
        ...(config.tags || [])
      ],
      customFields: {
        formType: data.formType,
        siteType: siteType,
        submittedAt: new Date().toISOString(),
        ...data, // Include all form data as custom fields
      }
    };

    // Handle special church-specific data
    if (siteType === 'church' && data.formType === 'prayer') {
      contactData.customFields.prayerRequest = data.prayerRequest;
      contactData.customFields.requestType = data.requestType;
      contactData.customFields.isPrivate = data.isPrivate || false;
      contactData.customFields.needsPastoralCare = data.needsPastoralCare || false;

      // Add specific tags for prayer requests
      if (data.needsPastoralCare) {
        contactData.tags.push('needs-pastoral-care');
      }
      if (data.isPrivate) {
        contactData.tags.push('private-prayer-request');
      }
    }

    // Handle business-specific data
    if (siteType === 'business' && data.formType === 'quote') {
      contactData.customFields.service = data.service;
      contactData.customFields.budget = data.budget;
      contactData.customFields.timeline = data.timeline;
      contactData.tags.push('lead');
    }

    // Create or update contact based on configuration
    let contact;
    if (config.updateExisting !== false) {
      // Default behavior: update existing contacts
      contact = await ghlClient.createOrUpdateContact(contactData);
    } else {
      // Only create new contacts (might fail if duplicate)
      contact = await ghlClient.createContact(contactData);
    }

    // Add note with form submission details
    if (contact?.id) {
      const noteBody = formatSubmissionNote(data, siteType);
      await ghlClient.addNote(contact.id, noteBody);

      // Trigger workflow if specified
      if (config.workflowId) {
        await ghlClient.triggerWorkflow(config.workflowId, contact.id);
      }

      // Create opportunity for business leads
      if (siteType === 'business' && config.pipelineId && config.stageId) {
        await ghlClient.createOpportunity(
          contact.id,
          config.pipelineId,
          config.stageId,
          {
            name: `${data.formType} from ${contact.firstName} ${contact.lastName}`,
            value: data.budget || 0,
            source: 'Website Form',
          }
        );
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Form submitted successfully',
      contactId: contact?.id,
      isExisting: contact?.isExisting || false,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to process form submission'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Helper function to format submission note
function formatSubmissionNote(data: any, siteType: string): string {
  let note = `New ${data.formType} form submission\n`;
  note += `Site Type: ${siteType}\n`;
  note += `Submitted: ${new Date().toLocaleString()}\n\n`;

  // Add form-specific details
  if (data.formType === 'prayer' && data.prayerRequest) {
    note += `Prayer Request:\n${data.prayerRequest}\n`;
    note += `Type: ${data.requestType}\n`;
    if (data.needsPastoralCare) {
      note += `⚠️ NEEDS PASTORAL CARE\n`;
    }
  } else if (data.formType === 'quote') {
    note += `Service: ${data.service || 'Not specified'}\n`;
    note += `Budget: ${data.budget || 'Not specified'}\n`;
    note += `Timeline: ${data.timeline || 'Not specified'}\n`;
  } else if (data.message) {
    note += `Message:\n${data.message}\n`;
  }

  return note;
}