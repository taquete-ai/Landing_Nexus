"use client";

import { useEffect, useState } from "react";
import { colors, fontFamily } from "@/styles/design-tokens";
import type { ActivityEvent } from "@/types/dashboard";

interface ActivityFeedProps {
  activities: ActivityEvent[];
}

const priorityConfig = {
  high: {
    color: colors.negative,
    label: "Alta",
  },
  medium: {
    color: colors.warm,
    label: "Média",
  },
  low: {
    color: colors.cool,
    label: "Baixa",
  },
};

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "agora";
  if (diffMins < 60) return `há ${diffMins}m`;
  if (diffHours < 24) return `há ${diffHours}h`;
  if (diffDays < 7) return `há ${diffDays}d`;
  return date.toLocaleDateString("pt-BR");
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const [mounted, setMounted] = useState(false);
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      setVisibleItems((prev) => Math.min(prev + 1, activities.length));
    }, 100);

    return () => clearInterval(timer);
  }, [activities.length]);

  return (
    <div
      className="p-6 border"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: "8px",
        marginTop: spacing.unit(6),
      }}
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
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
            Feed de Atividades
          </label>
          <p
            style={{
              fontSize: "13px",
              fontWeight: "400",
              color: colors.textSecondary,
            }}
          >
            {activities.length} eventos registrados
          </p>
        </div>

        <div
          className="flex items-center gap-2"
          style={{
            padding: "8px 12px",
            backgroundColor: colors.surface2,
            borderRadius: "4px",
          }}
        >
          <div
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: colors.positive }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: "500",
              color: colors.textSecondary,
              fontFamily: fontFamily.mono,
              letterSpacing: "0.05em",
            }}
          >
            AO VIVO
          </span>
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {activities.map((activity, idx) => {
          const config = priorityConfig[activity.priority];
          const isVisible = idx < visibleItems;

          return (
            <div
              key={activity.id}
              className="flex gap-4 p-4 rounded-md transition-all duration-300"
              style={{
                backgroundColor: colors.surface2,
                borderLeft: `3px solid ${config.color}`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-16px)",
                transitionDelay: `${idx * 50}ms`,
                willChange: "opacity, transform",
              }}
            >
              {/* Priority Badge */}
              <div
                className="flex-shrink-0 w-2 rounded-full"
                style={{
                  backgroundColor: config.color,
                  height: "auto",
                  minHeight: "4px",
                }}
              />

              {/* Message */}
              <div className="flex-1 min-w-0">
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: colors.text,
                    marginBottom: "4px",
                    wordBreak: "break-word",
                  }}
                >
                  {activity.message}
                </p>

                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-xs"
                    style={{
                      fontSize: "10px",
                      fontWeight: "400",
                      color: colors.textMuted,
                      fontFamily: fontFamily.mono,
                    }}
                  >
                    {formatTimeAgo(activity.timestamp)}
                  </span>

                  <span
                    className="font-mono text-xs"
                    style={{
                      fontSize: "10px",
                      fontWeight: "500",
                      color: config.color,
                      fontFamily: fontFamily.mono,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {config.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Helper spacing function
const spacing = {
  unit: (n: number) => `${n * 8}px`,
};
