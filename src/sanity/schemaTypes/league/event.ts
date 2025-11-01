import { defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'League Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Event Title',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'description',
      type: 'blockContent',
      title: 'Event Description',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventType',
      type: 'string',
      title: 'Event Type',
      options: {
        list: [
          { title: 'Match', value: 'match' },
          { title: 'Training Session', value: 'training' },
          { title: 'Impact Activity', value: 'impact-activity' },
          { title: 'Social Media Campaign', value: 'social-campaign' },
          { title: 'Community Outreach', value: 'community-outreach' },
          { title: 'Fundraising Event', value: 'fundraising' },
          { title: 'Team Building', value: 'team-building' },
          { title: 'Awards Ceremony', value: 'awards' },
          { title: 'Season Kickoff', value: 'season-kickoff' },
          { title: 'Season Finale', value: 'season-finale' },
          { title: 'Media Day', value: 'media-day' },
          { title: 'Volunteer Activity', value: 'volunteer' },
          { title: 'Workshop/Training', value: 'workshop' },
          { title: 'Networking Event', value: 'networking' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateTime',
      type: 'object',
      title: 'Event Date & Time',
      fields: [
        {
          name: 'startDateTime',
          type: 'datetime',
          title: 'Start Date & Time',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'endDateTime',
          type: 'datetime',
          title: 'End Date & Time',
        },
        {
          name: 'isAllDay',
          type: 'boolean',
          title: 'All Day Event',
          initialValue: false,
        },
        {
          name: 'timezone',
          type: 'string',
          title: 'Timezone',
          initialValue: 'UTC',
        },
        {
          name: 'recurring',
          type: 'boolean',
          title: 'Recurring Event',
          initialValue: false,
        },
        {
          name: 'recurrencePattern',
          type: 'string',
          title: 'Recurrence Pattern',
          options: {
            list: [
              { title: 'Daily', value: 'daily' },
              { title: 'Weekly', value: 'weekly' },
              { title: 'Bi-weekly', value: 'bi-weekly' },
              { title: 'Monthly', value: 'monthly' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          hidden: ({ parent }) => !parent?.recurring,
        },
        {
          name: 'recurrenceEnd',
          type: 'date',
          title: 'Recurrence End Date',
          hidden: ({ parent }) => !parent?.recurring,
        },
      ],
    }),
    defineField({
      name: 'location',
      type: 'object',
      title: 'Event Location',
      fields: [
        {
          name: 'venue',
          type: 'reference',
          title: 'Venue',
          to: [{ type: 'venue' }],
        },
        {
          name: 'customLocation',
          type: 'string',
          title: 'Custom Location',
          description: 'Use if venue is not in the system',
        },
        {
          name: 'address',
          type: 'text',
          title: 'Address',
          rows: 2,
        },
        {
          name: 'coordinates',
          type: 'object',
          title: 'GPS Coordinates',
          fields: [
            {
              name: 'lat',
              type: 'number',
              title: 'Latitude',
            },
            {
              name: 'lng',
              type: 'number',
              title: 'Longitude',
            },
          ],
        },
        {
          name: 'isVirtual',
          type: 'boolean',
          title: 'Virtual Event',
          initialValue: false,
        },
        {
          name: 'virtualLink',
          type: 'string',
          title: 'Virtual Meeting Link',
          hidden: ({ parent }) => !parent?.isVirtual,
        },
        {
          name: 'directions',
          type: 'text',
          title: 'Special Directions',
          rows: 2,
        },
      ],
    }),
    defineField({
      name: 'participants',
      type: 'object',
      title: 'Event Participants',
      fields: [
        {
          name: 'targetAudience',
          type: 'string',
          title: 'Target Audience',
          options: {
            list: [
              { title: 'All League Members', value: 'all' },
              { title: 'Specific Teams', value: 'teams' },
              { title: 'Specific Players', value: 'players' },
              { title: 'Team Captains', value: 'captains' },
              { title: 'Coaches & Staff', value: 'coaches' },
              { title: 'League Admins', value: 'admins' },
              { title: 'Public/Community', value: 'public' },
              { title: 'Volunteers', value: 'volunteers' },
              { title: 'Media', value: 'media' },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'invitedTeams',
          type: 'array',
          title: 'Invited Teams',
          of: [{ type: 'reference', to: [{ type: 'team' }] }],
          hidden: ({ parent }) => parent?.targetAudience !== 'teams',
        },
        {
          name: 'invitedPlayers',
          type: 'array',
          title: 'Invited Players',
          of: [{ type: 'reference', to: [{ type: 'player' }] }],
          hidden: ({ parent }) => parent?.targetAudience !== 'players',
        },
        {
          name: 'maxAttendees',
          type: 'number',
          title: 'Maximum Attendees',
          validation: (Rule) => Rule.min(1),
        },
        {
          name: 'requiresRSVP',
          type: 'boolean',
          title: 'Requires RSVP',
          initialValue: true,
        },
        {
          name: 'rsvpDeadline',
          type: 'datetime',
          title: 'RSVP Deadline',
          hidden: ({ parent }) => !parent?.requiresRSVP,
        },
        {
          name: 'attendees',
          type: 'array',
          title: 'Confirmed Attendees',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'player',
                  type: 'reference',
                  title: 'Player',
                  to: [{ type: 'player' }],
                },
                {
                  name: 'status',
                  type: 'string',
                  title: 'RSVP Status',
                  options: {
                    list: [
                      { title: 'Going', value: 'going' },
                      { title: 'Maybe', value: 'maybe' },
                      { title: 'Not Going', value: 'not-going' },
                      { title: 'No Response', value: 'no-response' },
                    ],
                  },
                },
                {
                  name: 'rsvpAt',
                  type: 'datetime',
                  title: 'RSVP Date',
                },
                {
                  name: 'notes',
                  type: 'text',
                  title: 'Notes',
                  rows: 2,
                },
              ],
            },
          ],
          readOnly: true,
        },
      ],
    }),
    defineField({
      name: 'organization',
      type: 'object',
      title: 'Event Organization',
      fields: [
        {
          name: 'organizer',
          type: 'object',
          title: 'Event Organizer',
          fields: [
            {
              name: 'organizerType',
              type: 'string',
              title: 'Organizer Type',
              options: {
                list: [
                  { title: 'League Administration', value: 'league' },
                  { title: 'Team', value: 'team' },
                  { title: 'Player Initiative', value: 'player' },
                  { title: 'Community Partner', value: 'partner' },
                  { title: 'Sponsor', value: 'sponsor' },
                ],
              },
            },
            {
              name: 'organizingTeam',
              type: 'reference',
              title: 'Organizing Team',
              to: [{ type: 'team' }],
              hidden: ({ parent }) => parent?.organizerType !== 'team',
            },
            {
              name: 'organizingPlayer',
              type: 'reference',
              title: 'Organizing Player',
              to: [{ type: 'player' }],
              hidden: ({ parent }) => parent?.organizerType !== 'player',
            },
            {
              name: 'partnerName',
              type: 'string',
              title: 'Partner/Sponsor Name',
              hidden: ({ parent }) => !['partner', 'sponsor'].includes(parent?.organizerType),
            },
          ],
        },
        {
          name: 'coordinators',
          type: 'array',
          title: 'Event Coordinators',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'player',
                  type: 'reference',
                  title: 'Coordinator',
                  to: [{ type: 'player' }],
                },
                {
                  name: 'role',
                  type: 'string',
                  title: 'Coordination Role',
                  options: {
                    list: [
                      { title: 'Lead Coordinator', value: 'lead' },
                      { title: 'Logistics', value: 'logistics' },
                      { title: 'Communications', value: 'communications' },
                      { title: 'Volunteers', value: 'volunteers' },
                      { title: 'Media', value: 'media' },
                      { title: 'Impact Tracking', value: 'impact' },
                    ],
                  },
                },
                {
                  name: 'contactInfo',
                  type: 'string',
                  title: 'Contact Information',
                },
              ],
            },
          ],
        },
        {
          name: 'volunteers',
          type: 'object',
          title: 'Volunteer Management',
          fields: [
            {
              name: 'volunteersNeeded',
              type: 'number',
              title: 'Volunteers Needed',
            },
            {
              name: 'volunteerRoles',
              type: 'array',
              title: 'Volunteer Roles',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'role',
                      type: 'string',
                      title: 'Role Name',
                    },
                    {
                      name: 'description',
                      type: 'text',
                      title: 'Role Description',
                      rows: 2,
                    },
                    {
                      name: 'slotsNeeded',
                      type: 'number',
                      title: 'Slots Needed',
                    },
                    {
                      name: 'timeCommitment',
                      type: 'string',
                      title: 'Time Commitment',
                    },
                  ],
                },
              ],
            },
            {
              name: 'volunteerSignups',
              type: 'array',
              title: 'Volunteer Signups',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'volunteer',
                      type: 'reference',
                      title: 'Volunteer',
                      to: [{ type: 'player' }],
                    },
                    {
                      name: 'role',
                      type: 'string',
                      title: 'Assigned Role',
                    },
                    {
                      name: 'signupDate',
                      type: 'datetime',
                      title: 'Signup Date',
                    },
                    {
                      name: 'confirmed',
                      type: 'boolean',
                      title: 'Confirmed',
                      initialValue: false,
                    },
                  ],
                },
              ],
              readOnly: true,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'impact',
      type: 'object',
      title: 'Social Impact Elements',
      fields: [
        {
          name: 'sdgGoals',
          type: 'array',
          title: 'UN SDG Goals Addressed',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: '1. No Poverty', value: 'no-poverty' },
              { title: '2. Zero Hunger', value: 'zero-hunger' },
              { title: '3. Good Health', value: 'good-health' },
              { title: '4. Quality Education', value: 'quality-education' },
              { title: '5. Gender Equality', value: 'gender-equality' },
              { title: '6. Clean Water', value: 'clean-water' },
              { title: '7. Affordable Energy', value: 'affordable-energy' },
              { title: '8. Decent Work', value: 'decent-work' },
              { title: '9. Innovation', value: 'innovation' },
              { title: '10. Reduced Inequalities', value: 'reduced-inequalities' },
              { title: '11. Sustainable Cities', value: 'sustainable-cities' },
              { title: '12. Responsible Consumption', value: 'responsible-consumption' },
              { title: '13. Climate Action', value: 'climate-action' },
              { title: '14. Life Below Water', value: 'life-below-water' },
              { title: '15. Life on Land', value: 'life-on-land' },
              { title: '16. Peace & Justice', value: 'peace-justice' },
              { title: '17. Partnerships', value: 'partnerships' },
            ],
          },
        },
        {
          name: 'impactGoals',
          type: 'object',
          title: 'Impact Goals',
          fields: [
            {
              name: 'fundraisingTarget',
              type: 'number',
              title: 'Fundraising Target ($)',
            },
            {
              name: 'volunteerHoursTarget',
              type: 'number',
              title: 'Volunteer Hours Target',
            },
            {
              name: 'participantsTarget',
              type: 'number',
              title: 'Community Participants Target',
            },
            {
              name: 'awarenessTarget',
              type: 'number',
              title: 'Social Media Reach Target',
            },
          ],
        },
        {
          name: 'partnerships',
          type: 'array',
          title: 'Community Partnerships',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'organization',
                  type: 'string',
                  title: 'Partner Organization',
                },
                {
                  name: 'type',
                  type: 'string',
                  title: 'Partnership Type',
                  options: {
                    list: [
                      { title: 'Beneficiary', value: 'beneficiary' },
                      { title: 'Collaborator', value: 'collaborator' },
                      { title: 'Sponsor', value: 'sponsor' },
                      { title: 'Venue Provider', value: 'venue' },
                      { title: 'Media Partner', value: 'media' },
                    ],
                  },
                },
                {
                  name: 'contact',
                  type: 'string',
                  title: 'Contact Person',
                },
                {
                  name: 'contribution',
                  type: 'text',
                  title: 'Their Contribution',
                  rows: 2,
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'media',
      type: 'object',
      title: 'Media & Documentation',
      fields: [
        {
          name: 'eventImage',
          type: 'image',
          title: 'Event Promotional Image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'gallery',
          type: 'array',
          title: 'Event Gallery',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
        {
          name: 'socialMediaPlan',
          type: 'object',
          title: 'Social Media Plan',
          fields: [
            {
              name: 'hashtags',
              type: 'array',
              title: 'Event Hashtags',
              of: [{ type: 'string' }],
            },
            {
              name: 'prePlanning',
              type: 'array',
              title: 'Pre-Event Posts',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'platform',
                      type: 'string',
                      title: 'Platform',
                      options: {
                        list: [
                          { title: 'Instagram', value: 'instagram' },
                          { title: 'TikTok', value: 'tiktok' },
                          { title: 'Twitter', value: 'twitter' },
                          { title: 'LinkedIn', value: 'linkedin' },
                        ],
                      },
                    },
                    {
                      name: 'content',
                      type: 'text',
                      title: 'Post Content',
                      rows: 3,
                    },
                    {
                      name: 'scheduledTime',
                      type: 'datetime',
                      title: 'Scheduled Time',
                    },
                  ],
                },
              ],
            },
            {
              name: 'liveUpdates',
              type: 'boolean',
              title: 'Live Social Updates',
              initialValue: false,
            },
          ],
        },
        {
          name: 'mediaContacts',
          type: 'array',
          title: 'Media Contacts',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'outlet',
                  type: 'string',
                  title: 'Media Outlet',
                },
                {
                  name: 'contactPerson',
                  type: 'string',
                  title: 'Contact Person',
                },
                {
                  name: 'email',
                  type: 'string',
                  title: 'Email',
                },
                {
                  name: 'invited',
                  type: 'boolean',
                  title: 'Invited',
                  initialValue: false,
                },
                {
                  name: 'confirmed',
                  type: 'boolean',
                  title: 'Confirmed Attendance',
                  initialValue: false,
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'logistics',
      type: 'object',
      title: 'Event Logistics',
      fields: [
        {
          name: 'equipment',
          type: 'array',
          title: 'Equipment Needed',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'item',
                  type: 'string',
                  title: 'Equipment Item',
                },
                {
                  name: 'quantity',
                  type: 'number',
                  title: 'Quantity',
                },
                {
                  name: 'responsible',
                  type: 'string',
                  title: 'Responsible Person/Team',
                },
                {
                  name: 'status',
                  type: 'string',
                  title: 'Status',
                  options: {
                    list: [
                      { title: 'Needed', value: 'needed' },
                      { title: 'Secured', value: 'secured' },
                      { title: 'Delivered', value: 'delivered' },
                    ],
                  },
                  initialValue: 'needed',
                },
              ],
            },
          ],
        },
        {
          name: 'catering',
          type: 'object',
          title: 'Catering Information',
          fields: [
            {
              name: 'provided',
              type: 'boolean',
              title: 'Food/Drinks Provided',
              initialValue: false,
            },
            {
              name: 'menu',
              type: 'text',
              title: 'Menu Details',
              rows: 3,
              hidden: ({ parent }) => !parent?.provided,
            },
            {
              name: 'dietaryOptions',
              type: 'array',
              title: 'Dietary Options',
              of: [{ type: 'string' }],
              hidden: ({ parent }) => !parent?.provided,
            },
            {
              name: 'caterer',
              type: 'string',
              title: 'Caterer/Provider',
              hidden: ({ parent }) => !parent?.provided,
            },
          ],
        },
        {
          name: 'transportation',
          type: 'object',
          title: 'Transportation',
          fields: [
            {
              name: 'provided',
              type: 'boolean',
              title: 'Transportation Provided',
              initialValue: false,
            },
            {
              name: 'details',
              type: 'text',
              title: 'Transportation Details',
              rows: 2,
              hidden: ({ parent }) => !parent?.provided,
            },
            {
              name: 'meetingPoint',
              type: 'string',
              title: 'Meeting Point',
              hidden: ({ parent }) => !parent?.provided,
            },
            {
              name: 'departureTime',
              type: 'datetime',
              title: 'Departure Time',
              hidden: ({ parent }) => !parent?.provided,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'budget',
      type: 'object',
      title: 'Event Budget',
      fields: [
        {
          name: 'totalBudget',
          type: 'number',
          title: 'Total Budget ($)',
        },
        {
          name: 'expenses',
          type: 'array',
          title: 'Budget Items',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'category',
                  type: 'string',
                  title: 'Expense Category',
                  options: {
                    list: [
                      { title: 'Venue', value: 'venue' },
                      { title: 'Catering', value: 'catering' },
                      { title: 'Equipment', value: 'equipment' },
                      { title: 'Transportation', value: 'transportation' },
                      { title: 'Marketing', value: 'marketing' },
                      { title: 'Supplies', value: 'supplies' },
                      { title: 'Staff/Volunteers', value: 'staff' },
                      { title: 'Insurance', value: 'insurance' },
                      { title: 'Other', value: 'other' },
                    ],
                  },
                },
                {
                  name: 'description',
                  type: 'string',
                  title: 'Item Description',
                },
                {
                  name: 'estimated',
                  type: 'number',
                  title: 'Estimated Cost ($)',
                },
                {
                  name: 'actual',
                  type: 'number',
                  title: 'Actual Cost ($)',
                },
                {
                  name: 'status',
                  type: 'string',
                  title: 'Payment Status',
                  options: {
                    list: [
                      { title: 'Pending', value: 'pending' },
                      { title: 'Approved', value: 'approved' },
                      { title: 'Paid', value: 'paid' },
                      { title: 'Cancelled', value: 'cancelled' },
                    ],
                  },
                  initialValue: 'pending',
                },
              ],
            },
          ],
        },
        {
          name: 'fundingSources',
          type: 'array',
          title: 'Funding Sources',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'source',
                  type: 'string',
                  title: 'Funding Source',
                  options: {
                    list: [
                      { title: 'League Budget', value: 'league' },
                      { title: 'Team Fundraising', value: 'team' },
                      { title: 'Sponsorship', value: 'sponsorship' },
                      { title: 'Community Grants', value: 'grants' },
                      { title: 'Registration Fees', value: 'registration' },
                      { title: 'Donations', value: 'donations' },
                    ],
                  },
                },
                {
                  name: 'amount',
                  type: 'number',
                  title: 'Amount ($)',
                },
                {
                  name: 'confirmed',
                  type: 'boolean',
                  title: 'Confirmed',
                  initialValue: false,
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Event Status',
      options: {
        list: [
          { title: 'Planning', value: 'planning' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Postponed', value: 'postponed' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'planning',
    }),
    defineField({
      name: 'results',
      type: 'object',
      title: 'Event Results & Impact',
      fields: [
        {
          name: 'attendance',
          type: 'object',
          title: 'Attendance Numbers',
          fields: [
            {
              name: 'expectedAttendees',
              type: 'number',
              title: 'Expected Attendees',
            },
            {
              name: 'actualAttendees',
              type: 'number',
              title: 'Actual Attendees',
            },
            {
              name: 'noShows',
              type: 'number',
              title: 'No-Shows',
            },
            {
              name: 'walkIns',
              type: 'number',
              title: 'Walk-ins',
            },
          ],
        },
        {
          name: 'impactResults',
          type: 'object',
          title: 'Impact Results',
          fields: [
            {
              name: 'fundsRaised',
              type: 'number',
              title: 'Funds Raised ($)',
            },
            {
              name: 'volunteerHours',
              type: 'number',
              title: 'Volunteer Hours Contributed',
            },
            {
              name: 'communityReach',
              type: 'number',
              title: 'Community Members Reached',
            },
            {
              name: 'socialMediaReach',
              type: 'number',
              title: 'Social Media Reach',
            },
            {
              name: 'mediaMatches',
              type: 'number',
              title: 'Media Stories Generated',
            },
          ],
        },
        {
          name: 'feedback',
          type: 'object',
          title: 'Event Feedback',
          fields: [
            {
              name: 'surveyResponses',
              type: 'number',
              title: 'Survey Responses',
            },
            {
              name: 'averageRating',
              type: 'number',
              title: 'Average Rating (1-5)',
              validation: (Rule) => Rule.min(1).max(5),
            },
            {
              name: 'highlights',
              type: 'array',
              title: 'Event Highlights',
              of: [{ type: 'string' }],
            },
            {
              name: 'improvements',
              type: 'array',
              title: 'Areas for Improvement',
              of: [{ type: 'string' }],
            },
          ],
        },
        {
          name: 'documentation',
          type: 'object',
          title: 'Event Documentation',
          fields: [
            {
              name: 'finalReport',
              type: 'file',
              title: 'Final Event Report',
            },
            {
              name: 'mediaKit',
              type: 'file',
              title: 'Media Kit/Press Release',
            },
            {
              name: 'photos',
              type: 'array',
              title: 'Event Photos',
              of: [
                {
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                },
              ],
            },
            {
              name: 'videos',
              type: 'array',
              title: 'Event Videos',
              of: [
                {
                  type: 'file',
                  options: {
                    accept: 'video/*',
                  },
                },
              ],
            },
          ],
        },
      ],
      hidden: ({ document }) => document?.status !== 'completed',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  orderings: [
    {
      title: 'Event Date (Upcoming)',
      name: 'dateAsc',
      by: [{ field: 'dateTime.startDateTime', direction: 'asc' }],
    },
    {
      title: 'Event Date (Recent)',
      name: 'dateDesc',
      by: [{ field: 'dateTime.startDateTime', direction: 'desc' }],
    },
    {
      title: 'Event Type',
      name: 'type',
      by: [
        { field: 'eventType', direction: 'asc' },
        { field: 'dateTime.startDateTime', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      eventType: 'eventType',
      startDate: 'dateTime.startDateTime',
      status: 'status',
      venue: 'location.venue.name',
      customLocation: 'location.customLocation',
    },
    prepare({ title, eventType, startDate, status, venue, customLocation }) {
      const typeEmojis = {
        match: '⚽',
        training: '🏃',
        'impact-activity': '💫',
        'social-campaign': '📱',
        'community-outreach': '🤝',
        fundraising: '💰',
        'team-building': '🎯',
        awards: '🏆',
        'season-kickoff': '🚀',
        'season-finale': '🎉',
        'media-day': '📸',
        volunteer: '🙋',
        workshop: '📚',
        networking: '🌐',
      };

      const statusEmojis = {
        planning: '📋',
        confirmed: '✅',
        cancelled: '❌',
        postponed: '⏸️',
        'in-progress': '🔄',
        completed: '✨',
      };

      const date = startDate ? new Date(startDate).toLocaleDateString() : '';
      const location = venue || customLocation || 'TBD';
      
      const subtitle = [
        statusEmojis[status as keyof typeof statusEmojis] || '',
        date,
        location,
      ]
        .filter(Boolean)
        .join(' • ');

      return {
        title: `${typeEmojis[eventType as keyof typeof typeEmojis] || '📅'} ${title}`,
        subtitle,
      };
    },
  },
})