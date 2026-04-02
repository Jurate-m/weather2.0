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
    <div className='flex items-center justify-center gap-6 pt-6'>
      {page > 1 && (
        <Link href={buildHref(page - 1)} className='font-bold'>
          {pagination[0]}
        </Link>
      )}
      {page < totalPages && (
        <Link href={buildHref(page + 1)} className='font-bold'>
          {pagination[1]}
        </Link>
      )}
    </div>
  );
}
