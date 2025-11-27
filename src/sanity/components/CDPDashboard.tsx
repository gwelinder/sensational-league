"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, Flex, Text, Heading, Stack, Grid, Button, Spinner } from "@sanity/ui";
import { useClient } from "sanity";

interface CDPStats {
  totalApplicants: number;
  byStatus: Record<string, number>;
  activeSegments: number;
  activeFlows: number;
  emailsSentToday: number;
  emailsOpenedToday: number;
}

interface NewsletterStats {
  totalSubscribers: number;
  activeSubscribers: number;
  unsubscribed: number;
  bySource: Record<string, number>;
  alsoApplicants: number;
}

interface DemographicStats {
  byAge: Record<string, number>;
  byCity: Record<string, number>;
  byExperience: Record<string, number>;
  byPosition: Record<string, number>;
  socialMediaActive: number;
  currentlyActive: number;
  previouslyActive: number;
}

interface RecentApplicant {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  status?: string;
  submittedAt?: string;
}

interface Segment {
  _id: string;
  name: string;
  memberCount: number;
  color?: string;
}

interface Flow {
  _id: string;
  name: string;
  active: boolean;
  stats?: {
    totalEnrolled: number;
    currentlyActive: number;
  };
}

const statusColors: Record<string, string> = {
  new: "#D4FF00",
  under_review: "#3B82F6",
  shortlisted: "#AE00FF",
  invited_trial: "#FF4400",
  trial_completed: "#00FBFF",
  selected: "#10B981",
  waitlisted: "#F59E0B",
  not_selected: "#6B7280",
  withdrawn: "#EF4444",
};

const statusLabels: Record<string, string> = {
  new: "New",
  under_review: "Under Review",
  shortlisted: "Shortlisted",
  invited_trial: "Invited to Trial",
  trial_completed: "Trial Completed",
  selected: "Selected",
  waitlisted: "Waitlisted",
  not_selected: "Not Selected",
  withdrawn: "Withdrawn",
};

const ageColors: Record<string, string> = {
  "18-24": "#00FBFF",
  "25-34": "#D4FF00",
  "35-44": "#FF4400",
  "45+": "#AE00FF",
};

const experienceColors: Record<string, string> = {
  Professional: "#AE00FF",
  International: "#D4FF00",
  National: "#FF4400",
  Amateur: "#3B82F6",
  Recreational: "#10B981",
};

const positionColors: Record<string, string> = {
  Forward: "#FF4400",
  Midfielder: "#D4FF00",
  Defender: "#10B981",
  Goalkeeper: "#3B82F6",
};

// Simple horizontal bar chart component
function HorizontalBarChart({
  data,
  colors,
  maxValue,
}: {
  data: Record<string, number>;
  colors?: Record<string, string>;
  maxValue?: number;
}) {
  const entries = Object.entries(data).filter(([, v]) => v > 0);
  const max = maxValue || Math.max(...entries.map(([, v]) => v), 1);

  if (entries.length === 0) {
    return <Text muted size={1}>No data available</Text>;
  }

  return (
    <Stack space={2}>
      {entries.map(([label, value]) => (
        <Flex key={label} align="center" gap={2}>
          <Text size={1} style={{ width: 80, flexShrink: 0 }}>
            {label}
          </Text>
          <div style={{ flex: 1, height: 20, background: "#1a1a1a", borderRadius: 4 }}>
            <div
              style={{
                width: `${(value / max) * 100}%`,
                height: "100%",
                background: colors?.[label] || "#D4FF00",
                borderRadius: 4,
                minWidth: value > 0 ? 4 : 0,
              }}
            />
          </div>
          <Text size={1} muted style={{ width: 30, textAlign: "right" }}>
            {value}
          </Text>
        </Flex>
      ))}
    </Stack>
  );
}

// Donut chart component
function DonutChart({
  data,
  colors,
  size = 120,
}: {
  data: Record<string, number>;
  colors?: Record<string, string>;
  size?: number;
}) {
  const entries = Object.entries(data).filter(([, v]) => v > 0);
  const total = entries.reduce((sum, [, v]) => sum + v, 0);

  if (total === 0) {
    return (
      <Flex align="center" justify="center" style={{ width: size, height: size }}>
        <Text muted size={1}>No data</Text>
      </Flex>
    );
  }

  const defaultColors = ["#D4FF00", "#FF4400", "#AE00FF", "#00FBFF", "#10B981", "#3B82F6"];
  let currentAngle = 0;

  const segments = entries.map(([label, value], index) => {
    const angle = (value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;

    const color = colors?.[label] || defaultColors[index % defaultColors.length];
    const x1 = 50 + 40 * Math.cos((Math.PI * startAngle) / 180);
    const y1 = 50 + 40 * Math.sin((Math.PI * startAngle) / 180);
    const x2 = 50 + 40 * Math.cos((Math.PI * (startAngle + angle)) / 180);
    const y2 = 50 + 40 * Math.sin((Math.PI * (startAngle + angle)) / 180);
    const largeArc = angle > 180 ? 1 : 0;

    return (
      <path
        key={label}
        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
        fill={color}
      />
    );
  });

  return (
    <Flex gap={3} align="center">
      <svg width={size} height={size} viewBox="0 0 100 100">
        {segments}
        <circle cx="50" cy="50" r="25" fill="#1a1a1a" />
        <text x="50" y="50" textAnchor="middle" dy=".3em" fill="white" fontSize="14" fontWeight="bold">
          {total}
        </text>
      </svg>
      <Stack space={1}>
        {entries.map(([label, value], index) => (
          <Flex key={label} align="center" gap={2}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                backgroundColor: colors?.[label] || defaultColors[index % defaultColors.length],
              }}
            />
            <Text size={0}>
              {label}: {value}
            </Text>
          </Flex>
        ))}
      </Stack>
    </Flex>
  );
}

// Percentage card component
function PercentageCard({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <Card padding={3} radius={2} style={{ borderLeft: `4px solid ${color}` }}>
      <Stack space={2}>
        <Text size={0} muted>
          {label}
        </Text>
        <Flex align="baseline" gap={1}>
          <Heading size={2}>{percentage}%</Heading>
          <Text size={0} muted>
            ({value}/{total})
          </Text>
        </Flex>
        <div style={{ height: 4, background: "#1a1a1a", borderRadius: 2 }}>
          <div
            style={{
              width: `${percentage}%`,
              height: "100%",
              background: color,
              borderRadius: 2,
            }}
          />
        </div>
      </Stack>
    </Card>
  );
}

export function CDPDashboard() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [stats, setStats] = useState<CDPStats | null>(null);
  const [newsletterStats, setNewsletterStats] = useState<NewsletterStats | null>(null);
  const [demographics, setDemographics] = useState<DemographicStats | null>(null);
  const [recentApplicants, setRecentApplicants] = useState<RecentApplicant[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [flows, setFlows] = useState<Flow[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch stats and demographics
      const [
        applicantStats,
        segmentCount,
        flowCount,
        emailStats,
        recent,
        segmentList,
        flowList,
        allApplicants,
        newsletterData,
      ] = await Promise.all([
        client.fetch(`{
          "total": count(*[_type == "draftApplicant"]),
          "new": count(*[_type == "draftApplicant" && status == "new"]),
          "under_review": count(*[_type == "draftApplicant" && status == "under_review"]),
          "shortlisted": count(*[_type == "draftApplicant" && status == "shortlisted"]),
          "invited_trial": count(*[_type == "draftApplicant" && status == "invited_trial"]),
          "trial_completed": count(*[_type == "draftApplicant" && status == "trial_completed"]),
          "selected": count(*[_type == "draftApplicant" && status == "selected"]),
          "waitlisted": count(*[_type == "draftApplicant" && status == "waitlisted"]),
          "not_selected": count(*[_type == "draftApplicant" && status == "not_selected"]),
          "withdrawn": count(*[_type == "draftApplicant" && status == "withdrawn"])
        }`),
        client.fetch(`count(*[_type == "cdpSegment" && active == true])`),
        client.fetch(`count(*[_type == "emailFlow" && active == true])`),
        client.fetch(`{
          "sent": count(*[_type == "emailEvent" && eventType == "sent" && occurredAt >= $today]),
          "opened": count(*[_type == "emailEvent" && eventType == "opened" && occurredAt >= $today])
        }`, { today: new Date().toISOString().split("T")[0] }),
        client.fetch<RecentApplicant[]>(
          `*[_type == "draftApplicant"] | order(submittedAt desc) [0...10] {
            _id, email, firstName, lastName, status, submittedAt
          }`
        ),
        client.fetch<Segment[]>(
          `*[_type == "cdpSegment" && active == true] | order(memberCount desc) [0...10] {
            _id, name, memberCount, color
          }`
        ),
        client.fetch<Flow[]>(
          `*[_type == "emailFlow"] | order(name asc) [0...6] {
            _id, name, active, stats
          }`
        ),
        // Fetch all applicant data for demographic analysis
        client.fetch<Array<{
          ageGroup?: string;
          city?: string;
          highestLevel?: string;
          preferredPositions?: string[];
          socialMediaActive?: boolean;
          currentlyActive?: boolean;
          previouslyActive?: boolean;
        }>>(
          `*[_type == "draftApplicant"] {
            ageGroup, city, highestLevel, preferredPositions, 
            socialMediaActive, currentlyActive, previouslyActive
          }`
        ),
        // Fetch newsletter subscriber stats
        client.fetch<{
          total: number;
          active: number;
          unsubscribed: number;
          alsoApplicants: number;
          subscribers: Array<{ source?: string }>;
        }>(`{
          "total": count(*[_type == "newsletterSubscriber"]),
          "active": count(*[_type == "newsletterSubscriber" && status == "active"]),
          "unsubscribed": count(*[_type == "newsletterSubscriber" && status == "unsubscribed"]),
          "alsoApplicants": count(*[_type == "newsletterSubscriber" && defined(linkedApplicant)]),
          "subscribers": *[_type == "newsletterSubscriber"]{ source }
        }`),
      ]);

      // Calculate demographic stats from raw data
      const byAge: Record<string, number> = {};
      const byCity: Record<string, number> = {};
      const byExperience: Record<string, number> = {};
      const byPosition: Record<string, number> = {
        Forward: 0,
        Midfielder: 0,
        Defender: 0,
        Goalkeeper: 0,
      };
      let socialMediaActive = 0;
      let currentlyActive = 0;
      let previouslyActive = 0;

      for (const a of allApplicants) {
        // Age groups
        if (a.ageGroup) {
          byAge[a.ageGroup] = (byAge[a.ageGroup] || 0) + 1;
        }

        // Cities - normalize Copenhagen variants
        if (a.city) {
          let normalizedCity = a.city;
          if (a.city.toLowerCase().includes("copenhagen") || a.city.toLowerCase().includes("københavn")) {
            normalizedCity = "Copenhagen";
          }
          byCity[normalizedCity] = (byCity[normalizedCity] || 0) + 1;
        }

        // Experience levels
        if (a.highestLevel) {
          byExperience[a.highestLevel] = (byExperience[a.highestLevel] || 0) + 1;
        }

        // Positions - categorize into main groups
        if (a.preferredPositions) {
          for (const pos of a.preferredPositions) {
            const posLower = pos.toLowerCase();
            if (posLower.includes("goalkeeper")) {
              byPosition.Goalkeeper++;
            } else if (posLower.includes("back") || posLower.includes("defender") || posLower.includes("sweeper")) {
              byPosition.Defender++;
            } else if (posLower.includes("midfielder") || posLower.includes("midfield")) {
              byPosition.Midfielder++;
            } else if (posLower.includes("forward") || posLower.includes("striker") || posLower.includes("winger")) {
              byPosition.Forward++;
            }
          }
        }

        if (a.socialMediaActive) socialMediaActive++;
        if (a.currentlyActive) currentlyActive++;
        if (a.previouslyActive) previouslyActive++;
      }

      // Sort cities by count and take top 5
      const sortedCities = Object.entries(byCity)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      const topCities: Record<string, number> = {};
      for (const [city, count] of sortedCities) {
        topCities[city] = count;
      }

      setStats({
        totalApplicants: applicantStats.total,
        byStatus: {
          new: applicantStats.new,
          under_review: applicantStats.under_review,
          shortlisted: applicantStats.shortlisted,
          invited_trial: applicantStats.invited_trial,
          trial_completed: applicantStats.trial_completed,
          selected: applicantStats.selected,
          waitlisted: applicantStats.waitlisted,
          not_selected: applicantStats.not_selected,
          withdrawn: applicantStats.withdrawn,
        },
        activeSegments: segmentCount,
        activeFlows: flowCount,
        emailsSentToday: emailStats.sent,
        emailsOpenedToday: emailStats.opened,
      });

      setDemographics({
        byAge,
        byCity: topCities,
        byExperience,
        byPosition,
        socialMediaActive,
        currentlyActive,
        previouslyActive,
      });

      // Process newsletter stats
      const bySource: Record<string, number> = {};
      for (const sub of newsletterData.subscribers) {
        const source = sub.source || "unknown";
        bySource[source] = (bySource[source] || 0) + 1;
      }

      setNewsletterStats({
        totalSubscribers: newsletterData.total,
        activeSubscribers: newsletterData.active,
        unsubscribed: newsletterData.unsubscribed,
        bySource,
        alsoApplicants: newsletterData.alsoApplicants,
      });

      setRecentApplicants(recent);
      setSegments(segmentList);
      setFlows(flowList);
    } catch (error) {
      console.error("Failed to fetch CDP data:", error);
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSyncSegments = async () => {
    setSyncing(true);
    try {
      const response = await fetch("/api/cdp?action=sync-segments", {
        method: "POST",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_CDP_API_KEY || "",
        },
      });
      const result = await response.json();
      if (result.success) {
        alert(`Synced ${result.data.segmentsEvaluated} segments`);
        fetchData();
      } else {
        alert(`Sync failed: ${result.error}`);
      }
    } catch {
      alert("Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <Flex padding={5} align="center" justify="center">
        <Spinner muted />
      </Flex>
    );
  }

  return (
    <Stack padding={4} space={5}>
      {/* Header */}
      <Flex justify="space-between" align="center">
        <Stack space={2}>
          <Heading size={3}>CDP Dashboard</Heading>
          <Text muted size={1}>
            Customer Data Platform Overview
          </Text>
        </Stack>
        <Flex gap={2}>
          <Button
            text="Refresh"
            tone="default"
            onClick={fetchData}
            disabled={loading}
          />
          <Button
            text={syncing ? "Syncing..." : "Sync Segments"}
            tone="primary"
            onClick={handleSyncSegments}
            disabled={syncing}
          />
        </Flex>
      </Flex>

      {/* Key Metrics */}
      <Grid columns={[1, 2, 4]} gap={3}>
        <Card padding={4} radius={2} shadow={1}>
          <Stack space={2}>
            <Text size={1} muted>
              Draft Applicants
            </Text>
            <Heading size={4}>{stats?.totalApplicants || 0}</Heading>
          </Stack>
        </Card>
        <Card padding={4} radius={2} shadow={1}>
          <Stack space={2}>
            <Text size={1} muted>
              Newsletter Subscribers
            </Text>
            <Heading size={4}>{newsletterStats?.totalSubscribers || 0}</Heading>
            <Text size={0} muted>
              {newsletterStats?.activeSubscribers || 0} active
            </Text>
          </Stack>
        </Card>
        <Card padding={4} radius={2} shadow={1}>
          <Stack space={2}>
            <Text size={1} muted>
              Active Segments
            </Text>
            <Heading size={4}>{stats?.activeSegments || 0}</Heading>
          </Stack>
        </Card>
        <Card padding={4} radius={2} shadow={1}>
          <Stack space={2}>
            <Text size={1} muted>
              Emails Today
            </Text>
            <Heading size={4}>
              {stats?.emailsSentToday || 0}
              <Text size={1} muted style={{ marginLeft: 8 }}>
                ({stats?.emailsOpenedToday || 0} opened)
              </Text>
            </Heading>
          </Stack>
        </Card>
      </Grid>

      {/* Newsletter Stats Section */}
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <Heading size={2}>Newsletter Subscribers</Heading>
          <Grid columns={[1, 2, 4]} gap={3}>
            <PercentageCard
              label="Active Subscribers"
              value={newsletterStats?.activeSubscribers || 0}
              total={newsletterStats?.totalSubscribers || 0}
              color="#10B981"
            />
            <PercentageCard
              label="Unsubscribed"
              value={newsletterStats?.unsubscribed || 0}
              total={newsletterStats?.totalSubscribers || 0}
              color="#EF4444"
            />
            <PercentageCard
              label="Also Draft Applicants"
              value={newsletterStats?.alsoApplicants || 0}
              total={newsletterStats?.totalSubscribers || 0}
              color="#AE00FF"
            />
            <Card padding={3} radius={2} tone="transparent">
              <Stack space={3}>
                <Text size={1} weight="semibold">Signup Sources</Text>
                <HorizontalBarChart data={newsletterStats?.bySource || {}} />
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Card>

      {/* Demographics Section */}
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <Heading size={2}>Player Demographics</Heading>
          <Grid columns={[1, 2, 4]} gap={4}>
            {/* Age Distribution */}
            <Card padding={3} radius={2} tone="transparent">
              <Stack space={3}>
                <Text size={1} weight="semibold">Age Distribution</Text>
                <HorizontalBarChart 
                  data={demographics?.byAge || {}} 
                  colors={ageColors}
                />
              </Stack>
            </Card>

            {/* Experience Level */}
            <Card padding={3} radius={2} tone="transparent">
              <Stack space={3}>
                <Text size={1} weight="semibold">Experience Level</Text>
                <HorizontalBarChart 
                  data={demographics?.byExperience || {}} 
                  colors={experienceColors}
                />
              </Stack>
            </Card>

            {/* Position Distribution */}
            <Card padding={3} radius={2} tone="transparent">
              <Stack space={3}>
                <Text size={1} weight="semibold">Position Preferences</Text>
                <DonutChart 
                  data={demographics?.byPosition || {}} 
                  colors={positionColors}
                />
              </Stack>
            </Card>

            {/* Top Cities */}
            <Card padding={3} radius={2} tone="transparent">
              <Stack space={3}>
                <Text size={1} weight="semibold">Top Cities</Text>
                <HorizontalBarChart data={demographics?.byCity || {}} />
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Card>

      {/* Activity & Engagement Metrics */}
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <Heading size={2}>Activity & Engagement</Heading>
          <Grid columns={[1, 3, 3]} gap={3}>
            <PercentageCard
              label="Currently Active in Club"
              value={demographics?.currentlyActive || 0}
              total={stats?.totalApplicants || 0}
              color="#10B981"
            />
            <PercentageCard
              label="Previously Active"
              value={demographics?.previouslyActive || 0}
              total={stats?.totalApplicants || 0}
              color="#F59E0B"
            />
            <PercentageCard
              label="Social Media Active"
              value={demographics?.socialMediaActive || 0}
              total={stats?.totalApplicants || 0}
              color="#FF4400"
            />
          </Grid>
        </Stack>
      </Card>

      {/* Status Breakdown */}
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <Heading size={2}>Applicants by Status</Heading>
          <Grid columns={[2, 3, 5]} gap={3}>
            {Object.entries(stats?.byStatus || {}).map(([status, count]) => (
              <Card
                key={status}
                padding={3}
                radius={2}
                style={{
                  borderLeft: `4px solid ${statusColors[status] || "#6B7280"}`,
                }}
              >
                <Stack space={1}>
                  <Text size={0} muted>
                    {statusLabels[status] || status}
                  </Text>
                  <Heading size={2}>{count}</Heading>
                </Stack>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Card>

      {/* Two Column Layout */}
      <Grid columns={[1, 1, 2]} gap={4}>
        {/* Segments */}
        <Card padding={4} radius={2} shadow={1}>
          <Stack space={4}>
            <Flex justify="space-between" align="center">
              <Heading size={2}>Top Segments</Heading>
            </Flex>
            <Stack space={2}>
              {segments.length === 0 ? (
                <Text muted>No segments created yet</Text>
              ) : (
                segments.map((segment) => (
                  <Card key={segment._id} padding={3} radius={2} tone="transparent">
                    <Flex justify="space-between" align="center">
                      <Flex align="center" gap={2}>
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: segment.color || "#D4FF00",
                          }}
                        />
                        <Text size={1} weight="medium">
                          {segment.name}
                        </Text>
                      </Flex>
                      <Text size={1} muted>
                        {segment.memberCount} members
                      </Text>
                    </Flex>
                  </Card>
                ))
              )}
            </Stack>
          </Stack>
        </Card>

        {/* Email Flows */}
        <Card padding={4} radius={2} shadow={1}>
          <Stack space={4}>
            <Heading size={2}>Email Flows</Heading>
            <Stack space={2}>
              {flows.length === 0 ? (
                <Text muted>No flows created yet</Text>
              ) : (
                flows.map((flow) => (
                  <Card key={flow._id} padding={3} radius={2} tone="transparent">
                    <Flex justify="space-between" align="center">
                      <Flex align="center" gap={2}>
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: flow.active ? "#10B981" : "#6B7280",
                          }}
                        />
                        <Text size={1} weight="medium">
                          {flow.name}
                        </Text>
                      </Flex>
                      <Text size={1} muted>
                        {flow.stats?.currentlyActive || 0} active / {flow.stats?.totalEnrolled || 0} total
                      </Text>
                    </Flex>
                  </Card>
                ))
              )}
            </Stack>
          </Stack>
        </Card>
      </Grid>

      {/* Recent Applicants */}
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <Heading size={2}>Recent Applicants</Heading>
          <Stack space={2}>
            {recentApplicants.length === 0 ? (
              <Text muted>No applicants yet</Text>
            ) : (
              recentApplicants.map((applicant) => (
                <Card key={applicant._id} padding={3} radius={2} tone="transparent">
                  <Flex justify="space-between" align="center">
                    <Stack space={1}>
                      <Text size={1} weight="medium">
                        {applicant.firstName && applicant.lastName
                          ? `${applicant.firstName} ${applicant.lastName}`
                          : applicant.email}
                      </Text>
                      <Text size={0} muted>
                        {applicant.email}
                      </Text>
                    </Stack>
                    <Flex align="center" gap={3}>
                      <Text
                        size={0}
                        style={{
                          color: statusColors[applicant.status || "new"],
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        {statusLabels[applicant.status || "new"]}
                      </Text>
                      <Text size={0} muted>
                        {applicant.submittedAt
                          ? new Date(applicant.submittedAt).toLocaleDateString()
                          : "—"}
                      </Text>
                    </Flex>
                  </Flex>
                </Card>
              ))
            )}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}

export default CDPDashboard;
