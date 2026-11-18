export type PartnerKind = "cliente" | "parceiro";

export interface PartnerType {
  id: string;
  name: string;
  kind: PartnerKind;
  sector: string;
  /** Caminho em /public, ex.: "/partners/ativ-solar.png". Sem logo, usa as iniciais. */
  logo?: string;
  description?: string;
  /** Só aparece no site quem tem `authorized: true` (autorizou o uso do nome). */
  authorized: boolean;
}
