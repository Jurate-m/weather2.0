"use client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { SearchContextType } from "@/utils/interfaces";

export const SearchContext = createContext<SearchContextType>({
  userQuery: "",
  setUserQuery: () => {},
  setLocationQuery: () => {},
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

  return (
    <SearchContext value={{ userQuery, setUserQuery, setLocationQuery }}>
      {children}
    </SearchContext>
  );
}
