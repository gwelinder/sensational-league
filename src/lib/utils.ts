import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for merging Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Brand utility functions for Sensational League
 */

/**
 * Get appropriate text color based on background
 * Ensures proper contrast per brand guidelines
 */
export function getContrastColor(backgroundColor: string): string {
  const lightBackgrounds = ['#F7F7F7', '#FFFFFF', '#D4FF00', '#00FBFF'];
  const isLight = lightBackgrounds.some(color => 
    backgroundColor.toUpperCase() === color
  );
  
  return isLight ? 'var(--color-black)' : 'var(--color-off-white)';
}

/**
 * Validate logo size according to brand guidelines
 * Returns appropriate variant based on pixel width
 */
export function getLogoVariantForSize(width: number): "large" | "medium" | "small" {
  if (width >= 400) return "large";
  if (width >= 200) return "medium";
  return "small";
}

/**
 * Format brand typography classes
 */
export function getBrandTypography(
  type: "headline" | "subhead" | "subhead-light" | "body" | "caption"
): string {
  const classMap = {
    headline: "brand-headline",
    subhead: "brand-subhead", 
    "subhead-light": "brand-subhead-light",
    body: "brand-body",
    caption: "brand-caption"
  };
  
  return classMap[type];
}