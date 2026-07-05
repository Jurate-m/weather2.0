"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchResultsType } from "@/utils/interfaces";

import CtaList from "../ui/cta-list";
import { useSearch } from "./search-provider";

import { useEffect, useState } from "react";

export default function SearchResults() {
  const [results, setResults] = useState<null | []>(null);
  const params = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const q = params.get("q")?.trim() ?? "";
  const controller = new AbortController();

  const { isOpen, close, error, setError, loading } = useSearch();

  const disabledResult = (id: string) => params.get("location") === id;

  const handleClick = async (id: string) => {
    if (!id) return;

    router.push(`${path}?location=${encodeURIComponent(id)}`);

    close();
  };

  useEffect(() => {
    if (!q) {
      return setResults(null);
    }

    fetch(`/api/locations?q=${encodeURIComponent(q)}`, {
      signal: controller.signal,
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (!data.length) return setError("No results were found");

        setResults(() =>
          data.map(({ place_id, name, country }: SearchResultsType) => ({
            id: place_id,
            title: name,
            subtitle: country,
          })),
        );
      })
      .catch((err) => {
        setError("No results were found");
        if (err?.name === "AbortError") return;
      });

    return () => controller.abort();
  }, [q]);

  if (isOpen) {
    return (
      <>
        {!error && (
          <div className='absolute z-10 top-[calc(100%+5px)] left-0 w-full bg-elevated border border-border md:rounded-xl shadow-md shadow-shdw overflow-hidden'>
            <CtaList
              data={results}
              ctaDisabled={disabledResult}
              onClick={handleClick}
              className='[&_button]:py-2 [&_button]:hover:bg-primary'
            />
            {loading && !results && (
              <span className='block md:rounded-xl px-4 py-2'>
                Searching...
              </span>
            )}
          </div>
        )}
      </>
    );
  }
}
