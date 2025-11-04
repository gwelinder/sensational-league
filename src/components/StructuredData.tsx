export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    "name": "Sensational League",
    "description": "Women's 7v7 football league combining athletic excellence with social impact. Play Football. Drive Impact. Change the World.",
    "url": "https://sensationalleague.com",
    "logo": "https://sensationalleague.com/favicon.svg",
    "slogan": "Fast. Rebellious. Female.",
    "sport": "Football",
    "sameAs": [
      // Add social media URLs when available
      // "https://twitter.com/sensationalleague",
      // "https://instagram.com/sensationalleague",
      // "https://facebook.com/sensationalleague"
    ],
    "foundingDate": "2024",
    "keywords": "women's football, 7v7, sports league, social impact, female athletes, sustainable development goals",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sensational League",
    "url": "https://sensationalleague.com",
    "description": "Women's 7v7 football league combining athletic excellence with social impact.",
    "publisher": {
      "@type": "Organization",
      "name": "Sensational League",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sensationalleague.com/favicon.svg"
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
