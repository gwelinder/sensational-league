import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);

interface ImageMetadata {
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * Generate an optimized image URL from a Sanity image reference
 * @param source - Sanity image object
 * @returns Image URL builder instance
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Get a direct URL for a Sanity image with optional width
 * @param source - Sanity image object
 * @param width - Optional width for the image
 * @returns URL string or null if source is invalid
 */
export function getImageUrl(source: SanityImageSource | null | undefined, width?: number): string | null {
  if (!source) return null;

  try {
    const urlBuilder = builder.image(source);
    if (width) {
      return urlBuilder.width(width).url();
    }
    return urlBuilder.url();
  } catch (error) {
    console.warn('Failed to generate image URL:', error);
    return null;
  }
}

/**
 * Get dimensions for a Sanity image
 * @param source - Sanity image object
 * @returns Object with width and height, or null
 */
export function getImageDimensions(source: any): { width: number; height: number } | null {
  if (!source?.asset?._ref) return null;

  // Parse dimensions from asset reference
  // Format: image-{assetId}-{width}x{height}-{format}
  const match = source.asset._ref.match(/-(\d+)x(\d+)-/);
  if (match) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10),
    };
  }

  return null;
}

/**
 * Get image styles from metadata
 * @param metadata - Image metadata including width, height, objectFit
 * @returns CSS style object and className
 */
export function getImageStyles(metadata?: ImageMetadata) {
  const style: React.CSSProperties = {};

  if (metadata?.width) {
    style.width = `${metadata.width}px`;
  }

  if (metadata?.height) {
    style.height = `${metadata.height}px`;
  }

  if (metadata?.objectFit) {
    style.objectFit = metadata.objectFit;
  }

  return style;
}

/**
 * Get image props (src, style, alt) from a Sanity image with metadata
 * @param image - Sanity image object with metadata
 * @param defaultWidth - Default width for image URL generation
 * @returns Object with src, style, and alt (src is undefined if URL generation fails)
 */
export function getImageProps(image: any, defaultWidth?: number) {
  const src = getImageUrl(image, defaultWidth) || undefined;
  const style = getImageStyles(image);
  const alt = image?.alt || '';

  return { src, style, alt };
}
