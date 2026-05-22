"use client";

import { colors, fontFamily } from "@/styles/design-tokens";
import type { SystemStatusItem } from "@/types/dashboard";

interface SystemStatusProps {
  systems: SystemStatusItem[];
}

const statusConfig = {
  online: {
    color: colors.positive,
    label: "Online",
  },
  idle: {
    color: colors.warm,
    label: "Em Pausa",
  },
  offline: {
    color: colors.negative,
    label: "Offline",
  },
};

export function SystemStatus({ systems }: SystemStatusProps) {
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
          Status de Sistemas
        </label>
        <p
          style={{
            fontSize: "13px",
            fontWeight: "400",
            color: colors.textSecondary,
          }}
        >
          {systems.filter((s) => s.status === "online").length} / {systems.length} operacional
        </p>
      </div>

      {/* Status List */}
      <div className="space-y-3">
        {systems.map((system) => {
          const config = statusConfig[system.status];

          return (
            <div
              key={system.name}
              className="flex items-center justify-between p-3 rounded-md transition-all duration-200"
              style={{
                backgroundColor: colors.surface2,
                borderLeft: `3px solid ${config.color}`,
              }}
            >
              <div className="flex-1">
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: colors.text,
                  }}
                >
                  {system.name}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Pulse indicator */}
                <div
                  className={system.status === "online" ? "animate-pulse" : ""}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: config.color,
                  }}
                />

                <span
                  className="font-mono text-xs"
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                    color: config.color,
                    fontFamily: fontFamily.mono,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {config.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
