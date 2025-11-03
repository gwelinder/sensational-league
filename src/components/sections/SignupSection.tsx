"use client";

import { createDataAttribute } from "@sanity/visual-editing";
import SignupForm from "@/components/SignupForm";
import { cn } from "@/lib/utils";

interface SignupSectionProps {
  data: {
    _key?: string;
    _type: string;
    title?: string;
    description?: string;
    buttonText?: string;
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

export function SignupSection({ data, documentId, documentType, path }: SignupSectionProps) {
  const dataAttribute = createDataAttribute({
    id: documentId,
    type: documentType,
    path,
  });

  const bgClass = backgroundClasses[data.backgroundColor as keyof typeof backgroundClasses] || backgroundClasses.white;
  const isLight = data.backgroundColor === "white" || data.backgroundColor === "off-white" || data.backgroundColor === "volt";

  return (
    <section 
      className={cn("py-16", bgClass)}
      data-sanity={dataAttribute.toString()}
    >
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className={cn(
          "mb-4",
          "brand-subhead",
          isLight ? "text-[var(--color-black)]" : "text-[var(--color-off-white)]"
        )}>
          {data.title || "Join the Movement"}
        </h2>
        
        {data.description && (
          <p className={cn(
            "mb-8",
            "brand-body",
            isLight ? "text-[var(--color-text-muted)]" : "text-[var(--color-off-white)]/80"
          )}>
            {data.description}
          </p>
        )}
        
        <SignupForm
          buttonText={data.buttonText}
          theme={isLight ? "light" : "dark"}
          source="signup-section"
        />
      </div>
    </section>
  );
}