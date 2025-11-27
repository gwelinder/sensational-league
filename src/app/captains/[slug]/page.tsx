import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/sanity-image";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { cn } from "@/lib/utils";

interface CareerHighlight {
  title?: string;
  year?: string;
  description?: string;
}

interface SocialMedia {
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

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
  videoUrl?: string;
  bio?: PortableTextBlock[];
  teamVision?: string;
  lookingFor?: string[];
  careerHighlights?: CareerHighlight[];
  clubs?: string[];
  nationalCaps?: number;
  socialMedia?: SocialMedia;
  quote?: string;
  position?: string;
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
      superpower,
      photo {
        asset,
        alt
      },
      videoUrl,
      bio,
      teamVision,
      lookingFor,
      careerHighlights[] {
        title,
        year,
        description
      },
      clubs,
      nationalCaps,
      socialMedia {
        instagram,
        twitter,
        linkedin
      },
      quote,
      position
    }`,
    params: { slug },
  });
  return data as Captain | null;
}

async function getAllCaptainSlugs(): Promise<{ slug: string }[]> {
  // Use plain client for static generation (no draftMode dependency)
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

function getCaptainGradient(name?: string) {
  const base = (name || "Sensational").split("").reduce((acc, char, index) => {
    return acc + char.charCodeAt(0) * (index + 1);
  }, 0);
  const hue = base % 360;
  const secondary = (hue + 32) % 360;
  return `linear-gradient(135deg, hsl(${hue}, 65%, 22%), hsl(${secondary}, 70%, 12%))`;
}

function getInitials(name?: string): string {
  if (!name) return "SL";
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "SL"
  );
}

export default async function CaptainPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const captain = await getCaptain(slug);

  if (!captain) {
    notFound();
  }

  const photoUrl = captain.photo ? getImageUrl(captain.photo, 1200) : null;
  const initials = getInitials(captain.name);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-20 pt-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 15% 10%, rgba(212,255,0,0.08), transparent 55%), radial-gradient(circle at 80% 6%, rgba(255,255,255,0.12), transparent 40%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          {/* Back Link */}
          <Link
            href="/captains"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
          >
            <span>←</span>
            <span>All Captains</span>
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            {/* Photo */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-[40px] border border-white/10 bg-white/5">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={captain.photo?.alt || captain.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{ backgroundImage: getCaptainGradient(captain.name) }}
                >
                  <span className="text-8xl font-black tracking-[0.3em] text-white/40">
                    {initials}
                  </span>
                </div>
              )}

              {/* Video Play Button */}
              {captain.videoUrl && (
                <a
                  href={captain.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-6 left-6 right-6 flex items-center justify-center gap-3 rounded-full border border-white/30 bg-black/60 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] backdrop-blur transition-all hover:bg-white hover:text-black"
                >
                  <span>▶</span>
                  <span>Watch Captain Film</span>
                </a>
              )}
            </div>

            {/* Content */}
            <div className="space-y-8">
              {captain.tagline && (
                <p className="brand-caption text-xs uppercase tracking-[0.4em] text-white/50">
                  {captain.tagline}
                </p>
              )}

              <h1 className="text-5xl font-black uppercase tracking-[0.12em] md:text-6xl">
                {captain.name}
              </h1>

              {captain.oneLiner && (
                <p className="text-lg font-bold uppercase tracking-[0.25em] text-[var(--color-volt)]">
                  {captain.oneLiner}
                </p>
              )}

              {captain.summary && (
                <p className="text-xl leading-relaxed text-white/80">
                  {captain.summary}
                </p>
              )}

              {/* Stats Row */}
              <div className="flex flex-wrap gap-4">
                {captain.nationalCaps && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center">
                    <p className="text-3xl font-black text-[var(--color-volt)]">
                      {captain.nationalCaps}
                    </p>
                    <p className="brand-caption text-[0.6rem] uppercase tracking-[0.3em] text-white/50">
                      National Caps
                    </p>
                  </div>
                )}
                {captain.position && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center">
                    <p className="text-xl font-black capitalize">
                      {captain.position}
                    </p>
                    <p className="brand-caption text-[0.6rem] uppercase tracking-[0.3em] text-white/50">
                      Position
                    </p>
                  </div>
                )}
                {captain.clubs && captain.clubs.length > 0 && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center">
                    <p className="text-3xl font-black text-[var(--color-volt)]">
                      {captain.clubs.length}
                    </p>
                    <p className="brand-caption text-[0.6rem] uppercase tracking-[0.3em] text-white/50">
                      Clubs
                    </p>
                  </div>
                )}
              </div>

              {/* Superpower */}
              {captain.superpower && (
                <div className="rounded-2xl border border-[var(--color-volt)]/30 bg-[var(--color-volt)]/10 px-6 py-4">
                  <p className="brand-caption text-[0.6rem] uppercase tracking-[0.3em] text-[var(--color-volt)]">
                    Superpower
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {captain.superpower}
                  </p>
                </div>
              )}

              {/* Social Links */}
              {captain.socialMedia && (
                <div className="flex flex-wrap gap-3">
                  {captain.socialMedia.instagram && (
                    <a
                      href={`https://instagram.com/${captain.socialMedia.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:border-white hover:bg-white hover:text-black"
                    >
                      @{captain.socialMedia.instagram}
                    </a>
                  )}
                  {captain.socialMedia.twitter && (
                    <a
                      href={`https://twitter.com/${captain.socialMedia.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:border-white hover:bg-white hover:text-black"
                    >
                      @{captain.socialMedia.twitter}
                    </a>
                  )}
                  {captain.socialMedia.linkedin && (
                    <a
                      href={captain.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:border-white hover:bg-white hover:text-black"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      {captain.quote && (
        <section className="border-y border-white/10 bg-[#0a0a0a] px-4 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <blockquote className="text-2xl font-bold italic leading-relaxed text-white/90 md:text-3xl">
              &ldquo;{captain.quote}&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-volt)]">
              — {captain.name}
            </p>
          </div>
        </section>
      )}

      {/* Bio Section */}
      {captain.bio && captain.bio.length > 0 && (
        <section className="px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-3xl font-black uppercase tracking-[0.15em]">
              Biography
            </h2>
            <div className="prose prose-lg prose-invert prose-p:text-white/80 prose-headings:font-black prose-headings:uppercase prose-headings:tracking-wider">
              <PortableText value={captain.bio} />
            </div>
          </div>
        </section>
      )}

      {/* Team Vision */}
      {captain.teamVision && (
        <section className="border-t border-white/10 bg-[#0a0a0a] px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-black uppercase tracking-[0.15em]">
              Team Vision
            </h2>
            <p className="text-xl leading-relaxed text-white/80">
              {captain.teamVision}
            </p>
          </div>
        </section>
      )}

      {/* Looking For */}
      {captain.lookingFor && captain.lookingFor.length > 0 && (
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-black uppercase tracking-[0.15em]">
              {captain.name.split(" ")[0]} is Looking For...
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {captain.lookingFor.map((trait, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4"
                >
                  <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[var(--color-volt)]" />
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    {trait}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Career Highlights */}
      {captain.careerHighlights && captain.careerHighlights.length > 0 && (
        <section className="border-t border-white/10 bg-[#0a0a0a] px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-10 text-3xl font-black uppercase tracking-[0.15em]">
              Career Highlights
            </h2>
            <div className="space-y-6">
              {captain.careerHighlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex gap-6 rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  {highlight.year && (
                    <div className="shrink-0 text-2xl font-black text-[var(--color-volt)]">
                      {highlight.year}
                    </div>
                  )}
                  <div>
                    {highlight.title && (
                      <h3 className="text-lg font-black uppercase tracking-wider">
                        {highlight.title}
                      </h3>
                    )}
                    {highlight.description && (
                      <p className="mt-2 text-white/70">{highlight.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Clubs */}
      {captain.clubs && captain.clubs.length > 0 && (
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-black uppercase tracking-[0.15em]">
              Notable Clubs
            </h2>
            <div className="flex flex-wrap gap-3">
              {captain.clubs.map((club, index) => (
                <span
                  key={index}
                  className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-bold uppercase tracking-wider"
                >
                  {club}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-t border-white/10 bg-black px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-black uppercase tracking-[0.15em]">
            Play for {captain.name.split(" ")[0]}?
          </h3>
          <p className="mt-4 text-white/60">
            Submit your player draft application and catch {captain.name.split(" ")[0]}&apos;s attention.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/player-draft"
              className={cn(
                "inline-flex items-center gap-2 rounded-full border-2 border-[var(--color-volt)] bg-[var(--color-volt)] px-8 py-4",
                "text-sm font-black uppercase tracking-[0.3em] text-black",
                "transition-all duration-200 hover:-translate-y-1 hover:bg-transparent hover:text-[var(--color-volt)]"
              )}
            >
              Start Application
              <span>→</span>
            </Link>
            <Link
              href="/captains"
              className={cn(
                "inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4",
                "text-sm font-black uppercase tracking-[0.3em] text-white",
                "transition-all duration-200 hover:border-white hover:bg-white hover:text-black"
              )}
            >
              View All Captains
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
