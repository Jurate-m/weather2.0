import { Suspense } from "react";
import Current from "@/components/homepage/current";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  return (
    <main>
      <Suspense>
        <Current params={searchParams} />
      </Suspense>
    </main>
  );
}
