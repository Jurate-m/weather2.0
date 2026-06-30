"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import Form, { FormHandle } from "../ui/form";
import Icon from "@/assets/search-icon.svg";
import { useSearch } from "./search-provider";

import {
  validateParam,
  MIN_LENGTH,
  Q_MAX_LENGTH,
  Q_REGEX,
  ERROR_MESSAGE,
} from "@/_lib/validate";

export default function SearchForm() {
  const formRef = useRef<FormHandle>(null);
  const [searchError, setSearchError] = useState("");
  const [q, setQ] = useState("");

  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const timer = useRef<NodeJS.Timeout>(null);
  const params = new URLSearchParams(searchParams);
  const location = params.get("location");

  const { isOpen, open, close, error, setError } = useSearch();

  const handleChange = (val: string) => {
    const { valid, error, sanitized } = validateParam(
      val,
      Q_REGEX,
      MIN_LENGTH,
      Q_MAX_LENGTH,
    );

    if (error) {
      setQ("");
      setError(ERROR_MESSAGE[error as keyof typeof ERROR_MESSAGE]);
      return;
    }

    if (valid && sanitized) {
      setQ(sanitized);
    }

    if (!error) {
      setError("");
    }
  };

  useEffect(() => {
    if (!q && params.get("q")) {
      params.delete("q");
      router.replace(`${path}?${params.toString()}`);
    }

    if (!q) return;

    // set Timeout
    timer.current = setTimeout(() => {
      // if q param exists - set a param prop
      if (q) params.set("q", encodeURIComponent(q));
      // triger client navigation
      router.replace(`${path}?${params.toString()}`);
    }, 1000);

    // cleanup
    return () => {
      // clear timer
      if (timer.current) clearTimeout(timer.current);
    };
  }, [q]);

  useEffect(() => {
    if (q) setQ("");
    formRef.current?.setValue("");
  }, [location]);

  return (
    <>
      <Form
        ref={formRef}
        role='search'
        className={`relative ${searchError ? "border-error!" : ""} max-w-full`}
        icon={{ src: Icon, alt: "Search" }}
        changeHandler={handleChange}
        error={error ?? ""}
        inputPlaceholder='Search for location'
        clearHandler={() => setQ("")}
        blurHandler={() => close()}
        focusHandler={() => open()}
      />
      {error && isOpen && (
        <p className='absolute py-2 text-error text-sm'>{error}</p>
      )}
    </>
  );
}
