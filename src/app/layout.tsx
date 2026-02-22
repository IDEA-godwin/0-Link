import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "0-Link: The Bridge from Dial-Tone to Decentralization",
  description: "Empowering the offline world with verifiable AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased font-sans relative`}
      >
        {/* Animated Background inspired by plaid.com */}
        <div className="fixed inset-0 w-full min-h-screen -z-10 overflow-hidden pointer-events-none bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-400/40 dark:bg-cyan-900/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob" />
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-400/40 dark:bg-blue-900/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-emerald-400/40 dark:bg-emerald-900/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000" />
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-400/40 dark:bg-purple-900/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-6000" />
        </div>

        <Header />

        <div className="relative z-0 pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
