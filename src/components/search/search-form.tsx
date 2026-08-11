"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import Form from "../ui/form";
import { useSearch } from "./search-provider";
import Search from "../ui/icons/Search";
import FloatingContainer from "../ui/floating-container";

import { sanitize, validateString, err_message } from "@/_lib/validate";

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

    if (query) params.set("q", query);

    if (!query) params.delete("q");

    router.replace(`${path}?${params.toString()}`);
  };

  const handleChange = (val: string) => {
    if (!val) return handleClear();

    setLoading(true);

    const sanitized = sanitize(val);

    const invalid = validateString(sanitized, "q");

    if (invalid.message) {
      query.current = "";
      setError(err_message("q")[invalid.message as keyof typeof err_message]);
      return;
    }

    setError("");

    query.current = sanitized ?? "";

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
    if (timer.current) clearTimeout(timer.current);
    setLoading(false);
    navigateQuery("");
    query.current = "";
    setError("");
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
        components={[
          <p className='text-white text-sm px-4 py-2' role='alert'>
            {error}
          </p>,
        ]}
        displayCondition={[!!error && isOpen]}
        className='bg-error'
      />
    </>
  );
}
