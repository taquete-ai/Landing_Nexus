export interface MetricData {
  value: number;
  label: string;
  delta?: number;
  trend: "up" | "down" | "stable";
}

export interface SystemStatusItem {
  name: string;
  status: "online" | "idle" | "offline";
}

export interface ActivityEvent {
  id: string;
  message: string;
  timestamp: Date;
  priority: "low" | "medium" | "high";
}

export interface ChartDataPoint {
  day: string;
  value: number;
}

export interface DashboardData {
  metrics: MetricData[];
  pipeline: {
    current: number;
    target: number;
  };
  systemStatus: SystemStatusItem[];
  activity: ActivityEvent[];
  chartData: ChartDataPoint[];
}
