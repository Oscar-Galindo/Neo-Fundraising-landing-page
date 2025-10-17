import { createClient } from 'contentful'
import type { Entry, Asset, EntryCollection } from 'contentful'

const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
  environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
})

export interface HeroContent {
  headline?: string
  subhead?: string
  disclaimer?: string
  backgroundImage?: Asset
}

export interface ChannelContent {
  title?: string
  bullets?: string[]
}

export interface MethodContent {
  title?: string
  items?: Array<{
    title: string
    description?: string
  }>
}

export interface TimelineContent {
  title?: string
  items?: Array<{
    phase: string
    title: string
    tasks: string[]
  }>
}

export interface PartnerContent {
  name: string
  logo?: Asset
  features: string[]
}

export interface StatContent {
  label: string
  value: string
  improvement: string
}

export interface IndustryContent {
  name: string
  icon?: string
}

export interface FAQContent {
  question: string
  answer: string
}

export interface SectionContent {
  hero?: HeroContent
  channels?: ChannelContent
  method?: MethodContent
  timeline?: TimelineContent
  partners?: PartnerContent[]
  stats?: StatContent[]
  industries?: IndustryContent[]
  faqs?: FAQContent[]
  ctaHeadline?: string
  ctaBody?: string
}

export async function fetchContent<T>(
  contentType: string,
  query: any = {}
): Promise<T | null> {
  try {
    const response = await client.getEntries({
      content_type: contentType,
      limit: 1,
      ...query,
    })

    if (response.items.length > 0) {
      return response.items[0].fields as T
    }
    return null
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error)
    return null
  }
}

export async function fetchNavigation(type: string = 'main'): Promise<any> {
  try {
    const response = await client.getEntries({
      content_type: 'navigation',
      'fields.title': type,
      limit: 1,
      include: 2 // Include linked assets like logo
    })

    if (response.items.length > 0) {
      return response.items[0].fields
    }
    return null
  } catch (error) {
    console.error(`Error fetching ${type} navigation:`, error)
    return null
  }
}

export async function fetchAllContent(): Promise<any> {
  try {
    // Fetch all homepage content entries
    const response = await client.getEntries({
      content_type: 'homepageContent',
      limit: 20
    })

    // Organize entries by section name
    const contentBySections: any = {}
    response.items.forEach((entry: any) => {
      const sectionName = entry.fields.sectionName
      contentBySections[sectionName] = entry.fields
    })

    // Also fetch global settings if they exist
    let globalSettings: any = {}
    try {
      const settings = await client.getEntries({
        content_type: 'globalSettings',
        limit: 1
      })
      if (settings.items.length > 0) {
        globalSettings = settings.items[0].fields
      }
    } catch (e) {
      console.log('No global settings found')
    }

    // Map to expected structure for backward compatibility
    return {
      hero: {
        headline: contentBySections.hero?.headline,
        subhead: contentBySections.hero?.subheadline,
        disclaimer: contentBySections.hero?.disclaimer,
        backgroundImage: contentBySections.hero?.backgroundImage,
        heroImageUrl: contentBySections.hero?.heroImageUrl
      },
      channels: {
        title: contentBySections.channels?.headline,
        bullets: [
          contentBySections.channels?.items?.[0]?.description,
          contentBySections.channels?.items?.[1]?.description,
          contentBySections.channels?.items?.[2]?.description
        ].filter(Boolean)
      },
      method: {
        title: contentBySections.method?.headline,
        items: contentBySections.method?.items
      },
      timeline: {
        title: contentBySections.timeline?.headline,
        items: contentBySections.timeline?.items
      },
      partners: contentBySections.partners?.items,
      stats: contentBySections.results?.items,
      industries: contentBySections.industries?.items,
      faqs: contentBySections.faq?.items,
      ctaHeadline: contentBySections.primaryCTA?.headline,
      ctaBody: contentBySections.primaryCTA?.subheadline,
      urgencyBanner: contentBySections.urgencyBanner?.headline,
      integration: {
        headline: contentBySections.integration?.headline,
        subheadline: contentBySections.integration?.subheadline,
        items: contentBySections.integration?.items
      },
      globalSettings,
      // Also provide raw sections for direct access
      sections: contentBySections
    }
  } catch (error) {
    console.error('Error fetching all content:', error)
    return {}
  }
}

export function preferCMS<T>(cmsValue: T | null | undefined, fallback: T): T {
  return cmsValue !== null && cmsValue !== undefined ? cmsValue : fallback
}