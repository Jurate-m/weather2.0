"use client";

import { useState } from "react";
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

  const handleClick = () => {
    setActive((prev) => !prev);
  };

  return (
    <div className='border'>
      <button
        type='button'
        onClick={handleClick}
        className={`block relative w-full pr-12 ${btnClass}`}
      >
        {buttonChildren}
        <span className='block absolute top-[50%] right-2 xs:right-4 -translate-y-[50%]'>
          <Image
            src={Arrow}
            alt={`${active ? "collapse" : "expand"}`}
            className={`${active ? "rotate-180" : ""}`}
          />
        </span>
      </button>
      <div className={`xs:p-4 ${active ? "block" : "hidden"} border-t`}>
        {content}
      </div>
    </div>
  );
}
