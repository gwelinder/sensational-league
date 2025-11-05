interface SchemaMarkupProps {
	headline: string;
	subheadline?: string;
	publishDate: string;
	imageUrl?: string;
}

export function PressReleaseSchema({ headline, subheadline, publishDate, imageUrl }: SchemaMarkupProps) {
	const schema = {
		"@context": "https://schema.org",
		"@type": "NewsArticle",
		"headline": headline,
		"description": subheadline || headline,
		"datePublished": publishDate,
		"dateModified": publishDate,
		"author": [
			{
				"@type": "Person",
				"name": "Bettina Kuperman",
				"jobTitle": "CEO",
				"affiliation": {
					"@type": "Organization",
					"name": "Saga Sports Group"
				}
			},
			{
				"@type": "Person",
				"name": "Majken Gilmartin",
				"jobTitle": "COO",
				"affiliation": {
					"@type": "Organization",
					"name": "Saga Sports Group"
				}
			}
		],
		"publisher": {
			"@type": "Organization",
			"name": "Sensational League",
			"logo": {
				"@type": "ImageObject",
				"url": "https://sensationalleague.com/logos/SL-WORDMARK-LEFT ALIGNED.svg"
			},
			"url": "https://sensationalleague.com"
		},
		"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": "https://sensationalleague.com/press"
		},
		"image": imageUrl || "https://sensationalleague.com/opengraph-image",
		"articleSection": "Sports",
		"keywords": "women's football, 7v7, Sensational League, Moonbug, investment, Danish startups, sports innovation",
		"inLanguage": ["da", "en"],
		"about": {
			"@type": "SportsOrganization",
			"name": "Sensational League",
			"sport": "Football",
			"description": "Professional 7v7 women's football league"
		}
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
}

export function OrganizationSchema() {
	const schema = {
		"@context": "https://schema.org",
		"@type": "SportsOrganization",
		"name": "Sensational League",
		"alternateName": "Sensational League - Fast. Rebellious. Female.",
		"url": "https://sensationalleague.com",
		"logo": "https://sensationalleague.com/logos/SL-WORDMARK-LEFT ALIGNED.svg",
		"description": "Professional 7v7 women's football league combining athletic excellence with social impact",
		"sport": "Football",
		"sameAs": [
			"https://twitter.com/SensationalLG",
			"https://instagram.com/sensational_league",
			"https://facebook.com/profile.php?id=61582488164825",
			"https://tiktok.com/@Sensationalleague",
			"https://youtube.com/@SensationalLeague",
			"https://linkedin.com/company/saga-sports-group"
		],
		"foundingDate": "2025",
		"founders": [
			{
				"@type": "Person",
				"name": "Bettina Kuperman",
				"jobTitle": "CEO",
			},
			{
				"@type": "Person",
				"name": "Majken Gilmartin",
				"jobTitle": "COO",
			}
		],
		"parentOrganization": {
			"@type": "Organization",
			"name": "Saga Sports Group"
		}
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
}
