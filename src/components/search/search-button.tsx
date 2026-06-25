"use client";

import { useSearch } from "./search-provider";
import Button from "../ui/Button";
import Image from "next/image";
import Icon from "@/assets/search-icon.svg";

export default function SearchButton() {
  const { open } = useSearch();

  const label = (
    <Image
      src={Icon}
      alt='Open search'
      width={20}
      height={20}
      className='absolute block top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] object-contain h-auto'
      aria-hidden='true'
    />
  );

  return (
    <Button
      label={label}
      onClick={open}
      className='block bg-secondary rounded-full relative h-10 w-10 md:hidden border border-border-2 focus:bg-border-2 hover:bg-border-2'
      aria-label='Open search'
    />
  );
}
