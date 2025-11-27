/**
 * CDP Sync - Syncs data from Typeform/SharePoint to Sanity CDP
 * 
 * This module handles creating/updating draft applicants in the CDP
 * when new submissions come in from Typeform.
 */

import type { DraftApplicant } from "./types";
import {
  createDraftApplicant,
  updateDraftApplicant,
  getDraftApplicantByEmail,
  getDraftApplicantBySharePointId,
} from "./sanityClient";
import { updateApplicantSegmentMembership } from "./segmentEvaluator";
import { triggerNewSubmissionFlows, triggerSegmentFlows } from "./flowExecutor";
import type { TypeformFormResponse } from "@/lib/typeform/typeformSharePointMapper";

/**
 * Map Typeform answers to a CDP field value
 */
function getAnswerValue(
  formResponse: TypeformFormResponse,
  ref: string,
  type: "text" | "email" | "boolean" | "multiChoice" | "choice"
): unknown {
  const answer = formResponse.answers?.find((a) => a.field?.ref === ref);
  if (!answer) return undefined;

  switch (type) {
    case "text":
      return answer.text || answer.phone_number;
    case "email":
      return answer.email || answer.text;
    case "boolean":
      if (typeof answer.boolean === "boolean") return answer.boolean;
      if (answer.choice?.label) {
        return ["yes", "true", "ja"].includes(answer.choice.label.toLowerCase());
      }
      return undefined;
    case "multiChoice":
      if (answer.choices?.labels) return answer.choices.labels;
      if (answer.choice?.label) return [answer.choice.label];
      return undefined;
    case "choice":
      return answer.choice?.label || answer.text;
    default:
      return answer.text;
  }
}

/**
 * Sync a Typeform submission to the CDP
 */
export async function syncTypeformToCDP(
  formResponse: TypeformFormResponse,
  sharePointId: string,
  options: {
    fullName?: string;
    email?: string;
    positionPreference?: string[];
  }
): Promise<{
  success: boolean;
  applicantId?: string;
  isNew: boolean;
  flowsTriggered?: number;
  segmentsAdded?: string[];
  error?: string;
}> {
  try {
    const { fullName, email, positionPreference } = options;

    if (!email) {
      return { success: false, isNew: false, error: "No email provided" };
    }

    // Check if applicant already exists
    let existingApplicant = await getDraftApplicantByEmail(email);
    if (!existingApplicant) {
      existingApplicant = await getDraftApplicantBySharePointId(sharePointId);
    }

    // Extract data from Typeform response
    const firstName = fullName?.split(" ")[0];
    const lastName = fullName?.split(" ").slice(1).join(" ");

    // Field refs from playerDraftFieldMap.ts
    const FIELD_REFS = {
      firstName: "5aa8e9df-1f61-4ec9-aa7c-8c94e4292438",
      lastName: "602744a3-bda7-4f47-831e-223b36fa00ec",
      email: "1344d8a0-7a64-4a7b-a5a3-6fb8dbc92392",
      phone: "3c7b9e3c-bc7f-40ab-afba-63fc8dff724a",
      city: "6c7909fd-43b6-4364-b5d1-1101ffbebbb7",
      ageGroup: "214f283a-4639-4bc3-8500-30ab884a4107",
      highestLevel: "e800711a-6c8b-4e48-9bfd-0695cde52847",
      position: "c32c5729-8ced-41b9-96ca-0062923ce8e8",
      currentlyActive: "d1b9952e-d449-4b49-8aef-0eb67e2c13d1",
      activeClubName: "4a83d967-7882-445e-8ece-514f18daaa56",
      previouslyActive: "3e59cf61-2f98-410f-a5f0-991de5704523",
      pastClubNames: "c5d76cf8-728b-4c37-8151-d3df08a49c4d",
      superpower: "fe493c99-d514-4b6b-a4e0-55a7f99d05bf",
      playerIdol: "f727661e-eea7-4651-a09f-3eefd6c33efa",
      socialMediaActive: "9aa71f75-0a6d-410c-9863-194e609ef265",
      socialMediaPlatforms: "8a44b217-206f-4c4f-8a1d-64d9f00d9c4b",
      socialMediaHandles: "c60e34de-71fc-4e84-b264-b9c84b53997c",
      interestIfNotSelected: "f4acdd57-f3ac-460a-9978-6b9e08621527",
    };

    const applicantData: Omit<DraftApplicant, "_id" | "_type"> = {
      email,
      firstName,
      lastName,
      phone: getAnswerValue(formResponse, FIELD_REFS.phone, "text") as string | undefined,
      city: getAnswerValue(formResponse, FIELD_REFS.city, "text") as string | undefined,
      ageGroup: getAnswerValue(formResponse, FIELD_REFS.ageGroup, "choice") as string | undefined,
      highestLevel: getAnswerValue(formResponse, FIELD_REFS.highestLevel, "choice") as string | undefined,
      preferredPositions: positionPreference,
      currentlyActive: getAnswerValue(formResponse, FIELD_REFS.currentlyActive, "boolean") as boolean | undefined,
      activeClubName: getAnswerValue(formResponse, FIELD_REFS.activeClubName, "text") as string | undefined,
      previouslyActive: getAnswerValue(formResponse, FIELD_REFS.previouslyActive, "boolean") as boolean | undefined,
      pastClubNames: getAnswerValue(formResponse, FIELD_REFS.pastClubNames, "text") as string | undefined,
      superpower: getAnswerValue(formResponse, FIELD_REFS.superpower, "text") as string | undefined,
      playerIdol: getAnswerValue(formResponse, FIELD_REFS.playerIdol, "text") as string | undefined,
      socialMediaActive: getAnswerValue(formResponse, FIELD_REFS.socialMediaActive, "boolean") as boolean | undefined,
      socialMediaPlatforms: getAnswerValue(formResponse, FIELD_REFS.socialMediaPlatforms, "multiChoice") as string[] | undefined,
      socialMediaHandles: getAnswerValue(formResponse, FIELD_REFS.socialMediaHandles, "text") as string | undefined,
      interestIfNotSelected: getAnswerValue(formResponse, FIELD_REFS.interestIfNotSelected, "multiChoice") as string[] | undefined,
      status: "new",
      sharePointId,
      typeformResponseId: formResponse.token,
      submittedAt: formResponse.submitted_at || new Date().toISOString(),
      lastSyncedAt: new Date().toISOString(),
    };

    let applicant: DraftApplicant;
    const isNew = !existingApplicant;

    if (existingApplicant) {
      // Update existing applicant
      applicant = await updateDraftApplicant(existingApplicant._id, applicantData);
    } else {
      // Create new applicant
      applicant = await createDraftApplicant(applicantData);
    }

    // Evaluate segments for this applicant
    const segmentResult = await updateApplicantSegmentMembership(applicant);

    // Trigger flows
    let flowsTriggered = 0;

    if (isNew) {
      // Trigger new submission flows
      const newSubmissionResults = await triggerNewSubmissionFlows(applicant);
      flowsTriggered += newSubmissionResults.length;
    }

    // Trigger segment entry flows for newly added segments
    for (const segmentId of segmentResult.added) {
      const segmentResults = await triggerSegmentFlows(applicant, segmentId, "entry");
      flowsTriggered += segmentResults.length;
    }

    console.log(`✅ CDP sync complete for ${email}: ${isNew ? "created" : "updated"}, ${flowsTriggered} flows triggered`);

    return {
      success: true,
      applicantId: applicant._id,
      isNew,
      flowsTriggered,
      segmentsAdded: segmentResult.added,
    };
  } catch (error) {
    console.error("❌ CDP sync error:", error);
    return {
      success: false,
      isNew: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Batch sync applicants from SharePoint to CDP
 * Useful for initial migration or periodic sync
 */
export async function batchSyncFromSharePoint(
  applicants: Array<{
    sharePointId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    ageGroup?: string;
    highestLevel?: string;
    preferredPositions?: string[];
    currentlyActive?: boolean;
    activeClubName?: string;
    previouslyActive?: boolean;
    pastClubNames?: string;
    superpower?: string;
    playerIdol?: string;
    socialMediaActive?: boolean;
    socialMediaPlatforms?: string[];
    socialMediaHandles?: string;
    interestIfNotSelected?: string[];
    status?: string;
    submittedAt?: string;
  }>
): Promise<{
  created: number;
  updated: number;
  failed: number;
  errors: string[];
}> {
  let created = 0;
  let updated = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const data of applicants) {
    try {
      const existing = await getDraftApplicantBySharePointId(data.sharePointId);

      const applicantData: Omit<DraftApplicant, "_id" | "_type"> = {
        ...data,
        status: (data.status as DraftApplicant["status"]) || "new",
        lastSyncedAt: new Date().toISOString(),
      };

      if (existing) {
        await updateDraftApplicant(existing._id, applicantData);
        updated++;
      } else {
        await createDraftApplicant(applicantData);
        created++;
      }
    } catch (error) {
      failed++;
      errors.push(`${data.email}: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  return { created, updated, failed, errors };
}
