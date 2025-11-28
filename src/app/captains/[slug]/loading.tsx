export default function CaptainDetailLoading() {
  return (
    <main className="min-h-screen brand-bg">
      {/* Hero skeleton */}
      <section className="px-4 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="animate-pulse">
              <div className="aspect-[3/4] bg-[var(--color-gray-dark)] rounded-2xl" />
            </div>

            {/* Content */}
            <div className="animate-pulse flex flex-col justify-center">
              <div className="h-4 w-24 bg-[var(--color-volt)]/30 rounded mb-4" />
              <div className="h-12 w-3/4 bg-[var(--color-gray-dark)] rounded mb-4" />
              <div className="h-6 w-1/2 bg-[var(--color-gray-dark)] rounded mb-8" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-[var(--color-gray-dark)] rounded" />
                <div className="h-4 w-full bg-[var(--color-gray-dark)] rounded" />
                <div className="h-4 w-2/3 bg-[var(--color-gray-dark)] rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats skeleton */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse p-6 bg-[var(--color-gray-dark)]/50 rounded-xl">
                <div className="h-8 w-20 bg-[var(--color-gray-dark)] rounded mb-2" />
                <div className="h-4 w-16 bg-[var(--color-gray-dark)] rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
