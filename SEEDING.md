# Seed Policies into Sanity

This guide explains how to populate your Sanity Studio with the initial policies.

## Prerequisites

You need a Sanity API token with write permissions:

1. Go to https://sanity.io/manage
2. Select your "Sensational League" project
3. Navigate to **API** → **Tokens**
4. Click **Add API token**
   - Name: `Seed Script`
   - Permissions: **Editor** (or **Admin**)
5. Copy the token

## Setup

Add the token to your `.env.local` file:

```bash
SANITY_API_TOKEN=your_token_here
```

## Run the policy seed script

```bash
pnpm seed:policies
```

This will create/update 5 policy documents in Sanity:
- Release of Liability
- Terms & Conditions
- Data Protection Policy
- Child Protection Policy
- Guidelines for Playing

## Seed the home page (optional)

```bash
pnpm seed:home
```

This creates a starter `homePage` document with waitlist-focused copy. You can edit all sections (hero, signup, about, how-we-play, partners) in the Studio.

## Editing policies

Once seeded, you can edit all policies through the Sanity Studio:

1. Visit http://localhost:3000/studio
2. Click on any policy from the sidebar
3. Edit the content using the rich text editor
4. Click **Publish** to save changes

## Viewing policies

The policies page is available at:
- http://localhost:3000/policies

All policy links in the footer now point to this page with proper anchor navigation.
