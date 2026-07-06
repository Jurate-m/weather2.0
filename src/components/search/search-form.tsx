"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import Form from "../ui/form";
import { useSearch } from "./search-provider";
import Search from "../ui/icons/Search";
import FloatingContainer from "../ui/floating-container";

import {
  validateParam,
  MIN_LENGTH,
  Q_MAX_LENGTH,
  Q_REGEX,
  ERROR_MESSAGE,
} from "@/_lib/validate";

export default function SearchForm() {
  const query = useRef("");
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const timer = useRef<NodeJS.Timeout>(null);
  const params = new URLSearchParams(searchParams);
  const location = params.get("location");

  const { isOpen, open, error, setError, setLoading } = useSearch();

  const navigateQuery = (query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query) params.set("q", encodeURIComponent(query));

    if (!query) params.delete("q");

    router.replace(`${path}?${params.toString()}`);
  };

  const handleChange = (val: string) => {
    if (val) setLoading(true);

    if (!val) setLoading(false);

    const { valid, error, sanitized } = validateParam(
      val,
      Q_REGEX,
      MIN_LENGTH,
      Q_MAX_LENGTH,
    );

    if (error) {
      query.current = "";
      setError(ERROR_MESSAGE[error as keyof typeof ERROR_MESSAGE]);
      return;
    }

    setError("");

    query.current = valid && sanitized ? sanitized : "";

    if (timer.current) clearTimeout(timer.current);

    if (!query.current) {
      navigateQuery("");
      return;
    }

    timer.current = setTimeout(() => {
      navigateQuery(query.current);
    }, 1000);
  };

  const handleClear = () => {
    query.current = "";
    if (timer.current) clearTimeout(timer.current);
    setError("");
    setLoading(false);
    navigateQuery("");
  };

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <Form
        key={`${path}?${location ?? ""}`}
        role='search'
        className={`relative ${error ? "border-error!" : ""} max-w-full`}
        changeHandler={handleChange}
        error={error ?? ""}
        inputPlaceholder='Search for location'
        clearHandler={handleClear}
        focusHandler={() => open()}
        icon={<Search fill='var(--color-font-primary)' />}
      />
      <FloatingContainer
        components={[<p className='text-white text-sm px-4 py-2'>{error}</p>]}
        displayCondition={[!!error && isOpen]}
        className='bg-error'
      />
    </>
  );
}
