import type { Metadata } from "next";
import { Suspense } from "react";
import { routes } from "@/routes";
import { notFound } from "next/navigation";

import ForecastLocation from "@/components/params/forecastLocation";

export type PageProps = {
  searchParams: Promise<{ location?: string; page?: number }>;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = routes.find((r) => r.slug === slug);

  if (!route) return notFound();

  return {
    title: route.name,
    description: route.meta,
  };
}

export async function generateStaticParams() {
  return routes.map((route) => ({
    slug: route.slug,
  }));
}

export default async function Page({ searchParams, params }: PageProps) {
  const { slug } = await params;

  const route = routes.find((r) => r.slug === slug);

  if (!route) return notFound();

  return (
    <main className='max-w-full w-5xl mx-auto px-4 py-4 '>
      <Suspense>
        <ForecastLocation searchParams={searchParams} param={slug} />
      </Suspense>
    </main>
  );
}
