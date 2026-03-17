import { Suspense } from "react";
import Header from "@/components/Header";
import Wrapper from "@/components/forecast/Wrapper";
import { HeaderSkeleton } from "@/components/skeletons";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string }>;
}) {
  return (
    <>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header searchParams={searchParams} />
      </Suspense>
      <main>
        <Suspense fallback={<div>Loading weather (to be skeleton)...</div>}>
          <Wrapper searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
}
