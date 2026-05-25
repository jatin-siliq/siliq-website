"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  variant?: "light" | "dark";
  intensity?: "subtle" | "normal" | "strong";
}

/**
 * AuroraBackground — SILIQ branded silver/platinum aurora effect.
 *
 * Variants:
 *   - "light": for cream/white sections (silver shimmer on light)
 *   - "dark":  for black sections (silver shimmer on dark)
 *
 * Intensity controls opacity of the aurora layer.
 */
export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  variant = "light",
  intensity = "subtle",
  ...props
}: AuroraBackgroundProps) => {
  const isDark = variant === "dark";

  // Opacity tuned to keep things tasteful for a luxury brand
  const opacityClass = {
    subtle: "opacity-30",
    normal: "opacity-50",
    strong: "opacity-70",
  }[intensity];

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            // Aurora gradient: silver / platinum / pearl shimmer
            isDark
              ? `[--gradient-base:repeating-linear-gradient(100deg,var(--aurora-black)_0%,var(--aurora-black)_7%,var(--aurora-transparent)_10%,var(--aurora-transparent)_12%,var(--aurora-black)_16%)]
                 [--aurora:repeating-linear-gradient(100deg,var(--aurora-silver)_10%,var(--aurora-platinum)_15%,var(--aurora-pearl)_20%,var(--aurora-platinum)_25%,var(--aurora-silver)_30%)]`
              : `[--gradient-base:repeating-linear-gradient(100deg,var(--aurora-white)_0%,var(--aurora-white)_7%,var(--aurora-transparent)_10%,var(--aurora-transparent)_12%,var(--aurora-white)_16%)]
                 [--aurora:repeating-linear-gradient(100deg,var(--aurora-silver)_10%,var(--aurora-platinum)_15%,var(--aurora-pearl)_20%,var(--aurora-platinum)_25%,var(--aurora-graphite)_30%)]`,

            "[background-image:var(--gradient-base),var(--aurora)]",
            "[background-size:300%,_200%]",
            "[background-position:50%_50%,50%_50%]",
            "filter blur-[10px]",
            isDark ? "" : "invert",

            // Pseudo element does the actual animation work
            'after:content-[""] after:absolute after:inset-0',
            "after:[background-image:var(--gradient-base),var(--aurora)]",
            "after:[background-size:200%,_100%]",
            "after:animate-aurora after:[background-attachment:fixed]",
            isDark ? "after:mix-blend-screen" : "after:mix-blend-difference",

            "pointer-events-none",
            "absolute -inset-[10px] will-change-transform",
            opacityClass,

            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--aurora-transparent)_70%)]`
          )}
        />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};
