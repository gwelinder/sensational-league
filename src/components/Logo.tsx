import Image from "next/image";
import { cn } from "@/lib/utils";

export type LogoVariant = 
  | "spark-large" 
  | "spark-medium" 
  | "spark-small" 
  | "secondary-mark"
  | "wordmark-one-line"
  | "wordmark-centered"
  | "wordmark-left-aligned"
  | "primary-lockup"
  | "secondary-lockup-one-line"
  | "secondary-lockup-centered"
  | "secondary-lockup-left-aligned";

export type LogoColor = "black" | "white" | "volt";

interface LogoProps {
  variant: LogoVariant;
  color?: LogoColor;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
}

/**
 * Sensational League Logo Component
 * 
 * Implements the complete brand guidelines for logo usage:
 * - Hero Mark (Large): 400px+ applications
 * - Hero Mark (Medium): 200-400px applications 
 * - Hero Mark (Small): 75-150px applications
 * - Secondary Mark: Enhanced speed/sharpness illusion
 * - Wordmarks: Various layout configurations
 * - Lockups: Spark + wordmark combinations
 * 
 * Brand Guidelines:
 * - Primary logo requires 1/2 x-height clearspace
 * - Secondary logo requires full x-height clearspace
 * - Always ensure right-leaning movement direction
 * - Use appropriate contrast for backgrounds
 */
export function Logo({ 
  variant, 
  color = "black", 
  width, 
  height, 
  className,
  priority = false,
  alt = "Sensational League"
}: LogoProps) {
  // Get the appropriate logo file path
  const getLogoPath = (): string => {
    const svgMap: Record<LogoVariant, string> = {
      "spark-large": "/logos/SL-SPARK-LARGE.svg",
      "spark-medium": "/logos/SL-SPARK-MEDIUM.svg", 
      "spark-small": "/logos/SL-SPARK-SMALL.svg",
      "secondary-mark": "/logos/SL-SECONDARY MARK.svg",
      "wordmark-one-line": "/logos/SL-WORDMARK-ONE LINE.svg",
      "wordmark-centered": "/logos/SL-WORDMARK-CENTERED.svg",
      "wordmark-left-aligned": "/logos/SL-WORDMARK-LEFT ALIGNED.svg",
      "primary-lockup": "/logos/SL-PRIMARY LOCKUP.svg",
      "secondary-lockup-one-line": "/logos/SL-SECONDARY LOCKUP-ONE LINE.svg",
      "secondary-lockup-centered": "/logos/SL-SECONDARY LOCKUP-CENTERED.svg",
      "secondary-lockup-left-aligned": "/logos/SL-SECONDARY LOCKUP-LEFT ALIGNED.svg"
    };
    
    return svgMap[variant];
  };

  // Get default dimensions based on variant and brand guidelines
  const getDefaultDimensions = (): { width: number; height: number } => {
    const dimensionMap: Record<LogoVariant, { width: number; height: number }> = {
      // Spark marks - maintaining aspect ratio from brand guidelines
      "spark-large": { width: 400, height: 160 },
      "spark-medium": { width: 300, height: 120 }, 
      "spark-small": { width: 150, height: 60 },
      "secondary-mark": { width: 300, height: 67 }, // As per guidelines
      
      // Wordmarks
      "wordmark-one-line": { width: 240, height: 32 },
      "wordmark-centered": { width: 200, height: 48 },
      "wordmark-left-aligned": { width: 200, height: 48 },
      
      // Lockups
      "primary-lockup": { width: 280, height: 120 },
      "secondary-lockup-one-line": { width: 300, height: 48 },
      "secondary-lockup-centered": { width: 260, height: 80 },
      "secondary-lockup-left-aligned": { width: 260, height: 80 }
    };
    
    return dimensionMap[variant];
  };

  // Get clearspace class based on variant
  const getClearspaceClass = (): string => {
    const isSecondaryMark = variant === "secondary-mark" || variant.includes("secondary-lockup");
    return isSecondaryMark ? "p-4" : "p-2"; // Full x-height vs 1/2 x-height
  };

  // Get color filter for SVGs (since we're using SVGs, we can style them with CSS)
  const getColorClass = (): string => {
    const colorMap: Record<LogoColor, string> = {
      "black": "text-[var(--color-black)]",
      "white": "text-white",
      "volt": "text-[var(--color-volt)]"
    };
    return colorMap[color];
  };

  const defaultDimensions = getDefaultDimensions();
  const logoWidth = width || defaultDimensions.width;
  const logoHeight = height || defaultDimensions.height;
  const logoPath = getLogoPath();

  return (
    <div className={cn(
      "inline-flex items-center justify-center brand-motion-right",
      getClearspaceClass(),
      className
    )}>
      <Image
        src={logoPath}
        alt={alt}
        width={logoWidth}
        height={logoHeight}
        priority={priority}
        className={cn(
          "object-contain",
          getColorClass(),
          // Ensure right-leaning optical adjustment for secondary marks
          variant.includes("secondary") && "transform translate-x-1"
        )}
        style={{ 
          width: logoWidth, 
          height: logoHeight,
          // Apply color via CSS filter for SVGs
          filter: color === "volt" ? "hue-rotate(60deg) saturate(2)" : 
                 color === "white" ? "brightness(0) invert(1)" : "none"
        }}
      />
    </div>
  );
}

/**
 * Responsive Logo Component
 * Automatically selects appropriate logo size based on container width
 */
interface ResponsiveLogoProps {
  type?: "spark" | "wordmark" | "lockup";
  color?: LogoColor;
  className?: string;
  priority?: boolean;
  alt?: string;
}

export function ResponsiveLogo({ 
  type = "spark", 
  color = "black", 
  className,
  priority = false,
  alt = "Sensational League"
}: ResponsiveLogoProps) {
  // Use CSS container queries for responsive logo sizing
  return (
    <div className={cn("@container", className)}>
      {/* Large screens - use large variant */}
      <div className="@[400px]:block hidden">
        <Logo 
          variant={type === "spark" ? "spark-large" : 
                  type === "wordmark" ? "wordmark-one-line" : 
                  "primary-lockup"}
          color={color}
          priority={priority}
          alt={alt}
        />
      </div>
      
      {/* Medium screens - use medium variant */}
      <div className="@[200px]:block @[400px]:hidden hidden">
        <Logo 
          variant={type === "spark" ? "spark-medium" : 
                  type === "wordmark" ? "wordmark-centered" : 
                  "secondary-lockup-centered"}
          color={color}
          priority={priority}
          alt={alt}
        />
      </div>
      
      {/* Small screens - use small variant */}
      <div className="@[200px]:hidden block">
        <Logo 
          variant={type === "spark" ? "spark-small" : 
                  type === "wordmark" ? "wordmark-left-aligned" : 
                  "secondary-lockup-one-line"}
          color={color}
          priority={priority}
          alt={alt}
        />
      </div>
    </div>
  );
}

/**
 * Animated Spark Logo with trail effect
 * For hero sections and high-impact moments
 */
interface AnimatedSparkProps {
  size?: "small" | "medium" | "large";
  color?: LogoColor;
  showTrail?: boolean;
  className?: string;
}

export function AnimatedSpark({ 
  size = "medium", 
  color = "volt", 
  showTrail = true,
  className 
}: AnimatedSparkProps) {
  const variant: LogoVariant = `spark-${size}`;
  
  return (
    <div className={cn(
      "relative inline-block",
      showTrail && "brand-spark-trail",
      className
    )}>
      <Logo 
        variant={variant}
        color={color}
        className="brand-fast hover:scale-105 transform-gpu"
        priority
        alt="Sensational League Spark"
      />
    </div>
  );
}