'use client';

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownParts {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

function calculateParts(deadline?: string): CountdownParts | null {
	if (!deadline) return null;
	const target = new Date(deadline).getTime();
	if (Number.isNaN(target)) return null;
	const now = Date.now();
	const diff = Math.max(0, target - now);
	return {
		days: Math.floor(diff / (1000 * 60 * 60 * 24)),
		hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((diff / (1000 * 60)) % 60),
		seconds: Math.floor((diff / 1000) % 60),
	};
}

export interface CountdownTickerProps {
	deadline?: string;
	label?: string;
	timezone?: string;
	variant?: "dark" | "light";
	className?: string;
}

export function CountdownTicker({
	deadline,
	label,
	timezone,
	variant = "dark",
	className,
}: CountdownTickerProps) {
	const [, setTick] = useState(0);

	useEffect(() => {
		if (!deadline) return undefined;
		const interval = setInterval(() => {
			setTick((value) => value + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, [deadline]);

	const parts = calculateParts(deadline);
	if (!parts) return null;

	const labelClasses =
		variant === "dark" ? "text-white/80" : "text-black/60";
	const wrapperClasses =
		variant === "dark"
			? "border-white/30 bg-white/10 text-white"
			: "border-black/20 bg-black/5 text-black";
	const subLabelClasses =
		variant === "dark" ? "text-white/70" : "text-black/60";

	return (
		<div className={cn("space-y-4", className)}>
			{label && (
				<p className={cn("brand-caption uppercase tracking-[0.2em]", labelClasses)}>
					{label}
					{timezone ? ` • ${timezone}` : ""}
				</p>
			)}
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
				{[
					{ label: "Days", value: parts.days },
					{ label: "Hours", value: parts.hours },
					{ label: "Minutes", value: parts.minutes },
					{ label: "Seconds", value: parts.seconds },
				].map((segment) => (
					<div
						key={segment.label}
						className={cn("rounded border px-4 py-3 text-center", wrapperClasses)}
					>
						<div className="text-3xl font-black tracking-wide">
							{String(segment.value).padStart(2, "0")}
						</div>
						<p
							className={cn(
								"brand-caption text-xs uppercase tracking-[0.3em]",
								subLabelClasses,
							)}
						>
							{segment.label}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default CountdownTicker;
