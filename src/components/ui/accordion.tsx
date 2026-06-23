"use client";

import { useState } from "react";
import Button from "./Button";

export default function Accordion({
  label,
  contentId,
  content,
  className,
  active,
  activeStyles,
}: {
  label: React.ReactNode;
  contentId: string;
  content: React.ReactNode;
  className?: string;
  active?: boolean;
  activeStyles?: string;
}) {
  const [open, setOpen] = useState(active);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={className}>
      <Button
        aria-expanded={open}
        aria-controls={contentId}
        onClick={handleClick}
        label={label}
        className={[
          "block w-full transition-all duration-50 ease-in",
          open ? activeStyles : undefined,
        ].join(" ")}
      />
      {open && <div id={contentId}>{content}</div>}
    </div>
  );
}
