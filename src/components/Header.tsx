import { Suspense } from "react";
import SearchContextWrapper from "./search/SearchContextWrapper";
import SearchOuter from "@/components/search/SearchOuter";
import Nav from "@/components/nav/Nav";

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
    <header className='max-w-4xl m-auto px-5 py-4 flex flex-col'>
      <Nav />
      <SearchContextWrapper>
        <Suspense>
          <SearchOuter q={q} />
        </Suspense>
      </SearchContextWrapper>
    </header>
  );
}
