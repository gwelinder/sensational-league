# Vision Execution TODO

Based on analysis from ANALYSIS.md, executing TOP 3 priority transformations.

## Selected Priorities (Hours/Days Effort)

### 1. Captain Story Pages ✅ [Effort: Low | Impact: High]
**Status**: ✅ Complete

Create individual captain landing pages as marketing multipliers:
- [x] Create `src/sanity/schemaTypes/captain.ts` schema
- [x] Create `src/app/captains/page.tsx` directory page
- [x] Create `src/app/captains/[slug]/page.tsx` route
- [x] Integrate with existing homepage captain data

**Files Created**:
- `src/sanity/schemaTypes/captain.ts`
- `src/app/captains/page.tsx`
- `src/app/captains/[slug]/page.tsx`

---

### 2. Activate Countdown Ticker ✅ [Effort: Low | Impact: Medium]
**Status**: ✅ Complete

Enable the existing CountdownTicker component in homepage hero:
- [x] Import CountdownTicker component
- [x] Integrate into homepage hero section (after HeroStats)
- [x] Connect to configurable target date from CMS (defaults to Jan 1, 2026)

**Files Modified**:
- `src/app/homepage.tsx`

---

### 3. Impact Visualization Page ✅ [Effort: Medium | Impact: High]
**Status**: ✅ Complete

Activate the differentiator - show impact as live competition:
- [x] Create `/impact` route
- [x] Build team impact leaderboard
- [x] Visualize SDG contributions with official UN colors
- [x] Show example community challenges

**Files Created**:
- `src/app/impact/page.tsx`

---

## Additional Enhancements (P3/P4)

### 4. RSS Feed for Press ✅ [Effort: Low | Impact: Medium]
**Status**: ✅ Complete

- [x] Create `/press/feed.xml` RSS 2.0 endpoint
- [x] Add RSS auto-discovery link in root layout
- [x] Add RSS link in footer navigation

**Files Created**:
- `src/app/press/feed.xml/route.ts`

---

### 5. Public Stats API ✅ [Effort: Low | Impact: Low]
**Status**: ✅ Complete

- [x] Create `/api/stats` public endpoint
- [x] Return non-sensitive aggregate statistics

**Files Created**:
- `src/app/api/stats/route.ts`

---

### 6. Production Fixes ✅ [Effort: Low | Impact: Critical]
**Status**: ✅ Complete

- [x] Fix TypeScript build error (captainsEnabled prop)
- [x] Fix ESLint warnings (unused variables)

**Files Modified**:
- `src/components/ConditionalLayout.tsx`
- Multiple files for unused variable cleanup

---

### 7. Structured Logging System ✅ [Effort: Medium | Impact: High]
**Status**: ✅ Complete

- [x] Create `src/lib/logger.ts` with structured logging utility
- [x] Support log levels (debug, info, warn, error)
- [x] Add component-based loggers (CDP, Email, SharePoint, Typeform, API, App)
- [x] Include contextual metadata (component, action, IDs)
- [x] Add performance timing helper
- [x] Update key files to use structured logger

**Files Created/Modified**:
- `src/lib/logger.ts`
- `src/lib/email/sendPlayerDraftThankYou.ts`
- `src/lib/cdp/resendSync.ts`
- `src/lib/sharepoint/saveListItem.ts`
- `src/lib/typeform/handleTypeformWebhook.ts`

---

### 8. Captain Video Gallery ✅ [Effort: Medium | Impact: Medium]
**Status**: ✅ Complete

- [x] Extend captain schema with `videoGallery` field
- [x] Support video categories (intro, highlights, interview, bts, match)
- [x] Create `CaptainVideoGallery` component with:
  - Auto-generated thumbnails
  - YouTube embed support
  - Category organization
  - Navigation between videos
- [x] Integrate into captain detail pages

**Files Created/Modified**:
- `src/sanity/schemaTypes/captain.ts`
- `src/components/CaptainVideoGallery.tsx`
- `src/app/captains/[slug]/page.tsx`

---

### 9. Impact Calculator ✅ [Effort: Medium | Impact: High]
**Status**: ✅ Complete

- [x] Create `ImpactCalculator` interactive component
- [x] Support 6 activity types with configurable hours/people
- [x] Calculate points using formula: base + (hours × multiplier) + (people × factor)
- [x] Show SDGs addressed across activities
- [x] Sticky results panel with totals
- [x] CTA to player draft application

**Files Created/Modified**:
- `src/components/ImpactCalculator.tsx`
- `src/app/impact/page.tsx`

---

## Deferred (Too Large - Weeks Effort)

- ❌ Applicant Portal with auth (`/my-application`) - requires auth system
- ❌ Live League Dashboard connected to Sanity - requires full schema integration
- ❌ Mobile Player App Experience - requires PWA enhancements

---

## Progress Tracking

| Task | Status | Started | Completed |
|------|--------|---------|-----------|
| Captain Story Pages | ✅ | 2025-01-27 | 2025-01-27 |
| Countdown Ticker | ✅ | 2025-01-27 | 2025-01-27 |
| Impact Visualization | ✅ | 2025-01-27 | 2025-01-27 |
| RSS Feed | ✅ | 2025-11-28 | 2025-11-28 |
| Public Stats API | ✅ | 2025-11-28 | 2025-11-28 |
| Build Fixes | ✅ | 2025-11-28 | 2025-11-28 |
| Structured Logging | ✅ | 2025-11-28 | 2025-11-28 |
| Captain Video Gallery | ✅ | 2025-11-28 | 2025-11-28 |
| Impact Calculator | ✅ | 2025-11-28 | 2025-11-28 |

---

*All P1-P4 priorities complete! Build passing. Total: 9 features implemented.*
