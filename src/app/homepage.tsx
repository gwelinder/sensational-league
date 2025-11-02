"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { createDataAttribute, useOptimistic } from "@sanity/visual-editing";
import type { PortableTextBlock } from '@portabletext/types';
import type { SanityDocument } from '@sanity/client';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import StyledTextRenderer from "@/components/StyledTextRenderer";
import { getImageUrl, getImageProps } from "@/lib/sanity-image";

interface Stat {
  value: string;
  label: string;
}

interface Pillar {
  title: string;
  description: string;
}

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

interface HomePageProps {
  content?: {
    _id?: string;
    _type?: string;
    hero?: {
      logo?: SanityImage;
      headline?: PortableTextBlock[] | null;
      subline?: string;
      ctaText?: string;
      stats?: Stat[];
      images?: SanityImage[];
    };
    about?: {
      title?: PortableTextBlock[] | null;
      description?: string;
      pillars?: Pillar[];
    };
  };
}

function SignupForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className={cn(
            "flex-1 px-6 py-4 border-2 border-black rounded-none",
            "text-black placeholder-gray-500 brand-body",
            "focus:outline-none focus:border-[var(--color-volt)]",
            "transition-colors duration-200"
          )}
        />

        <button
          type="submit"
          disabled={isSubmitted}
          className={cn(
            "px-10 py-4 font-black uppercase tracking-wider",
            "brand-caption transition-all duration-200",
            "focus:outline-none disabled:opacity-70",
            isSubmitted
              ? "bg-black text-white"
              : "bg-[var(--color-volt)] text-black hover:bg-black hover:text-[var(--color-volt)]"
          )}
        >
          {isSubmitted ? "✓ JOINED" : "JOIN →"}
        </button>
      </div>
    </form>
  );
}

export default function HomePage({ content: initialContent }: HomePageProps) {
  // Use optimistic updates to prevent page reloads on every edit
  const content = useOptimistic<HomePageProps['content'], SanityDocument>(
    initialContent,
    (currentContent, action) => {
      // Only update if this is the same document
      if (!currentContent || action.id !== currentContent._id) {
        return currentContent;
      }

      // Return the updated document data
      return {
        ...currentContent,
        ...action.document,
      } as HomePageProps['content'];
    }
  );

  // Hero section attributes
  const heroDataAttribute = content?._id ? createDataAttribute({
    id: content._id,
    type: content._type || 'homePage',
    path: 'hero',
  }) : undefined;

  const heroHeadlineAttribute = content?._id ? createDataAttribute({
    id: content._id,
    type: content._type || 'homePage',
    path: 'hero.headline',
  }) : undefined;

  const heroSublineAttribute = content?._id ? createDataAttribute({
    id: content._id,
    type: content._type || 'homePage',
    path: 'hero.subline',
  }) : undefined;

  // About section attributes
  const aboutDataAttribute = content?._id ? createDataAttribute({
    id: content._id,
    type: content._type || 'homePage',
    path: 'about',
  }) : undefined;

  const aboutTitleAttribute = content?._id ? createDataAttribute({
    id: content._id,
    type: content._type || 'homePage',
    path: 'about.title',
  }) : undefined;

  const aboutDescriptionAttribute = content?._id ? createDataAttribute({
    id: content._id,
    type: content._type || 'homePage',
    path: 'about.description',
  }) : undefined;

  // Default data
  const defaultHeroStats: Stat[] = [
    { value: "300+", label: "Athletes" },
    { value: "24", label: "Teams" },
    { value: "12", label: "SDG Goals" }
  ];

  const defaultPillars: Pillar[] = [
    {
      title: "Elite Competition",
      description: "7v7 format with professional standards and innovative scoring systems."
    },
    {
      title: "Social Impact",
      description: "Teams earn points for community engagement and UN SDG contributions."
    },
    {
      title: "Digital Innovation",
      description: "Multi-metric tracking including social media growth and viral moments."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center px-4 pt-8 pb-20 bg-white"
        data-sanity={heroDataAttribute?.toString()}
      >
        <div className="w-full max-w-6xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-12">
            {content?.hero?.logo && getImageUrl(content.hero.logo) ? (
              <img
                {...getImageProps(content.hero.logo, 800)}
                alt={content.hero.logo.alt || "Sensational League"}
                className={cn(
                  "mx-auto",
                  !content.hero.logo.width && !content.hero.logo.height && "w-48 h-48 md:w-56 md:h-56"
                )}
              />
            ) : (
              <img
                src="/logos/SL-SPARK-LARGE.svg"
                alt="Sensational League"
                className="w-48 h-48 md:w-56 md:h-56 mx-auto"
              />
            )}
          </div>

          {/* Headline */}
          <h1
            className="brand-headline text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-8 text-center"
            data-sanity={heroHeadlineAttribute?.toString()}
          >
            {content?.hero?.headline ? (
              <StyledTextRenderer value={content.hero.headline} />
            ) : (
              <>
                <span className="text-black">FAST.</span><br />
                <span className="text-black">REBELLIOUS.</span><br />
                <span className="text-[var(--color-volt)]">FEMALE.</span>
              </>
            )}
          </h1>

          {/* Subline */}
          <p
            className="brand-body text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto text-center"
            data-sanity={heroSublineAttribute?.toString()}
          >
            {content?.hero?.subline ||
             "Women's 7v7 football league that combines athletic excellence with social impact."}
          </p>

          {/* Form */}
          <div className="mb-12">
            <SignupForm />
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-16 text-sm uppercase tracking-wider brand-caption">
            {(content?.hero?.stats || defaultHeroStats).map((stat, index) => (
              <div key={index} className="flex items-center gap-6 md:gap-8">
                {index > 0 && <div className="w-px h-6 bg-gray-300"></div>}
                <div>
                  <span className="text-2xl font-black text-black">{stat.value}</span>
                  <span className="ml-2 text-gray-600">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Image Grid - Bold, Dynamic with Rightward Movement */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {content?.hero?.images && content.hero.images.length > 0 ? (
              content.hero.images.slice(0, 8).map((image, index) => {
                const imageProps = getImageProps(image, 800);

                return (
                  <div
                    key={index}
                    className={cn(
                      "relative aspect-[3/4] overflow-hidden border-4 border-black hover:-translate-y-2 hover:translate-x-1 transition-all duration-500 group",
                      index % 2 === 1 && "md:mt-8"
                    )}
                  >
                    <img
                      {...imageProps}
                      alt={image.alt || `Sensational League image ${index + 1}`}
                      className={cn(
                        "w-full h-full group-hover:scale-110 transition-all duration-500",
                        !image.objectFit && "object-cover"
                      )}
                      style={{
                        ...imageProps.style,
                        objectFit: image.objectFit || 'cover',
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-volt)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                );
              })
            ) : (
              // Fallback to default images when no Sanity images are available
              [
                "/logos/image_046_page_39.jpeg",
                "/logos/image_063_page_42.jpeg",
                "/logos/image_067_page_43.jpeg",
                "/logos/image_073_page_44.jpeg",
              ].map((src, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative aspect-[3/4] overflow-hidden border-4 border-black hover:-translate-y-2 hover:translate-x-1 transition-all duration-500 group",
                    index % 2 === 1 && "md:mt-8"
                  )}
                >
                  <img
                    src={src}
                    alt={`Sensational League image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-volt)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Visual Divider - Rightward Movement */}
      <div className="relative h-24 bg-white overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full mx-auto">
            <div className="h-2 bg-black transform skew-x-[-3deg] origin-left"></div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section
        className="py-32 md:py-40 bg-white"
        data-sanity={aboutDataAttribute?.toString()}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Headline - Bold and Clean */}
          <div className="mb-28">
            <h2
              className="brand-headline text-5xl md:text-7xl lg:text-8xl font-black text-center leading-tight uppercase"
              data-sanity={aboutTitleAttribute?.toString()}
            >
              {content?.about?.title ? (
                <StyledTextRenderer value={content.about.title} />
              ) : (
                <>
                  <span className="block text-black">PLAY FOOTBALL.</span>
                  <span className="block text-[var(--color-volt)]">DRIVE IMPACT.</span>
                  <span className="block text-black">CHANGE THE WORLD.</span>
                </>
              )}
            </h2>
          </div>

          {/* Three Pillars - Clean Cards with Rightward Movement */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20 max-w-6xl mx-auto">
            {(content?.about?.pillars || defaultPillars).map((pillar, index) => (
              <div
                key={index}
                className="bg-white border-4 border-black p-8 hover:bg-[var(--color-volt)] hover:translate-x-2 transition-all duration-300 group"
              >
                <div className="w-20 h-3 bg-black mb-6 transform skew-x-[-12deg] group-hover:w-24 transition-all duration-300"></div>
                <h3 className="brand-subhead text-xl md:text-2xl font-black mb-4 uppercase tracking-wider text-black">
                  {pillar.title}
                </h3>
                <p className="brand-body text-base text-black leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="max-w-4xl mx-auto text-center">
            <p
              className="brand-body text-2xl md:text-3xl text-black leading-relaxed font-bold"
              data-sanity={aboutDescriptionAttribute?.toString()}
            >
              {content?.about?.description ||
               "We're building a community where female athletes can showcase their skills while making a difference. Our mission is simple: Fast. Rebellious. Female."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}