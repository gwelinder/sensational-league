import Link from "next/link";

interface Player {
  id: string;
  firstName: string;
  lastName: string;
  jerseyNumber: number;
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
  team: string;
  age: number;
  nationality: string;
  isCaptain: boolean;
  statistics: {
    appearances: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    minutesPlayed: number;
    cleanSheets?: number;
    saves?: number;
  };
  socialMetrics: {
    instagramFollowers: number;
    tiktokFollowers: number;
    twitterFollowers: number;
    totalFollowers: number;
    engagementRate: number;
    viralPosts: number;
  };
  impactContributions: Array<{
    activity: string;
    sdgGoals: string[];
    date: string;
    hoursContributed: number;
    pointsEarned: number;
  }>;
  achievements: Array<{
    title: string;
    category: string;
    date: string;
    description: string;
  }>;
  personalGoals: Array<{
    category: string;
    target: string;
    currentProgress: number;
    targetValue: number;
    completed: boolean;
  }>;
}

const players: Player[] = [
  {
    id: "1",
    firstName: "Maya",
    lastName: "Rodriguez",
    jerseyNumber: 10,
    position: "Midfielder",
    team: "Lightning Bolts",
    age: 24,
    nationality: "Spain",
    isCaptain: true,
    statistics: {
      appearances: 6,
      goals: 8,
      assists: 5,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 540,
    },
    socialMetrics: {
      instagramFollowers: 3200,
      tiktokFollowers: 1800,
      twitterFollowers: 950,
      totalFollowers: 5950,
      engagementRate: 7.2,
      viralPosts: 2,
    },
    impactContributions: [
      {
        activity: "Youth Football Workshop",
        sdgGoals: ["Quality Education", "Gender Equality"],
        date: "2024-10-15",
        hoursContributed: 8,
        pointsEarned: 3,
      },
    ],
    achievements: [
      {
        title: "Leading Goal Scorer",
        category: "match",
        date: "2024-10-30",
        description: "Top scorer in the league with 8 goals",
      },
      {
        title: "Team Captain",
        category: "leadership",
        date: "2024-09-01",
        description: "Appointed team captain for Lightning Bolts",
      },
    ],
    personalGoals: [
      {
        category: "match",
        target: "Score 15 goals this season",
        currentProgress: 8,
        targetValue: 15,
        completed: false,
      },
      {
        category: "social",
        target: "Reach 5K Instagram followers",
        currentProgress: 3200,
        targetValue: 5000,
        completed: false,
      },
    ],
  },
  {
    id: "2",
    firstName: "Alex",
    lastName: "Johnson",
    jerseyNumber: 9,
    position: "Forward",
    team: "Lightning Bolts",
    age: 22,
    nationality: "Canada",
    isCaptain: false,
    statistics: {
      appearances: 6,
      goals: 12,
      assists: 3,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 520,
    },
    socialMetrics: {
      instagramFollowers: 2800,
      tiktokFollowers: 4200,
      twitterFollowers: 600,
      totalFollowers: 7600,
      engagementRate: 8.5,
      viralPosts: 3,
    },
    impactContributions: [
      {
        activity: "Community Garden Project",
        sdgGoals: ["Sustainable Cities", "Climate Action"],
        date: "2024-10-22",
        hoursContributed: 6,
        pointsEarned: 2,
      },
    ],
    achievements: [
      {
        title: "Hat-trick Hero",
        category: "match",
        date: "2024-10-14",
        description: "Scored hat-trick against Thunder Strikes",
      },
      {
        title: "Social Media Star",
        category: "social",
        date: "2024-10-20",
        description: "First viral TikTok reached 100K views",
      },
    ],
    personalGoals: [
      {
        category: "match",
        target: "Score 20 goals this season",
        currentProgress: 12,
        targetValue: 20,
        completed: false,
      },
      {
        category: "social",
        target: "10K TikTok followers",
        currentProgress: 4200,
        targetValue: 10000,
        completed: false,
      },
    ],
  },
  {
    id: "3",
    firstName: "Sam",
    lastName: "Kim",
    jerseyNumber: 1,
    position: "Goalkeeper",
    team: "Lightning Bolts",
    age: 26,
    nationality: "South Korea",
    isCaptain: false,
    statistics: {
      appearances: 6,
      goals: 0,
      assists: 1,
      yellowCards: 0,
      redCards: 0,
      minutesPlayed: 540,
      cleanSheets: 3,
      saves: 28,
    },
    socialMetrics: {
      instagramFollowers: 1900,
      tiktokFollowers: 850,
      twitterFollowers: 1200,
      totalFollowers: 3950,
      engagementRate: 6.1,
      viralPosts: 1,
    },
    impactContributions: [
      {
        activity: "Mental Health Awareness",
        sdgGoals: ["Good Health and Well-being"],
        date: "2024-10-08",
        hoursContributed: 4,
        pointsEarned: 2,
      },
    ],
    achievements: [
      {
        title: "Clean Sheet King",
        category: "match",
        date: "2024-10-25",
        description: "Most clean sheets in the league",
      },
    ],
    personalGoals: [
      {
        category: "match",
        target: "5 clean sheets this season",
        currentProgress: 3,
        targetValue: 5,
        completed: false,
      },
      {
        category: "impact",
        target: "20 volunteer hours",
        currentProgress: 4,
        targetValue: 20,
        completed: false,
      },
    ],
  },
  {
    id: "4",
    firstName: "Zoe",
    lastName: "Thompson",
    jerseyNumber: 8,
    position: "Midfielder",
    team: "Phoenix Rising",
    age: 23,
    nationality: "Australia",
    isCaptain: true,
    statistics: {
      appearances: 6,
      goals: 5,
      assists: 7,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 530,
    },
    socialMetrics: {
      instagramFollowers: 2600,
      tiktokFollowers: 1400,
      twitterFollowers: 800,
      totalFollowers: 4800,
      engagementRate: 5.8,
      viralPosts: 1,
    },
    impactContributions: [
      {
        activity: "Food Bank Volunteer Drive",
        sdgGoals: ["No Poverty", "Zero Hunger"],
        date: "2024-10-18",
        hoursContributed: 12,
        pointsEarned: 4,
      },
    ],
    achievements: [
      {
        title: "Assist Leader",
        category: "match",
        date: "2024-10-28",
        description: "Most assists in the league",
      },
      {
        title: "Community Champion",
        category: "impact",
        date: "2024-10-20",
        description: "Outstanding community service contribution",
      },
    ],
    personalGoals: [
      {
        category: "match",
        target: "10 assists this season",
        currentProgress: 7,
        targetValue: 10,
        completed: false,
      },
      {
        category: "impact",
        target: "30 volunteer hours",
        currentProgress: 12,
        targetValue: 30,
        completed: false,
      },
    ],
  },
];

const topPerformers = {
  goals: players.reduce((prev, current) => (prev.statistics.goals > current.statistics.goals) ? prev : current),
  assists: players.reduce((prev, current) => (prev.statistics.assists > current.statistics.assists) ? prev : current),
  socialFollowers: players.reduce((prev, current) => (prev.socialMetrics.totalFollowers > current.socialMetrics.totalFollowers) ? prev : current),
  impactHours: players.reduce((prev, current) => {
    const prevHours = prev.impactContributions.reduce((acc, contrib) => acc + contrib.hoursContributed, 0);
    const currentHours = current.impactContributions.reduce((acc, contrib) => acc + contrib.hoursContributed, 0);
    return prevHours > currentHours ? prev : current;
  }),
};

export default function PlayersPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black uppercase tracking-wide">
            PLAYER PROFILES
          </h1>
          <p className="text-gray-600 mt-2">
            Individual stats, achievements, and impact contributions
          </p>
        </div>
        <button 
          className="px-6 py-3 text-black font-medium rounded-lg transition-colors"
          style={{ backgroundColor: 'var(--color-volt)' }}
        >
          Add New Player
        </button>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-3xl">⚽</div>
            <div className="text-right">
              <div className="text-2xl font-bold text-black">{topPerformers.goals.statistics.goals}</div>
              <div className="text-xs text-gray-500 uppercase">Goals</div>
            </div>
          </div>
          <div className="text-sm font-medium text-gray-900">{topPerformers.goals.firstName} {topPerformers.goals.lastName}</div>
          <div className="text-xs text-gray-500">{topPerformers.goals.team} • #{topPerformers.goals.jerseyNumber}</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-3xl">🎯</div>
            <div className="text-right">
              <div className="text-2xl font-bold text-black">{topPerformers.assists.statistics.assists}</div>
              <div className="text-xs text-gray-500 uppercase">Assists</div>
            </div>
          </div>
          <div className="text-sm font-medium text-gray-900">{topPerformers.assists.firstName} {topPerformers.assists.lastName}</div>
          <div className="text-xs text-gray-500">{topPerformers.assists.team} • #{topPerformers.assists.jerseyNumber}</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-3xl" style={{ color: 'var(--color-volt)' }}>📱</div>
            <div className="text-right">
              <div className="text-2xl font-bold text-black">{(topPerformers.socialFollowers.socialMetrics.totalFollowers / 1000).toFixed(1)}K</div>
              <div className="text-xs text-gray-500 uppercase">Followers</div>
            </div>
          </div>
          <div className="text-sm font-medium text-gray-900">{topPerformers.socialFollowers.firstName} {topPerformers.socialFollowers.lastName}</div>
          <div className="text-xs text-gray-500">{topPerformers.socialFollowers.team} • {topPerformers.socialFollowers.socialMetrics.engagementRate}% engagement</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-3xl text-green-600">🌍</div>
            <div className="text-right">
              <div className="text-2xl font-bold text-black">
                {topPerformers.impactHours.impactContributions.reduce((acc, contrib) => acc + contrib.hoursContributed, 0)}h
              </div>
              <div className="text-xs text-gray-500 uppercase">Impact Hours</div>
            </div>
          </div>
          <div className="text-sm font-medium text-gray-900">{topPerformers.impactHours.firstName} {topPerformers.impactHours.lastName}</div>
          <div className="text-xs text-gray-500">{topPerformers.impactHours.team} • {topPerformers.impactHours.impactContributions.length} activities</div>
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {players.map((player) => (
          <div key={player.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Player Header */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {player.firstName.charAt(0)}{player.lastName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-bold text-black">{player.firstName} {player.lastName}</h3>
                      {player.isCaptain && (
                        <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: 'var(--color-volt)', color: 'black' }}>
                          CAPTAIN
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">#{player.jerseyNumber} • {player.position}</p>
                    <p className="text-xs text-gray-500">{player.team} • {player.nationality} • Age {player.age}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Player Stats */}
            <div className="p-6 space-y-6">
              {/* Match Statistics */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                  Match Performance
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-black">{player.statistics.goals}</div>
                    <div className="text-xs text-gray-500">Goals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-black">{player.statistics.assists}</div>
                    <div className="text-xs text-gray-500">Assists</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-black">{player.statistics.appearances}</div>
                    <div className="text-xs text-gray-500">Apps</div>
                  </div>
                </div>
                {player.position === "Goalkeeper" && player.statistics.cleanSheets !== undefined && (
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{player.statistics.cleanSheets}</div>
                      <div className="text-xs text-gray-500">Clean Sheets</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{player.statistics.saves}</div>
                      <div className="text-xs text-gray-500">Saves</div>
                    </div>
                  </div>
                )}
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
                      {(player.socialMetrics.totalFollowers / 1000).toFixed(1)}K
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Engagement Rate</div>
                    <div className="text-lg font-bold text-black">{player.socialMetrics.engagementRate}%</div>
                  </div>
                </div>
                <div className="flex justify-between mt-3 text-xs text-gray-500">
                  <span>📷 {(player.socialMetrics.instagramFollowers / 1000).toFixed(1)}K</span>
                  <span>🎵 {(player.socialMetrics.tiktokFollowers / 1000).toFixed(1)}K</span>
                  <span>🐦 {(player.socialMetrics.twitterFollowers / 1000).toFixed(1)}K</span>
                  {player.socialMetrics.viralPosts > 0 && (
                    <span style={{ color: 'var(--color-volt)' }}>🔥 {player.socialMetrics.viralPosts}</span>
                  )}
                </div>
              </div>

              {/* Personal Goals */}
              {player.personalGoals.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Personal Goals
                  </h4>
                  <div className="space-y-3">
                    {player.personalGoals.slice(0, 2).map((goal, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>{goal.target}</span>
                          <span>{goal.currentProgress}/{goal.targetValue}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${Math.min((goal.currentProgress / goal.targetValue) * 100, 100)}%`,
                              backgroundColor: goal.completed ? '#10B981' : 'var(--color-volt)'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Impact Contributions */}
              {player.impactContributions.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Recent Impact
                  </h4>
                  <div className="space-y-2">
                    {player.impactContributions.slice(0, 2).map((contribution, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{contribution.activity}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {contribution.hoursContributed}h • {contribution.sdgGoals.join(", ")}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-green-600">+{contribution.pointsEarned}</div>
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
                  href={`/dashboard/players/${player.id}`}
                  className="flex-1 px-4 py-2 text-center text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  View Profile
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
          Player Statistics Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-2">
              {players.length}
            </div>
            <div className="text-sm text-gray-600">Active Players</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-2">
              {players.reduce((acc, player) => acc + player.statistics.goals, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Goals</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-2">
              {players.reduce((acc, player) => acc + player.socialMetrics.totalFollowers, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Combined Social Following</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-2">
              {players.reduce((acc, player) => acc + player.impactContributions.reduce((acc2, contrib) => acc2 + contrib.hoursContributed, 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Impact Hours</div>
          </div>
        </div>
      </div>
    </div>
  );
}