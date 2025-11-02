import { SectionsRenderer } from "@/components/SectionsRenderer";
import { sanityFetch } from "@/sanity/lib/live";

interface HomePageContent {
	_id: string;
	_type: string;
	title?: string;
	seo?: {
		metaTitle?: string;
		metaDescription?: string;
	};
	sections?: Array<{
		_key: string;
		_type: string;
		[key: string]: any;
	}>;
}

async function getHomePageData(): Promise<HomePageContent | null> {
	const { data } = await sanityFetch({
		query: `*[_type == "homePage"][0] {
      _id,
      _type,
      title,
      seo,
      sections[] {
        _key,
        _type,
        ...
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

	if (!content) {
		return (
			<main className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">No homepage content</h1>
					<p>Please configure your homepage in Sanity Studio</p>
				</div>
			</main>
		);
	}

	return (
		<SectionsRenderer
			documentId={content._id}
			documentType={content._type}
			sections={content.sections || []}
		/>
	);
}
