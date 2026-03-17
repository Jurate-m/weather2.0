"use client";

import { createContext, useState, useEffect, useRef } from "react";
import { SearchContextType } from "@/utils/interfaces";

export const SearchContext = createContext<SearchContextType>({
  display: false,
  activeSearch: false,
  setActiveSearch: () => {},
});

export default function SearchWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [display, setDisplay] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const searchWrapper = useRef(null);

  const handleClick = (e: MouseEvent) => {
    if (!searchWrapper.current) return;

    //@ts-ignore
    searchWrapper.current.contains(e.target)
      ? setDisplay(true)
      : setDisplay(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <SearchContext value={{ display, activeSearch, setActiveSearch }}>
      <div
        ref={searchWrapper}
        className='py-4 max-w-sm w-full ml-auto relative'
      >
        {children}
      </div>
    </SearchContext>
  );
}
