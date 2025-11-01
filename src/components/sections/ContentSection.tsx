"use client";

import { useState, useEffect, useRef } from "react";
import { createDataAttribute } from "@sanity/visual-editing";
import { RenderPortableText } from "@/lib/portable-text";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import type { PortableTextBlock } from "sanity";

interface ContentSectionProps {
  data: {
    _key?: string;
    _type: string;
    title?: string;
    subtitle?: string;
    content?: PortableTextBlock[];
    layout?: string;
    ctaButton?: {
      show?: boolean;
      text?: string;
      url?: string;
      style?: string;
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

// Dynamic styling maps
const backgroundClasses = {
  black: "bg-[var(--color-black)]",
  "off-white": "bg-[var(--color-off-white)]",
  white: "bg-[var(--color-white)]",
  volt: "bg-[var(--color-volt)]",
  orange: "bg-[var(--color-orange)]",
  purple: "bg-[var(--color-purple)]",
  cyan: "bg-[var(--color-cyan)]",
  gradient: "",
  auto: "bg-[var(--color-off-white)]",
};

const spacingClasses = {
  none: "",
  xs: "py-2",
  sm: "py-4",
  md: "py-8",
  lg: "py-16",
  xl: "py-24",
  "2xl": "py-32",
};

const sidePaddingClasses = {
  none: "",
  xs: "px-2",
  sm: "px-4",
  md: "px-4",
  lg: "px-6",
  xl: "px-8",
  "2xl": "px-12",
};

const layoutClasses = {
  full: "w-full",
  contained: "max-w-6xl mx-auto",
  narrow: "max-w-4xl mx-auto",
  wide: "max-w-7xl mx-auto",
};

const contentLayoutClasses = {
  single: "space-y-6",
  "two-column": "grid md:grid-cols-2 gap-8",
  "three-column": "grid md:grid-cols-3 gap-6",
  "sidebar-left": "grid md:grid-cols-3 gap-8 [&>:first-child]:md:col-span-1 [&>:last-child]:md:col-span-2",
  "sidebar-right": "grid md:grid-cols-3 gap-8 [&>:first-child]:md:col-span-2 [&>:last-child]:md:col-span-1",
  "centered-narrow": "max-w-3xl mx-auto space-y-6",
};

const textAlignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const textColorClasses = {
  auto: "",
  black: "text-[var(--color-black)]",
  white: "text-[var(--color-off-white)]",
  volt: "text-[var(--color-volt)]",
  orange: "text-[var(--color-orange)]",
  purple: "text-[var(--color-purple)]",
  cyan: "text-[var(--color-cyan)]",
};

export function ContentSection({ data, documentId, documentType, path }: ContentSectionProps) {
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

  // Determine styling
  const styling = data.styling || {};
  const typography = data.typography || {};
  const backgroundColor = styling.backgroundColor || "off-white";
  const backgroundType = styling.backgroundType || "solid";
  const layout = data.layout || "single";
  const spacing = styling.spacing || {};
  
  // Smart contrast detection
  const isLight = ["white", "off-white", "volt"].includes(backgroundColor);
  const isDark = ["black", "orange", "purple", "cyan"].includes(backgroundColor);
  
  // Build dynamic classes
  const baseTextColor = typography.textColor === "auto" 
    ? (isLight ? "text-[var(--color-black)]" : "text-[var(--color-off-white)]")
    : textColorClasses[typography.textColor as keyof typeof textColorClasses] || "";

  const backgroundImageUrl = styling.backgroundImage 
    ? urlFor(styling.backgroundImage).width(1920).height(1080).url()
    : null;

  return (
    <section 
      ref={sectionRef}
      id={data.sectionId?.current}
      className={cn(
        "relative overflow-hidden",
        // Background
        backgroundType === "solid" && backgroundClasses[backgroundColor as keyof typeof backgroundClasses],
        backgroundType === "gradient" && `bg-gradient-${styling.gradientDirection || "to-br"} from-[var(--color-black)] to-[var(--color-volt)]`,
        // Spacing
        spacingClasses[spacing.top as keyof typeof spacingClasses] || "py-16",
        spacingClasses[spacing.bottom as keyof typeof spacingClasses] && spacingClasses[spacing.bottom as keyof typeof spacingClasses],
        sidePaddingClasses[spacing.sides as keyof typeof sidePaddingClasses] || "px-4",
        // Borders
        styling.borders?.top && "border-t",
        styling.borders?.bottom && "border-b",
        styling.borders?.style === "volt-accent" && "border-[var(--color-volt)]",
        styling.borders?.style === "gradient" && "border-transparent",
        // Animations
        styling.animations?.entrance && !inView && "opacity-0",
        styling.animations?.entrance === "fade-up" && inView && "animate-fade-up",
        styling.animations?.entrance === "fade-down" && inView && "animate-fade-down",
        styling.animations?.entrance === "fade-left" && inView && "animate-fade-left",
        styling.animations?.entrance === "fade-right" && inView && "animate-fade-right",
        styling.animations?.entrance === "scale-in" && inView && "animate-scale-in",
        styling.animations?.brandMotion && "brand-motion-container",
        // Text color
        baseTextColor
      )}
      data-sanity={dataAttribute.toString()}
      style={{
        ...(styling.animations?.parallax && { transform: 'translateZ(0)' })
      }}
    >
      {/* Background Image */}
      {backgroundType === "image" && backgroundImageUrl && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImageUrl}
            alt=""
            fill
            className={cn(
              "object-cover",
              styling.backgroundImage?.position === 'top' && "object-top",
              styling.backgroundImage?.position === 'bottom' && "object-bottom",
              styling.backgroundImage?.position === 'left' && "object-left",
              styling.backgroundImage?.position === 'right' && "object-right"
            )}
          />
          {styling.backgroundImage?.overlay !== 'none' && (
            <div className={cn(
              "absolute inset-0",
              styling.backgroundImage?.overlay === 'dark-30' && "bg-black/30",
              styling.backgroundImage?.overlay === 'dark-50' && "bg-black/50",
              styling.backgroundImage?.overlay === 'dark-70' && "bg-black/70",
              styling.backgroundImage?.overlay === 'brand-gradient' && "bg-gradient-to-br from-black/60 via-transparent to-[var(--color-volt)]/20",
              styling.backgroundImage?.overlay === 'volt-glow' && "bg-[var(--color-volt)]/20"
            )} />
          )}
        </div>
      )}

      <div className={cn(
        "relative z-10",
        layoutClasses[styling.layout as keyof typeof layoutClasses] || layoutClasses.contained,
        textAlignClasses[typography.textAlign as keyof typeof textAlignClasses] || "text-left"
      )}>
        {/* Section Header */}
        {(data.title || data.subtitle) && (
          <div className="mb-8">
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
              <p className={cn(
                "brand-body opacity-80",
                typography.textAlign === "center" && "mx-auto max-w-3xl"
              )}>
                {data.subtitle}
              </p>
            )}
          </div>
        )}
        
        {/* Content */}
        {data.content && (
          <div className={cn(
            contentLayoutClasses[layout as keyof typeof contentLayoutClasses] || contentLayoutClasses.single,
            "mb-8"
          )}>
            <div className={cn(
              "prose prose-lg max-w-none",
              isLight 
                ? "prose-zinc" 
                : "prose-invert",
              // Brand typography for prose elements
              "[&>h1]:brand-headline [&>h2]:brand-subhead [&>h3]:brand-subhead-light",
              "[&>p]:brand-body [&>li]:brand-body",
              "[&>blockquote]:border-l-[var(--color-volt)] [&>blockquote]:pl-6",
              "[&>a]:text-[var(--color-volt)] [&>a]:brand-fast"
            )}>
              <RenderPortableText value={data.content} />
            </div>
          </div>
        )}

        {/* CTA Button */}
        {data.ctaButton?.show && data.ctaButton.text && data.ctaButton.url && (
          <div className={cn(
            "mt-8",
            typography.textAlign === "center" && "text-center",
            typography.textAlign === "right" && "text-right"
          )}>
            <Link
              href={data.ctaButton.url}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-8 py-3",
                "brand-caption font-bold",
                "brand-motion-right brand-fast brand-direction-right",
                "hover:scale-105 transform-gpu",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                "transition-all duration-200",
                data.ctaButton.style === "primary" && "bg-[var(--color-volt)] text-[var(--color-black)] focus:ring-[var(--color-volt)]",
                data.ctaButton.style === "secondary" && "border-2 border-current bg-transparent focus:ring-current",
                data.ctaButton.style === "ghost" && "bg-transparent hover:bg-current/10 focus:ring-current"
              )}
            >
              {data.ctaButton.text}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}