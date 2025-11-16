"use client";

import { Widget } from "@typeform/embed-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TypeformWidgetProps {
	formId: string;
	height?: number;
	className?: string;
}

export function TypeformWidget({
	formId,
	height = 760,
	className,
}: TypeformWidgetProps) {
	const [submitted, setSubmitted] = useState(false);

	if (!formId) {
		return null;
	}

	return (
		<div
			className={cn(
				"rounded-3xl border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
				className,
			)}
		>
			{submitted ? (
				<div className="space-y-4 p-8 text-black">
					<p className="text-2xl font-black uppercase tracking-[0.15em]">
						Thanks for applying
					</p>
					<p className="brand-body text-base text-black/80">
						Thanks for applying to become a Sensational player. We’ll be in
						touch soon by mail. Sign up for our newsletter and share your
						Sensational dreams with your network of friends and fans.
					</p>
					<div className="flex flex-wrap gap-3">
						<Link
							href="#newsletter"
							className="inline-flex items-center gap-2 border-2 border-black bg-black px-5 py-2 text-sm font-black uppercase tracking-[0.2em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:translate-x-0.5"
						>
							Join the newsletter
						</Link>
						<button
							type="button"
							onClick={() => setSubmitted(false)}
							className="inline-flex items-center gap-2 border-2 border-black px-5 py-2 text-sm font-black uppercase tracking-[0.2em] text-black transition-all duration-200 hover:-translate-y-0.5 hover:translate-x-0.5"
						>
							Submit another response
						</button>
					</div>
				</div>
			) : (
				<Widget
					id={formId}
					hideFooter
					hideHeaders
					inlineOnMobile
					className="typeform-widget"
					style={{ width: "100%", height }}
					source="sensational-league-player-draft-inline"
					keepSession
					onSubmit={() => setSubmitted(true)}
				/>
			)}
		</div>
	);
}

export default TypeformWidget;
