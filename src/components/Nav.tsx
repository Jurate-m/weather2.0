"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { routes } from "@/routes";
import Button from "./ui/Button";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string,
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get("page");

    if (pageParam) params.delete("page");

    router.push(`${url}?${params.toString()}`);
  };

  return (
    <nav>
      <div className='mobile-nav md:hidden'>
        <Button
          onClick={() => setOpen((prev) => !prev)}
          className={`${open ? "active" : ""} flex flex-col justify-center items-center`}
        />
      </div>
      <div
        className={`${open ? "block" : "hidden md:contents"} absolute z-10 md:static left-0 top-full w-full px-5 pb-4 md:pb-0 bg-primary`}
      >
        <ul className='flex w-fit py-1 px-1 bg-secondary rounded-full'>
          {routes.map(({ name, path }, index) => {
            return (
              <li
                key={name + path + index}
                className={`${path === pathname ? "bg-white shadow-md shadow-shdw/10" : ""} text-font-1 px-5 py-1 rounded-full hover:text-font-2`}
              >
                <Link
                  href={path}
                  prefetch={false}
                  onClick={(e) => handleLinkClick(e, path)}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
