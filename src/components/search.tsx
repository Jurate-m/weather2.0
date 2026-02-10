"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import SearchResults from "./searchResults";

const Search = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");

  const timer = useRef<NodeJS.Timeout | null>(null);
  const prevQuery = useRef("");

  const route = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const checkIfNotValid = (value: string) => {
    return /[-'/`~!#*$@_%,'"+=^&(){}[\]|;:<>?\\]/.test(value);
  };

  const handleClick = (value: string) => {
    setLocation(value);
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (error) return;

    const params = new URLSearchParams(searchParams);

    params.set("location", location);

    route.replace(`${path}?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");

    const userinput = e.target.value;

    const invalidInput = checkIfNotValid(userinput);

    if (invalidInput) {
      setError("Please use only alphabetical values to search for a location.");

      return;
    }

    setQuery((q) => userinput);
  };

  const fetchData = async (value: string) => {
    const endpoint = `?location=${encodeURIComponent(value)}`;

    const matchLength = prevQuery.current.length - value.length;

    if (prevQuery.current.includes(value) && matchLength < 4 && !error) return;

    try {
      prevQuery.current = value;
      const response = await fetch(`api/findPlace${endpoint}`);
      if (!response.ok) throw new Error("Problem.");
      const json = await response.json();

      if (!json.length) throw new Error();

      setData(json);
    } catch (error) {
      setError("Unfortuantelly there were no results matching your search");
    }
  };

  useEffect(() => {
    timer.current = setTimeout(() => {
      fetchData(query);
    }, 3000);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [query]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={query} onChange={handleChange} />
        {data && <SearchResults results={data} onClick={handleClick} />}
      </form>
      <p>{error}</p>
    </div>
  );
};

export default Search;
