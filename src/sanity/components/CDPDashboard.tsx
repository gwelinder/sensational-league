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

export function CDPDashboard() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [stats, setStats] = useState<CDPStats | null>(null);
  const [recentApplicants, setRecentApplicants] = useState<RecentApplicant[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [flows, setFlows] = useState<Flow[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch stats
      const [
        applicantStats,
        segmentCount,
        flowCount,
        emailStats,
        recent,
        segmentList,
        flowList,
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
          `*[_type == "cdpSegment" && active == true] | order(memberCount desc) [0...8] {
            _id, name, memberCount, color
          }`
        ),
        client.fetch<Flow[]>(
          `*[_type == "emailFlow"] | order(name asc) [0...6] {
            _id, name, active, stats
          }`
        ),
      ]);

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
    } catch (error) {
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
              Total Applicants
            </Text>
            <Heading size={4}>{stats?.totalApplicants || 0}</Heading>
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
              Active Flows
            </Text>
            <Heading size={4}>{stats?.activeFlows || 0}</Heading>
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
