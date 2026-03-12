"use client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState, useRef } from "react";
import { SearchContextType } from "@/utils/interfaces";

export const SearchContext = createContext<SearchContextType>({
  userQuery: "",
  setUserQuery: () => {},
  setLocationQuery: () => {},
  display: false,
});

export default function SearchContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const path = usePathname();
  const [userQuery, setUserQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [display, setDisplay] = useState(false);
  const searchWrapper = useRef(null);

  const handleClick = (e: MouseEvent) => {
    if (!searchWrapper.current) return;

    //@ts-ignore
    searchWrapper.current.contains(e.target)
      ? setDisplay(true)
      : setDisplay(false);
  };

  useEffect(() => {
    if (locationQuery && !userQuery) {
      router.push(`${path}?location=${encodeURIComponent(locationQuery)}`);
      return;
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams();

      if (locationQuery)
        params.set("location", encodeURIComponent(locationQuery));

      userQuery
        ? params.set("q", encodeURIComponent(userQuery.trim()))
        : params.delete("q");

      router.replace(`${path}?${params.toString()}`);
    }, 1000);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [userQuery, locationQuery]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <SearchContext
      value={{ userQuery, setUserQuery, setLocationQuery, display }}
    >
      <div ref={searchWrapper} className='py-4 max-w-sm w-full ml-auto'>
        {children}
      </div>
    </SearchContext>
  );
}
