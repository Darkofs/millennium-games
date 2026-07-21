import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Millennium Games – Premium Digital Game Store | Steam & Epic Keys",
  description:
    "Buy authentic Steam and Epic Games titles instantly. Fast delivery, secure payments, verified sellers. Your trusted premium digital game marketplace.",
  keywords: [
    "game keys",
    "steam games",
    "epic games",
    "digital games",
    "game store",
    "game deals",
  ],
  openGraph: {
    title: "Millennium Games – Premium Digital Game Store",
    description:
      "Buy authentic Steam and Epic Games titles instantly. Fast delivery, secure payments, trusted by thousands of gamers.",
    siteName: "Millennium Games",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} antialiased`}
    >
      <body
        className="min-h-screen"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <AppProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </AppProvider>
      </body>
    </html>
  );
}
