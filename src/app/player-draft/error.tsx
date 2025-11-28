"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function PlayerDraftError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Player draft page error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <span className="text-6xl">⚽</span>
        </div>
        <h1 className="text-3xl font-black uppercase tracking-wider mb-4">
          Draft Page Unavailable
        </h1>
        <p className="text-white/60 mb-8">
          We couldn&apos;t load the player draft application. Don&apos;t worry—the draft is still open!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--color-volt)] bg-[var(--color-volt)] px-6 py-3 text-sm font-black uppercase tracking-wider text-black transition-all hover:bg-transparent hover:text-[var(--color-volt)]"
          >
            Try Again
          </button>
          <a
            href="https://form.typeform.com/to/ZmJZ6YB2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-all hover:border-white hover:bg-white hover:text-black"
          >
            Apply Directly
          </a>
        </div>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
        >
          ← Back to Home
        </Link>
        {error.digest && (
          <p className="mt-8 text-xs text-white/40">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
