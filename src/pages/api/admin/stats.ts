import type { APIRoute } from 'astro';
import { client } from '../../../lib/api/contentful';
import { ghlClient } from '../../../lib/api/ghl';

export const GET: APIRoute = async ({ request }) => {
  try {
    const siteType = import.meta.env.SITE_TYPE || 'business';

    // Fetch real data from Contentful and GHL
    // For now, returning sample data
    // In production, fetch actual counts from your APIs

    const stats = {
      church: {
        totalMembers: 247, // Would come from GHL contacts tagged as 'member'
        weeklyAttendance: 185, // Could track via event check-ins
        prayerRequests: 12, // From form submissions this week
        upcomingEvents: 8 // From Contentful events
      },
      business: {
        totalLeads: 156, // From GHL contacts
        conversionRate: 23, // Calculate from GHL pipeline
        activeProjects: 7, // From Contentful or GHL opportunities
        monthlyVisitors: 4823 // Would come from analytics
      }
    };

    // You could fetch real data like this:
    /*
    try {
      // Get Contentful content counts
      const events = await client.getEntries({ content_type: 'event', limit: 1 });
      const blogPosts = await client.getEntries({ content_type: 'blogPost', limit: 1 });

      // Get GHL data (if needed)
      // const contacts = await ghlClient.getContacts();

      stats.church.upcomingEvents = events.total;
    } catch (error) {
      console.error('Failed to fetch real stats:', error);
    }
    */

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=60' // Cache for 1 minute
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to fetch stats',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};