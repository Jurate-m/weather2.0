"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function NavLink({ name, url }: { name: string; url: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    router.push(`${url}?${params.toString()}`);
  };

  return (
    <li className='px-1'>
      <Link
        href={url}
        onClick={handleClick}
        className={`block px-4 py-2 hover:text-gray-900 hover:bg-gray-100 ${pathname === url ? "text-gray-950" : "text-gray-700"}`}
      >
        {name}
      </Link>
    </li>
  );
}
