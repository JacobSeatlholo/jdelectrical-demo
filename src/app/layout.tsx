import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JD Electrical | Master Electrician — Industrial, Mining & Commercial Power | Alberton, Gauteng",
  description:
    "JD Electrical, led by master electrician Jan Cilliers, delivers industrial, mining, commercial and domestic electrical services across Gauteng. CoCs for all applications, emergency callouts, generators, solar and pump installations. Call +27 83 602 3171.",
  keywords: [
    "JD Electrical",
    "master electrician Alberton",
    "industrial electrician Gauteng",
    "mining electrical contractor South Africa",
    "Certificate of Compliance CoC",
    "solar installation Alberton",
    "generator installation Gauteng",
    "emergency electrician East Rand",
  ],
  authors: [{ name: "JD Electrical" }],
  icons: {
    icon: "/jd/logo-gstatic.png",
    apple: "/jd/logo-gstatic.png",
  },
  openGraph: {
    title: "JD Electrical | Your Trusted Electrical Services Partner in South Africa",
    description:
      "Master electrician Jan Cilliers and team — industrial, mining, commercial and domestic electrical solutions. CoCs for all applications. Emergency services available.",
    url: "https://jdelectrical.co.za",
    siteName: "JD Electrical",
    type: "website",
    locale: "en_ZA",
  },
};

export const viewport: Viewport = {
  themeColor: "#060d1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
