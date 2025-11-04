import Link from "next/link";
import type React from "react";

interface ButtonProps {
	to?: string;
	href?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	children: React.ReactNode;
	variant?: "primary" | "secondary";
	className?: string;
	type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
	to,
	href,
	onClick,
	children,
	variant = "primary",
	className = "",
	type = "button",
}) => {
	const baseClasses =
		"inline-block px-10 py-4 text-xs font-semibold uppercase tracking-widest border transition-all duration-300 transform hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--background)]";

	// Make primary buttons a confident Sensational League red with luminous hover state
	const variantClasses =
		variant === "primary"
			? "bg-[var(--primary)] text-white border-transparent hover:brightness-110 focus:ring-[var(--primary)]"
			: "bg-transparent text-[var(--foreground)] border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] focus:ring-[var(--foreground)]";

	const finalClassName = `${baseClasses} ${variantClasses} ${className}`;

	if (to) {
		return (
			<Link href={to} className={finalClassName}>
				{children}
			</Link>
		);
	}

	if (href) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={finalClassName}
			>
				{children}
			</a>
		);
	}

	return (
		<button type={type} onClick={onClick} className={finalClassName}>
			{children}
		</button>
	);
};

export default Button;
