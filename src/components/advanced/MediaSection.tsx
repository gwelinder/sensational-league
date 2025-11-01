"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { createDataAttribute } from "@sanity/visual-editing";
import { ResponsiveLogo } from "@/components/Logo";
import { RenderPortableText } from "@/lib/portable-text";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface MediaSectionProps {
  data: {
    _key?: string;
    _type: string;
    layout?: string;
    title?: string;
    subtitle?: string;
    gallery?: {
      images?: Array<{
        asset?: any;
        alt?: string;
        caption?: string;
        credit?: string;
      }>;
      style?: string;
      columns?: number;
    };
    video?: {
      type?: string;
      url?: string;
      thumbnail?: any;
      autoplay?: boolean;
      controls?: boolean;
    };
    splitContent?: {
      mediaPosition?: string;
      media?: any;
      content?: any[];
      cta?: {
        text?: string;
        url?: string;
      };
    };
    testimonial?: {
      quote?: string;
      author?: {
        name?: string;
        title?: string;
        photo?: any;
        logo?: any;
      };
      media?: any;
    };
    logoWall?: {
      logos?: Array<{
        logo?: any;
        name?: string;
        url?: string;
        tier?: string;
      }>;
      style?: string;
    };
    styling?: {
      backgroundColor?: string;
      spacing?: string;
      animation?: string;
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
  transparent: "bg-transparent",
};

const spacingClasses = {
  compact: "py-8",
  normal: "py-16",
  spacious: "py-24",
  xl: "py-32",
};

const tierStyles = {
  title: "col-span-2 row-span-2",
  premier: "col-span-1 row-span-1 scale-110",
  official: "col-span-1 row-span-1",
  community: "col-span-1 row-span-1 scale-90 opacity-80",
};

export function MediaSection({ data, documentId, documentType, path }: MediaSectionProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const dataAttribute = createDataAttribute({
    id: documentId,
    type: documentType,
    path,
  });

  const bgColor = data.styling?.backgroundColor || 'white';
  const spacing = data.styling?.spacing || 'normal';
  const isLight = bgColor === 'white' || bgColor === 'off-white' || bgColor === 'volt';

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const playVideo = () => {
    setVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const getVideoEmbedUrl = (url: string, type: string) => {
    if (type === 'youtube') {
      const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
    }
    if (type === 'vimeo') {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1` : url;
    }
    return url;
  };

  return (
    <section 
      className={cn(
        backgroundColors[bgColor as keyof typeof backgroundColors],
        spacingClasses[spacing as keyof typeof spacingClasses],
        data.styling?.animation === 'brand-motion' && "brand-motion-container"
      )}
      data-sanity={dataAttribute.toString()}
    >
      <div className="mx-auto max-w-7xl px-4">
        
        {/* Section Header */}
        {(data.title || data.subtitle) && (
          <div className="mb-12 text-center">
            {data.title && (
              <h2 className={cn(
                "mb-4 brand-subhead",
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

        {/* Gallery Layout */}
        {data.layout === 'gallery' && data.gallery?.images && (
          <div className={cn(
            "grid gap-4",
            data.gallery.style === 'masonry' ? "masonry" : `grid-cols-1 md:grid-cols-${data.gallery.columns || 3}`,
            data.gallery.style === 'carousel' && "overflow-x-auto flex space-x-4"
          )}>
            {data.gallery.images.map((image, index) => {
              const imageUrl = image.asset ? urlFor(image.asset).width(600).height(400).url() : '';
              
              return (
                <div
                  key={index}
                  className={cn(
                    "group relative overflow-hidden rounded-lg",
                    "brand-motion-right brand-fast",
                    "cursor-pointer hover:scale-105 transition-transform duration-300",
                    data.gallery?.style === 'carousel' && "flex-none w-80"
                  )}
                  onClick={() => data.gallery?.style === 'lightbox' && openLightbox(index)}
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={imageUrl}
                      alt={image.alt || ''}
                      fill
                      className="object-cover"
                    />
                    {data.gallery?.style === 'lightbox' && (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                            <span className="text-black text-xl">🔍</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {(image.caption || image.credit) && (
                    <div className="p-4">
                      {image.caption && (
                        <p className="brand-caption mb-1">{image.caption}</p>
                      )}
                      {image.credit && (
                        <p className="brand-caption text-sm opacity-70">© {image.credit}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Video Layout */}
        {data.layout === 'video' && data.video?.url && (
          <div className="mx-auto max-w-4xl">
            <div className="aspect-video relative rounded-lg overflow-hidden bg-black">
              {!videoPlaying && data.video.type !== 'mp4' ? (
                <div 
                  className="absolute inset-0 cursor-pointer group"
                  onClick={playVideo}
                >
                  {data.video.thumbnail && (
                    <Image
                      src={urlFor(data.video.thumbnail).width(800).height(450).url()}
                      alt="Video thumbnail"
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 bg-[var(--color-volt)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-black text-2xl ml-1">▶</span>
                    </div>
                  </div>
                </div>
              ) : data.video.type === 'mp4' ? (
                <video
                  ref={videoRef}
                  controls={data.video.controls !== false}
                  autoPlay={data.video.autoplay}
                  muted
                  className="w-full h-full"
                >
                  <source src={data.video.url} type="video/mp4" />
                </video>
              ) : (
                <iframe
                  src={getVideoEmbedUrl(data.video.url, data.video.type || 'youtube')}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        )}

        {/* Split Content Layout */}
        {data.layout === 'split' && data.splitContent && (
          <div className={cn(
            "grid lg:grid-cols-2 gap-12 items-center",
            data.splitContent.mediaPosition === 'right' && "lg:grid-flow-col-dense"
          )}>
            <div className={cn(
              data.splitContent.mediaPosition === 'right' && "lg:col-start-2"
            )}>
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src={urlFor(data.splitContent.media).width(600).height(450).url()}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className={cn(
              data.splitContent.mediaPosition === 'right' && "lg:col-start-1"
            )}>
              <div className={cn(
                "prose prose-lg max-w-none",
                isLight ? "prose-zinc" : "prose-invert",
                "[&>h1]:brand-headline [&>h2]:brand-subhead [&>h3]:brand-subhead-light",
                "[&>p]:brand-body [&>li]:brand-body"
              )}>
                <RenderPortableText value={data.splitContent.content || []} />
              </div>
              {data.splitContent.cta?.text && data.splitContent.cta?.url && (
                <div className="mt-8">
                  <a
                    href={data.splitContent.cta.url}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-8 py-3",
                      "bg-[var(--color-volt)] text-[var(--color-black)]",
                      "brand-caption font-bold",
                      "brand-motion-right brand-fast",
                      "hover:scale-105 transform-gpu",
                      "transition-all duration-200"
                    )}
                  >
                    {data.splitContent.cta.text}
                    <span>→</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Testimonial Layout */}
        {data.layout === 'testimonial' && data.testimonial && (
          <div className="mx-auto max-w-4xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <blockquote className={cn(
                  "text-2xl md:text-3xl leading-relaxed mb-8",
                  "brand-subhead-light",
                  isLight ? "text-[var(--color-black)]" : "text-[var(--color-off-white)]"
                )}>
                  "{data.testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  {data.testimonial.author?.photo && (
                    <div className="w-16 h-16 relative rounded-full overflow-hidden">
                      <Image
                        src={urlFor(data.testimonial.author.photo).width(64).height(64).url()}
                        alt={data.testimonial.author.name || ''}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="brand-caption font-bold">
                      {data.testimonial.author?.name}
                    </div>
                    {data.testimonial.author?.title && (
                      <div className="brand-caption opacity-70">
                        {data.testimonial.author.title}
                      </div>
                    )}
                  </div>
                  {data.testimonial.author?.logo && (
                    <div className="ml-auto">
                      <Image
                        src={urlFor(data.testimonial.author.logo).width(80).height(40).url()}
                        alt=""
                        width={80}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
              {data.testimonial.media && (
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(data.testimonial.media).width(500).height(500).url()}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Logo Wall Layout */}
        {data.layout === 'logo-wall' && data.logoWall?.logos && (
          <div className={cn(
            data.logoWall.style === 'tiered' ? "grid gap-8" : "grid gap-6",
            data.logoWall.style === 'grid' && "grid-cols-2 md:grid-cols-4 lg:grid-cols-6",
            data.logoWall.style === 'tiered' && "grid-cols-2 md:grid-cols-6 auto-rows-min",
            data.logoWall.style === 'carousel' && "flex overflow-x-auto space-x-6 pb-4"
          )}>
            {data.logoWall.logos.map((logo, index) => {
              const logoUrl = logo.logo ? urlFor(logo.logo).width(200).height(100).url() : '';
              
              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-center p-6 rounded-lg",
                    "brand-motion-right brand-fast",
                    "hover:scale-105 transition-transform duration-200",
                    isLight 
                      ? "bg-white border border-[var(--color-gray-light)] hover:border-[var(--color-gray-medium)]"
                      : "bg-[var(--color-black)]/50 border border-[var(--color-gray-medium)] hover:border-[var(--color-volt)]",
                    data.logoWall?.style === 'tiered' && logo.tier && tierStyles[logo.tier as keyof typeof tierStyles],
                    data.logoWall?.style === 'carousel' && "flex-none w-48",
                    data.logoWall?.style === 'floating' && `animate-float-${index % 3}`
                  )}
                >
                  {logo.url ? (
                    <a
                      href={logo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src={logoUrl}
                        alt={logo.name || ''}
                        width={160}
                        height={80}
                        className="object-contain max-w-full max-h-full"
                      />
                    </a>
                  ) : (
                    <Image
                      src={logoUrl}
                      alt={logo.name || ''}
                      width={160}
                      height={80}
                      className="object-contain max-w-full max-h-full"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && data.gallery?.images && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={urlFor(data.gallery.images[currentImage]?.asset).width(1200).height(800).url()}
              alt={data.gallery.images[currentImage]?.alt || ''}
              width={1200}
              height={800}
              className="object-contain max-w-full max-h-full"
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              ✕
            </button>
            {data.gallery.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImage((prev) => prev > 0 ? prev - 1 : data.gallery!.images!.length - 1);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImage((prev) => prev < data.gallery!.images!.length - 1 ? prev + 1 : 0);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  →
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </section>
  );
}