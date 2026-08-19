import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Oswald } from "next/font/google";
import type { CSSProperties } from "react";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { withBase } from "@/lib/base-path";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fit User | Get fit. Sleep. Help the pack.",
  description:
    "A 26-day habit marathon in Natomas from Fit User LLC. Tue/Thu 6pm and Saturday 6am at North Natomas Regional Park. $100 shirt, $10 a run, free coaching under 16.",
  icons: {
    icon: withBase("/brand/mark-square.png"),
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
      className={`${inter.variable} ${oswald.variable} ${jetbrainsMono.variable} h-full antialiased`}
      style={
        {
          "--fu-mark": `url("${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/mark-square.png")`,
        } as CSSProperties
      }
    >
      <body className="flex min-h-full flex-col bg-black font-sans text-ink">
        <Nav />
        <main className="flex-1 pt-[4.25rem]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
