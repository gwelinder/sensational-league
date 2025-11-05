import { draftMode } from "next/headers";

export default async function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isEnabled = (await draftMode()).isEnabled;

  return (
    <>
      {children}
      {/* The Studio itself should not include VisualEditing/SanityLive.
          Those belong in the site preview (the page being embedded by Presentation).
          Keeping Studio lean avoids message/event duplication that can cause reloads. */}
    </>
  );
}
