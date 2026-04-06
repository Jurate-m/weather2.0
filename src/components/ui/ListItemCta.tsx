"use client";

import { useState, useId } from "react";
import Image from "next/image";
import Arrow from "@/assets/arrow_down.svg";

export default function ListItemCta({
  buttonChildren,
  content,
  btnClass,
}: {
  buttonChildren: React.ReactNode;
  content: React.ReactNode;
  btnClass?: string;
}) {
  const [active, setActive] = useState(false);
  const id = useId();

  const handleClick = () => {
    setActive((prev) => !prev);
  };

  return (
    <div className='border'>
      <button
        type='button'
        aria-expanded={active}
        aria-controls={id}
        onClick={handleClick}
        className={`block relative w-full pr-12 ${btnClass}`}
      >
        {buttonChildren}
        <span className='block absolute top-[50%] right-2 xs:right-4 -translate-y-[50%]'>
          <Image
            src={Arrow}
            alt={`${active ? "collapse" : "expand"}`}
            className={`${active ? "rotate-180" : ""}`}
            aria-hidden='true'
          />
        </span>
      </button>
      <div id={id} className={`xs:p-4 ${active ? "block" : "hidden"} border-t`}>
        {content}
      </div>
    </div>
  );
}
