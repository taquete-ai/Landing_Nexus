"use client";

import { useState, useEffect } from "react";
import { dashboardData } from "@/data/dashboard-mock";
import { colors, fontFamily, spacing } from "@/styles/design-tokens";
import { MetricCard } from "./dashboard/MetricCard";
import { PipelineBar } from "./dashboard/PipelineBar";
import { SystemStatus } from "./dashboard/SystemStatus";
import { ActivityFeed } from "./dashboard/ActivityFeed";
import { MiniChart } from "./dashboard/MiniChart";

export function DashboardDemo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="dashboard"
      className="relative w-full py-32"
      style={{
        backgroundColor: colors.bg,
        borderBottom: `1px solid ${colors.borderSubtle}`,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="font-mono text-sm font-medium"
              style={{
                color: colors.textMuted,
                letterSpacing: "0.15em",
              }}
            >
              DEMONSTRAÇÃO LIVE
            </span>
            <div
              className="h-1 w-1 rounded-full animate-pulse"
              style={{ backgroundColor: colors.positive }}
            />
          </div>

          <h2
            className="mb-6 font-display"
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: "700",
              letterSpacing: "-1.5px",
              color: colors.text,
            }}
          >
            Ecossistema em Tempo Real
          </h2>

          <p
            style={{
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "1.65",
              color: colors.textSecondary,
              maxWidth: "640px",
            }}
          >
            Visualize métricas de operação, pipeline de conversão, status de sistemas e atividades em progresso. Uma janela real de como engenharia premium funciona.
          </p>
        </div>

        {/* Grid Principal — 2x2 em desktop, stack em mobile */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          {/* Coluna Esquerda — Métricas + Pipeline */}
          <div className="flex flex-col gap-6">
            {/* Métricas em Linha */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {dashboardData.metrics.map((metric, idx) => (
                <MetricCard
                  key={idx}
                  {...metric}
                  index={idx}
                />
              ))}
            </div>

            {/* Pipeline de Conversão */}
            <div
              className="p-6 border"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: "8px",
              }}
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label
                    style={{
                      fontSize: "11px",
                      fontWeight: "500",
                      color: colors.textMuted,
                      fontFamily: fontFamily.mono,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    Pipeline de Leads
                  </label>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "400",
                      color: colors.textSecondary,
                      fontFamily: fontFamily.mono,
                    }}
                  >
                    {dashboardData.pipeline.current} / {dashboardData.pipeline.target}
                  </span>
                </div>
              </div>

              <PipelineBar
                current={dashboardData.pipeline.current}
                target={dashboardData.pipeline.target}
              />

              <div className="mt-4 flex gap-6">
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: "500",
                      color: colors.textMuted,
                      fontFamily: fontFamily.mono,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Taxa de Conversão
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: colors.accent,
                      fontFamily: fontFamily.display,
                    }}
                  >
                    68.4%
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: "500",
                      color: colors.textMuted,
                      fontFamily: fontFamily.mono,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Dias até Meta
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: colors.positive,
                      fontFamily: fontFamily.display,
                    }}
                  >
                    12
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita — Status + MiniChart */}
          <div className="flex flex-col gap-6">
            {/* System Status */}
            <SystemStatus systems={dashboardData.systemStatus} />

            {/* Mini Chart */}
            <MiniChart data={dashboardData.chartData} />
          </div>
        </div>

        {/* Activity Feed — Full Width */}
        <ActivityFeed activities={dashboardData.activity} />
      </div>

      {/* Ruído de Fundo Sutil */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23fff' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          zIndex: 0,
        }}
      />
    </section>
  );
}
