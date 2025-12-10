import { sanityFetch } from "@/sanity/lib/live";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/sanity-image";
import { cn } from "@/lib/utils";

interface Team {
  _id: string;
  name: string;
  slug: { current: string };
  logo?: {
    asset?: { _ref?: string };
    alt?: string;
  };
  colors?: {
    primary?: string;
    secondary?: string;
  };
  foundedYear?: number;
  description?: unknown[];
  socialMedia?: {
    instagram?: string;
    tiktok?: string;
    twitter?: string;
  };
  statistics?: {
    matchesPlayed?: number;
    wins?: number;
    draws?: number;
    losses?: number;
    goalsFor?: number;
    goalsAgainst?: number;
    matchPoints?: number;
    bonusPoints?: number;
    totalPoints?: number;
  };
  captain?: {
    name?: string;
    photo?: {
      asset?: { _ref?: string };
    };
  };
  playersCount?: number;
}

async function getTeams(): Promise<Team[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "team"] | order(statistics.totalPoints desc, name asc) {
      _id,
      name,
      slug,
      logo {
        asset,
        alt
      },
      colors {
        primary,
        secondary
      },
      foundedYear,
      description,
      socialMedia {
        instagram,
        tiktok,
        twitter
      },
      statistics {
        matchesPlayed,
        wins,
        draws,
        losses,
        goalsFor,
        goalsAgainst,
        matchPoints,
        bonusPoints,
        totalPoints
      },
      "captain": captain-> {
        name,
        photo {
          asset
        }
      },
      "playersCount": count(players)
    }`,
  });
  return (data as Team[]) || [];
}

export const metadata: Metadata = {
  title: "Teams",
  description:
    "Meet the teams of Sensational League - 7v7 women's football reimagined. Six squads competing for glory on and off the pitch.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Teams",
    description: "Meet the teams competing in women's 7v7 football reimagined.",
    type: "website",
  },
};

export const revalidate = 3600;

export default async function TeamsPage() {
  const teams = await getTeams();

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
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="brand-caption text-xs uppercase tracking-[0.4em] text-white/60">
            Season One
          </p>
          <h1 className="mt-4 text-5xl font-black uppercase tracking-[0.12em] md:text-7xl">
            The Teams
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70">
            Six captains. Six visions. Each team brings elite talent and unique
            identity to the pitch. When the season begins, they&apos;ll compete
            for more than points—they&apos;ll battle for impact, glory, and
            the right to call themselves Sensational.
          </p>
        </div>
      </section>

      {/* Teams Grid */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          {teams.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teams.map((team, index) => {
                const logoUrl = team.logo ? getImageUrl(team.logo, 240) : null;
                const isTopTeam = index < 3;

                return (
                  <Link
                    key={team._id}
                    href={`/teams/${team.slug.current}`}
                    className={cn(
                      "group relative overflow-hidden rounded-3xl border transition-all duration-300",
                      isTopTeam
                        ? "border-[var(--color-volt)]/30 hover:border-[var(--color-volt)]"
                        : "border-white/10 hover:border-white/30"
                    )}
                  >
                    {/* Background with team color */}
                    <div
                      className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30"
                      style={{
                        background: team.colors?.primary
                          ? `linear-gradient(135deg, ${team.colors.primary}40, transparent 60%)`
                          : "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)",
                      }}
                    />

                    <div className="relative p-6">
                      {/* Header */}
                      <div className="flex items-start gap-4">
                        {/* Logo */}
                        <div
                          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl"
                          style={{
                            backgroundColor: team.colors?.primary || "#333",
                          }}
                        >
                          {logoUrl ? (
                            <Image
                              src={logoUrl}
                              alt={team.logo?.alt || team.name}
                              width={64}
                              height={64}
                              className="object-contain"
                            />
                          ) : (
                            <span className="text-2xl font-black text-white/80">
                              {team.name.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>

                        {/* Team Name */}
                        <div className="flex-1">
                          <h2 className="text-xl font-black uppercase tracking-wider">
                            {team.name}
                          </h2>
                          {team.foundedYear && (
                            <p className="text-xs text-white/40">
                              Est. {team.foundedYear}
                            </p>
                          )}
                          {team.captain?.name && (
                            <p className="mt-1 text-sm text-white/60">
                              Captain: {team.captain.name}
                            </p>
                          )}
                        </div>

                        {/* Rank Badge */}
                        {isTopTeam && (
                          <div
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-full text-sm font-black",
                              index === 0
                                ? "bg-[var(--color-volt)] text-black"
                                : index === 1
                                  ? "bg-white/30 text-white"
                                  : "bg-white/20 text-white/80"
                            )}
                          >
                            {index + 1}
                          </div>
                        )}
                      </div>

                      {/* Stats */}
                      {team.statistics && (
                        <div className="mt-6 grid grid-cols-4 gap-2 text-center">
                          <div className="rounded-lg bg-white/5 px-2 py-2">
                            <p className="text-lg font-black text-[var(--color-volt)]">
                              {team.statistics.wins || 0}
                            </p>
                            <p className="text-[9px] uppercase tracking-wider text-white/40">
                              Wins
                            </p>
                          </div>
                          <div className="rounded-lg bg-white/5 px-2 py-2">
                            <p className="text-lg font-black">
                              {team.statistics.draws || 0}
                            </p>
                            <p className="text-[9px] uppercase tracking-wider text-white/40">
                              Draws
                            </p>
                          </div>
                          <div className="rounded-lg bg-white/5 px-2 py-2">
                            <p className="text-lg font-black">
                              {team.statistics.losses || 0}
                            </p>
                            <p className="text-[9px] uppercase tracking-wider text-white/40">
                              Losses
                            </p>
                          </div>
                          <div className="rounded-lg bg-white/5 px-2 py-2">
                            <p className="text-lg font-black text-[var(--color-volt)]">
                              {team.statistics.totalPoints || 0}
                            </p>
                            <p className="text-[9px] uppercase tracking-wider text-white/40">
                              Pts
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex gap-3">
                          {team.socialMedia?.instagram && (
                            <span className="text-xs text-white/40">
                              @{team.socialMedia.instagram}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-white/40 transition-colors group-hover:text-[var(--color-volt)]">
                          View Team →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-20 text-center">
              <div className="text-6xl">⚽</div>
              <h2 className="mt-6 text-2xl font-black uppercase tracking-wider">
                Teams Coming Soon
              </h2>
              <p className="mt-4 text-white/60">
                Six squads are being assembled. The captains are drafting their
                rosters now. Check back soon to meet the teams.
              </p>
              <Link
                href="/captains"
                className={cn(
                  "mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[var(--color-volt)] bg-[var(--color-volt)] px-8 py-4",
                  "text-sm font-black uppercase tracking-[0.3em] text-black",
                  "transition-all hover:bg-transparent hover:text-[var(--color-volt)]"
                )}
              >
                Meet the Captains
                <span>→</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* League Format Info */}
      <section className="border-t border-white/10 bg-[#0a0a0a] px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-black uppercase tracking-wider text-[var(--color-volt)]">
                7v7 Format
              </h3>
              <p className="mt-3 text-sm text-white/60">
                Fast-paced, high-intensity football. Smaller squads mean more
                touches, more action, more moments of brilliance.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-black uppercase tracking-wider text-[var(--color-volt)]">
                Sensational Points
              </h3>
              <p className="mt-3 text-sm text-white/60">
                Match results are just part of the score. Teams earn bonus
                points for social media impact and community challenges.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-black uppercase tracking-wider text-[var(--color-volt)]">
                Captain-Led
              </h3>
              <p className="mt-3 text-sm text-white/60">
                Each team is built by a legendary captain. Their vision shapes
                the squad, the style, and the identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-black uppercase tracking-[0.15em]">
            Want to Play?
          </h3>
          <p className="mt-4 text-white/60">
            The draft is open. Submit your application and a captain might pick
            you for their squad.
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
              Enter the Draft
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
              Meet the Captains
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
