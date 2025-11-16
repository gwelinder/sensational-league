"use client";

import { useMemo } from "react";
import { PopupButton } from "@typeform/embed-react";
import { cn } from "@/lib/utils";

interface TypeformApplyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	formUrl: string;
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

export function TypeformApplyButton({
	formUrl,
	className,
	children,
	...buttonProps
}: TypeformApplyButtonProps) {
	const formId = useMemo(() => extractFormId(formUrl), [formUrl]);

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
		>
			{children}
		</PopupButton>
	);
}

export default TypeformApplyButton;
