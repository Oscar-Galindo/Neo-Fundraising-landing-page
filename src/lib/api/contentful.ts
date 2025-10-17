import { createClient } from 'contentful';
import type { Entry, Asset } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import type { Document } from '@contentful/rich-text-types';
import { optimizeImage } from '../utils/cloudinary';

// Initialize Contentful client
const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.PUBLIC_CONTENTFUL_ACCESS_TOKEN || import.meta.env.CONTENTFUL_ACCESS_TOKEN || '',
  environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// Preview client for draft content
const previewClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.CONTENTFUL_PREVIEW_TOKEN || '',
  environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
  host: 'preview.contentful.com',
});

// Type definitions for content models
export interface HeroSection {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: Asset;
  primaryCTA?: {
    label: string;
    href: string;
    openInNewTab?: boolean;
  };
  secondaryCTA?: {
    label: string;
    href: string;
    openInNewTab?: boolean;
  };
  variant?: 'center' | 'left' | 'right';
  height?: 'full' | 'large' | 'medium';
}

export interface FeatureSection {
  title: string;
  subtitle?: string;
  features: Feature[];
  layout?: 'grid' | 'list';
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
  image?: Asset;
  link?: {
    label: string;
    href: string;
  };
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: Asset;
  email?: string;
  phone?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface Event {
  title: string;
  date: string;
  time?: string;
  endDate?: string;
  description?: Document;
  location?: string;
  image?: Asset;
  registrationUrl?: string;
  category?: string[];
  isFeatured?: boolean;
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt?: string;
  content: Document;
  featuredImage?: Asset;
  author?: TeamMember;
  publishDate: string;
  category?: string[];
  tags?: string[];
  seo?: SEOFields;
}

export interface Service {
  title: string;
  description?: Document;
  shortDescription?: string;
  image?: Asset;
  price?: string;
  features?: string[];
  ctaLabel?: string;
  ctaLink?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  image?: Asset;
  rating?: number;
}

export interface SEOFields {
  metaTitle?: string;
  metaDescription?: string;
  openGraphImage?: Asset;
  noIndex?: boolean;
  canonicalUrl?: string;
}

export interface Page {
  title: string;
  slug: string;
  sections?: Entry<any>[];
  seo?: SEOFields;
}

// Helper functions
export function extractImageUrl(asset: Asset | undefined): string | undefined {
  if (!asset?.fields?.file?.url) return undefined;
  const url = asset.fields.file.url;
  // Add https: if URL starts with //
  return url.startsWith('//') ? `https:${url}` : url;
}

export function optimizeContentfulImage(
  asset: Asset | undefined,
  options?: Parameters<typeof optimizeImage>[1]
): string {
  const url = extractImageUrl(asset);
  if (!url) return '';
  return optimizeImage(url, options);
}

export function renderRichText(document: Document | undefined): string {
  if (!document) return '';
  return documentToHtmlString(document);
}

// Main API functions
export async function getPage(slug: string, preview = false): Promise<Page | null> {
  const apiClient = preview ? previewClient : client;

  try {
    const response = await apiClient.getEntries<Page>({
      content_type: 'page',
      'fields.slug': slug,
      include: 3, // Include nested content
      limit: 1,
    });

    if (!response.items.length) return null;

    return response.items[0].fields;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export async function getHeroSection(entryId: string): Promise<HeroSection | null> {
  try {
    const entry = await client.getEntry<HeroSection>(entryId);
    return entry.fields;
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
}

export async function getEvents(options: {
  limit?: number;
  featured?: boolean;
  category?: string;
  upcoming?: boolean;
} = {}): Promise<Event[]> {
  try {
    const query: any = {
      content_type: 'event',
      order: 'fields.date',
      limit: options.limit || 10,
    };

    if (options.featured) {
      query['fields.isFeatured'] = true;
    }

    if (options.category) {
      query['fields.category[in]'] = options.category;
    }

    if (options.upcoming) {
      query['fields.date[gte]'] = new Date().toISOString();
    }

    const response = await client.getEntries<Event>(query);
    return response.items.map(item => item.fields);
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getBlogPosts(options: {
  limit?: number;
  category?: string;
  tag?: string;
  excludeSlug?: string;
} = {}): Promise<BlogPost[]> {
  try {
    const query: any = {
      content_type: 'blogPost',
      order: '-fields.publishDate',
      limit: options.limit || 10,
    };

    if (options.category) {
      query['fields.category[in]'] = options.category;
    }

    if (options.tag) {
      query['fields.tags[in]'] = options.tag;
    }

    if (options.excludeSlug) {
      query['fields.slug[ne]'] = options.excludeSlug;
    }

    const response = await client.getEntries<BlogPost>(query);
    return response.items.map(item => item.fields);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await client.getEntries<BlogPost>({
      content_type: 'blogPost',
      'fields.slug': slug,
      include: 2,
      limit: 1,
    });

    if (!response.items.length) return null;

    return response.items[0].fields;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getTeamMembers(options: {
  limit?: number;
  department?: string;
} = {}): Promise<TeamMember[]> {
  try {
    const query: any = {
      content_type: 'teamMember',
      order: 'fields.order,fields.name',
      limit: options.limit || 20,
    };

    if (options.department) {
      query['fields.department'] = options.department;
    }

    const response = await client.getEntries<TeamMember>(query);
    return response.items.map(item => item.fields);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

export async function getServices(options: {
  limit?: number;
  featured?: boolean;
} = {}): Promise<Service[]> {
  try {
    const query: any = {
      content_type: 'service',
      order: 'fields.order,fields.title',
      limit: options.limit || 10,
    };

    if (options.featured) {
      query['fields.isFeatured'] = true;
    }

    const response = await client.getEntries<Service>(query);
    return response.items.map(item => item.fields);
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getTestimonials(options: {
  limit?: number;
  featured?: boolean;
} = {}): Promise<Testimonial[]> {
  try {
    const query: any = {
      content_type: 'testimonial',
      order: '-sys.createdAt',
      limit: options.limit || 10,
    };

    if (options.featured) {
      query['fields.isFeatured'] = true;
    }

    const response = await client.getEntries<Testimonial>(query);
    return response.items.map(item => item.fields);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

// Global site settings
export async function getSiteSettings() {
  try {
    const response = await client.getEntries({
      content_type: 'siteSettings',
      limit: 1,
    });

    if (!response.items.length) return null;

    return response.items[0].fields;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

// Export the client for custom queries
export { client, previewClient };