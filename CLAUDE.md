# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About Sensational League

Sensational League is a revolutionary women's 7v7 football league that combines athletic excellence with social impact. The brand identity centers on being "Fast. Rebellious. Female." - representing unlimited potential through the spark logomark that symbolizes speed, creativity, and moments of greatness.

### Mission & Vision
- **Purpose**: Football as a force for good, where teams compete not just for goals but for positive impact aligned with UN Sustainable Development Goals
- **Values**: Empowerment of female athletes, social change through sport, community impact
- **Format**: 7v7 women's football with both on-pitch performance and off-pitch social impact scoring

### Brand Identity
- **Core Message**: "Play Football. Drive Impact. Change the World."
- **Visual Symbol**: The SPARK - representing speed, unlimited potential, and moments of greatness
- **Typography**: GT Standard (Expanded, Narrow, Standard Mono variants)
- **Primary Colors**: Off-white (#F7F7F7), Black (#232324), Volt Yellow (#D4FF00)
- **Secondary Colors**: Orange (#FF4400), Purple (#AE00FF), Cyan (#00FBFF)

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **CMS**: Sanity Studio v4 (embedded at `/studio`)
- **Styling**: Tailwind CSS v4 + styled-components
- **Type Safety**: TypeScript strict mode
- **Package Manager**: pnpm

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Run production server
pnpm start

# Run linting
pnpm lint

# Seed initial content (requires SANITY_API_TOKEN in .env.local)
pnpm seed:policies  # Seed legal policies
pnpm seed:home      # Seed homepage content
```

## Architecture Overview

### Content Management Structure
The app uses Sanity as a headless CMS with the following architecture:

1. **Studio Configuration** (`/studio` route)
   - Embedded Sanity Studio with custom branding
   - Custom logo component at `src/sanity/StudioLogo.tsx`
   - Structured content with singleton documents (homePage, siteSettings)

2. **Schema Types** (`src/sanity/schemaTypes/`)
   - `homePage`: Hero, signup, about, how-we-play sections
   - `policy`: Legal documents with rich text content
   - `siteSettings`: Global site configuration
   - `blockContent`: Portable Text schema for rich content

3. **Data Fetching**
   - Client configuration in `src/sanity/lib/client.ts`
   - Live preview support via `src/sanity/lib/live.ts`
   - Image handling via `@sanity/image-url`

### Page Structure
- **Home** (`/`): Landing page with waitlist signup
- **Policies** (`/policies`): Legal documents with anchor navigation
- **Studio** (`/studio`): Content management interface

### Component Organization
- `src/components/`: Shared UI components (Header, Footer, CookieBanner, SignupForm)
- `src/lib/portable-text.tsx`: Custom Portable Text renderer with brand styling
- `src/constants/`: Application constants (accessibility settings)

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
SANITY_API_TOKEN=your_token (for seeding scripts only)
SANITY_VIEWER_TOKEN=your_viewer_token (for visual editing and live preview)
```

## Design System Implementation

### Typography Usage
- Headlines: GT Standard Expanded Bold (all caps)
- Subheadings: GT Standard Expanded or Narrow
- Body: GT Standard Narrow Medium
- Monospace: GT Standard Mono Regular

### Color Application
- Use high contrast (black/white) for primary content
- Yellow (#D4FF00) for emphasis and CTAs
- Secondary colors only when yellow lacks sufficient contrast
- Maintain brand colors defined in `globals.css` as CSS variables

### Logo Implementation
- Primary spark mark for large applications (400px+)
- Medium version for 200-400px
- Small version for 75-150px
- Always ensure right-leaning movement direction
- Clearspace: 1/2 x-height for primary, full x-height for secondary mark

## Visual Editing & Drag-and-Drop Support

The application now includes full visual editing capabilities with drag-and-drop functionality, requiring no backend maintenance. Content editors can visually edit content directly on the page preview.

### Visual Editing Features
- **Presentation Tool**: Visual editing interface in Sanity Studio
- **Content Source Maps**: Automatic tracking of content origins
- **Stega Encoding**: Hidden metadata in content for visual overlays
- **Live Updates**: Real-time content synchronization
- **Drag & Drop**: Reorder content sections visually

### How Visual Editing Works

1. **Access Presentation Tool**:
   - Navigate to `/studio/presentation` in your browser
   - Select a document to edit
   - See live preview with clickable/draggable overlays

2. **Edit Content Visually**:
   - Click on any content element in the preview
   - Edit directly in the sidebar panel
   - Changes reflect instantly via Live Content API

3. **Drag & Drop Sections**:
   - Hover over content sections to see drag handles
   - Click and drag to reorder sections
   - Changes persist automatically to Sanity

4. **Draft Mode**:
   - Access draft preview at `/?draftMode=true`
   - See unpublished changes in real-time
   - "Disable draft mode" button appears for easy switching

### Technical Implementation

**Key Components**:
- `VisualEditing` component: Provides overlay UI for editing
- `SanityLive` component: Enables real-time updates
- `DisableDraftMode` component: Draft mode toggle UI
- Draft Mode API: `/api/draft-mode/enable` endpoint

**Configuration**:
```typescript
// Client with stega encoding (src/sanity/lib/client.ts)
export const client = createClient({
  // ... other config
  stega: {
    studioUrl: "/studio",
  },
})

// Live Content API (src/sanity/lib/live.ts)
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
```

**Required Environment Variables**:
```
SANITY_VIEWER_TOKEN=your_viewer_token  # Required for visual editing
```

### Visual Editing Best Practices

1. **Content Structure**: Keep content modular with clear section boundaries
2. **Performance**: Use `perspective: "published"` for production queries
3. **Security**: Never expose write tokens to the client
4. **UX**: Provide clear visual feedback during drag operations
5. **Testing**: Always test drag-and-drop in both desktop and touch devices

## Content Editing Workflow

### Standard Editing
1. Access Sanity Studio at `http://localhost:3000/studio`
2. Edit content through the visual interface
3. Changes are immediately reflected on the frontend
4. For new policies: Create Policy document → Set order → Publish

### Visual Editing with Drag & Drop
1. Access Presentation tool at `/studio/presentation`
2. Select the page you want to edit
3. Click on content to edit inline
4. Drag sections to reorder them
5. Changes save automatically
6. Publish when ready

## Testing & Quality

When implementing features:
1. Ensure TypeScript strict mode compliance
2. Run `pnpm lint` to check code style
3. Test responsive design (mobile-first approach)
4. Verify Sanity Studio functionality after changes
5. Check accessibility with semantic HTML

## Important Implementation Notes

- React Compiler is disabled in `next.config.ts` to ensure Sanity Studio compatibility
- The site uses both App Router patterns and styled-components for flexibility
- All branding assets follow the comprehensive brand guidelines (see `/public/SENSATIONAL LEAGUE - BRAND GUIDELINES.pdf`)
- Maintain the "Fast. Rebellious. Female." ethos in all UX decisions
- Focus on performance and motion - all directional movement should lean right to match the logo's forward momentum

## CDP (Customer Data Platform)

The CDP manages player draft applicants, email automation, and segmentation.

### CDP Architecture

```
src/lib/cdp/
├── index.ts           # Main exports
├── types.ts           # TypeScript types
├── sanityClient.ts    # Sanity CRUD operations
├── segmentEvaluator.ts # Dynamic segment rules engine
├── flowExecutor.ts    # Email flow automation
├── resendSync.ts      # Resend integration
└── syncFromTypeform.ts # Import from Typeform/SharePoint

src/sanity/schemaTypes/cdp/
├── draftApplicant.ts  # Player applicant profile
├── cdpSegment.ts      # Audience segments
├── emailFlow.ts       # Automation workflows
└── emailEvent.ts      # Email tracking events
```

### CDP Commands

```bash
# Seed CDP content
pnpm seed:player-draft-templates  # Email templates
pnpm seed:player-draft-flows      # Automation flows
pnpm seed:cdp-segments           # Audience segments
pnpm seed:cdp                    # All CDP content

# Sync & evaluate
pnpm sync:sharepoint-to-cdp      # Import applicants from SharePoint
pnpm cdp:evaluate-segments       # Evaluate segment membership
```

### CDP API Endpoints

- `GET /api/cdp?action=stats` - Get CDP statistics
- `POST /api/cdp?action=sync-segments` - Evaluate all segments (requires `x-api-key` header)
- `POST /api/cdp?action=sync-resend` - Sync segments to Resend (requires `x-api-key` header)
- `POST /api/cdp?action=process-flows` - Process pending email flow steps (requires `x-api-key` header)
- `GET /api/cron/cdp` - Cron job endpoint (requires `Authorization: Bearer <CRON_SECRET>`)
- `POST /api/cdp/resend-webhook` - Resend webhook for email events

### CDP Environment Variables

```bash
# Required for CDP API protection
CDP_API_KEY=your_secret_key

# Required for cron jobs
CRON_SECRET=your_cron_secret

# Required for email sending
RESEND_API_KEY=your_resend_key
RESEND_VERIFIED_DOMAIN=updates.sensationalleague.com

# Optional: Resend webhook verification
RESEND_WEBHOOK_SECRET=your_webhook_secret

# Required for SharePoint sync
SHAREPOINT_SITE_ID=your_site_id
SHAREPOINT_PLAYER_APPLICATIONS_LIST_ID=your_list_id
SHAREPOINT_NEWSLETTER_LIST_ID=your_newsletter_list_id
AZURE_TENANT_ID=your_tenant_id
AZURE_CLIENT_ID=your_client_id
AZURE_CLIENT_SECRET=your_client_secret
```

### Setting Up Resend Webhooks

1. Go to [Resend Dashboard](https://resend.com/webhooks)
2. Create a new webhook with URL: `https://your-domain.com/api/cdp/resend-webhook`
3. Select events: `email.sent`, `email.delivered`, `email.opened`, `email.clicked`, `email.bounced`, `email.complained`, `contact.unsubscribed`
4. Copy the signing secret to `RESEND_WEBHOOK_SECRET`

### Vercel Cron Configuration

The `vercel.json` file configures automatic flow processing every 5 minutes:

```json
{
  "crons": [{
    "path": "/api/cron/cdp",
    "schedule": "*/5 * * * *"
  }]
}
```

Add `CRON_SECRET` to your Vercel environment variables for authentication.

### Segment Types

**Player Draft Segments:**
- **Position-based**: Goalkeepers, Defenders, Midfielders, Forwards
- **Status-based**: New Applicants, Under Review, Shortlisted, Trial Invites, Selected, Waitlisted
- **Engagement-based**: High Engagement, Low Engagement, Unsubscribed
- **Experience-based**: Elite/Professional, Club/Amateur, Recreational
- **Age-based**: 18-24, 25-34, 35-44, 45+
- **Activity-based**: Currently Active, Previously Active
- **Special**: Social Media Active, Copenhagen Area, High Rated

**Newsletter Segments:**
- **Status-based**: Active Subscribers, Unsubscribed
- **Source-based**: Homepage Signups
- **Cross-reference**: Also Draft Applicants, Newsletter Only

### Email Flow Triggers

- `new_submission` - When a new application is submitted
- `status_change` - When applicant status changes (e.g., "shortlisted", "selected")
- `segment_entry` - When applicant enters a segment
- `segment_exit` - When applicant exits a segment
- `manual` - Manually triggered campaigns