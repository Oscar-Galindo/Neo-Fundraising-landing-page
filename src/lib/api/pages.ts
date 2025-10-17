import { client } from './contentful';

/**
 * Get all page slugs for static generation
 */
export async function getAllPageSlugs(): Promise<string[]> {
  try {
    const response = await client.getEntries({
      content_type: 'page',
      select: 'fields.slug',
      limit: 1000,
    });

    return response.items.map(item => item.fields.slug as string);
  } catch (error) {
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