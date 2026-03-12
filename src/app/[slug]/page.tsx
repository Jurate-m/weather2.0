import { Suspense } from "react";
import Header from "@/components/Header";
import WeatherWrapper from "@/components/weather/WeatherWrapper";
import { routes } from "@/routes";

export async function generateStaticParams() {
  return routes.map((route) => ({
    slug: route.slug,
  }));
}

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{
    location: string | undefined;
    q: string | undefined;
  }>;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main>
      <Suspense fallback={<div>....Header goes here...</div>}>
        <Header params={searchParams} />
      </Suspense>

      <section>
        <Suspense>
          <WeatherWrapper searchParams={searchParams} params={slug} />
        </Suspense>
      </section>
    </main>
  );
}
