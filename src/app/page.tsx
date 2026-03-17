import { Suspense } from "react";
import Header from "@/components/Header";
import WeatherWrapper from "@/components/weather/WeatherWrapper";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string }>;
}) {
  return (
    <>
      <Suspense>
        <Header searchParams={searchParams} />
      </Suspense>
      <main>
        <Suspense fallback={<div>Loading weather (to be skeleton)...</div>}>
          <WeatherWrapper searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
}
