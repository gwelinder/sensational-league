'use client';

import Link from "next/link";
import { cn } from "@/lib/utils";
import { createDataAttribute } from "@sanity/visual-editing";

interface FooterProps {
	settings?: {
		_id: string;
		_type: string;
		footer?: {
			tagline?: string;
			description?: string;
			copyrightText?: string;
			additionalText?: string;
		};
	};
}

export default function Footer({ settings }: FooterProps) {
	const footerAttribute = settings?._id ? createDataAttribute({
		id: settings._id,
		type: settings._type,
		path: 'footer',
	}) : undefined;

	const taglineAttribute = settings?._id ? createDataAttribute({
		id: settings._id,
		type: settings._type,
		path: 'footer.tagline',
	}) : undefined;

	const descriptionAttribute = settings?._id ? createDataAttribute({
		id: settings._id,
		type: settings._type,
		path: 'footer.description',
	}) : undefined;

	const copyrightAttribute = settings?._id ? createDataAttribute({
		id: settings._id,
		type: settings._type,
		path: 'footer.copyrightText',
	}) : undefined;

	const additionalAttribute = settings?._id ? createDataAttribute({
		id: settings._id,
		type: settings._type,
		path: 'footer.additionalText',
	}) : undefined;

  return (
    <footer className="bg-white border-t-4 border-black" data-sanity={footerAttribute?.toString()}>
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Brand Section */}
        <div className="mb-20">
          <div className="flex items-center gap-6 mb-10">
            <img
              src="/logos/SL-SPARK-LARGE.svg"
              alt=""
              className="w-20 h-20"
            />
            <img
              src="/logos/SL-WORDMARK-LEFT ALIGNED.svg"
              alt="Sensational League"
              className="h-10"
            />
          </div>
          <p
            className="brand-body text-xl md:text-2xl text-black max-w-3xl font-medium leading-relaxed"
            data-sanity={descriptionAttribute?.toString()}
          >
            {settings?.footer?.description || "Women's 7v7 football league combining athletic excellence with social impact."}
          </p>
        </div>

        {/* Legal Links */}
        <div className="mb-16 pb-16 border-b-2 border-black">
          <nav aria-label="Legal">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-5">
              {[
                { href: "/policies/release-of-liability", label: "RELEASE OF LIABILITY" },
                { href: "/policies/terms-and-conditions", label: "TERMS & CONDITIONS" },
                { href: "/policies/data-protection-policy", label: "DATA PROTECTION POLICY" },
                { href: "/policies/child-protection-policy", label: "CHILD PROTECTION POLICY" },
                { href: "/policies/guidelines-for-playing", label: "GUIDELINES FOR PLAYING" }
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "brand-caption text-sm uppercase tracking-wider text-black font-bold",
                    "hover:text-[var(--color-volt)] transition-colors"
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">
          <p
            className="brand-caption text-sm text-black uppercase tracking-wider font-bold"
            data-sanity={copyrightAttribute?.toString()}
          >
            {settings?.footer?.copyrightText || `© ${new Date().getFullYear()} Sensational League`}
          </p>

          <p
            className="brand-caption text-sm text-black uppercase tracking-wider text-center font-bold"
            data-sanity={additionalAttribute?.toString()}
          >
            {settings?.footer?.additionalText || "Built for women's football"}
          </p>

          <Link
            href="/studio"
            className={cn(
              "brand-caption text-sm text-black uppercase tracking-wider font-bold",
              "hover:text-[var(--color-volt)] transition-colors md:text-right"
            )}
          >
            Studio →
          </Link>
        </div>

        {/* Slogan - At Bottom */}
        <div className="text-center pt-8 border-t-2 border-black">
          <p
            className="brand-headline text-2xl md:text-3xl font-black uppercase tracking-wide text-black"
            data-sanity={taglineAttribute?.toString()}
          >
            {settings?.footer?.tagline || "Fast. Rebellious. Female."}
          </p>
        </div>
      </div>
    </footer>
  );
}
