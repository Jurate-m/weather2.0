"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();

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
      className={`py-4 ${display ? "" : "hidden"} border border-t-0 border-stone-300 px-4 absolute top-[59px] w-full bg-white`}
    >
      {results &&
        results.map((result) => {
          const disabled = searchParams.get("location") === result.place_id;
          return (
            <li key={result.place_id}>
              <button
                disabled={disabled}
                type='button'
                onClick={() => handleClick(result.place_id)}
                className={`w-full hover:bg-gray-100 text-left py-1 px-2 rounded-md ${disabled ? "text-gray-400" : ""}`}
              >
                {result.name}
              </button>
            </li>
          );
        })}
    </ul>
  ) : (
    ""
  );
}
