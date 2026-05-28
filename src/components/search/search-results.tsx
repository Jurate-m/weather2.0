"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchResultsType } from "@/utils/interfaces";

import CtaList from "../ui/cta-list";
import { useSearch } from "./search-provider";

import { useEffect, useState } from "react";

export default function SearchResults() {
  const [results, setResults] = useState([]);
  const params = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const q = params.get("q")?.trim() ?? "";
  const controller = new AbortController();

  const { isOpen, close } = useSearch();

  const disabledResult = (id: string) => params.get("location") === id;

  const handleClick = async (id: string) => {
    if (!id) return;

    router.push(`${path}?location=${encodeURIComponent(id)}`);
    close();
  };

  useEffect(() => {
    if (!q) return setResults([]);

    fetch(`/api/locations?q=${encodeURIComponent(q)}`, {
      signal: controller.signal,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setResults(() =>
          data.map(({ place_id, name, country }: SearchResultsType) => ({
            id: place_id,
            title: name,
            subtitle: country,
          })),
        );
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        setResults([]);
      });

    return () => controller.abort();
  }, [q]);

  if (results.length) {
    return (
      <CtaList
        data={results}
        ctaDisabled={disabledResult}
        onClick={handleClick}
        className='absolute z-10 top-[calc(100%+10px)] left-0 w-full bg-white border border-secondary md:rounded-xl [&_button]:py-2 [&_button]:hover:bg-primary'
      />
    );
  }
}
