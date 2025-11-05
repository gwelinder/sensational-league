import { NextResponse } from 'next/server';

export async function GET() {
  // Simply redirect to the static image - Vercel CDN will optimize it
  const imageUrl = new URL('/Bettina, Majken og Rene Large.jpeg', process.env.NEXT_PUBLIC_SITE_URL || 'https://sensationalleague.com');
  return NextResponse.redirect(imageUrl);
}
