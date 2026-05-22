import type { DashboardData } from "@/types/dashboard";

export const dashboardData: DashboardData = {
  metrics: [
    {
      value: 5,
      label: "Automações Ativas",
      delta: 2,
      trend: "up",
    },
    {
      value: 342,
      label: "Leads Capturados",
      delta: 8,
      trend: "up",
    },
    {
      value: 12,
      label: "Integrações Ativas",
      delta: -1,
      trend: "down",
    },
  ],
  pipeline: {
    current: 342,
    target: 500,
  },
  systemStatus: [
    { name: "Sistema de CRM", status: "online" },
    { name: "Pipeline de Leads", status: "online" },
    { name: "Agente de IA", status: "idle" },
  ],
  activity: [
    {
      id: "1",
      message: "João Silva converteu lead em oportunidade",
      timestamp: new Date(Date.now() - 2 * 60000),
      priority: "high",
    },
    {
      id: "2",
      message: "Automação de follow-up executada com sucesso",
      timestamp: new Date(Date.now() - 5 * 60000),
      priority: "medium",
    },
    {
      id: "3",
      message: "Email enviado para 8 contatos da base",
      timestamp: new Date(Date.now() - 12 * 60000),
      priority: "low",
    },
    {
      id: "4",
      message: "Nova integração Zapier ativada",
      timestamp: new Date(Date.now() - 25 * 60000),
      priority: "medium",
    },
    {
      id: "5",
      message: "Relatório semanal gerado automaticamente",
      timestamp: new Date(Date.now() - 45 * 60000),
      priority: "low",
    },
  ],
  chartData: [
    { day: "Seg", value: 45 },
    { day: "Ter", value: 52 },
    { day: "Qua", value: 48 },
    { day: "Qui", value: 61 },
    { day: "Sex", value: 55 },
    { day: "Sab", value: 38 },
    { day: "Dom", value: 42 },
  ],
};
