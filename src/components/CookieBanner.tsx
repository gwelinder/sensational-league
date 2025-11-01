"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie-consent-v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) {
        // Defer state update to avoid calling setState directly in effect
        setTimeout(() => setVisible(true), 0);
      }
    } catch {
      setTimeout(() => setVisible(true), 0);
    }
  }, []);

  if (!visible) return null;

  function setConsent(value: "accepted" | "declined") {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-5xl rounded-t-xl border border-black/10 bg-white p-4 shadow-lg dark:border-white/10 dark:bg-black">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        By using this website, you agree to our use of cookies. We use cookies to provide you with a great experience and to help our website run effectively.
      </p>
      <div className="mt-3 flex gap-3">
        <button
          type="button"
          onClick={() => setConsent("declined")}
          className="inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm text-zinc-800 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-900"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => setConsent("accepted")}
          className="inline-flex items-center justify-center rounded-md bg-black px-3 py-1.5 text-sm text-white hover:bg-zinc-900"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
