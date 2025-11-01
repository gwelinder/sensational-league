"use client";

import { useState } from "react";
import Link from "next/link";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  status: "scheduled" | "live" | "completed" | "postponed";
  score?: {
    homeGoals: number;
    awayGoals: number;
  };
  liveMinute?: number;
  socialMetrics?: {
    totalMentions: number;
    liveViewers: number;
    fanEngagementScore: number;
  };
  attendance?: number;
  weather?: {
    temperature: number;
    conditions: string;
  };
}

const matches: Match[] = [
  {
    id: "1",
    homeTeam: "Lightning Bolts",
    awayTeam: "Thunder Strikes",
    date: "2024-11-05",
    time: "19:00",
    venue: "Central Stadium",
    status: "scheduled",
    socialMetrics: {
      totalMentions: 1200,
      liveViewers: 0,
      fanEngagementScore: 78,
    },
  },
  {
    id: "2",
    homeTeam: "Phoenix Rising",
    awayTeam: "Storm Riders",
    date: "2024-11-06",
    time: "20:30",
    venue: "North Field",
    status: "live",
    score: {
      homeGoals: 1,
      awayGoals: 2,
    },
    liveMinute: 67,
    socialMetrics: {
      totalMentions: 3500,
      liveViewers: 2800,
      fanEngagementScore: 92,
    },
    attendance: 1150,
    weather: {
      temperature: 18,
      conditions: "Clear",
    },
  },
  {
    id: "3",
    homeTeam: "Spark United",
    awayTeam: "Velocity FC",
    date: "2024-11-07",
    time: "18:00",
    venue: "South Complex",
    status: "scheduled",
    socialMetrics: {
      totalMentions: 890,
      liveViewers: 0,
      fanEngagementScore: 65,
    },
  },
  {
    id: "4",
    homeTeam: "Storm Riders",
    awayTeam: "Lightning Bolts",
    date: "2024-10-28",
    time: "19:30",
    venue: "Thunderdome Stadium",
    status: "completed",
    score: {
      homeGoals: 1,
      awayGoals: 3,
    },
    socialMetrics: {
      totalMentions: 4200,
      liveViewers: 3200,
      fanEngagementScore: 95,
    },
    attendance: 1400,
    weather: {
      temperature: 22,
      conditions: "Sunny",
    },
  },
  {
    id: "5",
    homeTeam: "Phoenix Rising",
    awayTeam: "Lightning Bolts",
    date: "2024-10-21",
    time: "20:00",
    venue: "North Field",
    status: "completed",
    score: {
      homeGoals: 2,
      awayGoals: 2,
    },
    socialMetrics: {
      totalMentions: 3800,
      liveViewers: 2900,
      fanEngagementScore: 88,
    },
    attendance: 1100,
    weather: {
      temperature: 15,
      conditions: "Cloudy",
    },
  },
];

const viralMoments = [
  {
    id: "1",
    matchId: "2",
    minute: 45,
    description: "Spectacular bicycle kick goal by Storm Riders",
    platform: "TikTok",
    engagement: 89000,
    trend: "up",
  },
  {
    id: "2",
    matchId: "2",
    minute: 63,
    description: "Phoenix Rising goalkeeper amazing double save",
    platform: "Instagram",
    engagement: 45000,
    trend: "up",
  },
  {
    id: "3",
    matchId: "4",
    minute: 78,
    description: "Lightning Bolts team celebration dance",
    platform: "TikTok",
    engagement: 156000,
    trend: "viral",
  },
];

export default function MatchesPage() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "scheduled" | "live" | "completed">("all");
  const [showViralMoments, setShowViralMoments] = useState(false);

  const filteredMatches = matches.filter(match => 
    selectedFilter === "all" || match.status === selectedFilter
  );

  const liveMatches = matches.filter(match => match.status === "live");
  const scheduledMatches = matches.filter(match => match.status === "scheduled");
  const completedMatches = matches.filter(match => match.status === "completed");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black uppercase tracking-wide">
            MATCH CENTER
          </h1>
          <p className="text-gray-600 mt-2">
            Live match tracking, results entry, and social media monitoring
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowViralMoments(!showViralMoments)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              showViralMoments 
                ? 'text-black' 
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            }`}
            style={showViralMoments ? { backgroundColor: 'var(--color-volt)' } : {}}
          >
            {showViralMoments ? 'Hide' : 'Show'} Viral Moments
          </button>
          <button 
            className="px-4 py-2 text-sm font-medium text-black rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--color-volt)' }}
          >
            Schedule Match
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Live Matches</p>
              <p className="text-3xl font-bold text-red-600">{liveMatches.length}</p>
            </div>
            <div className="text-3xl text-red-600">🔴</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Currently in progress</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Upcoming</p>
              <p className="text-3xl font-bold text-blue-600">{scheduledMatches.length}</p>
            </div>
            <div className="text-3xl text-blue-600">📅</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Scheduled matches</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Live Viewers</p>
              <p className="text-3xl font-bold text-black">
                {liveMatches.reduce((acc, match) => acc + (match.socialMetrics?.liveViewers || 0), 0).toLocaleString()}
              </p>
            </div>
            <div className="text-3xl" style={{ color: 'var(--color-volt)' }}>👁️</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Across all live matches</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Viral Moments</p>
              <p className="text-3xl font-bold text-black">{viralMoments.length}</p>
            </div>
            <div className="text-3xl" style={{ color: 'var(--color-volt)' }}>🔥</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">This match day</p>
        </div>
      </div>

      {/* Viral Moments Panel */}
      {showViralMoments && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-black uppercase tracking-wide">
              VIRAL MOMENTS
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {viralMoments.map((moment) => (
                <div key={moment.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-2xl ${
                      moment.trend === 'viral' ? 'animate-pulse' : ''
                    }`} style={{ color: 'var(--color-volt)' }}>
                      🔥
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      moment.trend === 'viral' ? 'bg-red-100 text-red-800' :
                      moment.trend === 'up' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {moment.engagement.toLocaleString()} views
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {moment.description}
                  </div>
                  <div className="text-xs text-gray-500">
                    {moment.minute}' • {moment.platform}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Match Filters */}
      <div className="flex space-x-4">
        {(["all", "live", "scheduled", "completed"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedFilter === filter
                ? 'text-black'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            }`}
            style={selectedFilter === filter ? { backgroundColor: 'var(--color-volt)' } : {}}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
            {filter !== "all" && (
              <span className="ml-2 text-xs opacity-75">
                ({filter === "live" ? liveMatches.length : 
                  filter === "scheduled" ? scheduledMatches.length : 
                  completedMatches.length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredMatches.map((match) => (
          <div key={match.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className={`px-6 py-4 ${
              match.status === "live" ? "bg-red-50 border-b-2 border-red-200" :
              match.status === "scheduled" ? "bg-blue-50 border-b-2 border-blue-200" :
              "bg-gray-50 border-b border-gray-200"
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    match.status === "live" ? "bg-red-100 text-red-800" :
                    match.status === "scheduled" ? "bg-blue-100 text-blue-800" :
                    match.status === "completed" ? "bg-green-100 text-green-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {match.status === "live" && "🔴 "}{match.status.toUpperCase()}
                    {match.status === "live" && match.liveMinute && ` • ${match.liveMinute}'`}
                  </span>
                  <div className="text-sm text-gray-600">
                    {new Date(match.date).toLocaleDateString()} at {match.time}
                  </div>
                  <div className="text-sm text-gray-600">
                    📍 {match.venue}
                  </div>
                  {match.weather && (
                    <div className="text-sm text-gray-600">
                      🌡️ {match.weather.temperature}°C {match.weather.conditions}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Link 
                    href={`/dashboard/matches/${match.id}`}
                    className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </Link>
                  {match.status === "scheduled" && (
                    <button className="px-3 py-1 text-xs font-medium text-black rounded transition-colors" style={{ backgroundColor: 'var(--color-volt)' }}>
                      Start Match
                    </button>
                  )}
                  {match.status === "live" && (
                    <button className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-colors">
                      Live Updates
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Match Score */}
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-center space-x-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-black mb-2">{match.homeTeam}</div>
                      <div className="text-sm text-gray-600">HOME</div>
                    </div>
                    <div className="text-center">
                      {match.score ? (
                        <div className="text-4xl font-bold text-black">
                          {match.score.homeGoals} - {match.score.awayGoals}
                        </div>
                      ) : (
                        <div className="text-2xl text-gray-400">vs</div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-black mb-2">{match.awayTeam}</div>
                      <div className="text-sm text-gray-600">AWAY</div>
                    </div>
                  </div>
                </div>

                {/* Social Metrics */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Social Metrics
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Mentions</span>
                      <span className="text-xs font-medium text-gray-900">
                        {match.socialMetrics?.totalMentions.toLocaleString()}
                      </span>
                    </div>
                    {match.socialMetrics?.liveViewers ? (
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-600">Live Viewers</span>
                        <span className="text-xs font-medium text-red-600">
                          {match.socialMetrics.liveViewers.toLocaleString()}
                        </span>
                      </div>
                    ) : null}
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Engagement Score</span>
                      <span className={`text-xs font-medium ${
                        (match.socialMetrics?.fanEngagementScore || 0) >= 90 ? "text-green-600" :
                        (match.socialMetrics?.fanEngagementScore || 0) >= 75 ? "text-yellow-600" :
                        "text-gray-900"
                      }`}>
                        {match.socialMetrics?.fanEngagementScore}/100
                      </span>
                    </div>
                    {match.attendance && (
                      <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="text-xs text-gray-600">Attendance</span>
                        <span className="text-xs font-medium text-gray-900">
                          {match.attendance.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMatches.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚽</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
          <p className="text-gray-600">Try adjusting your filter or check back later for updates.</p>
        </div>
      )}
    </div>
  );
}