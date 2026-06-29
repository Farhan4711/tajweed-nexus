import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import { TRPCProvider } from "@/lib/trpc/Provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Q.LMS — Online Quran Teaching Platform",
    template: "%s | Q.LMS",
  },
  description:
    "Learn Quran online with expert teachers. Courses in Quran Reading, Tajweed, Hifz, Arabic Language, and Islamic Studies. Join students from around the world.",
  keywords: [
    "Quran",
    "Online Quran classes",
    "Tajweed",
    "Hifz",
    "Islamic education",
    "Learn Quran online",
    "Quran teacher",
  ],
  authors: [{ name: "Q.LMS" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Q.LMS",
    title: "Q.LMS — Online Quran Teaching Platform",
    description:
      "Learn Quran online with expert teachers. Courses in Quran Reading, Tajweed, Hifz, Arabic Language, and Islamic Studies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSerif.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
