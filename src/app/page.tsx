import HomePage from "./homepage";
import { sanityFetch } from "@/sanity/lib/live";

interface HomePageContent {
	_id: string;
	_type: string;
	title?: string;
	seo?: {
		metaTitle?: string;
		metaDescription?: string;
	};
	hero?: {
		headline?: string;
		subline?: string;
		ctaText?: string;
	};
	about?: {
		title?: string;
		description?: string;
	};
}

async function getHomePageData(): Promise<HomePageContent | null> {
	const { data } = await sanityFetch({
		query: `*[_type == "homePage" && _id == "homePage"][0] {
      _id,
      _type,
      title,
      seo,
      hero {
        headline,
        subline,
        ctaText
      },
      about {
        title,
        description
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

export default async function Home() {
	const content = await getHomePageData();

	return <HomePage content={content || undefined} />;
}
