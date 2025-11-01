import Link from "next/link";
import { SKIP_TO_CONTENT_ID } from "@/constants/accessibility";
import { ResponsiveLogo } from "@/components/Logo";
import { cn } from "@/lib/utils";

export default function Header() {
	return (
		<header className="brand-bg">
			<a
				href={`#${SKIP_TO_CONTENT_ID}`}
				className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded bg-[var(--color-volt)] px-3 py-1.5 text-black brand-fast focus:brand-rebellious"
			>
				Skip to Content
			</a>
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
				<Link
					href="/"
					aria-label="Sensational League home"
					className={cn(
						"flex items-center gap-4",
						"focus:outline-none focus:ring-2 focus:ring-[var(--color-volt)] focus:ring-offset-2 focus:ring-offset-black rounded"
					)}
				>
					<img
						src="/logos/SL-SPARK-LARGE.svg"
						alt="Sensational League"
						className="w-10 h-10"
					/>
					<div className="hidden sm:block">
						<img
							src="/logos/SL-WORDMARK-LEFT ALIGNED.svg"
							alt="Sensational League"
							className="h-6"
							style={{ filter: 'brightness(0) invert(1)' }}
						/>
					</div>
				</Link>
				
				<nav aria-label="Primary" className="hidden gap-6 md:flex">
					{[
						{ href: "#seasons", label: "Seasons" },
						{ href: "#teams", label: "For Teams" },
						{ href: "#clubs", label: "For Clubs" },
						{ href: "#partners", label: "For Partners" },
						{ href: "#shop", label: "Shop" },
						{ href: "#about", label: "About" }
					].map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							className={cn(
								"brand-body text-[var(--color-off-white)] text-sm",
								"hover:text-[var(--color-volt)]",
								"focus:outline-none focus:text-[var(--color-volt)]",
								"transition-colors duration-200"
							)}
						>
							{label}
						</Link>
					))}
				</nav>
				
				<div className="flex items-center gap-4">
					{/* CTA Button */}
					<Link
						href="#waitlist"
						className={cn(
							"hidden sm:inline-flex",
							"bg-[var(--color-volt)] text-black",
							"px-5 py-2.5 uppercase",
							"brand-caption font-black tracking-wider text-sm",
							"hover:bg-black hover:text-[var(--color-volt)] transition-colors",
							"focus:outline-none focus:ring-2 focus:ring-[var(--color-volt)] focus:ring-offset-2 focus:ring-offset-black"
						)}
					>
						JOIN WAITLIST
					</Link>
					
					{/* Studio Link */}
					<Link
						href="/studio"
						className={cn(
							"brand-caption text-[var(--color-gray-medium)]",
							"hover:text-[var(--color-volt)] underline",
							"brand-fast transition-colors"
						)}
					>
						Studio
					</Link>
				</div>
			</div>
			
			{/* Mobile Navigation - TODO: Implement mobile menu */}
			<div className="md:hidden px-4 pb-3">
				<nav className="flex flex-wrap gap-4" aria-label="Mobile Navigation">
					{[
						{ href: "#seasons", label: "Seasons" },
						{ href: "#teams", label: "Teams" },
						{ href: "#clubs", label: "Clubs" },
						{ href: "#partners", label: "Partners" }
					].map(({ href, label }) => (
						<Link 
							key={href}
							href={href} 
							className={cn(
								"brand-caption text-[var(--color-off-white)]",
								"hover:text-[var(--color-volt)] brand-fast",
								"focus:outline-none focus:text-[var(--color-volt)]",
								"transition-colors duration-200"
							)}
						>
							{label}
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
}
