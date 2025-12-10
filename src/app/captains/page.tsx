import { sanityFetch } from "@/sanity/lib/live";
import type { Metadata } from "next";
import Link from "next/link";
import { getImageUrl } from "@/lib/sanity-image";
import { cn } from "@/lib/utils";
import CaptainCardMedia from "@/components/CaptainCardMedia";
import {
  getDesignSettings,
  getCaptainCardClasses,
  getStatsBadgePosition,
  getButtonHoverClasses,
  type DesignSettings,
} from "@/lib/design-settings";

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
  position?: string;
  nationalCaps?: number;
}

interface CaptainsPageContent {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  displayStyle?: 'grid' | 'large' | 'list';
  showStats?: boolean;
  showVideo?: boolean;
  emptyStateTitle?: string;
  emptyStateSubtitle?: string;
  ctaEnabled?: boolean;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

async function getCaptainsPageContent(): Promise<CaptainsPageContent> {
  const { data } = await sanityFetch({
    query: `*[_type == "captainsPage"][0] {
      eyebrow,
      title,
      subtitle,
      displayStyle,
      showStats,
      showVideo,
      emptyStateTitle,
      emptyStateSubtitle,
      ctaEnabled,
      ctaTitle,
      ctaDescription,
      ctaButtonText,
      ctaButtonLink,
      seo {
        metaTitle,
        metaDescription
      }
    }`,
  });
  return (data as CaptainsPageContent) || {};
}

async function getCaptains(): Promise<Captain[]> {
  const { data: captainDocs } = await sanityFetch({
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
      videoUrl,
      position,
      nationalCaps
    }`,
  });

  return (captainDocs as Captain[]) || [];
}

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getCaptainsPageContent();

  return {
    title: pageContent.seo?.metaTitle || pageContent.title || "Captains",
    description: pageContent.seo?.metaDescription || pageContent.subtitle ||
      "Meet the legendary Danish football captains leading the Sensational League.",
  };
}

export const revalidate = 3600;

export default async function CaptainsPage() {
  const [captains, pageContent, designSettings] = await Promise.all([
    getCaptains(),
    getCaptainsPageContent(),
    getDesignSettings(),
  ]);

  // Defaults for when CMS content hasn't been set up yet
  const content = {
    eyebrow: pageContent.eyebrow || "The Sensational Six",
    title: pageContent.title || "Meet Our Captains",
    subtitle: pageContent.subtitle || "Six icons of Danish football bring elite experience, cultural impact, and unstoppable energy to the league. These legendary leaders are turning the Sensational 80 into a movement.",
    displayStyle: pageContent.displayStyle || "grid",
    showStats: pageContent.showStats !== false,
    showVideo: pageContent.showVideo !== false,
    emptyStateTitle: pageContent.emptyStateTitle || "Captain profiles coming soon...",
    emptyStateSubtitle: pageContent.emptyStateSubtitle || "Check back after the team captains are announced.",
    ctaEnabled: pageContent.ctaEnabled !== false,
    ctaTitle: pageContent.ctaTitle || "Want to Play for a Captain?",
    ctaDescription: pageContent.ctaDescription || "Submit your player draft application and get noticed by our legendary captains.",
    ctaButtonText: pageContent.ctaButtonText || "Start Application",
    ctaButtonLink: pageContent.ctaButtonLink || "/player-draft",
  };

  // Grid classes based on display style
  const gridClasses = {
    grid: "grid gap-8 md:grid-cols-2 xl:grid-cols-3",
    large: "grid gap-8 md:grid-cols-2",
    list: "flex flex-col gap-6",
  };

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
            {content.eyebrow}
          </p>
          <h1 className="mt-4 text-5xl font-black uppercase tracking-[0.15em] md:text-7xl">
            {content.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70">
            {content.subtitle}
          </p>
        </div>
      </section>

      {/* Captains Grid */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-7xl">
          {captains.length > 0 ? (
            <div className={gridClasses[content.displayStyle]}>
              {captains.map((captain) => {
                const photoUrl = captain.photo
                  ? getImageUrl(captain.photo, 800)
                  : null;

                // Get design-driven classes
                const cardClasses = getCaptainCardClasses(designSettings);
                const statsBadgePosition = getStatsBadgePosition(designSettings);
                const showStats = designSettings.captainStyles?.showStats !== false && content.showStats;

                return (
                  <Link
                    key={captain._id}
                    href={`/captains/${captain.slug?.current}`}
                    className={cn(
                      "group relative flex overflow-hidden",
                      cardClasses,
                      content.displayStyle === "list" ? "flex-row" : "flex-col"
                    )}
                    style={{
                      borderRadius: designSettings.captainStyles?.cardBorderRadius || "32px",
                    }}
                  >
                    {/* Photo/Video Media */}
                    <div className={cn(
                      "relative",
                      content.displayStyle === "list" && "w-48 flex-shrink-0"
                    )}>
                      <CaptainCardMedia
                        photoUrl={photoUrl}
                        videoUrl={content.showVideo ? captain.videoUrl : undefined}
                        captainName={captain.name}
                        photoAlt={captain.photo?.alt}
                      />

                      {/* Stats Badge - position from design settings */}
                      {showStats && captain.nationalCaps && (
                        <div className={cn(
                          statsBadgePosition,
                          "z-10 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur"
                        )}>
                          {captain.nationalCaps} Caps
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <p className="brand-caption text-[0.6rem] uppercase tracking-[0.35em] text-white/50">
                        {captain.tagline}
                      </p>
                      <h2
                        className="text-2xl font-black uppercase tracking-[0.18em]"
                        style={{
                          color: designSettings.captainStyles?.nameColor || undefined,
                          fontWeight: designSettings.typography?.headingWeight || undefined,
                          textTransform: designSettings.typography?.headingStyle === "none" ? "none" : designSettings.typography?.headingStyle || "uppercase",
                          letterSpacing: designSettings.typography?.headingTracking || undefined,
                        }}
                      >
                        {captain.name}
                      </h2>
                      {captain.oneLiner && (
                        <p
                          className="text-xs font-bold uppercase tracking-[0.3em]"
                          style={{
                            color: designSettings.captainStyles?.taglineColor || "var(--color-volt)",
                          }}
                        >
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
                {content.emptyStateTitle}
              </p>
              <p className="mt-2 text-sm text-white/40">
                {content.emptyStateSubtitle}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {content.ctaEnabled && (
        <section className="border-t border-white/10 bg-[#0a0a0a] px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-black uppercase tracking-[0.15em]">
              {content.ctaTitle}
            </h3>
            <p className="mt-4 text-white/60">
              {content.ctaDescription}
            </p>
            <Link
              href={content.ctaButtonLink}
              className={cn(
                "mt-8 inline-flex items-center gap-2 border-2 border-[var(--color-volt)] bg-[var(--color-volt)] px-8 py-4",
                "text-sm font-black uppercase tracking-[0.3em] text-black",
                "transition-all duration-200 hover:bg-transparent hover:text-[var(--color-volt)]",
                getButtonHoverClasses(designSettings)
              )}
              style={{
                borderRadius: designSettings.buttons?.borderRadius || "9999px",
              }}
            >
              {content.ctaButtonText}
              <span>→</span>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
