"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useId } from "react";

interface SignupFormProps {
  buttonText?: string;
  theme?: "light" | "dark";
  source?: string;
}

export default function SignupForm({ buttonText, theme = "light", source = "homepage" }: SignupFormProps) {
  const isDark = theme === "dark";
  const emailId = useId();
  const consentId = useId();

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consent) {
      setErrorMessage("Please accept the privacy policy to continue");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          consentGiven: consent,
          consentTimestamp: new Date().toISOString(),
          source,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setEmail("");
      setConsent(false);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Failed to subscribe. Please try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto max-w-md text-center">
        <div
          className={cn(
            "rounded-full px-6 py-3 font-bold brand-caption",
            isDark
              ? "bg-[var(--color-volt)]/20 border border-[var(--color-volt)] text-[var(--color-volt)]"
              : "bg-[var(--color-volt)]/20 border border-[var(--color-volt)] text-[var(--color-black)]"
          )}
        >
          ⚡ Welcome to the League! Check your email.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id={emailId}
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            placeholder="Your email address"
            aria-label="Email address for signup"
            className={cn(
              "flex-1 rounded-full px-5 py-3 brand-body",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-volt)]/20",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isDark
                ? "border border-[var(--color-gray-light)] bg-[var(--color-black)]/50 text-[var(--color-off-white)] placeholder-[var(--color-gray-light)] focus:border-[var(--color-volt)]"
                : "border border-[var(--color-gray-light)] bg-white text-black placeholder-[var(--color-gray-medium)] focus:border-[var(--color-volt)]"
            )}
          />
          <button
            type="submit"
            disabled={status === "loading" || !email || !consent}
            className={cn(
              "rounded-full px-8 py-3 brand-caption font-bold",
              "brand-motion-right brand-fast",
              "hover:scale-105 transform-gpu",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-volt)] focus:ring-offset-2",
              "transition-all duration-200",
              "bg-[var(--color-volt)] text-[var(--color-black)]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            )}
          >
            {status === "loading" ? "..." : (buttonText || "Sign Up")}
          </button>
        </div>

        <div className="flex items-start gap-2 px-2">
          <input
            type="checkbox"
            id={consentId}
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            disabled={status === "loading"}
            className={cn(
              "mt-0.5 h-4 w-4 rounded",
              "focus:ring-[var(--color-volt)] focus:ring-offset-0",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isDark
                ? "border-[var(--color-gray-light)] text-[var(--color-volt)] bg-[var(--color-black)]/50"
                : "border-[var(--color-gray-medium)] text-[var(--color-volt)] bg-white"
            )}
          />
          <label
            htmlFor={consentId}
            className={cn(
              "text-xs leading-tight",
              isDark ? "text-[var(--color-gray-light)]" : "text-[var(--color-gray-medium)]"
            )}
          >
            I want to join Sensational League and receive updates about the world&apos;s most innovative women&apos;s football league.{" "}
            <Link href="/privacy" className={cn("underline", isDark ? "hover:text-[var(--color-off-white)]" : "hover:text-black")}>
              Privacy Policy
            </Link>
          </label>
        </div>

        {status === "error" && errorMessage && (
          <p className={cn(
            "text-xs px-2",
            isDark ? "text-[var(--color-orange)]" : "text-red-600"
          )}>
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}
