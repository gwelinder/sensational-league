"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CaptainHeroMediaProps {
  photoUrl?: string | null;
  videoUrl?: string | null;
  captainName: string;
  photoAlt?: string;
}

export default function CaptainHeroMedia({
  photoUrl,
  videoUrl,
  captainName,
  photoAlt,
}: CaptainHeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayClick = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      // Unmute and play with sound
      video.muted = false;
      setIsMuted(false);
      video.play().catch(() => {
        // Autoplay with sound blocked - try muted
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {
          // Still blocked
        });
      });
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleMuteToggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const handleVideoLoaded = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const handleVideoEnded = useCallback(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <>
      {/* Photo Background - always visible until video plays */}
      {photoUrl && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            isPlaying && isVideoLoaded ? "opacity-0" : "opacity-100"
          )}
        >
          <Image
            src={photoUrl}
            alt={photoAlt || `${captainName} profile photo`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Fallback gradient if no photo */}
      {!photoUrl && !isPlaying && (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
      )}

      {/* Video Element - preloaded but hidden until play */}
      {videoUrl && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            isPlaying && isVideoLoaded ? "opacity-100" : "opacity-0"
          )}
          src={videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={handleVideoLoaded}
          onEnded={handleVideoEnded}
          aria-label={`${captainName} captain video`}
        />
      )}

      {/* Play/Pause Button - center */}
      {videoUrl && (
        <button
          onClick={handlePlayClick}
          className={cn(
            "absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2",
            "flex h-20 w-20 items-center justify-center rounded-full",
            "border-2 border-white/30 bg-black/40 backdrop-blur-sm",
            "transition-all duration-300 hover:scale-110 hover:border-white hover:bg-black/60",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-volt)] focus:ring-offset-2 focus:ring-offset-black",
            // Hide button when video is playing (show only briefly on hover)
            isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
          )}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            // Pause icon
            <div className="flex gap-1.5">
              <div className="h-6 w-2 rounded-sm bg-white" />
              <div className="h-6 w-2 rounded-sm bg-white" />
            </div>
          ) : (
            // Play icon
            <svg
              className="ml-1 h-8 w-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}

      {/* Mute/Unmute Button - bottom right, only visible when playing */}
      {videoUrl && isPlaying && (
        <button
          onClick={handleMuteToggle}
          className={cn(
            "absolute bottom-8 right-8 z-20",
            "flex h-12 w-12 items-center justify-center rounded-full",
            "border border-white/20 bg-black/40 backdrop-blur-sm",
            "transition-all duration-300 hover:border-white hover:bg-black/60",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-volt)]"
          )}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            // Muted icon
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
            // Sound on icon
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          )}
        </button>
      )}

      {/* Video indicator label */}
      {videoUrl && !isPlaying && (
        <div className="absolute bottom-32 left-1/2 z-20 -translate-x-1/2 md:bottom-40">
          <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
            Watch Video
          </span>
        </div>
      )}
    </>
  );
}
