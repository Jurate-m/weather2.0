"use client";

import { useContext } from "react";
import { SearchContext } from "./SearchContextWrapper";
import { SearchResultsType } from "@/utils/interfaces";

export default function SearchResultsWrapper({
  results,
}: {
  results: SearchResultsType[] | null;
}) {
  const { userQuery, setUserQuery, setLocationQuery, display } =
    useContext(SearchContext);

  if (!userQuery) return;

  if (results && !results.length) return <div>No results were found</div>;

  if (userQuery && !results) return <div>Loading...</div>;

  const handleClick = (id: string) => {
    setUserQuery("");
    setLocationQuery(id);
  };

  return (
    <ul className={`p-4 ${display ? "" : "hidden"}`}>
      {results &&
        results.map((_) => {
          return (
            <li key={_.place_id}>
              <button
                type='button'
                onClick={() => handleClick(_.place_id)}
                className='w-full hover:bg-stone-300 text-left'
              >
                <p>{_.name}</p>
              </button>
            </li>
          );
        })}
    </ul>
  );
}
