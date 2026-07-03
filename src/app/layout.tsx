import "./globals.css";

import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import SearchProvider from "@/components/search/search-provider";
import ConsentProvider from "@/components/geolocation/consent-provider";
import { Suspense } from "react";
import ClientLocation from "@/components/geolocation/ClientLocation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Weather Forecast",
    template: "%s | Weather Forecast",
  },
  description:
    "Location-based weather forecasts with hourly and daily breakdowns",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.variable} ${openSans.variable} antialiased md:py-4`}
      >
        <SearchProvider>
          <Header />
        </SearchProvider>
        {children}
        <ConsentProvider>
          <Suspense>
            <ClientLocation />
          </Suspense>
        </ConsentProvider>
      </body>
    </html>
  );
}
