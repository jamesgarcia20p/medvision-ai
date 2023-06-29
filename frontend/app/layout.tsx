import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Nav } from "@/components/layout/nav";

export const metadata: Metadata = { title: "MedVisionAI", description: "AI-powered medical imaging platform" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider><html lang="en" suppressHydrationWarning><body><ThemeProvider><Nav />{children}</ThemeProvider></body></html></ClerkProvider>;
}
