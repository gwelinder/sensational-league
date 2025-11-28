/**
 * Flow Executor - Executes email flow steps for applicants
 * 
 * Handles:
 * - Processing flow steps (emails, waits, branches, tags, status updates)
 * - Scheduling next steps
 * - Flow triggers and enrollment
 */

import { resendClient } from "@/lib/email/resendClient";
import { renderEmailTemplate, type EmailVariables } from "@/lib/email-renderer";
import type {
  DraftApplicant,
  EmailFlow,
  // FlowStep is used via union type
  EmailStep,
  WaitStep,
  BranchStep,
  TagStep,
  UpdateStatusStep,
  FlowExecutionResult,
  ApplicantStatus,
} from "./types";
import {
  getEmailFlow,
  getActiveFlowsByTrigger,
  getFlowsTriggeredByStatusChange,
  getFlowsTriggeredBySegment,
  enrollApplicantInFlow,
  updateFlowEnrollment,
  updateFlowStats,
  updateDraftApplicant,
  createEmailEvent,
  cdpClient,
} from "./sanityClient";

/**
 * Calculate the next execution time based on delay
 */
function calculateNextStepTime(
  delay?: { value: number; unit: "minutes" | "hours" | "days" | "weeks" }
): Date {
  const now = new Date();
  if (!delay || delay.value === 0) {
    return now;
  }

  const multipliers: Record<string, number> = {
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000,
    weeks: 7 * 24 * 60 * 60 * 1000,
  };

  return new Date(now.getTime() + delay.value * multipliers[delay.unit]);
}

/**
 * Send an email using a template
 */
async function sendFlowEmail(
  applicant: DraftApplicant,
  templateRef: string,
  flow: EmailFlow,
  stepIndex: number
): Promise<{ success: boolean; emailId?: string; error?: string }> {
  try {
    // Fetch the template
    const template = await cdpClient.fetch(
      `*[_type == "emailTemplate" && _id == $id][0] {
        templateId, subject, content, signature, ctaButton, socialLinks
      }`,
      { id: templateRef }
    );

    if (!template) {
      return { success: false, error: "Template not found" };
    }

    // Prepare variables
    const variables: EmailVariables = {
      email: applicant.email,
      firstName: applicant.firstName,
      lastName: applicant.lastName,
      position: applicant.preferredPositions?.join(", "),
      city: applicant.city,
      status: applicant.status,
      submittedAt: applicant.submittedAt,
    };

    // Render the template
    const { subject, html } = renderEmailTemplate(template, variables);

    // Send via Resend
    const verifiedDomain =
      process.env.RESEND_VERIFIED_DOMAIN || "updates.sensationalleague.com";
    const fromEmail = `Sensational League <hello@${verifiedDomain}>`;

    const { data, error } = await resendClient.emails.send({
      from: fromEmail,
      to: [applicant.email],
      subject,
      html,
      tags: [
        { name: "flow", value: flow.slug.current },
        { name: "step", value: String(stepIndex) },
      ],
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Record the email event
    await createEmailEvent({
      applicant: { _ref: applicant._id },
      eventType: "sent",
      emailTemplate: { _ref: templateRef },
      flow: { _ref: flow._id },
      flowStep: stepIndex,
      resendEmailId: data?.id,
      subject,
      occurredAt: new Date().toISOString(),
    });

    // Update applicant email engagement
    const currentEngagement = applicant.emailEngagement || {
      emailsSent: 0,
      emailsOpened: 0,
      emailsClicked: 0,
      unsubscribed: false,
    };

    await updateDraftApplicant(applicant._id, {
      emailEngagement: {
        ...currentEngagement,
        emailsSent: currentEngagement.emailsSent + 1,
        lastEmailSentAt: new Date().toISOString(),
      },
    });

    // Update flow stats
    const currentStats = flow.stats || {
      totalEnrolled: 0,
      currentlyActive: 0,
      completed: 0,
      exited: 0,
      emailsSent: 0,
      emailsOpened: 0,
      emailsClicked: 0,
    };

    await updateFlowStats(flow._id, {
      emailsSent: currentStats.emailsSent + 1,
    });

    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error("Error sending flow email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Evaluate a step condition
 */
function evaluateStepCondition(
  applicant: DraftApplicant,
  condition?: { field: string; value?: string; segment?: { _ref: string } }
): boolean {
  if (!condition || condition.field === "none") {
    return true;
  }

  switch (condition.field) {
    case "status":
      return applicant.status === condition.value;

    case "opened_previous":
      return (applicant.emailEngagement?.emailsOpened ?? 0) > 0;

    case "clicked_previous":
      return (applicant.emailEngagement?.emailsClicked ?? 0) > 0;

    case "in_segment":
      if (!condition.segment?._ref) return false;
      return applicant.segments?.some((s) => s._ref === condition.segment?._ref) ?? false;

    default:
      return true;
  }
}

/**
 * Execute a single flow step for an applicant
 */
export async function executeFlowStep(
  applicant: DraftApplicant,
  flow: EmailFlow,
  stepIndex: number
): Promise<FlowExecutionResult> {
  const step = flow.steps[stepIndex];
  if (!step) {
    // No more steps - flow complete
    await updateFlowEnrollment(applicant._id, flow._id, {
      status: "completed",
      currentStep: stepIndex,
    });

    // Update stats
    const currentStats = flow.stats || {
      totalEnrolled: 0,
      currentlyActive: 0,
      completed: 0,
      exited: 0,
      emailsSent: 0,
      emailsOpened: 0,
      emailsClicked: 0,
    };

    await updateFlowStats(flow._id, {
      currentlyActive: Math.max(0, currentStats.currentlyActive - 1),
      completed: currentStats.completed + 1,
    });

    return {
      flowId: flow._id,
      applicantId: applicant._id,
      stepExecuted: stepIndex,
      action: "completed",
    };
  }

  const stepType = (step as { _type?: string })._type;

  switch (stepType) {
    case "emailStep": {
      const emailStep = step as EmailStep;

      // Check delay
      const nextTime = calculateNextStepTime(emailStep.delay);
      if (nextTime > new Date()) {
        // Schedule for later
        await updateFlowEnrollment(applicant._id, flow._id, {
          currentStep: stepIndex,
          nextStepAt: nextTime.toISOString(),
        });

        return {
          flowId: flow._id,
          applicantId: applicant._id,
          stepExecuted: stepIndex,
          action: "waited",
          nextStepAt: nextTime.toISOString(),
        };
      }

      // Check condition
      if (!evaluateStepCondition(applicant, emailStep.condition)) {
        // Skip to next step
        return executeFlowStep(applicant, flow, stepIndex + 1);
      }

      // Send email
      const result = await sendFlowEmail(
        applicant,
        emailStep.emailTemplate._ref,
        flow,
        stepIndex
      );

      if (!result.success) {
        return {
          flowId: flow._id,
          applicantId: applicant._id,
          stepExecuted: stepIndex,
          action: "sent_email",
          error: result.error,
        };
      }

      // Move to next step
      await updateFlowEnrollment(applicant._id, flow._id, {
        currentStep: stepIndex + 1,
      });

      // Continue to next step (with potential delay)
      return executeFlowStep(applicant, flow, stepIndex + 1);
    }

    case "waitStep": {
      const waitStep = step as WaitStep;
      let nextTime: Date;

      if (waitStep.waitType === "duration" && waitStep.duration) {
        nextTime = calculateNextStepTime({
          value: waitStep.duration.value,
          unit: waitStep.duration.unit as "hours" | "days" | "weeks",
        });
      } else {
        // For event-based waits, set max wait time
        nextTime = new Date();
        nextTime.setDate(nextTime.getDate() + (waitStep.maxWait || 7));
      }

      await updateFlowEnrollment(applicant._id, flow._id, {
        currentStep: stepIndex,
        nextStepAt: nextTime.toISOString(),
      });

      return {
        flowId: flow._id,
        applicantId: applicant._id,
        stepExecuted: stepIndex,
        action: "waited",
        nextStepAt: nextTime.toISOString(),
      };
    }

    case "branchStep": {
      const branchStep = step as BranchStep;
      const conditionMet = evaluateBranchCondition(applicant, branchStep.condition);

      const action = conditionMet ? branchStep.ifTrueAction : branchStep.ifFalseAction;
      const skipTo = conditionMet ? branchStep.skipToStep : branchStep.ifFalseSkipToStep;

      if (action === "exit") {
        await updateFlowEnrollment(applicant._id, flow._id, {
          status: "exited",
        });

        return {
          flowId: flow._id,
          applicantId: applicant._id,
          stepExecuted: stepIndex,
          action: "exited",
        };
      }

      const nextStep = action === "skip" && skipTo !== undefined ? skipTo : stepIndex + 1;

      await updateFlowEnrollment(applicant._id, flow._id, {
        currentStep: nextStep,
      });

      return executeFlowStep(applicant, flow, nextStep);
    }

    case "tagStep": {
      const tagStep = step as TagStep;
      const currentTags = applicant.tags || [];

      let newTags: string[];
      if (tagStep.action === "add") {
        newTags = [...new Set([...currentTags, tagStep.tag])];
      } else {
        newTags = currentTags.filter((t) => t !== tagStep.tag);
      }

      await updateDraftApplicant(applicant._id, { tags: newTags });

      // Continue to next step
      await updateFlowEnrollment(applicant._id, flow._id, {
        currentStep: stepIndex + 1,
      });

      return executeFlowStep(applicant, flow, stepIndex + 1);
    }

    case "updateStatusStep": {
      const statusStep = step as UpdateStatusStep;
      await updateDraftApplicant(applicant._id, { status: statusStep.newStatus });

      // Continue to next step
      await updateFlowEnrollment(applicant._id, flow._id, {
        currentStep: stepIndex + 1,
      });

      return executeFlowStep(applicant, flow, stepIndex + 1);
    }

    default:
      // Unknown step type, skip
      return executeFlowStep(applicant, flow, stepIndex + 1);
  }
}

/**
 * Evaluate a branch condition
 */
function evaluateBranchCondition(
  applicant: DraftApplicant,
  condition: { field: string; operator: string; value?: string }
): boolean {
  const { field, operator, value } = condition;
  let fieldValue: unknown;

  switch (field) {
    case "status":
      fieldValue = applicant.status;
      break;
    case "opened_email":
      fieldValue = (applicant.emailEngagement?.emailsOpened ?? 0) > 0;
      break;
    case "clicked_email":
      fieldValue = (applicant.emailEngagement?.emailsClicked ?? 0) > 0;
      break;
    case "in_segment":
      fieldValue = applicant.segments?.some((s) => s._ref === value) ?? false;
      break;
    case "preferredPositions":
      fieldValue = applicant.preferredPositions || [];
      break;
    default:
      fieldValue = (applicant as unknown as Record<string, unknown>)[field];
  }

  switch (operator) {
    case "eq":
      return String(fieldValue) === value;
    case "neq":
      return String(fieldValue) !== value;
    case "contains":
      if (Array.isArray(fieldValue)) {
        return fieldValue.includes(value);
      }
      return String(fieldValue).includes(value || "");
    case "isTrue":
      return fieldValue === true;
    case "isFalse":
      return fieldValue === false;
    default:
      return false;
  }
}

/**
 * Trigger flows for a new submission
 */
export async function triggerNewSubmissionFlows(
  applicant: DraftApplicant
): Promise<FlowExecutionResult[]> {
  const flows = await getActiveFlowsByTrigger("new_submission");
  const results: FlowExecutionResult[] = [];

  for (const flow of flows) {
    // Enroll applicant
    await enrollApplicantInFlow(applicant._id, flow._id, 0);

    // Update stats
    const currentStats = flow.stats || {
      totalEnrolled: 0,
      currentlyActive: 0,
      completed: 0,
      exited: 0,
      emailsSent: 0,
      emailsOpened: 0,
      emailsClicked: 0,
    };

    await updateFlowStats(flow._id, {
      totalEnrolled: currentStats.totalEnrolled + 1,
      currentlyActive: currentStats.currentlyActive + 1,
    });

    // Execute first step
    const result = await executeFlowStep(applicant, flow, 0);
    results.push(result);
  }

  return results;
}

/**
 * Trigger flows for a status change
 */
export async function triggerStatusChangeFlows(
  applicant: DraftApplicant,
  oldStatus: ApplicantStatus | null,
  newStatus: ApplicantStatus
): Promise<FlowExecutionResult[]> {
  const flows = await getFlowsTriggeredByStatusChange(oldStatus, newStatus);
  const results: FlowExecutionResult[] = [];

  for (const flow of flows) {
    // Check if applicant should exit existing flows
    if (flow.enrollmentSettings?.exitOnStatusChange?.includes(newStatus)) {
      // Exit the flow
      await updateFlowEnrollment(applicant._id, flow._id, {
        status: "exited",
      });
      continue;
    }

    // Check re-enrollment rules
    const existingEnrollment = applicant.flowEnrollments?.find(
      (e) => e.flow._ref === flow._id
    );

    if (existingEnrollment && !flow.enrollmentSettings?.allowReenrollment) {
      continue; // Already enrolled, skip
    }

    // Enroll and execute
    await enrollApplicantInFlow(applicant._id, flow._id, 0);
    const result = await executeFlowStep(applicant, flow, 0);
    results.push(result);
  }

  return results;
}

/**
 * Trigger flows for segment entry/exit
 */
export async function triggerSegmentFlows(
  applicant: DraftApplicant,
  segmentId: string,
  event: "entry" | "exit"
): Promise<FlowExecutionResult[]> {
  const flows = await getFlowsTriggeredBySegment(segmentId, event);
  const results: FlowExecutionResult[] = [];

  for (const flow of flows) {
    await enrollApplicantInFlow(applicant._id, flow._id, 0);
    const result = await executeFlowStep(applicant, flow, 0);
    results.push(result);
  }

  return results;
}

/**
 * Process pending flow steps (called by cron job)
 * Finds all applicants with scheduled next steps and executes them
 */
export async function processPendingFlowSteps(): Promise<{
  processed: number;
  emailsSent: number;
  errors: string[];
}> {
  const now = new Date().toISOString();
  let processed = 0;
  let emailsSent = 0;
  const errors: string[] = [];

  // Find applicants with pending steps
  const applicantsWithPending = await cdpClient.fetch<DraftApplicant[]>(
    `*[_type == "draftApplicant" && defined(flowEnrollments) && 
       flowEnrollments[status == "active" && nextStepAt < $now]._ref != null]`,
    { now }
  );

  for (const applicant of applicantsWithPending) {
    if (!applicant.flowEnrollments) continue;

    for (const enrollment of applicant.flowEnrollments) {
      if (
        enrollment.status !== "active" ||
        !enrollment.nextStepAt ||
        new Date(enrollment.nextStepAt) > new Date()
      ) {
        continue;
      }

      try {
        const flow = await getEmailFlow(enrollment.flow._ref);
        if (!flow) continue;

        const result = await executeFlowStep(applicant, flow, enrollment.currentStep);
        processed++;
        
        // Count emails sent
        if (result.action === "sent_email" && !result.error) {
          emailsSent++;
        }
      } catch (error) {
        const errorMsg = `Failed to process flow ${enrollment.flow._ref} for ${applicant.email}: ${error}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }
  }

  return { processed, emailsSent, errors };
}
