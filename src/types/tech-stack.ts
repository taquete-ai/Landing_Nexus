export type TechCategory = "frontend" | "backend" | "ia" | "automacao" | "infra";

export interface TechItemType {
  id: string;
  name: string;
  category: TechCategory;
  description: string;
}
