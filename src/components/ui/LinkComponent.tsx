"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function LinkComponent({
  name,
  url,
  className,
}: {
  name: string;
  url: string;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    params.delete("page");
    router.push(`${url}?${params.toString()}`);
  };

  return (
    <Link
      href={url}
      onClick={handleClick}
      className={`block p-4 font-bold  ${pathname === url ? "bg-black text-white" : "text-gray-700"} ${className}`}
    >
      {name}
    </Link>
  );
}
