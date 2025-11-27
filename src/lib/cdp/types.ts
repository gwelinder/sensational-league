/**
 * CDP Types - Shared type definitions for the Customer Data Platform
 */

// === APPLICANT TYPES ===
export interface DraftApplicant {
  _id: string;
  _type: "draftApplicant";
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
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
  status?: ApplicantStatus;
  rating?: number;
  notes?: string;
  tags?: string[];
  interestIfNotSelected?: string[];
  sharePointId?: string;
  typeformResponseId?: string;
  submittedAt?: string;
  lastSyncedAt?: string;
  segments?: { _ref: string }[];
  emailEngagement?: EmailEngagement;
  flowEnrollments?: FlowEnrollment[];
  resendContactId?: string;
}

export type ApplicantStatus =
  | "new"
  | "under_review"
  | "shortlisted"
  | "invited_trial"
  | "trial_completed"
  | "selected"
  | "waitlisted"
  | "not_selected"
  | "withdrawn";

export interface EmailEngagement {
  emailsSent: number;
  emailsOpened: number;
  emailsClicked: number;
  lastEmailSentAt?: string;
  lastEmailOpenedAt?: string;
  unsubscribed: boolean;
}

export interface FlowEnrollment {
  flow: { _ref: string };
  enrolledAt: string;
  currentStep: number;
  status: "active" | "completed" | "paused" | "exited";
  nextStepAt?: string;
}

// === SEGMENT TYPES ===
export interface CDPSegment {
  _id: string;
  _type: "cdpSegment";
  name: string;
  slug: { current: string };
  description?: string;
  color?: string;
  icon?: string;
  type: "rule" | "manual";
  rules?: SegmentRules;
  resendAudienceId?: string;
  syncToResend?: boolean;
  lastSyncedAt?: string;
  memberCount?: number;
  lastComputedAt?: string;
  triggerFlows?: { _ref: string }[];
  active: boolean;
}

export interface SegmentRules {
  matchType: "all" | "any";
  conditions: SegmentCondition[];
}

export interface SegmentCondition {
  field: string;
  operator: ConditionOperator;
  value?: string;
}

export type ConditionOperator =
  | "eq"
  | "neq"
  | "contains"
  | "notContains"
  | "gt"
  | "lt"
  | "empty"
  | "notEmpty"
  | "isTrue"
  | "isFalse";

// === EMAIL FLOW TYPES ===
export interface EmailFlow {
  _id: string;
  _type: "emailFlow";
  name: string;
  slug: { current: string };
  description?: string;
  active: boolean;
  category?: string;
  trigger: FlowTrigger;
  enrollmentSettings?: EnrollmentSettings;
  steps: FlowStep[];
  stats?: FlowStats;
}

export interface FlowTrigger {
  type:
    | "new_submission"
    | "status_change"
    | "segment_entry"
    | "segment_exit"
    | "manual"
    | "scheduled";
  statusTrigger?: {
    fromStatus?: string[];
    toStatus: string[];
  };
  segmentTrigger?: { _ref: string };
  scheduleTrigger?: {
    scheduleType: "once" | "daily" | "weekly";
    datetime?: string;
    targetSegment?: { _ref: string };
  };
}

export interface EnrollmentSettings {
  allowReenrollment?: boolean;
  reenrollmentDelay?: number;
  exitOnUnsubscribe?: boolean;
  exitOnStatusChange?: string[];
}

export type FlowStep =
  | EmailStep
  | WaitStep
  | BranchStep
  | TagStep
  | UpdateStatusStep;

export interface EmailStep {
  _type: "emailStep";
  stepName?: string;
  delay?: { value: number; unit: "minutes" | "hours" | "days" };
  emailTemplate: { _ref: string };
  condition?: StepCondition;
}

export interface WaitStep {
  _type: "waitStep";
  waitType: "duration" | "event" | "date";
  duration?: { value: number; unit: "hours" | "days" | "weeks" };
  waitForEvent?: "email_opened" | "email_clicked" | "status_changed";
  maxWait?: number;
}

export interface BranchStep {
  _type: "branchStep";
  branchName?: string;
  condition: {
    field: string;
    operator: string;
    value?: string;
  };
  ifTrueAction: "continue" | "skip" | "exit";
  skipToStep?: number;
  ifFalseAction: "continue" | "skip" | "exit";
  ifFalseSkipToStep?: number;
}

export interface TagStep {
  _type: "tagStep";
  action: "add" | "remove";
  tag: string;
}

export interface UpdateStatusStep {
  _type: "updateStatusStep";
  newStatus: ApplicantStatus;
}

export interface StepCondition {
  field: string;
  value?: string;
  segment?: { _ref: string };
}

export interface FlowStats {
  totalEnrolled: number;
  currentlyActive: number;
  completed: number;
  exited: number;
  emailsSent: number;
  emailsOpened: number;
  emailsClicked: number;
}

// === EMAIL EVENT TYPES ===
export interface EmailEvent {
  _id: string;
  _type: "emailEvent";
  applicant: { _ref: string };
  eventType:
    | "sent"
    | "delivered"
    | "opened"
    | "clicked"
    | "bounced"
    | "complained"
    | "unsubscribed";
  emailTemplate?: { _ref: string };
  flow?: { _ref: string };
  flowStep?: number;
  resendEmailId?: string;
  subject?: string;
  occurredAt: string;
  metadata?: {
    userAgent?: string;
    ip?: string;
    clickedUrl?: string;
    bounceType?: "hard" | "soft";
    bounceReason?: string;
  };
}

// === RESEND TYPES ===
export interface ResendAudience {
  id: string;
  name: string;
}

export interface ResendContact {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  unsubscribed: boolean;
  created_at: string;
}

// === API RESPONSE TYPES ===
export interface CDPApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SegmentEvaluationResult {
  segmentId: string;
  segmentName: string;
  members: string[]; // applicant IDs
  added: string[];
  removed: string[];
}

export interface FlowExecutionResult {
  flowId: string;
  applicantId: string;
  stepExecuted: number;
  action: "sent_email" | "waited" | "branched" | "tagged" | "updated_status" | "completed" | "exited";
  nextStepAt?: string;
  error?: string;
}
