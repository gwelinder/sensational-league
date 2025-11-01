"use client";

import { useState, useEffect, useRef } from "react";
import { createDataAttribute } from "@sanity/visual-editing";
import { RenderPortableText } from "@/lib/portable-text";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { ResponsiveLogo } from "@/components/Logo";
import Link from "next/link";
import Image from "next/image";
import type { PortableTextBlock } from "sanity";

interface FlexibleSectionProps {
  data: {
    _key?: string;
    _type: string;
    title?: string;
    subtitle?: string;
    layout?: string;
    content?: Array<{
      _type: string;
      _key: string;
      [key: string]: any;
    }>;
    gridSettings?: {
      columns?: string;
      gap?: string;
      alignment?: string;
    };
    styling?: {
      backgroundColor?: string;
      backgroundType?: string;
      backgroundImage?: any;
      gradientDirection?: string;
      spacing?: {
        top?: string;
        bottom?: string;
        sides?: string;
      };
      layout?: string;
      borders?: {
        top?: boolean;
        bottom?: boolean;
        style?: string;
      };
      animations?: {
        entrance?: string;
        delay?: number;
        parallax?: boolean;
        brandMotion?: boolean;
      };
    };
    typography?: {
      headlineStyle?: string;
      textAlign?: string;
      textColor?: string;
    };
    sectionId?: {
      current?: string;
    };
  };
  documentId: string;
  documentType: string;
  path: string;
}

// Layout configuration maps
const layoutClasses = {
  hero: "min-h-[70vh] flex items-center justify-center text-center",
  split: "grid lg:grid-cols-2 gap-8 lg:gap-12 items-center",
  "feature-grid": "space-y-8",
  gallery: "space-y-6",
  "text-media": "grid lg:grid-cols-3 gap-8 items-start",
  "cta-block": "text-center space-y-6",
  "quote-stats": "space-y-12",
  "full-width": "space-y-8",
};

const columnClasses = {
  auto: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
  "1": "space-y-6",
  "2": "grid sm:grid-cols-2 gap-6",
  "3": "grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
  "4": "grid sm:grid-cols-2 lg:grid-cols-4 gap-6",
};

const gapClasses = {
  tight: "gap-4",
  normal: "gap-6",
  loose: "gap-8",
  "extra-loose": "gap-12",
};

const buttonSizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
};

const imageSizeClasses = {
  small: "max-w-xs",
  medium: "max-w-md",
  large: "max-w-2xl",
  full: "w-full",
};

// Content block renderers
function RichTextBlock({ block }: { block: any }) {
  return (
    <div className="prose prose-lg max-w-none prose-zinc [&>h1]:brand-headline [&>h2]:brand-subhead [&>h3]:brand-subhead-light [&>p]:brand-body [&>li]:brand-body [&>blockquote]:border-l-[var(--color-volt)] [&>blockquote]:pl-6 [&>a]:text-[var(--color-volt)] [&>a]:brand-fast">
      <RenderPortableText value={block.content} />
    </div>
  );
}

function ImageBlock({ block }: { block: any }) {
  const imageUrl = block.image ? urlFor(block.image).width(800).height(600).url() : null;
  
  if (!imageUrl) return null;

  return (
    <figure className={cn("space-y-2", imageSizeClasses[block.size as keyof typeof imageSizeClasses] || imageSizeClasses.medium)}>
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={block.alt || ""}
          fill
          className="object-cover"
        />
      </div>
      {block.caption && (
        <figcaption className="brand-caption text-[var(--color-text-muted)] text-center">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

function FeatureCard({ block }: { block: any }) {
  const hasLink = block.link?.text && block.link?.url;

  const CardContent = () => (
    <div className={cn(
      "group p-6 rounded-lg border border-[var(--color-gray-light)] bg-[var(--color-surface-2)]",
      "brand-motion-container hover:shadow-lg transition-all duration-200",
      hasLink && "cursor-pointer hover:border-[var(--color-volt)]"
    )}>
      {block.icon && (
        <div className="mb-4">
          {block.icon === 'spark' ? (
            <ResponsiveLogo type="spark" color="black" />
          ) : (
            <div className="text-3xl">{block.icon}</div>
          )}
        </div>
      )}
      <h3 className="brand-subhead-light mb-3 group-hover:text-[var(--color-volt)] transition-colors">
        {block.title}
      </h3>
      {block.description && (
        <p className="brand-body text-[var(--color-text-muted)] mb-4">
          {block.description}
        </p>
      )}
      {hasLink && (
        <div className="brand-caption text-[var(--color-volt)] brand-direction-right">
          {block.link.text}
        </div>
      )}
    </div>
  );

  if (hasLink) {
    return (
      <Link href={block.link.url}>
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}

function CTAButton({ block }: { block: any }) {
  return (
    <Link
      href={block.url}
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-bold",
        "brand-motion-right brand-fast brand-direction-right",
        "hover:scale-105 transform-gpu",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "transition-all duration-200",
        buttonSizeClasses[block.size as keyof typeof buttonSizeClasses] || buttonSizeClasses.md,
        block.style === "primary" && "bg-[var(--color-volt)] text-[var(--color-black)] focus:ring-[var(--color-volt)]",
        block.style === "secondary" && "border-2 border-current bg-transparent focus:ring-current",
        block.style === "ghost" && "bg-transparent hover:bg-current/10 focus:ring-current",
        block.style === "large-primary" && "bg-[var(--color-volt)] text-[var(--color-black)] focus:ring-[var(--color-volt)] text-xl px-12 py-6"
      )}
    >
      {block.text}
    </Link>
  );
}

function VideoEmbed({ block }: { block: any }) {
  const aspectRatioClasses = {
    "16:9": "aspect-video",
    "4:3": "aspect-[4/3]",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  };

  return (
    <div className="space-y-4">
      {block.title && (
        <h3 className="brand-subhead-light">{block.title}</h3>
      )}
      <div className={cn(
        "relative overflow-hidden rounded-lg bg-[var(--color-gray-light)]",
        aspectRatioClasses[block.aspectRatio as keyof typeof aspectRatioClasses] || aspectRatioClasses["16:9"]
      )}>
        {/* This would typically be replaced with a proper video embed component */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📹</div>
            <p className="brand-caption">Video: {block.url}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FlexibleSection({ data, documentId, documentType, path }: FlexibleSectionProps) {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setInView(true);
          }, data.styling?.animations?.delay || 0);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [data.styling?.animations?.delay]);

  const dataAttribute = createDataAttribute({
    id: documentId,
    type: documentType,
    path,
  });

  // Styling configuration
  const styling = data.styling || {};
  const typography = data.typography || {};
  const gridSettings = data.gridSettings || {};
  const layout = data.layout || "split";

  // Background handling
  const backgroundColor = styling.backgroundColor || "off-white";
  const backgroundType = styling.backgroundType || "solid";
  const isLight = ["white", "off-white", "volt"].includes(backgroundColor);

  const backgroundImageUrl = styling.backgroundImage 
    ? urlFor(styling.backgroundImage).width(1920).height(1080).url()
    : null;

  // Grid configuration for feature-grid and gallery layouts
  const useGrid = ["feature-grid", "gallery"].includes(layout);
  const gridColumns = useGrid ? (gridSettings.columns || "auto") : "1";
  const gridGap = gridSettings.gap || "normal";
  const contentAlignment = gridSettings.alignment || "left";

  return (
    <section 
      ref={sectionRef}
      id={data.sectionId?.current}
      className={cn(
        "relative overflow-hidden",
        // Background colors
        backgroundType === "solid" && `bg-[var(--color-${backgroundColor})]`,
        backgroundColor === "black" && "text-[var(--color-off-white)]",
        backgroundColor === "volt" && "text-[var(--color-black)]",
        // Spacing
        styling.spacing?.top === "none" ? "pt-0" : "pt-16",
        styling.spacing?.bottom === "none" ? "pb-0" : "pb-16",
        // Borders
        styling.borders?.top && "border-t border-current/20",
        styling.borders?.bottom && "border-b border-current/20",
        // Animations
        styling.animations?.entrance && !inView && "opacity-0",
        styling.animations?.entrance === "fade-up" && inView && "animate-fade-up",
        styling.animations?.entrance === "fade-down" && inView && "animate-fade-down",
        styling.animations?.brandMotion && "brand-motion-container",
        // Text alignment
        typography.textAlign === "center" && "text-center",
        typography.textAlign === "right" && "text-right"
      )}
      data-sanity={dataAttribute.toString()}
    >
      {/* Background Image */}
      {backgroundType === "image" && backgroundImageUrl && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImageUrl}
            alt=""
            fill
            className="object-cover"
          />
          {styling.backgroundImage?.overlay !== 'none' && (
            <div className={cn(
              "absolute inset-0",
              styling.backgroundImage?.overlay === 'dark-50' && "bg-black/50",
              styling.backgroundImage?.overlay === 'dark-70' && "bg-black/70",
              styling.backgroundImage?.overlay === 'brand-gradient' && "bg-gradient-to-br from-black/60 via-transparent to-[var(--color-volt)]/20"
            )} />
          )}
        </div>
      )}

      <div className={cn(
        "relative z-10 mx-auto max-w-7xl px-4",
        styling.layout === "full" && "max-w-none",
        styling.layout === "narrow" && "max-w-4xl"
      )}>
        {/* Section Header */}
        {(data.title || data.subtitle) && (
          <div className={cn(
            "mb-12",
            typography.textAlign === "center" && "text-center max-w-4xl mx-auto"
          )}>
            {data.title && (
              <h2 className={cn(
                "mb-4",
                typography.headlineStyle || "brand-subhead",
                styling.animations?.brandMotion && "brand-motion-right"
              )}>
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="brand-body opacity-80">
                {data.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Content Blocks */}
        {data.content && data.content.length > 0 && (
          <div className={cn(
            layoutClasses[layout as keyof typeof layoutClasses] || layoutClasses.split,
            useGrid && columnClasses[gridColumns as keyof typeof columnClasses],
            useGrid && gapClasses[gridGap as keyof typeof gapClasses],
            contentAlignment === "center" && "justify-items-center",
            contentAlignment === "right" && "justify-items-end"
          )}>
            {data.content.map((block, index) => {
              const blockKey = block._key || index;
              
              switch (block._type) {
                case 'richText':
                  return <RichTextBlock key={blockKey} block={block} />;
                case 'imageBlock':
                  return <ImageBlock key={blockKey} block={block} />;
                case 'featureCard':
                  return <FeatureCard key={blockKey} block={block} />;
                case 'ctaButton':
                  return <CTAButton key={blockKey} block={block} />;
                case 'videoEmbed':
                  return <VideoEmbed key={blockKey} block={block} />;
                default:
                  return (
                    <div key={blockKey} className="p-4 bg-[var(--color-gray-light)] rounded text-center">
                      <p className="brand-caption">Unknown content type: {block._type}</p>
                    </div>
                  );
              }
            })}
          </div>
        )}
      </div>
    </section>
  );
}