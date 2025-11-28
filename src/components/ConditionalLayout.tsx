'use client';

import { usePathname } from 'next/navigation';
import { useOptimistic } from '@sanity/visual-editing';
import type { SanityDocument } from '@sanity/client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import CookieBanner from '@/components/CookieBanner';
import { SKIP_TO_CONTENT_ID } from '@/constants/accessibility';

interface SanityImage {
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

interface ConditionalLayoutProps {
  children: React.ReactNode;
  settings?: {
    _id: string;
    _type: string;
    navigation?: {
      sparkLogo?: SanityImage;
      wordmarkLogo?: SanityImage;
      links?: Array<{
        label: string;
        href: string;
      }>;
    };
    footer?: {
      sparkLogo?: SanityImage;
      wordmarkLogo?: SanityImage;
      tagline?: string;
      description?: string;
      copyrightText?: string;
      additionalText?: string;
    };
  };
  homePage?: {
    _id: string;
    _type: string;
    captainsSection?: {
      enabled?: boolean;
    };
  };
}

export default function ConditionalLayout({
  children,
  settings: initialSettings,
  homePage: initialHomePage,
}: ConditionalLayoutProps) {
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

  // Reserved for future conditional rendering based on CMS settings
  const _homePage = useOptimistic<ConditionalLayoutProps['homePage'], SanityDocument>(
    initialHomePage,
    (currentHomePage, action) => {
      if (action.document?._type !== 'homePage') {
        return currentHomePage;
      }

      if (!currentHomePage) {
        return action.document as ConditionalLayoutProps['homePage'];
      }

      if (action.id !== currentHomePage._id) {
        return currentHomePage;
      }

      return {
        ...currentHomePage,
        ...action.document,
      } as ConditionalLayoutProps['homePage'];
    }
  );

  // Note: captainsEnabled could be used for conditional nav rendering in future
  // const captainsEnabled = Boolean(homePage?.captainsSection?.enabled);

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