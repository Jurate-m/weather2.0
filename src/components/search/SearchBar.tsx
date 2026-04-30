"use client";

import { useEffect, useRef, useState, useContext } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SearchContext } from "./SearchWrapper";
import Image from "next/image";
import Icon from "@/assets/search.svg";

import {
  validateParam,
  MIN_LENGTH,
  Q_MAX_LENGTH,
  Q_REGEX,
  ERROR_MESSAGE,
} from "@/lib/validate";

export default function SearchBar() {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const timer = useRef<NodeJS.Timeout>(null);
  const [q, setQ] = useState("");
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState("");
  const params = new URLSearchParams(searchParams);
  const location = params.get("location");

  const { setActiveSearch } = useContext(SearchContext);

  const handleClear = () => {
    setQ("");
    setInput("");
    setInputError("");
    setActiveSearch(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;

    setInput(userInput);

    const { valid, error, sanitized } = validateParam(
      userInput,
      Q_REGEX,
      MIN_LENGTH,
      Q_MAX_LENGTH,
    );

    if (error) {
      setQ("");
      setInputError(ERROR_MESSAGE[error as keyof typeof ERROR_MESSAGE]);
      setActiveSearch(false);
      return;
    }

    if (valid && sanitized) {
      setQ(sanitized);
    }

    if (!error) {
      setActiveSearch(!!input);
      setInputError("");
    }
  };

  useEffect(() => {
    setActiveSearch(!!q);

    if (!q && params.get("q")) {
      params.delete("q");
      router.replace(`${path}?${params.toString()}`);
    }

    if (!q) return;

    // set Timeout
    timer.current = setTimeout(() => {
      // if q param exists - set a param prop
      if (q) params.set("q", encodeURIComponent(q));
      // triger client navigation
      router.replace(`${path}?${params.toString()}`);
    }, 1000);

    // cleanup
    return () => {
      // clear timer
      if (timer.current) clearTimeout(timer.current);
    };
  }, [q]);

  useEffect(() => {
    if (q) setQ("");

    if (input) setInput("");
  }, [location]);

  return (
    <>
      <form
        role='search'
        onSubmit={(e) => e.preventDefault()}
        className={` relative border border-stone-300 ${inputError ? "border-red-700!" : ""}`}
      >
        <Image
          src={Icon}
          alt='Search'
          width={20}
          height={20}
          className='absolute block left-4 top-[50%] translate-y-[-50%] object-contain h-auto'
          aria-hidden='true'
        />
        <input
          type='text'
          name='userQ'
          value={input}
          onChange={handleChange}
          placeholder='Search for location forecasts'
          className={`${inputError ? " outline-red-700" : ""} block w-full py-4 pl-10 pr-4 focus:outline-2 outline-gray-900 bg-white `}
        />
        {input && (
          <button
            type='button'
            onClick={handleClear}
            className='absolute block right-4 top-[50%] translate-y-[-50%] btn--clear'
            aria-label='Clear search'
          ></button>
        )}
      </form>
      {inputError && (
        <p className='absolute py-2 text-red-700 bg-white/20 backdrop-blur-xs'>
          {inputError}
        </p>
      )}
    </>
  );
}
