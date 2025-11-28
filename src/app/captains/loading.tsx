export default function CaptainsLoading() {
  return (
    <main className="min-h-screen brand-bg">
      {/* Hero skeleton */}
      <section className="px-4 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-[var(--color-gray-dark)] rounded mb-6" />
            <div className="h-16 w-3/4 bg-[var(--color-gray-dark)] rounded mb-4" />
            <div className="h-6 w-1/2 bg-[var(--color-gray-dark)] rounded" />
          </div>
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-[var(--color-gray-dark)] rounded-lg mb-4" />
                <div className="h-6 w-3/4 bg-[var(--color-gray-dark)] rounded mb-2" />
                <div className="h-4 w-1/2 bg-[var(--color-gray-dark)] rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
