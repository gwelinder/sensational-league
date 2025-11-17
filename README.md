This is a [Next.js](https://nextjs.org) + [Sanity](https://www.sanity.io) project with embedded Studio at `/studio`, branded for Sensational League.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3000/studio](http://localhost:3000/studio) for the Sanity Studio.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Branding notes:

- Brand colors and typography are defined as CSS variables in `src/app/globals.css`.
- The site uses Inter via `next/font` and applies brand background/contrast on the landing page using the white wordmark in `/public`.
- Sanity Studio is branded with the Sensational League wordmark in the header (see `src/sanity/StudioLogo.tsx`).
- A `Site Settings` singleton document is available in Studio for basic site configuration.

## Content Management

All site policies and homepage content are fully editable through Sanity Studio:

- **Home Page**: `/` - hero, signup waitlist, about, how-we-play, and partners sections (document type `homePage`)
- **Policies page**: `/policies` - displays all policies with anchor navigation
- **Editable in Studio**: Release of Liability, Terms & Conditions, Data Protection Policy, Child Protection Policy, Guidelines for Playing
- **Rich text editing**: Use Sanity's Portable Text editor for formatting

### First-time setup: Seed policies

To populate the initial policy content:

1. Get a Sanity API token from https://sanity.io/manage (Editor or Admin permissions)
2. Add it to `.env.local`: `SANITY_API_TOKEN=your_token_here`
3. Run: `pnpm seed:policies`

To populate the home page document:

```bash
pnpm seed:home
```

See [SEEDING.md](./SEEDING.md) for detailed instructions.

## Captain Video Uploads (Cloudflare R2)

Use the `upload:captain-video` script whenever a new intro film for a captain needs to go live.

1. Add the Cloudflare R2 credentials to `.env.local` (`R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, optionally override `R2_CAPTAIN_BUCKET` or `R2_CAPTAIN_PUBLIC_BASE`).
2. Export the final video as MP4 (preferred), WebM, or MOV and note the captain slug you plan to use in Sanity.
3. Run `pnpm upload:captain-video --file path/to/video.mp4 --slug captain-name`.
4. The script uploads the file to the `sensational-hero-videos` bucket, prints both the Worker URL (without the extension) and the direct file URL, and lets you know the R2 object key. Paste the Worker URL (e.g. `https://sensational-hero-video.generaite.workers.dev/captains/bettina`) into the `videoUrl` field for the captain inside Sanity.
5. Re-run with `--force` if you intentionally want to overwrite an existing asset; otherwise the script prevents accidental replacements.

The Worker already maps `/captains/{slug}` paths to the correct video key, so once the upload completes and Sanity is updated the homepage will render the new clip automatically.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
