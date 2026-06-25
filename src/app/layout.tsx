import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "xCelero Labs: Critical Technology for Emerging Markets",
  description: "Venture studio and infrastructure platform building critical technology across 39 countries. Invest from $500.",
  keywords: ["xCelero", "Critical Technology", "Venture Capital", "Deep Tech", "Emerging Markets", "Infrastructure"],
  openGraph: {
    title: "xCelero Labs: Critical Technology for Emerging Markets",
    description: "Venture studio and infrastructure platform building critical technology across 39 countries. Invest from $500.",
    url: "https://xcelero.com",
    siteName: "xCelero Labs",
    images: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "xCelero Labs: Critical Technology for Emerging Markets",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "xCelero Labs: Critical Technology for Emerging Markets",
    description: "Venture studio and infrastructure platform building critical technology across 39 countries. Invest from $500.",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=630&fit=crop"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
