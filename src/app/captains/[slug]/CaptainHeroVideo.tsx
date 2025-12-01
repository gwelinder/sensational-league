"use client";

import { useRef, useEffect, useState } from "react";

interface CaptainHeroVideoProps {
  videoUrl: string;
  captainName: string;
}

export default function CaptainHeroVideo({
  videoUrl,
  captainName,
}: CaptainHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoaded(true);
      video.play().catch(() => {
        // Autoplay blocked, that's fine
      });
    };

    video.addEventListener("canplay", handleCanPlay);
    return () => video.removeEventListener("canplay", handleCanPlay);
  }, []);

  return (
    <>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-zinc-800 to-zinc-900" />
      )}

      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={`${captainName} captain video`}
      />
    </>
  );
}
