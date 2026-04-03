import Nav from "./Nav";
import SearchOuter from "./search/SearchOuter";
import SearchWrapper from "./search/SearchWrapper";

export default async function Header({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <header className='py-4 flex flex-col'>
      <Nav />
      <SearchWrapper>
        <SearchOuter q={q} />
      </SearchWrapper>
    </header>
  );
}
