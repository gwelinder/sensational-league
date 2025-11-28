export default function TeamsLoading() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-4 pb-20 pt-32">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mx-auto h-4 w-24 animate-pulse rounded bg-white/10" />
          <div className="mx-auto mt-4 h-16 w-64 animate-pulse rounded bg-white/10" />
          <div className="mx-auto mt-6 h-6 w-96 max-w-full animate-pulse rounded bg-white/10" />
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex gap-4">
                  <div className="h-20 w-20 animate-pulse rounded-2xl bg-white/10" />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 w-32 animate-pulse rounded bg-white/10" />
                    <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
                    <div className="h-4 w-40 animate-pulse rounded bg-white/10" />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div
                      key={j}
                      className="h-14 animate-pulse rounded-lg bg-white/10"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
