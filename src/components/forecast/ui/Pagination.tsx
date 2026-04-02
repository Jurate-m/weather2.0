"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

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
    <div className='flex gap-6 pt-6 px-4'>
      {page > 1 && (
        <Link href={buildHref(page - 1)} className='font-bold mr-auto'>
          {pagination[0]}
        </Link>
      )}
      {page < totalPages && (
        <Link href={buildHref(page + 1)} className='font-bold ml-auto'>
          {pagination[1]}
        </Link>
      )}
    </div>
  );
}
