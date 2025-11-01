"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { disableDraftMode } from "@/app/actions";
import { useDraftModeEnvironment } from "next-sanity/hooks";

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const environment = useDraftModeEnvironment();
  
  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {pending ? (
        <span className="bg-black text-white px-4 py-2 rounded">
          Disabling draft mode...
        </span>
      ) : (
        <button 
          type="button" 
          onClick={disable}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Disable draft mode
        </button>
      )}
    </div>
  );
}