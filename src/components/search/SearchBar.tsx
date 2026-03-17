"use client";

import { useEffect, useRef, useState, useContext } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SearchContext } from "./SearchWrapper";
import Image from "next/image";
import Icon from "@/assets/search.svg";

export default function SearchBar() {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const timer = useRef<NodeJS.Timeout>(null);
  const [q, setQ] = useState("");
  const params = new URLSearchParams(searchParams);
  const location = params.get("location");

  const { setActiveSearch } = useContext(SearchContext);

  const handleClear = () => {
    setQ("");
    setActiveSearch(false);
    params.delete("q");
    router.replace(`${path}?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toString().trim();
    setQ(query);
    setActiveSearch(!!query);
  };

  useEffect(() => {
    // if q state changes
    timer.current = setTimeout(() => {
      // set Timeout
      if (!q) return;
      // if no q value is present - exit
      if (q) params.set("q", encodeURIComponent(q));
      // if q param exists - set a param prop
      router.replace(`${path}?${params.toString()}`);
      // triger client navigation
    }, 1000);

    if (!q) {
      // if no q value
      params.delete("q");
      // delete q param
      router.replace(`${path}?${params.toString()}`);
      // client navigation
    }

    // cleanup
    return () => {
      // clear timer
      if (timer.current) clearTimeout(timer.current);
    };
  }, [q]);

  useEffect(() => {
    // on mount && location variable change
    setQ("");
    // clear q value so it doesn't pass
    if (searchParams.has("q")) {
      // if q value doesn't exist, but searchParam is present
      params.delete("q");
      // delete q param
      router.replace(`${path}?${params.toString()}`);
      // triger client navigation (with preserved searchParams - so it doesn;)
    }

    // cleanup
    return () => {
      setActiveSearch(false);
      // set activeSearch ctx state as false
    };
  }, [location]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className='relative border border-stone-300'
    >
      <Image
        src={Icon}
        alt='Search'
        width={20}
        height={20}
        className='absolute block left-4 top-[50%] translate-y-[-50%] object-contain h-auto'
      />
      <input
        type='text'
        name='userQ'
        value={q}
        onChange={handleChange}
        placeholder='Search for location forecasts'
        className='block w-full py-2 pl-11 pr-4focus:outline-2 outline-gray-900'
      />
      {q && (
        <button
          type='button'
          onClick={handleClear}
          className='absolute block right-4 top-[50%] translate-y-[-50%] btn--clear'
          aria-label='Clear search'
        ></button>
      )}
    </form>
  );
}
