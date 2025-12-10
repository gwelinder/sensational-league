import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  {
    name: "Season Overview",
    href: "/dashboard",
    icon: "🏆",
    description: "Current season standings and overview"
  },
  {
    name: "Teams",
    href: "/dashboard/teams",
    icon: "👥",
    description: "Team management and profiles"
  },
  {
    name: "Players",
    href: "/dashboard/players",
    icon: "⚽",
    description: "Player profiles and statistics"
  },
  {
    name: "Matches",
    href: "/dashboard/matches",
    icon: "📅",
    description: "Match center and live tracking"
  },
  {
    name: "Points System",
    href: "/dashboard/points",
    icon: "📊",
    description: "Multi-metric scoring analytics"
  },
  {
    name: "Social Media",
    href: "/dashboard/social",
    icon: "📱",
    description: "Social media tracking and rewards"
  },
  {
    name: "Impact Tracking",
    href: "/dashboard/impact",
    icon: "🌍",
    description: "UN SDG goals and community activities"
  },
  {
    name: "Admin Panel",
    href: "/dashboard/admin",
    icon: "⚙️",
    description: "League administration and content management"
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white border-b-4" style={{ borderColor: 'var(--color-volt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="font-bold text-xl" style={{ color: 'var(--color-volt)' }}>
                SENSATIONAL LEAGUE
              </Link>
              <div className="hidden md:block">
                <span className="text-sm text-gray-300">League Management Dashboard</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-300">
                Season 2024 • ACTIVE
              </div>
              <div className="w-8 h-8 text-black rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: 'var(--color-volt)' }}>
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <nav className="space-y-1 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
                DASHBOARD
              </h2>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-start p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 border border-transparent hover:border-gray-200"
                >
                  <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover:text-black">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {item.description}
                    </div>
                  </div>
                </Link>
              ))}
            </nav>

            {/* Quick Stats Sidebar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">
                QUICK STATS
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-black">8</div>
                  <div className="text-xs text-gray-500 uppercase">Active Teams</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-black">120</div>
                  <div className="text-xs text-gray-500 uppercase">Total Players</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-black">24</div>
                  <div className="text-xs text-gray-500 uppercase">Matches Played</div>
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--color-volt)' }}>1.2M</div>
                  <div className="text-xs text-gray-500 uppercase">Social Media Reach</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">17</div>
                  <div className="text-xs text-gray-500 uppercase">SDG Goals Active</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <main>
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}