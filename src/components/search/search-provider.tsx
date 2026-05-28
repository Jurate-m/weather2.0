"use client";

import { createContext, useContext, useState, useCallback } from "react";

type SearchCtxType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const SearchContext = createContext<SearchCtxType | null>(null);

export default function SearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <SearchContext.Provider value={{ isOpen, open, close }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}
