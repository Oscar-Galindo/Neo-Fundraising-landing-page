interface CloudinaryOptions {
  width?: number
  height?: number
  quality?: 'auto' | number
  format?: 'auto' | 'webp' | 'jpg' | 'png'
  dpr?: 'auto' | number
  crop?: 'fill' | 'fit' | 'scale' | 'pad'
  gravity?: 'auto' | 'face' | 'center'
}

const CLOUDINARY_BASE = 'https://res.cloudinary.com'
const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'

export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryOptions = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    dpr = 'auto',
    crop = 'fill',
    gravity = 'auto',
  } = options

  const transformations: string[] = []

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  transformations.push(`q_${quality}`)
  transformations.push(`f_${format}`)
  transformations.push(`dpr_${dpr}`)
  if (width || height) {
    transformations.push(`c_${crop}`)
    if (gravity) transformations.push(`g_${gravity}`)
  }

  const transformation = transformations.join(',')
  return `${CLOUDINARY_BASE}/${CLOUD_NAME}/image/upload/${transformation}/${publicId}`
}

export function getCloudinaryFetchUrl(
  url: string,
  options: CloudinaryOptions = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    dpr = 'auto',
    crop = 'fill',
  } = options

  const transformations: string[] = []

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  transformations.push(`q_${quality}`)
  transformations.push(`f_${format}`)
  transformations.push(`dpr_${dpr}`)
  if (width || height) transformations.push(`c_${crop}`)

  const transformation = transformations.join(',')
  const encodedUrl = encodeURIComponent(url)
  return `${CLOUDINARY_BASE}/${CLOUD_NAME}/image/fetch/${transformation}/${encodedUrl}`
}

export function getResponsiveImageSizes(maxWidth = 1920): number[] {
  const sizes = []
  let width = 320

  while (width <= maxWidth) {
    sizes.push(width)
    width = Math.round(width * 1.5)
  }

  if (sizes[sizes.length - 1] !== maxWidth) {
    sizes.push(maxWidth)
  }

  return sizes
}

export function generateSrcSet(
  publicIdOrUrl: string,
  options: CloudinaryOptions = {},
  isFetch = false
): string {
  const sizes = getResponsiveImageSizes(options.width || 1920)

  return sizes
    .map(size => {
      const url = isFetch
        ? getCloudinaryFetchUrl(publicIdOrUrl, { ...options, width: size })
        : getCloudinaryUrl(publicIdOrUrl, { ...options, width: size })
      return `${url} ${size}w`
    })
    .join(', ')
}