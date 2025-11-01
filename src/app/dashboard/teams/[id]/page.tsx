import Link from "next/link";

interface TeamDetailPageProps {
  params: {
    id: string;
  };
}

// Mock data for demonstration - would normally come from Sanity
const teamData = {
  "1": {
    id: "1",
    name: "Lightning Bolts",
    description: "A dynamic team focused on speed, precision, and community impact. Founded in 2023, Lightning Bolts has quickly become a fan favorite with their aggressive playstyle and dedication to social causes.",
    foundedYear: 2023,
    colors: {
      primary: "#FFD700",
      secondary: "#1E90FF",
    },
    homeVenue: "Thunderdome Stadium",
    manager: {
      name: "Sarah Chen",
      email: "sarah.chen@lightningbolts.com",
      phone: "+1 (555) 123-4567",
      bio: "Former professional player with 10 years of coaching experience. Passionate about developing young talent and community engagement.",
    },
    captain: {
      name: "Maya Rodriguez",
      jerseyNumber: 10,
      position: "Midfielder",
      age: 24,
      nationality: "Spain",
    },
    players: [
      { name: "Maya Rodriguez", position: "Midfielder", jerseyNumber: 10, goals: 8, assists: 5 },
      { name: "Alex Johnson", position: "Forward", jerseyNumber: 9, goals: 12, assists: 3 },
      { name: "Sam Kim", position: "Goalkeeper", jerseyNumber: 1, goals: 0, assists: 1 },
      { name: "Jordan Davis", position: "Defender", jerseyNumber: 4, goals: 2, assists: 4 },
      { name: "Riley Torres", position: "Forward", jerseyNumber: 11, goals: 7, assists: 6 },
      { name: "Casey Wang", position: "Midfielder", jerseyNumber: 8, goals: 4, assists: 8 },
      { name: "Morgan Lee", position: "Defender", jerseyNumber: 3, goals: 1, assists: 2 },
      { name: "Avery Brown", position: "Midfielder", jerseyNumber: 6, goals: 3, assists: 7 },
    ],
    socialMedia: {
      instagram: "lightningbolts_fc",
      tiktok: "lightningbolts",
      twitter: "lightningbolts",
      youtube: "https://youtube.com/lightningbolts",
      instagramFollowers: 8500,
      tiktokFollowers: 2800,
      twitterFollowers: 1200,
      youtubeSubscribers: 950,
      engagementRate: 6.8,
      viralContent: 3,
      lastUpdated: "2024-11-01T10:30:00Z",
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
      cleanSheets: 3,
      yellowCards: 4,
      redCards: 0,
    },
    impactScore: 95,
    impactActivities: [
      {
        title: "Youth Football Workshop",
        description: "Free football training sessions for underprivileged youth in the community",
        sdgGoals: ["Quality Education", "Gender Equality"],
        date: "2024-10-15",
        volunteerHours: 24,
        peopleImpacted: 45,
        pointsAwarded: 5,
        media: [],
      },
      {
        title: "Community Garden Project",
        description: "Creating sustainable community gardens in urban areas",
        sdgGoals: ["Sustainable Cities", "Climate Action"],
        date: "2024-10-22",
        volunteerHours: 18,
        peopleImpacted: 30,
        pointsAwarded: 3,
        media: [],
      },
      {
        title: "Mental Health Awareness",
        description: "Workshops and support groups for mental health awareness",
        sdgGoals: ["Good Health and Well-being"],
        date: "2024-10-08",
        volunteerHours: 16,
        peopleImpacted: 80,
        pointsAwarded: 4,
        media: [],
      },
    ],
    achievements: [
      {
        title: "Unbeaten Streak",
        category: "match",
        date: "2024-10-30",
        description: "6 matches without a loss - a new team record",
      },
      {
        title: "Top Social Engagement",
        category: "social",
        date: "2024-10-25",
        description: "Highest engagement rate in league at 6.8%",
      },
      {
        title: "Community Impact Leader",
        category: "impact",
        date: "2024-10-20",
        description: "Most volunteer hours contributed this season",
      },
    ],
    recentMatches: [
      {
        date: "2024-10-28",
        opponent: "Storm Riders",
        result: "W 3-1",
        venue: "Home",
        attendance: 1250,
      },
      {
        date: "2024-10-21",
        opponent: "Phoenix Rising",
        result: "D 2-2",
        venue: "Away",
        attendance: 1100,
      },
      {
        date: "2024-10-14",
        opponent: "Thunder Strikes",
        result: "W 4-0",
        venue: "Home",
        attendance: 1400,
      },
    ],
  },
};

export default function TeamDetailPage({ params }: TeamDetailPageProps) {
  const team = teamData[params.id as keyof typeof teamData];

  if (!team) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Team Not Found</h1>
        <p className="text-gray-600 mt-2">The team you're looking for doesn't exist.</p>
        <Link href="/dashboard/teams" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          Back to Teams
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/teams" className="text-gray-500 hover:text-gray-700">
            ← Back to Teams
          </Link>
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: team.colors.primary }}
          >
            {team.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black uppercase tracking-wide">
              {team.name}
            </h1>
            <p className="text-gray-600 mt-1">
              Founded {team.foundedYear} • {team.homeVenue}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Edit Team
          </button>
          <button 
            className="px-4 py-2 text-sm font-medium text-black rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--color-volt)' }}
          >
            Update Stats
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">League Position</p>
              <p className="text-3xl font-bold text-black">1st</p>
            </div>
            <div className="text-3xl" style={{ color: 'var(--color-volt)' }}>🏆</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">24 total points</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Goals Scored</p>
              <p className="text-3xl font-bold text-black">{team.statistics.goalsFor}</p>
            </div>
            <div className="text-3xl" style={{ color: 'var(--color-volt)' }}>⚽</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">+{team.statistics.goalsFor - team.statistics.goalsAgainst} goal difference</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Social Reach</p>
              <p className="text-3xl font-bold text-black">
                {(team.socialMedia.instagramFollowers + team.socialMedia.tiktokFollowers + team.socialMedia.twitterFollowers + team.socialMedia.youtubeSubscribers).toLocaleString()}
              </p>
            </div>
            <div className="text-3xl" style={{ color: 'var(--color-volt)' }}>📱</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{team.socialMedia.engagementRate}% engagement rate</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Impact Score</p>
              <p className="text-3xl font-bold text-black">{team.impactScore}</p>
            </div>
            <div className="text-3xl" style={{ color: 'var(--color-volt)' }}>🌍</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {team.impactActivities.reduce((acc, activity) => acc + activity.volunteerHours, 0)} volunteer hours
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Team Information */}
        <div className="lg:col-span-2 space-y-8">
          {/* Squad */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-black uppercase tracking-wide">
                SQUAD
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {team.players.map((player, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: team.colors.secondary }}
                    >
                      {player.jerseyNumber}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{player.name}</div>
                      <div className="text-xs text-gray-500">{player.position}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{player.goals}G</div>
                      <div className="text-xs text-gray-500">{player.assists}A</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Matches */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-black uppercase tracking-wide">
                RECENT MATCHES
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {team.recentMatches.map((match, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">{new Date(match.date).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">{match.venue}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">vs {match.opponent}</div>
                        <div className="text-xs text-gray-500">{match.attendance} attendance</div>
                      </div>
                    </div>
                    <div className={`text-sm font-bold px-3 py-1 rounded-full ${
                      match.result.startsWith('W') ? 'bg-green-100 text-green-800' :
                      match.result.startsWith('D') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {match.result}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Impact Activities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-black uppercase tracking-wide">
                IMPACT ACTIVITIES
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {team.impactActivities.map((activity, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {activity.sdgGoals.map((goal, goalIndex) => (
                            <span 
                              key={goalIndex}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                            >
                              {goal}
                            </span>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3 text-xs text-gray-500">
                          <div>
                            <span className="font-medium">{activity.volunteerHours}</span> hours
                          </div>
                          <div>
                            <span className="font-medium">{activity.peopleImpacted}</span> people impacted
                          </div>
                          <div>
                            <span className="font-medium">{new Date(activity.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-lg font-bold" style={{ color: 'var(--color-volt)' }}>
                          +{activity.pointsAwarded}
                        </div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Team Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-black uppercase tracking-wide">
                MANAGEMENT
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-900">Team Manager</div>
                <div className="text-sm text-gray-600">{team.manager.name}</div>
                <div className="text-xs text-gray-500">{team.manager.email}</div>
                <div className="text-xs text-gray-500">{team.manager.phone}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Team Captain</div>
                <div className="text-sm text-gray-600">{team.captain.name} (#{team.captain.jerseyNumber})</div>
                <div className="text-xs text-gray-500">{team.captain.position} • {team.captain.nationality}</div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-black uppercase tracking-wide">
                SOCIAL MEDIA
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-black">{team.socialMedia.instagramFollowers.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Instagram</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-black">{team.socialMedia.tiktokFollowers.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">TikTok</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-black">{team.socialMedia.twitterFollowers.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Twitter</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-black">{team.socialMedia.youtubeSubscribers.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">YouTube</div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-lg font-bold" style={{ color: 'var(--color-volt)' }}>
                    {team.socialMedia.engagementRate}%
                  </div>
                  <div className="text-xs text-gray-500">Engagement Rate</div>
                </div>
                {team.socialMedia.viralContent > 0 && (
                  <div className="text-center mt-2">
                    <div className="text-lg font-bold" style={{ color: 'var(--color-volt)' }}>
                      {team.socialMedia.viralContent}
                    </div>
                    <div className="text-xs text-gray-500">Viral Posts</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-black uppercase tracking-wide">
                ACHIEVEMENTS
              </h3>
            </div>
            <div className="p-6 space-y-3">
              {team.achievements.map((achievement, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">
                      {achievement.category === 'match' ? '🏆' : 
                       achievement.category === 'social' ? '📱' : '🌍'}
                    </span>
                    <div className="text-sm font-medium text-gray-900">{achievement.title}</div>
                  </div>
                  <div className="text-xs text-gray-600">{achievement.description}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(achievement.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}