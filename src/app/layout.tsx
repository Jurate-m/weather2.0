import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import ClientLocation from "@/components/geolocation/ClientLocation";
import UserConsentWrapper from "@/components/geolocation/UserConsentWrapper";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        {children}
        <UserConsentWrapper>
          <Suspense>
            <ClientLocation />
          </Suspense>
        </UserConsentWrapper>
      </body>
    </html>
  );
}
