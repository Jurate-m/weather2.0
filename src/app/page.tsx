import { Suspense } from "react";
import Header from "@/components/Header";
import Wrapper from "@/components/forecast/Wrapper";
import {
  HeaderSkeleton,
  WrapperSkeleton,
  HomeForecastSkeleton,
} from "@/components/skeletons";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string; name?: string }>;
}) {
  return (
    <>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header searchParams={searchParams} />
      </Suspense>
      <main>
        <Suspense
          fallback={
            <WrapperSkeleton className='max-w-5xl'>
              <HomeForecastSkeleton />
            </WrapperSkeleton>
          }
        >
          <Wrapper searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
}
