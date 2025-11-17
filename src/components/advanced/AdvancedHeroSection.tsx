"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createDataAttribute } from "@sanity/visual-editing";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ResponsiveLogo } from "@/components/Logo";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface AdvancedHeroSectionProps {
  data: {
    _key?: string;
    _type: string;
    layout?: string;
    headline?: {
      text?: string;
      style?: string;
      color?: string;
    };
    subheadline?: {
      text?: string;
      emphasis?: string[];
    };
    logoDisplay?: {
      show?: boolean;
      variant?: string;
      position?: string;
      animation?: string;
    };
    ctaButtons?: Array<{
      text: string;
      url: string;
      style: string;
      icon: string;
    }>;
    background?: {
      type?: string;
      color?: string;
      image?: SanityImageSource & {
        position?: string;
        overlay?: string;
      };
      video?: {
        url?: string;
        poster?: SanityImageSource;
        muted?: boolean;
      };
    };
    animations?: {
      parallax?: boolean;
      fadeIn?: string;
      motion?: boolean;
    };
    dimensions?: {
      height?: string;
      padding?: string;
    };
  };
  documentId: string;
  documentType: string;
  path: string;
}

const layoutClasses = {
  fullscreen: "brand-layout-hero",
  split: "min-h-[80vh] brand-layout-split items-center",
  centered: "min-h-[80vh] brand-layout-centered",
  video: "min-h-screen relative flex items-center justify-center",
  "logo-showcase": "min-h-[70vh] brand-layout-centered space-y-8",
};

const headlineStyles = {
  "brand-headline": "brand-headline",
  "brand-headline-large": "brand-headline-large",
  "brand-headline-small": "brand-headline-small",
  "display-xl": "brand-headline-large",
  impact: "brand-headline font-black",
  typewriter: "brand-headline typewriter-effect",
};

const heightClasses = {
  auto: "py-16 md:py-24",
  "50vh": "min-h-[50vh] flex items-center",
  "60vh": "min-h-[60vh] flex items-center",
  "80vh": "min-h-[80vh] flex items-center",
  "100vh": "min-h-screen flex items-center",
};

const paddingClasses = {
  none: "",
  small: "py-8",
  medium: "py-16",
  large: "py-24",
  xl: "py-32",
};

const backgroundColors = {
  black: "bg-[var(--color-black)] text-[var(--color-off-white)]",
  white: "bg-[var(--color-off-white)] text-[var(--color-black)]",
  "off-white": "bg-[var(--color-off-white)] text-[var(--color-black)]",
  volt: "bg-[var(--color-volt)] text-[var(--color-black)]",
  gradient: "bg-gradient-to-br from-[var(--color-black)] via-[var(--color-black)] to-[var(--color-volt)]/20 text-[var(--color-off-white)]",
};

export function AdvancedHeroSection({ data, documentId, documentType, path }: AdvancedHeroSectionProps) {
  const [isLoaded] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    // Typewriter effect for headlines
    if (data.headline?.style === 'typewriter' && data.headline?.text) {
      const words = data.headline.text.split(' ');
      const interval = setInterval(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [data.headline]);

  const dataAttribute = createDataAttribute({
    id: documentId,
    type: documentType,
    path,
  });

  const layout = data.layout || 'fullscreen';
  const bgType = data.background?.type || 'solid';
  const bgColor = data.background?.color || 'black';
  const height = data.dimensions?.height || '80vh';
  const padding = data.dimensions?.padding || 'large';

  // Process emphasized words in subheadline
  const processSubheadline = (text: string, emphasisWords: string[] = []) => {
    if (!emphasisWords.length) return text;
    
    let processedText = text;
    emphasisWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      processedText = processedText.replace(regex, `<span class="text-[var(--color-volt)] font-bold">${word}</span>`);
    });
    return processedText;
  };

  const backgroundImageUrl = data.background?.image 
    ? urlFor(data.background.image).width(1920).height(1080).url()
    : null;

  const videoPosterUrl = data.background?.video?.poster
    ? urlFor(data.background.video.poster).width(1920).height(1080).url()
    : null;

  return (
    <section 
      className={cn(
        "relative overflow-hidden",
        layoutClasses[layout as keyof typeof layoutClasses] || layoutClasses.fullscreen,
        heightClasses[height as keyof typeof heightClasses] || heightClasses["80vh"],
        bgType === 'solid' && backgroundColors[bgColor as keyof typeof backgroundColors],
        paddingClasses[padding as keyof typeof paddingClasses],
        data.animations?.motion && "brand-motion-container",
        isLoaded && data.animations?.fadeIn && `animate-${data.animations.fadeIn}`
      )}
      data-sanity={dataAttribute.toString()}
      style={{
        ...(data.animations?.parallax && { transform: 'translateZ(0)' })
      }}
    >
      {/* Background Elements */}
      {bgType === 'image' && backgroundImageUrl && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImageUrl}
            alt=""
            fill
            className={cn(
              "object-cover",
              data.background?.image?.position === 'top' && "object-top",
              data.background?.image?.position === 'bottom' && "object-bottom",
              data.background?.image?.position === 'left' && "object-left",
              data.background?.image?.position === 'right' && "object-right"
            )}
            priority
          />
          {data.background?.image?.overlay !== 'none' && (
            <div className={cn(
              "absolute inset-0",
              data.background?.image?.overlay === 'dark-50' && "bg-black/50",
              data.background?.image?.overlay === 'dark-70' && "bg-black/70",
              data.background?.image?.overlay === 'brand-gradient' && "bg-gradient-to-br from-black/60 via-transparent to-[var(--color-volt)]/20"
            )} />
          )}
        </div>
      )}

      {bgType === 'video' && data.background?.video?.url && (
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted={data.background.video.muted !== false}
            playsInline
            poster={videoPosterUrl || undefined}
            className="w-full h-full object-cover"
          >
            <source src={data.background.video.url} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {bgType === 'pattern' && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,var(--color-volt)_1px,transparent_1px)] bg-[50px_50px]" />
        </div>
      )}

      {/* Content Container */}
      <div className={cn(
        "relative z-10 w-full",
        layout === 'split' ? "px-4 lg:px-8" : "max-w-6xl mx-auto px-4",
        layout === 'centered' || layout === 'logo-showcase' ? "text-center" : ""
      )}>
        
        {/* Logo Display */}
        {data.logoDisplay?.show && data.logoDisplay.position === 'above' && (
          <div className={cn(
            "mb-8",
            data.logoDisplay.animation === 'spark' && "animate-spark-glow",
            data.logoDisplay.animation === 'motion-right' && "brand-motion-right",
            data.logoDisplay.animation === 'pulse' && "animate-pulse",
            data.logoDisplay.animation === 'fade' && isLoaded && "animate-fade-in"
          )}>
            <ResponsiveLogo 
              type="spark"
              color={data.headline?.color === 'black' ? 'black' : 'white'}
              className={cn(
                // Add any specific positioning styles here if needed
              )}
            />
          </div>
        )}

        <div className={cn(
          layout === 'split' && "flex items-center gap-12",
          layout === 'logo-showcase' && "space-y-8"
        )}>
          
          {/* Text Content */}
          <div className={cn(
            layout === 'split' && "flex-1"
          )}>
            
            {/* Headline */}
            {data.headline?.text && (
              <h1 className={cn(
                "mb-6",
                headlineStyles[data.headline.style as keyof typeof headlineStyles] || headlineStyles["brand-headline"],
                data.headline.color === 'black' && "text-[var(--color-black)]",
                data.headline.color === 'white' && "text-[var(--color-off-white)]",
                data.headline.color === 'volt' && "text-[var(--color-volt)]",
                data.animations?.motion && "brand-motion-right"
              )}>
                {data.headline.style === 'typewriter' ? (
                  <span className="typewriter-effect">
                    {data.headline.text.split(' ').map((word, index) => (
                      <span
                        key={index}
                        className={cn(
                          "inline-block mr-2 brand-motion-forward",
                          index <= currentWordIndex ? "opacity-100" : "opacity-30"
                        )}
                      >
                        {word}
                      </span>
                    ))}
                  </span>
                ) : (
                  data.headline.text
                )}
              </h1>
            )}

            {/* Subheadline */}
            {data.subheadline?.text && (
              <div 
                className={cn(
                  "mb-8 leading-relaxed",
                  layout === 'centered' ? "mx-auto max-w-2xl" : "max-w-2xl",
                  "brand-body",
                  data.headline?.color === 'black' ? "text-[var(--color-text-muted)]" : "text-[var(--color-off-white)]/90"
                )}
                dangerouslySetInnerHTML={{
                  __html: processSubheadline(data.subheadline.text, data.subheadline.emphasis)
                }}
              />
            )}

            {/* Logo - Side by Side */}
            {data.logoDisplay?.show && data.logoDisplay.position === 'side' && (
              <div className="mb-8 flex items-center gap-6">
                <ResponsiveLogo 
                  type="spark"
                  color={data.headline?.color === 'black' ? 'black' : 'white'}
                />
                <div className="h-12 w-px bg-current opacity-30" />
              </div>
            )}

            {/* CTA Buttons */}
            {data.ctaButtons && data.ctaButtons.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {data.ctaButtons.map((button, index) => (
                  <Link
                    key={index}
                    href={button.url}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-8 py-3",
                      "brand-caption font-bold",
                      "brand-motion-right brand-fast brand-direction-right",
                      "hover:scale-105 transform-gpu",
                      "focus:outline-none focus:ring-2 focus:ring-offset-2",
                      "transition-all duration-200",
                      button.style === 'primary' && "bg-[var(--color-volt)] text-[var(--color-black)] focus:ring-[var(--color-volt)]",
                      button.style === 'secondary' && "border-2 border-current bg-transparent focus:ring-current",
                      button.style === 'ghost' && "bg-transparent hover:bg-current/10 focus:ring-current",
                      button.style === 'video' && "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                    )}
                  >
                    {button.text}
                    {button.icon !== 'none' && button.icon !== 'arrow-right' && (
                      <span className="ml-1">
                        {button.icon === 'play' && '▶'}
                        {button.icon === 'download' && '↓'}
                        {button.icon === 'external' && '↗'}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}

            {/* Logo - Below */}
            {data.logoDisplay?.show && data.logoDisplay.position === 'below' && (
              <div className="mt-8">
                <ResponsiveLogo 
                  type="spark"
                  color={data.headline?.color === 'black' ? 'black' : 'white'}
                />
              </div>
            )}

          </div>

          {/* Split Layout - Second Column */}
          {layout === 'split' && (
            <div className="flex-1">
              {/* This could contain additional media or content */}
              <div className="aspect-video bg-[var(--color-volt)]/10 rounded-lg flex items-center justify-center">
                <ResponsiveLogo 
                  type="spark"
                  color={data.headline?.color === 'black' ? 'black' : 'white'}
                  className="opacity-20"
                />
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Decorative Elements */}
      {data.animations?.motion && (
        <div className="absolute bottom-8 right-8 opacity-10">
          <ResponsiveLogo type="spark" color="white" />
        </div>
      )}

    </section>
  );
}