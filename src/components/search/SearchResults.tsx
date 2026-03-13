"use client";

import { useContext } from "react";
import { SearchContext } from "./SearchContextWrapper";
import { SearchResultsType } from "@/utils/interfaces";
import { ResultsSkeleton } from "@/components/skeletons";

export default function SearchResultsWrapper({
  results,
}: {
  results: SearchResultsType[] | null;
}) {
  const { userQuery, setUserQuery, setLocationQuery, display } =
    useContext(SearchContext);

  if (!userQuery) return;

  if (results && !results.length) return <div>No results were found</div>;

  if (userQuery && !results) return <ResultsSkeleton />;

  const handleClick = (id: string) => {
    setUserQuery("");
    setLocationQuery(id);
  };

  return (
    <>
      <ResultsSkeleton />
      <ul
        className={`py-4 ${display ? "" : "hidden"} border-1 border-t-0 border-stone-300 px-4 absolute w-full bg-white`}
      >
        {results &&
          results.map((_) => {
            return (
              <li key={_.place_id}>
                <button
                  type='button'
                  onClick={() => handleClick(_.place_id)}
                  className='w-full hover:bg-gray-100 text-left py-1 px-2 rounded-md'
                >
                  <p>{_.name}</p>
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
}
