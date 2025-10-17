export interface SiteConfig {
  name: string;
  url: string;
  type: 'church' | 'business';
  description: string;
  logo: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
  };
  features: {
    events: boolean;
    sermons: boolean;
    donations: boolean;
    blog: boolean;
    shop: boolean;
    booking: boolean;
    livestream: boolean;
  };
  theme: {
    primaryColor: string;
    accentColor: string;
    fontFamily: string;
  };
}

// Default configuration - will be overridden by environment variables and CMS
export const siteConfig: SiteConfig = {
  name: import.meta.env.SITE_NAME || 'Nexus Starter',
  url: import.meta.env.SITE_URL || 'https://example.com',
  type: (import.meta.env.SITE_TYPE as 'church' | 'business') || 'business',
  description: 'Modern website starter kit for churches and small businesses',
  logo: '/logo.svg',
  email: 'info@example.com',
  phone: '(555) 123-4567',
  address: {
    street: '123 Main Street',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'USA',
  },
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com',
  },
  features: {
    events: true,
    sermons: false, // Enable for churches
    donations: false, // Enable for churches
    blog: true,
    shop: false,
    booking: true,
    livestream: false, // Enable for churches
  },
  theme: {
    primaryColor: 'primary',
    accentColor: 'accent',
    fontFamily: 'sans',
  },
};

// Church-specific defaults
export const churchDefaults = {
  servicesTimes: [
    { day: 'Sunday', time: '9:00 AM', type: 'Traditional Service' },
    { day: 'Sunday', time: '11:00 AM', type: 'Contemporary Service' },
    { day: 'Wednesday', time: '7:00 PM', type: 'Bible Study' },
  ],
  ministries: [
    'Children\'s Ministry',
    'Youth Ministry',
    'Women\'s Ministry',
    'Men\'s Ministry',
    'Worship Team',
    'Community Outreach',
  ],
};

// Business-specific defaults
export const businessDefaults = {
  services: [
    'Consulting',
    'Design',
    'Development',
    'Marketing',
    'Support',
  ],
  industries: [
    'Healthcare',
    'Technology',
    'Finance',
    'Retail',
    'Education',
  ],
};

// Helper to get config based on type
export function getTypeConfig() {
  return siteConfig.type === 'church' ? churchDefaults : businessDefaults;
}