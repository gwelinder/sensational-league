import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/sanity-image";
import CaptainHeroMedia from "./CaptainHeroMedia";
import CaptainPhotoGallery from "@/components/CaptainPhotoGallery";
import { RenderPortableText } from "@/lib/portable-text";
import { getDesignSettings } from "@/lib/design-settings";
import type { PortableTextBlock } from "@portabletext/types";

interface GalleryPhoto {
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
}

interface Captain {
  _id: string;
  name: string;
  slug: { current: string };
  tagline?: string;
  oneLiner?: string;
  summary?: string;
  videoUrl?: string;
  photo?: {
    asset?: { _ref?: string };
    alt?: string;
  };
  nationalCaps?: number;
  position?: string;
  socialMedia?: {
    instagram?: string;
  };
  // Extended fields for expanded content
  heroMediaType?: "photo" | "video" | "both";
  bio?: PortableTextBlock[];
  photoGallery?: GalleryPhoto[];
  quote?: string;
  teamVision?: string;
}

interface Params {
  slug: string;
}

async function getCaptain(slug: string): Promise<Captain | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "captain" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      tagline,
      oneLiner,
      summary,
      videoUrl,
      photo {
        asset,
        alt
      },
      nationalCaps,
      position,
      socialMedia {
        instagram
      },
      heroMediaType,
      bio,
      photoGallery[] {
        asset,
        alt,
        caption
      },
      quote,
      teamVision
    }`,
    params: { slug },
  });
  return data as Captain | null;
}

async function getAllCaptains(): Promise<Captain[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "captain"] | order(order asc) {
      _id,
      name,
      slug,
      tagline,
      oneLiner,
      videoUrl,
      nationalCaps
    }`,
  });
  return (data as Captain[]) || [];
}

async function getAllCaptainSlugs(): Promise<{ slug: string }[]> {
  const data = await client.fetch<{ slug: string }[]>(
    `*[_type == "captain"] { "slug": slug.current }`
  );
  return data || [];
}

export async function generateStaticParams() {
  const slugs = await getAllCaptainSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const captain = await getCaptain(slug);

  if (!captain) {
    return {
      title: "Captain Not Found - Sensational League",
    };
  }

  return {
    title: `${captain.name} - Captain | Sensational League`,
    description:
      captain.summary ||
      `Meet ${captain.name}, one of the legendary captains of Sensational League.`,
    openGraph: {
      title: `${captain.name} - Sensational League Captain`,
      description: captain.summary || captain.tagline,
      type: "profile",
    },
  };
}

export const revalidate = 3600;

export default async function CaptainPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [captain, allCaptains, designSettings] = await Promise.all([
    getCaptain(slug),
    getAllCaptains(),
    getDesignSettings(),
  ]);

  if (!captain) {
    notFound();
  }

  // Get other captains for navigation
  const otherCaptains = allCaptains.filter((c) => c.slug.current !== slug);

  // Get photo URL for hero
  const photoUrl = captain.photo ? getImageUrl(captain.photo, 1920) : null;

  // Get video URL - prefer uploaded file, fall back to URL field
  const videoUrl = captain.videoUrl || null;

  // Get photo gallery URLs - filter out any photos without valid URLs
  const galleryPhotos = (captain.photoGallery || [])
    .map((photo) => {
      const url = photo.asset ? getImageUrl(photo, 1200) : null;
      return url ? { url, alt: photo.alt, caption: photo.caption } : null;
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  // Check if there's any extended content to show
  const hasExtendedContent = captain.bio || galleryPhotos.length > 0 || captain.quote || captain.teamVision;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Media Section - Full viewport */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Photo/Video Background with play button */}
        <CaptainHeroMedia
          photoUrl={photoUrl}
          videoUrl={videoUrl}
          captainName={captain.name}
          photoAlt={captain.photo?.alt}
          heroMediaType={captain.heroMediaType}
        />

        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Back Button - Top Left */}
        <div className="absolute left-6 top-28 z-20 md:left-10">
          <Link
            href="/captains"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-sm transition-all hover:border-white hover:bg-white hover:text-black"
          >
            <span>←</span>
            <span>All Captains</span>
          </Link>
        </div>

        {/* Captain Info - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-12 md:px-10 md:pb-16">
          <div className="mx-auto max-w-6xl">
            {/* Stats Pills */}
            <div className="mb-6 flex flex-wrap gap-3">
              {captain.nationalCaps && (
                <span className="rounded-full border border-[var(--color-volt)]/50 bg-[var(--color-volt)]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[var(--color-volt)]">
                  {captain.nationalCaps} Caps
                </span>
              )}
              {captain.position && (
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
                  {captain.position}
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-5xl font-black uppercase tracking-[0.08em] md:text-7xl lg:text-8xl">
              {captain.name}
            </h1>

            {/* One Liner */}
            {captain.oneLiner && (
              <p className="mt-4 text-lg font-bold uppercase tracking-[0.2em] text-[var(--color-volt)] md:text-xl">
                {captain.oneLiner}
              </p>
            )}

            {/* Summary */}
            {captain.summary && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
                {captain.summary}
              </p>
            )}

            {/* Social Link */}
            {captain.socialMedia?.instagram && (
              <a
                href={`https://instagram.com/${captain.socialMedia.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
              >
                <span>@{captain.socialMedia.instagram}</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Scroll Indicator - only show if there's extended content below */}
        {hasExtendedContent && (
          <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce">
            <div className="h-8 w-5 rounded-full border-2 border-white/30">
              <div className="mx-auto mt-1.5 h-2 w-1 rounded-full bg-white/50" />
            </div>
          </div>
        )}
      </section>

      {/* Extended Content Section - Bio, Quote, Photo Gallery */}
      {hasExtendedContent && (
        <section className="border-t border-white/10 bg-[#0a0a0a] px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-4xl">
            {/* Bio Section */}
            {captain.bio && captain.bio.length > 0 && (
              <div className="mb-16">
                <h2 className="mb-8 text-2xl font-black uppercase tracking-[0.12em] md:text-3xl">
                  About {captain.name.split(" ")[0]}
                </h2>
                <div className="max-w-none">
                  <RenderPortableText value={captain.bio} variant="dark" designSettings={designSettings} />
                </div>
              </div>
            )}

            {/* Quote Section */}
            {captain.quote && (
              <div className="mb-16 border-l-4 border-[var(--color-volt)] pl-6 md:pl-8">
                <blockquote className="text-xl italic leading-relaxed text-white/90 md:text-2xl">
                  &ldquo;{captain.quote}&rdquo;
                </blockquote>
                <cite className="mt-4 block text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-volt)]">
                  — {captain.name}
                </cite>
              </div>
            )}

            {/* Team Vision Section */}
            {captain.teamVision && (
              <div className="mb-16">
                <h2 className="mb-6 text-xl font-black uppercase tracking-[0.12em] md:text-2xl">
                  Team Vision
                </h2>
                <p className="text-lg leading-relaxed text-white/80">
                  {captain.teamVision}
                </p>
              </div>
            )}

            {/* Photo Gallery Section */}
            {galleryPhotos.length > 0 && (
              <div>
                <h2 className="mb-8 text-2xl font-black uppercase tracking-[0.12em] md:text-3xl">
                  Gallery
                </h2>
                <CaptainPhotoGallery
                  photos={galleryPhotos}
                  captainName={captain.name}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-t border-white/10 bg-[#0a0a0a] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black uppercase tracking-[0.12em] md:text-4xl">
            Want to Play for {captain.name.split(" ")[0]}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Submit your player draft application and get noticed by our legendary captains.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/player-draft"
              className={cn(
                "inline-flex items-center gap-2 rounded-full border-2 border-[var(--color-volt)] bg-[var(--color-volt)] px-8 py-4",
                "text-sm font-black uppercase tracking-[0.25em] text-black",
                "transition-all duration-200 hover:-translate-y-1 hover:bg-transparent hover:text-[var(--color-volt)]"
              )}
            >
              Apply Now
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Other Captains */}
      {otherCaptains.length > 0 && (
        <section className="border-t border-white/10 px-6 py-20 md:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-10 text-center text-2xl font-black uppercase tracking-[0.15em]">
              Meet the Other Captains
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {otherCaptains.map((c) => (
                <Link
                  key={c._id}
                  href={`/captains/${c.slug.current}`}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-[var(--color-volt)]/50 hover:bg-white/10"
                >
                  {c.nationalCaps && (
                    <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider">
                      {c.nationalCaps} Caps
                    </span>
                  )}
                  <h3 className="text-lg font-black uppercase tracking-wider">
                    {c.name}
                  </h3>
                  {c.oneLiner && (
                    <p className="mt-2 text-xs text-white/50 line-clamp-2">
                      {c.oneLiner}
                    </p>
                  )}
                  <div className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--color-volt)] opacity-0 transition-opacity group-hover:opacity-100">
                    View Profile →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
