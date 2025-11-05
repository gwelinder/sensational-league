import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const runtime = 'edge';

export async function GET() {
  try {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
      apiVersion: '2025-10-31',
      useCdn: true,
    });

    const pressRelease = await client.fetch<{
      ogImageUrl?: string;
      featuredImage?: any;
    }>(
      `*[_type == "pressRelease"] | order(publishDate desc)[0] {
        ogImageUrl,
        featuredImage
      }`
    );

    let imageUrl: string;

    // Priority 1: Use explicit ogImageUrl if provided
    if (pressRelease?.ogImageUrl) {
      imageUrl = pressRelease.ogImageUrl;
    }
    // Priority 2: Generate URL from Sanity-hosted featuredImage
    else if (pressRelease?.featuredImage?.asset) {
      const builder = imageUrlBuilder(client);
      imageUrl = builder
        .image(pressRelease.featuredImage)
        .width(1200)
        .height(630)
        .fit('crop')
        .quality(85)
        .format('jpg')
        .url();
    } else {
      // Fallback to default opengraph-image route
      return NextResponse.redirect(new URL('/press/opengraph-image', process.env.NEXT_PUBLIC_SITE_URL || 'https://sensationalleague.com'));
    }

    // Redirect to the actual image URL
    return NextResponse.redirect(imageUrl);
  } catch (error) {
    console.error('Error fetching OG image:', error);
    // Fallback to default opengraph-image route
    return NextResponse.redirect(new URL('/press/opengraph-image', process.env.NEXT_PUBLIC_SITE_URL || 'https://sensationalleague.com'));
  }
}
