import axios from 'axios';
import type { AxiosInstance } from 'axios';

interface GHLConfig {
  apiKey: string;
  locationId: string;
}

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

interface EventData {
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
  location?: string;
  meetingUrl?: string;
}

interface FormSubmission {
  formId: string;
  data: Record<string, any>;
}

class GHLClient {
  private client: AxiosInstance;
  private locationId: string;

  constructor(config: GHLConfig) {
    this.locationId = config.locationId;
    this.client = axios.create({
      baseURL: 'https://rest.gohighlevel.com/v1',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // Contact Management
  async createOrUpdateContact(data: ContactData) {
    try {
      // First, try to find existing contact by email
      const existingContact = await this.findContactByEmail(data.email);

      if (existingContact) {
        // Update existing contact and merge data
        return await this.updateContact(existingContact.id, {
          ...data,
          tags: [...(existingContact.tags || []), ...(data.tags || [])],
          customFields: {
            ...existingContact.customFields,
            ...data.customFields,
            lastFormSubmission: new Date().toISOString(),
          }
        });
      } else {
        // Create new contact
        return await this.createContact(data);
      }
    } catch (error) {
      console.error('Error creating/updating contact:', error);
      throw error;
    }
  }

  async createContact(data: ContactData) {
    try {
      const response = await this.client.post('/contacts', {
        ...data,
        locationId: this.locationId,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }

  async findContactByEmail(email: string) {
    try {
      const response = await this.client.get('/contacts/lookup', {
        params: {
          email,
          locationId: this.locationId,
        }
      });
      return response.data.contacts?.[0] || null;
    } catch (error) {
      console.error('Error finding contact:', error);
      return null;
    }
  }

  async updateContact(contactId: string, data: Partial<ContactData>) {
    try {
      const response = await this.client.put(`/contacts/${contactId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  }

  async getContact(contactId: string) {
    try {
      const response = await this.client.get(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contact:', error);
      throw error;
    }
  }

  // Calendar & Events
  async getCalendarEvents(calendarId?: string) {
    try {
      const params = calendarId
        ? { calendarId, locationId: this.locationId }
        : { locationId: this.locationId };

      const response = await this.client.get('/appointments', { params });
      return response.data.appointments;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      throw error;
    }
  }

  async createEvent(data: EventData) {
    try {
      const response = await this.client.post('/appointments', {
        ...data,
        locationId: this.locationId,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  // Form Handling
  async submitForm(formData: FormSubmission) {
    try {
      // Process form submission
      const contact = await this.createContact({
        firstName: formData.data.firstName || '',
        lastName: formData.data.lastName || '',
        email: formData.data.email,
        phone: formData.data.phone,
        tags: ['website-form', formData.formId],
        customFields: formData.data,
      });

      // Trigger automation if configured
      if (formData.data.triggerId) {
        await this.triggerWorkflow(formData.data.triggerId, contact.id);
      }

      return contact;
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  }

  // Workflows & Automation
  async triggerWorkflow(workflowId: string, contactId: string) {
    try {
      const response = await this.client.post(`/workflows/${workflowId}/trigger`, {
        contactId,
      });
      return response.data;
    } catch (error) {
      console.error('Error triggering workflow:', error);
      throw error;
    }
  }

  // Opportunities (Pipeline)
  async createOpportunity(contactId: string, pipelineId: string, stageId: string, data: any = {}) {
    try {
      const response = await this.client.post('/opportunities', {
        contactId,
        pipelineId,
        stageId,
        locationId: this.locationId,
        ...data,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating opportunity:', error);
      throw error;
    }
  }

  // Notes & Activities
  async addNote(contactId: string, body: string) {
    try {
      const response = await this.client.post('/notes', {
        contactId,
        body,
        userId: 'system',
      });
      return response.data;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  }

  // Tags
  async addTag(contactId: string, tag: string) {
    try {
      const response = await this.client.post(`/contacts/${contactId}/tags`, {
        tags: [tag],
      });
      return response.data;
    } catch (error) {
      console.error('Error adding tag:', error);
      throw error;
    }
  }

  // Custom Fields
  async updateCustomField(contactId: string, fieldKey: string, value: any) {
    try {
      const response = await this.client.put(`/contacts/${contactId}`, {
        customFields: {
          [fieldKey]: value,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating custom field:', error);
      throw error;
    }
  }
}

// Initialize and export client
const ghlConfig: GHLConfig = {
  apiKey: import.meta.env.GHL_API_KEY || '',
  locationId: import.meta.env.GHL_LOCATION_ID || '',
};

export const ghlClient = new GHLClient(ghlConfig);

// Export types
export type { ContactData, EventData, FormSubmission };