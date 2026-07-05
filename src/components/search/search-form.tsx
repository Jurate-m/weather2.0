"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import Form, { FormHandle } from "../ui/form";
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
  const formRef = useRef<FormHandle>(null);
  const [q, setQ] = useState("");

  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const timer = useRef<NodeJS.Timeout>(null);
  const params = new URLSearchParams(searchParams);
  const location = params.get("location");

  const { isOpen, open, error, setError, setLoading } = useSearch();

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
        className={`relative ${error ? "border-error!" : ""} max-w-full`}
        changeHandler={handleChange}
        error={error ?? ""}
        inputPlaceholder='Search for location'
        clearHandler={() => setQ("")}
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
