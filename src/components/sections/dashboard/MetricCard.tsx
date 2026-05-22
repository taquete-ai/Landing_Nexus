"use client";

import { useEffect, useState } from "react";
import { colors, fontFamily } from "@/styles/design-tokens";
import type { MetricData } from "@/types/dashboard";

interface MetricCardProps extends MetricData {
  index: number;
}

export function MetricCard({ value, label, delta, trend, index }: MetricCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const getTrendColor = () => {
    if (trend === "up") return colors.positive;
    if (trend === "down") return colors.negative;
    return colors.cool;
  };

  const getTrendIcon = () => {
    if (trend === "up") return "↑";
    if (trend === "down") return "↓";
    return "→";
  };

  return (
    <div
      className="relative p-5 border overflow-hidden transition-all duration-500"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: "8px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        willChange: "transform, opacity",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = colors.accent;
        el.style.backgroundColor = colors.surface2;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = colors.border;
        el.style.backgroundColor = colors.surface;
      }}
    >
      {/* Accent line on hover */}
      <div
        className="absolute top-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
        style={{
          backgroundColor: colors.accent,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          (el.parentElement as HTMLElement).querySelector(
            ".metric-accent-line"
          ) as HTMLElement | null
            ? ((el as HTMLElement).style.width = "100%")
            : null;
        }}
      />

      {/* Index */}
      <div className="mb-3">
        <span
          className="font-mono text-xs"
          style={{
            color: colors.textMuted,
            fontSize: "11px",
            fontWeight: "400",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Métrica Principal */}
      <div className="mb-2">
        <p
          style={{
            fontSize: "32px",
            fontWeight: "700",
            letterSpacing: "-1px",
            color: colors.text,
            fontFamily: fontFamily.display,
            lineHeight: "1.2",
          }}
        >
          {value.toLocaleString("pt-BR")}
        </p>
      </div>

      {/* Label */}
      <p
        className="mb-3"
        style={{
          fontSize: "12px",
          fontWeight: "400",
          color: colors.textSecondary,
          lineHeight: "1.4",
        }}
      >
        {label}
      </p>

      {/* Delta + Trend */}
      {delta !== undefined && (
        <div className="flex items-center gap-1">
          <span
            className="font-mono text-xs"
            style={{
              color: getTrendColor(),
              fontSize: "11px",
              fontWeight: "400",
              fontFamily: fontFamily.mono,
            }}
          >
            {getTrendIcon()} {Math.abs(delta)}
          </span>
          <span
            style={{
              fontSize: "10px",
              color: colors.textMuted,
              fontFamily: fontFamily.mono,
            }}
          >
            vs semana
          </span>
        </div>
      )}
    </div>
  );
}
