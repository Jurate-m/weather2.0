import { Suspense } from "react";
import SearchContextWrapper from "./search/SearchContextWrapper";
import SearchOuter from "@/components/search/SearchOuter";

export default async function Header({
  params,
}: {
  params: Promise<{
    q: string | undefined;
    location: string | undefined;
  }>;
}) {
  const { q } = await params;

  return (
    <header>
      <SearchContextWrapper>
        <Suspense>
          <SearchOuter q={q} />
        </Suspense>
      </SearchContextWrapper>
    </header>
  );
}
