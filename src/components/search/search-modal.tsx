"use client";
import { useEffect } from "react";
import { useSearch } from "./search-provider";
import Button from "../ui/Button";

export default function SearchModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, close } = useSearch();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [!isOpen]);

  return (
    <>
      <div
        role='dialog'
        className={[
          isOpen ? "block" : "hidden",
          "fixed md:hidden inset-0 z-10 bg-backdrop/90",
        ].join(" ")}
        onClick={close}
      ></div>
      <div
        className={[
          isOpen ? "block" : "hidden",
          "fixed h-fit md:static md:contents inset-0 z-20",
        ].join(" ")}
      >
        <div
          className={[
            "flex gap-4 bg-primary px-5 md:px-0 pt-4 pb-8 md:py-0 items-start justify-center",
          ].join(" ")}
        >
          {children}
          <Button
            onClick={close}
            label='Close'
            className='md:hidden py-2 font-medium'
          />
        </div>
      </div>
    </>
  );
}
