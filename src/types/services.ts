export type ServiceCategory =
  | "ia" | "automacao" | "crm" | "saas" | "dashboards" | "integracao";

export interface ServiceType {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  icon: "brain" | "zap" | "layout" | "layers" | "gauge" | "link";
}

export type FeedCategory =
  | "ia" | "automacao" | "saas" | "crm" | "agentes" | "infraestrutura" | "engineering";

export interface FeedItemType {
  id: string;
  category: FeedCategory;
  title: string;
  excerpt: string;
  date: string;
  link: string;
  indicator?: "new" | "trending" | "featured";
}
