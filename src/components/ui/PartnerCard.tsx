"use client";

import { useState } from "react";
import type { PartnerType } from "@/types/partner";
import { getInitials } from "@/data/partners";
import { colors, fontFamily, radius, spacing, transitions } from "@/styles/design-tokens";

export function PartnerCard({ partner }: { partner: PartnerType }) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: spacing.unit(2),
        padding: `${spacing.unit(1.5)} ${spacing.unit(2)}`,
        flexShrink: 0,
        minWidth: "200px",
        transition: `all ${transitions.normal}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
          borderRadius: radius.md,
          overflow: "hidden",
          backgroundColor: isHovered && !partner.logo ? colors.accent : colors.surface,
          border: `1px solid ${colors.border}`,
          fontFamily: fontFamily.mono,
          fontSize: "12px",
          fontWeight: "600",
          color: isHovered ? colors.bg : colors.text,
          transition: `all ${transitions.normal}`,
        }}
      >
        {partner.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={partner.logo}
            alt={`Logo ${partner.name}`}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          getInitials(partner.name)
        )}
      </div>

      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: fontFamily.body,
            fontSize: "13px",
            fontWeight: "600",
            color: isHovered ? colors.accent : colors.text,
            transition: `color ${transitions.normal}`,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {partner.name}
        </div>
        <div
          style={{
            fontFamily: fontFamily.mono,
            fontSize: "10px",
            fontWeight: "500",
            color: colors.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {partner.sector}
        </div>
      </div>
    </div>
  );

  return content;
}
