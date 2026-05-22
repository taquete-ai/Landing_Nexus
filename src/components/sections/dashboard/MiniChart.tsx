"use client";

import { useEffect, useState } from "react";
import { colors, fontFamily } from "@/styles/design-tokens";
import type { ChartDataPoint } from "@/types/dashboard";

interface MiniChartProps {
  data: ChartDataPoint[];
}

export function MiniChart({ data }: MiniChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const maxValue = Math.max(...data.map((d) => d.value));
  const avgValue = Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length);

  return (
    <div
      className="p-6 border"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: "8px",
      }}
    >
      {/* Header */}
      <div className="mb-5">
        <label
          style={{
            fontSize: "11px",
            fontWeight: "500",
            color: colors.textMuted,
            fontFamily: fontFamily.mono,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "2px",
          }}
        >
          Atividades da Semana
        </label>
        <div className="flex items-baseline gap-2">
          <p
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: colors.accent,
              fontFamily: fontFamily.display,
            }}
          >
            {avgValue}
          </p>
          <p
            style={{
              fontSize: "11px",
              fontWeight: "400",
              color: colors.textSecondary,
              fontFamily: fontFamily.mono,
            }}
          >
            média diária
          </p>
        </div>
      </div>

      {/* Mini Bar Chart */}
      <div
        className="flex items-end justify-between gap-1 h-20"
        style={{
          marginBottom: "16px",
          opacity: mounted ? 1 : 0,
          transition: "opacity 600ms ease",
        }}
      >
        {data.map((point, idx) => {
          const height = (point.value / maxValue) * 100;

          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center gap-1 group"
            >
              {/* Bar with animation */}
              <div
                className="w-full transition-all duration-1000 ease-out hover:brightness-125"
                style={{
                  height: mounted ? `${height}%` : "0%",
                  backgroundColor: colors.accent,
                  borderRadius: "2px 2px 0 0",
                  cursor: "pointer",
                  minHeight: "4px",
                }}
                title={`${point.day}: ${point.value}`}
              />

              {/* Day label */}
              <span
                className="font-mono text-xs"
                style={{
                  fontSize: "10px",
                  fontWeight: "400",
                  color: colors.textMuted,
                  fontFamily: fontFamily.mono,
                  marginTop: "4px",
                }}
              >
                {point.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Stat Footer */}
      <div className="flex gap-4 text-xs pt-4 border-t" style={{ borderColor: colors.borderSubtle }}>
        <div>
          <p
            style={{
              fontSize: "10px",
              fontWeight: "500",
              color: colors.textMuted,
              fontFamily: fontFamily.mono,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "2px",
            }}
          >
            Pico
          </p>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: colors.text,
              fontFamily: fontFamily.display,
            }}
          >
            {maxValue}
          </p>
        </div>

        <div>
          <p
            style={{
              fontSize: "10px",
              fontWeight: "500",
              color: colors.textMuted,
              fontFamily: fontFamily.mono,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "2px",
            }}
          >
            Total
          </p>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: colors.text,
              fontFamily: fontFamily.display,
            }}
          >
            {data.reduce((sum, d) => sum + d.value, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}
