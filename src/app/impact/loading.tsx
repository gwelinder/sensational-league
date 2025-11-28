export default function ImpactLoading() {
  return (
    <main className="min-h-screen brand-bg">
      {/* Hero skeleton */}
      <section className="px-4 py-20 md:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-32 bg-[var(--color-volt)]/30 rounded mb-6" />
            <div className="h-14 w-2/3 bg-[var(--color-gray-dark)] rounded mb-4" />
            <div className="h-6 w-1/2 bg-[var(--color-gray-dark)] rounded" />
          </div>
        </div>
      </section>

      {/* Leaderboard skeleton */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse mb-8">
            <div className="h-8 w-48 bg-[var(--color-gray-dark)] rounded" />
          </div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="animate-pulse flex items-center gap-4 p-4 bg-[var(--color-gray-dark)]/50 rounded-xl"
              >
                <div className="h-10 w-10 bg-[var(--color-gray-dark)] rounded-full" />
                <div className="flex-1">
                  <div className="h-5 w-40 bg-[var(--color-gray-dark)] rounded mb-2" />
                  <div className="h-3 w-full bg-[var(--color-gray-dark)] rounded" />
                </div>
                <div className="h-8 w-20 bg-[var(--color-gray-dark)] rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Grid skeleton */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse mb-8">
            <div className="h-8 w-64 bg-[var(--color-gray-dark)] rounded" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse p-6 bg-[var(--color-gray-dark)]/50 rounded-xl">
                <div className="h-12 w-12 bg-[var(--color-gray-dark)] rounded mb-4" />
                <div className="h-5 w-full bg-[var(--color-gray-dark)] rounded mb-2" />
                <div className="h-4 w-20 bg-[var(--color-gray-dark)] rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
