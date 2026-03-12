"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

export default function NavLink({ name, url }: { name: string; url: string }) {
  const searchParams = useSearchParams();
  const path = usePathname();

  return (
    <li className='px-1'>
      <Link
        href={`${url}${searchParams ? `?${searchParams}` : ""}`}
        className={`block px-1 py-2 hover:text-gray-900 ${path === url ? "text-gray-950" : "text-gray-700"}`}
      >
        {name}
      </Link>
    </li>
  );
}
