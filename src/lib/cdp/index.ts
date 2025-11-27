/**
 * CDP (Customer Data Platform) - Main Entry Point
 * 
 * Exports all CDP functionality for use throughout the application.
 */

// Types
export * from "./types";

// Sanity Client Operations
export {
  createDraftApplicant,
  updateDraftApplicant,
  getDraftApplicantByEmail,
  getDraftApplicantBySharePointId,
  getAllDraftApplicants,
  getDraftApplicantsByStatus,
  getDraftApplicantsBySegment,
  updateApplicantSegments,
  updateApplicantEmailEngagement,
  getSegment,
  getSegmentBySlug,
  getAllActiveSegments,
  updateSegmentMemberCount,
  updateSegmentLastSynced,
  getEmailFlow,
  getActiveFlowsByTrigger,
  getFlowsTriggeredByStatusChange,
  getFlowsTriggeredBySegment,
  enrollApplicantInFlow,
  updateFlowEnrollment,
  updateFlowStats,
  createEmailEvent,
  getEmailEventsByApplicant,
  getRecentEmailEvents,
  getCDPStats,
  cdpClient,
} from "./sanityClient";

// Segment Evaluation
export {
  evaluateApplicantForSegment,
  evaluateSegmentsForApplicant,
  evaluateSegment,
  evaluateAllSegments,
  updateApplicantSegmentMembership,
} from "./segmentEvaluator";

// Resend Sync
export {
  createResendAudience,
  getResendAudiences,
  addContactToAudience,
  updateResendContact,
  removeContactFromAudience,
  getAudienceContacts,
  syncSegmentToResend,
  syncAllSegmentsToResend,
  handleResendUnsubscribe,
} from "./resendSync";

// Flow Execution
export {
  executeFlowStep,
  triggerNewSubmissionFlows,
  triggerStatusChangeFlows,
  triggerSegmentFlows,
  processPendingFlowSteps,
} from "./flowExecutor";

// Typeform/SharePoint Sync
export {
  syncTypeformToCDP,
  batchSyncFromSharePoint,
} from "./syncFromTypeform";
