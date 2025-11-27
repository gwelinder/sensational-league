/**
 * Resend Sync - Syncs CDP data with Resend audiences
 * 
 * Handles:
 * - Creating/managing Resend audiences for segments
 * - Syncing applicant contacts to audiences
 * - Removing contacts when they leave segments
 */

import { Resend } from "resend";
import type { DraftApplicant, CDPSegment } from "./types";
import {
  getSegment,
  getDraftApplicantsBySegment,
  updateSegmentLastSynced,
  updateDraftApplicant,
} from "./sanityClient";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Create a new Resend audience for a segment
 */
export async function createResendAudience(
  segmentName: string
): Promise<string | null> {
  try {
    const response = await resend.audiences.create({
      name: `SL CDP: ${segmentName}`,
    });

    if (response.error) {
      console.error("Failed to create Resend audience:", response.error);
      return null;
    }

    return response.data?.id || null;
  } catch (error) {
    console.error("Error creating Resend audience:", error);
    return null;
  }
}

/**
 * Get all Resend audiences
 */
export async function getResendAudiences(): Promise<
  Array<{ id: string; name: string }> | null
> {
  try {
    const response = await resend.audiences.list();

    if (response.error) {
      console.error("Failed to list Resend audiences:", response.error);
      return null;
    }

    return response.data?.data || [];
  } catch (error) {
    console.error("Error listing Resend audiences:", error);
    return null;
  }
}

/**
 * Add a contact to a Resend audience
 */
export async function addContactToAudience(
  audienceId: string,
  applicant: DraftApplicant
): Promise<string | null> {
  try {
    const response = await resend.contacts.create({
      audienceId,
      email: applicant.email,
      firstName: applicant.firstName,
      lastName: applicant.lastName,
      unsubscribed: applicant.emailEngagement?.unsubscribed || false,
    });

    if (response.error) {
      // Contact might already exist - that's okay
      if (response.error.message?.includes("already exists")) {
        return "existing";
      }
      console.error("Failed to add contact to Resend:", response.error);
      return null;
    }

    return response.data?.id || null;
  } catch (error) {
    console.error("Error adding contact to Resend:", error);
    return null;
  }
}

/**
 * Update a contact in Resend
 */
export async function updateResendContact(
  audienceId: string,
  contactId: string,
  updates: {
    firstName?: string;
    lastName?: string;
    unsubscribed?: boolean;
  }
): Promise<boolean> {
  try {
    const response = await resend.contacts.update({
      audienceId,
      id: contactId,
      ...updates,
    });

    if (response.error) {
      console.error("Failed to update Resend contact:", response.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error updating Resend contact:", error);
    return false;
  }
}

/**
 * Remove a contact from a Resend audience
 */
export async function removeContactFromAudience(
  audienceId: string,
  email: string
): Promise<boolean> {
  try {
    const response = await resend.contacts.remove({
      audienceId,
      email,
    });

    if (response.error) {
      console.error("Failed to remove contact from Resend:", response.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error removing contact from Resend:", error);
    return false;
  }
}

/**
 * Get all contacts in a Resend audience
 */
export async function getAudienceContacts(
  audienceId: string
): Promise<Array<{ id: string; email: string }> | null> {
  try {
    const response = await resend.contacts.list({ audienceId });

    if (response.error) {
      console.error("Failed to list Resend contacts:", response.error);
      return null;
    }

    return response.data?.data || [];
  } catch (error) {
    console.error("Error listing Resend contacts:", error);
    return null;
  }
}

/**
 * Sync a segment to its Resend audience
 * Adds new members, removes old ones
 */
export async function syncSegmentToResend(segmentId: string): Promise<{
  success: boolean;
  added: number;
  removed: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let added = 0;
  let removed = 0;

  const segment = await getSegment(segmentId);
  if (!segment) {
    return { success: false, added: 0, removed: 0, errors: ["Segment not found"] };
  }

  if (!segment.resendAudienceId) {
    return {
      success: false,
      added: 0,
      removed: 0,
      errors: ["Segment has no Resend audience configured"],
    };
  }

  const audienceId = segment.resendAudienceId;

  // Get current segment members from Sanity
  const segmentMembers = await getDraftApplicantsBySegment(segmentId);
  const memberEmails = new Set(segmentMembers.map((m) => m.email.toLowerCase()));

  // Get current audience contacts from Resend
  const audienceContacts = await getAudienceContacts(audienceId);
  if (!audienceContacts) {
    return {
      success: false,
      added: 0,
      removed: 0,
      errors: ["Failed to fetch Resend audience contacts"],
    };
  }

  const contactEmails = new Set(
    audienceContacts.map((c) => c.email.toLowerCase())
  );

  // Add new members to Resend
  for (const member of segmentMembers) {
    const emailLower = member.email.toLowerCase();
    if (!contactEmails.has(emailLower)) {
      const contactId = await addContactToAudience(audienceId, member);
      if (contactId) {
        added++;
        // Store Resend contact ID on the applicant
        if (contactId !== "existing") {
          await updateDraftApplicant(member._id, { resendContactId: contactId });
        }
      } else {
        errors.push(`Failed to add ${member.email} to Resend`);
      }
    }
  }

  // Remove contacts no longer in segment
  for (const contact of audienceContacts) {
    const emailLower = contact.email.toLowerCase();
    if (!memberEmails.has(emailLower)) {
      const success = await removeContactFromAudience(audienceId, contact.email);
      if (success) {
        removed++;
      } else {
        errors.push(`Failed to remove ${contact.email} from Resend`);
      }
    }
  }

  // Update last synced timestamp
  await updateSegmentLastSynced(segmentId);

  return {
    success: errors.length === 0,
    added,
    removed,
    errors,
  };
}

/**
 * Sync all segments with Resend sync enabled
 */
export async function syncAllSegmentsToResend(): Promise<{
  synced: number;
  failed: number;
  results: Array<{
    segmentId: string;
    segmentName: string;
    added: number;
    removed: number;
    errors: string[];
  }>;
}> {
  const { getAllActiveSegments } = await import("./sanityClient");
  const segments = await getAllActiveSegments();
  
  const results: Array<{
    segmentId: string;
    segmentName: string;
    added: number;
    removed: number;
    errors: string[];
  }> = [];

  let synced = 0;
  let failed = 0;

  for (const segment of segments) {
    if (!segment.syncToResend || !segment.resendAudienceId) continue;

    const result = await syncSegmentToResend(segment._id);
    
    results.push({
      segmentId: segment._id,
      segmentName: segment.name,
      added: result.added,
      removed: result.removed,
      errors: result.errors,
    });

    if (result.success) {
      synced++;
    } else {
      failed++;
    }
  }

  return { synced, failed, results };
}

/**
 * Handle unsubscribe from Resend webhook
 * Updates the applicant's unsubscribed status
 */
export async function handleResendUnsubscribe(email: string): Promise<boolean> {
  const { getDraftApplicantByEmail, updateApplicantEmailEngagement } = await import(
    "./sanityClient"
  );

  const applicant = await getDraftApplicantByEmail(email);
  if (!applicant) {
    console.warn(`Unsubscribe webhook: No applicant found for email ${email}`);
    return false;
  }

  await updateApplicantEmailEngagement(applicant._id, { unsubscribed: true });
  
  console.log(`Marked ${email} as unsubscribed`);
  return true;
}
