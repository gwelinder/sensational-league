/**
 * CDP (Customer Data Platform) Schema Types
 * 
 * This module contains all schemas related to the CDP functionality:
 * - draftApplicant: Player draft applicant profiles synced from SharePoint
 * - newsletterSubscriber: Newsletter subscriber profiles synced from SharePoint
 * - cdpSegment: Dynamic grouping of contacts for targeting
 * - emailFlow: Automated email sequences
 * - emailEvent: Email engagement tracking
 */

export { draftApplicant } from "./draftApplicant";
export { newsletterSubscriber } from "./newsletterSubscriber";
export { cdpSegment } from "./cdpSegment";
export { emailFlow } from "./emailFlow";
export { emailEvent } from "./emailEvent";
