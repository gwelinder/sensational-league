"use client";

import { cn } from "@/lib/utils";

interface SignupFormProps {
  buttonText?: string;
  theme?: "light" | "dark";
}

export default function SignupForm({ buttonText, theme = "light" }: SignupFormProps) {
  const isDark = theme === "dark";
  
  return (
    <form
      className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const input = form.elements.namedItem("email") as HTMLInputElement | null;
        if (input) alert(`Thanks! We'll keep you posted at ${input.value}.`);
      }}
    >
      <input
        name="email"
        type="email"
        required
        placeholder="Your email address"
        aria-label="Email address for signup"
        className={cn(
          "flex-1 rounded-full px-5 py-3 brand-body",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-volt)]/20",
          "transition-all duration-200",
          isDark
            ? "border border-[var(--color-gray-light)] bg-[var(--color-black)]/50 text-[var(--color-off-white)] placeholder-[var(--color-gray-light)] focus:border-[var(--color-volt)]"
            : "border border-[var(--color-gray-light)] bg-white text-black placeholder-[var(--color-gray-medium)] focus:border-[var(--color-volt)]"
        )}
      />
      <button
        type="submit"
        className={cn(
          "rounded-full px-8 py-3 brand-caption font-bold",
          "brand-motion-right brand-fast",
          "hover:scale-105 transform-gpu",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-volt)] focus:ring-offset-2",
          "transition-all duration-200",
          "bg-[var(--color-volt)] text-[var(--color-black)]"
        )}
      >
        {buttonText || "Sign Up"}
      </button>
    </form>
  );
}
