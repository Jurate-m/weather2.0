"use client";

import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { SearchResultsType } from "@/utils/interfaces";
import { SearchContext } from "./SearchWrapper";
import { ResultsSkeleton } from "@/components/skeletons";

export default function SearchResults({
  results,
}: {
  results?: SearchResultsType[] | null;
}) {
  const path = usePathname();
  const router = useRouter();

  const { display, activeSearch, setActiveSearch } = useContext(SearchContext);

  if (results && !results.length)
    return <ResultsSkeleton message='No results were found' />;

  if (activeSearch && !results) return <ResultsSkeleton />;

  const handleClick = (id: string) => {
    if (!id) return;
    setActiveSearch(false);
    router.push(`${path}?location=${encodeURIComponent(id)}`);
  };

  return display && activeSearch ? (
    <ul
      className={`py-4 ${display ? "" : "hidden"} border border-t-0 border-stone-300 px-4 absolute w-full bg-white`}
    >
      {results &&
        results.map((result) => {
          return (
            <li key={result.place_id}>
              <button
                type='button'
                onClick={() => handleClick(result.place_id)}
                className='w-full hover:bg-gray-100 text-left py-1 px-2 rounded-md'
              >
                <p>{result.name}</p>
              </button>
            </li>
          );
        })}
    </ul>
  ) : (
    ""
  );
}
