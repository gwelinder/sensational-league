import { defineField, defineType } from 'sanity'

export const contributorSettings = defineType({
  name: 'contributorSettings',
  title: 'Contributor Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Settings Title',
      description: 'Internal reference for these contributor settings',
      initialValue: 'Contributor Permissions',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roles',
      type: 'array',
      title: 'User Roles & Permissions',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'roleName',
              type: 'string',
              title: 'Role Name',
              description: 'e.g., "Content Editor", "League Manager", "Media Coordinator"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Role Description',
              description: 'What this role is responsible for',
              rows: 2,
            },
            {
              name: 'permissions',
              type: 'object',
              title: 'Permissions',
              fields: [
                {
                  name: 'canEditHomepage',
                  type: 'boolean',
                  title: 'Can Edit Homepage',
                  description: 'Permission to modify homepage sections',
                  initialValue: false,
                },
                {
                  name: 'canManageMedia',
                  type: 'boolean',
                  title: 'Can Manage Media',
                  description: 'Upload and manage images/videos',
                  initialValue: false,
                },
                {
                  name: 'canEditPolicies',
                  type: 'boolean',
                  title: 'Can Edit Policies',
                  description: 'Modify legal and policy documents',
                  initialValue: false,
                },
                {
                  name: 'canCreateSections',
                  type: 'boolean',
                  title: 'Can Create New Sections',
                  description: 'Add new content sections to pages',
                  initialValue: false,
                },
                {
                  name: 'canDeleteContent',
                  type: 'boolean',
                  title: 'Can Delete Content',
                  description: 'Remove content and sections',
                  initialValue: false,
                },
                {
                  name: 'canPublish',
                  type: 'boolean',
                  title: 'Can Publish Content',
                  description: 'Publish changes to live site',
                  initialValue: false,
                },
                {
                  name: 'canManageUsers',
                  type: 'boolean',
                  title: 'Can Manage Users',
                  description: 'Add/remove team members and assign roles',
                  initialValue: false,
                },
                {
                  name: 'canAccessAnalytics',
                  type: 'boolean',
                  title: 'Can Access Analytics',
                  description: 'View site and content performance data',
                  initialValue: false,
                },
                {
                  name: 'requiresApproval',
                  type: 'boolean',
                  title: 'Requires Content Approval',
                  description: 'Changes must be approved before publishing',
                  initialValue: true,
                },
              ],
            },
            {
              name: 'allowedSections',
              type: 'array',
              title: 'Allowed Section Types',
              description: 'Which section types this role can create/edit',
              of: [
                {
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Hero Sections', value: 'heroSection' },
                      { title: 'Advanced Hero Sections', value: 'advancedHeroSection' },
                      { title: 'Content Sections', value: 'contentSection' },
                      { title: 'Media Sections', value: 'mediaSection' },
                      { title: 'Statistics Sections', value: 'statsSection' },
                      { title: 'Signup Sections', value: 'signupSection' },
                      { title: 'Partners Sections', value: 'partnersSection' },
                      { title: 'All Section Types', value: '*' },
                    ],
                  },
                },
              ],
            },
            {
              name: 'editingRestrictions',
              type: 'object',
              title: 'Editing Restrictions',
              fields: [
                {
                  name: 'canEditBrandElements',
                  type: 'boolean',
                  title: 'Can Edit Brand Elements',
                  description: 'Modify logos, brand colors, and brand-specific settings',
                  initialValue: false,
                },
                {
                  name: 'canEditCriticalContent',
                  type: 'boolean',
                  title: 'Can Edit Critical Content',
                  description: 'Modify important announcements and key messaging',
                  initialValue: false,
                },
                {
                  name: 'maxSectionsPerPage',
                  type: 'number',
                  title: 'Max Sections Per Page',
                  description: 'Maximum number of sections this role can add to a page',
                  validation: (Rule) => Rule.min(0).max(20),
                  initialValue: 10,
                },
                {
                  name: 'allowedFileTypes',
                  type: 'array',
                  title: 'Allowed File Types',
                  description: 'Which file types this role can upload',
                  of: [
                    {
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Images (JPG, PNG, WebP)', value: 'images' },
                          { title: 'Videos (MP4, WebM)', value: 'videos' },
                          { title: 'Documents (PDF)', value: 'documents' },
                          { title: 'SVG Graphics', value: 'svg' },
                          { title: 'All File Types', value: '*' },
                        ],
                      },
                    },
                  ],
                  initialValue: ['images'],
                },
                {
                  name: 'maxFileSize',
                  type: 'number',
                  title: 'Max File Size (MB)',
                  description: 'Maximum file size this role can upload',
                  validation: (Rule) => Rule.min(1).max(100),
                  initialValue: 10,
                },
              ],
            },
            {
              name: 'workflowSettings',
              type: 'object',
              title: 'Workflow Settings',
              fields: [
                {
                  name: 'requiresReview',
                  type: 'boolean',
                  title: 'Requires Review Before Publishing',
                  description: 'Content changes must be reviewed by another role',
                  initialValue: true,
                },
                {
                  name: 'reviewerRoles',
                  type: 'array',
                  title: 'Who Can Review',
                  description: 'Which roles can approve this role\'s changes',
                  of: [{ type: 'string' }],
                  hidden: ({ parent }) => !parent?.requiresReview,
                },
                {
                  name: 'canSchedulePublishing',
                  type: 'boolean',
                  title: 'Can Schedule Publishing',
                  description: 'Schedule content to go live at specific times',
                  initialValue: false,
                },
                {
                  name: 'notificationSettings',
                  type: 'object',
                  title: 'Notification Settings',
                  fields: [
                    {
                      name: 'emailOnChanges',
                      type: 'boolean',
                      title: 'Email on Content Changes',
                      initialValue: false,
                    },
                    {
                      name: 'emailOnApproval',
                      type: 'boolean',
                      title: 'Email on Approval Needed',
                      initialValue: true,
                    },
                    {
                      name: 'slackIntegration',
                      type: 'boolean',
                      title: 'Slack Notifications',
                      initialValue: false,
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'roleName',
              subtitle: 'description',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'User Role',
                subtitle: subtitle || 'No description',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'contentWorkflows',
      type: 'object',
      title: 'Content Workflows',
      fields: [
        {
          name: 'approvalProcess',
          type: 'string',
          title: 'Approval Process',
          options: {
            list: [
              { title: 'Single Approval (One reviewer)', value: 'single' },
              { title: 'Multi-stage Approval (Multiple reviewers)', value: 'multi' },
              { title: 'Department Approval (By department)', value: 'department' },
              { title: 'No Approval Required', value: 'none' },
            ],
          },
          initialValue: 'single',
        },
        {
          name: 'emergencyBypass',
          type: 'boolean',
          title: 'Allow Emergency Bypass',
          description: 'Allow certain roles to bypass approval in emergencies',
          initialValue: true,
        },
        {
          name: 'emergencyRoles',
          type: 'array',
          title: 'Emergency Bypass Roles',
          description: 'Roles that can bypass approval process',
          of: [{ type: 'string' }],
          hidden: ({ parent }) => !parent?.emergencyBypass,
        },
        {
          name: 'autoPublishSchedule',
          type: 'object',
          title: 'Auto-Publish Schedule',
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enable Scheduled Publishing',
              initialValue: false,
            },
            {
              name: 'allowedHours',
              type: 'array',
              title: 'Allowed Publishing Hours',
              description: 'Hours when content can be auto-published (24-hour format)',
              of: [{ type: 'number' }],
              validation: (Rule) => Rule.unique(),
              hidden: ({ parent }) => !parent?.enabled,
            },
            {
              name: 'blackoutDates',
              type: 'array',
              title: 'Blackout Dates',
              description: 'Dates when auto-publishing is disabled',
              of: [{ type: 'date' }],
              hidden: ({ parent }) => !parent?.enabled,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'brandGuidelines',
      type: 'object',
      title: 'Brand Guidelines Enforcement',
      fields: [
        {
          name: 'enforceColorPalette',
          type: 'boolean',
          title: 'Enforce Brand Color Palette',
          description: 'Restrict color choices to approved brand colors',
          initialValue: true,
        },
        {
          name: 'enforceLogoUsage',
          type: 'boolean',
          title: 'Enforce Logo Usage Guidelines',
          description: 'Ensure logos are used according to brand guidelines',
          initialValue: true,
        },
        {
          name: 'enforceTypography',
          type: 'boolean',
          title: 'Enforce Typography Standards',
          description: 'Restrict font choices to brand-approved fonts',
          initialValue: true,
        },
        {
          name: 'requireAltText',
          type: 'boolean',
          title: 'Require Alt Text for Images',
          description: 'Force alt text entry for all uploaded images',
          initialValue: true,
        },
        {
          name: 'autoOptimizeImages',
          type: 'boolean',
          title: 'Auto-Optimize Images',
          description: 'Automatically optimize images for web performance',
          initialValue: true,
        },
        {
          name: 'warningMessages',
          type: 'array',
          title: 'Custom Warning Messages',
          description: 'Custom messages to display when guidelines are violated',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'trigger',
                  type: 'string',
                  title: 'Trigger Condition',
                  options: {
                    list: [
                      { title: 'Wrong color used', value: 'wrong-color' },
                      { title: 'Logo misused', value: 'logo-misuse' },
                      { title: 'Wrong font used', value: 'wrong-font' },
                      { title: 'Missing alt text', value: 'missing-alt' },
                      { title: 'File too large', value: 'file-size' },
                    ],
                  },
                },
                {
                  name: 'message',
                  type: 'text',
                  title: 'Warning Message',
                  rows: 2,
                },
                {
                  name: 'severity',
                  type: 'string',
                  title: 'Severity Level',
                  options: {
                    list: [
                      { title: 'Warning (Allow with notice)', value: 'warning' },
                      { title: 'Error (Block action)', value: 'error' },
                      { title: 'Info (Helpful tip)', value: 'info' },
                    ],
                  },
                  initialValue: 'warning',
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'integrations',
      type: 'object',
      title: 'External Integrations',
      fields: [
        {
          name: 'slackWebhooks',
          type: 'array',
          title: 'Slack Webhooks',
          description: 'Slack channels for notifications',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  type: 'string',
                  title: 'Channel Name',
                },
                {
                  name: 'webhookUrl',
                  type: 'url',
                  title: 'Webhook URL',
                },
                {
                  name: 'events',
                  type: 'array',
                  title: 'Notification Events',
                  of: [
                    {
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Content Published', value: 'publish' },
                          { title: 'Content Needs Review', value: 'review' },
                          { title: 'New User Added', value: 'user-added' },
                          { title: 'Error Occurred', value: 'error' },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'analyticsIntegration',
          type: 'object',
          title: 'Analytics Integration',
          fields: [
            {
              name: 'googleAnalytics',
              type: 'string',
              title: 'Google Analytics ID',
            },
            {
              name: 'trackContentChanges',
              type: 'boolean',
              title: 'Track Content Changes',
              description: 'Send content change events to analytics',
              initialValue: false,
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      rolesCount: 'roles.length',
    },
    prepare({ title, rolesCount }) {
      return {
        title: title || 'Contributor Settings',
        subtitle: `${rolesCount || 0} roles configured`,
      }
    },
  },
})