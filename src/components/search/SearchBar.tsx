"use client";

import { useContext } from "react";
import { SearchContext } from "./SearchContextWrapper";
import Image from "next/image";
import Icon from "@/assets/search.svg";

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
          onChange={handleChange}
          value={userQuery}
          className='block w-full py-2 pl-11 pr-4focus:outline-2 outline-gray-900'
          placeholder='Search for location..'
        />
        {userQuery && (
          <button
            type='button'
            onClick={handleClick}
            className='absolute block right-4 top-[50%] translate-y-[-50%] btn--clear'
            aria-label='Clear search'
          ></button>
        )}
      </form>
    </>
  );
}
