"use client";

import type React from "react";
import Link from "next/link";
import { useId, useState } from "react";

interface NewsletterSignupProps {
	className?: string;
	buttonText?: string;
	emailPlaceholder?: string;
	consentText?: string;
	successMessage?: string;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
	className = "",
	buttonText = "Join",
	emailPlaceholder = "your@email.com",
	consentText = "Yes! I want to join the Saga Sports Group mailing list and give my consent to receive newsletters about Saga activities, membership benefits, and inspiring stories from the world of women's sports and entrepreneurship.",
	successMessage = "✓ Subscribed! Check your email.",
}) => {
	const emailId = useId();
	const consentId = useId();
	const [email, setEmail] = useState("");
	const [consent, setConsent] = useState(false);
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
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
					source: "homepage-header",
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
			<div
				className={`${className} bg-[var(--secondary)]/10 border border-[var(--secondary)] rounded px-3 py-2`}
			>
				<p className="text-xs font-semibold text-[var(--secondary)]">
					{successMessage}
				</p>
			</div>
		);
	}

	return (
		<div className={className}>
			<form onSubmit={handleSubmit} className="space-y-2">
				<div className="flex gap-2">
					<input
						type="email"
						id={emailId}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder={emailPlaceholder}
						required
						disabled={status === "loading"}
						className="flex-1 px-3 py-2 text-sm bg-white border border-[var(--border)] text-[var(--foreground)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] placeholder:text-[var(--foreground-muted)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
						aria-label="Email address"
					/>
					<button
						type="submit"
						disabled={status === "loading" || !email || !consent}
						className="px-6 py-2 text-xs font-semibold uppercase tracking-wider bg-[var(--primary)] text-white rounded hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
					>
						{status === "loading" ? "..." : buttonText}
					</button>
				</div>

				<div className="flex items-start gap-2">
					<input
						type="checkbox"
						id={consentId}
						checked={consent}
						onChange={(e) => setConsent(e.target.checked)}
						disabled={status === "loading"}
						className="mt-0.5 h-3.5 w-3.5 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)] focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
					/>
					<label
						htmlFor={consentId}
						className="text-[10px] text-[var(--foreground-muted)] leading-tight"
					>
						{consentText}{" "}
					<Link href="/privacy" className="underline hover:text-[var(--foreground)]">
						Privacy Policy
					</Link>
					</label>
				</div>

				{status === "error" && errorMessage && (
					<p className="text-[10px] text-[var(--primary)]">{errorMessage}</p>
				)}
			</form>
		</div>
	);
};
