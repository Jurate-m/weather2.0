"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const Search = () => {
  const path = usePathname();
  const route = useRouter();

  const userInput = useRef<HTMLInputElement>(null);

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.current?.value) return;

    const endpoint = `?location=${encodeURIComponent(userInput.current.value)}`;
    route.replace(`${path}${endpoint}`);

    userInput.current.value = "";

    try {
      const response = await fetch(`api/weather${endpoint}`);

      if (!response.ok) throw new Error("Trouble reaching api");

      const data = await response.json();

      setData(data);
    } catch (error) {
      setError(
        "Oh no! There was a problem retrieving Weather data, please try again or come back later. Thank You for Your patience.",
      );

      console.error("Weather fetch failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' name='location' ref={userInput} />
      </form>
    </div>
  );
};

export default Search;
