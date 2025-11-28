export default function PressLoading() {
  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      {/* Hero skeleton */}
      <section className="bg-black px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-6 w-32 bg-white/20 rounded mb-6" />
            <div className="h-14 w-3/4 bg-white/10 rounded mb-4" />
            <div className="h-6 w-1/2 bg-white/10 rounded mb-8" />
            <div className="h-4 w-40 bg-white/10 rounded" />
          </div>
        </div>
      </section>

      {/* Language toggle skeleton */}
      <section className="bg-black px-4 pb-8">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse flex justify-center gap-4">
            <div className="h-10 w-32 bg-white/10 rounded" />
            <div className="h-10 w-32 bg-white/10 rounded" />
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse space-y-8">
            {/* Lead paragraph */}
            <div className="space-y-3">
              <div className="h-5 w-full bg-gray-200 rounded" />
              <div className="h-5 w-full bg-gray-200 rounded" />
              <div className="h-5 w-3/4 bg-gray-200 rounded" />
            </div>

            {/* Body paragraphs */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
                <div className="h-4 w-4/5 bg-gray-200 rounded" />
              </div>
            ))}

            {/* Quote block */}
            <div className="border-l-4 border-[var(--color-volt)] pl-6 py-4">
              <div className="h-5 w-full bg-gray-200 rounded mb-2" />
              <div className="h-5 w-2/3 bg-gray-200 rounded" />
            </div>

            {/* About sections */}
            <div className="pt-8 border-t border-gray-200">
              <div className="h-8 w-48 bg-gray-200 rounded mb-6" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Contact section */}
            <div className="pt-8 border-t border-gray-200">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
              <div className="space-y-2">
                <div className="h-4 w-40 bg-gray-200 rounded" />
                <div className="h-4 w-36 bg-gray-200 rounded" />
                <div className="h-4 w-44 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
