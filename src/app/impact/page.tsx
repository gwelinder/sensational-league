import { sanityFetch } from "@/sanity/lib/live";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/sanity-image";
import { cn } from "@/lib/utils";

interface ImpactActivity {
  title?: string;
  description?: string;
  sdgGoals?: string[];
  date?: string;
  volunteerHours?: number;
  peopleImpacted?: number;
  pointsAwarded?: number;
}

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
  impactActivities?: ImpactActivity[];
  statistics?: {
    bonusPoints?: number;
    totalPoints?: number;
  };
}

// SDG goals data with colors
const SDG_GOALS: Record<string, { name: string; color: string; icon: string }> = {
  sdg1: { name: "No Poverty", color: "#E5243B", icon: "1" },
  sdg2: { name: "Zero Hunger", color: "#DDA63A", icon: "2" },
  sdg3: { name: "Good Health", color: "#4C9F38", icon: "3" },
  sdg4: { name: "Quality Education", color: "#C5192D", icon: "4" },
  sdg5: { name: "Gender Equality", color: "#FF3A21", icon: "5" },
  sdg6: { name: "Clean Water", color: "#26BDE2", icon: "6" },
  sdg7: { name: "Clean Energy", color: "#FCC30B", icon: "7" },
  sdg8: { name: "Decent Work", color: "#A21942", icon: "8" },
  sdg9: { name: "Innovation", color: "#FD6925", icon: "9" },
  sdg10: { name: "Reduced Inequality", color: "#DD1367", icon: "10" },
  sdg11: { name: "Sustainable Cities", color: "#FD9D24", icon: "11" },
  sdg12: { name: "Responsible Consumption", color: "#BF8B2E", icon: "12" },
  sdg13: { name: "Climate Action", color: "#3F7E44", icon: "13" },
  sdg14: { name: "Life Below Water", color: "#0A97D9", icon: "14" },
  sdg15: { name: "Life on Land", color: "#56C02B", icon: "15" },
  sdg16: { name: "Peace & Justice", color: "#00689D", icon: "16" },
  sdg17: { name: "Partnerships", color: "#19486A", icon: "17" },
};

// Fallback example challenges (used when CMS has no data)
const FALLBACK_CHALLENGES = [
  {
    title: "Beach Cleanup Day",
    description: "Teams compete to clean the most beach area and collect recyclable materials.",
    sdgGoals: ["sdg14", "sdg13"],
    points: 500,
    deadline: "Monthly",
    status: "active",
  },
  {
    title: "Youth Coaching Sessions",
    description: "Lead football training sessions for local youth programs and schools.",
    sdgGoals: ["sdg4", "sdg5", "sdg3"],
    points: 750,
    deadline: "Ongoing",
    status: "active",
  },
  {
    title: "Social Media Amplification",
    description: "Create and share content promoting women's sports and the league.",
    sdgGoals: ["sdg5", "sdg10"],
    points: 250,
    deadline: "Weekly",
    status: "active",
  },
  {
    title: "Charity Match Day",
    description: "Organize community events that raise awareness and funds for local causes.",
    sdgGoals: ["sdg1", "sdg11", "sdg17"],
    points: 1000,
    deadline: "Seasonal",
    status: "upcoming",
  },
];

interface CommunityChallenge {
  _id: string;
  title: string;
  description: string;
  sdgGoals?: string[];
  pointsAvailable: number;
  status: "draft" | "upcoming" | "active" | "completed";
  startDate?: string;
  endDate?: string;
  icon?: string;
  category?: string;
}

async function getCommunityChallengеs(): Promise<CommunityChallenge[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "communityChallenge" && status in ["active", "upcoming"]] | order(order asc) {
      _id,
      title,
      description,
      sdgGoals,
      pointsAvailable,
      status,
      startDate,
      endDate,
      icon,
      category
    }`,
  });
  return (data as CommunityChallenge[]) || [];
}

// Type for display challenges (merged from CMS or fallback)
interface DisplayChallenge {
  title: string;
  description: string;
  sdgGoals: string[];
  points: number;
  deadline: string;
  status: string;
}

function getStatusLabel(status: string, endDate?: string): string {
  if (status === "active") {
    if (endDate) {
      const end = new Date(endDate);
      const now = new Date();
      const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (daysLeft <= 7 && daysLeft > 0) return `${daysLeft} days left`;
      if (daysLeft <= 0) return "Ending soon";
    }
    return "Ongoing";
  }
  if (status === "upcoming") return "Coming Soon";
  return "Monthly";
}

async function getTeamsWithImpact(): Promise<Team[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "team"] | order(statistics.bonusPoints desc) {
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
      impactActivities[] {
        title,
        description,
        sdgGoals,
        date,
        volunteerHours,
        peopleImpacted,
        pointsAwarded
      },
      statistics {
        bonusPoints,
        totalPoints
      }
    }`,
  });
  return (data as Team[]) || [];
}

function calculateTeamImpactStats(team: Team) {
  const activities = team.impactActivities || [];
  const totalHours = activities.reduce((sum, a) => sum + (a.volunteerHours || 0), 0);
  const totalPeopleImpacted = activities.reduce((sum, a) => sum + (a.peopleImpacted || 0), 0);
  const totalPoints = activities.reduce((sum, a) => sum + (a.pointsAwarded || 0), 0);
  const sdgContributions = activities.flatMap((a) => a.sdgGoals || []);
  const uniqueSDGs = [...new Set(sdgContributions)];
  
  return {
    activities: activities.length,
    volunteerHours: totalHours,
    peopleImpacted: totalPeopleImpacted,
    impactPoints: totalPoints,
    sdgsAddressed: uniqueSDGs,
  };
}

export const metadata: Metadata = {
  title: "Impact - Sensational League",
  description:
    "See how Sensational League teams are making a difference through the Community Challenge. Football meets social impact.",
};

export const revalidate = 3600;

export default async function ImpactPage() {
  const [teams, cmsChallenges] = await Promise.all([
    getTeamsWithImpact(),
    getCommunityChallengеs(),
  ]);

  // Use CMS challenges if available, otherwise fall back to examples
  const challenges: DisplayChallenge[] = cmsChallenges.length > 0
    ? cmsChallenges.map((c) => ({
        title: c.title,
        description: c.description,
        sdgGoals: c.sdgGoals || [],
        points: c.pointsAvailable,
        deadline: getStatusLabel(c.status, c.endDate),
        status: c.status,
      }))
    : FALLBACK_CHALLENGES.map((c) => ({
        title: c.title,
        description: c.description,
        sdgGoals: c.sdgGoals,
        points: c.points,
        deadline: c.deadline,
        status: c.status,
      }));

  // Calculate totals across all teams
  const allStats = teams.map((t) => calculateTeamImpactStats(t));
  const totalHours = allStats.reduce((sum, s) => sum + s.volunteerHours, 0);
  const totalPeople = allStats.reduce((sum, s) => sum + s.peopleImpacted, 0);
  const totalActivities = allStats.reduce((sum, s) => sum + s.activities, 0);
  const allSDGs = [...new Set(allStats.flatMap((s) => s.sdgsAddressed))];

  // Sort teams by impact points for leaderboard
  const leaderboard = teams
    .map((team) => ({
      ...team,
      stats: calculateTeamImpactStats(team),
    }))
    .sort((a, b) => b.stats.impactPoints - a.stats.impactPoints);

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
            Community Challenge
          </p>
          <h1 className="mt-4 text-5xl font-black uppercase tracking-[0.12em] md:text-7xl">
            Impact Leaderboard
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70">
            In Sensational League, winning isn&apos;t just about goals. Teams earn
            points by driving real-world impact aligned with UN Sustainable
            Development Goals. Football as a force for good.
          </p>
        </div>
      </section>

      {/* Global Impact Stats */}
      <section className="border-y border-white/10 bg-[#0a0a0a] px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center">
              <p className="text-4xl font-black text-[var(--color-volt)]">
                {totalActivities || "—"}
              </p>
              <p className="brand-caption mt-2 text-xs uppercase tracking-[0.3em] text-white/50">
                Impact Activities
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center">
              <p className="text-4xl font-black text-[var(--color-volt)]">
                {totalHours || "—"}
              </p>
              <p className="brand-caption mt-2 text-xs uppercase tracking-[0.3em] text-white/50">
                Volunteer Hours
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center">
              <p className="text-4xl font-black text-[var(--color-volt)]">
                {totalPeople || "—"}
              </p>
              <p className="brand-caption mt-2 text-xs uppercase tracking-[0.3em] text-white/50">
                People Reached
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center">
              <p className="text-4xl font-black text-[var(--color-volt)]">
                {allSDGs.length || "—"}
              </p>
              <p className="brand-caption mt-2 text-xs uppercase tracking-[0.3em] text-white/50">
                SDGs Addressed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Leaderboard */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-black uppercase tracking-[0.15em]">
            Team Impact Rankings
          </h2>

          {leaderboard.length > 0 ? (
            <div className="space-y-4">
              {leaderboard.map((team, index) => {
                const logoUrl = team.logo
                  ? getImageUrl(team.logo, 120)
                  : null;
                const isTop3 = index < 3;

                return (
                  <div
                    key={team._id}
                    className={cn(
                      "flex items-center gap-6 rounded-2xl border px-6 py-5 transition-all",
                      isTop3
                        ? "border-[var(--color-volt)]/30 bg-[var(--color-volt)]/5"
                        : "border-white/10 bg-white/5"
                    )}
                  >
                    {/* Rank */}
                    <div
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-black",
                        index === 0
                          ? "bg-[var(--color-volt)] text-black text-xl"
                          : index === 1
                            ? "bg-white/20 text-white text-xl"
                            : index === 2
                              ? "bg-white/10 text-white/80 text-xl"
                              : "bg-white/5 text-white/50 text-lg"
                      )}
                    >
                      {index + 1}
                    </div>

                    {/* Team Info */}
                    <div className="flex flex-1 items-center gap-4">
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt={team.logo?.alt || team.name}
                          width={48}
                          height={48}
                          className="rounded-lg"
                        />
                      ) : (
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-lg text-sm font-black"
                          style={{
                            backgroundColor: team.colors?.primary || "#333",
                          }}
                        >
                          {team.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold uppercase tracking-wider">
                          {team.name}
                        </h3>
                        <p className="text-xs text-white/50">
                          {team.stats.activities} activities •{" "}
                          {team.stats.volunteerHours}h volunteered
                        </p>
                      </div>
                    </div>

                    {/* SDG Badges */}
                    <div className="hidden flex-wrap gap-1 sm:flex">
                      {team.stats.sdgsAddressed.slice(0, 5).map((sdg) => (
                        <span
                          key={sdg}
                          className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold"
                          style={{ backgroundColor: SDG_GOALS[sdg]?.color }}
                          title={SDG_GOALS[sdg]?.name}
                        >
                          {SDG_GOALS[sdg]?.icon}
                        </span>
                      ))}
                      {team.stats.sdgsAddressed.length > 5 && (
                        <span className="flex h-6 items-center px-1 text-[10px] text-white/50">
                          +{team.stats.sdgsAddressed.length - 5}
                        </span>
                      )}
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <p className="text-2xl font-black text-[var(--color-volt)]">
                        {team.stats.impactPoints.toLocaleString()}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-white/40">
                        Impact pts
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-16 text-center">
              <p className="text-xl text-white/60">
                Impact leaderboard coming soon...
              </p>
              <p className="mt-2 text-sm text-white/40">
                Teams will appear here once the season starts and impact activities are logged.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SDG Overview */}
      <section className="border-t border-white/10 bg-[#0a0a0a] px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-black uppercase tracking-[0.15em]">
            Aligned with UN Goals
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-white/60">
            Every community challenge aligns with the United Nations Sustainable
            Development Goals. Here&apos;s how Sensational League teams are
            contributing.
          </p>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Object.entries(SDG_GOALS)
              .slice(0, 12)
              .map(([key, goal]) => (
                <div
                  key={key}
                  className="group relative overflow-hidden rounded-xl p-4 transition-all hover:scale-105"
                  style={{ backgroundColor: goal.color }}
                >
                  <p className="text-3xl font-black text-white/90">{goal.icon}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-white/80">
                    {goal.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Example Challenges */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-black uppercase tracking-[0.15em]">
            Community Challenges
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-white/60">
            Teams compete in these impact-focused challenges throughout the
            season. Points earned here count toward the league standings.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {challenges.map((challenge, index) => (
              <div
                key={`challenge-${index}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-[var(--color-volt)]/30"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold uppercase tracking-wider">
                    {challenge.title}
                  </h3>
                  <div className="shrink-0 rounded-full bg-[var(--color-volt)] px-3 py-1 text-xs font-bold text-black">
                    {challenge.points} pts
                  </div>
                </div>
                <p className="mb-4 text-sm text-white/70">
                  {challenge.description}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-1">
                    {challenge.sdgGoals.map((sdg: string) => (
                      <span
                        key={sdg}
                        className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold"
                        style={{ backgroundColor: SDG_GOALS[sdg]?.color }}
                        title={SDG_GOALS[sdg]?.name}
                      >
                        {SDG_GOALS[sdg]?.icon}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-white/40">{challenge.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10 bg-black px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-black uppercase tracking-[0.15em]">
            Be Part of the Impact
          </h3>
          <p className="mt-4 text-white/60">
            Join a team that plays for more than trophies. Make your mark on and
            off the pitch.
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
              Apply to Play
              <span>→</span>
            </Link>
            <Link
              href="/#about"
              className={cn(
                "inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4",
                "text-sm font-black uppercase tracking-[0.3em] text-white",
                "transition-all duration-200 hover:border-white hover:bg-white hover:text-black"
              )}
            >
              Learn About the League
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
