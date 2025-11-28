"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function PressError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Press page error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#F7F7F7] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <span className="text-6xl">📰</span>
        </div>
        <h1 className="text-3xl font-black uppercase tracking-wider mb-4 text-black">
          News Temporarily Unavailable
        </h1>
        <p className="text-black/60 mb-8">
          We couldn&apos;t load the press release. Please try again in a moment.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-black px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-transparent hover:text-black"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border-2 border-black/20 px-6 py-3 text-sm font-black uppercase tracking-wider text-black transition-all hover:border-black hover:bg-black hover:text-white"
          >
            Go Home
          </Link>
        </div>
        {error.digest && (
          <p className="mt-8 text-xs text-black/40">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
