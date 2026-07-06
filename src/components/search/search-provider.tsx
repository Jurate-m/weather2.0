"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

type SearchCtxType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  error: null | string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchContext = createContext<SearchCtxType | null>(null);

export default function SearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const clickOut = (e: MouseEvent) => {
    const target = wrapperRef.current?.contains(e.target as Node);

    if (!target) {
      return close();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOut);

    return () => {
      document.removeEventListener("mousedown", clickOut);
    };
  }, []);

  return (
    <SearchContext.Provider
      value={{ isOpen, open, close, error, setError, loading, setLoading }}
    >
      <div ref={wrapperRef}>{children}</div>
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}
