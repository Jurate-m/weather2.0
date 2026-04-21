import { Suspense } from "react";
import Nav from "./Nav";
import SearchOuter from "./search/SearchOuter";
import SearchBar from "./search/SearchBar";
import SearchWrapper from "./search/SearchWrapper";

export default async function Header({
  searchParams,
  slug,
}: {
  searchParams: Promise<{ q?: string }>;
  slug?: string;
}) {
  const { q } = await searchParams;

  return (
    <header className='relative py-4 flex flex-col z-10'>
      <Nav />
      <SearchWrapper>
        <Suspense>
          <SearchBar key={slug ? slug : "home"} />
        </Suspense>
        <SearchOuter q={q} />
      </SearchWrapper>
    </header>
  );
}
