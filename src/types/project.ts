/**
 * Nexus Labs AI Systems — Project Types
 * Interface definitiva para projetos do portfólio
 */

export type ProjectCategory =
  | "crm"
  | "automacao"
  | "agentes-ia"
  | "saas"
  | "dashboard"
  | "integracao";

export interface ProjectType {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  featured?: boolean;
  stack: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  imageUrl: string;
  gradient?: {
    from: string;
    to: string;
  };
  status?: "live" | "beta" | "completed";
}

export interface ProjectCardProps {
  project: ProjectType;
  featured?: boolean;
}

export interface ProjectShowcaseProps {
  projects: ProjectType[];
  defaultCategory?: ProjectCategory | "todas";
}
