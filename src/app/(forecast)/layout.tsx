import ConsentProvider from "@/components/geolocation/consent-provider";
import { Suspense } from "react";
import ClientLocation from "@/components/geolocation/ClientLocation";

export default function ForecastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConsentProvider>
      <main className='max-w-full w-5xl mx-auto px-4 py-4'>
        {children}
        <Suspense>
          <ClientLocation />
        </Suspense>
      </main>
    </ConsentProvider>
  );
}
