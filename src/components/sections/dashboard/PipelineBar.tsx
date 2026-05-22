"use client";

import { useEffect, useState } from "react";
import { colors } from "@/styles/design-tokens";

interface PipelineBarProps {
  current: number;
  target: number;
}

export function PipelineBar({ current, target }: PipelineBarProps) {
  const [mounted, setMounted] = useState(false);
  const percentage = (current / target) * 100;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: "32px",
        backgroundColor: colors.surface2,
        borderRadius: "4px",
        border: `1px solid ${colors.borderSubtle}`,
      }}
    >
      {/* Barra animada */}
      <div
        className="absolute inset-y-0 left-0 transition-all"
        style={{
          width: mounted ? `${percentage}%` : "0%",
          backgroundColor: colors.accent,
          transitionDuration: "1500ms",
          transitionTimingFunction: "ease",
        }}
      />

      {/* Trilho sutil para referência visual */}
      <div
        className="absolute inset-y-0 right-0 pointer-events-none"
        style={{
          width: "1px",
          backgroundColor: colors.borderSubtle,
          right: "calc(66% - 0.5px)",
        }}
      />

      {/* Percentage label */}
      {mounted && (
        <div
          className="absolute inset-0 flex items-center justify-center font-mono text-xs font-semibold pointer-events-none"
          style={{
            color: percentage > 50 ? colors.bg : colors.text,
            textShadow: percentage <= 50 ? `0 0 8px ${colors.bg}99` : "none",
          }}
        >
          {percentage.toFixed(0)}%
        </div>
      )}
    </div>
  );
}
