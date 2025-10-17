import { client } from './contentful';

/**
 * Get all page slugs for static generation
 */
export async function getAllPageSlugs(): Promise<string[]> {
  try {
    // Try standard 'page' content type first
    const response = await client.getEntries({
      content_type: 'page',
      select: 'fields.slug',
      limit: 1000,
    }).catch(() => null);

    if (response?.items) {
      return response.items.map(item => item.fields.slug as string);
    }
    
    // If 'page' doesn't exist, check for 'homepageContent'
    const homepageResponse = await client.getEntries({
      content_type: 'homepageContent',
      limit: 1,
    }).catch(() => null);

    if (homepageResponse?.items.length) {
      // Return 'home' as the only slug for homepage
      return ['home'];
    }

    return [];
  } catch (error: any) {
    // Handle "unknownContentType" error gracefully - means content model doesn't exist yet
    if (error?.message?.includes('unknownContentType') || error?.statusText === 'Bad Request') {
      console.warn('⚠️  Page content type not found in Contentful. Create it following contentful-setup.md');
      return [];
    }
    console.error('Error fetching page slugs:', error);
    return [];
  }
}

/**
 * Get static paths for Astro
 */
export async function getStaticPagePaths() {
  const slugs = await getAllPageSlugs();

  return slugs.map(slug => ({
    params: { slug: slug === 'home' ? undefined : slug }
  }));
}