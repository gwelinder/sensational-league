'use client';

import { usePathname } from 'next/navigation';
import { useOptimistic } from '@sanity/visual-editing';
import type { SanityDocument } from '@sanity/client';
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

export default function ConditionalLayout({ children, settings: initialSettings }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isStudioRoute = pathname.startsWith('/studio');

  // Use optimistic updates for settings to prevent reloads
  const settings = useOptimistic<ConditionalLayoutProps['settings'], SanityDocument>(
    initialSettings,
    (currentSettings, action) => {
      // Only update if this is the siteSettings document
      if (!currentSettings || action.id !== currentSettings._id) {
        return currentSettings;
      }

      // Merge the updated document
      return {
        ...currentSettings,
        ...action.document,
      } as ConditionalLayoutProps['settings'];
    }
  );

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