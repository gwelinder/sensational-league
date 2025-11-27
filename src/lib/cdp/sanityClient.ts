/**
 * CDP Sanity Client - Handles all Sanity operations for CDP
 */

import { createClient, type SanityClient } from "@sanity/client";
import type {
  DraftApplicant,
  CDPSegment,
  EmailFlow,
  EmailEvent,
  ApplicantStatus,
} from "./types";

// Create a client with write access for CDP operations
const cdpClient: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// === APPLICANT OPERATIONS ===

export async function createDraftApplicant(
  data: Omit<DraftApplicant, "_id" | "_type">
): Promise<DraftApplicant> {
  const doc = {
    _type: "draftApplicant" as const,
    ...data,
    status: data.status || "new",
    emailEngagement: data.emailEngagement || {
      emailsSent: 0,
      emailsOpened: 0,
      emailsClicked: 0,
      unsubscribed: false,
    },
    lastSyncedAt: new Date().toISOString(),
  };

  return cdpClient.create(doc);
}

export async function updateDraftApplicant(
  id: string,
  data: Partial<DraftApplicant>
): Promise<DraftApplicant> {
  return cdpClient.patch(id).set(data).commit();
}

export async function getDraftApplicantByEmail(
  email: string
): Promise<DraftApplicant | null> {
  return cdpClient.fetch(
    `*[_type == "draftApplicant" && email == $email][0]`,
    { email }
  );
}

export async function getDraftApplicantBySharePointId(
  sharePointId: string
): Promise<DraftApplicant | null> {
  return cdpClient.fetch(
    `*[_type == "draftApplicant" && sharePointId == $sharePointId][0]`,
    { sharePointId }
  );
}

export async function getAllDraftApplicants(): Promise<DraftApplicant[]> {
  return cdpClient.fetch(`*[_type == "draftApplicant"] | order(submittedAt desc)`);
}

export async function getDraftApplicantsByStatus(
  status: ApplicantStatus
): Promise<DraftApplicant[]> {
  return cdpClient.fetch(
    `*[_type == "draftApplicant" && status == $status] | order(submittedAt desc)`,
    { status }
  );
}

export async function getDraftApplicantsBySegment(
  segmentId: string
): Promise<DraftApplicant[]> {
  return cdpClient.fetch(
    `*[_type == "draftApplicant" && $segmentId in segments[]._ref] | order(submittedAt desc)`,
    { segmentId }
  );
}

export async function updateApplicantSegments(
  applicantId: string,
  segmentIds: string[]
): Promise<void> {
  const segments = segmentIds.map((id) => ({
    _type: "reference",
    _ref: id,
    _key: id,
  }));
  await cdpClient.patch(applicantId).set({ segments }).commit();
}

export async function updateApplicantEmailEngagement(
  applicantId: string,
  updates: Partial<DraftApplicant["emailEngagement"]>
): Promise<void> {
  const applicant = await cdpClient.fetch<DraftApplicant>(
    `*[_type == "draftApplicant" && _id == $id][0]`,
    { id: applicantId }
  );

  if (applicant) {
    const currentEngagement = applicant.emailEngagement || {
      emailsSent: 0,
      emailsOpened: 0,
      emailsClicked: 0,
      unsubscribed: false,
    };

    await cdpClient
      .patch(applicantId)
      .set({
        emailEngagement: { ...currentEngagement, ...updates },
      })
      .commit();
  }
}

// === SEGMENT OPERATIONS ===

export async function getSegment(id: string): Promise<CDPSegment | null> {
  return cdpClient.fetch(`*[_type == "cdpSegment" && _id == $id][0]`, { id });
}

export async function getSegmentBySlug(slug: string): Promise<CDPSegment | null> {
  return cdpClient.fetch(
    `*[_type == "cdpSegment" && slug.current == $slug][0]`,
    { slug }
  );
}

export async function getAllActiveSegments(): Promise<CDPSegment[]> {
  return cdpClient.fetch(
    `*[_type == "cdpSegment" && active == true] | order(name asc)`
  );
}

export async function updateSegmentMemberCount(
  segmentId: string,
  count: number
): Promise<void> {
  await cdpClient
    .patch(segmentId)
    .set({
      memberCount: count,
      lastComputedAt: new Date().toISOString(),
    })
    .commit();
}

export async function updateSegmentLastSynced(segmentId: string): Promise<void> {
  await cdpClient
    .patch(segmentId)
    .set({ lastSyncedAt: new Date().toISOString() })
    .commit();
}

// === EMAIL FLOW OPERATIONS ===

export async function getEmailFlow(id: string): Promise<EmailFlow | null> {
  return cdpClient.fetch(
    `*[_type == "emailFlow" && _id == $id][0] {
      ...,
      steps[] {
        ...,
        emailTemplate-> { _id, name, templateId, subject }
      }
    }`,
    { id }
  );
}

export async function getActiveFlowsByTrigger(
  triggerType: string
): Promise<EmailFlow[]> {
  return cdpClient.fetch(
    `*[_type == "emailFlow" && active == true && trigger.type == $triggerType] {
      ...,
      steps[] {
        ...,
        emailTemplate-> { _id, name, templateId, subject }
      }
    }`,
    { triggerType }
  );
}

export async function getFlowsTriggeredByStatusChange(
  fromStatus: string | null,
  toStatus: string
): Promise<EmailFlow[]> {
  const query = fromStatus
    ? `*[_type == "emailFlow" && active == true && trigger.type == "status_change" && 
        ($fromStatus in trigger.statusTrigger.fromStatus || "any" in trigger.statusTrigger.fromStatus) &&
        $toStatus in trigger.statusTrigger.toStatus]`
    : `*[_type == "emailFlow" && active == true && trigger.type == "status_change" && 
        $toStatus in trigger.statusTrigger.toStatus]`;

  return cdpClient.fetch(query, { fromStatus, toStatus });
}

export async function getFlowsTriggeredBySegment(
  segmentId: string,
  event: "entry" | "exit"
): Promise<EmailFlow[]> {
  const triggerType = event === "entry" ? "segment_entry" : "segment_exit";
  return cdpClient.fetch(
    `*[_type == "emailFlow" && active == true && trigger.type == $triggerType && trigger.segmentTrigger._ref == $segmentId]`,
    { triggerType, segmentId }
  );
}

export async function enrollApplicantInFlow(
  applicantId: string,
  flowId: string,
  startStep: number = 0
): Promise<void> {
  const enrollment = {
    _key: flowId,
    flow: { _type: "reference", _ref: flowId },
    enrolledAt: new Date().toISOString(),
    currentStep: startStep,
    status: "active" as const,
  };

  const applicant = await cdpClient.fetch<DraftApplicant>(
    `*[_type == "draftApplicant" && _id == $id][0]`,
    { id: applicantId }
  );

  const currentEnrollments = applicant?.flowEnrollments || [];
  
  // Check if already enrolled
  const existingIndex = currentEnrollments.findIndex(
    (e) => e.flow._ref === flowId
  );

  if (existingIndex >= 0) {
    // Update existing enrollment
    currentEnrollments[existingIndex] = enrollment;
  } else {
    currentEnrollments.push(enrollment);
  }

  await cdpClient
    .patch(applicantId)
    .set({ flowEnrollments: currentEnrollments })
    .commit();
}

export async function updateFlowEnrollment(
  applicantId: string,
  flowId: string,
  updates: Partial<DraftApplicant["flowEnrollments"]>[number]
): Promise<void> {
  const applicant = await cdpClient.fetch<DraftApplicant>(
    `*[_type == "draftApplicant" && _id == $id][0]`,
    { id: applicantId }
  );

  if (!applicant?.flowEnrollments) return;

  const enrollments = applicant.flowEnrollments.map((e) =>
    e.flow._ref === flowId ? { ...e, ...updates } : e
  );

  await cdpClient.patch(applicantId).set({ flowEnrollments: enrollments }).commit();
}

export async function updateFlowStats(
  flowId: string,
  updates: Partial<EmailFlow["stats"]>
): Promise<void> {
  const flow = await cdpClient.fetch<EmailFlow>(
    `*[_type == "emailFlow" && _id == $id][0]`,
    { id: flowId }
  );

  const currentStats = flow?.stats || {
    totalEnrolled: 0,
    currentlyActive: 0,
    completed: 0,
    exited: 0,
    emailsSent: 0,
    emailsOpened: 0,
    emailsClicked: 0,
  };

  await cdpClient
    .patch(flowId)
    .set({ stats: { ...currentStats, ...updates } })
    .commit();
}

// === EMAIL EVENT OPERATIONS ===

export async function createEmailEvent(
  data: Omit<EmailEvent, "_id" | "_type">
): Promise<EmailEvent> {
  return cdpClient.create({
    _type: "emailEvent" as const,
    ...data,
  });
}

export async function getEmailEventsByApplicant(
  applicantId: string
): Promise<EmailEvent[]> {
  return cdpClient.fetch(
    `*[_type == "emailEvent" && applicant._ref == $applicantId] | order(occurredAt desc)`,
    { applicantId }
  );
}

export async function getRecentEmailEvents(
  limit: number = 100
): Promise<EmailEvent[]> {
  return cdpClient.fetch(
    `*[_type == "emailEvent"] | order(occurredAt desc) [0...$limit]`,
    { limit }
  );
}

// === AGGREGATE QUERIES ===

export async function getCDPStats(): Promise<{
  totalApplicants: number;
  byStatus: Record<string, number>;
  activeSegments: number;
  activeFlows: number;
  emailsSentToday: number;
  emailsOpenedToday: number;
}> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString();

  const [applicantStats, segments, flows, emailStats] = await Promise.all([
    cdpClient.fetch(`{
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
    cdpClient.fetch(`count(*[_type == "cdpSegment" && active == true])`),
    cdpClient.fetch(`count(*[_type == "emailFlow" && active == true])`),
    cdpClient.fetch(
      `{
        "sent": count(*[_type == "emailEvent" && eventType == "sent" && occurredAt >= $today]),
        "opened": count(*[_type == "emailEvent" && eventType == "opened" && occurredAt >= $today])
      }`,
      { today: todayStr }
    ),
  ]);

  return {
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
    activeSegments: segments,
    activeFlows: flows,
    emailsSentToday: emailStats.sent,
    emailsOpenedToday: emailStats.opened,
  };
}

export { cdpClient };
