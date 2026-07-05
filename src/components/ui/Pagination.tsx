"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

type PaginationType = {
  title: {
    prev: string;
    next: string;
  };
  page: number;
  totalPages: number;
};

const PaginationItem = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={[
        "hover:bg-accent focus:bg-accent hover:text-[#1a1612] focus:text-[#1a1612] text-font-primary border border-accent py-2 px-4 font-bold text-sm rounded-full transition-all duration-150 ease-in-out",
        className,
      ].join(" ")}
      prefetch={false}
    >
      {children}
    </Link>
  );
};

export default function Pagination({
  title,
  page,
  totalPages,
}: PaginationType) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const buildHref = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className='flex gap-4 py-6'>
      {page > 1 && (
        <PaginationItem href={buildHref(page - 1)} className='mr-auto'>
          {title.prev}
        </PaginationItem>
      )}
      {page < totalPages && (
        <PaginationItem href={buildHref(page + 1)} className='ml-auto'>
          {title.next}
        </PaginationItem>
      )}
    </div>
  );
}
