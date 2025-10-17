export interface GHLFormConfig {
  formId: string;
  redirectUrl?: string;
  className?: string;
  style?: 'inline' | 'modal' | 'popup';
  height?: string;
  width?: string;
}

export interface GHLContactData {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

class GHLClient {
  private apiKey: string;
  private locationId: string;
  private baseUrl = 'https://api.gohighlevel.com/v1';

  constructor() {
    this.apiKey = import.meta.env.GHL_API_KEY || '';
    this.locationId = import.meta.env.GHL_LOCATION_ID || '';
  }

  async submitContact(data: GHLContactData) {
    if (!this.apiKey || !this.locationId) {
      throw new Error('GHL API key and Location ID are required');
    }

    const response = await fetch(`${this.baseUrl}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId: this.locationId,
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error(`GHL API Error: ${response.statusText}`);
    }

    return response.json();
  }

  getEmbedUrl(formId: string): string {
    return `https://api.leadconnectorhq.com/widget/form/${formId}`;
  }

  getScriptTag(formId: string): string {
    return `<script src="https://link.msgsndr.com/js/form_embed.js" data-form="${formId}"></script>`;
  }
}

export const ghlClient = new GHLClient();