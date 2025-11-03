import HomePage from "./homepage";
import { sanityFetch } from "@/sanity/lib/live";
import type { PortableTextBlock } from '@portabletext/types';

interface Stat {
	value: string;
	label: string;
}

interface Pillar {
	title: string;
	description: string;
}

interface SanityImage {
	asset?: {
		_ref?: string;
		_type?: string;
	};
	alt?: string;
	width?: number;
	height?: number;
	objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

interface HomePageContent {
	_id: string;
	_type: string;
	title?: string;
	seo?: {
		metaTitle?: string;
		metaDescription?: string;
	};
	hero?: {
		logo?: SanityImage;
		headline?: PortableTextBlock[] | null;
		subline?: string;
		ctaText?: string;
		stats?: Stat[];
		images?: SanityImage[];
	};
	about?: {
		title?: PortableTextBlock[] | null;
		description?: string;
		pillars?: Pillar[];
	};
}

async function getHomePageData(): Promise<HomePageContent | null> {
	// The Live API client handles perspective automatically
	// No need to manually set perspective here - it causes full page reloads
	const { data } = await sanityFetch({
		query: `*[_type == "homePage"][0] {
      _id,
      _type,
      title,
      seo,
      hero {
        logo {
          asset,
          alt,
          width,
          height,
          objectFit
        },
        headline,
        subline,
        ctaText,
        stats[] {
          value,
          label
        },
        images[] {
          asset,
          alt,
          width,
          height,
          objectFit
        }
      },
      about {
        title,
        description,
        pillars[] {
          title,
          description
        }
      }
    }`,
	});

	return data as HomePageContent | null;
}

export async function generateMetadata() {
	const content = await getHomePageData();

	return {
		title: content?.seo?.metaTitle || "Sensational League - Fast. Rebellious. Female.",
		description: content?.seo?.metaDescription || "Women's 7v7 football league combining athletic excellence with social impact.",
	};
}

// Cache page data, SanityLive triggers on-demand revalidation via revalidateTag
// This prevents full page reloads - updates are seamless via Next.js cache eviction
export const revalidate = 3600; // Cache for 1 hour, revalidate on-demand when content changes

export default async function Home() {
	const content = await getHomePageData();

	return <HomePage content={content || undefined} />;
}
