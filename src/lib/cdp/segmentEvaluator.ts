/**
 * Segment Evaluator - Evaluates segment rules against applicants
 * 
 * Handles dynamic segmentation based on applicant attributes,
 * and manages segment membership updates.
 */

import type {
  DraftApplicant,
  CDPSegment,
  SegmentCondition,
  ConditionOperator,
  SegmentEvaluationResult,
} from "./types";
import {
  getAllDraftApplicants,
  getAllActiveSegments,
  updateApplicantSegments,
  updateSegmentMemberCount,
  getDraftApplicantsBySegment,
} from "./sanityClient";
import { syncSegmentToResend } from "./resendSync";

/**
 * Evaluate a single condition against an applicant
 */
function evaluateCondition(
  applicant: DraftApplicant,
  condition: SegmentCondition
): boolean {
  const { field, operator, value } = condition;

  // Get the field value from applicant
  let fieldValue: unknown;

  // Handle nested fields
  if (field === "emailsOpened") {
    fieldValue = applicant.emailEngagement?.emailsOpened ?? 0;
  } else if (field === "unsubscribed") {
    fieldValue = applicant.emailEngagement?.unsubscribed ?? false;
  } else if (field === "daysSinceSubmission") {
    if (applicant.submittedAt) {
      const submittedDate = new Date(applicant.submittedAt);
      const now = new Date();
      fieldValue = Math.floor(
        (now.getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24)
      );
    } else {
      fieldValue = 0;
    }
  } else {
    fieldValue = (applicant as Record<string, unknown>)[field];
  }

  return evaluateOperator(fieldValue, operator, value);
}

/**
 * Evaluate an operator against a value
 */
function evaluateOperator(
  fieldValue: unknown,
  operator: ConditionOperator,
  conditionValue?: string
): boolean {
  switch (operator) {
    case "eq":
      if (Array.isArray(fieldValue)) {
        return fieldValue.includes(conditionValue);
      }
      return String(fieldValue) === conditionValue;

    case "neq":
      if (Array.isArray(fieldValue)) {
        return !fieldValue.includes(conditionValue);
      }
      return String(fieldValue) !== conditionValue;

    case "contains":
      if (Array.isArray(fieldValue)) {
        const values = conditionValue?.split(",").map((v) => v.trim()) || [];
        return values.some((v) => fieldValue.includes(v));
      }
      if (typeof fieldValue === "string") {
        return fieldValue.toLowerCase().includes(conditionValue?.toLowerCase() || "");
      }
      return false;

    case "notContains":
      if (Array.isArray(fieldValue)) {
        const values = conditionValue?.split(",").map((v) => v.trim()) || [];
        return !values.some((v) => fieldValue.includes(v));
      }
      if (typeof fieldValue === "string") {
        return !fieldValue.toLowerCase().includes(conditionValue?.toLowerCase() || "");
      }
      return true;

    case "gt":
      return Number(fieldValue) > Number(conditionValue);

    case "lt":
      return Number(fieldValue) < Number(conditionValue);

    case "empty":
      if (Array.isArray(fieldValue)) {
        return fieldValue.length === 0;
      }
      return fieldValue === null || fieldValue === undefined || fieldValue === "";

    case "notEmpty":
      if (Array.isArray(fieldValue)) {
        return fieldValue.length > 0;
      }
      return fieldValue !== null && fieldValue !== undefined && fieldValue !== "";

    case "isTrue":
      return fieldValue === true;

    case "isFalse":
      return fieldValue === false;

    default:
      return false;
  }
}

/**
 * Evaluate if an applicant matches a segment's rules
 */
export function evaluateApplicantForSegment(
  applicant: DraftApplicant,
  segment: CDPSegment
): boolean {
  // Manual segments don't use rule evaluation
  if (segment.type === "manual") {
    return false;
  }

  if (!segment.rules?.conditions || segment.rules.conditions.length === 0) {
    return false;
  }

  const { matchType, conditions } = segment.rules;

  if (matchType === "all") {
    // All conditions must match (AND)
    return conditions.every((condition) =>
      evaluateCondition(applicant, condition)
    );
  } else {
    // Any condition must match (OR)
    return conditions.some((condition) =>
      evaluateCondition(applicant, condition)
    );
  }
}

/**
 * Evaluate all segments for a single applicant
 * Returns the list of segment IDs the applicant should belong to
 */
export async function evaluateSegmentsForApplicant(
  applicant: DraftApplicant
): Promise<string[]> {
  const segments = await getAllActiveSegments();
  const matchingSegmentIds: string[] = [];

  for (const segment of segments) {
    if (segment.type === "rule" && evaluateApplicantForSegment(applicant, segment)) {
      matchingSegmentIds.push(segment._id);
    }
  }

  return matchingSegmentIds;
}

/**
 * Evaluate a single segment against all applicants
 * Returns statistics about membership changes
 */
export async function evaluateSegment(
  segment: CDPSegment
): Promise<SegmentEvaluationResult> {
  const applicants = await getAllDraftApplicants();
  const currentMembers = await getDraftApplicantsBySegment(segment._id);
  const currentMemberIds = new Set(currentMembers.map((a) => a._id));

  const newMembers: string[] = [];
  const added: string[] = [];
  const removed: string[] = [];

  for (const applicant of applicants) {
    const matches = evaluateApplicantForSegment(applicant, segment);
    const wasMember = currentMemberIds.has(applicant._id);

    if (matches) {
      newMembers.push(applicant._id);
      if (!wasMember) {
        added.push(applicant._id);
      }
    } else if (wasMember) {
      removed.push(applicant._id);
    }
  }

  // Update member count in segment
  await updateSegmentMemberCount(segment._id, newMembers.length);

  return {
    segmentId: segment._id,
    segmentName: segment.name,
    members: newMembers,
    added,
    removed,
  };
}

/**
 * Evaluate all active segments and update applicant memberships
 * This is the main entry point for segment recomputation
 */
export async function evaluateAllSegments(): Promise<SegmentEvaluationResult[]> {
  const segments = await getAllActiveSegments();
  const applicants = await getAllDraftApplicants();
  const results: SegmentEvaluationResult[] = [];

  // Build a map of applicant -> segments
  const applicantSegments = new Map<string, Set<string>>();
  
  for (const applicant of applicants) {
    applicantSegments.set(applicant._id, new Set());
  }

  // Evaluate each segment
  for (const segment of segments) {
    if (segment.type !== "rule") continue;

    const segmentMembers: string[] = [];

    for (const applicant of applicants) {
      if (evaluateApplicantForSegment(applicant, segment)) {
        segmentMembers.push(applicant._id);
        applicantSegments.get(applicant._id)?.add(segment._id);
      }
    }

    // Get previous members to calculate changes
    const previousMembers = await getDraftApplicantsBySegment(segment._id);
    const previousMemberIds = new Set(previousMembers.map((a) => a._id));
    
    const added = segmentMembers.filter((id) => !previousMemberIds.has(id));
    const removed = Array.from(previousMemberIds).filter(
      (id) => !segmentMembers.includes(id)
    );

    results.push({
      segmentId: segment._id,
      segmentName: segment.name,
      members: segmentMembers,
      added,
      removed,
    });

    // Update segment member count
    await updateSegmentMemberCount(segment._id, segmentMembers.length);

    // Sync to Resend if enabled
    if (segment.syncToResend && segment.resendAudienceId) {
      try {
        await syncSegmentToResend(segment._id);
      } catch (error) {
        console.error(`Failed to sync segment ${segment.name} to Resend:`, error);
      }
    }
  }

  // Update each applicant's segment membership
  for (const [applicantId, segmentIds] of applicantSegments) {
    await updateApplicantSegments(applicantId, Array.from(segmentIds));
  }

  return results;
}

/**
 * Update a single applicant's segment membership
 * Call this after an applicant's data changes
 */
export async function updateApplicantSegmentMembership(
  applicant: DraftApplicant
): Promise<{
  previousSegments: string[];
  newSegments: string[];
  added: string[];
  removed: string[];
}> {
  const previousSegments = applicant.segments?.map((s) => s._ref) || [];
  const newSegments = await evaluateSegmentsForApplicant(applicant);

  const previousSet = new Set(previousSegments);
  const newSet = new Set(newSegments);

  const added = newSegments.filter((id) => !previousSet.has(id));
  const removed = previousSegments.filter((id) => !newSet.has(id));

  // Update the applicant's segments
  await updateApplicantSegments(applicant._id, newSegments);

  // Update segment member counts for affected segments
  const affectedSegments = [...added, ...removed];
  for (const segmentId of affectedSegments) {
    const members = await getDraftApplicantsBySegment(segmentId);
    await updateSegmentMemberCount(segmentId, members.length);
  }

  return {
    previousSegments,
    newSegments,
    added,
    removed,
  };
}
