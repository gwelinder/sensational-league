"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CaptainCardMediaProps {
  photoUrl?: string | null;
  videoUrl?: string | null;
  captainName: string;
  photoAlt?: string;
}

function getInitials(name: string): string {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "SL"
  );
}

function getCaptainGradient(name: string) {
  const base = name.split("").reduce((acc, char, index) => {
    return acc + char.charCodeAt(0) * (index + 1);
  }, 0);
  const hue = base % 360;
  const secondary = (hue + 32) % 360;
  return `linear-gradient(135deg, hsl(${hue}, 65%, 22%), hsl(${secondary}, 70%, 12%))`;
}

export default function CaptainCardMedia({
  photoUrl,
  videoUrl,
  captainName,
  photoAlt,
}: CaptainCardMediaProps) {
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const initials = getInitials(captainName);

  // Generate video thumbnail
  useEffect(() => {
    if (!videoUrl || photoUrl) return;

    let cancelled = false;
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.preload = "auto";
    video.playsInline = true;
    video.src = videoUrl;

    const cleanup = () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
    };

    const drawFrame = () => {
      if (!video.videoWidth || !video.videoHeight || cancelled) return;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setVideoThumbnail(canvas.toDataURL("image/jpeg", 0.85));
    };

    const handleSeeked = () => {
      drawFrame();
      video.removeEventListener("seeked", handleSeeked);
      cleanup();
    };

    const handleLoaded = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      video.currentTime = Math.min(6, Math.max(0.5, duration * 0.3));
    };

    video.addEventListener("loadedmetadata", handleLoaded, { once: true });
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("error", cleanup, { once: true });

    return () => {
      cancelled = true;
      video.removeEventListener("seeked", handleSeeked);
      cleanup();
    };
  }, [videoUrl, photoUrl]);

  const displayImage = photoUrl || videoThumbnail;

  return (
    <div
      className="relative aspect-[4/5] overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayImage ? (
        <Image
          src={displayImage}
          alt={photoAlt || captainName}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            isHovering && "scale-105"
          )}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ backgroundImage: getCaptainGradient(captainName) }}
        >
          <span className="text-6xl font-black tracking-[0.3em] text-white/50">
            {initials}
          </span>
        </div>
      )}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Video play indicator */}
      {videoUrl && (
        <div
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
            isHovering ? "opacity-100 scale-100" : "opacity-0 scale-90"
          )}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <span className="ml-1 text-2xl text-white">▶</span>
          </div>
        </div>
      )}
    </div>
  );
}
