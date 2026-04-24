import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { QueryProvider } from "./providers/QueryProvider";



// ✅ Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata
export const metadata: Metadata = {
  title: "JobPortal",
  description: "Find jobs, hire talent, build your career",
};

// ✅ Layout (SERVER COMPONENT)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased font-sans bg-slate-50">
        <QueryProvider>
        
        {/* ✅ Navbar handles auth internally */}
        <Navbar />

        {/* ✅ Content */}
        <main className="min-h-[calc(100vh-64px)]">
          {children}
        </main>

        {/* ✅ Footer */}
        <Footer />

        {/* ✅ Toast */}
        <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}