"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function LinkComponent({
  name,
  url,
  activeLinkStyle,
  className,
}: {
  name: string;
  url: string;
  activeLinkStyle?: string;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get("page");

    if (pageParam) params.delete("page");

    router.push(`${url}?${params.toString()}`);
  };

  return (
    <Link
      href={url}
      prefetch={false}
      onClick={handleClick}
      className={`block p-4 font-bold  ${pathname === url ? activeLinkStyle : ""} ${className}`}
    >
      {name}
    </Link>
  );
}
