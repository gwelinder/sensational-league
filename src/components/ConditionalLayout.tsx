'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { SKIP_TO_CONTENT_ID } from '@/constants/accessibility';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isStudioRoute = pathname.startsWith('/studio');

  if (isStudioRoute) {
    return <div id={SKIP_TO_CONTENT_ID}>{children}</div>;
  }

  return (
    <>
      <Header />
      <div id={SKIP_TO_CONTENT_ID}>{children}</div>
      <Footer />
      <CookieBanner />
    </>
  );
}