import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { SanityLive } from "@/sanity/lib/live";

export default async function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isEnabled = (await draftMode()).isEnabled;

  return (
    <>
      {children}
      <SanityLive />
      {isEnabled && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </>
  );
}