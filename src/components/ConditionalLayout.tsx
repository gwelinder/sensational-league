'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { SKIP_TO_CONTENT_ID } from '@/constants/accessibility';

interface ConditionalLayoutProps {
  children: React.ReactNode;
  settings?: {
    _id: string;
    _type: string;
    navigation?: {
      links?: Array<{
        label: string;
        href: string;
      }>;
    };
    footer?: {
      tagline?: string;
      description?: string;
      copyrightText?: string;
      additionalText?: string;
    };
  };
}

export default function ConditionalLayout({ children, settings }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isStudioRoute = pathname.startsWith('/studio');

  if (isStudioRoute) {
    return <div id={SKIP_TO_CONTENT_ID}>{children}</div>;
  }

  return (
    <>
      <Header settings={settings} />
      <div id={SKIP_TO_CONTENT_ID}>{children}</div>
      <Footer settings={settings} />
      <CookieBanner />
    </>
  );
}