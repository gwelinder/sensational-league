import Link from "next/link";

interface Team {
  id: string;
  name: string;
  logo?: string;
  colors: {
    primary: string;
    secondary: string;
  };
  manager: {
    name: string;
    email: string;
    phone: string;
  };
  captain: {
    name: string;
    jerseyNumber: number;
  };
  socialMedia: {
    instagram: string;
    tiktok: string;
    twitter: string;
    instagramFollowers: number;
    tiktokFollowers: number;
    twitterFollowers: number;
    engagementRate: number;
    viralContent: number;
  };
  statistics: {
    matchesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    matchPoints: number;
    bonusPoints: number;
    totalPoints: number;
  };
  impactScore: number;
  impactActivities: Array<{
    title: string;
    sdgGoals: string[];
    date: string;
    volunteerHours: number;
    peopleImpacted: number;
    pointsAwarded: number;
  }>;
  achievements: Array<{
    title: string;
    category: string;
    date: string;
    description: string;
  }>;
}

const teams: Team[] = [
  {
    id: "1",
    name: "Lightning Bolts",
    colors: {
      primary: "#FFD700",
      secondary: "#1E90FF",
    },
    manager: {
      name: "Sarah Chen",
      email: "sarah.chen@lightningbolts.com",
      phone: "+1 (555) 123-4567",
    },
    captain: {
      name: "Maya Rodriguez",
      jerseyNumber: 10,
    },
    socialMedia: {
      instagram: "lightningbolts_fc",
      tiktok: "lightningbolts",
      twitter: "lightningbolts",
      instagramFollowers: 8500,
      tiktokFollowers: 2800,
      twitterFollowers: 1200,
      engagementRate: 6.8,
      viralContent: 3,
    },
    statistics: {
      matchesPlayed: 6,
      wins: 5,
      draws: 1,
      losses: 0,
      goalsFor: 18,
      goalsAgainst: 4,
      matchPoints: 16,
      bonusPoints: 8,
      totalPoints: 24,
    },
    impactScore: 95,
    impactActivities: [
      {
        title: "Youth Football Workshop",
        sdgGoals: ["sdg4", "sdg5"],
        date: "2024-10-15",
        volunteerHours: 24,
        peopleImpacted: 45,
        pointsAwarded: 5,
      },
      {
        title: "Community Garden Project",
        sdgGoals: ["sdg11", "sdg13"],
        date: "2024-10-22",
        volunteerHours: 18,
        peopleImpacted: 30,
        pointsAwarded: 3,
      },
    ],
    achievements: [
      {
        title: "Unbeaten Streak",
        category: "match",
        date: "2024-10-30",
        description: "6 matches without a loss",
      },
      {
        title: "Top Social Engagement",
        category: "social",
        date: "2024-10-25",
        description: "Highest engagement rate in league",
      },
    ],
  },
  {
    id: "2",
    name: "Phoenix Rising",
    colors: {
      primary: "#FF4500",
      secondary: "#8B0000",
    },
    manager: {
      name: "Amanda Foster",
      email: "amanda.foster@phoenixrising.com",
      phone: "+1 (555) 234-5678",
    },
    captain: {
      name: "Zoe Thompson",
      jerseyNumber: 8,
    },
    socialMedia: {
      instagram: "phoenix_rising_fc",
      tiktok: "phoenixrising",
      twitter: "phoenixrising",
      instagramFollowers: 6200,
      tiktokFollowers: 2100,
      twitterFollowers: 1500,
      engagementRate: 5.4,
      viralContent: 2,
    },
    statistics: {
      matchesPlayed: 6,
      wins: 4,
      draws: 2,
      losses: 0,
      goalsFor: 14,
      goalsAgainst: 6,
      matchPoints: 14,
      bonusPoints: 6,
      totalPoints: 20,
    },
    impactScore: 88,
    impactActivities: [
      {
        title: "Food Bank Volunteer Drive",
        sdgGoals: ["sdg1", "sdg2"],
        date: "2024-10-18",
        volunteerHours: 32,
        peopleImpacted: 120,
        pointsAwarded: 6,
      },
    ],
    achievements: [
      {
        title: "Community Champion",
        category: "impact",
        date: "2024-10-20",
        description: "Outstanding community service contribution",
      },
    ],
  },
  {
    id: "3",
    name: "Storm Riders",
    colors: {
      primary: "#4B0082",
      secondary: "#00CED1",
    },
    manager: {
      name: "Jennifer Park",
      email: "jennifer.park@stormriders.com",
      phone: "+1 (555) 345-6789",
    },
    captain: {
      name: "Aisha Patel",
      jerseyNumber: 7,
    },
    socialMedia: {
      instagram: "storm_riders_fc",
      tiktok: "stormriders",
      twitter: "stormriders",
      instagramFollowers: 7800,
      tiktokFollowers: 3200,
      twitterFollowers: 1100,
      engagementRate: 6.2,
      viralContent: 4,
    },
    statistics: {
      matchesPlayed: 6,
      wins: 4,
      draws: 0,
      losses: 2,
      goalsFor: 16,
      goalsAgainst: 8,
      matchPoints: 12,
      bonusPoints: 7,
      totalPoints: 19,
    },
    impactScore: 82,
    impactActivities: [
      {
        title: "Beach Cleanup Initiative",
        sdgGoals: ["sdg14", "sdg15"],
        date: "2024-10-12",
        volunteerHours: 20,
        peopleImpacted: 25,
        pointsAwarded: 4,
      },
      {
        title: "Mental Health Awareness Campaign",
        sdgGoals: ["sdg3"],
        date: "2024-10-28",
        volunteerHours: 16,
        peopleImpacted: 200,
        pointsAwarded: 3,
      },
    ],
    achievements: [
      {
        title: "Viral Goal Celebration",
        category: "social",
        date: "2024-10-26",
        description: "Goal celebration reached 150K views on TikTok",
      },
    ],
  },
];

const sdgGoalNames: Record<string, string> = {
  sdg1: "No Poverty",
  sdg2: "Zero Hunger",
  sdg3: "Good Health and Well-being",
  sdg4: "Quality Education",
  sdg5: "Gender Equality",
  sdg11: "Sustainable Cities",
  sdg13: "Climate Action",
  sdg14: "Life Below Water",
  sdg15: "Life on Land",
};

export default function TeamsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black uppercase tracking-wide">
            TEAM MANAGEMENT
          </h1>
          <p className="text-gray-600 mt-2">
            Manage teams, track social impact, and monitor performance
          </p>
        </div>
        <button 
          className="px-6 py-3 text-black font-medium rounded-lg transition-colors"
          style={{ backgroundColor: 'var(--color-volt)' }}
        >
          Add New Team
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {teams.map((team) => (
          <div key={team.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Team Header */}
            <div className="p-6 border-b border-gray-200" style={{ backgroundColor: team.colors.primary + '20' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: team.colors.primary }}
                  >
                    {team.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black">{team.name}</h3>
                    <p className="text-sm text-gray-600">Captain: {team.captain.name} (#{team.captain.jerseyNumber})</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-black">{team.statistics.totalPoints}</div>
                  <div className="text-xs text-gray-500 uppercase">Total Points</div>
                </div>
              </div>
            </div>

            {/* Team Stats */}
            <div className="p-6 space-y-6">
              {/* Performance Metrics */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                  Performance
                </h4>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{team.statistics.wins}</div>
                    <div className="text-xs text-gray-500">Wins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-600">{team.statistics.draws}</div>
                    <div className="text-xs text-gray-500">Draws</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">{team.statistics.losses}</div>
                    <div className="text-xs text-gray-500">Losses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold" style={{ color: 'var(--color-volt)' }}>
                      {team.statistics.bonusPoints}
                    </div>
                    <div className="text-xs text-gray-500">Bonus</div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                  Social Media
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Total Followers</div>
                    <div className="text-lg font-bold text-black">
                      {(team.socialMedia.instagramFollowers + team.socialMedia.tiktokFollowers + team.socialMedia.twitterFollowers).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Engagement Rate</div>
                    <div className="text-lg font-bold text-black">{team.socialMedia.engagementRate}%</div>
                  </div>
                </div>
                <div className="flex space-x-4 mt-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-pink-500">📷</span>
                    <span className="text-xs text-gray-600">{team.socialMedia.instagramFollowers.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-black">🎵</span>
                    <span className="text-xs text-gray-600">{team.socialMedia.tiktokFollowers.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-500">🐦</span>
                    <span className="text-xs text-gray-600">{team.socialMedia.twitterFollowers.toLocaleString()}</span>
                  </div>
                  {team.socialMedia.viralContent > 0 && (
                    <div className="flex items-center space-x-2">
                      <span style={{ color: 'var(--color-volt)' }}>🔥</span>
                      <span className="text-xs text-gray-600">{team.socialMedia.viralContent} viral</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Impact Score */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                  Impact Score
                </h4>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${team.impactScore}%`,
                          backgroundColor: team.impactScore >= 90 ? '#10B981' : 
                                          team.impactScore >= 75 ? '#F59E0B' : 
                                          team.impactScore >= 60 ? '#F97316' : '#EF4444'
                        }}
                      />
                    </div>
                  </div>
                  <span className={`text-lg font-bold ${
                    team.impactScore >= 90 ? "text-green-600" :
                    team.impactScore >= 75 ? "text-yellow-600" :
                    team.impactScore >= 60 ? "text-orange-600" :
                    "text-red-600"
                  }`}>
                    {team.impactScore}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  {team.impactActivities.length} active initiatives • {team.impactActivities.reduce((acc, activity) => acc + activity.volunteerHours, 0)} volunteer hours
                </div>
              </div>

              {/* Recent Impact Activities */}
              {team.impactActivities.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Recent Impact
                  </h4>
                  <div className="space-y-2">
                    {team.impactActivities.slice(0, 2).map((activity, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {activity.sdgGoals.map(goal => sdgGoalNames[goal]).join(", ")}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold" style={{ color: 'var(--color-volt)' }}>
                              +{activity.pointsAwarded}
                            </div>
                            <div className="text-xs text-gray-500">points</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <Link 
                  href={`/dashboard/teams/${team.id}`}
                  className="flex-1 px-4 py-2 text-center text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  View Details
                </Link>
                <button className="flex-1 px-4 py-2 text-sm font-medium text-black rounded-lg transition-colors" style={{ backgroundColor: 'var(--color-volt)' }}>
                  Update Stats
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* League Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-black uppercase tracking-wide mb-6">
          League Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-2">
              {teams.reduce((acc, team) => acc + team.socialMedia.instagramFollowers + team.socialMedia.tiktokFollowers + team.socialMedia.twitterFollowers, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Social Followers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-2">
              {teams.reduce((acc, team) => acc + team.impactActivities.reduce((acc2, activity) => acc2 + activity.volunteerHours, 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Volunteer Hours</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-2">
              {teams.reduce((acc, team) => acc + team.impactActivities.reduce((acc2, activity) => acc2 + activity.peopleImpacted, 0), 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">People Impacted</div>
          </div>
        </div>
      </div>
    </div>
  );
}