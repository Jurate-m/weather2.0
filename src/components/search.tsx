"use client";

import { useRef, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import SearchResults from "./searchResults";

const Search = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const timer = useRef<NodeJS.Timeout | null>(null);
  const prevQuery = useRef("");

  const checkIfNotValid = (value: string) => {
    return /[-'/`~!#*$@_%,'"+=^&(){}[\]|;:<>?\\]/.test(value);
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (error) return;
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

    // prevQuery.current.match(value);

    if (prevQuery.current.includes(value) && !error) return;

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
        {data && <SearchResults results={data} />}
      </form>
      <p>{error}</p>
    </div>
  );
};

export default Search;
