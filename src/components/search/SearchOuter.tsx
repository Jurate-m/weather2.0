import SearchResults from "./SearchResults";
import { SearchResultsType } from "@/utils/interfaces";
import { findPlaces } from "@/lib/data";

export default async function SearchOuter({ q }: { q: string | undefined }) {
  "use cache";

  let results: SearchResultsType[] | null = null;

  if (q) {
    results = await findPlaces(q);
  }

  return <SearchResults results={results} />;
}
