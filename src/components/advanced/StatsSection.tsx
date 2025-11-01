"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { createDataAttribute } from "@sanity/visual-editing";
import { ResponsiveLogo } from "@/components/Logo";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface StatsSectionProps {
  data: {
    _key?: string;
    _type: string;
    title?: string;
    subtitle?: string;
    layout?: string;
    stats?: Array<{
      number?: string;
      label?: string;
      description?: string;
      icon?: string;
      color?: string;
      animation?: string;
    }>;
    showSparkLogos?: boolean;
    testimonialQuote?: {
      text?: string;
      author?: string;
      role?: string;
      photo?: any;
    };
    ctaSection?: {
      title?: string;
      description?: string;
      buttonText?: string;
      buttonUrl?: string;
      style?: string;
    };
    styling?: {
      backgroundColor?: string;
      spacing?: string;
      borderStyle?: string;
    };
  };
  documentId: string;
  documentType: string;
  path: string;
}

const backgroundColors = {
  white: "bg-[var(--color-off-white)]",
  "off-white": "bg-[var(--color-off-white)]",
  black: "bg-[var(--color-black)] text-[var(--color-off-white)]",
  volt: "bg-[var(--color-volt)] text-[var(--color-black)]",
  gradient: "bg-gradient-to-br from-[var(--color-black)] via-[var(--color-black)] to-[var(--color-volt)]/20 text-[var(--color-off-white)]",
};

const spacingClasses = {
  compact: "py-8",
  normal: "py-16",
  spacious: "py-24",
};

const layoutClasses = {
  "grid-4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  "grid-3": "grid-cols-1 md:grid-cols-3",
  "grid-2": "grid-cols-1 md:grid-cols-2",
  carousel: "flex overflow-x-auto space-x-6 pb-4",
  split: "grid lg:grid-cols-2 gap-12",
  timeline: "space-y-8",
};

const iconMap = {
  players: "👥",
  money: "💰", 
  games: "⚽",
  communities: "🏘️",
  impact: "💫",
  growth: "📈",
  trophy: "🏆",
  heart: "❤️",
  star: "⭐",
  lightning: "⚡",
  spark: null, // Will use ResponsiveLogo
  none: null,
};

// Counter animation hook
function useCountUp(end: number, duration: number = 2000, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!shouldStart) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(end * easeOut));
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, shouldStart]);
  
  return count;
}

function StatItem({ 
  stat, 
  index, 
  isLight, 
  inView 
}: { 
  stat: any; 
  index: number; 
  isLight: boolean; 
  inView: boolean;
}) {
  // Extract number from string for animation
  const numericValue = stat.animation === 'count-up' ? 
    parseInt(stat.number?.replace(/[^\d]/g, '') || '0') : 0;
  
  const animatedCount = useCountUp(numericValue, 2000, inView && stat.animation === 'count-up');
  
  // Reconstruct the number with non-numeric parts
  const displayNumber = stat.animation === 'count-up' && numericValue > 0 ?
    stat.number?.replace(/\d+/, animatedCount.toString()) || stat.number :
    stat.number;

  return (
    <div
      className={cn(
        "text-center group",
        stat.animation === 'fade' && inView && "animate-fade-in",
        stat.animation === 'scale' && inView && "animate-scale-in",
        index % 2 === 0 ? "brand-motion-right" : "brand-motion-left"
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Icon */}
      {stat.icon && stat.icon !== 'none' && (
        <div className="mb-4 flex justify-center">
          {stat.icon === 'spark' ? (
            <ResponsiveLogo 
              type="spark" 
              color={isLight ? 'black' : 'white'}
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            />
          ) : (
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-2xl",
              stat.color === 'volt' && "bg-[var(--color-volt)] text-[var(--color-black)]",
              stat.color === 'black' && "bg-[var(--color-black)] text-[var(--color-off-white)]",
              stat.color === 'white' && "bg-[var(--color-off-white)] text-[var(--color-black)]",
              stat.color === 'auto' && (isLight ? "bg-[var(--color-volt)] text-[var(--color-black)]" : "bg-[var(--color-volt)] text-[var(--color-black)]")
            )}>
              {iconMap[stat.icon as keyof typeof iconMap]}
            </div>
          )}
        </div>
      )}
      
      {/* Number */}
      <div className={cn(
        "mb-2 font-black tracking-tight",
        "text-4xl md:text-5xl lg:text-6xl",
        stat.color === 'volt' && "text-[var(--color-volt)]",
        stat.color === 'black' && "text-[var(--color-black)]",
        stat.color === 'white' && "text-[var(--color-off-white)]",
        stat.color === 'auto' && "text-[var(--color-volt)]"
      )}>
        {displayNumber}
      </div>
      
      {/* Label */}
      <div className={cn(
        "mb-2 brand-subhead-light",
        isLight ? "text-[var(--color-black)]" : "text-[var(--color-off-white)]"
      )}>
        {stat.label}
      </div>
      
      {/* Description */}
      {stat.description && (
        <div className={cn(
          "brand-body text-sm",
          isLight ? "text-[var(--color-text-muted)]" : "text-[var(--color-off-white)]/70"
        )}>
          {stat.description}
        </div>
      )}
    </div>
  );
}

export function StatsSection({ data, documentId, documentType, path }: StatsSectionProps) {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const dataAttribute = createDataAttribute({
    id: documentId,
    type: documentType,
    path,
  });

  const bgColor = data.styling?.backgroundColor || 'off-white';
  const spacing = data.styling?.spacing || 'normal';
  const layout = data.layout || 'grid-4';
  const isLight = bgColor === 'white' || bgColor === 'off-white' || bgColor === 'volt';

  return (
    <section 
      ref={sectionRef}
      className={cn(
        backgroundColors[bgColor as keyof typeof backgroundColors],
        spacingClasses[spacing as keyof typeof spacingClasses],
        data.styling?.borderStyle === 'top' && "border-t border-current/20",
        data.styling?.borderStyle === 'bottom' && "border-b border-current/20",
        data.styling?.borderStyle === 'full' && "border border-current/20",
        data.styling?.borderStyle === 'volt-accent' && "border-t-4 border-[var(--color-volt)]",
        "relative overflow-hidden"
      )}
      data-sanity={dataAttribute.toString()}
    >
      
      {/* Decorative Spark Logos */}
      {data.showSparkLogos && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <ResponsiveLogo 
            type="spark" 
            color={isLight ? 'black' : 'white'}
            className="absolute top-8 right-8 animate-float-1"
          />
          <ResponsiveLogo 
            type="spark" 
            color={isLight ? 'black' : 'white'}
            className="absolute bottom-12 left-12 animate-float-2"
          />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-4">
        
        {/* Section Header */}
        {(data.title || data.subtitle) && (
          <div className="mb-12 text-center">
            {data.title && (
              <h2 className={cn(
                "mb-6 brand-subhead",
                isLight ? "text-[var(--color-black)]" : "text-[var(--color-off-white)]"
              )}>
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className={cn(
                "mx-auto max-w-3xl brand-body",
                isLight ? "text-[var(--color-text-muted)]" : "text-[var(--color-off-white)]/80"
              )}>
                {data.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Stats Grid/Layout */}
        {data.stats && data.stats.length > 0 && (
          <div className={cn(
            layout === 'timeline' ? layoutClasses.timeline : "grid gap-8",
            layout !== 'timeline' && layout !== 'carousel' && layoutClasses[layout as keyof typeof layoutClasses],
            layout === 'carousel' && layoutClasses.carousel
          )}>
            {data.stats.map((stat, index) => (
              <StatItem
                key={index}
                stat={stat}
                index={index}
                isLight={isLight}
                inView={inView}
              />
            ))}
          </div>
        )}

        {/* Testimonial Quote */}
        {data.testimonialQuote?.text && (
          <div className="mt-16 text-center">
            <blockquote className={cn(
              "text-xl md:text-2xl leading-relaxed mb-6 max-w-4xl mx-auto",
              "brand-subhead-light italic",
              isLight ? "text-[var(--color-black)]" : "text-[var(--color-off-white)]"
            )}>
              "{data.testimonialQuote.text}"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              {data.testimonialQuote.photo && (
                <div className="w-12 h-12 relative rounded-full overflow-hidden">
                  <Image
                    src={urlFor(data.testimonialQuote.photo).width(48).height(48).url()}
                    alt={data.testimonialQuote.author || ''}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <div className="brand-caption font-bold">
                  {data.testimonialQuote.author}
                </div>
                {data.testimonialQuote.role && (
                  <div className="brand-caption opacity-70">
                    {data.testimonialQuote.role}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        {data.ctaSection?.title && (
          <div className={cn(
            "mt-16",
            data.ctaSection.style === 'separate' && "text-center pt-12 border-t border-current/20",
            data.ctaSection.style === 'overlay' && "absolute inset-x-0 bottom-8 text-center",
            data.ctaSection.style === 'inline' && "text-center mt-12"
          )}>
            <h3 className={cn(
              "mb-4 brand-subhead-light",
              isLight ? "text-[var(--color-black)]" : "text-[var(--color-off-white)]"
            )}>
              {data.ctaSection.title}
            </h3>
            {data.ctaSection.description && (
              <p className={cn(
                "mb-6 brand-body max-w-2xl mx-auto",
                isLight ? "text-[var(--color-text-muted)]" : "text-[var(--color-off-white)]/80"
              )}>
                {data.ctaSection.description}
              </p>
            )}
            {data.ctaSection.buttonText && data.ctaSection.buttonUrl && (
              <Link
                href={data.ctaSection.buttonUrl}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-8 py-3",
                  "bg-[var(--color-volt)] text-[var(--color-black)]",
                  "brand-caption font-bold",
                  "brand-motion-right brand-fast",
                  "hover:scale-105 transform-gpu",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--color-volt)] focus:ring-offset-2",
                  "transition-all duration-200"
                )}
              >
                {data.ctaSection.buttonText}
                <span>→</span>
              </Link>
            )}
          </div>
        )}

      </div>
    </section>
  );
}