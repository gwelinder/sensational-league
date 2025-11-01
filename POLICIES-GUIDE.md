# Policy Management System - Complete ✅

## What was built

A complete, Sanity-powered policy management system that lets you edit all legal content through the Studio.

## Files created

### Sanity schemas
- `src/sanity/schemaTypes/blockContent.ts` - Rich text schema (headings, lists, links, formatting)
- `src/sanity/schemaTypes/policy.ts` - Policy document type with title, slug, order, and content

### Components & pages
- `src/lib/portable-text.tsx` - Renders rich text with proper styling
- `src/app/policies/page.tsx` - Public-facing policies page with anchor navigation
- `scripts/seed-policies.ts` - One-time seeding script with all your policy content

### Updates
- `src/components/Footer.tsx` - Footer links now point to `/policies#anchor-id`
- `src/sanity/lib/live.ts` - Silenced token warnings (set to `false`)
- `README.md` & `SEEDING.md` - Documentation

## How to use

### 1. Seed the policies (first time only)

```bash
# Get API token from https://sanity.io/manage → API → Tokens (Editor/Admin role)
# Add to .env.local:
echo "SANITY_API_TOKEN=sk_your_token_here" >> .env.local

# Run seed script
pnpm seed:policies
```

You should see:
```
🌱 Seeding policies...
✅ Created/updated: Release of Liability
✅ Created/updated: Terms & Conditions
✅ Created/updated: Data Protection Policy
✅ Created/updated: Child Protection Policy
✅ Created/updated: Guidelines for Playing
✨ Seeding complete!
```

### 2. Edit policies in Studio

1. Visit http://localhost:3000/studio
2. Click on any policy from the sidebar (e.g., "Release of Liability")
3. Edit the rich text content:
   - **Headings**: H2, H3 styles
   - **Lists**: Bullet and numbered
   - **Formatting**: Bold, italic
   - **Links**: Add external/internal links
4. Click **Publish** to save

### 3. View the policies page

Visit http://localhost:3000/policies to see:
- All policies in order
- Jump-to-section navigation at the top
- Footer links that scroll to the correct policy

## What's editable

Every policy is fully editable in Sanity:
- ✅ Release of Liability (waiver & image rights)
- ✅ Terms & Conditions (website T&Cs)
- ✅ Data Protection Policy (GDPR compliance)
- ✅ Child Protection Policy (safeguarding)
- ✅ Guidelines for Playing (code of conduct)

## Adding a new policy

1. In Studio, click **Create** → **Policy**
2. Fill in:
   - Title: "Cookie Policy"
   - Slug: Generate from title
   - Order: `6` (appears after Guidelines)
   - Content: Write your policy
3. Publish

It will automatically appear on `/policies` and can be linked from the footer.

## Rendering details

The Portable Text renderer (`src/lib/portable-text.tsx`) applies:
- Black/white brand colors
- Proper spacing and typography
- Accessible markup (semantic HTML)
- Hover states for links

All styling is consistent with your existing brand theme.

## Build status

- ✅ Build: PASS
- ✅ Typecheck: PASS
- ✅ Lint: PASS (1 harmless warning about unused Metadata import)

## Next steps

Once you've seeded the policies:
1. Review the content in Studio and adjust any wording
2. Add your own branding tweaks to the Portable Text styles if needed
3. Consider adding a metadata field to policies for SEO (description, OG image)
4. Optionally create a "Legal" singleton with contact email, jurisdiction, etc.
