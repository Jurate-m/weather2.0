"use client";

import { useSearch } from "./search-provider";
import Button from "../ui/Button";
import Search from "../ui/icons/Search";

export default function SearchButton() {
  const { open } = useSearch();

  return (
    <Button
      label={<Search fill='var(--color-font-primary)' />}
      onClick={open}
      className='flex justify-center items-center bg-secondary rounded-full relative h-10 w-10 md:hidden border border-border'
      aria-label='Open search'
    />
  );
}
