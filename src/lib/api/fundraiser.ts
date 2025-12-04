import { createClient } from 'contentful'
import type { Asset } from 'contentful'

const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
  environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
})

export interface FundraiserSettings {
  fundraiserName: string
  organizerName?: string
  goalAmount: number
  currentAmount: number
  donorCount?: number
  endDate?: string
  primaryDonationUrl: string
  secondaryDonationUrl?: string
  contactEmail?: string
  socialLinks?: {
    facebook?: string
    instagram?: string
    twitter?: string
    [key: string]: string | undefined
  }
  brandColors?: {
    primary?: string
    secondary?: string
    [key: string]: string | undefined
  }
}

export interface FundraiserContent {
  sectionName: string
  headline?: string
  subheadline?: string
  description?: string
  items?: any[]
  image?: Asset
  ctaText?: string
  ctaUrl?: string
}

export interface FundraiserUpdate {
  title: string
  date: string
  content: string
  image?: Asset
  isImportant?: boolean
}

export async function getFundraiserSettings(): Promise<FundraiserSettings | null> {
  try {
    const response = await client.getEntries({
      content_type: 'fundraiserSettings',
      limit: 1,
    })

    if (!response.items.length) return null

    return response.items[0].fields as FundraiserSettings
  } catch (error) {
    console.error('Error fetching fundraiser settings:', error)
    return null
  }
}

export async function getFundraiserContent(sectionName?: string): Promise<FundraiserContent[]> {
  try {
    const query: any = {
      content_type: 'fundraiserContent',
      order: 'sys.createdAt',
    }

    if (sectionName) {
      query['fields.sectionName'] = sectionName
    }

    const response = await client.getEntries(query)
    return response.items.map(item => item.fields as FundraiserContent)
  } catch (error) {
    console.error('Error fetching fundraiser content:', error)
    return []
  }
}

export async function getFundraiserContentBySection(sectionName: string): Promise<FundraiserContent | null> {
  try {
    const response = await client.getEntries({
      content_type: 'fundraiserContent',
      'fields.sectionName': sectionName,
      limit: 1,
    })

    if (!response.items.length) return null

    return response.items[0].fields as FundraiserContent
  } catch (error) {
    console.error(`Error fetching ${sectionName} content:`, error)
    return null
  }
}

export async function getFundraiserUpdates(limit: number = 10): Promise<FundraiserUpdate[]> {
  try {
    const response = await client.getEntries({
      content_type: 'fundraiserUpdate',
      order: '-fields.date',
      limit,
    })

    return response.items.map(item => item.fields as FundraiserUpdate)
  } catch (error) {
    console.error('Error fetching fundraiser updates:', error)
    return []
  }
}

export function extractImageUrl(asset: Asset | undefined): string | undefined {
  if (!asset?.fields?.file?.url) return undefined
  const url = asset.fields.file.url
  return url.startsWith('//') ? `https:${url}` : url
}

// Helper to get all fundraiser data at once
export async function getAllFundraiserData() {
  const [settings, allContent, updates] = await Promise.all([
    getFundraiserSettings(),
    getFundraiserContent(),
    getFundraiserUpdates(5),
  ])

  // Organize content by section
  const contentBySection: Record<string, FundraiserContent> = {}
  allContent.forEach(content => {
    contentBySection[content.sectionName] = content
  })

  return {
    settings,
    content: contentBySection,
    updates,
  }
}

