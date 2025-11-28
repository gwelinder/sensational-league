/**
 * Utility functions for captain-related components
 */

/**
 * Generates a consistent gradient background for a captain card based on their name
 * Uses the name's characters to deterministically generate hue values
 */
export function getCaptainGradient(name?: string): string {
  const base = (name || "Sensational").split("").reduce((acc, char, index) => {
    return acc + char.charCodeAt(0) * (index + 1);
  }, 0);
  const hue = base % 360;
  const secondary = (hue + 32) % 360;
  return `linear-gradient(135deg, hsl(${hue}, 65%, 22%), hsl(${secondary}, 70%, 12%))`;
}

/**
 * Extracts initials from a captain's name
 * Returns up to 2 characters (first letter of first and last name)
 * Falls back to "SL" if no name is provided
 */
export function getInitials(name?: string): string {
  if (!name) return "SL";
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "SL"
  );
}

/**
 * Formats a position string for display
 * Capitalizes the first letter
 */
export function formatPosition(position?: string): string {
  if (!position) return "Player";
  return position.charAt(0).toUpperCase() + position.slice(1);
}

/**
 * Generates position-specific styles/colors
 */
export function getPositionColor(position?: string): string {
  const positionColors: Record<string, string> = {
    goalkeeper: "var(--color-volt)",
    defender: "#00FBFF",  // Cyan
    midfielder: "#AE00FF", // Purple
    forward: "#FF4400",   // Orange
  };
  return positionColors[position || ""] || "var(--color-volt)";
}
