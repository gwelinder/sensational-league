import { sanityFetch } from "@/sanity/lib/live";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/sanity-image";
import { cn } from "@/lib/utils";

interface Match {
  _id: string;
  date: string;
  status: "scheduled" | "live" | "completed" | "postponed" | "cancelled";
  matchType: "league" | "cup" | "friendly" | "playoff";
  homeTeam: {
    _id: string;
    name: string;
    slug: { current: string };
    logo?: {
      asset?: { _ref?: string };
      alt?: string;
    };
    colors?: {
      primary?: string;
    };
  };
  awayTeam: {
    _id: string;
    name: string;
    slug: { current: string };
    logo?: {
      asset?: { _ref?: string };
      alt?: string;
    };
    colors?: {
      primary?: string;
    };
  };
  venue?: {
    name: string;
    city?: string;
  };
  score?: {
    homeGoals?: number;
    awayGoals?: number;
  };
}

async function getMatches(): Promise<Match[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "match"] | order(date asc) {
      _id,
      date,
      status,
      matchType,
      homeTeam-> {
        _id,
        name,
        slug,
        logo {
          asset,
          alt
        },
        colors {
          primary
        }
      },
      awayTeam-> {
        _id,
        name,
        slug,
        logo {
          asset,
          alt
        },
        colors {
          primary
        }
      },
      venue-> {
        name,
        city
      },
      score {
        homeGoals,
        awayGoals
      }
    }`,
  });
  return (data as Match[]) || [];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusBadge(status: string) {
  switch (status) {
    case "live":
      return (
        <span className="animate-pulse rounded bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
          Live
        </span>
      );
    case "completed":
      return (
        <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase text-white/60">
          FT
        </span>
      );
    case "postponed":
      return (
        <span className="rounded bg-orange-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-orange-400">
          Postponed
        </span>
      );
    case "cancelled":
      return (
        <span className="rounded bg-red-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-red-400">
          Cancelled
        </span>
      );
    default:
      return null;
  }
}

function TeamLogo({
  team,
  size = 48,
}: {
  team: Match["homeTeam"];
  size?: number;
}) {
  const logoUrl = team.logo ? getImageUrl(team.logo, size * 2) : null;

  if (logoUrl) {
    return (
      <Image
        src={logoUrl}
        alt={team.logo?.alt || team.name}
        width={size}
        height={size}
        className="rounded-lg object-contain"
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-lg text-xs font-bold"
      style={{
        width: size,
        height: size,
        backgroundColor: team.colors?.primary || "#333",
      }}
    >
      {team.name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "View the full match schedule for Sensational League. See upcoming fixtures, results, and live matches.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Schedule",
    description: "Full match schedule for women's 7v7 football reimagined.",
    type: "website",
  },
};

export const revalidate = 600; // Revalidate every 10 minutes for live updates

export default async function SchedulePage() {
  const matches = await getMatches();

  const now = new Date();
  const upcomingMatches = matches.filter(
    (m) => m.status === "scheduled" && new Date(m.date) >= now
  );
  const liveMatches = matches.filter((m) => m.status === "live");
  const completedMatches = matches.filter((m) => m.status === "completed");
  const postponedMatches = matches.filter(
    (m) => m.status === "postponed" || m.status === "cancelled"
  );

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
            Season One
          </p>
          <h1 className="mt-4 text-5xl font-black uppercase tracking-[0.12em] md:text-7xl">
            Schedule
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70">
            Every match. Every moment. Follow the action as six teams battle for
            glory on and off the pitch.
          </p>
        </div>
      </section>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <section className="border-y border-red-500/30 bg-red-950/10 px-4 py-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-black uppercase tracking-wider">
              <span className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
              Live Now
            </h2>
            <div className="space-y-4">
              {liveMatches.map((match) => (
                <div
                  key={match._id}
                  className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Home Team */}
                    <div className="flex flex-1 items-center justify-end gap-3">
                      <span className="text-right font-bold">{match.homeTeam.name}</span>
                      <TeamLogo team={match.homeTeam} />
                    </div>

                    {/* Score */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-2 text-3xl font-black">
                        <span className="text-white">
                          {match.score?.homeGoals ?? 0}
                        </span>
                        <span className="text-white/30">-</span>
                        <span className="text-white">
                          {match.score?.awayGoals ?? 0}
                        </span>
                      </div>
                      {getStatusBadge("live")}
                    </div>

                    {/* Away Team */}
                    <div className="flex flex-1 items-center gap-3">
                      <TeamLogo team={match.awayTeam} />
                      <span className="font-bold">{match.awayTeam.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Matches */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-2xl font-black uppercase tracking-wider">
            Upcoming Fixtures
          </h2>

          {upcomingMatches.length > 0 ? (
            <div className="space-y-4">
              {upcomingMatches.map((match) => (
                <div
                  key={match._id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-[var(--color-volt)]/30"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Date & Time */}
                    <div className="shrink-0 sm:w-24">
                      <p className="text-lg font-bold text-[var(--color-volt)]">
                        {formatDate(match.date)}
                      </p>
                      <p className="text-sm text-white/50">{formatTime(match.date)}</p>
                    </div>

                    {/* Teams */}
                    <div className="flex flex-1 items-center justify-center gap-4">
                      <div className="flex items-center gap-2">
                        <TeamLogo team={match.homeTeam} size={36} />
                        <span className="font-bold">{match.homeTeam.name}</span>
                      </div>
                      <span className="text-xl font-bold text-white/30">vs</span>
                      <div className="flex items-center gap-2">
                        <TeamLogo team={match.awayTeam} size={36} />
                        <span className="font-bold">{match.awayTeam.name}</span>
                      </div>
                    </div>

                    {/* Venue */}
                    {match.venue && (
                      <div className="shrink-0 text-right sm:w-32">
                        <p className="text-sm text-white/50">{match.venue.name}</p>
                        {match.venue.city && (
                          <p className="text-xs text-white/30">{match.venue.city}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <p className="text-4xl">📅</p>
              <p className="mt-4 text-white/60">
                {matches.length === 0
                  ? "Match schedule coming soon..."
                  : "No upcoming matches scheduled"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Completed Matches */}
      {completedMatches.length > 0 && (
        <section className="border-t border-white/10 bg-[#0a0a0a] px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-2xl font-black uppercase tracking-wider">
              Recent Results
            </h2>
            <div className="space-y-4">
              {completedMatches.slice(0, 10).map((match) => (
                <div
                  key={match._id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Date */}
                    <div className="shrink-0 sm:w-24">
                      <p className="text-sm text-white/50">{formatDate(match.date)}</p>
                    </div>

                    {/* Teams & Score */}
                    <div className="flex flex-1 items-center justify-center gap-4">
                      <div className="flex items-center gap-2">
                        <TeamLogo team={match.homeTeam} size={36} />
                        <span className="font-bold">{match.homeTeam.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-xl font-black",
                            (match.score?.homeGoals ?? 0) >
                              (match.score?.awayGoals ?? 0)
                              ? "text-[var(--color-volt)]"
                              : "text-white"
                          )}
                        >
                          {match.score?.homeGoals ?? 0}
                        </span>
                        <span className="text-white/30">-</span>
                        <span
                          className={cn(
                            "text-xl font-black",
                            (match.score?.awayGoals ?? 0) >
                              (match.score?.homeGoals ?? 0)
                              ? "text-[var(--color-volt)]"
                              : "text-white"
                          )}
                        >
                          {match.score?.awayGoals ?? 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TeamLogo team={match.awayTeam} size={36} />
                        <span className="font-bold">{match.awayTeam.name}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="shrink-0 text-right sm:w-24">
                      {getStatusBadge("completed")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Postponed/Cancelled */}
      {postponedMatches.length > 0 && (
        <section className="px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-xl font-black uppercase tracking-wider text-white/50">
              Postponed / Cancelled
            </h2>
            <div className="space-y-3">
              {postponedMatches.map((match) => (
                <div
                  key={match._id}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-4 opacity-60"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{match.homeTeam.name}</span>
                      <span className="text-white/30">vs</span>
                      <span className="text-sm">{match.awayTeam.name}</span>
                    </div>
                    {getStatusBadge(match.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-white/10 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-2xl font-black uppercase tracking-wider">
            Want to Play?
          </h3>
          <p className="mt-4 text-white/60">
            Join the league and be part of the action.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/player-draft"
              className={cn(
                "inline-flex items-center gap-2 rounded-full border-2 border-[var(--color-volt)] bg-[var(--color-volt)] px-8 py-4",
                "text-sm font-black uppercase tracking-[0.3em] text-black",
                "transition-all hover:bg-transparent hover:text-[var(--color-volt)]"
              )}
            >
              Enter the Draft
              <span>→</span>
            </Link>
            <Link
              href="/teams"
              className={cn(
                "inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4",
                "text-sm font-black uppercase tracking-[0.3em] text-white",
                "transition-all hover:border-white hover:bg-white hover:text-black"
              )}
            >
              View Teams
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
