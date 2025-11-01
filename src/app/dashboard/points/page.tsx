"use client";

import { useState } from "react";

interface TeamPoints {
  teamName: string;
  matchPoints: number;
  socialMediaPoints: number;
  impactPoints: number;
  bonusPoints: number;
  totalPoints: number;
  breakdown: {
    wins: number;
    draws: number;
    losses: number;
    socialMilestones: number;
    viralContent: number;
    impactActivities: number;
    communityEngagement: number;
  };
}

const teamPointsData: TeamPoints[] = [
  {
    teamName: "Lightning Bolts",
    matchPoints: 16,
    socialMediaPoints: 5,
    impactPoints: 3,
    bonusPoints: 8,
    totalPoints: 24,
    breakdown: {
      wins: 5,
      draws: 1,
      losses: 0,
      socialMilestones: 3,
      viralContent: 3,
      impactActivities: 2,
      communityEngagement: 1,
    },
  },
  {
    teamName: "Phoenix Rising",
    matchPoints: 14,
    socialMediaPoints: 3,
    impactPoints: 3,
    bonusPoints: 6,
    totalPoints: 20,
    breakdown: {
      wins: 4,
      draws: 2,
      losses: 0,
      socialMilestones: 2,
      viralContent: 2,
      impactActivities: 1,
      communityEngagement: 2,
    },
  },
  {
    teamName: "Storm Riders",
    matchPoints: 12,
    socialMediaPoints: 4,
    impactPoints: 3,
    bonusPoints: 7,
    totalPoints: 19,
    breakdown: {
      wins: 4,
      draws: 0,
      losses: 2,
      socialMilestones: 2,
      viralContent: 4,
      impactActivities: 2,
      communityEngagement: 1,
    },
  },
];

const pointsSystem = {
  match: {
    win: 3,
    draw: 1,
    loss: 0,
  },
  social: {
    milestone: 1, // Per 1K followers gained
    viral: 2, // Per viral post (>50K engagement)
    engagement: 1, // Per 5% engagement rate increase
  },
  impact: {
    activity: 2, // Per impact activity
    hours: 0.1, // Per volunteer hour
    sdgGoal: 1, // Per UN SDG goal addressed
  },
  community: {
    attendance: 0.001, // Per person in attendance
    fanEvent: 3, // Per fan engagement event
    partnership: 5, // Per community partnership
  },
};

const upcomingMilestones = [
  {
    team: "Lightning Bolts",
    type: "Social Media",
    milestone: "10K Instagram Followers",
    current: 8500,
    target: 10000,
    points: 2,
    daysLeft: 7,
  },
  {
    team: "Phoenix Rising",
    type: "Impact",
    milestone: "100 Volunteer Hours",
    current: 85,
    target: 100,
    points: 5,
    daysLeft: 14,
  },
  {
    team: "Storm Riders",
    type: "Community",
    milestone: "5 Viral Videos",
    current: 4,
    target: 5,
    points: 3,
    daysLeft: 21,
  },
];

const recentPointsActivity = [
  {
    team: "Lightning Bolts",
    activity: "Victory vs Thunder Strikes",
    points: 3,
    category: "Match",
    timestamp: "2 hours ago",
  },
  {
    team: "Storm Riders",
    activity: "Viral Goal Celebration",
    points: 2,
    category: "Social",
    timestamp: "4 hours ago",
  },
  {
    team: "Phoenix Rising",
    activity: "Food Bank Volunteer Drive",
    points: 2,
    category: "Impact",
    timestamp: "1 day ago",
  },
  {
    team: "Lightning Bolts",
    activity: "Youth Workshop Event",
    points: 2,
    category: "Impact",
    timestamp: "2 days ago",
  },
  {
    team: "Storm Riders",
    activity: "Beach Cleanup Initiative",
    points: 2,
    category: "Impact",
    timestamp: "3 days ago",
  },
];

export default function PointsSystemPage() {
  const [selectedView, setSelectedView] = useState<"overview" | "breakdown" | "milestones">("overview");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const totalPoints = teamPointsData.reduce((acc, team) => acc + team.totalPoints, 0);
  const totalMatchPoints = teamPointsData.reduce((acc, team) => acc + team.matchPoints, 0);
  const totalBonusPoints = teamPointsData.reduce((acc, team) => acc + team.bonusPoints, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black uppercase tracking-wide">
            POINTS SYSTEM DASHBOARD
          </h1>
          <p className="text-gray-600 mt-2">
            Multi-metric scoring: Match results + Social impact + Community engagement
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Export Report
          </button>
          <button 
            className="px-4 py-2 text-sm font-medium text-black rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--color-volt)' }}
          >
            Adjust Points System
          </button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Points</p>
              <p className="text-3xl font-bold text-black">{totalPoints}</p>
            </div>
            <div className="text-3xl" style={{ color: 'var(--color-volt)' }}>🏆</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Across all teams</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Match Points</p>
              <p className="text-3xl font-bold text-black">{totalMatchPoints}</p>
            </div>
            <div className="text-3xl">⚽</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{((totalMatchPoints / totalPoints) * 100).toFixed(1)}% of total</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Bonus Points</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--color-volt)' }}>{totalBonusPoints}</p>
            </div>
            <div className="text-3xl" style={{ color: 'var(--color-volt)' }}>✨</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{((totalBonusPoints / totalPoints) * 100).toFixed(1)}% of total</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Active Milestones</p>
              <p className="text-3xl font-bold text-black">{upcomingMilestones.length}</p>
            </div>
            <div className="text-3xl">🎯</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">In progress</p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-4">
        {(["overview", "breakdown", "milestones"] as const).map((view) => (
          <button
            key={view}
            onClick={() => setSelectedView(view)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedView === view
                ? 'text-black'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            }`}
            style={selectedView === view ? { backgroundColor: 'var(--color-volt)' } : {}}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>

      {/* Points System Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-black uppercase tracking-wide">
            CURRENT POINTS SYSTEM
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Match Points */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
                Match Performance
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Win</span>
                  <span className="text-sm font-medium text-green-600">+{pointsSystem.match.win} points</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Draw</span>
                  <span className="text-sm font-medium text-yellow-600">+{pointsSystem.match.draw} point</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Loss</span>
                  <span className="text-sm font-medium text-gray-600">{pointsSystem.match.loss} points</span>
                </div>
              </div>
            </div>

            {/* Social Media Points */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
                Social Media
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">1K Followers</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-volt)' }}>+{pointsSystem.social.milestone} point</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Viral Post</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-volt)' }}>+{pointsSystem.social.viral} points</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Engagement +5%</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-volt)' }}>+{pointsSystem.social.engagement} point</span>
                </div>
              </div>
            </div>

            {/* Impact Points */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
                Social Impact
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Impact Activity</span>
                  <span className="text-sm font-medium text-green-600">+{pointsSystem.impact.activity} points</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Volunteer Hour</span>
                  <span className="text-sm font-medium text-green-600">+{pointsSystem.impact.hours} point</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">SDG Goal</span>
                  <span className="text-sm font-medium text-green-600">+{pointsSystem.impact.sdgGoal} point</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedView === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Points Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-black uppercase tracking-wide">
                TEAM POINTS BREAKDOWN
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {teamPointsData.map((team, index) => (
                  <div 
                    key={team.teamName} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedTeam === team.teamName ? 'border-gray-400 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTeam(selectedTeam === team.teamName ? null : team.teamName)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className={`text-lg font-bold ${
                          index === 0 ? 'text-yellow-600' : 
                          index === 1 ? 'text-gray-500' : 
                          index === 2 ? 'text-orange-600' : 'text-gray-600'
                        }`}>
                          #{index + 1}
                        </span>
                        <h3 className="text-lg font-medium text-gray-900">{team.teamName}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-black">{team.totalPoints}</div>
                        <div className="text-xs text-gray-500">total points</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900">{team.matchPoints}</div>
                        <div className="text-xs text-gray-500">Match</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium" style={{ color: 'var(--color-volt)' }}>{team.socialMediaPoints}</div>
                        <div className="text-xs text-gray-500">Social</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-green-600">{team.impactPoints}</div>
                        <div className="text-xs text-gray-500">Impact</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-purple-600">{team.bonusPoints}</div>
                        <div className="text-xs text-gray-500">Bonus</div>
                      </div>
                    </div>

                    {selectedTeam === team.teamName && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <div className="text-gray-500 mb-1">Match Record</div>
                            <div className="text-gray-900">{team.breakdown.wins}W-{team.breakdown.draws}D-{team.breakdown.losses}L</div>
                          </div>
                          <div>
                            <div className="text-gray-500 mb-1">Social Milestones</div>
                            <div className="text-gray-900">{team.breakdown.socialMilestones} achieved</div>
                          </div>
                          <div>
                            <div className="text-gray-500 mb-1">Viral Content</div>
                            <div className="text-gray-900">{team.breakdown.viralContent} posts</div>
                          </div>
                          <div>
                            <div className="text-gray-500 mb-1">Impact Activities</div>
                            <div className="text-gray-900">{team.breakdown.impactActivities} completed</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-black uppercase tracking-wide">
                RECENT POINTS ACTIVITY
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentPointsActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{activity.activity}</div>
                      <div className="text-xs text-gray-500">{activity.team} • {activity.timestamp}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${
                        activity.category === 'Match' ? 'text-blue-600' :
                        activity.category === 'Social' ? 'text-purple-600' :
                        activity.category === 'Impact' ? 'text-green-600' :
                        'text-gray-600'
                      }`}>
                        +{activity.points}
                      </div>
                      <div className="text-xs text-gray-500">{activity.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === "milestones" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-black uppercase tracking-wide">
              UPCOMING MILESTONES
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingMilestones.map((milestone, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900">{milestone.team}</h3>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {milestone.daysLeft} days left
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="text-lg font-medium text-black">{milestone.milestone}</div>
                    <div className="text-xs text-gray-500 mt-1">{milestone.type}</div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{milestone.current.toLocaleString()}</span>
                      <span>{milestone.target.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(milestone.current / milestone.target) * 100}%`,
                          backgroundColor: 'var(--color-volt)'
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {((milestone.current / milestone.target) * 100).toFixed(1)}% complete
                    </span>
                    <span className="text-sm font-bold" style={{ color: 'var(--color-volt)' }}>
                      +{milestone.points} points
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}