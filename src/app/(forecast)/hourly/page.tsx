import type { Metadata } from "next";
import { Suspense } from "react";
import { routes } from "@/routes";

import ForecastWrapper from "@/components/ForecastWrapper";

const route = routes.find((r) => r.slug === "hourly");

export const metadata: Metadata = {
  title: route?.name,
  description: route?.meta,
};

export default async function Hourly({
  searchParams,
}: {
  searchParams: Promise<{ location?: string; page?: number }>;
}) {
  return (
    <Suspense>
      <ForecastWrapper searchParams={searchParams} slug='hourly' />
    </Suspense>
  );
}
