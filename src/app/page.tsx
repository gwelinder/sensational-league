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

interface HomePageContent {
	_id: string;
	_type: string;
	title?: string;
	seo?: {
		metaTitle?: string;
		metaDescription?: string;
	};
	hero?: {
		headline?: PortableTextBlock[];
		subline?: string;
		ctaText?: string;
		stats?: Stat[];
	};
	about?: {
		title?: PortableTextBlock[];
		description?: string;
		pillars?: Pillar[];
	};
	impact?: {
		headline?: PortableTextBlock[];
		stats?: Stat[];
		quoteText?: string;
		quoteAttribution?: string;
	};
	cta?: {
		headline?: string;
		description?: string;
		buttonText?: string;
	};
}

async function getHomePageData(): Promise<HomePageContent | null> {
	const { data } = await sanityFetch({
		query: `*[_type == "homePage"][0] {
      _id,
      _type,
      title,
      seo,
      hero {
        headline,
        subline,
        ctaText,
        stats[] {
          value,
          label
        }
      },
      about {
        title,
        description,
        pillars[] {
          title,
          description
        }
      },
      impact {
        headline,
        stats[] {
          value,
          label
        },
        quoteText,
        quoteAttribution
      },
      cta {
        headline,
        description,
        buttonText
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

export default async function Home() {
	const content = await getHomePageData();

	return <HomePage content={content || undefined} />;
}
