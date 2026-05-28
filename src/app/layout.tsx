import "./globals.css";

import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Header from "@/components/header";
import SearchProvider from "@/components/search/search-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
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
        className={`${inter.variable} ${montserrat.variable} antialiased md:py-4`}
      >
        <SearchProvider>
          <Header />
        </SearchProvider>
        {children}
      </body>
    </html>
  );
}
