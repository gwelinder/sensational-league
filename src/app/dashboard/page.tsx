import Link from "next/link";

interface StandingsRow {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  matchPoints: number;
  bonusPoints: number;
  totalPoints: number;
  socialFollowers: number;
  impactScore: number;
}

const standings: StandingsRow[] = [
  {
    position: 1,
    team: "Lightning Bolts",
    played: 6,
    won: 5,
    drawn: 1,
    lost: 0,
    goalsFor: 18,
    goalsAgainst: 4,
    goalDifference: 14,
    matchPoints: 16,
    bonusPoints: 8,
    totalPoints: 24,
    socialFollowers: 12500,
    impactScore: 95,
  },
  {
    position: 2,
    team: "Phoenix Rising",
    played: 6,
    won: 4,
    drawn: 2,
    lost: 0,
    goalsFor: 14,
    goalsAgainst: 6,
    goalDifference: 8,
    matchPoints: 14,
    bonusPoints: 6,
    totalPoints: 20,
    socialFollowers: 9800,
    impactScore: 88,
  },
  {
    position: 3,
    team: "Storm Riders",
    played: 6,
    won: 4,
    drawn: 0,
    lost: 2,
    goalsFor: 16,
    goalsAgainst: 8,
    goalDifference: 8,
    matchPoints: 12,
    bonusPoints: 7,
    totalPoints: 19,
    socialFollowers: 11200,
    impactScore: 82,
  },
  {
    position: 4,
    team: "Thunder Strikes",
    played: 6,
    won: 3,
    drawn: 1,
    lost: 2,
    goalsFor: 12,
    goalsAgainst: 10,
    goalDifference: 2,
    matchPoints: 10,
    bonusPoints: 5,
    totalPoints: 15,
    socialFollowers: 8900,
    impactScore: 76,
  },
  {
    position: 5,
    team: "Spark United",
    played: 6,
    won: 2,
    drawn: 2,
    lost: 2,
    goalsFor: 10,
    goalsAgainst: 11,
    goalDifference: -1,
    matchPoints: 8,
    bonusPoints: 4,
    totalPoints: 12,
    socialFollowers: 7500,
    impactScore: 71,
  },
  {
    position: 6,
    team: "Velocity FC",
    played: 6,
    won: 2,
    drawn: 1,
    lost: 3,
    goalsFor: 9,
    goalsAgainst: 13,
    goalDifference: -4,
    matchPoints: 7,
    bonusPoints: 3,
    totalPoints: 10,
    socialFollowers: 6800,
    impactScore: 65,
  },
  {
    position: 7,
    team: "Rebels FC",
    played: 6,
    won: 1,
    drawn: 1,
    lost: 4,
    goalsFor: 7,
    goalsAgainst: 15,
    goalDifference: -8,
    matchPoints: 4,
    bonusPoints: 2,
    totalPoints: 6,
    socialFollowers: 5200,
    impactScore: 58,
  },
  {
    position: 8,
    team: "Electric Dreams",
    played: 6,
    won: 0,
    drawn: 2,
    lost: 4,
    goalsFor: 5,
    goalsAgainst: 16,
    goalDifference: -11,
    matchPoints: 2,
    bonusPoints: 1,
    totalPoints: 3,
    socialFollowers: 4100,
    impactScore: 45,
  },
];

const upcomingMatches = [
  {
    id: 1,
    date: "2024-11-05",
    time: "19:00",
    homeTeam: "Lightning Bolts",
    awayTeam: "Thunder Strikes",
    venue: "Central Stadium",
    status: "scheduled" as const,
  },
  {
    id: 2,
    date: "2024-11-06",
    time: "20:30",
    homeTeam: "Phoenix Rising",
    awayTeam: "Storm Riders",
    venue: "North Field",
    status: "scheduled" as const,
  },
  {
    id: 3,
    date: "2024-11-07",
    time: "18:00",
    homeTeam: "Spark United",
    awayTeam: "Velocity FC",
    venue: "South Complex",
    status: "scheduled" as const,
  },
];

const recentHighlights = [
  {
    title: "Lightning Bolts hit 10K TikTok followers",
    description: "First team to reach social media milestone",
    type: "social",
    timestamp: "2 hours ago",
  },
  {
    title: "Phoenix Rising organizes beach cleanup",
    description: "150 volunteers collected 500kg of waste",
    type: "impact",
    timestamp: "1 day ago",
  },
  {
    title: "Storm Riders score viral goal",
    description: "Last-minute winner reaches 100K views",
    type: "match",
    timestamp: "2 days ago",
  },
  {
    title: "Thunder Strikes launches scholarship program",
    description: "Supporting 25 young athletes",
    type: "impact",
    timestamp: "3 days ago",
  },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black uppercase tracking-wide">
          SEASON OVERVIEW
        </h1>
        <p className="text-gray-600 mt-2">
          Current season standings, upcoming matches, and league highlights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Goals</p>
              <p className="text-3xl font-bold text-black">91</p>
            </div>
            <div className="text-3xl" style={{ color: 'var(--color-volt)' }}>⚽</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">+12% from last season</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Social Reach</p>
              <p className="text-3xl font-bold text-black">1.2M</p>
            </div>
            <div className="text-3xl" style={{ color: 'var(--color-volt)' }}>📱</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Across all platforms</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Impact Hours</p>
              <p className="text-3xl font-bold text-black">2,847</p>
            </div>
            <div className="text-3xl" style={{ color: 'var(--color-volt)' }}>🌍</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Community volunteer hours</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Viral Moments</p>
              <p className="text-3xl font-bold text-black">47</p>
            </div>
            <div className="text-3xl" style={{ color: 'var(--color-volt)' }}>🔥</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Posts over 50K engagement</p>
        </div>
      </div>

      {/* League Standings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-black uppercase tracking-wide">
              LEAGUE STANDINGS
            </h2>
            <Link 
              href="/dashboard/teams" 
              className="text-sm hover:text-black font-medium"
              style={{ color: 'var(--color-volt)' }}
            >
              View All Teams →
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  W
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  D
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  L
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GD
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Match Pts
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bonus Pts
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Pts
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Social
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impact
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {standings.map((team, index) => (
                <tr key={team.team} className={index < 4 ? "bg-green-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-bold ${index < 4 ? "text-green-600" : "text-gray-900"}`}>
                        {team.position}
                      </span>
                      {index < 4 && <span className="ml-2 text-green-600">🏆</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{team.team}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {team.played}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {team.won}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {team.drawn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {team.lost}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-center text-sm ${
                    team.goalDifference > 0 ? "text-green-600" : 
                    team.goalDifference < 0 ? "text-red-600" : "text-gray-900"
                  }`}>
                    {team.goalDifference > 0 ? "+" : ""}{team.goalDifference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                    {team.matchPoints}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium" style={{ color: 'var(--color-volt)' }}>
                    {team.bonusPoints}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-black">
                    {team.totalPoints}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-xs text-gray-500">
                    {(team.socialFollowers / 1000).toFixed(1)}K
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      team.impactScore >= 90 ? "bg-green-100 text-green-800" :
                      team.impactScore >= 75 ? "bg-yellow-100 text-yellow-800" :
                      team.impactScore >= 60 ? "bg-orange-100 text-orange-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {team.impactScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Matches */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-black uppercase tracking-wide">
                UPCOMING MATCHES
              </h2>
              <Link 
                href="/dashboard/matches" 
                className="text-sm hover:text-black font-medium"
              style={{ color: 'var(--color-volt)' }}
              >
                View All →
              </Link>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-volt-yellow transition-colors">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {match.homeTeam} vs {match.awayTeam}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {match.venue} • {new Date(match.date).toLocaleDateString()} at {match.time}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Scheduled
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Highlights */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-black uppercase tracking-wide">
              RECENT HIGHLIGHTS
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {recentHighlights.map((highlight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                  highlight.type === "social" ? "bg-blue-500" :
                  highlight.type === "impact" ? "bg-green-500" :
                  "bg-volt-yellow"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {highlight.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {highlight.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {highlight.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}