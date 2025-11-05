import { NextResponse } from 'next/server';

export async function GET() {
  // Redirect to the static image with properly encoded URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sensationalleague.com';
  const imageUrl = `${baseUrl}/Bettina,%20Majken%20og%20Rene%20Large.jpeg`;
  return NextResponse.redirect(imageUrl);
}
