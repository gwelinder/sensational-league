export default function PoliciesLoading() {
  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      {/* Header skeleton */}
      <section className="bg-black px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse flex flex-col items-center text-center">
            <div className="h-8 w-64 bg-white/10 rounded mb-4" />
            <div className="h-5 w-96 bg-white/10 rounded" />
          </div>
        </div>
      </section>

      {/* Navigation skeleton */}
      <section className="bg-[#F7F7F7] border-b border-black/10 px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse flex flex-wrap justify-center gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 w-32 bg-black/10 rounded" />
            ))}
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-7 w-48 bg-black/10 rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-black/10 rounded" />
                  <div className="h-4 w-full bg-black/10 rounded" />
                  <div className="h-4 w-3/4 bg-black/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
