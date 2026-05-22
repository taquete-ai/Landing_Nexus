import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
