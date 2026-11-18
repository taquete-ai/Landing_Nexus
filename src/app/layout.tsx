import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/layout/ChatWidget";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexus-lab.pro";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nexus Labs AI Systems",
    template: "%s | Nexus Labs",
  },
  description:
    "Equipe digital 24h para pequenos negócios: WhatsApp que atende, CRM que organiza vendas e automações que poupam tempo. Tecnologia com parceiro de verdade.",
  keywords: [
    "IA",
    "automação",
    "software",
    "agentes inteligentes",
    "SaaS",
    "CRM",
    "desenvolvimento",
    "Nexus Labs",
  ],
  authors: [{ name: "Nexus Labs AI Systems" }],
  creator: "Nexus Labs AI Systems",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Nexus Labs AI Systems",
    description:
      "Equipe digital 24h para o seu negócio: WhatsApp, CRM e automações com parceiro de verdade.",
    siteName: "Nexus Labs",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nexus Labs AI Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Labs AI Systems",
    description:
      "Equipe digital 24h para o seu negócio: WhatsApp, CRM e automações com parceiro de verdade.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c0c0e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nexus Labs AI Systems",
    url: siteUrl,
    description:
      "Equipe digital 24h para pequenos negócios: WhatsApp, CRM e automações com parceiro de verdade",
    image: `${siteUrl}/opengraph-image`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      url: siteUrl,
    },
  };

  return (
    <html
      lang="pt-BR"
      className={`${syne.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
