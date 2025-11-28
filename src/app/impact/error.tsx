"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ImpactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Impact page error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <span className="text-6xl">🌍</span>
        </div>
        <h1 className="text-3xl font-black uppercase tracking-wider mb-4">
          Impact Data Unavailable
        </h1>
        <p className="text-white/60 mb-8">
          We couldn&apos;t load the impact leaderboard. The teams are still making a difference—we just can&apos;t show it right now.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--color-volt)] bg-[var(--color-volt)] px-6 py-3 text-sm font-black uppercase tracking-wider text-black transition-all hover:bg-transparent hover:text-[var(--color-volt)]"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-all hover:border-white hover:bg-white hover:text-black"
          >
            Go Home
          </Link>
        </div>
        {error.digest && (
          <p className="mt-8 text-xs text-white/40">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
