import { Suspense } from "react";
import { routes } from "@/routes";
import Header from "@/components/Header";
import Wrapper from "@/components/forecast/Wrapper";
import { DynamicSkeleton, HeaderSkeleton } from "@/components/skeletons";

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
      <Suspense fallback={<HeaderSkeleton />}>
        <Header searchParams={searchParams} />
      </Suspense>
      <main>
        <Suspense fallback={<DynamicSkeleton />}>
          <Wrapper searchParams={searchParams} params={slug} />
        </Suspense>
      </main>
    </>
  );
}
