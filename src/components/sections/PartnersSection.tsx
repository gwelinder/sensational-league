"use client";

import Image from "next/image";
import { createDataAttribute } from "@sanity/visual-editing";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface Partner {
  _key?: string;
  name?: string;
  logo?: any;
  url?: string;
}

interface PartnersSectionProps {
  data: {
    _key?: string;
    _type: string;
    title?: string;
    partners?: Partner[];
    backgroundColor?: string;
  };
  documentId: string;
  documentType: string;
  path: string;
}

const backgroundClasses = {
  white: "bg-[var(--color-off-white)]",
  "off-white": "bg-[var(--color-off-white)]",
  black: "bg-[var(--color-black)] text-[var(--color-off-white)]",
  volt: "bg-[var(--color-volt)] text-[var(--color-black)]",
};

function hasLogo(partner: Partner | undefined | null): partner is Partner & { logo: any } {
  return Boolean(partner?.logo);
}

export function PartnersSection({ data, documentId, documentType, path }: PartnersSectionProps) {
  const dataAttribute = createDataAttribute({
    id: documentId,
    type: documentType,
    path,
  });

  const bgClass = backgroundClasses[data.backgroundColor as keyof typeof backgroundClasses] || backgroundClasses.white;
  const isLight = data.backgroundColor === "white" || data.backgroundColor === "off-white" || data.backgroundColor === "volt";

  const validPartners = data.partners?.filter(hasLogo) || [];

  if (validPartners.length === 0) {
    return null;
  }

  return (
    <section 
      className={cn("py-16", bgClass)}
      data-sanity={dataAttribute.toString()}
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className={cn(
          "mb-10 text-center",
          "brand-subhead",
          isLight ? "text-[var(--color-black)]" : "text-[var(--color-off-white)]"
        )}>
          {data.title || "Our Partners"}
        </h2>
        
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {validPartners.map((partner) => {
            const imageUrl = urlFor(partner.logo)
              .width(200)
              .height(100)
              .url();
            const key = partner._key || imageUrl;
            const altText = partner.name || "League partner";

            const partnerDataAttribute = createDataAttribute({
              id: documentId,
              type: documentType,
              path: `${path}.partners[_key=="${partner._key}"]`,
            });

            return (
              <div
                key={key}
                className={cn(
                  "flex items-center justify-center rounded-lg border p-6",
                  "brand-motion-right brand-fast",
                  "hover:shadow-lg transition-all duration-200",
                  isLight 
                    ? "border-[var(--color-gray-light)] bg-white hover:border-[var(--color-gray-medium)]" 
                    : "border-[var(--color-gray-medium)] bg-[var(--color-black)]/50 hover:border-[var(--color-volt)]"
                )}
                data-sanity={partnerDataAttribute.toString()}
              >
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-transform hover:scale-105"
                  >
                    <Image
                      src={imageUrl}
                      alt={altText}
                      width={200}
                      height={100}
                      className="h-auto w-full object-contain"
                    />
                  </a>
                ) : (
                  <Image
                    src={imageUrl}
                    alt={altText}
                    width={200}
                    height={100}
                    className="h-auto w-full object-contain"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}