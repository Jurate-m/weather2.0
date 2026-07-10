import { Suspense } from "react";

import ForecastWrapper from "@/components/ForecastWrapper";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  return (
    <Suspense>
      <ForecastWrapper searchParams={searchParams} />
    </Suspense>
  );
}
