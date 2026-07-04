import ConsentProvider from "@/components/geolocation/consent-provider";
import { Suspense } from "react";
import ClientLocation from "@/components/geolocation/ClientLocation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ConsentProvider>
        <Suspense>
          <ClientLocation />
        </Suspense>
      </ConsentProvider>
    </>
  );
}
