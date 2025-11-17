import HomePage from "./homepage";
import { sanityFetch } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import type { PortableTextBlock } from '@portabletext/types';

interface Stat {
	value: string;
	label: string;
}

interface Pillar {
	title: string;
	description: string;
}

interface Statement {
	title?: string;
	description?: string;
}

interface DesignedForCard {
	eyebrow?: string;
	description?: string;
	features?: string[];
}

interface CaptainCard {
	name?: string;
	tagline?: string;
	summary?: string;
	superpower?: string;
	oneLiner?: string;
	photo?: SanityImage;
	videoUrl?: string;
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

interface PageSection {
	_key: string;
	_type: string;
	[key: string]: unknown;
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
		video?: {
			url?: string;
			poster?: SanityImage;
			credit?: string;
			variants?: {
				wide?: string;
				square?: string;
				vertical?: string;
			};
		};
		subline?: string;
		ctaText?: string;
		ctaLink?: string;
		ctaDescription?: string;
		stats?: Stat[];
		images?: SanityImage[];
		countdown?: {
			enabled?: boolean;
			label?: string;
			deadline?: string;
			timezone?: string;
		};
	};
	about?: {
		title?: PortableTextBlock[] | null;
		description?: string;
		pillars?: Pillar[];
		infoCard?: {
			title?: string;
			body?: string;
		};
	};
	whySection?: {
		eyebrow?: string;
		title?: string;
		subtitle?: string;
		statements?: Statement[];
	};
	formatSection?: {
		eyebrow?: string;
		title?: string;
		subtitle?: string;
		coreConcepts?: string[];
		designedFor?: DesignedForCard;
	};
	captainsSection?: {
		eyebrow?: string;
		title?: string;
		subtitle?: string;
		intro?: string;
		captains?: CaptainCard[];
	};
	pressCta?: {
		label?: string;
		emoji?: string;
		href?: string;
		buttonText?: string;
	};
	application?: {
		card?: {
			badge?: string;
			title?: string;
			description?: string;
			ctaText?: string;
			ctaLink?: string;
			helperText?: string;
			countdownLabel?: string;
				formId?: string;
				resourceEyebrow?: string;
				resourceLinkLabel?: string;
				resourceLinkHref?: string;
		};
		embed?: {
			enabled?: boolean;
			badge?: string;
			title?: string;
			description?: string;
			bulletPoints?: string[];
			deadlineNote?: string;
			formId?: string;
			height?: number;
		};
	};
	sections?: PageSection[];
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
        video {
          url,
          poster {
            asset,
            alt,
            width,
            height,
            objectFit
          },
          credit,
          variants {
            wide,
            square,
            vertical
          }
        },
        subline,
        ctaText,
        ctaLink,
        ctaDescription,
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
        },
        countdown {
          enabled,
          label,
          deadline,
          timezone
        }
      },
      about {
        title,
        description,
        pillars[] {
          title,
          description
        },
        infoCard {
          title,
          body
        }
      },
      whySection {
        eyebrow,
        title,
        subtitle,
        statements[] {
          title,
          description
        }
      },
      formatSection {
        eyebrow,
        title,
        subtitle,
        coreConcepts,
        designedFor {
          eyebrow,
          description,
          features
        }
      },
      captainsSection {
        eyebrow,
        title,
        subtitle,
        intro,
        captains[] {
          name,
          tagline,
          summary,
          superpower,
          oneLiner,
          videoUrl,
          photo {
            asset,
            alt,
            width,
            height,
            objectFit
          }
        }
      },
      pressCta {
        label,
        emoji,
        href,
        buttonText
      },
      application {
        card {
          badge,
          title,
          description,
          ctaText,
          ctaLink,
          helperText,
          countdownLabel,
		  formId,
		  resourceEyebrow,
		  resourceLinkLabel,
		  resourceLinkHref
        },
        embed {
          enabled,
          badge,
          title,
          description,
          bulletPoints,
          deadlineNote,
          formId,
          height
        }
      },
      sections[] {
        ...,
        content[] {
          ...,
          image {
            asset,
            alt,
            crop,
            hotspot
          },
          thumbnail {
            asset,
            alt,
            crop,
            hotspot
          }
        },
        categories[] {
          ...,
          faqs[] {
            ...,
            answer[]
          }
        }
      }
    }`,
	});

	return data as HomePageContent | null;
}

export async function generateMetadata() {
    // In Presentation/draft mode, keep head metadata stable to avoid full-page reloads
    const isDraft = (await draftMode()).isEnabled;
    if (isDraft) {
        return {
            title: "Sensational League - Fast. Rebellious. Female.",
            description: "Women's 7v7 football league combining athletic excellence with social impact.",
        };
    }

    const content = await getHomePageData();
    return {
        title: content?.seo?.metaTitle || "Sensational League - Fast. Rebellious. Female.",
        description:
            content?.seo?.metaDescription ||
            "Women's 7v7 football league combining athletic excellence with social impact.",
    };
}

// Cache page data, SanityLive triggers on-demand revalidation via revalidateTag
// This prevents full page reloads - updates are seamless via Next.js cache eviction
export const revalidate = 3600; // Cache for 1 hour, revalidate on-demand when content changes

export default async function Home() {
	const content = await getHomePageData();

	return <HomePage content={content || undefined} />;
}
