import type { Metadata } from "next";
import Link from "next/link";
import { partners } from "@/data/partners";
import { PartnerCard } from "@/components/ui/PartnerCard";
import { colors, fontFamily, radius, spacing } from "@/styles/design-tokens";

export const metadata: Metadata = {
  title: "Parceiros e Clientes",
  description: "Empresas e parceiros que trabalham com a Nexus Labs AI Systems.",
  alternates: { canonical: "/parceiros" },
};

const GROUPS = [
  { kind: "cliente", title: "Clientes" },
  { kind: "parceiro", title: "Parceiros" },
] as const;

export default function ParceirosPage() {
  return (
    <main className="pt-16" style={{ backgroundColor: colors.bg, minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: `${spacing.unit(12)} ${spacing.unit(2)}`,
        }}
      >
        <span
          style={{
            fontFamily: fontFamily.mono,
            fontSize: "11px",
            fontWeight: "600",
            color: colors.textMuted,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Parceiros e Clientes
        </span>
        <h1
          style={{
            fontFamily: fontFamily.display,
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: "800",
            color: colors.text,
            letterSpacing: "-1.5px",
            margin: `${spacing.unit(2)} 0 ${spacing.unit(8)}`,
          }}
        >
          Quem já trabalha com a Nexus
        </h1>

        {partners.length === 0 && (
          <p style={{ fontFamily: fontFamily.body, color: colors.textSecondary }}>
            Em breve.
          </p>
        )}

        {GROUPS.map(({ kind, title }) => {
          const items = partners.filter((p) => p.kind === kind);
          if (items.length === 0) return null;
          return (
            <section key={kind} aria-label={title} style={{ marginBottom: spacing.unit(8) }}>
              <h2
                style={{
                  fontFamily: fontFamily.mono,
                  fontSize: "11px",
                  fontWeight: "600",
                  color: colors.textMuted,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: spacing.unit(2),
                }}
              >
                {title} ({items.length})
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: spacing.unit(2),
                }}
              >
                {items.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      backgroundColor: colors.surface,
                      border: `1px solid ${colors.border}`,
                      borderRadius: radius.md,
                    }}
                  >
                    <PartnerCard partner={p} />
                    {p.description && (
                      <p
                        style={{
                          fontFamily: fontFamily.body,
                          fontSize: "13px",
                          color: colors.textSecondary,
                          lineHeight: 1.6,
                          padding: `0 ${spacing.unit(2)} ${spacing.unit(2)}`,
                        }}
                      >
                        {p.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <Link
          href="/"
          style={{
            fontFamily: fontFamily.mono,
            fontSize: "11px",
            fontWeight: "600",
            color: colors.accent,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          ← Voltar ao início
        </Link>
      </div>
    </main>
  );
}
