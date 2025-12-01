"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/sanity-image";

interface Video {
  title: string;
  url: string;
  thumbnail?: {
    asset?: { _ref?: string };
    alt?: string;
  };
  duration?: string;
  category?: string;
}

interface CaptainVideoGalleryProps {
  mainVideoUrl?: string | null;
  videos?: Video[];
  captainName: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  intro: "Intro",
  highlights: "Highlights",
  interview: "Interview",
  bts: "Behind the Scenes",
  match: "Match Footage",
};

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./i, "");
    if (host === "youtube.com" || host === "m.youtube.com") {
      const paramId = parsed.searchParams.get("v");
      if (paramId) return paramId;
      const segments = parsed.pathname.split("/").filter(Boolean);
      if (segments[0] === "embed" || segments[0] === "shorts") {
        return segments[1] || null;
      }
    }
    if (host === "youtu.be") {
      return parsed.pathname.slice(1).split("/")[0] || null;
    }
  } catch {
    return null;
  }
  return null;
}



function VideoThumbnail({
  videoUrl,
  customThumbnail,
  title,
  duration,
  isPlaying,
  onPlay,
}: {
  videoUrl: string;
  customThumbnail?: { asset?: { _ref?: string }; alt?: string };
  title: string;
  duration?: string;
  isPlaying: boolean;
  onPlay: () => void;
}) {
  const [generatedThumbnail, setGeneratedThumbnail] = useState<string | null>(null);
  const youtubeId = extractYouTubeId(videoUrl);
  
  // For YouTube videos, use YouTube thumbnail
  const youtubeThumbnail = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : null;
  
  // For direct videos, generate thumbnail from video
  useEffect(() => {
    if (youtubeThumbnail || customThumbnail?.asset?._ref) return;
    
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.preload = "auto";
    video.src = videoUrl;
    
    let cancelled = false;
    
    const handleSeeked = () => {
      if (!video.videoWidth || !video.videoHeight || cancelled) return;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setGeneratedThumbnail(canvas.toDataURL("image/jpeg", 0.85));
    };
    
    const handleLoaded = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      video.currentTime = Math.min(2, duration * 0.3);
    };
    
    video.addEventListener("loadedmetadata", handleLoaded, { once: true });
    video.addEventListener("seeked", handleSeeked, { once: true });
    
    return () => {
      cancelled = true;
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [videoUrl, youtubeThumbnail, customThumbnail]);
  
  const thumbnailUrl = customThumbnail?.asset?._ref
    ? getImageUrl(customThumbnail, 640)
    : youtubeThumbnail || generatedThumbnail;
  
  return (
    <button
      type="button"
      onClick={onPlay}
      className={cn(
        "group relative aspect-video w-full overflow-hidden rounded-xl border transition-all",
        isPlaying
          ? "border-[var(--color-volt)] ring-2 ring-[var(--color-volt)]"
          : "border-white/10 hover:border-white/30"
      )}
    >
      {thumbnailUrl ? (
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-white/5">
          <div className="h-8 w-8 animate-pulse rounded-full bg-white/20" />
        </div>
      )}
      
      {/* Overlay */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity",
        isPlaying ? "opacity-0" : "opacity-100 group-hover:opacity-70"
      )}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
          <span className="ml-1 text-xl">▶</span>
        </div>
      </div>
      
      {/* Duration badge */}
      {duration && (
        <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs font-medium">
          {duration}
        </div>
      )}
      
      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
        <p className="text-left text-sm font-semibold line-clamp-1">{title}</p>
      </div>
    </button>
  );
}

function VideoPlayer({
  url,
  title,
  onClose,
}: {
  url: string;
  title: string;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const youtubeId = extractYouTubeId(url);
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
      {youtubeId ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <video
          ref={videoRef}
          src={url}
          controls
          autoPlay
          playsInline
          className="h-full w-full object-contain"
        >
          <track kind="captions" />
        </video>
      )}
      
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-black"
        aria-label="Close video"
      >
        ✕
      </button>
    </div>
  );
}

export default function CaptainVideoGallery({
  mainVideoUrl,
  videos = [],
  captainName,
}: CaptainVideoGalleryProps) {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  
  // Combine main video with gallery videos
  const allVideos: Video[] = [
    ...(mainVideoUrl
      ? [{ title: `${captainName} - Captain Film`, url: mainVideoUrl, category: "intro" as const }]
      : []),
    ...(videos || []),
  ];
  
  if (allVideos.length === 0) {
    return null;
  }
  
  const activeVideo = activeVideoIndex !== null ? allVideos[activeVideoIndex] : null;
  
  // Group videos by category
  const categories = [...new Set(allVideos.map((v) => v.category || "other"))];
  
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-3xl font-black uppercase tracking-[0.15em]">
          Video Gallery
        </h2>
        
        {/* Main Player */}
        {activeVideo && (
          <div className="mb-10">
            <VideoPlayer
              url={activeVideo.url}
              title={activeVideo.title}
              onClose={() => setActiveVideoIndex(null)}
            />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{activeVideo.title}</h3>
                {activeVideo.category && (
                  <span className="text-sm text-white/50">
                    {CATEGORY_LABELS[activeVideo.category] || activeVideo.category}
                  </span>
                )}
              </div>
              {allVideos.length > 1 && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveVideoIndex((prev) =>
                        prev !== null ? (prev - 1 + allVideos.length) % allVideos.length : 0
                      )
                    }
                    className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold transition-colors hover:bg-white hover:text-black"
                    aria-label="Previous video"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveVideoIndex((prev) =>
                        prev !== null ? (prev + 1) % allVideos.length : 0
                      )
                    }
                    className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold transition-colors hover:bg-white hover:text-black"
                    aria-label="Next video"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Video Grid by Category */}
        {categories.map((category) => {
          const categoryVideos = allVideos.filter((v) => (v.category || "other") === category);
          if (categoryVideos.length === 0) return null;
          
          return (
            <div key={category} className="mb-10">
              {categories.length > 1 && (
                <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/50">
                  {CATEGORY_LABELS[category] || "Other Videos"}
                </h3>
              )}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryVideos.map((video, index) => {
                  const globalIndex = allVideos.indexOf(video);
                  return (
                    <VideoThumbnail
                      key={`${video.url}-${index}`}
                      videoUrl={video.url}
                      customThumbnail={video.thumbnail}
                      title={video.title}
                      duration={video.duration}
                      isPlaying={activeVideoIndex === globalIndex}
                      onPlay={() => setActiveVideoIndex(globalIndex)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
