"use client";

import { Widget } from "@typeform/embed-react";
import { cn } from "@/lib/utils";

interface TypeformWidgetProps {
	formId: string;
	height?: number;
	className?: string;
}

export function TypeformWidget({ formId, height = 760, className }: TypeformWidgetProps) {
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
			<Widget
				id={formId}
				hideFooter
				hideHeaders
				inlineOnMobile
				className="typeform-widget"
				style={{ width: "100%", height }}
				source="sensational-league-player-draft-inline"
				keepSession
			/>
		</div>
	);
}

export default TypeformWidget;
