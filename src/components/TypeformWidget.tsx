"use client";

import { Widget } from "@typeform/embed-react";
import Link from "next/link";
import { useState, useCallback, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import {
	buildTypeformHiddenFields,
	trackTypeformReady,
	trackTypeformStart,
	trackTypeformProgress,
	trackTypeformSubmit,
} from "@/lib/analytics";

interface TypeformWidgetProps {
	formId: string;
	formName?: string;
	height?: number;
	className?: string;
	/** Estimated total questions for progress tracking */
	totalQuestions?: number;
}

/**
 * Typeform inline widget with full GA4/GTM event tracking.
 *
 * Events tracked:
 * - typeform_ready: Form loaded
 * - typeform_start: User begins form (first interaction)
 * - typeform_progress: Question changes
 * - typeform_submit: Form completed
 * - typeform_close: Form closed (for popup variant)
 *
 * Hidden fields passed to Typeform:
 * - UTM params (source, medium, campaign, term, content)
 * - page_url, page_referrer
 * - session_id
 */
export function TypeformWidget({
	formId,
	formName = "player_draft",
	height = 760,
	className,
	totalQuestions = 20,
}: TypeformWidgetProps) {
	const [submitted, setSubmitted] = useState(false);
	const hasStartedRef = useRef(false);
	const lastQuestionIndexRef = useRef(0);

	// Build hidden fields for attribution tracking
	const hiddenFields = useMemo(() => buildTypeformHiddenFields(), []);

	// Track when form is ready
	const handleReady = useCallback(() => {
		trackTypeformReady(formId, formName);
	}, [formId, formName]);

	// Track first interaction (form start)
	const handleStarted = useCallback(
		(data: { responseId: string }) => {
			if (!hasStartedRef.current) {
				hasStartedRef.current = true;
				trackTypeformStart(formId, formName);
			}
			// Typeform Pro: onStarted includes responseId
			if (data?.responseId) {
				console.debug("[Typeform] Started with responseId:", data.responseId);
			}
		},
		[formId, formName],
	);

	// Track question progress
	const handleQuestionChanged = useCallback(
		(data: { ref: string; formId: string }) => {
			// Track as started if not already
			if (!hasStartedRef.current) {
				hasStartedRef.current = true;
				trackTypeformStart(formId, formName);
			}

			lastQuestionIndexRef.current += 1;
			trackTypeformProgress(
				formId,
				lastQuestionIndexRef.current,
				data?.ref,
				totalQuestions,
				formName,
			);
		},
		[formId, formName, totalQuestions],
	);

	// Track form submission
	const handleSubmit = useCallback(
		(data: { responseId: string }) => {
			trackTypeformSubmit(formId, data?.responseId, formName);
			setSubmitted(true);
		},
		[formId, formName],
	);

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
						Thanks for applying to become a Sensational player. We&apos;ll be in
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
							onClick={() => {
								setSubmitted(false);
								hasStartedRef.current = false;
								lastQuestionIndexRef.current = 0;
							}}
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
					hidden={hiddenFields}
					onReady={handleReady}
					onStarted={handleStarted}
					onQuestionChanged={handleQuestionChanged}
					onSubmit={handleSubmit}
				/>
			)}
		</div>
	);
}

export default TypeformWidget;
