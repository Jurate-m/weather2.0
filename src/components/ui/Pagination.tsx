"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import Button from "./Button";
import Arrow from "@/assets/arrow_down.svg";

export default function Pagination({
  page,
  totalPages,
  pagination,
}: {
  page: number;
  totalPages: number;
  pagination: string[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const buildHref = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className='flex gap-6 py-6 px-4'>
      {page > 1 && (
        <Button
          href={buildHref(page - 1)}
          title={pagination[0]}
          className='mr-auto flex! flex-row-reverse pl-2 bg-transparent!'
        >
          <Image src={Arrow} alt='' className='rotate-90' aria-hidden='true' />
        </Button>
      )}
      {page < totalPages && (
        <Button
          href={buildHref(page + 1)}
          title={pagination[1]}
          className='ml-auto flex! pr-2 bg-transparent!'
        >
          <Image src={Arrow} alt='' className='-rotate-90' aria-hidden='true' />
        </Button>
      )}
    </div>
  );
}
