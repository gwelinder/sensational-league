"use client";

import Link from "next/link";
import Image from "next/image";
import { createDataAttribute } from "@sanity/visual-editing";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  data: {
    _key?: string;
    _type: string;
    headline?: string;
    subheadline?: string;
    ctaText?: string;
    ctaUrl?: string;
    backgroundImage?: any;
  };
  documentId: string;
  documentType: string;
  path: string;
}

export function HeroSection({ data, documentId, documentType, path }: HeroSectionProps) {
  const dataAttribute = createDataAttribute({
    id: documentId,
    type: documentType,
    path,
  });

  const backgroundImageUrl = data.backgroundImage 
    ? urlFor(data.backgroundImage).width(1920).height(1080).url()
    : null;

  return (
    <section 
      className="relative overflow-hidden bg-[var(--color-black)] text-[var(--color-off-white)] min-h-[80vh] flex items-center"
      data-sanity={dataAttribute.toString()}
    >
      {/* Background Image */}
      {backgroundImageUrl && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImageUrl}
            alt=""
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/70" />
        </div>
      )}
      
      {/* Default gradient background */}
      {!backgroundImageUrl && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        </div>
      )}

      <div className="relative mx-auto max-w-6xl px-4 py-24 text-center md:py-32 w-full">
        <h1 className={cn(
          "mb-6 leading-tight tracking-tight",
          "brand-headline text-[var(--color-off-white)]"
        )}>
          {data.headline || "Welcome to Sensational League"}
        </h1>
        
        {data.subheadline && (
          <p className={cn(
            "mx-auto mb-8 max-w-2xl leading-relaxed text-[var(--color-off-white)]/90",
            "brand-body"
          )}>
            {data.subheadline}
          </p>
        )}
        
        {data.ctaText && data.ctaUrl && (
          <Link
            href={data.ctaUrl}
            className={cn(
              "inline-flex items-center rounded-full px-8 py-3",
              "bg-[var(--color-volt)] text-[var(--color-black)]",
              "brand-caption font-bold",
              "brand-motion-right brand-fast",
              "hover:scale-105 transform-gpu",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-volt)] focus:ring-offset-2 focus:ring-offset-black"
            )}
          >
            {data.ctaText}
          </Link>
        )}
      </div>
    </section>
  );
}