import { Suspense } from "react";
import { routes } from "@/routes";
import Header from "@/components/Header";
import WeatherWrapper from "@/components/forecast/Wrapper";

export async function generateStaticParams() {
  return routes.map((route) => ({
    slug: route.slug,
  }));
}

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ q?: string; location?: string }>;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <Suspense>
        <Header searchParams={searchParams} />
      </Suspense>
      <main>
        <Suspense fallback={<div>Loading weather (to be skeleton)...</div>}>
          <WeatherWrapper searchParams={searchParams} params={slug} />
        </Suspense>
      </main>
    </>
  );
}
