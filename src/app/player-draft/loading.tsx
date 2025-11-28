export default function PlayerDraftLoading() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero skeleton */}
      <section className="px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-pulse flex flex-col items-center">
            {/* Logo */}
            <div className="h-16 w-16 bg-[var(--color-volt)]/20 rounded mb-8" />
            
            {/* Location label */}
            <div className="h-4 w-48 bg-white/10 rounded mb-6" />
            
            {/* Headline */}
            <div className="h-16 w-3/4 bg-white/10 rounded mb-4" />
            
            {/* Description */}
            <div className="space-y-2 max-w-2xl w-full mb-8">
              <div className="h-4 w-full bg-white/10 rounded mx-auto" />
              <div className="h-4 w-4/5 bg-white/10 rounded mx-auto" />
            </div>

            {/* Nav buttons */}
            <div className="flex gap-4 mb-8">
              <div className="h-10 w-32 bg-white/10 rounded-full" />
              <div className="h-10 w-28 bg-white/10 rounded-full" />
            </div>

            {/* CTA button */}
            <div className="h-14 w-48 bg-[var(--color-volt)]/30 rounded mb-8" />

            {/* Countdown */}
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 w-16 bg-white/10 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights skeleton */}
      <section className="px-4 py-12 border-y border-white/10">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse text-center">
                <div className="h-4 w-24 bg-white/10 rounded mx-auto mb-2" />
                <div className="h-5 w-32 bg-white/10 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps skeleton */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse mb-12">
            <div className="h-8 w-48 bg-white/10 rounded mx-auto" />
          </div>
          <div className="space-y-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse flex gap-6">
                <div className="h-10 w-10 bg-[var(--color-volt)]/20 rounded-full shrink-0" />
                <div className="flex-1">
                  <div className="h-5 w-48 bg-white/10 rounded mb-2" />
                  <div className="h-4 w-full bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA skeleton */}
      <section className="px-4 py-20 bg-[var(--color-volt)]/5">
        <div className="mx-auto max-w-2xl text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-4 w-32 bg-[var(--color-volt)]/30 rounded mb-4" />
            <div className="h-8 w-3/4 bg-white/10 rounded mb-6" />
            <div className="h-14 w-40 bg-[var(--color-volt)]/30 rounded" />
          </div>
        </div>
      </section>
    </main>
  );
}
