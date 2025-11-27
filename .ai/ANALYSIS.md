Now I have a comprehensive understanding of the codebase. Let me generate the detailed project potential analysis report.
---
# Sensational League - Unrealized Potential Analysis
## Executive Summary
Sensational League is positioned to become the **defining platform for women's sports entertainment** - but it's currently operating as a sophisticated marketing site with nascent league management infrastructure. The codebase reveals an ambitious architecture waiting to be activated.
**Core Identity**: A revolutionary women's 7v7 football league combining athletic performance with social impact, led by legendary Danish captains.
**Current State**: Pre-launch, player draft mode, ~80 player slots for Copenhagen Spring 2026.
**Gap**: The technical infrastructure for CDP, league management, and real-time engagement exists in schema form but lacks user-facing activation.
---
## Section 1: What This Project is TRYING to Become
### The Visible Ambition
The codebase speaks to three interconnected platforms converging:
1. **A Sports Entertainment Destination**
   - Festival-style gamedays (`src/sanity/schemaTypes/league/match.ts`)
   - Creator lab with content studio (mentioned in homepage defaults)
   - Broadcast + live crowd format
2. **A Modern Player-First League Platform**
   - Full player profiles with social media metrics (`src/sanity/schemaTypes/league/player.ts:97-161`)
   - Team chat and notifications (`src/components/league/TeamChat.tsx`, `NotificationCenter.tsx`)
   - Personal goal tracking and achievement badges (`player.ts:327-377`)
3. **An Impact Scoring Platform**
   - UN SDG-aligned community challenges (`team.ts:183-253`)
   - "Sensational Point System" where promotion of the game IS the competition
   - Impact hours, volunteer work, social amplification as scoring vectors
### The Hidden Architecture
The schemas reveal features not yet activated publicly:
| Feature | Location | Status |
|---------|----------|--------|
| League standings with bonus points | `leagueStandings.ts` | Schema only |
| Match live scores & events | `match.ts` | Schema only |
| Team chat with message types | `TeamChat.tsx` | Component exists, not integrated |
| Notification center | `NotificationCenter.tsx` | Component exists, not integrated |
| Social metrics tracking | `team.ts:131-178` | Schema ready |
| CDP email flows | `flowExecutor.ts` | Functional backend |
| Segment-based automation | `segmentEvaluator.ts` | Functional backend |
---
## Section 2: Where the UX Falls Short of Its Potential
### 2.1 The Player Draft Experience (Critical Path)
**Current**: Static application card → Typeform → Email confirmation
**File**: `src/app/player-draft/page.tsx`
**Gaps**:
- No applicant status tracking visible to users
- No community/cohort feeling among applicants
- No preview of what being "selected" means
- Missing countdown urgency beyond static text
**Opportunity**: Transform the draft from a form submission into a **journey dashboard**:
- Applicant portal showing status, cohort stats, captain updates
- "Your Chances" indicator based on position demand
- Behind-the-scenes captain review videos
- "Meet Your Competition" anonymized applicant stats
### 2.2 The Captain Section (Emotional Core)
**Current**: Grid of captain cards with video previews
**File**: `src/app/homepage.tsx:636-746`
**Gaps**:
- Videos autoplay muted, no narrative flow
- Each captain feels isolated
- Missing their "team" vision
**Opportunity**: Make captains the **protagonist guides**:
- Captain-led draft commentary ("Bettina's type of player...")
- Team identity previews each captain will build
- Captain Q&A or video messages to applicants
- Draft pick wishlists captains are seeking
### 2.3 The Impact Story (Differentiator)
**Current**: Brief mention in "Sensational Point System" info card
**File**: `homepage.tsx:1578-1589`
**Gaps**:
- Community Challenge scoring not visualized
- SDG alignment feels abstract
- No examples of what "amplifying women's sport" looks like
**Opportunity**: Show impact as **live competition**:
- Impact leaderboard preview
- Example community challenges
- Partner spotlight stories
- Calculator: "Your potential impact"
### 2.4 The Dashboard (Staff Only)
**Current**: Mock data standings, not connected to CMS
**File**: `src/app/dashboard/page.tsx`
**Gaps**:
- Hardcoded fake teams (Lightning Bolts, etc.)
- No connection to Sanity league schemas
- No access controls for players/captains
**Opportunity**: Activate as **multi-role hub**:
- Public fan dashboard (standings, upcoming matches)
- Captain dashboard (team management, draft picks)
- Player dashboard (personal stats, team chat)
- Admin dashboard (currently CDPDashboard in studio)
### 2.5 The CDP (Invisible Backend Power)
**Current**: Full email automation system
**Files**: `src/lib/cdp/*`, `src/sanity/components/CDPDashboard.tsx`
**Gaps**:
- No visible segmentation to applicants
- Email flows exist but are admin-only
- Resend webhooks configured but engagement invisible
**Opportunity**: Surface CDP insights to **users**:
- "You're in the Copenhagen Area segment" badges
- Application status emails with real progress
- Captain interest notifications ("2 captains viewed your profile")
- Engagement score visible in applicant portal
---
## Section 3: Creative Transformations
### 3.1 "Draft Day Live" Experience
**Concept**: Transform selection from private email to public event.
**Implementation Points**:
- Live streaming layer during draft events
- Real-time team roster reveals
- Player reaction capture
- Social media integration for viral moments
**Files to Extend**:
- `src/sanity/schemaTypes/league/event.ts`
- New `src/app/draft-live/page.tsx`
### 3.2 Player Profile as Media Kit
**Concept**: Every player automatically gets a professional media profile.
**Current Player Schema Has**:
- Social metrics
- Match statistics
- Personal achievements
- Impact contributions
**Add**:
- Auto-generated OG images per player
- Shareable stats cards
- Career highlight reels
- Sponsor-ready profiles
**Files**: `src/app/opengraph-image.tsx` pattern → `src/app/players/[slug]/opengraph-image.tsx`
### 3.3 Community Challenge Competition Interface
**Concept**: Real-time impact scoring visualization.
**The Schema Supports**:
- SDG goal tagging (`team.ts:199-220`)
- Volunteer hours (`team.ts:229-233`)
- People impacted (`team.ts:234-238`)
- Points awarded (`team.ts:239-243`)
**Build**:
- Public impact leaderboard
- Challenge progress bars
- Social proof feed ("Team X just completed beach cleanup")
- Partner-verified impact certificates
### 3.4 The Sensational 80 Directory
**Concept**: Public roster page celebrating selected players.
**Build Path**:
- Connect `draftApplicant` with status="selected" to public `player` profiles
- Create `/players` directory page
- Individual player pages with stats, social, impact
- Team roster views grouped by captain
### 3.5 Fan Engagement Layer
**Concept**: Spectator features beyond watching.
**Ideas**:
- Match predictions
- Player of the match voting
- Impact project voting
- Fantasy league elements
- Social challenge participation
---
## Section 4: High-Impact Recommendations
### Priority 1: Applicant Portal (Pre-Launch Critical)
**Effort**: Medium | **Impact**: High
Create `/my-application` authenticated route:
```
- Status tracker (submitted → under review → shortlisted...)
- Position demand indicator
- Captain "interest signals"
- Segment badges earned
- Community stats (X people from your city applied)
```
**Files to Create**:
- `src/app/my-application/page.tsx`
- `src/lib/auth/applicant-auth.ts` (magic link via CDP)
### Priority 2: Live League Dashboard (Launch Essential)
**Effort**: High | **Impact**: Critical
Connect dashboard to Sanity schemas:
```
- Pull from team, player, match, leagueStandings
- Add real-time match updates
- Public/authenticated modes
```
**Files to Modify**:
- `src/app/dashboard/page.tsx` - Remove hardcoded data
- Add `sanityFetch` queries for league data
- Create captain-specific views
### Priority 3: Captain Story Pages (Marketing Multiplier)
**Effort**: Low | **Impact**: High
Individual captain landing pages:
```
- Full biography
- Team vision statement
- "I'm looking for..." player profiles
- Video content hub
- Social links
```
**Files to Create**:
- `src/app/captains/[slug]/page.tsx`
- `src/sanity/schemaTypes/captain.ts` (extends player)
### Priority 4: Impact Visualization (Differentiator Activation)
**Effort**: Medium | **Impact**: High
Public impact dashboard:
```
- Team impact leaderboard
- Live challenge tracking
- SDG contribution visualization
- Partner recognition
```
**Files to Create**:
- `src/app/impact/page.tsx`
- `src/components/ImpactLeaderboard.tsx`
### Priority 5: Mobile Player App Experience
**Effort**: High | **Impact**: High
Convert dashboard to player-first mobile experience:
```
- Team chat (already built: TeamChat.tsx)
- Notifications (already built: NotificationCenter.tsx)
- Personal stats dashboard
- Impact contribution logging
```
**Integration**: PWA manifest already exists (`src/app/manifest.json`)
---
## Section 5: Technical Leverage Points
### Immediate Wins (< 1 week each)
| Item | Location | Action |
|------|----------|--------|
| Activate countdown | `CountdownTicker.tsx` | Enable in homepage hero |
| Show newsletter count | `CDPDashboard.tsx:549-555` | Display total subscribers publicly |
| Captain video gallery | `homepage.tsx:232-288` | Upgrade to interactive player |
| Press page RSS | `src/app/press/` | Add RSS feed for media monitoring |
### Schema Activations (1-2 weeks each)
| Schema | Status | Activation Path |
|--------|--------|-----------------|
| `team.ts` | Ready | Create `/teams` public listing |
| `player.ts` | Ready | Create `/players` directory |
| `match.ts` | Ready | Create `/schedule` page |
| `venue.ts` | Ready | Integrate with match displays |
| `communication.ts` | Ready | Power team chat backend |
### Integration Opportunities
| System | Current State | Opportunity |
|--------|---------------|-------------|
| SharePoint | Sync to CDP | Add bidirectional status sync |
| Resend | Email only | SMS via Resend integration |
| Typeform | One-way | Webhook-powered live updates |
| Sanity | Full CMS | Add real-time subscriptions for live scores |
---
## Section 6: The Transformation Vision
**FROM**: A beautiful marketing site with a player application form
**TO**: The operating system for a new kind of sports league where:
1. **Players** have personal dashboards tracking stats, impact, and growth
2. **Captains** manage teams through dedicated interfaces
3. **Fans** engage through predictions, voting, and impact participation
4. **Partners** see real-time ROI through branded impact tracking
5. **Media** access auto-generated assets and stats
The infrastructure is 70% built. The remaining 30% is connecting existing components to user-facing experiences.
---
## Conclusion
Sensational League has built a sophisticated backend capable of running a modern sports entertainment platform. The CDP, league schemas, and component library represent significant engineering investment that's currently invisible to users.
The highest-ROI path forward:
1. **Applicant portal** (creates community pre-launch)
2. **Captain deep-dives** (multiplies marketing reach)  
3. **Impact visualization** (activates the differentiator)
4. **Live dashboard** (readies for season one)
The spark is there. It's time to ignite it.
