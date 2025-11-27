"use client";

import { useMemo, useCallback, useRef } from "react";
import { PopupButton } from "@typeform/embed-react";
import { cn } from "@/lib/utils";
import {
	buildTypeformHiddenFields,
	trackTypeformReady,
	trackTypeformStart,
	trackTypeformProgress,
	trackTypeformSubmit,
	trackTypeformClose,
} from "@/lib/analytics";

interface TypeformApplyButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	formUrl: string;
	formName?: string;
	/** Estimated total questions for progress tracking */
	totalQuestions?: number;
}

function extractFormId(formUrl: string): string | undefined {
	if (!formUrl) return undefined;
	const trimmed = formUrl.trim();
	if (!trimmed) return undefined;
	if (!trimmed.includes("/")) {
		return trimmed;
	}
	const match = trimmed.match(/typeform\.com\/to\/([A-Za-z0-9_-]+)/i);
	return match?.[1];
}

/**
 * Typeform popup button with full GA4/GTM event tracking.
 *
 * Events tracked:
 * - typeform_ready: Form loaded
 * - typeform_start: User begins form
 * - typeform_progress: Question changes
 * - typeform_submit: Form completed
 * - typeform_close: Popup closed (abandonment tracking)
 *
 * Hidden fields passed to Typeform:
 * - UTM params (source, medium, campaign, term, content)
 * - page_url, page_referrer
 * - session_id
 */
export function TypeformApplyButton({
	formUrl,
	formName = "player_draft",
	totalQuestions = 20,
	className,
	children,
	...buttonProps
}: TypeformApplyButtonProps) {
	const formId = useMemo(() => extractFormId(formUrl), [formUrl]);
	const hasStartedRef = useRef(false);
	const lastQuestionIndexRef = useRef(0);
	const hasSubmittedRef = useRef(false);

	// Build hidden fields for attribution tracking
	const hiddenFields = useMemo(() => buildTypeformHiddenFields(), []);

	// Track when form is ready
	const handleReady = useCallback(() => {
		if (formId) {
			trackTypeformReady(formId, formName);
		}
	}, [formId, formName]);

	// Track first interaction (form start)
	const handleStarted = useCallback(
		(data: { responseId: string }) => {
			if (!hasStartedRef.current && formId) {
				hasStartedRef.current = true;
				trackTypeformStart(formId, formName);
			}
			if (data?.responseId) {
				console.debug("[Typeform] Started with responseId:", data.responseId);
			}
		},
		[formId, formName],
	);

	// Track question progress
	const handleQuestionChanged = useCallback(
		(data: { ref: string; formId: string }) => {
			if (!formId) return;

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
			if (formId) {
				hasSubmittedRef.current = true;
				trackTypeformSubmit(formId, data?.responseId, formName);
			}
		},
		[formId, formName],
	);

	// Track popup close (abandonment if not submitted)
	const handleClose = useCallback(() => {
		if (formId && !hasSubmittedRef.current && hasStartedRef.current) {
			trackTypeformClose(
				formId,
				lastQuestionIndexRef.current,
				totalQuestions,
				formName,
			);
		}
		// Reset state for next open
		hasStartedRef.current = false;
		lastQuestionIndexRef.current = 0;
		hasSubmittedRef.current = false;
	}, [formId, formName, totalQuestions]);

	// Fallback for invalid form URLs
	if (!formId) {
		return (
			<button
				type="button"
				className={cn(className)}
				onClick={() => window.open(formUrl, "_blank", "noopener,noreferrer")}
				{...buttonProps}
			>
				{children}
			</button>
		);
	}

	return (
		<PopupButton
			id={formId}
			className={cn(className)}
			source="sensational-league-player-draft"
			keepSession
			hidden={hiddenFields}
			onReady={handleReady}
			onStarted={handleStarted}
			onQuestionChanged={handleQuestionChanged}
			onSubmit={handleSubmit}
			onClose={handleClose}
		>
			{children}
		</PopupButton>
	);
}

export default TypeformApplyButton;
