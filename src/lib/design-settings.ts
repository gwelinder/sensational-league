import { sanityFetch } from "@/sanity/lib/live";

export interface DesignSettings {
  brandColors?: {
    primary?: string;
    background?: string;
    backgroundAlt?: string;
    text?: string;
    textMuted?: string;
  };
  captainStyles?: {
    heroOverlay?: "dark" | "light" | "brand" | "none";
    nameColor?: string;
    taglineColor?: string;
    cardStyle?: "glass" | "solid" | "bordered" | "minimal";
    cardBorderRadius?: string;
    showStats?: boolean;
    statsPosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  };
  typography?: {
    headingStyle?: "uppercase" | "capitalize" | "none";
    headingWeight?: string;
    headingTracking?: string;
  };
  buttons?: {
    primaryStyle?: "filled" | "outline" | "ghost";
    borderRadius?: string;
    hoverEffect?: "lift" | "glow" | "scale" | "none";
  };
}

const DESIGN_SETTINGS_QUERY = `*[_type == "designSettings"][0] {
  brandColors {
    primary,
    background,
    backgroundAlt,
    text,
    textMuted
  },
  captainStyles {
    heroOverlay,
    nameColor,
    taglineColor,
    cardStyle,
    cardBorderRadius,
    showStats,
    statsPosition
  },
  typography {
    headingStyle,
    headingWeight,
    headingTracking
  },
  buttons {
    primaryStyle,
    borderRadius,
    hoverEffect
  }
}`;

// Default values when nothing is set in CMS
export const defaultDesignSettings: DesignSettings = {
  brandColors: {
    primary: "#D4FF00",
    background: "#000000",
    backgroundAlt: "#0a0a0a",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.6)",
  },
  captainStyles: {
    heroOverlay: "dark",
    cardStyle: "glass",
    cardBorderRadius: "32px",
    showStats: true,
    statsPosition: "top-right",
  },
  typography: {
    headingStyle: "uppercase",
    headingWeight: "900",
    headingTracking: "0.15em",
  },
  buttons: {
    primaryStyle: "filled",
    borderRadius: "9999px",
    hoverEffect: "lift",
  },
};

export async function getDesignSettings(): Promise<DesignSettings> {
  const { data } = await sanityFetch({
    query: DESIGN_SETTINGS_QUERY,
  });

  // Merge with defaults
  const settings = data as DesignSettings | null;

  return {
    brandColors: { ...defaultDesignSettings.brandColors, ...settings?.brandColors },
    captainStyles: { ...defaultDesignSettings.captainStyles, ...settings?.captainStyles },
    typography: { ...defaultDesignSettings.typography, ...settings?.typography },
    buttons: { ...defaultDesignSettings.buttons, ...settings?.buttons },
  };
}

/**
 * Generate CSS custom properties from design settings
 */
export function designSettingsToCssVars(settings: DesignSettings): Record<string, string> {
  const vars: Record<string, string> = {};

  // Brand colors
  if (settings.brandColors?.primary) {
    vars["--design-primary"] = settings.brandColors.primary;
  }
  if (settings.brandColors?.background) {
    vars["--design-bg"] = settings.brandColors.background;
  }
  if (settings.brandColors?.backgroundAlt) {
    vars["--design-bg-alt"] = settings.brandColors.backgroundAlt;
  }
  if (settings.brandColors?.text) {
    vars["--design-text"] = settings.brandColors.text;
  }
  if (settings.brandColors?.textMuted) {
    vars["--design-text-muted"] = settings.brandColors.textMuted;
  }

  // Typography
  if (settings.typography?.headingWeight) {
    vars["--design-heading-weight"] = settings.typography.headingWeight;
  }
  if (settings.typography?.headingTracking) {
    vars["--design-heading-tracking"] = settings.typography.headingTracking;
  }

  // Buttons
  if (settings.buttons?.borderRadius) {
    vars["--design-btn-radius"] = settings.buttons.borderRadius;
  }

  // Captain cards
  if (settings.captainStyles?.cardBorderRadius) {
    vars["--design-card-radius"] = settings.captainStyles.cardBorderRadius;
  }

  return vars;
}

/**
 * Get Tailwind-compatible classes for captain card styles
 */
export function getCaptainCardClasses(settings: DesignSettings): string {
  const cardStyle = settings.captainStyles?.cardStyle || "glass";

  const baseClasses = "transition-all duration-300";

  switch (cardStyle) {
    case "glass":
      return `${baseClasses} border border-white/10 bg-white/[0.05] hover:border-[var(--color-volt)]/50 hover:bg-white/[0.08]`;
    case "solid":
      return `${baseClasses} bg-zinc-900 hover:bg-zinc-800`;
    case "bordered":
      return `${baseClasses} border-2 border-white/20 bg-transparent hover:border-[var(--color-volt)]`;
    case "minimal":
      return `${baseClasses} bg-transparent hover:bg-white/5`;
    default:
      return baseClasses;
  }
}

/**
 * Get hero overlay gradient based on settings
 */
export function getHeroOverlayClasses(settings: DesignSettings): string {
  const overlay = settings.captainStyles?.heroOverlay || "dark";

  switch (overlay) {
    case "dark":
      return "bg-gradient-to-t from-black via-black/40 to-transparent";
    case "light":
      return "bg-gradient-to-t from-black/60 via-black/20 to-transparent";
    case "brand":
      return "bg-gradient-to-t from-black via-[var(--color-volt)]/10 to-transparent";
    case "none":
      return "";
    default:
      return "bg-gradient-to-t from-black via-black/40 to-transparent";
  }
}

/**
 * Get stats badge position classes
 */
export function getStatsBadgePosition(settings: DesignSettings): string {
  const position = settings.captainStyles?.statsPosition || "top-right";

  switch (position) {
    case "top-right":
      return "absolute right-4 top-4";
    case "top-left":
      return "absolute left-4 top-4";
    case "bottom-right":
      return "absolute right-4 bottom-4";
    case "bottom-left":
      return "absolute left-4 bottom-4";
    default:
      return "absolute right-4 top-4";
  }
}

/**
 * Get button hover effect classes
 */
export function getButtonHoverClasses(settings: DesignSettings): string {
  const effect = settings.buttons?.hoverEffect || "lift";

  switch (effect) {
    case "lift":
      return "hover:-translate-y-1";
    case "glow":
      return "hover:shadow-[0_0_20px_var(--color-volt)]";
    case "scale":
      return "hover:scale-105";
    case "none":
      return "";
    default:
      return "hover:-translate-y-1";
  }
}
