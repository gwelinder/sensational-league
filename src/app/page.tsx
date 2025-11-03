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
	// In development, query both draft and published documents
	// In production, only query published documents
	const isDevelopment = process.env.NODE_ENV === 'development';
	const query = isDevelopment
		? `*[_type == "homePage" && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0]`
		: `*[_type == "homePage"][0]`;

	const { data } = await sanityFetch({
		query: `${query} {
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
		stega: true, // Enable stega encoding for this query
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

// Revalidate every 60 seconds - SanityLive handles live updates in development
export const revalidate = 60;

export default async function Home() {
	const content = await getHomePageData();

	return <HomePage content={content || undefined} />;
}
