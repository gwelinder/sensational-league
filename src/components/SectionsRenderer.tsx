"use client";

import { createDataAttribute } from "@sanity/visual-editing";
import { HeroSection, SignupSection, ContentSection, PartnersSection } from "./sections";
import { AdvancedHeroSection } from "./advanced/AdvancedHeroSection";
import { MediaSection } from "./advanced/MediaSection";
import { StatsSection } from "./advanced/StatsSection";

interface Section {
  _key: string;
  _type: string;
  [key: string]: any;
}

interface SectionsRendererProps {
  documentId: string;
  documentType: string;
  sections: Section[];
}

export function SectionsRenderer({ 
  documentId, 
  documentType, 
  sections: initialSections 
}: SectionsRendererProps) {
  // For now, we'll use the initial sections directly
  // The useOptimistic hook will be enabled when React 19 stabilizes
  const sections = initialSections;

  if (!sections?.length) {
    return (
      <main>
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-off-white)]">
          <div className="text-center">
            <h1 className="brand-headline text-[var(--color-black)] mb-4">
              No sections configured
            </h1>
            <p className="brand-body text-[var(--color-text-muted)]">
              Add sections in the Sanity Studio to build your page.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Create data attribute for the sections array container
  const sectionsContainerAttribute = createDataAttribute({
    id: documentId,
    type: documentType,
    path: "sections",
  });

  return (
    <main 
      data-sanity={sectionsContainerAttribute.toString()}
    >
      {sections.map((section) => {
        const sectionPath = `sections[_key=="${section._key}"]`;
        
        // Create data attribute for each individual section
        const sectionAttribute = createDataAttribute({
          id: documentId,
          type: documentType,
          path: sectionPath,
        });

        // Render the appropriate section component
        switch (section._type) {
          case 'heroSection':
            return (
              <div
                key={section._key}
                data-sanity={sectionAttribute.toString()}
              >
                <HeroSection
                  data={section}
                  documentId={documentId}
                  documentType={documentType}
                  path={sectionPath}
                />
              </div>
            );

          case 'advancedHeroSection':
            return (
              <div
                key={section._key}
                data-sanity={sectionAttribute.toString()}
              >
                <AdvancedHeroSection
                  data={section}
                  documentId={documentId}
                  documentType={documentType}
                  path={sectionPath}
                />
              </div>
            );
            
          case 'signupSection':
            return (
              <div
                key={section._key}
                data-sanity={sectionAttribute.toString()}
              >
                <SignupSection
                  data={section}
                  documentId={documentId}
                  documentType={documentType}
                  path={sectionPath}
                />
              </div>
            );
            
          case 'contentSection':
            return (
              <div
                key={section._key}
                data-sanity={sectionAttribute.toString()}
              >
                <ContentSection
                  data={section}
                  documentId={documentId}
                  documentType={documentType}
                  path={sectionPath}
                />
              </div>
            );

          case 'mediaSection':
            return (
              <div
                key={section._key}
                data-sanity={sectionAttribute.toString()}
              >
                <MediaSection
                  data={section}
                  documentId={documentId}
                  documentType={documentType}
                  path={sectionPath}
                />
              </div>
            );

          case 'statsSection':
            return (
              <div
                key={section._key}
                data-sanity={sectionAttribute.toString()}
              >
                <StatsSection
                  data={section}
                  documentId={documentId}
                  documentType={documentType}
                  path={sectionPath}
                />
              </div>
            );
            
          case 'partnersSection':
            return (
              <div
                key={section._key}
                data-sanity={sectionAttribute.toString()}
              >
                <PartnersSection
                  data={section}
                  documentId={documentId}
                  documentType={documentType}
                  path={sectionPath}
                />
              </div>
            );
            
          default:
            console.warn(`Unknown section type: ${section._type}`);
            return (
              <div
                key={section._key}
                data-sanity={sectionAttribute.toString()}
                className="py-16 bg-[var(--color-gray-light)] text-center"
              >
                <div className="mx-auto max-w-4xl px-4">
                  <h2 className="brand-subhead text-[var(--color-black)] mb-4">
                    Unknown Section Type
                  </h2>
                  <p className="brand-body text-[var(--color-text-muted)]">
                    Section type "{section._type}" is not supported yet.
                  </p>
                </div>
              </div>
            );
        }
      })}
    </main>
  );
}