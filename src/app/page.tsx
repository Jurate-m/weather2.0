import WeatherWrapper from "@/components/weather/WeatherWrapper";

import Header from "@/components/Header";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    q: string | undefined;
    location: string | undefined;
  }>;
}) {
  return (
    <>
      <Suspense fallback={<div>....Header goes here...</div>}>
        <Header params={searchParams} />
      </Suspense>
      <main>
        <Suspense fallback={<div>Loading weather (to be skeleton)...</div>}>
          <WeatherWrapper searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
}
