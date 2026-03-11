"use client";

import { useContext } from "react";
import { SearchContext } from "./SearchContextWrapper";

export default function SearchBar() {
  const { userQuery, setUserQuery } = useContext(SearchContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setUserQuery(userInput);
  };

  const handleClick = () => {
    setUserQuery("");
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type='text' onChange={handleChange} value={userQuery} />
        <button onClick={handleClick}>x</button>
      </form>
    </>
  );
}
