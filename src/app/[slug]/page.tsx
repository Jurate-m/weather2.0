import type { Metadata } from "next";
import { Suspense } from "react";

import { routes } from "@/routes";
import Header from "@/components/Header";
import Wrapper from "@/components/forecast/Wrapper";
import { DynamicSkeleton, HeaderSkeleton } from "@/components/skeletons";
import { PageProps } from "@/utils/interfaces";
import { notFound } from "next/navigation";
import ClientCoords from "@/components/geolocation/ClientCoords";

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
    <>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header searchParams={searchParams} />
      </Suspense>
      <main>
        <Suspense fallback={<DynamicSkeleton />}>
          <Wrapper searchParams={searchParams} params={slug} />
        </Suspense>
        <Suspense>
          <ClientCoords locationQuery={searchParams} />
        </Suspense>
      </main>
    </>
  );
}
