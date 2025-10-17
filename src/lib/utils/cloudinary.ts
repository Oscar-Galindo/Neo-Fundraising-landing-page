interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: string | number;
  format?: string;
  crop?: string;
  gravity?: string;
  radius?: string;
  effect?: string;
  overlay?: string;
  dpr?: string | number;
}

const CLOUDINARY_CLOUD_NAME = import.meta.env.CLOUDINARY_CLOUD_NAME || 'demo';

/**
 * Optimize images using Cloudinary Fetch Mode
 * This fetches and optimizes any image URL through Cloudinary's CDN
 */
export function optimizeImage(
  imageUrl: string | undefined | null,
  options: CloudinaryOptions = {}
): string {
  if (!imageUrl) return '';

  // If already a Cloudinary URL, return as-is
  if (imageUrl.includes('res.cloudinary.com')) {
    return imageUrl;
  }

  // Build transformation string
  const transforms: string[] = [];

  // Auto format and quality by default
  transforms.push('f_auto');
  transforms.push(options.quality ? `q_${options.quality}` : 'q_auto');

  // Add width/height if specified
  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);

  // Add crop mode
  if (options.crop) transforms.push(`c_${options.crop}`);
  if (options.gravity) transforms.push(`g_${options.gravity}`);

  // Add effects
  if (options.radius) transforms.push(`r_${options.radius}`);
  if (options.effect) transforms.push(`e_${options.effect}`);
  if (options.overlay) transforms.push(`l_${options.overlay}`);

  // Add DPR for retina displays
  transforms.push(options.dpr ? `dpr_${options.dpr}` : 'dpr_auto');

  // Build final URL
  const transformation = transforms.join(',');

  // Encode the original URL
  const encodedUrl = encodeURIComponent(imageUrl);

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/${transformation}/${encodedUrl}`;
}

/**
 * Preset image transformations for common use cases
 */
export const cdn = {
  // Full-width hero images
  hero: (url: string) => optimizeImage(url, {
    width: 1920,
    quality: 85,
    crop: 'fill',
  }),

  // Card thumbnails
  thumbnail: (url: string) => optimizeImage(url, {
    width: 400,
    height: 300,
    crop: 'fill',
    gravity: 'auto',
  }),

  // Team member photos
  avatar: (url: string) => optimizeImage(url, {
    width: 200,
    height: 200,
    crop: 'fill',
    gravity: 'face',
    radius: 'max',
  }),

  // Gallery images
  gallery: (url: string) => optimizeImage(url, {
    width: 800,
    quality: 80,
  }),

  // Blog post images
  blog: (url: string) => optimizeImage(url, {
    width: 1200,
    quality: 80,
  }),

  // Background images
  background: (url: string) => optimizeImage(url, {
    width: 1920,
    quality: 70,
    effect: 'blur:300',
  }),

  // Social media preview
  ogImage: (url: string) => optimizeImage(url, {
    width: 1200,
    height: 630,
    crop: 'fill',
  }),
};

/**
 * Generate responsive image srcset
 */
export function generateSrcSet(url: string, sizes: number[] = [400, 800, 1200, 1920]): string {
  return sizes
    .map(size => `${optimizeImage(url, { width: size })} ${size}w`)
    .join(', ');
}

/**
 * Get placeholder image (blur or color)
 */
export function getPlaceholder(url: string): string {
  return optimizeImage(url, {
    width: 20,
    quality: 10,
    effect: 'blur:1000',
  });
}