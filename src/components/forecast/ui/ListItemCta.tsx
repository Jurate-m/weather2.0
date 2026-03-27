"use client";

import { useState } from "react";
import Image from "next/image";
import Arrow from "@/assets/arrow_down.svg";

export default function ListItemCta({
  buttonChildren,
  content,
}: {
  buttonChildren: React.ReactNode;
  content: React.ReactNode;
}) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((prev) => !prev);
  };

  return (
    <li className='bg-white rounded-xl'>
      <button
        type='button'
        onClick={handleClick}
        className='block w-full relative'
      >
        {buttonChildren}
        <span className='block absolute top-[50%] right-4 -translate-y-[50%]'>
          <Image
            src={Arrow}
            alt={`${active ? "collapse" : "expand"}`}
            className={`${active ? "rotate-180" : ""}`}
          />
        </span>
      </button>
      <div className={`p-4 ${active ? "block" : "hidden"}`}>{content}</div>
    </li>
  );
}
