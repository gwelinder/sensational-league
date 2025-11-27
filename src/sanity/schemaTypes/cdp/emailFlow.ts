import { defineField, defineType } from "sanity";

/**
 * Email Flow - Automated email sequences
 * 
 * Flows are triggered by:
 * - New applicant submission
 * - Status change
 * - Segment entry/exit
 * - Manual enrollment
 * - Time-based (re-engagement)
 * 
 * Each flow consists of steps with delays and conditions.
 */
export const emailFlow = defineType({
  name: "emailFlow",
  title: "Email Flow",
  type: "document",
  groups: [
    { name: "settings", title: "Settings", default: true },
    { name: "trigger", title: "Trigger" },
    { name: "steps", title: "Steps" },
    { name: "stats", title: "Statistics" },
  ],
  fields: [
    // === SETTINGS ===
    defineField({
      name: "name",
      title: "Flow Name",
      type: "string",
      group: "settings",
      validation: (Rule) => Rule.required(),
      description: "e.g., 'Welcome Sequence', 'Trial Reminder', 'Draft Results'",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "name",
        maxLength: 50,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "settings",
      rows: 2,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      group: "settings",
      initialValue: false,
      description: "Enable this flow to start enrolling new applicants",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "settings",
      options: {
        list: [
          { title: "Welcome / Onboarding", value: "welcome" },
          { title: "Nurture", value: "nurture" },
          { title: "Status Update", value: "status" },
          { title: "Re-engagement", value: "reengagement" },
          { title: "Announcement", value: "announcement" },
          { title: "Transactional", value: "transactional" },
        ],
      },
      initialValue: "welcome",
    }),

    // === TRIGGER CONFIGURATION ===
    defineField({
      name: "trigger",
      title: "Trigger",
      type: "object",
      group: "trigger",
      fields: [
        defineField({
          name: "type",
          title: "Trigger Type",
          type: "string",
          options: {
            list: [
              { title: "New Submission", value: "new_submission" },
              { title: "Status Change", value: "status_change" },
              { title: "Segment Entry", value: "segment_entry" },
              { title: "Segment Exit", value: "segment_exit" },
              { title: "Manual Only", value: "manual" },
              { title: "Date/Time Based", value: "scheduled" },
            ],
            layout: "radio",
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "statusTrigger",
          title: "Status Trigger",
          type: "object",
          hidden: ({ parent }) => parent?.type !== "status_change",
          fields: [
            defineField({
              name: "fromStatus",
              title: "From Status (optional)",
              type: "array",
              of: [{ type: "string" }],
              options: {
                list: [
                  { title: "Any", value: "any" },
                  { title: "New", value: "new" },
                  { title: "Under Review", value: "under_review" },
                  { title: "Shortlisted", value: "shortlisted" },
                  { title: "Invited to Trial", value: "invited_trial" },
                  { title: "Trial Completed", value: "trial_completed" },
                  { title: "Selected", value: "selected" },
                  { title: "Waitlisted", value: "waitlisted" },
                  { title: "Not Selected", value: "not_selected" },
                ],
              },
            }),
            defineField({
              name: "toStatus",
              title: "To Status",
              type: "array",
              of: [{ type: "string" }],
              options: {
                list: [
                  { title: "New", value: "new" },
                  { title: "Under Review", value: "under_review" },
                  { title: "Shortlisted", value: "shortlisted" },
                  { title: "Invited to Trial", value: "invited_trial" },
                  { title: "Trial Completed", value: "trial_completed" },
                  { title: "Selected", value: "selected" },
                  { title: "Waitlisted", value: "waitlisted" },
                  { title: "Not Selected", value: "not_selected" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        defineField({
          name: "segmentTrigger",
          title: "Segment Trigger",
          type: "reference",
          to: [{ type: "cdpSegment" }],
          hidden: ({ parent }) =>
            parent?.type !== "segment_entry" && parent?.type !== "segment_exit",
        }),
        defineField({
          name: "scheduleTrigger",
          title: "Schedule",
          type: "object",
          hidden: ({ parent }) => parent?.type !== "scheduled",
          fields: [
            defineField({
              name: "scheduleType",
              title: "Schedule Type",
              type: "string",
              options: {
                list: [
                  { title: "One-time", value: "once" },
                  { title: "Daily", value: "daily" },
                  { title: "Weekly", value: "weekly" },
                ],
              },
            }),
            defineField({
              name: "datetime",
              title: "Date/Time",
              type: "datetime",
            }),
            defineField({
              name: "targetSegment",
              title: "Target Segment",
              type: "reference",
              to: [{ type: "cdpSegment" }],
              description: "Which segment to send to",
            }),
          ],
        }),
      ],
    }),

    // === ENROLLMENT SETTINGS ===
    defineField({
      name: "enrollmentSettings",
      title: "Enrollment Settings",
      type: "object",
      group: "trigger",
      fields: [
        defineField({
          name: "allowReenrollment",
          title: "Allow Re-enrollment",
          type: "boolean",
          initialValue: false,
          description: "Can the same person be enrolled again after completing/exiting?",
        }),
        defineField({
          name: "reenrollmentDelay",
          title: "Re-enrollment Delay (days)",
          type: "number",
          hidden: ({ parent }) => !parent?.allowReenrollment,
          initialValue: 30,
        }),
        defineField({
          name: "exitOnUnsubscribe",
          title: "Exit on Unsubscribe",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "exitOnStatusChange",
          title: "Exit on Status Change To",
          type: "array",
          of: [{ type: "string" }],
          options: {
            list: [
              { title: "None", value: "none" },
              { title: "Selected", value: "selected" },
              { title: "Not Selected", value: "not_selected" },
              { title: "Withdrawn", value: "withdrawn" },
            ],
          },
        }),
      ],
    }),

    // === FLOW STEPS ===
    defineField({
      name: "steps",
      title: "Flow Steps",
      type: "array",
      group: "steps",
      of: [
        {
          type: "object",
          name: "emailStep",
          title: "Send Email",
          fields: [
            defineField({
              name: "stepName",
              title: "Step Name",
              type: "string",
              description: "Internal reference name",
            }),
            defineField({
              name: "delay",
              title: "Delay",
              type: "object",
              fields: [
                defineField({
                  name: "value",
                  title: "Value",
                  type: "number",
                  initialValue: 0,
                }),
                defineField({
                  name: "unit",
                  title: "Unit",
                  type: "string",
                  options: {
                    list: [
                      { title: "Minutes", value: "minutes" },
                      { title: "Hours", value: "hours" },
                      { title: "Days", value: "days" },
                    ],
                  },
                  initialValue: "days",
                }),
              ],
            }),
            defineField({
              name: "emailTemplate",
              title: "Email Template",
              type: "reference",
              to: [{ type: "emailTemplate" }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "condition",
              title: "Send Condition (Optional)",
              type: "object",
              description: "Only send if condition is met",
              fields: [
                defineField({
                  name: "field",
                  title: "Field",
                  type: "string",
                  options: {
                    list: [
                      { title: "No Condition", value: "none" },
                      { title: "Status", value: "status" },
                      { title: "Has Opened Previous", value: "opened_previous" },
                      { title: "Has Clicked Previous", value: "clicked_previous" },
                      { title: "Is in Segment", value: "in_segment" },
                    ],
                  },
                  initialValue: "none",
                }),
                defineField({
                  name: "value",
                  title: "Value",
                  type: "string",
                  hidden: ({ parent }) =>
                    parent?.field === "none" ||
                    parent?.field === "opened_previous" ||
                    parent?.field === "clicked_previous",
                }),
                defineField({
                  name: "segment",
                  title: "Segment",
                  type: "reference",
                  to: [{ type: "cdpSegment" }],
                  hidden: ({ parent }) => parent?.field !== "in_segment",
                }),
              ],
            }),
          ],
          preview: {
            select: {
              stepName: "stepName",
              templateTitle: "emailTemplate.name",
              delayValue: "delay.value",
              delayUnit: "delay.unit",
            },
            prepare({ stepName, templateTitle, delayValue, delayUnit }) {
              const delayText =
                delayValue && delayValue > 0
                  ? `Wait ${delayValue} ${delayUnit}`
                  : "Immediately";
              return {
                title: stepName || templateTitle || "Email Step",
                subtitle: `${delayText} → Send "${templateTitle || "email"}"`,
              };
            },
          },
        },
        {
          type: "object",
          name: "waitStep",
          title: "Wait",
          fields: [
            defineField({
              name: "waitType",
              title: "Wait Type",
              type: "string",
              options: {
                list: [
                  { title: "Fixed Duration", value: "duration" },
                  { title: "Until Event", value: "event" },
                  { title: "Until Date", value: "date" },
                ],
              },
              initialValue: "duration",
            }),
            defineField({
              name: "duration",
              title: "Duration",
              type: "object",
              hidden: ({ parent }) => parent?.waitType !== "duration",
              fields: [
                defineField({
                  name: "value",
                  title: "Value",
                  type: "number",
                }),
                defineField({
                  name: "unit",
                  title: "Unit",
                  type: "string",
                  options: {
                    list: [
                      { title: "Hours", value: "hours" },
                      { title: "Days", value: "days" },
                      { title: "Weeks", value: "weeks" },
                    ],
                  },
                  initialValue: "days",
                }),
              ],
            }),
            defineField({
              name: "waitForEvent",
              title: "Wait for Event",
              type: "string",
              hidden: ({ parent }) => parent?.waitType !== "event",
              options: {
                list: [
                  { title: "Email Opened", value: "email_opened" },
                  { title: "Email Clicked", value: "email_clicked" },
                  { title: "Status Changed", value: "status_changed" },
                ],
              },
            }),
            defineField({
              name: "maxWait",
              title: "Max Wait (days)",
              type: "number",
              hidden: ({ parent }) => parent?.waitType !== "event",
              description: "Continue flow after this many days even if event doesn't occur",
            }),
          ],
          preview: {
            select: {
              waitType: "waitType",
              durationValue: "duration.value",
              durationUnit: "duration.unit",
              waitForEvent: "waitForEvent",
            },
            prepare({ waitType, durationValue, durationUnit, waitForEvent }) {
              if (waitType === "duration") {
                return {
                  title: "Wait",
                  subtitle: `${durationValue || 0} ${durationUnit || "days"}`,
                };
              }
              return {
                title: "Wait for Event",
                subtitle: waitForEvent || "event",
              };
            },
          },
        },
        {
          type: "object",
          name: "branchStep",
          title: "Branch (If/Else)",
          fields: [
            defineField({
              name: "branchName",
              title: "Branch Name",
              type: "string",
            }),
            defineField({
              name: "condition",
              title: "Condition",
              type: "object",
              fields: [
                defineField({
                  name: "field",
                  title: "Field",
                  type: "string",
                  options: {
                    list: [
                      { title: "Status", value: "status" },
                      { title: "Has Opened Email", value: "opened_email" },
                      { title: "Has Clicked Email", value: "clicked_email" },
                      { title: "Is in Segment", value: "in_segment" },
                      { title: "Position Preference", value: "preferredPositions" },
                    ],
                  },
                }),
                defineField({
                  name: "operator",
                  title: "Operator",
                  type: "string",
                  options: {
                    list: [
                      { title: "Equals", value: "eq" },
                      { title: "Not Equals", value: "neq" },
                      { title: "Contains", value: "contains" },
                      { title: "Is True", value: "isTrue" },
                      { title: "Is False", value: "isFalse" },
                    ],
                  },
                }),
                defineField({
                  name: "value",
                  title: "Value",
                  type: "string",
                }),
              ],
            }),
            defineField({
              name: "ifTrueAction",
              title: "If True → Action",
              type: "string",
              options: {
                list: [
                  { title: "Continue to Next Step", value: "continue" },
                  { title: "Skip to Step", value: "skip" },
                  { title: "Exit Flow", value: "exit" },
                ],
              },
              initialValue: "continue",
            }),
            defineField({
              name: "skipToStep",
              title: "Skip to Step Number",
              type: "number",
              hidden: ({ parent }) => parent?.ifTrueAction !== "skip",
            }),
            defineField({
              name: "ifFalseAction",
              title: "If False → Action",
              type: "string",
              options: {
                list: [
                  { title: "Continue to Next Step", value: "continue" },
                  { title: "Skip to Step", value: "skip" },
                  { title: "Exit Flow", value: "exit" },
                ],
              },
              initialValue: "continue",
            }),
            defineField({
              name: "ifFalseSkipToStep",
              title: "Skip to Step Number",
              type: "number",
              hidden: ({ parent }) => parent?.ifFalseAction !== "skip",
            }),
          ],
          preview: {
            select: {
              branchName: "branchName",
              field: "condition.field",
              operator: "condition.operator",
              value: "condition.value",
            },
            prepare({ branchName, field, operator, value }) {
              return {
                title: branchName || "Branch",
                subtitle: `If ${field} ${operator} ${value || ""}`,
              };
            },
          },
        },
        {
          type: "object",
          name: "tagStep",
          title: "Add/Remove Tag",
          fields: [
            defineField({
              name: "action",
              title: "Action",
              type: "string",
              options: {
                list: [
                  { title: "Add Tag", value: "add" },
                  { title: "Remove Tag", value: "remove" },
                ],
              },
              initialValue: "add",
            }),
            defineField({
              name: "tag",
              title: "Tag",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              action: "action",
              tag: "tag",
            },
            prepare({ action, tag }) {
              return {
                title: action === "add" ? "Add Tag" : "Remove Tag",
                subtitle: tag || "No tag specified",
              };
            },
          },
        },
        {
          type: "object",
          name: "updateStatusStep",
          title: "Update Status",
          fields: [
            defineField({
              name: "newStatus",
              title: "New Status",
              type: "string",
              options: {
                list: [
                  { title: "Under Review", value: "under_review" },
                  { title: "Shortlisted", value: "shortlisted" },
                  { title: "Invited to Trial", value: "invited_trial" },
                  { title: "Trial Completed", value: "trial_completed" },
                  { title: "Selected", value: "selected" },
                  { title: "Waitlisted", value: "waitlisted" },
                  { title: "Not Selected", value: "not_selected" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              newStatus: "newStatus",
            },
            prepare({ newStatus }) {
              return {
                title: "Update Status",
                subtitle: `→ ${newStatus?.replace("_", " ") || "unknown"}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // === STATISTICS ===
    defineField({
      name: "stats",
      title: "Flow Statistics",
      type: "object",
      group: "stats",
      readOnly: true,
      fields: [
        defineField({
          name: "totalEnrolled",
          title: "Total Enrolled",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "currentlyActive",
          title: "Currently Active",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "completed",
          title: "Completed",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "exited",
          title: "Exited Early",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "emailsSent",
          title: "Emails Sent",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "emailsOpened",
          title: "Emails Opened",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "emailsClicked",
          title: "Emails Clicked",
          type: "number",
          initialValue: 0,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      active: "active",
      triggerType: "trigger.type",
      totalEnrolled: "stats.totalEnrolled",
    },
    prepare({ title, active, triggerType, totalEnrolled }) {
      const triggerLabels: Record<string, string> = {
        new_submission: "New Submission",
        status_change: "Status Change",
        segment_entry: "Segment Entry",
        segment_exit: "Segment Exit",
        manual: "Manual",
        scheduled: "Scheduled",
      };
      return {
        title: title || "Untitled Flow",
        subtitle: `${active ? "Active" : "Inactive"} • ${triggerLabels[triggerType] || triggerType} • ${totalEnrolled || 0} enrolled`,
      };
    },
  },
  orderings: [
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Most Enrolled",
      name: "enrolledDesc",
      by: [{ field: "stats.totalEnrolled", direction: "desc" }],
    },
  ],
});
