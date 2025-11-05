import { sanityFetch } from "@/sanity/lib/live";
import ConditionalLayout from "@/components/ConditionalLayout";

interface SanityImage {
  asset?: { _ref?: string; _type?: string };
  alt?: string;
  width?: number;
  height?: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

interface SiteSettings {
  _id: string;
  _type: string;
  navigation?: {
    sparkLogo?: SanityImage;
    wordmarkLogo?: SanityImage;
    links?: Array<{ label: string; href: string }>;
  };
  footer?: {
    sparkLogo?: SanityImage;
    wordmarkLogo?: SanityImage;
    tagline?: string;
    description?: string;
    copyrightText?: string;
    additionalText?: string;
    socialLinks?: {
      twitter?: string;
      instagram?: string;
      facebook?: string;
      tiktok?: string;
      youtube?: string;
    };
  };
}

async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "siteSettings"][0] {
      _id,
      _type,
      navigation {
        sparkLogo { asset, alt, width, height, objectFit },
        wordmarkLogo { asset, alt, width, height, objectFit },
        links
      },
      footer {
        sparkLogo { asset, alt, width, height, objectFit },
        wordmarkLogo { asset, alt, width, height, objectFit },
        tagline,
        description,
        copyrightText,
        additionalText,
        socialLinks
      }
    }`
  });
  return data as SiteSettings | null;
}

export default async function SiteChrome({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return <ConditionalLayout settings={settings || undefined}>{children}</ConditionalLayout>;
}

