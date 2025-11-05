import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Privacy Policy - Sensational League",
	robots: {
		index: false,
		follow: false,
	},
};

const PageHeader = ({ children }: { children: React.ReactNode }) => (
	<div className="pt-48 pb-24 bg-[var(--surface)] border-b border-[var(--border)]">
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h1 className="display-heading text-6xl md:text-8xl">{children}</h1>
		</div>
	</div>
);

export default function PrivacyPage() {
	return (
		<div className="bg-[var(--background)] text-[var(--foreground)]">
			<PageHeader>Privacy Policy</PageHeader>

			{/* Back to home link */}
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-8">
				<Link
					href="/"
					className="inline-flex items-center text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
					style={{
						fontFamily: "'GT Standard Small Narrow', sans-serif",
						fontWeight: 500,
					}}
				>
					← Back to home
				</Link>
			</div>

			<section className="py-20 md:py-24">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
					<div className="prose prose-lg max-w-none">
						<p className="text-sm text-[var(--foreground-muted)] mb-8">
							Last updated: October 31, 2025
						</p>

						<h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
							1. Introduction
						</h2>
						<p className="text-[var(--foreground)] leading-relaxed mb-6">
								Sensational League (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is
							committed to protecting your personal data. This privacy policy
							explains how we collect, use, and safeguard your information when you
							visit our website and subscribe to our newsletter.
						</p>

						<h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
							2. Data We Collect
						</h2>
						<p className="text-[var(--foreground)] leading-relaxed mb-4">
							When you subscribe to our newsletter, we collect:
						</p>
						<ul className="list-disc list-inside text-[var(--foreground)] leading-relaxed mb-6 space-y-2">
							<li>Email address</li>
							<li>Consent timestamp and confirmation</li>
							<li>IP address (for security and fraud prevention)</li>
							<li>Browser information (user agent)</li>
							<li>Source of subscription (which page you subscribed from)</li>
						</ul>

						<h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
							3. How We Use Your Data
						</h2>
						<p className="text-[var(--foreground)] leading-relaxed mb-4">
							We use your personal data to:
						</p>
						<ul className="list-disc list-inside text-[var(--foreground)] leading-relaxed mb-6 space-y-2">
								<li>Send you our newsletter and updates about women&rsquo;s sports</li>
							<li>Provide information about Sensational League</li>
							<li>Share industry insights and company news</li>
							<li>Comply with legal obligations</li>
						</ul>

						<h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
							4. Legal Basis for Processing
						</h2>
						<p className="text-[var(--foreground)] leading-relaxed mb-6">
							We process your personal data based on your explicit consent, which
							you provide when checking the consent box during newsletter signup.
							You have the right to withdraw this consent at any time.
						</p>

						<h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
							5. Data Storage and Security
						</h2>
						<p className="text-[var(--foreground)] leading-relaxed mb-6">
							Your data is securely stored with enterprise-grade security. We use
							industry-standard encryption and access controls to protect your information.
							Data is stored within the EU to comply with GDPR requirements.
						</p>

						<h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
							6. Your Rights Under GDPR
						</h2>
						<p className="text-[var(--foreground)] leading-relaxed mb-4">
							You have the following rights:
						</p>
						<ul className="list-disc list-inside text-[var(--foreground)] leading-relaxed mb-6 space-y-2">
							<li>
								<strong>Right to access:</strong> Request a copy of your personal
								data
							</li>
							<li>
								<strong>Right to rectification:</strong> Correct inaccurate data
							</li>
							<li>
								<strong>Right to erasure:</strong> Request deletion of your data
							</li>
							<li>
								<strong>Right to restrict processing:</strong> Limit how we use your
								data
							</li>
							<li>
								<strong>Right to data portability:</strong> Receive your data in a
								structured format
							</li>
							<li>
								<strong>Right to object:</strong> Object to processing of your data
							</li>
							<li>
								<strong>Right to withdraw consent:</strong> Unsubscribe at any time
							</li>
						</ul>

						<h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
							7. How to Unsubscribe
						</h2>
						<p className="text-[var(--foreground)] leading-relaxed mb-6">
							You can unsubscribe from our newsletter at any time by clicking the
							&quot;Unsubscribe&quot; link in any email we send you, or by contacting us
							directly at{" "}
							<a
								href="mailto:hello@sensationalleague.com?subject=Unsubscribe"
								className="text-[var(--primary)] underline hover:text-[var(--foreground)]"
							>
								hello@sensationalleague.com
							</a>
							.
						</p>

						<h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
							8. Data Retention
						</h2>
						<p className="text-[var(--foreground)] leading-relaxed mb-6">
							We retain your subscription data as long as you remain subscribed. If
							you unsubscribe, we may retain your email address for up to 30 days
							to prevent accidental re-subscription, after which it will be
							permanently deleted.
						</p>

						<h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
							9. Cookies and Tracking
						</h2>
						<p className="text-[var(--foreground)] leading-relaxed mb-6">
							Our website uses minimal tracking. We collect basic analytics to
							understand how visitors use our site. We do not use advertising
							cookies or share your data with third-party advertisers.
						</p>

						<h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
							10. International Data Transfers
						</h2>
						<p className="text-[var(--foreground)] leading-relaxed mb-6">
							Your data is primarily stored and processed within the European
							Economic Area (EEA). If data is transferred outside the EEA, we
							ensure appropriate safeguards are in place.
						</p>

						<h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
								11. Children&rsquo;s Privacy
						</h2>
						<p className="text-[var(--foreground)] leading-relaxed mb-6">
							Our services are not directed to individuals under 16 years of age. We
							do not knowingly collect personal data from children.
						</p>

						<h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
							12. Changes to This Policy
						</h2>
						<p className="text-[var(--foreground)] leading-relaxed mb-6">
							We may update this privacy policy from time to time. We will notify
							subscribers of any material changes via email.
						</p>

						<h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
							13. Data Controller
						</h2>
						<p className="text-[var(--foreground)] leading-relaxed mb-4">
							The data controller responsible for your personal data is:
						</p>
						<div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border)] mb-8">
							<p className="text-[var(--foreground)] font-semibold mb-3">
								Sensational League ApS
							</p>
							<p className="text-[var(--foreground)] text-sm mb-1">
								Frederiksberg Alle 62, 4. tv
							</p>
							<p className="text-[var(--foreground)] text-sm mb-3">
								1820 Frederiksberg C, Denmark
							</p>
							<p className="text-[var(--foreground)] text-sm mb-1">
								CVR-nummer: 45913929
							</p>
							<p className="text-[var(--foreground)] text-sm mb-1">
								Tel:{" "}
								<a
									href="tel:+4524964076"
									className="text-[var(--primary)] underline hover:text-[var(--foreground)]"
								>
									+45 24 96 40 76
								</a>
							</p>
							<p className="text-[var(--foreground)] text-sm">
								Email:{" "}
								<a
									href="mailto:hello@sensationalleague.com"
									className="text-[var(--primary)] underline hover:text-[var(--foreground)]"
								>
									hello@sensationalleague.com
								</a>
							</p>
						</div>

						<h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
							14. Supervisory Authority
						</h2>
						<p className="text-[var(--foreground)] leading-relaxed mb-4">
							You have the right to lodge a complaint with the Danish Data Protection Authority (Datatilsynet) or your local data protection authority if you believe we have not handled your personal data in accordance with GDPR.
						</p>
						<div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border)] mb-6">
							<p className="text-[var(--foreground)] font-semibold mb-2">
								Datatilsynet (Danish Data Protection Authority)
							</p>
							<p className="text-[var(--foreground)] text-sm mb-1">
								Carl Jacobsens Vej 35
							</p>
							<p className="text-[var(--foreground)] text-sm mb-2">
								2500 Valby, Denmark
							</p>
							<p className="text-[var(--foreground)] text-sm">
								Website:{" "}
								<a
									href="https://www.datatilsynet.dk"
									target="_blank"
									rel="noopener noreferrer"
									className="text-[var(--primary)] underline hover:text-[var(--foreground)]"
								>
									www.datatilsynet.dk
								</a>
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
