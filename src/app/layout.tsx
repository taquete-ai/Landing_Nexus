import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "Nexus Labs AI Systems",
    template: "%s | Nexus Labs",
  },
  description:
    "Nexus Labs AI Systems — Ecossistema premium de IA, automação e desenvolvimento de software. Construímos sistemas inteligentes, CRMs, agentes IA e plataformas SaaS.",
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
    title: "Nexus Labs AI Systems",
    description:
      "Ecossistema premium de IA, automação e desenvolvimento de software.",
    siteName: "Nexus Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Labs AI Systems",
    description:
      "Ecossistema premium de IA, automação e desenvolvimento de software.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${syne.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Navbar />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
