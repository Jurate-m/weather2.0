import { Suspense } from "react";

import ForecastWrapper from "@/components/ForecastWrapper";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  return (
    <main className='max-w-full w-5xl mx-auto px-4 py-4'>
      <Suspense>
        <ForecastWrapper searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
