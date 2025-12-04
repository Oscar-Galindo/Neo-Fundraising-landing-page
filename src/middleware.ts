import { defineMiddleware } from 'astro:middleware';

// License validation disabled for fundraiser use
export const onRequest = defineMiddleware(async (context, next) => {
  // No license validation needed for fundraiser
  return next();
});