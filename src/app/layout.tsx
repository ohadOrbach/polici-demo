import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MissionsProvider } from "@/contexts/MissionsContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Captain's Eye Policy 2.0 - Mission Management",
  description: "Visual mockup for maritime fleet mission management and compliance testing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} font-inter antialiased`}>
        <MissionsProvider>
          {children}
        </MissionsProvider>
      </body>
    </html>
  );
}