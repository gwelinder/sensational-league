"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/SENSATIONAL-LEAGUE-PRIMARY-MARK-WHITE.png"
            alt="Sensational League"
            width={80}
            height={80}
            className="opacity-80"
          />
        </div>
        
        <h1 className="text-3xl font-black uppercase tracking-wider mb-4">
          Something Went Wrong
        </h1>
        <p className="text-white/60 mb-8">
          We hit a snag loading this page. Our team has been notified and we&apos;re working on it.
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

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-white/40 mb-4 uppercase tracking-wider">
            Quick Links
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/player-draft" className="text-white/60 hover:text-[var(--color-volt)] transition-colors">
              Apply to Play
            </Link>
            <Link href="/captains" className="text-white/60 hover:text-[var(--color-volt)] transition-colors">
              Meet the Captains
            </Link>
            <Link href="/press" className="text-white/60 hover:text-[var(--color-volt)] transition-colors">
              News
            </Link>
          </div>
        </div>

        {error.digest && (
          <p className="mt-8 text-xs text-white/30">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
