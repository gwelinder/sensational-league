import { sanityFetch } from "@/sanity/lib/live";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/sanity-image";
import { cn } from "@/lib/utils";
import { getCaptainGradient, getInitials } from "@/lib/captain-utils";

interface Captain {
  _id: string;
  name: string;
  slug: { current: string };
  tagline?: string;
  oneLiner?: string;
  summary?: string;
  superpower?: string;
  photo?: {
    asset?: { _ref?: string };
    alt?: string;
  };
  position?: string;
  nationalCaps?: number;
}

async function getCaptains(): Promise<Captain[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "captain"] | order(order asc) {
      _id,
      name,
      slug,
      tagline,
      oneLiner,
      summary,
      superpower,
      photo {
        asset,
        alt
      },
      position,
      nationalCaps
    }`,
  });
  return (data as Captain[]) || [];
}

export const metadata: Metadata = {
  title: "Captains - Sensational League",
  description:
    "Meet the legendary Danish football captains leading the Sensational League. Six icons bringing elite experience and unstoppable energy.",
};

export const revalidate = 3600;

export default async function CaptainsPage() {
  const captains = await getCaptains();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-16 pt-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 15% 10%, rgba(212,255,0,0.08), transparent 55%), radial-gradient(circle at 80% 6%, rgba(255,255,255,0.12), transparent 40%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="brand-caption text-xs uppercase tracking-[0.4em] text-white/60">
            The Sensational Six
          </p>
          <h1 className="mt-4 text-5xl font-black uppercase tracking-[0.15em] md:text-7xl">
            Meet Our Captains
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70">
            Six icons of Danish football bring elite experience, cultural
            impact, and unstoppable energy to the league. These legendary
            leaders are turning the Sensational 80 into a movement.
          </p>
        </div>
      </section>

      {/* Captains Grid */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-7xl">
          {captains.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {captains.map((captain) => {
                const initials = getInitials(captain.name);
                const photoUrl = captain.photo
                  ? getImageUrl(captain.photo, 800)
                  : null;

                return (
                  <Link
                    key={captain._id}
                    href={`/captains/${captain.slug?.current}`}
                    className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] transition-all duration-300 hover:border-[var(--color-volt)]/50 hover:bg-white/[0.08]"
                  >
                    {/* Photo */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={captain.photo?.alt || captain.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center"
                          style={{ backgroundImage: getCaptainGradient(captain.name) }}
                        >
                          <span className="text-6xl font-black tracking-[0.3em] text-white/50">
                            {initials}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Stats Badge */}
                      {captain.nationalCaps && (
                        <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">
                          {captain.nationalCaps} Caps
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <p className="brand-caption text-[0.6rem] uppercase tracking-[0.35em] text-white/50">
                        {captain.tagline}
                      </p>
                      <h2 className="text-2xl font-black uppercase tracking-[0.18em]">
                        {captain.name}
                      </h2>
                      {captain.oneLiner && (
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-volt)]">
                          {captain.oneLiner}
                        </p>
                      )}
                      {captain.summary && (
                        <p className="brand-body mt-2 line-clamp-3 text-sm text-white/70">
                          {captain.summary}
                        </p>
                      )}
                      <div className="mt-auto flex items-center gap-2 pt-4 text-xs font-bold uppercase tracking-[0.3em] text-white/50 transition-colors group-hover:text-[var(--color-volt)]">
                        <span>View Profile</span>
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-16 text-center">
              <p className="text-xl text-white/60">
                Captain profiles coming soon...
              </p>
              <p className="mt-2 text-sm text-white/40">
                Check back after the team captains are announced.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10 bg-[#0a0a0a] px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-black uppercase tracking-[0.15em]">
            Want to Play for a Captain?
          </h3>
          <p className="mt-4 text-white/60">
            Submit your player draft application and get noticed by our legendary captains.
          </p>
          <Link
            href="/player-draft"
            className={cn(
              "mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[var(--color-volt)] bg-[var(--color-volt)] px-8 py-4",
              "text-sm font-black uppercase tracking-[0.3em] text-black",
              "transition-all duration-200 hover:-translate-y-1 hover:bg-transparent hover:text-[var(--color-volt)]"
            )}
          >
            Start Application
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
