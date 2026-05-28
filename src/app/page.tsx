import { Suspense } from "react";
import Wrapper from "@/components/forecast/Wrapper";
import { WrapperSkeleton, HomeForecastSkeleton } from "@/components/skeletons";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    location?: string;
    name?: string;
  }>;
}) {
  return (
    <main>
      <Suspense
        fallback={
          <WrapperSkeleton className='max-w-5xl px-5'>
            <HomeForecastSkeleton />
          </WrapperSkeleton>
        }
      >
        <Wrapper searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
