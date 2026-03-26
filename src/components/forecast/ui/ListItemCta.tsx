"use client";

import { useState } from "react";

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
      <button type='button' onClick={handleClick} className='block w-full'>
        {buttonChildren}
      </button>
      <div className={`p-4 ${active ? "block" : "hidden"}`}>{content}</div>
    </li>
  );
}
