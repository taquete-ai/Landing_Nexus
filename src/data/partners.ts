/**
 * Parceiros e Clientes da Nexus — fonte única da home e da página /parceiros.
 *
 * ADICIONAR: copie um objeto abaixo, mude os campos e (opcional) coloque o logo em public/partners/.
 * EDITAR:    altere os campos do objeto.
 * EXCLUIR:   apague o objeto (ou ponha `authorized: false` para esconder sem perder o registro).
 *
 * Só aparece no site quem tem `authorized: true`.
 */

import type { PartnerType } from "@/types/partner";

const allPartners: PartnerType[] = [
  {
    id: "ativ-solar",
    name: "Ativ Solar",
    kind: "cliente",
    sector: "Energia Solar",
    // logo: "/partners/ativ-solar.png",
    authorized: true,
  },
];

export const partners: PartnerType[] = allPartners.filter((p) => p.authorized);

export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  return (words.length === 1 ? words[0].slice(0, 2) : words[0][0] + words[1][0]).toUpperCase();
}
