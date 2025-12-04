import { defineMiddleware } from 'astro:middleware';

// Simple pass-through middleware - no license validation for fundraiser
export const onRequest = defineMiddleware(async (context, next) => {
  return next();
});

