import { Suspense } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { SearchResultsType } from "@/utils/interfaces";
import { isValidQuery } from "@/utils/functions";
import { findPlaces } from "@/lib/data";

export default async function SearchOuter({ q }: { q: string | undefined }) {
  "use cache";

  let results: SearchResultsType[] | null = null;

  const validQ = q ? isValidQuery(q) : false;

  if (validQ && q) {
    results = await findPlaces(q);
  }

  return (
    <>
      <Suspense>
        <SearchBar />
      </Suspense>
      <Suspense>
        <SearchResults results={results} />
      </Suspense>
    </>
  );
}
