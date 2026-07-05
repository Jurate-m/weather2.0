"use client";

import { useState, useEffect, useImperativeHandle } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";

export interface FormHandle {
  setValue: (val: string) => void;
}

interface FormProps {
  ref?: React.Ref<FormHandle>;
  changeHandler: (val: string) => void;
  focusHandler?: () => void;
  blurHandler?: () => void;
  error: string;
  inputPlaceholder: string;
  clearHandler: () => void;
  icon?: React.ReactNode;
  [propName: string]: any;
}

export default function Form({
  ref,
  changeHandler,
  focusHandler,
  blurHandler,
  error,
  inputPlaceholder,
  clearHandler,
  icon,
  ...props
}: FormProps) {
  const [input, setInput] = useState("");
  const pathname = usePathname();

  useImperativeHandle(ref, () => ({
    setValue: (val: string) => setInput(val),
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    setInput(val);

    return changeHandler(val);
  };

  const handleClear = () => {
    setInput("");

    return clearHandler();
  };

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <form onSubmit={(e) => e.preventDefault()} {...props}>
      <span
        className='absolute block left-4 top-[50%] translate-y-[-50%] object-contain h-auto'
        aria-hidden='true'
      >
        {icon}
      </span>
      <input
        type='search'
        name='userQ'
        value={input}
        onFocus={focusHandler}
        onBlur={blurHandler}
        onChange={handleChange}
        placeholder={inputPlaceholder}
        className={`${error ? " outline-red-700 border-red-700" : ""} block w-full py-2 pl-12 pr-4 focus:outline-2 [&::-webkit-search-cancel-button]:hidden bg-secondary border border-border rounded-full`}
      />
      {input && (
        <Button
          onClick={handleClear}
          className='absolute block right-4 top-[50%] translate-y-[-50%] btn--clear'
          aria-label='Clear'
        />
      )}
    </form>
  );
}
