import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteOrigin = "https://igoal-vibe-h2.ikame-global-8100.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: "iGoal", template: "%s · iGoal" },
  description: "Hệ thống điều hành hiệu suất nội bộ cho Manager và BOD.",
  openGraph: {
    title: "iGoal · Điều hành hiệu suất",
    description: "Phát hiện đúng vấn đề và hành động đúng lúc.",
    images: [{ url: `${siteOrigin}/og.png`, width: 1792, height: 1024, alt: "iGoal — Điều hành hiệu suất. Hành động đúng lúc." }],
  },
  twitter: { card: "summary_large_image", images: [`${siteOrigin}/og.png`] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
